import { NextResponse } from "next/server";
import connectDB from "@/lib/database";
import Blog from "@/models/blog.model";

export async function GET (
    req: Request,
    context: { params: Promise<{ slug: string }> }
) {
    try{
        await connectDB();

        const { slug } = await context.params;

        if (!slug) {
            return NextResponse.json(
                { success: false, message: "Slug is required" },
                {status : 400}
            )
        }

        const blog = await Blog.findOne({ slug })
            .populate("userId", "firstName lastName")
            .select("-__v");

        if(!blog){
            return NextResponse.json(
                { success: false, message: "Blog not found" },
                {status : 404}
            )
        }

        return NextResponse.json(
            { success: true, blog }
        )
    } catch (error){
        console.error("Error fetching blog:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch blog" },
            { status: 500 }
        );
    }
}