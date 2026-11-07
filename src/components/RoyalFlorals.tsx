"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

// ==========================================
// 1. REALISTIC BOTANICAL ROYAL FLORALS
// ==========================================

export const RealisticRose: React.FC<{
  className?: string;
  size?: number;
  color?: "ruby" | "blush" | "crimson";
}> = ({ className = "", size = 36, color = "ruby" }) => {
  const colors = {
    ruby: {
      outer: "#822B3B",
      mid: "#A3384B",
      inner: "#641F2C",
      core: "#4B1621",
      highlight: "#D9BDB0",
    },
    blush: {
      outer: "#D9BDB0",
      mid: "#E8D5CC",
      inner: "#C59E8E",
      core: "#822B3B",
      highlight: "#FFFDF8",
    },
    crimson: {
      outer: "#641F2C",
      mid: "#822B3B",
      inner: "#4B1621",
      core: "#2E0B13",
      highlight: "#E8D5CC",
    },
  }[color];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-md ${className}`}
    >
      <g>
        {/* Outer Petals */}
        <path
          d="M30 6 C42 6, 54 18, 54 30 C54 42, 42 54, 30 54 C18 54, 6 42, 6 30 C6 18, 18 6, 30 6 Z"
          fill={colors.outer}
          opacity="0.95"
        />
        {/* Layer 2 Petals */}
        <path
          d="M30 11 C40 11, 49 19, 48 30 C47 40, 39 48, 30 48 C20 48, 12 39, 12 30 C12 19, 20 11, 30 11 Z"
          fill={colors.mid}
        />
        {/* Fold Petals */}
        <path
          d="M20 22 C26 14, 38 15, 42 24 C44 32, 36 40, 28 42 C18 42, 16 30, 20 22 Z"
          fill={colors.inner}
        />
        {/* Inner Heart/Spiral */}
        <path
          d="M26 26 C30 20, 36 22, 37 28 C38 34, 31 36, 28 35 C24 34, 23 28, 26 26 Z"
          fill={colors.core}
        />
        {/* Center swirl highlight */}
        <path
          d="M28 27 C31 24, 34 26, 34 29 C34 31, 31 32, 29 31 C27 30, 27 28, 28 27 Z"
          fill={colors.highlight}
          opacity="0.75"
        />
      </g>
    </svg>
  );
};

export const RealisticOrchid: React.FC<{
  className?: string;
  size?: number;
}> = ({ className = "", size = 38 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-md ${className}`}
    >
      <g>
        {/* Back 3 Dorsal & Lateral Sepals (Royal Purple / Lavender) */}
        <path
          d="M30 4 C34 14, 34 22, 30 26 C26 22, 26 14, 30 4 Z"
          fill="#8A5A96"
          stroke="#5E336A"
          strokeWidth="0.8"
        />
        <path
          d="M10 40 C18 34, 25 32, 28 30 C22 36, 17 44, 10 40 Z"
          fill="#9C6CA8"
          stroke="#5E336A"
          strokeWidth="0.8"
        />
        <path
          d="M50 40 C42 34, 35 32, 32 30 C38 36, 43 44, 50 40 Z"
          fill="#9C6CA8"
          stroke="#5E336A"
          strokeWidth="0.8"
        />

        {/* 2 Wide Lateral Petals (Rich Royal Orchid) */}
        <path
          d="M8 20 C18 16, 26 22, 28 29 C22 32, 12 30, 8 20 Z"
          fill="#B685C4"
          stroke="#5E336A"
          strokeWidth="0.8"
        />
        <path
          d="M52 20 C42 16, 34 22, 32 29 C38 32, 48 30, 52 20 Z"
          fill="#B685C4"
          stroke="#5E336A"
          strokeWidth="0.8"
        />

        {/* Orchid Lip (Labellum) - Deep Magenta/Burgundy with Gold Speckles */}
        <path
          d="M24 30 C20 38, 22 48, 30 52 C38 48, 40 38, 36 30 C33 34, 27 34, 24 30 Z"
          fill="#6E204A"
          stroke="#D4AF37"
          strokeWidth="0.8"
        />
        {/* Column (Yellow / Gold Heart) */}
        <circle cx="30" cy="31" r="3.2" fill="#F4D03F" stroke="#B89555" strokeWidth="0.8" />
        <circle cx="28" cy="40" r="1.2" fill="#F4D03F" />
        <circle cx="32" cy="40" r="1.2" fill="#F4D03F" />
        <circle cx="30" cy="44" r="1.2" fill="#F4D03F" />
      </g>
    </svg>
  );
};

export const RealisticDaffodil: React.FC<{
  className?: string;
  size?: number;
}> = ({ className = "", size = 36 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-md ${className}`}
    >
      <g>
        {/* 6 Radiant Golden Yellow Petals */}
        <path
          d="M30 6 C35 16, 34 24, 30 26 C26 24, 25 16, 30 6 Z"
          fill="#F7DC6F"
          stroke="#D4AF37"
          strokeWidth="0.8"
        />
        <path
          d="M50 18 C43 25, 36 27, 33 28 C36 22, 43 14, 50 18 Z"
          fill="#F9E79F"
          stroke="#D4AF37"
          strokeWidth="0.8"
        />
        <path
          d="M50 42 C43 35, 36 33, 33 32 C36 38, 43 46, 50 42 Z"
          fill="#F7DC6F"
          stroke="#D4AF37"
          strokeWidth="0.8"
        />
        <path
          d="M30 54 C25 44, 26 36, 30 34 C34 36, 35 44, 30 54 Z"
          fill="#F9E79F"
          stroke="#D4AF37"
          strokeWidth="0.8"
        />
        <path
          d="M10 42 C17 35, 24 33, 27 32 C24 38, 17 46, 10 42 Z"
          fill="#F7DC6F"
          stroke="#D4AF37"
          strokeWidth="0.8"
        />
        <path
          d="M10 18 C17 25, 24 27, 27 28 C24 22, 17 14, 10 18 Z"
          fill="#F9E79F"
          stroke="#D4AF37"
          strokeWidth="0.8"
        />

        {/* Central Fluted Trumpet (Corona) in Vibrant Gold/Amber */}
        <circle cx="30" cy="30" r="9" fill="#E59866" stroke="#B89555" strokeWidth="1" />
        <circle cx="30" cy="30" r="7" fill="#F39C12" />
        <circle cx="30" cy="30" r="4.5" fill="#D35400" />
      </g>
    </svg>
  );
};

export const OliveMatchaLeafSprig: React.FC<{
  className?: string;
  size?: number;
  orientation?: "left" | "right";
}> = ({ className = "", size = 48, orientation = "left" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${orientation === "right" ? "scale-x-[-1]" : ""} drop-shadow-sm ${className}`}
    >
      <g>
        {/* Olive Stem */}
        <path
          d="M10 50 C22 40, 35 25, 52 10"
          stroke="#556B2F"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Leaf 1 (Olive Green) */}
        <path
          d="M20 42 C16 32, 22 25, 30 32 C28 40, 24 44, 20 42 Z"
          fill="#556B2F"
          stroke="#B89555"
          strokeWidth="0.8"
        />
        {/* Leaf 2 (Matcha Soft Green) */}
        <path
          d="M28 35 C38 32, 42 40, 34 46 C27 45, 25 38, 28 35 Z"
          fill="#8A9A5B"
          stroke="#B89555"
          strokeWidth="0.8"
        />
        {/* Leaf 3 (Olive Light) */}
        <path
          d="M36 26 C32 16, 40 10, 46 18 C44 26, 39 28, 36 26 Z"
          fill="#6E8541"
          stroke="#B89555"
          strokeWidth="0.8"
        />
        {/* Leaf 4 (Matcha Light) */}
        <path
          d="M44 18 C52 16, 56 24, 48 28 C42 27, 41 20, 44 18 Z"
          fill="#A4B577"
          stroke="#B89555"
          strokeWidth="0.8"
        />
        {/* Tip Leaf */}
        <path
          d="M52 10 C54 4, 60 6, 58 12 C55 16, 50 14, 52 10 Z"
          fill="#556B2F"
          stroke="#D4AF37"
          strokeWidth="0.8"
        />
      </g>
    </svg>
  );
};

// ==========================================
// 2. CONNECTING LOVE THREAD WITH HEART (Invitation Section)
// ==========================================

export const ConnectingLoveThread: React.FC<{ isKannada?: boolean }> = ({ isKannada = false }) => {
  return (
    <div className="relative w-full my-6 sm:my-8 flex items-center justify-center select-none" aria-hidden="true">
      {/* Horizontal Curved Sacred Thread (Golden & Crimson with Olive/Matcha accents) */}
      <div className="relative w-full max-w-xl flex items-center justify-center">
        {/* Left Thread (Reaching from Bride) */}
        <div className="flex-1 relative h-6 flex items-center">
          <svg viewBox="0 0 200 24" className="w-full h-full overflow-visible" preserveAspectRatio="none">
            {/* Sacred Golden Crimson Braided Thread */}
            <path
              d="M0 12 Q 100 22, 200 12"
              fill="none"
              stroke="#B89555"
              strokeWidth="2.5"
              strokeDasharray="4 2"
            />
            <path
              d="M0 12 Q 100 22, 200 12"
              fill="none"
              stroke="#641F2C"
              strokeWidth="1.2"
            />
          </svg>
          {/* Olive Leaf Bead on Thread */}
          <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-olive-light border border-gold" />
          <div className="absolute left-2/3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-matcha border border-gold" />
        </div>

        {/* Center Connecting Heart Knot Crest */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="relative mx-3 z-10 flex flex-col items-center"
        >
          {/* Outer Pulsing Golden Halo */}
          <div className="absolute -inset-2 rounded-full bg-gold/20 blur-sm animate-pulse" />

          {/* Heart Medallion */}
          <div className="relative p-2.5 rounded-full bg-gradient-to-tr from-burgundy-dark via-burgundy to-burgundy-light border-2 border-gold shadow-royal-gold flex items-center justify-center">
            <Heart className="w-6 h-6 text-gold-light fill-gold drop-shadow-md" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute -top-1 -right-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-accent" />
            </motion.div>
          </div>

          {/* Golden Ribbon Tag below Heart */}
          <span className="mt-1 px-3 py-0.5 rounded-full bg-ivory-light border border-gold/60 text-[10px] font-serif font-bold uppercase tracking-widest text-burgundy shadow-xs">
            {isKannada ? "ಪವಿತ್ರ ಬಂಧನ" : "Bound by Love"}
          </span>
        </motion.div>

        {/* Right Thread (Reaching to Groom) */}
        <div className="flex-1 relative h-6 flex items-center">
          <svg viewBox="0 0 200 24" className="w-full h-full overflow-visible" preserveAspectRatio="none">
            <path
              d="M0 12 Q 100 2, 200 12"
              fill="none"
              stroke="#B89555"
              strokeWidth="2.5"
              strokeDasharray="4 2"
            />
            <path
              d="M0 12 Q 100 2, 200 12"
              fill="none"
              stroke="#641F2C"
              strokeWidth="1.2"
            />
          </svg>
          {/* Olive Leaf Bead on Thread */}
          <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-matcha border border-gold" />
          <div className="absolute left-2/3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-olive-light border border-gold" />
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. SCROLL-TRIGGERED LETTER POP-IN ANIMATION
// ==========================================

export const AnimatedLetterText: React.FC<{
  text?: string;
  className?: string;
  delay?: number;
}> = ({ text = "", className = "", delay = 0 }) => {
  const containerRef = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true });

  const isKannada = /[\u0C80-\u0CFF]/.test(text);

  // For Kannada, split by words to preserve complex font shaping, samyuktaksharas (conjuncts), and otthaksharas
  // For Latin / English, split by grapheme clusters for character-level pop-in animation
  const units = React.useMemo(() => {
    if (!text) return [];
    if (isKannada) {
      return text.split(/(\s+)/);
    }
    try {
      if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
        // @ts-ignore
        const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
        // @ts-ignore
        return Array.from(segmenter.segment(text), (s: any) => s.segment);
      }
    } catch {}
    return Array.from(text);
  }, [text, isKannada]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isKannada ? 0.08 : 0.035,
        delayChildren: delay,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 14,
      scale: isKannada ? 0.85 : 0.7,
      rotate: isKannada ? 0 : -5,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 14,
        stiffness: 220,
      },
    },
  };

  if (!text || typeof text !== "string") return null;

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      <motion.span
        key={text}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="inline-block"
      >
        {units.map((unit: string, index: number) => {
          if (!unit) return null;
          const isSpace = /^\s+$/.test(unit);
          if (isSpace) {
            return (
              <span key={`space-${index}`} className="inline-block whitespace-pre">
                {unit === " " ? "\u00A0" : unit}
              </span>
            );
          }
          return (
            <motion.span
              key={`u-${index}-${unit}`}
              variants={letterVariants}
              className="inline-block whitespace-pre"
            >
              {unit}
            </motion.span>
          );
        })}
      </motion.span>
    </span>
  );
};

