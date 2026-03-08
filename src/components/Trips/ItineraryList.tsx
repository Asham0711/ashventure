'use client'
import HighlightText from "../common/HighlightText";
import DownloadButton from "./DownloadButton";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function ItineraryList({ destination, itinerary, onSelectPlace }: any) {

  return (
    <div className="space-y-4 bg-transparent backdrop-blur-sm border border-white/20 rounded-2xl lg:h-screen md:h-[50vh] h-[60vh] overflow-y-auto no-scrollbar py-4">
      <div className="flex justify-center gap-4 relative">
        <h1 className="md:text-2xl text-lg"><HighlightText text={destination}/></h1>
        <div className="absolute right-2">
          <DownloadButton trip={{ destination, itinerary }} />
        </div>
      </div>
      {itinerary.map((day: any, index: number) => (
        <div key={index} className="border border-white/20 bg-transparent p-4 mx-4 rounded-xl">
          <h2 className="font-semibold md:text-lg text-base">
            {day.title}
          </h2>

          <div className="mt-3 space-y-2">
            {day.activities.map((act: any, i: number) => (
              <div
                key={i}
                onClick={() => onSelectPlace(act.location)}
                className="cursor-pointer md:p-3 rounded-lg hover:bg-white/10 transition"
              >
                <strong>{act.time.toUpperCase()}:</strong> {act.title}
                <p className="text-sm opacity-80">{act.description}</p>
              </div>
            ))}
          </div>

        </div>
      ))}
    </div>
  );
}
