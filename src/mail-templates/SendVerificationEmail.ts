export interface SignUpTemplateProps {
  otp: string;
}

// OTP template function
export const signUpTemplate = ({ otp }: SignUpTemplateProps): string => {
  return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>OTP Verification Email</title>
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
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <img src="https://i.ibb.co/LXsNnfVG/logo-full.png" alt="Ashventure" width="150" style="display:block; margin:0 auto 20px auto; max-width:150px; height:auto;" >
            <div class="message">OTP Verification Email</div>
            <div class="body">
                <p>Dear User,</p>
                <p>Thank you for registering with Ash Message. To complete your registration, please use the following OTP:</p>
                <h2 class="highlight">${otp}</h2>
                <p>This OTP is valid for 5 minutes. If you did not request this, please disregard this email.</p>
            </div>
            <div class="support">
                If you need assistance, contact us at <a href="mailto:support@ashventure.com">support@ashventure.com</a>.
            </div>
        </div>
    </body>
    </html>`;
};