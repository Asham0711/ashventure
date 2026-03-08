/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

export default function TripCard({ trip }: any) {
    const router = useRouter();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { toast } = useToast();

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`/api/trips/${trip._id}`);
            if(response.data.success){
                setShowDeleteModal(false);
                toast({
                    title: "Trip Deleted Successfully!",
                    description: response.data.message,
                });

                window.location.reload();
            }
        } catch (error: any) {
            toast({
                title: "Something went wrong",
                description: error.message,
                variant: "destructive",
            });
            setShowDeleteModal(false);
        }
    }
    return (
        <div className="border border-white/20 rounded-2xl md:py-8 md:px-6 py-4 px-3 bg-transparent flex flex-col md:flex-row justify-center items-center gap-4 md:gap-0">
            <div className="md:w-7/10 space-y-4 w-full">
                <h2 className="md:text-2xl text-xl font-semibold tracking-wide">{trip.destination}</h2>
                <div className="md:text-sm text-xs grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                    <div>
                        <p className="text-gray-400 md:text-lg font-bold">No. of People</p>
                        <p className="font-medium">{trip.people} people</p>
                    </div>
                    <div>
                        <p className="text-gray-400 md:text-lg font-bold">No. of Days</p>
                        <p className="font-medium capitalize">{trip.days} days</p>
                    </div>
                    <div>
                        <p className="text-gray-400 md:text-lg font-bold">Trip Type</p>
                        <p className="font-medium">{trip.tripType} trip</p>
                    </div>
                    <div>
                        <p className="text-gray-400 md:text-lg font-bold">Budget Type</p>
                        <p className="font-medium">{trip.budget}</p>
                    </div>
                </div>
            </div>
            <div className="md:w-4/12 w-full gap-4 flex lg:flex-row flex-col md:justify-end justify-center">
                <Button
                    onClick={() => router.push(`/my-trips/${trip._id}`)}
                >
                    View Details
                </Button>
                <Button
                    variant="outline"
                    onClick={() => setShowDeleteModal(true)}
                >
                    Delete Trip
                </Button>
            </div>

            {showDeleteModal &&
                typeof window !== "undefined" &&
                createPortal(
                    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                        <div className="relative z-10 w-[90%] max-w-md rounded-2xl border border-white/20 bg-black p-6 shadow-xl">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="absolute right-4 top-4 text-gray-400 hover:text-white cursor-pointer"
                            >
                                <X size={18} />
                            </button>

                            <h3 className="text-xl font-semibold text-red-400">
                                Confirm Delete
                            </h3>

                            <p className="text-sm text-gray-300 mt-2">
                                Are you sure? This action is permanent and cannot be undone.
                            </p>

                            <div className="mt-6 flex gap-4 justify-end">
                                <Button
                                    variant="secondary"
                                    onClick={() => setShowDeleteModal(false)}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    variant="destructive"
                                    onClick={handleDelete}
                                >
                                    Yes, Delete
                                </Button>
                            </div>
                        </div>
                    </div>,
                    document.body
                )
            }
        </div>
    );
}
