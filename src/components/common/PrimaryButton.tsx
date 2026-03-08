/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import Link from "next/link";
import * as Icons from "lucide-react";

// Add lucide props manually
interface LucideExtendedProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

type LucideIcon = React.FC<LucideExtendedProps>;

// Filter only valid lucide components
const lucideIcons = Object.fromEntries(
  Object.entries(Icons).filter(([_, value]) => {
    return (
      typeof value === "function" ||
      (typeof value === "object" && "displayName" in value)
    );
  })
) as Record<string, LucideIcon>;

interface ButtonProps {
  label: string;
  path: string;
  iconName?: keyof typeof lucideIcons;
}

const PrimaryButton = ({ label, path, iconName }: ButtonProps) => {
  const Icon = iconName ? lucideIcons[iconName] : null;

  return (
    <Link
      href={path}
      className="inline-flex items-center justify-center gap-2 bg-linear-to-r from-primary-brand via-primary-brand-hover to-primary-brand-active py-2 lg:px-10 px-6 text-sm font-bold 
                 rounded-md cursor-pointer text-white w-auto"
    >
      {Icon && <Icon size={18} strokeWidth={2} />}
      {label}
    </Link>
  );
};

export default PrimaryButton;
