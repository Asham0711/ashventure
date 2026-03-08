/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import * as Icons from "lucide-react";
import React from "react";
interface LucideExtendedProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

type LucideIcon = React.FC<LucideExtendedProps>;

// Filter only lucide components
const lucideIcons = Object.fromEntries(
  Object.entries(Icons).filter(([_, value]) => {
    return (
      typeof value === "function" ||
      (typeof value === "object" && "displayName" in value)
    );
  })
) as Record<string, LucideIcon>;

interface AboutCardProps {
  iconName: keyof typeof lucideIcons;
  title: string;
  description: string;
}

const AboutCard: React.FC<AboutCardProps> = ({ iconName, title, description }) => {
  const Icon = lucideIcons[iconName];

  return (
    <div className="flex flex-col items-center bg-primary-background backdrop-blur-sm card rounded-lg p-6 space-y-4 text-center">
        {/* Icon */}
        <div className="p-3 bg-primary-brand/10 rounded-full">
            <Icon size={48} strokeWidth={2} className="text-primary-brand" />
        </div>

        <div className="px-4 pb-4">
            <h2 className="text-xl font-bold text-primary-brand mb-2 text-center">{title}</h2>
            <p className="text-center text-sm px-2">{description}</p>
        </div>
    </div>
  );
};

export default AboutCard;