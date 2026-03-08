/* eslint-disable @typescript-eslint/no-explicit-any */
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import connectDB from "@/lib/database";
import Blog from "@/models/blog.model";
import User from "@/models/user.model";
import mongoose from "mongoose";
import cloudinary from "@/lib/cloudinary";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ blogId: string }> }
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

        const { blogId } = await context.params;

        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            return NextResponse.json(
                { success: false, message: "Invalid Blog ID" },
                { status: 400 }
            );
        }

        const blog = await Blog.findById(blogId);

        if (!blog) {
            return NextResponse.json(
                { success: false, message: "Blog not found" },
                { status: 404 }
            );
        }

        const user = await User.findOne({ email: session.user.email });

        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        if (blog.userId.toString() !== user._id.toString()) {
            return NextResponse.json(
                { success: false, message: "Not allowed to delete this blog" },
                { status: 403 }
            );
        }

        if (blog.images && blog.images.length > 0) {
            const deletePromises = blog.images.map(async (img: any) => {
                if (img.public_id) {
                    return cloudinary.uploader.destroy(img.public_id);
                }

                if (typeof img === "string") {
                    const publicId = img.split("/").pop()?.split(".")[0];
                    if (publicId) {
                        return cloudinary.uploader.destroy(`ashventure/blogs/${publicId}`);
                    }
                }
            });

            await Promise.all(deletePromises);
        }

        await Blog.findByIdAndDelete(blogId);

        await User.findByIdAndUpdate(user._id, {
            $pull: { blogs: blogId },
        });

        return NextResponse.json(
            { success: true, message: "Blog deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting blog:", error);
        return NextResponse.json(
            { success: false, message: "Failed to delete blog" },
            { status: 500 }
        );
    }
}