import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const MONTHS = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December"
];

interface MonthDropdownProps {
  value?: string;
  onChange: (value: string) => void;
}

export function MonthDropdown({ value, onChange }: MonthDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 rounded-md
                   bg-black/20 border border-white/20 text-white/80
                   hover:bg-black/30 transition"
      >
        <span className={value ? "text-white" : "text-white/40"}>
          {value || "Select travel month"}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-2 w-full rounded-md
                        bg-primary-background border border-white/20
                        shadow-xl max-h-48 overflow-y-auto">
          {MONTHS.map((month) => (
            <button
              key={month}
              type="button"
              onClick={() => {
                onChange(month);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm transition cursor-pointer
                ${
                  value === month
                    ? "bg-primary-brand text-black"
                    : "text-white/70 hover:bg-primary-brand/10"
                }`}
            >
              {month}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}