'use client'

import { destinationData } from "@/data"
import HighlightText from "../common/HighlightText"
import { InfiniteMovingCards } from "../ui/infinite-moving-cards"
import PrimaryButton from "../common/PrimaryButton"
import { useSession } from "next-auth/react"

const DestinationSection = () => {
    const {data: session} = useSession();
    const getPathName = session ? "create-trip" : "/sign-up";
    return (
      <div className="max-w-screen container mx-auto p-4 overflow-x-hidden md:mt-20 mt-10">
        {/* Feature header */}
        <h1 className="text-lg md:text-4xl font-semibold text-center mb-4">
          Discover your next <HighlightText text="Favourite Destination" />
        </h1>
        <div className='bg-primary-brand w-[10%] h-0.5 mx-auto mb-4'></div>
        <p className="md:w-9/12 mx-auto text-center text-xs md:text-xl md:mb-12">From breathtaking landscapes to vibrant cities, let us guide you to unforgettable destinations. Discover, plan, and explore your next favorite spot with personalized itineraries crafted just for you.</p>
        <div className="py-10 rounded-md flex flex-col items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards
            items={destinationData}
            direction="right"
            speed="slow"
          />
        </div>
        <p className="md:w-9/12 mx-auto text-center text-xs md:text-2xl md:mt-12">Ready to turn your dream destinations into reality? Dive into expertly curated itineraries and start planning the journey of a lifetime.</p>
        <div className="flex justify-center items-center my-5">
          <PrimaryButton label="Explore More" path={getPathName}/>
        </div>  
      </div>
    )
}

export default DestinationSection