import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Type definitions
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  timestamp: string;
}

interface ApiResponse {
  message: string;
  error?: string;
}

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Allowed origins for CORS
const allowedOrigins: string[] = [
  'https://taskdey.com',
  'https://www.taskdey.com',
  'https://app.taskdey.com',
  'http://localhost:3000', // For development
  'http://localhost:3001'  // For development
];

// Utility function for logging
const logRequest = (level: 'info' | 'warn' | 'error', message: string, data?: any) => {
  const timestamp = new Date().toISOString();
  const logData = data ? JSON.stringify(data, null, 2) : '';
  console[level](`[${timestamp}] [CONTACT-API] ${message}`, logData ? `\nData: ${logData}` : '');
};

// Email validation function
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Sanitize input to prevent XSS
const sanitizeInput = (input: string): string => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

export async function POST(req: Request) {
  const startTime = Date.now();
  
  try {
    // Log incoming request
    const origin = req.headers.get('origin') || '';
    const userAgent = req.headers.get('user-agent') || '';
    const contentType = req.headers.get('content-type') || '';
    
    logRequest('info', 'Incoming contact form request', {
      origin,
      userAgent,
      contentType,
      timestamp: new Date().toISOString()
    });

    // CORS check
    if (!allowedOrigins.includes(origin)) {
      logRequest('warn', 'CORS violation detected', { origin, allowedOrigins });
      return NextResponse.json(
        { message: 'CORS not allowed', error: 'Invalid origin' }, 
        { 
          status: 403,
          headers: {
            'Access-Control-Allow-Origin': '',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
          }
        }
      );
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      logRequest('error', 'Resend API key not configured');
      return NextResponse.json(
        { message: 'Server configuration error', error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Check content type
    if (!contentType.includes('application/json')) {
      logRequest('warn', 'Invalid content type', { contentType });
      return NextResponse.json(
        { message: 'Invalid content type. Expected application/json', error: 'Invalid content type' },
        { status: 400 }
      );
    }

    // Parse and validate request body
    let body: any;
    try {
      body = await req.json();
    } catch (parseError) {
      logRequest('error', 'Failed to parse request body', { 
        error: parseError instanceof Error ? parseError.message : 'Unknown parse error'
      });
      return NextResponse.json(
        { message: 'Invalid JSON format', error: 'Request body parsing failed' },
        { status: 400 }
      );
    }

    const { name, email, phone, subject, message, timestamp } = body;

    // Log received data (sanitized)
    logRequest('info', 'Received form data', {
      hasName: !!name,
      hasEmail: !!email,
      hasPhone: !!phone,
      hasSubject: !!subject,
      hasMessage: !!message,
      hasTimestamp: !!timestamp,
      nameLength: name?.length || 0,
      messageLength: message?.length || 0
    });

    // Validate required fields
    const missingFields: string[] = [];
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      missingFields.push('name');
    }
    if (!email || typeof email !== 'string' || email.trim().length === 0) {
      missingFields.push('email');
    }
    if (!subject || typeof subject !== 'string' || subject.trim().length === 0) {
      missingFields.push('subject');
    }
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      missingFields.push('message');
    }

    if (missingFields.length > 0) {
      logRequest('warn', 'Missing required fields', { missingFields, receivedData: body });
      return NextResponse.json(
        { 
          message: `Missing required fields: ${missingFields.join(', ')}`,
          error: 'Validation failed'
        },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(email.trim())) {
      logRequest('warn', 'Invalid email format', { email: email.trim() });
      return NextResponse.json(
        { message: 'Invalid email format', error: 'Email validation failed' },
        { status: 400 }
      );
    }

    // Validate field lengths
    if (name.trim().length > 100) {
      logRequest('warn', 'Name too long', { nameLength: name.length });
      return NextResponse.json(
        { message: 'Name must be less than 100 characters', error: 'Validation failed' },
        { status: 400 }
      );
    }

    if (subject.trim().length > 200) {
      logRequest('warn', 'Subject too long', { subjectLength: subject.length });
      return NextResponse.json(
        { message: 'Subject must be less than 200 characters', error: 'Validation failed' },
        { status: 400 }
      );
    }

    if (message.trim().length > 2000) {
      logRequest('warn', 'Message too long', { messageLength: message.length });
      return NextResponse.json(
        { message: 'Message must be less than 2000 characters', error: 'Validation failed' },
        { status: 400 }
      );
    }

    // Validate phone if provided
    if (phone && (typeof phone !== 'string' || phone.trim().length > 20)) {
      logRequest('warn', 'Invalid phone format', { phoneLength: phone?.length });
      return NextResponse.json(
        { message: 'Invalid phone number format', error: 'Validation failed' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name.trim()),
      email: email.trim().toLowerCase(),
      phone: phone ? sanitizeInput(phone.trim()) : null,
      subject: sanitizeInput(subject.trim()),
      message: sanitizeInput(message.trim()),
      timestamp: timestamp || new Date().toISOString()
    };

    // Format timestamp
    let formattedDate: string;
    try {
      formattedDate = new Date(sanitizedData.timestamp).toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'UTC'
      });
    } catch (dateError) {
      logRequest('warn', 'Invalid timestamp, using current time', { 
        providedTimestamp: sanitizedData.timestamp 
      });
      formattedDate = new Date().toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'UTC'
      });
    }

    logRequest('info', 'Attempting to send notification email');

    // Send notification email to support team
    try {
      await resend.emails.send({
        to: 'taskdeygh@gmail.com',
        from: 'Taskdey Notifications <noreply@taskdey.com>',
        subject: `New Inquiry from ${sanitizedData.name}: ${sanitizedData.subject}`,
        html: `
          <div style="font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif; color: #333; max-width: 650px; margin: auto;">
            <!-- Header -->
            <div style="background-color: #4F46E5; padding: 25px; border-radius: 8px 8px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">New Website Inquiry</h1>
              <p style="color: white; margin: 5px 0 0; font-size: 16px; opacity: 0.9;">From Taskdey Contact Form</p>
            </div>
            
            <!-- Content -->
            <div style="background-color: #ffffff; padding: 30px; border-left: 1px solid #e0e0e0; border-right: 1px solid #e0e0e0;">
              <p style="font-size: 16px; line-height: 1.5;">You've received a new contact form submission with the following details:</p>
              
              <div style="background-color: #f9f9f9; border-radius: 8px; padding: 20px; margin: 25px 0;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tbody>
                    <tr>
                      <td style="padding: 12px 5px; border-bottom: 1px solid #e0e0e0; font-weight: bold; width: 30%;">Name:</td>
                      <td style="padding: 12px 5px; border-bottom: 1px solid #e0e0e0;"><strong>${sanitizedData.name}</strong></td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 5px; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Email:</td>
                      <td style="padding: 12px 5px; border-bottom: 1px solid #e0e0e0;"><a href="mailto:${sanitizedData.email}" style="color: #4F46E5; text-decoration: none;">${sanitizedData.email}</a></td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 5px; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Phone:</td>
                      <td style="padding: 12px 5px; border-bottom: 1px solid #e0e0e0;">${sanitizedData.phone || 'Not provided'}</td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 5px; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Subject:</td>
                      <td style="padding: 12px 5px; border-bottom: 1px solid #e0e0e0;">
                        <span style="background-color: #EEF2FF; color: #4F46E5; padding: 5px 10px; border-radius: 20px; font-size: 14px;">${sanitizedData.subject}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 5px; font-weight: bold; vertical-align: top;">Submission Time:</td>
                      <td style="padding: 12px 5px; color: #666; font-size: 14px;">${formattedDate}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div style="margin-top: 30px;">
                <h3 style="color: #444; border-bottom: 2px solid #4F46E5; padding-bottom: 8px; display: inline-block;">User Message:</h3>
                <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-top: 15px; border-left: 4px solid #4F46E5;">
                  <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${sanitizedData.message}</p>
                </div>
              </div>
              
              <div style="margin-top: 35px; background-color: #EEF2FF; padding: 15px; border-radius: 8px; text-align: center;">
                <p style="margin: 0; font-weight: bold; color: #4F46E5;">Please respond to this inquiry within 24 hours</p>
              </div>
              
              <div style="margin-top: 25px; text-align: center;">
                <a href="mailto:${sanitizedData.email}" style="display: inline-block; background-color: #4F46E5; color: white; text-decoration: none; padding: 12px 30px; border-radius: 4px; font-weight: bold;">Reply to ${sanitizedData.name}</a>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #1F2937; color: white; padding: 15px; border-radius: 0 0 8px 8px; text-align: center;">
              <p style="margin: 0; font-size: 14px;">This is an automated notification from the Taskdey website.</p>
            </div>
          </div>
        `,
      });

      logRequest('info', 'Notification email sent successfully');
    } catch (notificationError) {
      logRequest('error', 'Failed to send notification email', {
        error: notificationError instanceof Error ? notificationError.message : 'Unknown error',
        to: 'taskdeygh@gmail.com'
      });
      // Continue to try sending auto-reply even if notification fails
    }

    logRequest('info', 'Attempting to send auto-reply email');

    // Send auto-reply to user
    try {
      await resend.emails.send({
        to: sanitizedData.email,
        from: 'Taskdey Support <info@taskdey.com>',
        subject: 'Thank You for Contacting Taskdey',
        html: `
          <div style="font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif; color: #333; max-width: 650px; margin: auto;">
            <!-- Header with Logo -->
            <div style="background-color: #4F46E5; padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Taskdey</h1>
              <p style="color: white; margin: 10px 0 0; font-size: 16px;">Streamline Your Tasks, Amplify Your Productivity</p>
            </div>
            
            <!-- Content -->
            <div style="background-color: #ffffff; padding: 35px; border-left: 1px solid #e0e0e0; border-right: 1px solid #e0e0e0;">
              <h2 style="color: #4F46E5; margin-top: 0; margin-bottom: 25px; font-size: 24px;">We've Received Your Message!</h2>
              
              <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">Hello ${sanitizedData.name},</p>
              
              <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">Thank you for reaching out to <strong>Taskdey</strong>. This automatic confirmation is to let you know we've received your inquiry and our team will be in touch with you shortly.</p>
              
              <div style="background-color: #f9f9f9; border-radius: 8px; padding: 25px; margin: 30px 0;">
                <h3 style="color: #4F46E5; margin-top: 0; font-size: 18px;">Your Inquiry Details:</h3>
                
                <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                  <tr>
                    <td style="padding: 10px 5px; border-bottom: 1px solid #e0e0e0; font-weight: bold; width: 130px;">Subject:</td>
                    <td style="padding: 10px 5px; border-bottom: 1px solid #e0e0e0;">
                      <span style="background-color: #EEF2FF; color: #4F46E5; padding: 4px 10px; border-radius: 20px; font-size: 14px;">${sanitizedData.subject}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 5px; vertical-align: top; font-weight: bold;">Your Message:</td>
                    <td style="padding: 10px 5px;">
                      <div style="background-color: #ffffff; padding: 10px 15px; border-radius: 4px; border: 1px solid #e0e0e0; font-style: italic; white-space: pre-wrap;">
                        "${sanitizedData.message}"
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
              
              <p style="font-size: 16px; line-height: 1.6;">We typically respond to all inquiries within 24 hours during business days. If your matter requires immediate assistance, please contact us through our live chat on the website.</p>
              
              <div style="text-align: center; margin: 35px 0 25px;">
                <a href="https://taskdey.com/#faq" style="display: inline-block; background-color: #4F46E5; color: white; text-decoration: none; padding: 15px 30px; border-radius: 4px; font-weight: bold; font-size: 16px;">Visit Our Help Center</a>
              </div>
            </div>
            
            <!-- Contact Info -->
            <div style="background-color: #f5f5f5; padding: 25px; border-left: 1px solid #e0e0e0; border-right: 1px solid #e0e0e0;">
              <table style="width: 100%;">
                <tr>
                  <td style="text-align: center; padding: 10px; width: 50%; vertical-align: top; border-right: 1px solid #e0e0e0;">
                    <div style="font-size: 14px; color: #666;">
                      <strong style="color: #333; display: block; margin-bottom: 8px; font-size: 16px;">Contact Us</strong>
                      <a href="mailto:taskdeygh@gmail.com" style="color: #4F46E5; text-decoration: none;">taskdeygh@gmail.com</a><br>
                      <span style="display: block; margin-top: 8px;">Hohoe, Ghana</span>
                    </div>
                  </td>
                  <td style="text-align: center; padding: 10px; width: 50%; vertical-align: top;">
                    <div style="font-size: 14px; color: #666;">
                      <strong style="color: #333; display: block; margin-bottom: 8px; font-size: 16px;">Support Hours</strong>
                      <span>Monday - Friday: 9am - 8pm </span><br>
                      <span>Saturday: 10am - 4pm </span><br>
                      <span>Sunday: Closed</span>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            
            <!-- Social Media Links -->
            <div style="background-color: #ffffff; padding: 20px; text-align: center; border-left: 1px solid #e0e0e0; border-right: 1px solid #e0e0e0;">
              <p style="margin: 0 0 10px; font-size: 14px; color: #666;">Follow us for updates and tips</p>
              <div>
                <a href="https://www.facebook.com/share/16Lta84UPv/?mibextid=wwXIfr" style="display: inline-block; margin: 0 10px; color: #4F46E5; text-decoration: none; font-weight: bold;">Facebook</a>
                <a href="https://www.linkedin.com/showcase/joymish/?viewAsMember=true" style="display: inline-block; margin: 0 10px; color: #4F46E5; text-decoration: none; font-weight: bold;">LinkedIn</a>
                <a href="https://www.instagram.com/taskdey/profilecard/?igsh=aG5sMHE1MmZ5dXc4" style="display: inline-block; margin: 0 10px; color: #4F46E5; text-decoration: none; font-weight: bold;">Instagram</a>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #1F2937; color: white; padding: 20px; border-radius: 0 0 8px 8px; text-align: center;">
              <p style="margin: 0 0 10px; font-size: 14px;">© ${new Date().getFullYear()} Taskdey. All rights reserved.</p>
              <p style="margin: 0; font-size: 12px; color: #aaa;">Please do not reply to this automated message. To contact us, please use the contact information provided above.</p>
            </div>
          </div>
        `,
      });

      logRequest('info', 'Auto-reply email sent successfully');
    } catch (replyError) {
      logRequest('error', 'Failed to send auto-reply email', {
        error: replyError instanceof Error ? replyError.message : 'Unknown error',
        to: sanitizedData.email
      });
    }

    const processingTime = Date.now() - startTime;
    logRequest('info', 'Contact form submission processed successfully', {
      processingTimeMs: processingTime,
      userEmail: sanitizedData.email
    });

    return NextResponse.json(
      { message: 'Message and confirmation email sent!' },
      { 
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      }
    );

  } catch (error) {
    const processingTime = Date.now() - startTime;
    logRequest('error', 'Unexpected error in contact form processing', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      processingTimeMs: processingTime
    });

    return NextResponse.json(
      { message: 'Internal server error', error: 'Processing failed' },
      { status: 500 }
    );
  }
}

// Handle preflight requests for CORS
export async function OPTIONS(req: Request) {
  const origin = req.headers.get('origin') || '';
  
  logRequest('info', 'CORS preflight request', { origin });

  if (!allowedOrigins.includes(origin)) {
    logRequest('warn', 'CORS preflight rejected', { origin });
    return new NextResponse(null, { status: 403 });
  }

  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}

// Handle unsupported methods
export async function GET(req: Request) {
  logRequest('warn', 'Unsupported GET request to contact API');
  return NextResponse.json(
    { message: 'Method not allowed. Use POST to submit contact form.' },
    { status: 405 }
  );
}