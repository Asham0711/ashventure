"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Portal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
        setMounted(true);
    });

    return () => cancelAnimationFrame(id);
    }, []);

  if (!mounted) return null;

  return createPortal(children, document.body);
}
