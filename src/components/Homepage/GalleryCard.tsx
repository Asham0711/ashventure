'use client'

import Image, { StaticImageData } from "next/image";

interface GalleryCardProps {
  image: StaticImageData | string;
  title: string;
  className?: string;
}

const GalleryCard = ({ image, title, className = ""}: GalleryCardProps) => {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover rounded-xl"
      />
      <div className="absolute inset-0 bg-black/10 rounded-xl" />
      <h1 className="absolute bottom-4 left-4 text-white text-lg font-bold drop-shadow-xl">
        {title}
      </h1>
    </div>
  );
};

export default GalleryCard;
