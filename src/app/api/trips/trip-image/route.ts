import { fetchPexelsImages } from "@/lib/getImage";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import Image from "@/models/image.model";
import connectDB from "@/lib/database";

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

        const { searchParams } = new URL(req.url);
        const query = searchParams.get("query");
        if (!query) {
            return NextResponse.json(
                { success: false, images: [], message: "Query missing" },
                { status: 400 }
            );
        }
        const cleanQuery = query.trim().toLowerCase();

        const existingImages = await Image.findOne({query: cleanQuery});

        if (existingImages) {
            return NextResponse.json(
                {success: true, images: existingImages.images},
                {status: 200}
            );
        }

        const images = await fetchPexelsImages(cleanQuery, 6);
        if (!images.length) {
            return NextResponse.json(
                { success: false, images: [] },
                { status: 200 }
            );
        }

        await Image.create({
            query: cleanQuery,
            images,
        });

        return NextResponse.json(
            { success: true, images },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error while fetching images ->", error);
        return NextResponse.json(
            {success:false, images: []},
            {status: 500}
        )
    }
}