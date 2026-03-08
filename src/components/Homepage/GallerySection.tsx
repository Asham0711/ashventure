import HighlightText from "../common/HighlightText"
import { galleryData } from "@/data"
import GalleryCard from "./GalleryCard"

const GallerySection = () => {
    return (
        <div className="max-w-screen container mx-auto p-4 overflow-x-hidden md:mt-20">
            <h1 className="text-lg md:text-4xl font-semibold text-center mb-4">
                <HighlightText text="Popular"/> things to do
            </h1>
            <div className='bg-primary-brand w-[10%] h-0.5 mx-auto md:mb-20'></div>
            <div className="w-full max-w-7xl mx-auto my-10 grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-4 h-96 md:h-[350px] lg:h-[600px]">
                <GalleryCard
                    image={galleryData[0].image}
                    title={galleryData[0].title}
                    className="md:col-span-1 md:row-span-1"
                />
                <GalleryCard
                    title={galleryData[1].title}
                    image={galleryData[1].image}
                    className="md:col-span-1 md:row-span-2"
                />
                <GalleryCard
                    image={galleryData[2].image}
                    title={galleryData[2].title}
                    className="md:col-span-2 md:row-span-1"
                />
                <GalleryCard
                    image={galleryData[3].image}
                    title={galleryData[3].title}
                    className="md:col-span-1 md:row-span-1"
                />
                <GalleryCard
                    image={galleryData[4].image}
                    title={galleryData[4].title}
                    className="md:col-span-1 md:row-span-1"
                />
                <GalleryCard
                    image={galleryData[5].image}
                    title={galleryData[5].title}
                    className="md:col-span-1 md:row-span-1"
                />
            </div>
        </div>
    )
}

export default GallerySection