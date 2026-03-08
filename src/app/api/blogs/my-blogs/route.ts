import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/database";
import User from "@/models/user.model";
import Blog from "@/models/blog.model";
import { authOptions } from "../../auth/[...nextauth]/options";

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

        const user = await User.findOne({ email: session.user.email });

        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        const searchParams = req.nextUrl.searchParams;
        const page = Number(searchParams.get("page")) || 1;
        const limit = 5;
        const skip = (page - 1) * limit;

        const filter = { userId: user._id };

        const blogs = await Blog.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select(
            "title placeName slug rating tripDuration budgetRange travelMonth travelType createdAt"
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