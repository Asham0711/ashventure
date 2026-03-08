'use client'

import { exploreData } from "@/data"
import HighlightText from "../common/HighlightText"
import HomePageCard from "./HomePageCard"

const ExploreSection = () => {
    return (
        <div className="max-w-screen container mx-auto p-4 overflow-x-hidden md:mt-16">
            <h1 className="text-lg md:text-4xl font-semibold text-center mb-4">
                For every kind of trip and every <HighlightText text="destination" />
            </h1>
            <div className='bg-primary-brand w-[10%] h-0.5 mx-auto mb-16'></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center md:p-4 w-11/12 mx-auto mb-12">
                {exploreData.map((card, index) => (
                    <HomePageCard
                        key={index}
                        title={card.title}
                        description={card.description}
                        imageUrl={card.imageUrl}
                    />
                ))}
            </div>
        </div>
    )
}

export default ExploreSection