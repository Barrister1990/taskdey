import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { authApiError, AuthApiErrorCode } from '@/lib/auth-api-errors';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

export async function POST(req: NextRequest) {
  let body: { email?: string; code?: string; type?: string; new_password?: string };
  try {
    body = await req.json();
  } catch {
    return authApiError(
      AuthApiErrorCode.BAD_REQUEST,
      'Invalid JSON body',
      400
    );
  }

  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return authApiError(
        AuthApiErrorCode.SERVER_CONFIG_ERROR,
        'Server configuration error',
        500
      );
    }

    const { email, code, type, new_password } = body as {
      email?: string;
      code?: string;
      type?: 'email_verification' | 'password_reset';
      new_password?: string;
    };

    if (!email || !code || !type) {
      return authApiError(
        AuthApiErrorCode.MISSING_FIELDS,
        'email, code, and type are required',
        400
      );
    }

    if (!['email_verification', 'password_reset'].includes(type)) {
      return authApiError(
        AuthApiErrorCode.INVALID_TYPE,
        'type must be email_verification or password_reset',
        400
      );
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
      return authApiError(
        AuthApiErrorCode.INVALID_OR_EXPIRED_CODE,
        'Invalid or expired code',
        400
      );
    }

    const { error: updateCodeError } = await supabaseAdmin
      .from('verification_codes')
      .update({ used_at: now })
      .eq('id', rows[0].id);

    if (updateCodeError) {
      console.error('Failed to mark code as used:', updateCodeError);
      return authApiError(
        AuthApiErrorCode.CODE_UPDATE_FAILED,
        'Failed to process code',
        500
      );
    }

    if (type === 'email_verification') {
      const { data: authData } = await supabaseAdmin.auth.admin.listUsers();
      const user = authData?.users?.find((u) => u.email?.toLowerCase() === emailLower);
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
      if (!new_password || new_password.length < 6) {
        return authApiError(
          AuthApiErrorCode.WEAK_PASSWORD,
          'new_password required (min 6 characters)',
          400
        );
      }
      const { data: authData } = await supabaseAdmin.auth.admin.listUsers();
      const authUser = authData?.users?.find((u) => u.email?.toLowerCase() === emailLower);
      if (!authUser) {
        return authApiError(
          AuthApiErrorCode.USER_NOT_FOUND,
          'User not found',
          404
        );
      }
      const { error: passwordError } = await supabaseAdmin.auth.admin.updateUserById(authUser.id, {
        password: new_password,
      });
      if (passwordError) {
        console.error('Password update error:', passwordError);
        return authApiError(
          AuthApiErrorCode.PASSWORD_UPDATE_FAILED,
          'Failed to update password',
          500
        );
      }
      return NextResponse.json({ success: true });
    }

    return authApiError(
      AuthApiErrorCode.INVALID_TYPE,
      'Invalid type',
      400
    );
  } catch (e) {
    console.error(e);
    return authApiError(
      AuthApiErrorCode.SERVER_ERROR,
      'Server error',
      500
    );
  }
}
