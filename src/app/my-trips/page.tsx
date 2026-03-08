/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import TripCard from "@/components/Trips/TripCard";
import HighlightText from "@/components/common/HighlightText";
import ErrorComponent from "@/components/common/ErrorComponent";
import Loader from "@/components/common/Loader";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MyTripsPage() {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalTrips, setTotalTrips] = useState(0);

    const fetchTrips = async (page = 1) => {
        try {
            setLoading(true);
            const res = await axios.get(`/api/trips/my-trips?page=${page}`);
            setTrips(res.data.trips);
            setTotalPages(res.data.totalPages);
            setCurrentPage(res.data.currentPage);
            setTotalTrips(res.data.totalTrips);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrips(currentPage);
    }, [currentPage]);

  return (
    <div className="max-w-screen min-h-screen container mx-auto overflow-x-hidden w-full h-full">
      {loading && (
        <Loader 
          text="Loading your adventures..." 
          fullPage
        />
      )}
      {!loading && trips.length === 0 && (
        <div className="flex justify-center items-center h-screen">
          <ErrorComponent 
            title="No Adventures Yet!" 
            description="You haven’t planned any trips yet. Create your first adventure and let Ashventure craft a personalized itinerary for you."
            primaryIcon="ArrowLeft"
            primaryLabel="Go to Home"
            primaryPath="/"
            secondaryIcon="Plane"
            secondaryLabel="Create Trip"
            secondaryPath="/create-trip"
          />
        </div>
      )}

      {!loading && trips.length !== 0 && (
        <div>
          <div className="lg:w-9/12 w-11/12 mx-auto mt-16 md:mt-24 flex flex-col justify-center items-center gap-4">
            <h1 className="text-3xl lg:text-5xl text-center">Your <HighlightText text="Travel Stories,"/> All in One Place</h1>
            <p className="text-base md:text-xl text-center hidden md:block">Every trip you’ve planned lives here, beautifully organized in one place. Open any journey to revisit its detailed itinerary, and review all your travel plans—ready to inspire you whenever wanderlust strikes or your next adventure calls.</p>
          </div>
          <div className="md:w-11/12 w-[95%] mx-auto bg-transparent backdrop-blur-sm border border-white/20 md:py-8 md:px-4 py-4 px-2 rounded-3xl my-8 space-y-4">
            {trips.map((trip: any) => (
              <TripCard key={trip._id} trip={trip} />
            ))}
            <div className="flex justify-center items-center gap-4 relative w-11/12 m-auto">
                <div className="bg-transparent border border-white/20 px-4 py-2 rounded-full backdrop-blur-sm flex justify-center items-center gap-4">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        className="cursor-pointer disabled:hover:text-gray-400 disabled:cursor-not-allowed hover:text-primary-brand"
                    >
                        <ChevronLeft />
                    </button>

                    <span className="text-lg">
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        className="cursor-pointer disabled:hover:text-gray-400 disabled:cursor-not-allowed hover:text-primary-brand"
                    >
                        <ChevronRight />
                    </button>
                </div>

                <p className="text-sm md:text-base bg-transparent border border-white/20 px-4 py-2 rounded-full backdrop-blur-sm absolute right-0 hidden md:block">
                    Total Trips: {totalTrips}
                </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
