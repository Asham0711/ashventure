import { whyUsData } from "@/data"
import HighlightText from "../common/HighlightText"
import AboutCard from "./AboutCard"

const WhyUsSection = () => {
    return (
        <div className="max-w-screen container mx-auto p-4 overflow-x-hidden md:mt-20">
            <h1 className="text-lg md:text-4xl font-semibold text-center mb-4">
                Why Choose <HighlightText text="Ashventure" />
            </h1>
            <div className='bg-primary-brand w-[10%] h-0.5 mx-auto mb-12'></div>
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4 justify-center md:p-4 w-11/12 md:w-full lg:w-11/12 mx-auto mb-12">
                {whyUsData.map((card, index) => (
                    <AboutCard
                        key={index}
                        title={card.title}
                        description={card.description}
                        iconName={card.iconName}
                    />
                ))}
            </div>
        </div>
    )
}

export default WhyUsSection