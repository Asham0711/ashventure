import HighlightText from "../common/HighlightText"
import founding from '../../../public/assets/aboutSection/founding.jpg'
import Image from "next/image"

const FoundingSection = () => {
    return (
        <div className="max-w-screen container mx-auto md:px-4 px-2 md:py-12 py-6 overflow-x-hidden mt-4 flex justify-between items-center bg-secondary-background">
            <div className='md:w-2/3 space-y-6 px-8'>
                <h1 className='text-3xl text-center font-bold'><HighlightText text='Our Founding Story' /></h1>
                <p className='text-xs md:text-lg text-left'>Our journey started with a simple idea: to make travel planning easy, enjoyable, and accessible
                    for everyone. Frustrated by the hassle of managing countless bookings, schedules, and destinations,
                    we decided to create a platform that would bring it all together seamlessly. Our mission is to 
                    empower travelers to explore the world on their terms — without the stress of planning.
                </p>
                <p className='text-xs md:text-lg text-left'>By blending smart technology with a passion for discovery, we’ve built a tool that transforms 
                    ideas into personalized itineraries, making each trip as unique as the traveler. Today, our growing
                    community shares our love for adventure, and we’re excited to help others create memories that 
                    last a lifetime.
                </p>
            </div>
            <div className="hidden md:flex justify-center items-center w-1/3">
                <Image
                    src={founding}
                    alt="Founding"
                    className='w-96 rounded-3xl'
                />
            </div>
        </div>
    )
}

export default FoundingSection