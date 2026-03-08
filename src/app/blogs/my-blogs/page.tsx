/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import MyBlogsCard from "@/components/Blogs/MyBlogsCard";
import ErrorComponent from "@/components/common/ErrorComponent";
import HighlightText from "@/components/common/HighlightText";
import Loader from "@/components/common/Loader";
import PrimaryButton from "@/components/common/PrimaryButton";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const MyBlogsPage = () => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalBlogs, setTotalBlogs] = useState(0);

    const fetchBlogs = async (page = 1) => {
        try{
            setIsLoading(true);
            const response = await axios.get(`/api/blogs/my-blogs?page=${page}`);
            if(response.data.success){
                setBlogs(response.data.blogs);
                setCurrentPage(response.data.currentPage);
                setTotalPages(response.data.totalPages);
                setTotalBlogs(response.data.totalBlogs);
            }
        }catch(error){
            console.error("Error while fetching blogs ->", error);
        }finally{
            setIsLoading(false);
        }
    }
    useEffect(() => {
        fetchBlogs(currentPage);
    }, [currentPage]);

    return (
        <div className="max-w-screen min-h-screen container mx-auto overflow-x-hidden w-full h-full">
            {isLoading && (
                <Loader 
                    text="Loading your blogs..." 
                    fullPage
                />
            )}

            {!isLoading && blogs.length === 0 && (
                <div className="flex justify-center items-center h-screen">
                    <ErrorComponent 
                        title="No Blogs Yet!" 
                        description="It looks like there are no blogs available right now. Start exploring or create your first blog to share your experience."
                        primaryIcon="ArrowLeft"
                        primaryLabel="Go to Home"
                        primaryPath="/"
                        secondaryIcon="Logs"
                        secondaryLabel="Create Blog"
                        secondaryPath="/blogs/create-blog"
                    />
                </div>
            )}

            {!isLoading && blogs.length !== 0 && (
                <div>
                    <div className="lg:w-9/12 w-11/12 mx-auto mt-16 md:mt-24 flex flex-col justify-center items-center gap-4">
                        <h1 className="text-3xl lg:text-5xl text-center">Your Published <HighlightText text="Blogs"/></h1>
                        <p className="text-base md:text-xl text-center hidden md:block">
                            Access and manage all your published and drafted blogs here. 
                            Update details, refine your stories, and keep your travel content organized effortlessly.
                        </p>
                    </div>
                    <div className="md:w-11/12 w-[95%] mx-auto bg-transparent backdrop-blur-sm border border-white/20 md:py-8 md:px-4 py-4 px-2 rounded-3xl my-8 space-y-4">
                        <div className="flex justify-end">
                            <PrimaryButton path="/blogs/create-blog" label="Create" iconName="Plus"/>
                        </div>
                        {blogs.map((blog: any) => (
                            <MyBlogsCard key={blog._id} blog={blog} />
                        ))}

                        {/* Pagination */}
                        <div className="flex justify-center items-center gap-4 relative w-11/12 m-auto">
                            <div className="bg-transparent border border-white/20 px-4 py-2 rounded-full backdrop-blur-sm flex justify-center items-center gap-4">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(prev => prev - 1)}
                                    className="cursor-pointer disabled:hover:text-gray-400 disabled:cursor-not-allowed hover:text-primary-brand"
                                >
                                    <ChevronLeft />
                                </button>

                                <span className="text-lg">
                                    Page {currentPage} of {totalPages}
                                </span>

                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(prev => prev + 1)}
                                    className="cursor-pointer disabled:hover:text-gray-400 disabled:cursor-not-allowed hover:text-primary-brand"
                                >
                                    <ChevronRight />
                                </button>
                            </div>

                            <p className="text-sm md:text-base bg-transparent border border-white/20 px-4 py-2 rounded-full backdrop-blur-sm absolute right-0 hidden md:block">
                                Total Blogs: {totalBlogs}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyBlogsPage