/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Schema, Document } from "mongoose";

export interface Activity {
    id: string;
    time: "morning" | "afternoon" | "evening";
    title: string;
    description: string;
    location: {
        name: string;
        lat: number;
        lng: number;
        placeType: string;
        imageQuery: string;
    };
}

export interface DayItinerary {
    id: string;
    day: number;
    title: string;
    activities: Activity[];
}

export interface ITrip extends Document {
    userId: mongoose.Types.ObjectId;
    destination: string;
    lat: number;
    lng: number;
    budget: string;
    people: number;
    days: number;
    tripType: string;
    month: string;
    itinerary: {
        overview: any;
        days: DayItinerary[];
        mapSummary: any;
    };
    createdAt: Date;
}

const TripSchema = new Schema<ITrip>(
    {
            userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
            destination: String,
            lat: Number,
            lng: Number,
            budget: String,
            people: Number,
            days: Number,
            tripType: String,
            month: String,
            itinerary: Schema.Types.Mixed,
    },
    { timestamps: true }
);

export default mongoose.models.Trip || mongoose.model<ITrip>("Trip", TripSchema);