'use client'

import { useSession } from "next-auth/react"
import HighlightText from "../common/HighlightText"
import PrimaryButton from "../common/PrimaryButton"
import SecondaryButton from "../common/SecondaryButton"
import { motion } from "framer-motion"

const HeroSection = () => {
    const {data: session} = useSession();
    const getPathName = session ? "create-trip" : "/sign-up";

    return (
      <div className="bg-[url('/assets/heroBg.jpg')] bg-cover bg-center w-full h-full md:h-[500px] lg:h-screen flex justify-start items-center pb-5 md:pb-0">
        <div className="w-full px-6 lg:px-24 pt-16 lg:pt-0 space-y-2 md:w-[55%] lg:w-[45%]">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }} 
            className="font-bold text-3xl lg:text-6xl"
          >
              A <HighlightText text="Trip Planner"/> <br/>for everyone....
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }} 
            className="text-md md:text-xl"
          >
            Create your itinerary and map your next trip in a free travel app for vacation planning & road trips, powered by AI and Google Maps.
          </motion.p>
          <div className="flex justify-center gap-8 mt-8">
            <SecondaryButton label="Get Started" path={getPathName}/>
            <PrimaryButton label="Contact" path="/contact-us" iconName="Phone"/>
          </div>
        </div>
      </div>
    )
}

export default HeroSection