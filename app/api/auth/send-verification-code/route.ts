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

function buildVerificationEmailHtml(params: {
  code: string;
  type: 'email_verification' | 'password_reset';
  expiryMinutes: number;
}): string {
  const { code, type, expiryMinutes } = params;
  const isReset = type === 'password_reset';
  const welcome = isReset
    ? 'You’re one step away from securing your Taskdey account.'
    : 'Welcome to your Taskdey journey. We’re glad you’re here.';
  const action = isReset
    ? 'Use this code to reset your password:'
    : 'To get started, enter this code in the app:';

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;font-family:'Segoe UI',system-ui,sans-serif;font-size:15px;line-height:1.5;color:#374151;background:#f3f4f6;padding:24px;">
  <div style="max-width:360px;margin:0 auto;background:#fff;border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,0.08);overflow:hidden;">
    <div style="background:#4F46E5;padding:16px 20px;text-align:center;">
      <span style="color:#fff;font-weight:600;font-size:18px;letter-spacing:-0.02em;">Taskdey</span>
    </div>
    <div style="padding:24px 20px;">
      <p style="margin:0 0 16px;font-size:15px;color:#111;">${welcome}</p>
      <p style="margin:0 0 12px;font-size:14px;color:#6b7280;">${action}</p>
      <p style="margin:0 0 20px;font-size:28px;font-weight:600;letter-spacing:6px;color:#4F46E5;font-variant-numeric:tabular-nums;">${code}</p>
      <p style="margin:0;font-size:12px;color:#9ca3af;">Valid for ${expiryMinutes} minutes. Do not share this code.</p>
    </div>
    <div style="padding:12px 20px;background:#f9fafb;border-top:1px solid #e5e7eb;text-align:center;">
      <span style="font-size:11px;color:#9ca3af;">Taskdey – Streamline your tasks</span>
    </div>
  </div>
</body>
</html>
  `.trim();
}

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

    const html = buildVerificationEmailHtml({
      code,
      type,
      expiryMinutes: CODE_EXPIRY_MINUTES,
    });

    const { error: sendError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email.trim(),
      subject,
      text,
      html,
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
