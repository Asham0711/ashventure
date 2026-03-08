import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import User from "@/models/user.model";
import connectDB from "@/lib/database";
import blogModel from "@/models/blog.model";
import { slugify } from "@/lib/slugify";
import { uploadImages } from "@/lib/imageUploader";

export async function POST(req: NextRequest){
    try {
        const session = await getServerSession(authOptions);
        if(!session || !session.user?.email){
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        await connectDB();

        const userEmail = session.user.email;
        const user = await User.findOne({email: userEmail});
        if(!user){
            return NextResponse.json(
                {success: false, message: "User not found"},
                {status: 404}
            )
        }

        const formData = await req.formData();

        const title = formData.get("title") as string;
        const placeName = formData.get("placeName") as string;
        const description = formData.get("description") as string;
        const rating = Number(formData.get("rating"));
        const tripDuration = Number(formData.get("tripDuration"));
        const budgetRange = formData.get("budgetRange") as string;
        const travelMonth = formData.get("travelMonth") as string;
        const travelType = formData.get("travelType") as string;

        const files = formData.getAll("images") as File[];

        if (!title || !description) {
            return NextResponse.json(
                { success: false, message: "Title and description are required" },
                { status: 400 }
            );
        }

        if (!files || files.length === 0) {
            return NextResponse.json(
                { success: false, message: "At least one image is required" },
                { status: 400 }
            );
        }

        if (isNaN(rating) || rating < 0 || rating > 5) {
            return NextResponse.json(
                { success: false, message: "Rating must be between 0 and 5" },
                { status: 400 }
            );
        }

        const uploadedImages = await uploadImages(files);


        const baseSlug = slugify(title);
        let slug = baseSlug;
        let counter = 1;

        while (await blogModel.findOne({ slug })) {
            slug = `${baseSlug}-${counter}`;
            counter++;
        }

        const blog = await blogModel.create({
            userId: user._id,
            title,
            slug,
            placeName,
            description,
            rating,
            tripDuration,
            budgetRange,
            travelMonth,
            travelType,
            images: uploadedImages,
        });

        if(!blog){
            return NextResponse.json(
                {success: false, message: "Error while creating blog"},
                {status: 500}
            )
        }

        await User.findByIdAndUpdate(user._id, {
            $push: { blogs: blog._id },
        });

        return NextResponse.json(
            {success: true, slug: blog.slug, message: "Blog created successfully"},
            {status: 201}
        )
    } catch (error) {
        console.error("Error while creating blog: ", error);
        return NextResponse.json(
            {success: false, message: "Error while creating blog"},
            {status: 500}
        )
    }
}