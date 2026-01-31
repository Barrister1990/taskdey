import { NextResponse } from 'next/server';

/**
 * Machine-readable error codes for the verification auth API.
 * Use these in the mobile app to branch on specific errors (e.g. show "Resend code" for CODE_EXPIRED).
 */
export const AuthApiErrorCode = {
  // Request / validation
  BAD_REQUEST: 'BAD_REQUEST',
  INVALID_EMAIL: 'INVALID_EMAIL',
  INVALID_TYPE: 'INVALID_TYPE',
  MISSING_FIELDS: 'MISSING_FIELDS',
  WEAK_PASSWORD: 'WEAK_PASSWORD',

  // Send verification code
  EMAIL_SERVICE_ERROR: 'EMAIL_SERVICE_ERROR',
  SERVER_CONFIG_ERROR: 'SERVER_CONFIG_ERROR',
  CREATE_CODE_FAILED: 'CREATE_CODE_FAILED',
  SEND_EMAIL_FAILED: 'SEND_EMAIL_FAILED',

  // Confirm verification code
  INVALID_OR_EXPIRED_CODE: 'INVALID_OR_EXPIRED_CODE',
  CODE_UPDATE_FAILED: 'CODE_UPDATE_FAILED',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  PASSWORD_UPDATE_FAILED: 'PASSWORD_UPDATE_FAILED',

  // Change password (authenticated user)
  UNAUTHORIZED: 'UNAUTHORIZED',
  INVALID_CURRENT_PASSWORD: 'INVALID_CURRENT_PASSWORD',

  // Generic
  SERVER_ERROR: 'SERVER_ERROR',
} as const;

export type AuthApiErrorCodeType = (typeof AuthApiErrorCode)[keyof typeof AuthApiErrorCode];

/** Error response body returned by auth API routes. */
export interface AuthApiErrorResponse {
  success: false;
  error: string;
  code: AuthApiErrorCodeType;
}

/** Success response body (optional payload). */
export interface AuthApiSuccessResponse {
  success: true;
  [key: string]: unknown;
}

export type AuthApiResponse = AuthApiErrorResponse | AuthApiSuccessResponse;

/**
 * Returns a NextResponse with a consistent error body for the mobile app.
 * - code: machine-readable, use for branching (e.g. CODE_EXPIRED → "Resend code")
 * - error: human-readable message, use for display or fallback
 */
export function authApiError(
  code: AuthApiErrorCodeType,
  message: string,
  status: number = 400
): NextResponse<AuthApiErrorResponse> {
  return NextResponse.json(
    { success: false, error: message, code },
    { status }
  );
}
