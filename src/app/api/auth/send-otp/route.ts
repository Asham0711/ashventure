import connectDB from "@/lib/database";
import Otp from "@/models/otp.model";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import otpGenerator from 'otp-generator';

export async function POST(request : NextRequest){
    await connectDB();
    try {
        const {email} = await request.json();
        const existingUser = await User.findOne({email});
        if(existingUser){
            return NextResponse.json(
                {
                    success: false,
                    message: "User Already exists"
                },
                {status: 409}
            )
        }

        const otp = await otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        await Otp.create({
            email,
            otp
        });

        return NextResponse.json(
            {
                success:true,
                message:"OTP sent successfully"
            },
            {status: 200}
        )
    } catch (error) {
        console.log("Error while sending otp --> ", error);
        return NextResponse.json(
            {
                success:false,
                message:"Error while sending otp"
            },
            {status:500}
        )
    }
}