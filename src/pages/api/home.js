import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const allowedOrigins = [
  'https://taskdey.com',
  'https://www.taskdey.com',
  'https://app.taskdey.com'
];

export default async function handler(req, res) {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  
  const { name, email, phone, subject, message, timestamp } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  
  try {
    // Format timestamp for display
    const formattedDate = new Date(timestamp).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
    
    // 1. Send notification email to Taskdey support team
    await resend.emails.send({
      to: 'taskdeygh@gmail.com',
      from: 'Taskdey Notifications <noreply@taskdey.com>',
      subject: `New Inquiry from ${name}: ${subject}`,
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
                    <td style="padding: 12px 5px; border-bottom: 1px solid #e0e0e0;"><strong>${name}</strong></td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 5px; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Email:</td>
                    <td style="padding: 12px 5px; border-bottom: 1px solid #e0e0e0;"><a href="mailto:${email}" style="color: #4F46E5; text-decoration: none;">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 5px; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Phone:</td>
                    <td style="padding: 12px 5px; border-bottom: 1px solid #e0e0e0;">${phone || 'Not provided'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 5px; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Subject:</td>
                    <td style="padding: 12px 5px; border-bottom: 1px solid #e0e0e0;">
                      <span style="background-color: #EEF2FF; color: #4F46E5; padding: 5px 10px; border-radius: 20px; font-size: 14px;">${subject}</span>
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
                <p style="margin: 0; line-height: 1.6;">${message}</p>
              </div>
            </div>
            
            <div style="margin-top: 35px; background-color: #EEF2FF; padding: 15px; border-radius: 8px; text-align: center;">
              <p style="margin: 0; font-weight: bold; color: #4F46E5;">Please respond to this inquiry within 24 hours</p>
            </div>
            
            <div style="margin-top: 25px; text-align: center;">
              <a href="mailto:${email}" style="display: inline-block; background-color: #4F46E5; color: white; text-decoration: none; padding: 12px 30px; border-radius: 4px; font-weight: bold;">Reply to ${name}</a>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #1F2937; color: white; padding: 15px; border-radius: 0 0 8px 8px; text-align: center;">
            <p style="margin: 0; font-size: 14px;">This is an automated notification from the Taskdey website.</p>
          </div>
        </div>
      `,
    });
    
    // 2. Send auto-reply to user
    await resend.emails.send({
      to: email,
      from: 'Taskdey Support <support@taskdey.com>',
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
            
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">Hello ${name},</p>
            
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">Thank you for reaching out to <strong>Taskdey</strong>. This automatic confirmation is to let you know we've received your inquiry and our team will be in touch with you shortly.</p>
            
            <div style="background-color: #f9f9f9; border-radius: 8px; padding: 25px; margin: 30px 0;">
              <h3 style="color: #4F46E5; margin-top: 0; font-size: 18px;">Your Inquiry Details:</h3>
              
              <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                <tr>
                  <td style="padding: 10px 5px; border-bottom: 1px solid #e0e0e0; font-weight: bold; width: 130px;">Subject:</td>
                  <td style="padding: 10px 5px; border-bottom: 1px solid #e0e0e0;">
                    <span style="background-color: #EEF2FF; color: #4F46E5; padding: 4px 10px; border-radius: 20px; font-size: 14px;">${subject}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 5px; vertical-align: top; font-weight: bold;">Your Message:</td>
                  <td style="padding: 10px 5px;">
                    <div style="background-color: #ffffff; padding: 10px 15px; border-radius: 4px; border: 1px solid #e0e0e0; font-style: italic;">
                      "${message}"
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
    
    return res.status(200).json({ message: 'Message and confirmation email sent!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}