/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useState } from "react";
import { Star, X } from "lucide-react";
import { createPortal } from "react-dom";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import Loader from "../common/Loader";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const BlogsCard = ({ blog }: any) => {
    const [ showDeleteModal, setShowDeleteModal ] = useState(false);
    const [ isDeleting, setIsDeleting ] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => {
            const starNumber = index + 1;
            const isFilled = starNumber <= rating;

            return (
                <Star
                    key={index}
                    size={18}
                    className={`${
                        isFilled
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-500"
                    } transition-all`}
                />
            );
        });
    };

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            const response = await axios.delete(`/api/blogs/delete-blog/${blog._id}`);
            if(response.data.success){
                setShowDeleteModal(false);
                toast({
                    title: "Deleted Successfully!",
                    description: response.data.message,
                });

                window.location.reload();
            }
        } catch (error: any) {
            toast({
                title: "Something went wrong",
                description: error.message,
                variant: "destructive",
            });
        } finally{
            setIsDeleting(false);
        }
    }

    return (
        <div className="border border-white/20 rounded-2xl md:py-8 md:px-6 py-4 px-4 bg-transparent backdrop-blur-sm flex flex-col md:flex-row justify-between items-center gap-6">

            {isDeleting && (
                <Loader 
                    text="Deleting this blog..." 
                    fullPage
                />
            )}
            
            {/* Left Section */}
            <div className="md:w-8/12 w-full space-y-5">

                <h2 className="md:text-2xl text-xl font-semibold tracking-wide">
                    {blog.title}
                </h2>

                <div className="md:text-sm text-xs grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">

                    <div>
                        <p className="text-gray-400 md:text-lg font-bold">Place</p>
                        <p className="font-medium">{blog.placeName}</p>
                    </div>

                    <div>
                        <p className="text-gray-400 md:text-lg font-bold">Budget</p>
                        <p className="font-medium capitalize">{blog.budgetRange}</p>
                    </div>

                    <div>
                        <p className="text-gray-400 md:text-lg font-bold">Trip Duration</p>
                        <p className="font-medium">{blog.tripDuration} Days</p>
                    </div>
                    <div>
                        <p className="text-gray-400 md:text-lg font-bold">Rating</p>
                        <div className="flex items-center gap-1">
                            {renderStars(blog.rating)}
                            <span className="text-xs text-gray-300 ml-2">
                                {blog.rating}/5
                            </span>
                        </div>
                    </div>

                </div>
            </div>

            {/* Right Section */}
            <div className="md:w-4/12 w-full gap-4 flex lg:flex-row flex-col md:justify-end justify-center">
                <Button
                    onClick={() => router.push(`/blogs/${blog.slug}`)}
                >
                    View Details
                </Button>
                <Button
                    variant="outline"
                    onClick={() => setShowDeleteModal(true)}
                >
                    Delete Blog
                </Button>
            </div>

            {showDeleteModal &&
                typeof window !== "undefined" &&
                createPortal(
                    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                        <div className="relative z-10 w-[90%] max-w-md rounded-2xl border border-white/20 bg-black p-6 shadow-xl">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="absolute right-4 top-4 text-gray-400 hover:text-white cursor-pointer"
                            >
                                <X size={18} />
                            </button>

                            <h3 className="text-xl font-semibold text-red-400">
                                Confirm Delete
                            </h3>

                            <p className="text-sm text-gray-300 mt-2">
                                Are you sure? This action is permanent and cannot be undone.
                            </p>

                            <div className="mt-6 flex gap-4 justify-end">
                                <Button
                                    variant="secondary"
                                    onClick={() => setShowDeleteModal(false)}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    variant="destructive"
                                    onClick={handleDelete}
                                >
                                    Yes, Delete
                                </Button>
                            </div>
                        </div>
                    </div>,
                    document.body
                )
            }
        </div>
    )
}

export default BlogsCard