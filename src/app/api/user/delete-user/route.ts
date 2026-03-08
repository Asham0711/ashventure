/* eslint-disable @typescript-eslint/no-explicit-any */
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import connectDB from "@/lib/database";
import User from "@/models/user.model";
import cloudinary from "@/lib/cloudinary";
import Blog from "@/models/blog.model";
import Trip from "@/models/trip.model";

export async function DELETE() {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        await connectDB();

        const user = await User.findOne({ email: session.user.email });

        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }
        
        const blogs = await Blog.find({ userId: user._id });

        for (const blog of blogs) {
            if (blog.images && blog.images.length > 0) {
                const deletePromises = blog.images.map(async (img: any) => {
                if (img.public_id) {
                    return cloudinary.uploader.destroy(img.public_id);
                }

                if (typeof img === "string") {
                    const publicId = img.split("/").pop()?.split(".")[0];
                    if (publicId) {
                    return cloudinary.uploader.destroy(
                        `ashventure/blogs/${publicId}`
                    );
                    }
                }
                });

                await Promise.all(deletePromises);
            }
        }

        await Blog.deleteMany({ userId: user._id });

        await Trip.deleteMany({ userId: user._id });


        await User.findByIdAndDelete(user._id);

        return NextResponse.json(
            {
                success: true,
                message: "Account deleted successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Delete account error -->", error);
        return NextResponse.json(
            {
                success: false,
                message: "Error while deleting account",
            },
            { status: 500 }
        );
    }
}