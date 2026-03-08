import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import connectDB from "@/lib/database";
import User from "@/models/user.model";

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

        const { firstName, lastName, gender, phone } = await request.json();

        const user = await User.findOne( { email: session.user.email });

        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        const isSame =
            user.firstName === firstName &&
            user.lastName === lastName &&
            (user.gender ?? "") === (gender ?? "") &&
            (user.phone ?? "") === (phone ?? "");

        if (isSame) {
            return NextResponse.json(
                { success: true, message: "No changes found" },
                { status: 200 }
            );
        }

        user.firstName = firstName;
        user.lastName = lastName;
        user.gender = gender || undefined;
        user.phone = phone || undefined;

        await user.save();

        return NextResponse.json(
            {
                success: true,
                message: 'Profile updated successfully'
            },
            {status: 200}
        )

    } catch (error) {
        console.error("Profile fetch error -> ", error);
        return NextResponse.json(
            { success: false, message: "Internal server error while updating profile" },
            { status: 500 }
        );
    }
}