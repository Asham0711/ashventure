import mongoose, { Schema, Document } from "mongoose";

export interface IImage extends Document{
    query: string;
    images: string[];
    createdAt: Date;
}

const ImageSchema = new Schema<IImage>(
    {
        query: {type: String, required: true, unique: true, index: true},
        images: {type: [String], required: true}
    },
    {timestamps: true}
);

export default mongoose.models.Image || mongoose.model<IImage>("Image", ImageSchema);