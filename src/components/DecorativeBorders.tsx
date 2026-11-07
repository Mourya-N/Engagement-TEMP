"use client";

import React from "react";
import { motion } from "framer-motion";

export const RoyalCornerFlourish: React.FC<{
  className?: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}> = ({ className = "", position = "top-left" }) => {
  const getRotation = () => {
    switch (position) {
      case "top-right":
        return "scale-x-[-1]";
      case "bottom-left":
        return "scale-y-[-1]";
      case "bottom-right":
        return "scale-[-1]";
      default:
        return "";
    }
  };

  return (
    <div
      className={`pointer-events-none absolute w-16 h-16 sm:w-24 sm:h-24 ${getRotation()} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-gold opacity-85"
      >
        <path
          d="M4 4 C 30 4, 40 14, 50 25 C 60 36, 75 45, 96 46"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M4 4 C 4 30, 14 40, 25 50 C 36 60, 45 75, 46 96"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M8 8 C 25 8, 35 18, 42 26 C 26 35, 18 25, 8 8 Z"
          fill="currentColor"
          fillOpacity="0.25"
          stroke="currentColor"
          strokeWidth="1"
        />
        <circle cx="16" cy="16" r="3" fill="currentColor" />
        <circle cx="28" cy="12" r="2" fill="currentColor" />
        <circle cx="12" cy="28" r="2" fill="currentColor" />
        <path
          d="M4 4 L 4 35 M 4 4 L 35 4"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="square"
        />
      </svg>
    </div>
  );
};

export const RoyalDivider: React.FC<{
  className?: string;
  variant?: "lotus" | "simple" | "diya" | "kalash";
}> = ({ className = "", variant = "lotus" }) => {
  return (
    <div className={`flex items-center justify-center my-6 sm:my-8 select-none ${className}`}>
      <div className="h-[1px] w-16 sm:w-32 bg-gradient-to-r from-transparent via-gold to-gold/70" />
      <div className="mx-3 sm:mx-4 flex items-center text-gold">
        {variant === "lotus" && (
          <svg
            className="w-7 h-7 sm:w-9 sm:h-9"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 6 C21 13 26 19 28 26 C23 26 21 21 20 18 C19 21 17 26 12 26 C14 19 19 13 20 6Z"
              fill="#B89555"
              fillOpacity="0.85"
            />
            <path
              d="M20 18 C24 16 32 20 34 27 C28 29 24 26 20 22 C16 26 12 29 6 27 C8 20 16 16 20 18Z"
              fill="#641F2C"
              fillOpacity="0.75"
            />
            <path
              d="M10 27 C15 31 25 31 30 27 C26 33 14 33 10 27 Z"
              fill="#B89555"
            />
            <circle cx="20" cy="24" r="1.5" fill="#F8F1E5" />
          </svg>
        )}
        {variant === "kalash" && (
          <svg
            className="w-7 h-7 sm:w-8 sm:h-8"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Traditional Indian Sacred Kalash */}
            <circle cx="16" cy="7" r="3" fill="#B89555" />
            <path d="M16 10 L13 14 L19 14 Z" fill="#263D32" />
            <path d="M11 14 C10 18 8 20 10 24 C12 27 20 27 22 24 C24 20 22 18 21 14 Z" fill="#B89555" />
            <rect x="12" y="26" width="8" height="2" rx="1" fill="#641F2C" />
          </svg>
        )}
        {variant === "diya" && (
          <svg
            className="w-6 h-6 sm:w-8 sm:h-8"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 4 C17 8 19 11 18 14 C17 16 15 16 14 14 C13 11 15 8 16 4Z"
              fill="#D4AF37"
            />
            <path
              d="M8 17 C10 23 22 23 24 17 C25 21 21 25 16 25 C11 25 7 21 8 17Z"
              fill="#B89555"
            />
          </svg>
        )}
        {variant === "simple" && (
          <div className="flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="w-2.5 h-2.5 rotate-45 border border-gold bg-gold/30" />
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
          </div>
        )}
      </div>
      <div className="h-[1px] w-16 sm:w-32 bg-gradient-to-l from-transparent via-gold to-gold/70" />
    </div>
  );
};

export const MandapArchFrame: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return (
    <div
      className={`relative p-6 sm:p-10 md:p-14 bg-ivory/85 backdrop-blur-sm rounded-t-[50px] sm:rounded-t-[80px] rounded-b-2xl border-2 border-gold/40 shadow-royal transition-all duration-300 ${className}`}
      style={{
        backgroundImage: `radial-gradient(circle at 50% 0%, rgba(184, 149, 85, 0.08) 0%, transparent 70%)`,
      }}
    >
      <RoyalCornerFlourish position="top-left" className="top-2 left-2" />
      <RoyalCornerFlourish position="top-right" className="top-2 right-2" />
      <RoyalCornerFlourish position="bottom-left" className="bottom-2 left-2" />
      <RoyalCornerFlourish position="bottom-right" className="bottom-2 right-2" />

      {/* Decorative top arch crest */}
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex items-center justify-center bg-ivory px-4 py-1 border border-gold/50 rounded-full shadow-sm">
        <span className="text-xs uppercase tracking-widest text-gold font-medium">
          ✦ ॐ ✦
        </span>
      </div>

      {children}
    </div>
  );
};

export const FloralLeavesContinuousAnimation: React.FC = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-visible" aria-hidden="true">
      {/* 1. TOP-LEFT ROYAL BOTANICAL VINE (Continuous gentle swaying) */}
      <motion.div
        animate={{
          rotate: [-3, 3, -3],
          y: [-2, 3, -2],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ transformOrigin: "top left" }}
        className="absolute -top-6 -left-8 sm:-top-8 sm:-left-12 w-24 h-24 sm:w-32 sm:h-32 text-gold opacity-90 drop-shadow-md"
      >
        <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
          {/* Main arching vine stem */}
          <path
            d="M10 10 C 35 25, 60 40, 95 70"
            stroke="#B89555"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Emerald & Gold Leaves */}
          <path
            d="M30 22 C 20 12, 15 28, 30 22 Z"
            fill="#263D32"
            stroke="#B89555"
            strokeWidth="1"
          />
          <path
            d="M48 32 C 40 18, 58 18, 48 32 Z"
            fill="#D4AF37"
            stroke="#96753A"
            strokeWidth="1"
          />
          <path
            d="M62 45 C 50 55, 45 40, 62 45 Z"
            fill="#355244"
            stroke="#B89555"
            strokeWidth="1"
          />
          <path
            d="M75 52 C 85 40, 90 55, 75 52 Z"
            fill="#D4AF37"
            stroke="#96753A"
            strokeWidth="1"
          />
          <path
            d="M92 68 C 105 60, 100 78, 92 68 Z"
            fill="#263D32"
            stroke="#B89555"
            strokeWidth="1"
          />
          {/* Auspicious Jasmine Blossoms */}
          <circle cx="36" cy="27" r="4.5" fill="#FFFDF8" stroke="#D4AF37" strokeWidth="1.2" />
          <circle cx="36" cy="27" r="1.5" fill="#D4AF37" />
          <circle cx="70" cy="48" r="5" fill="#FFFDF8" stroke="#D4AF37" strokeWidth="1.2" />
          <circle cx="70" cy="48" r="1.8" fill="#D4AF37" />
        </svg>
      </motion.div>

      {/* 2. TOP-RIGHT ROYAL BOTANICAL VINE (Continuous gentle swaying) */}
      <motion.div
        animate={{
          rotate: [3, -3, 3],
          y: [-2, 3, -2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ transformOrigin: "top right" }}
        className="absolute -top-6 -right-8 sm:-top-8 sm:-right-12 w-24 h-24 sm:w-32 sm:h-32 text-gold opacity-90 drop-shadow-md scale-x-[-1]"
      >
        <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
          <path
            d="M10 10 C 35 25, 60 40, 95 70"
            stroke="#B89555"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M30 22 C 20 12, 15 28, 30 22 Z"
            fill="#263D32"
            stroke="#B89555"
            strokeWidth="1"
          />
          <path
            d="M48 32 C 40 18, 58 18, 48 32 Z"
            fill="#D4AF37"
            stroke="#96753A"
            strokeWidth="1"
          />
          <path
            d="M62 45 C 50 55, 45 40, 62 45 Z"
            fill="#355244"
            stroke="#B89555"
            strokeWidth="1"
          />
          <path
            d="M75 52 C 85 40, 90 55, 75 52 Z"
            fill="#D4AF37"
            stroke="#96753A"
            strokeWidth="1"
          />
          <path
            d="M92 68 C 105 60, 100 78, 92 68 Z"
            fill="#263D32"
            stroke="#B89555"
            strokeWidth="1"
          />
          <circle cx="36" cy="27" r="4.5" fill="#FFFDF8" stroke="#D4AF37" strokeWidth="1.2" />
          <circle cx="36" cy="27" r="1.5" fill="#D4AF37" />
          <circle cx="70" cy="48" r="5" fill="#FFFDF8" stroke="#D4AF37" strokeWidth="1.2" />
          <circle cx="70" cy="48" r="1.8" fill="#D4AF37" />
        </svg>
      </motion.div>

      {/* 3. CONTINUOUS FLOATING LEAF 1 (Left Upper - Emerald Leaf) */}
      <motion.div
        animate={{
          y: [-12, 12, -12],
          x: [-6, 6, -6],
          rotate: [-18, 15, -18],
        }}
        transition={{
          duration: 4.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 -left-5 sm:-left-8 w-7 h-7 sm:w-9 sm:h-9 opacity-85"
      >
        <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-sm">
          <path
            d="M8 32 C 12 18, 25 8, 36 6 C 30 20, 20 28, 8 32 Z"
            fill="#263D32"
            stroke="#B89555"
            strokeWidth="1"
          />
          <path d="M12 28 Q 22 20 34 8" stroke="#B89555" strokeWidth="0.8" />
        </svg>
      </motion.div>

      {/* 4. CONTINUOUS FLOATING FLOWER 1 (Left Middle - Royal Jasmine Bloom) */}
      <motion.div
        animate={{
          y: [10, -14, 10],
          x: [4, -8, 4],
          rotate: [0, 360],
        }}
        transition={{
          y: { duration: 5.2, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 24, repeat: Infinity, ease: "linear" },
        }}
        className="absolute top-1/2 -left-6 sm:-left-9 w-6 h-6 sm:w-8 sm:h-8 opacity-90 drop-shadow-md"
      >
        <svg viewBox="0 0 32 32" className="w-full h-full">
          {/* 5 Petal Jasmine */}
          <circle cx="16" cy="16" r="3" fill="#D4AF37" />
          <circle cx="16" cy="8" r="5" fill="#FFFDF8" stroke="#D4AF37" strokeWidth="0.8" />
          <circle cx="23.6" cy="13.5" r="5" fill="#FFFDF8" stroke="#D4AF37" strokeWidth="0.8" />
          <circle cx="20.7" cy="22.5" r="5" fill="#FFFDF8" stroke="#D4AF37" strokeWidth="0.8" />
          <circle cx="11.3" cy="22.5" r="5" fill="#FFFDF8" stroke="#D4AF37" strokeWidth="0.8" />
          <circle cx="8.4" cy="13.5" r="5" fill="#FFFDF8" stroke="#D4AF37" strokeWidth="0.8" />
          <circle cx="16" cy="16" r="2.2" fill="#D4AF37" />
        </svg>
      </motion.div>

      {/* 5. CONTINUOUS FLOATING LEAF 2 (Right Upper - Golden Leaf) */}
      <motion.div
        animate={{
          y: [14, -10, 14],
          x: [8, -6, 8],
          rotate: [15, -20, 15],
        }}
        transition={{
          duration: 5.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 -right-6 sm:-right-9 w-8 h-8 sm:w-10 sm:h-10 opacity-85"
      >
        <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-sm">
          <path
            d="M32 32 C 28 18, 15 8, 4 6 C 10 20, 20 28, 32 32 Z"
            fill="#D4AF37"
            stroke="#96753A"
            strokeWidth="1"
          />
          <path d="M28 28 Q 18 20 6 8" stroke="#96753A" strokeWidth="0.8" />
        </svg>
      </motion.div>

      {/* 6. CONTINUOUS FLOATING FLOWER 2 (Right Lower - Rose Petal) */}
      <motion.div
        animate={{
          y: [-12, 12, -12],
          x: [-5, 8, -5],
          rotate: [-15, 25, -15],
        }}
        transition={{
          duration: 5.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 -right-5 sm:-right-8 w-6 h-6 sm:w-7 sm:h-7 opacity-90 drop-shadow-md"
      >
        <svg viewBox="0 0 32 32" className="w-full h-full">
          <path
            d="M16 4 C 8 8, 4 18, 12 26 C 20 34, 28 24, 24 14 C 20 4, 16 4, 16 4 Z"
            fill="#D9BDB0"
            stroke="#B89555"
            strokeWidth="0.8"
          />
          <path
            d="M16 8 C 11 11, 8 18, 14 23 C 19 28, 24 21, 21 14 Z"
            fill="#E8D5CC"
          />
        </svg>
      </motion.div>

      {/* 7. CONTINUOUS FLOATING LEAF 3 (Bottom-Left - Delicate Foliage) */}
      <motion.div
        animate={{
          y: [8, -8, 8],
          rotate: [-10, 10, -10],
        }}
        transition={{
          duration: 4.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-12 -left-4 sm:-left-6 w-6 h-6 opacity-75"
      >
        <svg viewBox="0 0 30 30" className="w-full h-full">
          <path
            d="M5 25 C 10 12, 20 6, 26 5 C 22 15, 14 22, 5 25 Z"
            fill="#355244"
            stroke="#B89555"
            strokeWidth="0.8"
          />
        </svg>
      </motion.div>
    </div>
  );
};
