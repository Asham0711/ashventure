'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import FAQItem from "./FAQItem";

interface FAQCategoryProps {
  category: string;
  items: {
    question: string;
    answer: string;
  }[];
}

const FAQCategory: React.FC<FAQCategoryProps> = ({ category, items }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-white/20 md:rounded-xl rounded-md md:p-4 p-2">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center"
      >
        <h2 className="md:text-xl text-md font-semibold">{category}</h2>
        <ChevronDown
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mt-3 space-y-3"
          >
            {items.map((item, i) => (
              <FAQItem key={i} question={item.question} answer={item.answer} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQCategory;