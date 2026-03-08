'use client'

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image, { StaticImageData } from "next/image";

interface TravelCardProps {
  title: string;
  image: StaticImageData | string;
  onPrev: () => void;
  onNext: () => void;
}

const AnimatedCard = ({ title, image, onPrev, onNext }: TravelCardProps) => {
  return (
    <CardContainer className="inter-var">
      <CardBody className="backdrop-blur-sm relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/10 dark:border-white/20 border-black/10 w-auto sm:w-120 rounded-xl p-6 border">

        <CardItem translateZ="50" className="text-xl font-bold text-primary-brand">
          Discover Paradise
        </CardItem>

        <CardItem as="p" translateZ="60" className="text-neutral-800 text-sm max-w-sm mt-2">
          Explore breathtaking destinations with immersive travel previews.
        </CardItem>

        <CardItem translateZ="100" className="w-full mt-4">
          <div className="relative">
            <Image
              src={image}
              height={1000}
              width={1000}
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt={title}
            />
            <h1 className="absolute bottom-4 left-4 text-white text-2xl font-bold drop-shadow-lg">
              {title}
            </h1>
          </div>
        </CardItem>

        {/* Arrow Buttons */}
        <div className="flex justify-center items-center gap-10 mt-10">
          <CardItem translateZ={20} as="button"
            onClick={onPrev}
            className="px-6 py-2 rounded-lg cursor-pointer bg-linear-to-r from-primary-brand via-primary-brand-hover to-primary-brand-active text-white text-xs font-bold"
          >
            <ChevronLeft/>
          </CardItem>

          <CardItem translateZ={20} as="button"
            onClick={onNext}
            className="px-6 py-2 rounded-lg cursor-pointer bg-linear-to-r from-primary-brand via-primary-brand-hover to-primary-brand-active text-white text-xs font-bold"
          >
            <ChevronRight/>
          </CardItem>
        </div>

      </CardBody>
    </CardContainer>
  );
};

export default AnimatedCard;
