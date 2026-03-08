"use client";

import HighlightText from "@/components/common/HighlightText";
import { termsConditionsData } from "@/data";


const TermsConditions = () => {
  return (
    <div className="max-w-screen min-h-screen container mx-auto overflow-x-hidden w-full h-full">
      <div className="mx-auto p-4 overflow-x-hidden md:mt-16 mt-8 md:mb-8 mb-4">
        <h1 className="md:text-5xl text-3xl text-center md:mb-4"><HighlightText text="Term & Condition"/></h1>
        <p className="md:text-lg text-base text-center md:w-9/11 w-11/12 mx-auto hidden md:block">Welcome to AshVenture. By accessing or using our website and services, you agree to comply with and be bound by these Terms & Conditions. Please read them carefully before using the platform.</p>
      </div>

      <div className="md:space-y-8 space-y-4 border border-white/20 rounded-3xl md:w-9/11 w-11/12 mx-auto bg-transparent backdrop-blur-sm md:py-10 py-4 mb-8">
        {termsConditionsData.map((item, index) => (
          <div key={index} className="px-4 md:px-8">
            <h2 className="md:text-2xl text-lg font-semibold md:mb-3 mb-1">
              {item.title}
            </h2>

            <p className="text-sm md:text-base mb-2 leading-relaxed">
              {item.description}
            </p>

            {item.bulletPoints && (
              <ul className="list-disc pl-5 md:mt-4 mt-1 text-sm md:text-base space-y-1">
                {item.bulletPoints.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TermsConditions;