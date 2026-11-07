"use client";

import React, { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  type: "rose" | "jasmine";
}

export const PetalsOverlay: React.FC = () => {
  const [petals, setPetals] = useState<Petal[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mediaQuery.matches) {
        setReducedMotion(true);
        return;
      }
    }

    // Generate balanced random petals (subtle, 12 petals total to keep performance silky smooth)
    const items: Petal[] = Array.from({ length: 14 }).map((_, index) => ({
      id: index,
      left: Math.random() * 95, // 0 - 95%
      size: 14 + Math.random() * 12, // 14px - 26px
      duration: 9 + Math.random() * 7, // 9s - 16s
      delay: Math.random() * 8, // 0s - 8s
      opacity: 0.45 + Math.random() * 0.4,
      type: index % 3 === 0 ? "jasmine" : "rose",
    }));

    setPetals(items);
  }, []);

  if (reducedMotion || petals.length === 0) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden z-20"
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute -top-10 animate-petal-fall"
          style={{
            left: `${petal.left}%`,
            width: `${petal.size}px`,
            height: `${petal.size}px`,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
            opacity: petal.opacity,
          }}
        >
          {petal.type === "rose" ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-full h-full text-burgundy"
            >
              {/* Soft rose petal curve */}
              <path
                d="M12 2C8 6 3 11 5 18C7 22 17 22 19 18C21 11 16 6 12 2Z"
                fill="#822B3B"
                fillOpacity="0.75"
              />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-full h-full text-ivory-light"
            >
              {/* Jasmine blossom petal */}
              <path
                d="M12 3C9 7 6 12 8 17C10 21 14 21 16 17C18 12 15 7 12 3Z"
                fill="#FFFDF7"
                fillOpacity="0.95"
                stroke="#B89555"
                strokeWidth="0.5"
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};

