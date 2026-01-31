import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { authApiError, AuthApiErrorCode } from '@/lib/auth-api-errors';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

/** Anon client used only to verify current password via signInWithPassword. */
function getSupabaseAnon() {
  const anonKey =
    process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!anonKey || !process.env.NEXT_PUBLIC_SUPABASE_URL) return null;
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, anonKey, {
    auth: { persistSession: false },
  });
}

export async function POST(req: NextRequest) {
  let body: { current_password?: string; new_password?: string };
  try {
    body = await req.json();
  } catch {
    return authApiError(AuthApiErrorCode.BAD_REQUEST, 'Invalid JSON body', 400);
  }

  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return authApiError(
        AuthApiErrorCode.SERVER_CONFIG_ERROR,
        'Server configuration error',
        500
      );
    }

    const authHeader = req.headers.get('authorization');
    const accessToken = authHeader?.startsWith('Bearer ')
      ? authHeader.slice(7).trim()
      : null;

    if (!accessToken) {
      return authApiError(
        AuthApiErrorCode.UNAUTHORIZED,
        'Authorization required. Send Bearer <access_token>.',
        401
      );
    }

    const { current_password, new_password } = body;

    if (!current_password || typeof current_password !== 'string') {
      return authApiError(
        AuthApiErrorCode.MISSING_FIELDS,
        'current_password is required',
        400
      );
    }
    if (!new_password || typeof new_password !== 'string' || new_password.length < 6) {
      return authApiError(
        AuthApiErrorCode.WEAK_PASSWORD,
        'new_password is required and must be at least 6 characters',
        400
      );
    }

    const {
      data: { user },
      error: getUserError,
    } = await supabaseAdmin.auth.getUser(accessToken);

    if (getUserError || !user?.email) {
      return authApiError(
        AuthApiErrorCode.UNAUTHORIZED,
        'Invalid or expired token',
        401
      );
    }

    const supabaseAnon = getSupabaseAnon();
    if (!supabaseAnon) {
      return authApiError(
        AuthApiErrorCode.SERVER_CONFIG_ERROR,
        'Server configuration error (anon key)',
        500
      );
    }

    const { error: signInError } = await supabaseAnon.auth.signInWithPassword({
      email: user.email,
      password: current_password,
    });

    if (signInError) {
      return authApiError(
        AuthApiErrorCode.INVALID_CURRENT_PASSWORD,
        'Current password is incorrect',
        400
      );
    }

    const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
      user.id,
      { password: new_password }
    );

    if (updateError) {
      console.error('Change password update error:', updateError);
      return authApiError(
        AuthApiErrorCode.PASSWORD_UPDATE_FAILED,
        'Failed to update password',
        500
      );
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return authApiError(AuthApiErrorCode.SERVER_ERROR, 'Server error', 500);
  }
}
