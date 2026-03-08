'use client'

import { motion } from "framer-motion";
import { FC, ReactNode } from "react";

interface FlipIconProps {
  icon: ReactNode; // Accepts a JSX element
}

const FlipIcon: FC<FlipIconProps> = ({ icon }) => {

  return (
    <motion.div
      className="flex items-center justify-center cursor-pointer"
      whileHover={{ rotateY: 180 }} // Flips the icon on hover
      transition={{ duration: 0.5 }} // Smooth transition effect
      style={{ perspective: 1000 }} // Adds perspective for 3D effect
    >
      {icon}
    </motion.div>
  );
};

export default FlipIcon;