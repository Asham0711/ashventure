import HighlightText from "@/components/common/HighlightText";
import CreateTripForm from "@/components/CreateTrip/CreateTripForm";


export default function CreateTripPage() {
  return (
     <div className="max-w-screen min-h-screen container mx-auto overflow-x-hidden w-full h-full">
        <div className="lg:w-9/12 w-11/12 mx-auto mt-16 md:mt-24 flex flex-col justify-center items-center gap-4">
            <h1 className="text-3xl lg:text-5xl text-center">Start Crafting Your Perfect <HighlightText text="Adventure!"/></h1>
            <p className="text-base md:text-xl text-center hidden md:block">Plan, personalize, and bring your dream trip to life with just a few clicks. Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>
        </div>
        <div className="flex justify-center items-center mt-8">
            <CreateTripForm />
        </div>
    </div>
  );
}
