export const getResetPasswordEmailTemplate = (otp: string): string => {
  return `
      <!DOCTYPE html>
      <html lang="en" dir="ltr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Password -MostafaBadr Edu Platform</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; margin: 0; padding: 0; direction: ltr; }
          .email-wrapper { width: 100%; background-color: #f8fafc; padding: 40px 0; }
          .email-content { max-width: 520px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
          .header { background-color: #dc2626; padding: 30px 20px; text-align: center; color: #ffffff; } /* أحمر مائل للتحذير/إعادة التعيين */
          .header h1 { margin: 0; font-size: 22px; font-weight: 700; }
          .header p { margin: 5px 0 0 0; font-size: 13px; color: #fecaca; }
          .body-content { padding: 32px 24px; text-align: left; color: #334155; }
          .greeting { font-size: 18px; font-weight: 600; color: #0f172a; margin-bottom: 12px; }
          .text { font-size: 14px; line-height: 1.6; color: #475569; margin-bottom: 24px; }
          .otp-container { background-color: #fef2f2; border: 2px dashed #fca5a5; border-radius: 10px; padding: 20px; text-align: center; margin: 24px 0; }
          .otp-label { font-size: 12px; text-transform: uppercase; color: #991b1b; font-weight: 600; margin-bottom: 8px; }
          .otp-code { font-size: 34px; font-weight: 800; letter-spacing: 8px; color: #991b1b; font-family: 'Courier New', Courier, monospace; }
          .expiry-note { font-size: 12px; color: #ef4444; margin-top: 8px; font-weight: 500; }
          .security-warning { font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 16px; margin-top: 24px; line-height: 1.5; }
          .footer { background-color: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="email-wrapper">
          <div class="email-content">
            <div class="header">
              <h1>🔐 Password Reset Request</h1>
              <p>MostafaBadr Edu Platform - Security Center</p>
            </div>
            <div class="body-content">
              <div class="greeting">Hello! 👋</div>
              <div class="text">
                We received a request to reset the password for your account. Please use the verification code below to proceed with setting a new password:
              </div>
              <div class="otp-container">
                <div class="otp-label">Password Reset Code</div>
                <div class="otp-code">${otp}</div>
                <div class="expiry-note">⏱This code is valid for 5 minutes only.</div>
              </div>
              <div class="security-warning">
                🔒 <strong>Security Notice:</strong> If you did not request a password reset, please ignore this email or contact support immediately if you suspect unauthorized activity.
              </div>
            </div>
            <div class="footer">
              All rights reserved © ${new Date().getFullYear()} Edu Platform.
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
};
