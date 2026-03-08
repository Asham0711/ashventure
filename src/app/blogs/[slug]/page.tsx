/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Loader from "@/components/common/Loader";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import HighlightText from "@/components/common/HighlightText";
import ErrorComponent from "@/components/common/ErrorComponent";

const BlogDetailsPage = () => {
    const { slug } = useParams();
    const { toast } = useToast();

    const [blog, setBlog] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((prev) =>
            prev === blog.images.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? blog.images.length - 1 : prev - 1
        );
    };

    const fetchBlog = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`/api/blogs/${slug}`);

            if (response.data.success) {
                setBlog(response.data.blog);
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Something went wrong while fetching blog",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (slug){
            fetchBlog();
        }
    }, [slug]);

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => {
        const starNumber = index + 1;
        const isFilled = starNumber <= rating;

        return (
            <Star
            key={index}
            size={20}
            className={
                isFilled
                ? "fill-yellow-400 text-yellow-400"
                : "text-white"
            }
            />
        );
        });
    };

    return (
        <div className="max-w-screen min-h-screen container mx-auto overflow-x-hidden w-full h-full">
            {isLoading && (
                <Loader text="Loading blog..." fullPage />
            )}

            {!isLoading && blog === null && (
                <div className="flex justify-center items-center h-screen">
                    <ErrorComponent 
                        title="No Blogs Yet!" 
                        description="It looks like there is a issue while fetching this blog. Please try again after few minutes or contact support."
                        primaryIcon="ArrowLeft"
                        primaryLabel="Go to Home"
                        primaryPath="/"
                        secondaryIcon="Headphones"
                        secondaryLabel="Support"
                        secondaryPath="/contact-us"
                    />
                </div>
            )}

            {!isLoading && blog != null && (
                <>
                    <div className="lg:w-9/12 w-11/12 mx-auto mt-16 md:mt-24 flex flex-col justify-center items-center gap-4">
                        <h1 className="text-3xl lg:text-5xl text-center">Travel Stories That Inspire <HighlightText text="Adventures" /></h1>
                        <p className="text-base md:text-xl text-center hidden md:block">
                            Get detailed insights about destinations, trip duration, travel styles, 
                            budgets, and honest ratings — everything you need to plan your next journey.
                        </p>       
                    </div>
                    <div className="md:w-11/12 w-[95%] mx-auto bg-transparent backdrop-blur-sm border border-white/20 md:py-8 md:px-4 py-4 px-2 rounded-3xl my-8 space-y-4 relative">
                        <h1 className="md:text-3xl text-lg mb-4 text-primary-brand text-center">{blog.title}</h1>
                        <div className="flex items-center justify-center gap-2">
                            {renderStars(blog.rating)}
                            <span className="text-sm text-white">
                                {blog.rating}/5
                            </span>
                        </div>
                        <div className="w-11/12 mx-auto text-center md:text-base text-sm">
                            Published on {new Date(blog.createdAt).toDateString()}, this in-depth travel experience 
                            showcases a {blog.travelType.toLowerCase()} getaway to {blog.placeName}. 
                            Over the course of {blog.tripDuration} days in {blog.travelMonth}, the trip was thoughtfully 
                            managed within a {blog.budgetRange.toLowerCase()} budget, delivering both inspiration and 
                            practical guidance for fellow travelers.
                        </div>
                        <div className="md:w-11/12 w-[95%] md:text-base text-sm mx-auto bg-transparent border border-white/20 backdrop-blur-sm p-4 rounded-2xl whitespace-pre-line">
                            {blog.description}
                        </div>
                        {blog.images && blog.images.length > 0 && (
                            <div className="md:mt-10 w-11/12 mx-auto flex flex-col items-center gap-6">

                                <div className="relative w-full max-w-3xl md:h-[400px] h-[200px]">

                                {/* Left Button */}
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 p-3 rounded-full"
                                >
                                    <ChevronLeft />
                                </button>

                                {/* Image */}
                                <Image
                                    src={blog.images[currentIndex].url}
                                    alt="blog-image"
                                    fill
                                    className="object-contain rounded-2xl"
                                />

                                {/* Right Button */}
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 p-3 rounded-full"
                                >
                                    <ChevronRight />
                                </button>
                                </div>

                                {/* Dots Indicator */}
                                <div className="flex gap-2 mb-8 md:mb-0">
                                    {blog.images.map((_: any, index: number) => (
                                        <div
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`h-3 w-3 rounded-full cursor-pointer ${
                                            index === currentIndex
                                            ? "bg-primary-brand"
                                            : "bg-gray-500"
                                        }`}
                                        />
                                    ))}
                                </div>

                            </div>
                        )}

                        <div className="md:text-sm text-xs text-gray-200 font-serif absolute right-3 bottom-3">
                            <p>{blog.userId?.firstName} {blog.userId?.lastName} (Author)</p>
                            <p>Published on: {new Date(blog.createdAt).toDateString()}</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default BlogDetailsPage;