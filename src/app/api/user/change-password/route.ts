import connectDB from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import User from "@/models/user.model";
import { comparePassword, hashPassword } from "@/lib/hash";

export async function PUT(request : NextRequest){
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        await connectDB();

        const {currentPassword, newPassword, confirmNewPassword} = await request.json();
        if(!currentPassword || !newPassword || !confirmNewPassword){
            return NextResponse.json(
                {
                    success: false,
                    message: 'Please fill all the fields'
                },
                {status: 401}
            )
        }
        if(currentPassword === newPassword){
            return NextResponse.json(
                {
                    success: false,
                    message: "New password cannot be same as old one."
                },
                {status: 409}
            )
        }
        if( newPassword !== confirmNewPassword){
            return NextResponse.json(
                {
                    success: false,
                    message: "New password and confirm new password are not matching."
                },
                {status: 401}
            )
        }

        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }
        if (user.authProvider === "google") {
            return NextResponse.json(
                { success: false, message: "Password not available for Google accounts" },
                { status: 400 }
            );
        }

        const isValidPassword = await comparePassword(
            currentPassword,
            user.password
        );
        if(!isValidPassword){
            return NextResponse.json(
                {
                    success: false,
                    message: "Current password is incorrect"
                },
                {status: 400}
            )
        }

        const hashedPassword = await hashPassword(newPassword);
        user.password = hashedPassword;
        await user.save();

        return NextResponse.json(
            {
                success:true,
                message:"Password changed successfully"
            },
            {status: 200}
        )  
    } catch (error) {
        console.log("Error while changing the password --> ", error);
        return NextResponse.json(
            {
                success:false,
                message:"Error while changing the password"
            },
            {status:500}
        )
    }
}