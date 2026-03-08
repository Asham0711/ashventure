/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ItineraryPDF from "./ItineraryPDF";
import { Download } from "lucide-react";

export default function DownloadButton({ trip }: any) {
  const [readyTrip, setReadyTrip] = useState<any>(null);

  useEffect(() => {
    const attachImages = async () => {
      const updatedDays = await Promise.all(
        trip.itinerary.map(async (day: any) => {
          const updatedActivities = await Promise.all(
            day.activities.map(async (act: any) => {
              const res = await fetch(
                `/api/trips/trip-image?query=${encodeURIComponent(
                  act.title || act.location.name
                )}`
              );
              const data = await res.json();

              return {
                ...act,
                imageUrl: data?.images?.[0],
              };
            })
          );

          return { ...day, activities: updatedActivities };
        })
      );

      setReadyTrip({
        ...trip,
        itinerary: updatedDays,
      });
    };

    attachImages();
  }, [trip]);


    if (!readyTrip) {
      return (
        <button className="flex items-center gap-2 font-bold text-white bg-primary-brand md:px-4 py-1 px-1 md:rounded-lg rounded opacity-70">
          Preparing PDF...
        </button>
      );
    }
    return (
        <PDFDownloadLink
            document={<ItineraryPDF trip={readyTrip} />}
            fileName={`${trip.destination}-itinerary.pdf`}
            className="flex items-center gap-2 font-bold cursor-pointer text-white
            bg-primary-brand md:px-4 py-1 px-1 md:rounded-lg rounded"
        >
            <Download size={18} />
            <div className="hidden md:block">Download</div>
        </PDFDownloadLink>
    );
}