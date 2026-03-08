import HighlightText from "@/components/common/HighlightText"
import Image from "next/image"
import privacy from '../../../../public/assets/privacy.png'
import { privacyData } from "@/data"

const PrivacyPage = () => {
    return (
        <div className="max-w-screen min-h-screen container mx-auto overflow-x-hidden w-full h-full">
            <div className="mx-auto p-4 overflow-x-hidden mt-16">
                <h1 className="md:text-5xl text-3xl text-center">Your <HighlightText text="Privacy"/>, Our Priority</h1>
            </div>
            <div className="justify-center items-center hidden md:flex">
                <div className="md:w-[50%] w-11/12 mx-auto md:mx-0 md:space-y-4 space-y-2 mb-4 md:mb-0">
                    <p className="md:text-3xl text-xl md:text-start text-center">Welcome to our Privacy Policy</p>
                    <p className="md:text-xl text-sm md:text-start text-center">We’re committed to safeguarding your personal information and ensuring transparency about how we handle data. This page outlines how we collect, use, and protect your personal information when you interact with our services.</p>
                    <p className="md:text-xl text-sm md:text-start text-center">By using our website, you consent to the terms laid out here. If you have any questions, feel free to contact us.</p>
                </div>
                <div>
                    <Image
                        src={privacy}
                        alt="Privacy Policy"
                        className='w-80'
                    />
                </div>
            </div>
            
            <div className="md:space-y-8 space-y-4 border border-white/20 rounded-3xl md:w-9/11 w-11/12 mx-auto bg-transparent backdrop-blur-sm md:py-10 py-4 mb-8">
                {privacyData.map((section, index) => (
                    <section
                        key={index}
                        className="px-4 md:px-8"
                    >
                        <h2 className="md:text-2xl text-lg font-semibold md:mb-3 mb-1">
                            {section.title}
                        </h2>

                        <p className="text-sm md:text-base mb-2 leading-relaxed">
                            {section.description}
                        </p>
                        <ul className="list-disc pl-5 md:mt-4 mt-1 text-sm md:text-base space-y-1">
                            {section.bulletPoints.map((point, i) => (
                                <li key={i}>{point}</li>
                            ))}
                        </ul>
                    </section>
                ))}
            </div>
        </div>
    )
}

export default PrivacyPage