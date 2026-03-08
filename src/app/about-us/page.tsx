import FoundingSection from "@/components/AboutPage/FoundingSection";
import HeroAbout from "@/components/AboutPage/HeroAbout";
import MissionSection from "@/components/AboutPage/MissionSection";
import WhyUsSection from "@/components/AboutPage/WhyUsSection";

const AboutPage = () => {
    return (
        <div className="max-w-screen min-h-screen container bg-primary-background mx-auto overflow-x-hidden">
            {/* Hero Section */}
            <HeroAbout />
            {/* Mission Section */}
            <MissionSection/>
            {/* Founding Section */}
            <FoundingSection />
            {/* Why Us Section */}
            <WhyUsSection />
        </div>
    )
}

export default AboutPage;