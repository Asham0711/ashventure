"use client";

import { cn } from "@/lib/utils";
import React, { useCallback, useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: { imageUrl: StaticImageData | string; title: string }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollerRef = useRef<HTMLUListElement | null>(null);

  /** ----------------------------
   *  SET DIRECTION
   * ----------------------------- */
  const setDirection = useCallback(() => {
    if (!containerRef.current) return;
    containerRef.current.style.setProperty(
      "--animation-direction",
      direction === "left" ? "forwards" : "reverse"
    );
  }, [direction]);

  /** ----------------------------
   *  SET SPEED
   * ----------------------------- */
  const setSpeed = useCallback(() => {
    if (!containerRef.current) return;

    const dur =
      speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";

    containerRef.current.style.setProperty("--animation-duration", dur);
  }, [speed]);

  /** ----------------------------
   *  RUN ONCE (NO setState inside!)
   * ----------------------------- */
  useEffect(() => {
    if (!containerRef.current || !scrollerRef.current) return;

    const scroller = scrollerRef.current;

    // duplicate items once
    if (scroller.dataset.duplicated !== "true") {
      const originalItems = Array.from(scroller.children);

      originalItems.forEach((item) => {
        const clone = item.cloneNode(true);
        scroller.appendChild(clone);
      });

      scroller.dataset.duplicated = "true";
    }

    // apply speed + direction
    setDirection();
    setSpeed();

    // start animation by toggling CSS class on DOM (NOT via React state)
    scroller.classList.add("animate-scroll");
  }, [setDirection, setSpeed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden",
        "mask-[linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full flex-nowrap gap-6 py-6 shrink-0",
          pauseOnHover && "hover:paused"
        )}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className="relative w-[280px] h-[180px] md:w-[350px] md:h-[220px] shrink-0 rounded-2xl overflow-hidden shadow-lg"
          >
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-transparent" />

            <h2 className="absolute bottom-4 left-4 text-white text-lg font-bold drop-shadow-lg">
              {item.title}
            </h2>
          </li>
        ))}
      </ul>
    </div>
  );
};
