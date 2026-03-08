export interface PasswordResetTemplateProps {
  link: string;
}

export const passwordResetTemplate = ({ link }: PasswordResetTemplateProps): string =>{
    return `<!DOCTYPE html>
    <html>
    
    <head>
      <meta charset="UTF-8">
      <title>Password Reset OTP</title>
      <style>
        body {
          background-color: #ffffff;
          font-family: Arial, sans-serif;
          font-size: 16px;
          line-height: 1.4;
          color: #333333;
          margin: 0;
          padding: 0;
        }
    
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
        }
    
        .logo {
          max-width: 200px;
          margin-bottom: 20px;
        }
    
        .message {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 20px;
        }
    
        .body {
          font-size: 16px;
          margin-bottom: 20px;
        }
    
        .highlight {
          font-weight: bold;
        }
    
        .cta {
          display: inline-block;
          padding: 10px 20px;
          background-color: #FFD60A;
          color: #000000;
          text-decoration: none;
          border-radius: 5px;
          font-size: 16px;
          font-weight: bold;
          margin-top: 20px;
        }
    
        .support {
          font-size: 14px;
          color: #999999;
          margin-top: 20px;
        }
      </style>
    </head>
    
    <body>
        <div class="container">
            <img class="logo" src="https://i.postimg.cc/CLZK2XZy/health-risk-4-removebg-preview-1.png" alt="Ashventure">
            <div class="message">Password Reset Request</div>
            <div class="body">
                <p>Dear User,</p>
                <p>You have requested to reset your password. Use the following link to reset your password:</p>
                <h2 class="highlight">${link}</h2>
                <p>This link is valid for 15 minute. Please use it promptly.</p>
                <p>If you did not request a password reset, please ignore this email.</p>
            </div>
            <div class="support">
                If you need further assistance, please contact us at
                <a href="mailto:support@ashventure.com">support@ashventure.com</a>.
            </div>
        </div>
    </body>
    
    </html>`;
  };