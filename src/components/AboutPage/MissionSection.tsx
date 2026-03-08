import { missionData } from "@/data"
import HighlightText from "../common/HighlightText"
import { HoverEffect } from "../ui/card-hover-effect"

const MissionSection = () => {
    return (
        <div className="max-w-screen container mx-auto p-4 overflow-x-hidden md:mt-16">
            {/* Feature header */}
            <h1 className="text-lg md:text-4xl font-semibold text-center md:mb-4 mb-2">
                Our Mission and Values
            </h1>
            <div className='bg-primary-brand w-[10%] h-0.5 mx-auto md:mb-4 mb-2'></div>
            <h1 className='text-center text-sm md:text-2xl md:mt-6 mt-4'><HighlightText text='Core Values' /></h1>
            <div className="max-w-5xl mx-auto px-8">
                <HoverEffect items={missionData} />
            </div>
        </div>
    )
}

export default MissionSection