import connectDB from "@/lib/database";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto';
import { passwordResetTemplate } from "@/mail-templates/PasswordResetEmail";
import { sendVerificationEmail } from "@/lib/mailer";

export async function POST(request : NextRequest){
    await connectDB();
    try {
        const {email} = await request.json();

        const existingUser = await User.findOne({email});
        if(!existingUser){
            return NextResponse.json(
                {
                    success: false,
                    message: "No user found with provided email address"
                },
                {status: 404}
            )
        }

        if (existingUser.authProvider === "google") {
            return NextResponse.json({
                success: false,
                message: "Google users cannot reset password"
            });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");

        existingUser.token = resetToken;
        existingUser.resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);
        await existingUser.save();

        const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}reset-password?token=${resetToken}`;
        const emailTemplate = passwordResetTemplate({ link: resetLink });
        const subject = "Reset Password Email";

        await sendVerificationEmail(email, subject, emailTemplate);

        return NextResponse.json(
            {
                success:true,
                message:"Password reset mail sent successfully"
            },
            {status: 200}
        )
    } catch (error) {
        console.log("Error while sending password reset email --> ", error);
        return NextResponse.json(
            {
                success:false,
                message:"Error while sending password reset email"
            },
            {status:500}
        )
    }
}