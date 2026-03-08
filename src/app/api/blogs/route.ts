import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/database";
import Blog from "@/models/blog.model";

export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const searchParams = req.nextUrl.searchParams;
        const page = Number(searchParams.get("page")) || 1;
        const search = searchParams.get("search") || "";

        const limit = 5;
        const skip = (page - 1) * limit;
        
        const filter = search
            ? {
                $text: { $search: search },
            }
            : {};

        const blogs = await Blog.find(filter)
        .sort({ createdAt: -1 })
        
        .skip(skip)
        .limit(limit)
        .select(
            "title slug placeName rating tripDuration budgetRange createdAt"
        );

        const totalBlogs = await Blog.countDocuments(filter);

        return NextResponse.json({
            success: true,
            blogs,
            currentPage: page,
            totalPages: Math.ceil(totalBlogs / limit),
            totalBlogs,
        });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch blogs" },
            { status: 500 }
        );
    }
}