import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/database";
import Trip from "@/models/trip.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import User from "@/models/user.model";

export async function GET(
  req: Request,
  context: { params: Promise<{ tripId: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }
        await connectDB();

        const { tripId } = await context.params;

        if (!mongoose.Types.ObjectId.isValid(tripId)) {
            return NextResponse.json(
                { success: false, message: "Invalid Trip ID" },
                { status: 400 }
            );
        }

        const trip = await Trip.findById(tripId);

        if (!trip) {
            return NextResponse.json(
                { success: false, message: "Trip not found" },
                { status: 404 }
            );
        }
        return NextResponse.json({
            success: true,
            trip,
        });
    } catch (error) {
        console.error('Error while fetching trips ->', error);
        return NextResponse.json(
            {success: true, message: "Error while fetching trips"},
            {status: 500}
        )
    }
}

export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ tripId: string }> }
){
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }   

        await connectDB();
        const { tripId } = await context.params;

        if (!mongoose.Types.ObjectId.isValid(tripId)) {
            return NextResponse.json(
                { success: false, message: "Invalid Trip ID" },
                { status: 400 }
            );
        }

        const trip = await Trip.findById(tripId);
        if(!trip){
            return NextResponse.json(
                {success: false, message: "Trip not found"},
                {status: 404}
            )
        }

        const userEmail = session.user.email;
        const user = await User.findOne({email: userEmail});
        if(!user){
            return NextResponse.json(
                {success: false, message: "User not found"},
                {status: 404}
            )
        }

        if(trip.userId.toString() !== user._id.toString()){
            return NextResponse.json(
                {success:false, message: "you do not have access to delete this trip"},
                {status: 403}
            )
        }

        await Trip.findByIdAndDelete(tripId);
        await User.findByIdAndUpdate(user._id, {
            $pull: { trips: tripId },
        });

        return NextResponse.json(
            {success: true, message: "Trip deleted successfully"},
            {status: 200}
        )
    } catch (error) {
        console.error("Delete trip error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to delete trip" },
            { status: 500 }
        );
    }
}