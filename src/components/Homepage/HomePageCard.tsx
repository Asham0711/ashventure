'use client'

import Image, { StaticImageData } from "next/image";

interface CardProps {
  title: string;
  description: string;
  imageUrl: StaticImageData | string;
}
const HomePageCard: React.FC<CardProps> = ({ title, description, imageUrl }) => {
    return (
        <div className="flex flex-col items-center bg-primary-background backdrop-blur-sm card rounded-lg">
            <div className="w-full max-h-52 overflow-hidden mb-4">
                <Image 
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="px-4 pb-4">
                <h2 className="text-xl font-bold text-primary-brand mb-2 text-center">{title}</h2>
                <p className="text-center text-sm px-2">{description}</p>
            </div>
        </div>
    );
}

export default HomePageCard