import { sendVerificationEmail } from "@/lib/mailer";
import { signUpTemplate } from "@/mail-templates/SendVerificationEmail";
import mongoose, {Document, Schema} from "mongoose";

export interface IOtp extends Document {
    email: string;
    otp: string;
    createdAt: Date;
}

const OtpSchema : Schema<IOtp> = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 60 * 5 }
});

OtpSchema.pre("save", async function () {
    const otpDoc = this as IOtp;

    if (otpDoc.isNew) {
        try {
            const emailTemplate = signUpTemplate({ otp: otpDoc.otp });
            const subject = "SignUp Verification Email";
            await sendVerificationEmail(otpDoc.email, subject, emailTemplate);
            console.log("Verification email sent successfully.");
        } catch (error) {
            console.error("Error sending email:", error);
            throw error;
        }
    }
})

const Otp = mongoose.models.OTP || mongoose.model<IOtp>("OTP", OtpSchema);
export default Otp;