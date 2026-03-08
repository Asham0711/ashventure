import { NextResponse } from "next/server";
import connectDB from "@/lib/database";
import { createTripPrompt } from "@/lib/createPrompt";
import tripModel from "@/models/trip.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import User from "@/models/user.model";
import { generateItinerary } from "@/lib/grok";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        await connectDB();

        const userEmail = session.user.email;

        const user = await User.findOne({email: userEmail});

        const body = await req.json();

        const prompt = createTripPrompt(body);

        const geminiResponse = await generateItinerary(prompt);

        const itineraryJSON = JSON.parse(geminiResponse);

        const trip = await tripModel.create({
            userId: user._id,
            destination: body.destination,
            lat: body.lat,
            lng: body.lng,
            budget: body.budget,
            people: body.people,
            days: body.days,
            tripType: body.tripType,
            month: body.month,
            itinerary: itineraryJSON,
        });

        await User.findByIdAndUpdate(user._id, {
            $push: { trips: trip._id },
        });

        return NextResponse.json(
            { success: true, tripId: trip._id, message: 'Your itinerary is succesfully created' },
            {status: 200}
        );
    } catch (error) {
        console.error("CREATE TRIP ERROR", error);
        return NextResponse.json(
            { success: false, message: "Failed to create trip" },
            { status: 500 }
        );
    }
}