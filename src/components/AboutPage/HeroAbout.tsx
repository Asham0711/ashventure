'use client'

import HighlightText from "../common/HighlightText"
import { motion } from "framer-motion"
import PrimaryButton from "../common/PrimaryButton"
import AnimatedCard from "./AnimatedCard"
import { useState } from "react"
import { aboutHeroData } from "@/data"
import { useSession } from "next-auth/react"


const HeroAbout = () => {

    const [index, setIndex] = useState(0);

    const {data: session} = useSession();
    const getPathName = session ? "create-trip" : "/sign-up";

    const handleNext = () => {
        setIndex((prev) => (prev + 1) % aboutHeroData.length)
    }

    const handlePrev = () => {
        setIndex((prev) => (prev - 1 + aboutHeroData.length) % aboutHeroData.length)
    }

    return (
        <div className="bg-[url('/assets/aboutSection/heroAbout.jpg')] bg-cover bg-center w-full h-full lg:h-screen flex justify-start items-center flex-col lg:flex-row pb-5 md:pb-0">
            
            <div className="w-full md:w-11/12 lg:w-[60%] px-6 lg:px-16 pt-8 lg:pt-0 space-y-2  mt-8 md:mt-24 lg:mt-0">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="font-bold text-3xl lg:text-5xl leading-tight md:text-center lg:text-start"
                >
                    Transforming Travel Planning into Effortless,{" "}
                    <HighlightText text="Memorable Adventures" />
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-sm md:text-xl md:text-center lg:text-start"
                >
                    From personalized itineraries to seamless trip coordination, we turn your travel dreams into perfectly crafted journeys—so you can focus on exploring, not planning.
                </motion.p>

                <div className="mt-4 lg:mt-8 flex justify-center lg:justify-start items-center">
                    <PrimaryButton label="Start your adventure" path={getPathName} />
                </div>
            </div>

            {/* Dynamic Card */}
            <div className="lg:w-[40%] w-full hidden md:block">
                <AnimatedCard
                    title={aboutHeroData[index].title}
                    image={aboutHeroData[index].image}
                    onNext={handleNext}
                    onPrev={handlePrev}
                />
            </div>

        </div>
    )
}

export default HeroAbout
