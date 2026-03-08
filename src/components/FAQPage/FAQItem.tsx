'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-white/20 md:p-4 p-2 md:rounded-lg rounded-md">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center"
      >
        <p className="md:text-md text-sm text-start">{question}</p>
        <ChevronRight
          className={`transition-transform duration-300 ${open ? "rotate-90" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="md:text-sm text-xs mt-2 opacity-80"
          >
            {answer}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQItem;