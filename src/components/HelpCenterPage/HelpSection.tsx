'use client';

type HelpSectionProps = {
  title: string;
  description: string;
  steps: string[];
};

const HelpSection = ({ title, description, steps }: HelpSectionProps) => {
  return (
    <div className="px-4 md:px-8">
      <h2 className="md:text-2xl text-lg font-semibold md:mb-3 mb-1">{title}</h2>
      <p className="text-sm md:text-base mb-2 leading-relaxed">{description}</p>

      <ul className="list-disc pl-5 md:mt-4 mt-1 text-sm md:text-base space-y-1">
        {steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))} 
      </ul>
    </div>
  );
};

export default HelpSection;
