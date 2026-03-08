import HighlightText from "@/components/common/HighlightText";
import HelpSection from "@/components/HelpCenterPage/HelpSection";
import { helpCenterData } from "@/data";

export default function HelpCenterPage() {
  return (
    <div className="max-w-screen min-h-screen container mx-auto overflow-x-hidden w-full h-full">
      <div className="mx-auto p-4 overflow-x-hidden md:mt-16 mt-8 md:mb-8 mb-4">
        <h1 className="md:text-5xl text-3xl text-center md:mb-4"><HighlightText text="Help Center"/></h1>
        <p className="md:text-lg text-base text-center md:w-9/11 w-11/12 mx-auto hidden md:block">Everything you need to know about using AshVenture effectively, from creating your first AI-powered trip to customizing itineraries, exploring destinations with maps, and managing your travel preferences with ease.</p>
      </div>
      <div className="md:space-y-8 space-y-4 border border-white/20 rounded-3xl md:w-9/11 w-11/12 mx-auto bg-transparent backdrop-blur-sm md:py-10 py-4 mb-8">
        {helpCenterData.map((item, index) => (
          <HelpSection
            key={index}
            title={item.title}
            description={item.description}
            steps={item.steps}
          />
        ))}
      </div>
    </div>
  );
}
