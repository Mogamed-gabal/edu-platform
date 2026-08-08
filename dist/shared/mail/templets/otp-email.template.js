"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOtpEmailTemplate = void 0;
const getOtpEmailTemplate = (otp) => {
    return `
      <!DOCTYPE html>
      <html lang="en" dir="ltr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verification Code -MostafaBadr Edu Platform</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f8fafc;
            margin: 0;
            padding: 0;
            direction: ltr;
          }
          .email-wrapper {
            width: 100%;
            background-color: #f8fafc;
            padding: 40px 0;
          }
          .email-content {
            max-width: 520px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          }
          .header {
            background-color: #2563eb;
            padding: 30px 20px;
            text-align: center;
            color: #ffffff;
          }
          .header h1 {
            margin: 0;
            font-size: 22px;
            font-weight: 700;
            letter-spacing: -0.5px;
          }
          .header p {
            margin: 5px 0 0 0;
            font-size: 13px;
            color: #bfdbfe;
          }
          .body-content {
            padding: 32px 24px;
            text-align: left;
            color: #334155;
          }
          .greeting {
            font-size: 18px;
            font-weight: 600;
            color: #0f172a;
            margin-bottom: 12px;
          }
          .text {
            font-size: 14px;
            line-height: 1.6;
            color: #475569;
            margin-bottom: 24px;
          }
          .otp-container {
            background-color: #f1f5f9;
            border: 2px dashed #cbd5e1;
            border-radius: 10px;
            padding: 20px;
            text-align: center;
            margin: 24px 0;
          }
          .otp-label {
            font-size: 12px;
            text-transform: uppercase;
            color: #64748b;
            font-weight: 600;
            margin-bottom: 8px;
          }
          .otp-code {
            font-size: 34px;
            font-weight: 800;
            letter-spacing: 8px;
            color: #1e40af;
            font-family: 'Courier New', Courier, monospace;
          }
          .expiry-note {
            font-size: 12px;
            color: #ef4444;
            margin-top: 8px;
            font-weight: 500;
          }
          .security-warning {
            font-size: 12px;
            color: #94a3b8;
            border-top: 1px solid #f1f5f9;
            padding-top: 16px;
            margin-top: 24px;
            line-height: 1.5;
          }
          .footer {
            background-color: #f8fafc;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #94a3b8;
            border-top: 1px solid #e2e8f0;
          }
        </style>
      </head>
      <body>
        <div class="email-wrapper">
          <div class="email-content">
            <!-- Header / Logo Area -->
            <div class="header">
              <h1>Mostafa Badr Platform</h1>
              <p>E-Learning Portal</p>
            </div>
  
            <!-- Body Content -->
            <div class="body-content">
              <div class="greeting">Hello! 👋</div>
              <div class="text">
                Thank you for joining us. To complete your verification or login process, please use the One-Time Password (OTP) code below:
              </div>
  
              <!-- OTP Box -->
              <div class="otp-container">
                <div class="otp-label">Your Verification Code (OTP)</div>
                <div class="otp-code">${otp}</div>
                <div class="expiry-note">⏱️ This code is valid for 5 minutes only.</div>
              </div>
  
              <div class="security-warning">
                <strong>Security Notice:</strong> Never share this code with anyone. Our support team will never ask for your verification code. If you did not request this email, please ignore it safely.
              </div>
            </div>
  
            <!-- Footer -->
            <div class="footer">
              All rights reserved © ${new Date().getFullYear()} Edu Platform.
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
};
exports.getOtpEmailTemplate = getOtpEmailTemplate;
//# sourceMappingURL=otp-email.template.js.map