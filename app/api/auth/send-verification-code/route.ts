import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import { authApiError, AuthApiErrorCode } from '@/lib/auth-api-errors';

const resend = new Resend(process.env.RESEND_API_KEY);
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

const CODE_EXPIRY_MINUTES = 10;
const FROM_EMAIL = process.env.VERIFICATION_FROM_EMAIL ?? 'Taskdey <noreply@taskdey.com>';

export async function POST(req: NextRequest) {
  let body: { email?: string; type?: string };
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
    const { email, type } = body as { email?: string; type?: 'email_verification' | 'password_reset' };

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return authApiError(
        AuthApiErrorCode.INVALID_EMAIL,
        'Valid email is required',
        400
      );
    }
    if (!type || !['email_verification', 'password_reset'].includes(type)) {
      return authApiError(
        AuthApiErrorCode.INVALID_TYPE,
        'type must be email_verification or password_reset',
        400
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return authApiError(
        AuthApiErrorCode.EMAIL_SERVICE_ERROR,
        'Email service not configured',
        500
      );
    }
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return authApiError(
        AuthApiErrorCode.SERVER_CONFIG_ERROR,
        'Server configuration error',
        500
      );
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + CODE_EXPIRY_MINUTES * 60 * 1000);

    const { error: insertError } = await supabaseAdmin.from('verification_codes').insert({
      email: email.trim().toLowerCase(),
      code,
      type,
      expires_at: expiresAt.toISOString(),
    });

    if (insertError) {
      console.error('Verification code insert error:', insertError);
      return authApiError(
        AuthApiErrorCode.CREATE_CODE_FAILED,
        'Failed to create verification code',
        500
      );
    }

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
      return authApiError(
        AuthApiErrorCode.SEND_EMAIL_FAILED,
        'Failed to send email',
        500
      );
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return authApiError(
      AuthApiErrorCode.SERVER_ERROR,
      'Server error',
      500
    );
  }
}
