/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import ItineraryList from "@/components/Trips/ItineraryList";
import TripMap from "@/components/Trips/TripMap";
import Loader from "@/components/common/Loader";
import HighlightText from "@/components/common/HighlightText";
import Image from "next/image";

export default function TripDetailPage() {
  const { tripId } = useParams();

  const [trip, setTrip] = useState<any>(null);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);
  const [loadingImage, setLoadingImage] = useState(false);


  useEffect(() => {
    axios.get(`/api/trips/${tripId}`).then(res => {
      setTrip(res.data.trip);
    });
  }, [tripId]);

  useEffect(() => {
    if (!trip) return;

    const query =
      selectedPlace?.name ||
      trip.destination;

    if (!query) return;

    let active = true;

    setLoadingImage(true);
    setImages([]);

    fetch(`/api/trips/trip-image?query=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => {
        if (active && data?.images) {
          setImages(data.images);
        }
      })
      .finally(() => {
        if (active) setLoadingImage(false);
      });

    return () => {
      active = false;
    };
  }, [trip, selectedPlace]);

  if (!trip) {
    return <Loader fullPage text="Loading your Itinerary..." />;
  }

  const { days, mapSummary } = trip.itinerary;

  const title =
    selectedPlace?.name || trip.destination || "Trip Overview";
  
  const getGridClass = (count: number) => {
    if (count === 1) return "grid-cols-1";
    if (count === 2) return "grid-cols-2";
    if (count === 3) return "grid-cols-3";
    return "grid-cols-2";
  };


  return (
    <div className="max-w-screen min-h-screen container mx-auto overflow-x-hidden">

      {/* HEADER */}
      <div className="lg:w-9/12 w-11/12 mx-auto mt-12 md:mt-20 text-center space-y-4">
        <h1 className="text-3xl lg:text-5xl">
          Relive Your <HighlightText text="Adventure!" />
        </h1>
        <p className="text-base md:text-xl hidden md:block">
          Dive into your personalized itinerary and explore every destination.
        </p>
      </div>

      <div className="flex justify-center flex-col lg:flex-row gap-6 my-8 px-4">

        {/* LEFT */}
        <div className="lg:w-3/5 w-full">
          <ItineraryList
            destination={trip.destination}
            itinerary={days}
            onSelectPlace={setSelectedPlace}
          />
        </div>

        {/* RIGHT */}
        <div className="space-y-4 lg:w-2/5 flex lg:flex-col flex-row justify-between">

          <div className="p-4 border border-white/20 bg-transparent backdrop-blur-sm rounded-xl lg:min-h-[60vh] min-h-[300px] min-w-full relative md:w-1/2 lg:w-full">

            {loadingImage && (
              <Loader
                  text="Loading pictures...."
                  fullPage={false}
              />
            )}
            {!loadingImage && (
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  <HighlightText text={title}/>
                </h3>
                {images.length > 0 && (
                  <div
                    className={`grid gap-3 ${getGridClass(images.length)}`}
                  >
                    {images.slice(0, 6).map((img, idx) => (
                      <Image
                        key={idx}
                        src={img}
                        alt={`${title} ${idx}`}
                        width={400}
                        height={300}
                        className={`
                          w-full object-cover rounded-lg
                          transition hover:scale-[1.03]
                          ${images.length === 1 ? "h-[300px]" : "h-[140px]"}
                        `}
                      />
                    ))}
                  </div>
              )}
            </div>
            )}
            
          </div>
          <div className="hidden md:block md:w-1/2 lg:w-full">
            <TripMap
              center={mapSummary.center}
              selectedPlace={selectedPlace}
            />
          </div>
        </div>
      </div>
    </div>
  );
}