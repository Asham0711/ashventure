import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import connectDB from "@/lib/database";
import Trip from "@/models/trip.model";
import User from "@/models/user.model";

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        await connectDB();
        const searchParams = req.nextUrl.searchParams;
        const page = Number(searchParams.get("page")) || 1;
        const limit = 5;
        const skip = (page - 1) * limit;
        const userEmail = session.user.email;

        const user = await User.findOne({email: userEmail});

        const trips = await Trip.find({ userId: user._id})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select("destination days people budget tripType month createdAt");

        const totalTrips = await Trip.countDocuments({userId: user._id});

        return NextResponse.json({
            success: true,
            trips,
            currentPage: page,
            totalPages: Math.ceil(totalTrips / limit),
            totalTrips,
        });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch trips" },
            { status: 500 }
        );
    }
}