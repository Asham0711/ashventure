import connectDB from "@/lib/database";
import { hashPassword } from "@/lib/hash";
import Otp from "@/models/otp.model";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    await connectDB();
    try {
        const {firstName, lastName, email, password, confirmPassword, otp} = await request.json();

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

        if(password !== confirmPassword){
            return NextResponse.json(
                {
                    success: false,
                    message: "Password and confirm passwords are not matching"
                },
                {status: 400}
            )
        }

        const response = await Otp.find({email}).sort({createdAt: -1}).limit(1);
        if(response.length === 0){
            return NextResponse.json(
                {
                    success: false,
                    message: "The OTP is not valid",
                },
                {status: 410}
            );
        } else if (otp !== response[0].otp) {
            return NextResponse.json(
                {
                    success: false,
                    message: "The OTP is not valid",
                },
                {status: 400}
            );
        }

        await Otp.findByIdAndDelete(response[0]._id);

        const hashedPassword = await hashPassword(password);

        await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword
        });

        return NextResponse.json(
            {
                success:true,
                message:"User created successfully"
            },
            {status: 200}
        )

    } catch (error) {
        console.log("Error while creating user --> ", error);
        return Response.json(
            {
                success:false,
                message:error
            },
            {status:500}
        )
    }
}