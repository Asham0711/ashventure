import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  placeName: string;
  description: string;
  rating: number;
  tripDuration: number;
  budgetRange: "Low" | "Medium" | "High";
  travelMonth: string;
  travelType: "Honeymoon" | "Couple" | "Family" | "Friends";
  images: { url: string; public_id: string; }[];
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        placeName: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            default: 4,
        },
        tripDuration: {
            type: Number,
            default: 1,
        },
        budgetRange: {
          type: String,
          enum: ["Low", "Medium", "High"],
          default: "Medium",
        },
        travelMonth: {
            type: String,
        },
        travelType: {
            type: String,
            enum: ["Honeymoon", "Couple", "Family", "Friends"],
            default: "Family",
        },
        images: [
            {
                url: {
                type: String,
                required: true,
                },
                public_id: {
                type: String,
                required: true,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

BlogSchema.index({
  title: "text",
  placeName: "text",
  description: "text",
});

BlogSchema.index({ createdAt: -1 });

export default mongoose.models.Blog ||
  mongoose.model<IBlog>("Blog", BlogSchema);