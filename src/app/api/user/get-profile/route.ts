import connectDB from "@/lib/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import User from "@/models/user.model";

export async function GET(){
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        await connectDB();

        const user = await User.findOne(
            { email: session.user.email }
        ).select("firstName lastName email gender phone");

        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                gender: user.gender ?? null,
                phone: user.phone ?? null,
            },
        });
    } catch (error) {
        console.error("Profile fetch error -> ", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}