/* eslint-disable @typescript-eslint/no-explicit-any */
import { Star } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const BlogsCard = ({ blog }: any) => {
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

    return (
        <div className="border border-white/20 rounded-2xl md:py-8 md:px-6 py-4 px-4 bg-transparent backdrop-blur-sm flex flex-col md:flex-row justify-between items-center gap-6">

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
            <div className="md:w-4/12 w-full flex md:justify-end justify-center">
                <Button
                    onClick={() => router.push(`/blogs/${blog.slug}`)}
                >
                    View Details
                </Button>
            </div>
        </div>
    )
}

export default BlogsCard