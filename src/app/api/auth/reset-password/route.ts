import connectDB from "@/lib/database";
import { hashPassword } from "@/lib/hash";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST( request : NextRequest){
    await connectDB();
    try {
        const { token , password, confirmPassword } = await request.json();

        if(password != confirmPassword) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Password and confirm password should match'
                },
                {status: 400}
            )
        }

        const user = await User.findOne({
            token,
            resetTokenExpiry: { $gt: new Date() },
        });

        if (!user) {
            return NextResponse.json(
                { 
                    success: false, 
                    message: "Invalid or expired token" 
                },
                { status: 400 }
            );
        }

        user.password = await hashPassword(password);
        user.token = null;
        user.resetTokenExpiry = null;
        await user.save();

        return NextResponse.json(
            {
                success:true,
                message:"Password reset successfully"
            },
            {status: 200}
        )
    } catch (error) {
        console.log("Error while reseting the password --> ", error);
        return NextResponse.json(
            {
                success:false,
                message:"Error while reseting the password"
            },
            {status:500}
        )
    }
}