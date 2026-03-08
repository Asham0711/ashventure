'use client'

import { featureData } from "@/data"
import HighlightText from "../common/HighlightText"
import HomePageCard from "./HomePageCard"

const FeatureSection = () => {
    return (
      <div className="max-w-screen container mx-auto p-4 overflow-x-hidden md:mt-20 mt-10">
        {/* Feature header */}
        <h1 className="text-lg md:text-4xl font-semibold text-center mb-4">
          <HighlightText text="Features"/> to replace all your other tools
        </h1>
        <div className='bg-primary-brand w-[10%] h-0.5 mx-auto md:mb-16 mb-8'></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center md:p-4 w-11/12 md:w-full lg:w-11/12 mx-auto">
          {featureData.map((card, index) => (
            <HomePageCard
              key={index} // Using index as key since the card data is static
              title={card.title}
              description={card.description}
              imageUrl={card.imageUrl}
            />
          ))}
        </div>
      </div>
    )
}

export default FeatureSection