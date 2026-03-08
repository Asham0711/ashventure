import DestinationSection from "@/components/Homepage/DestinationSection";
import ExploreSection from "@/components/Homepage/ExploreSection";
import FeatureSection from "@/components/Homepage/FeatureSection";
import GallerySection from "@/components/Homepage/GallerySection";
import HeroSection from "@/components/Homepage/HeroSection";

export default function Home() {
    return (
        <div className="max-w-screen min-h-screen container bg-primary-background mx-auto overflow-x-hidden">
            {/* Hero Section */}
            <HeroSection/>
            {/* Feature section */}
            <FeatureSection/>
            {/* Destination section */}
            <DestinationSection/>
            {/* Gallery Section */}
            <GallerySection />
            {/* Explore section */}
            <ExploreSection/>
        </div>
    );
}
