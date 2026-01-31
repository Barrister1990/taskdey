# Verification codes (6-digit PIN) – All users (clients & workers)

The app uses **custom email verification and password reset** with a 6-digit PIN for **all users** (clients and workers), not Supabase’s built-in confirmation. Turn **off** “Confirm email” in Supabase Auth so users can sign in before verifying; the source of truth for “is this user’s email verified?” is **`auth.users.email_confirmed_at`** in Supabase. When it’s `null`, the user is not verified.

---

## Source of truth: `auth.users.email_confirmed_at`

- **Supabase Dashboard:** Authentication → Settings → turn **off** “Confirm email” so signups get a session without waiting for Supabase’s built-in email.
- **Verified or not:** After login, check **`session.user.email_confirmed_at`** (or the user object from `supabase.auth.getUser()`). If it’s `null`, the user has **not** verified their email; redirect them to the 6-digit PIN verification screen. When your API confirms the code, it must update the auth user so `email_confirmed_at` is set (see “API 2: Confirm code” below).
- **App:** Use `session?.user?.email_confirmed_at` (or equivalent from your session type) to decide whether to show the email verification step. Keep `profiles.email_verified` in sync for convenience, but the canonical check is auth.

---

## How `session.user.email_confirmed_at` gets updated

1. **Backend (Next.js API) updates Supabase Auth**  
   When the user submits the 6-digit code, your app calls **API 2: Confirm code**. That API:
   - Verifies the code in `verification_codes`.
   - Calls **`supabase.auth.admin.updateUserById(userId, { email_confirm: true })`** using the **service role** key.  
   That call writes to the **`auth.users`** table and sets **`email_confirmed_at`** (and related fields) for that user. The session you have in the app is **not** updated automatically at that moment.

2. **Client session is stale until refreshed**  
   The session object in the app (e.g. `session.user.email_confirmed_at`) is a snapshot from when the user signed in or last refreshed. So right after the API confirms the code, the app’s in-memory session still has `email_confirmed_at === null` until you refresh it.

3. **App must refresh the session after verification**  
   After the confirm API returns success (200), the app should:
   - Call **`supabase.auth.refreshSession()`** so Supabase returns a new session that includes the updated user (with `email_confirmed_at` set).
   - Then either call **`checkSession()`** (or your auth store’s equivalent) so the store is updated from the new session, or read `session.user.email_confirmed_at` from the refreshed session and set `user.emailVerified` in the store.  
   Then the app will see the user as verified and can redirect (e.g. to role selection or home).

**Summary:**  
`session.user.email_confirmed_at` is updated **in the Supabase Auth database** by your Next.js API via **`auth.admin.updateUserById(..., { email_confirm: true })`**. The app then sees the update only after it calls **`supabase.auth.refreshSession()`** (and syncs the store from the new session).

**App env:** Set **`EXPO_PUBLIC_VERIFICATION_API_URL`** in the app’s `.env` to your Next.js API base URL (e.g. `https://your-api.vercel.app`). The email verification screen calls `POST ${EXPO_PUBLIC_VERIFICATION_API_URL}/api/auth/confirm-verification-code` and then refreshes the session so the store gets the updated `email_confirmed_at`.

---

## Table: `public.verification_codes`

| Column      | Type        | Description                                           |
|------------|-------------|-------------------------------------------------------|
| id         | uuid        | Primary key                                           |
| email      | text        | Email the code was sent to                            |
| code       | text        | 6-digit PIN (string)                                  |
| type       | text        | `email_verification` or `password_reset`               |
| expires_at | timestamptz | Code valid until this time                            |
| used_at    | timestamptz | Set when code is successfully verified (consumed)     |
| created_at | timestamptz | Row creation time                                     |

RLS is enabled and **no policies** exist for `anon`/`authenticated`, so only the **service_role** key (Next.js API) can access this table.

---

## API 1: Send verification email (Resend)

Use this for **email verification** (and optionally for **password reset**). Sends a 6-digit code to the user’s email using **Resend**.

### 1.1 Setup Resend

- Sign up at [resend.com](https://resend.com), create an API key.
- In your Next.js project:
  ```bash
  npm install resend
  ```
- Add to `.env` (or `.env.local`):
  ```
  RESEND_API_KEY=re_xxxxxxxxxxxx
  SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
  SUPABASE_URL=https://your-project.supabase.co
  ```

### 1.2 Create the “send code” API route

Example: `app/api/auth/send-verification-code/route.ts` (App Router).

```ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

const CODE_EXPIRY_MINUTES = 10;
const FROM_EMAIL = 'Taskdey <onboarding@yourdomain.com>'; // Use your Resend verified domain

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, type } = body as { email?: string; type?: 'email_verification' | 'password_reset' };

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }
    if (!type || !['email_verification', 'password_reset'].includes(type)) {
      return NextResponse.json({ error: 'type must be email_verification or password_reset' }, { status: 400 });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + CODE_EXPIRY_MINUTES * 60 * 1000);

    await supabaseAdmin.from('verification_codes').insert({
      email: email.trim().toLowerCase(),
      code,
      type,
      expires_at: expiresAt.toISOString(),
    });

    const subject = type === 'password_reset'
      ? 'Your password reset code'
      : 'Verify your email – Taskdey';
    const text = type === 'password_reset'
      ? `Your password reset code is: ${code}. It expires in ${CODE_EXPIRY_MINUTES} minutes.`
      : `Your verification code is: ${code}. It expires in ${CODE_EXPIRY_MINUTES} minutes.`;

    const { error: sendError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email.trim(),
      subject,
      text,
    });

    if (sendError) {
      console.error('Resend error:', sendError);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
```

- **Request body:** `{ "email": "user@example.com", "type": "email_verification" }` or `"password_reset"`.
- **Response:** `{ "success": true }` or error. Do **not** return the code to the client.

---

## API 2: Confirm code and mark user as verified

Use this after the user enters the 6-digit PIN. It validates the code, marks it as used, and updates **Supabase Auth** so the user is considered verified (`email_confirmed_at` set). Also updates `profiles.email_verified` for consistency.

### 2.1 Confirm email verification

Example: `app/api/auth/confirm-verification-code/route.ts`.

```ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, code, type } = body as {
      email?: string;
      code?: string;
      type?: 'email_verification' | 'password_reset';
    };

    if (!email || !code || !type) {
      return NextResponse.json({ error: 'email, code, and type are required' }, { status: 400 });
    }

    const emailLower = email.trim().toLowerCase();
    const now = new Date().toISOString();

    const { data: rows, error: fetchError } = await supabaseAdmin
      .from('verification_codes')
      .select('id')
      .eq('email', emailLower)
      .eq('code', code)
      .eq('type', type)
      .is('used_at', null)
      .gt('expires_at', now)
      .limit(1);

    if (fetchError || !rows?.length) {
      return NextResponse.json({ error: 'Invalid or expired code' }, { status: 400 });
    }

    await supabaseAdmin
      .from('verification_codes')
      .update({ used_at: now })
      .eq('id', rows[0].id);

    if (type === 'email_verification') {
      const { data: authUsers } = await supabaseAdmin.auth.admin.listUsers();
      const user = authUsers?.users?.find((u) => u.email?.toLowerCase() === emailLower);
      if (user) {
        await supabaseAdmin.auth.admin.updateUserById(user.id, {
          email_confirm: true,
        });
        await supabaseAdmin
          .from('profiles')
          .update({ email_verified: true, updated_at: now })
          .eq('id', user.id);
      }
      return NextResponse.json({ success: true });
    }

    if (type === 'password_reset') {
      const { new_password } = body as { new_password?: string };
      if (!new_password || new_password.length < 6) {
        return NextResponse.json({ error: 'new_password required (min 6 characters)' }, { status: 400 });
      }
      const { data: authUsers } = await supabaseAdmin.auth.admin.listUsers();
      const authUser = authUsers?.users?.find((u) => u.email?.toLowerCase() === emailLower);
      if (!authUser) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      await supabaseAdmin.auth.admin.updateUserById(authUser.id, { password: new_password });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
```

- **Email verification:** Request body `{ "email", "code", "type": "email_verification" }`. API marks the code as used, then:
  - Finds the user in `auth.users` by email and calls **`auth.admin.updateUserById(userId, { email_confirm: true })`**, which sets **`email_confirmed_at`** in the auth table.
  - Updates **`profiles.email_verified = true`** for that user.
- **Password reset:** Request body `{ "email", "code", "type": "password_reset", "new_password" }`. API marks the code as used and updates the user’s password via Admin API.

---

## How the app knows if email is verified

- **Turn off** Supabase “Confirm email” so users can log in before verifying.
- After login, read the session/user from Supabase (e.g. `supabase.auth.getSession()` or `getUser()`). The auth user object includes **`email_confirmed_at`**.
  - If **`session.user.email_confirmed_at`** is **`null`** → user is **not** verified → show email verification screen (6-digit PIN flow).
  - If it’s set (timestamp string) → user is verified → proceed as normal.
- So the **single source of truth** for “is this user’s email verified?” is the Supabase **auth** table (`auth.users.email_confirmed_at`), not only `profiles.email_verified`. Your confirm-code API (above) sets that by calling `auth.admin.updateUserById(..., { email_confirm: true })`.

---

## App flow summary

1. **Sign up (client or worker):** User signs up → Supabase creates user (no Supabase email confirm) → app or API calls **API 1** with `type: 'email_verification'` → Resend sends 6-digit code → user enters PIN in app → app calls **API 2** with `email`, `code`, `type: 'email_verification'` → API confirms code and updates auth (`email_confirmed_at`) + `profiles.email_verified`.
2. **Login:** Load session; if `session.user.email_confirmed_at === null`, redirect to email verification screen; otherwise continue.
3. **Password reset:** User requests reset → call **API 1** with `type: 'password_reset'` → user enters PIN + new password → app calls **API 2** with `email`, `code`, `type: 'password_reset'`, `new_password'` → API confirms and updates password.

---

## Optional: listUsers vs getUserByEmail

In API 2, the example uses `listUsers()` to find the user by email. For production, prefer **`getUserByEmail`** if your Supabase client supports it (Admin API), to avoid listing all users. Example:

```ts
const { data: { user } } = await supabaseAdmin.auth.admin.getUserByEmail(emailLower);
if (user) {
  await supabaseAdmin.auth.admin.updateUserById(user.id, { email_confirm: true });
  // ...
}
```

Use this in both email verification and password reset branches when available.
