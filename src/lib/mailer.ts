import { MailApiResponse } from '@/types/ApiResponse'
import nodemailer from 'nodemailer';

export async function sendVerificationEmail( email:string, title:string, body:string ) : Promise<MailApiResponse> {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            },
            secure: true
        });

        const mailOptions = {
            from: `"AshVenture | Md Asham Imad" <${process.env.MAIL_USER}>`,
            to: email,
            subject: title,
            html: body
        }

        await transporter.sendMail(mailOptions);

        return{
            success:true,
            message:"Email sent successfully"
        };

    } catch (error) {
        console.log("Error while sending mail --> ", error);
        return{
            success:false,
            message:"Error while sending mail"
        };
    }
}