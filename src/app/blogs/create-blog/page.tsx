import CreateBlogForm from "@/components/Blogs/CreateBlogForm"
import HighlightText from "@/components/common/HighlightText"

const CreateBlogPage = () => {
    return (
        <div className="max-w-screen min-h-screen container mx-auto overflow-x-hidden w-full h-full">
            <div className="lg:w-9/12 w-11/12 mx-auto mt-16 md:mt-24 flex flex-col justify-center items-center gap-4">
                <h1 className="text-3xl lg:text-5xl text-center">Share Your Travel <HighlightText text="Story With The World!" /></h1>
                <p className="text-base md:text-xl text-center hidden md:block">
                    Turn your journey into an unforgettable story. Add details, upload
                    stunning images, and inspire fellow travelers with your unique
                    experiences.
                </p>       
            </div>
            <div className="flex justify-center items-center mt-8">
                <CreateBlogForm />
            </div>
        </div>
    )
}

export default CreateBlogPage