"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedLogoRevealProps {
  isKannada?: boolean;
  onComplete?: () => void;
  size?: number;
}

/**
 * Dramatic logo creation animation:
 * 1. Outer circle draws itself (stroke-dashoffset)
 * 2. Inner circle follows
 * 3. 8 compass dots appear
 * 4. Crown/lotus finial blooms
 * 5. K letter flies in from top-left
 * 6. & appears
 * 7. S letter flies in from bottom-right
 * 8. Olive/matcha leaf sprigs pop in around logo
 * 9. Golden sparkle burst
 * Then: logo shrinks & flies to navbar position
 */
export const AnimatedLogoReveal: React.FC<AnimatedLogoRevealProps> = ({
  isKannada = false,
  onComplete,
  size = 220,
}) => {
  const [phase, setPhase] = useState<
    "circle" | "dots" | "crown" | "K" | "amp" | "S" | "florals" | "burst" | "done"
  >("circle");

  useEffect(() => {
    const timings: Array<[typeof phase, number]> = [
      ["circle", 0],
      ["dots", 700],
      ["crown", 1100],
      ["K", 1500],
      ["amp", 1950],
      ["S", 2250],
      ["florals", 2700],
      ["burst", 3100],
      ["done", 3600],
    ];

    const timers = timings.map(([p, delay]) =>
      setTimeout(() => setPhase(p), delay)
    );

    const doneTimer = setTimeout(() => {
      onComplete?.();
    }, 4200);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  const isAtLeast = (p: typeof phase) => {
    const order = ["circle", "dots", "crown", "K", "amp", "S", "florals", "burst", "done"];
    return order.indexOf(phase) >= order.indexOf(p);
  };

  const cx = size / 2;
  const cy = size / 2;
  const outerR = size * 0.41;
  const innerR = size * 0.38;
  const circumOuter = 2 * Math.PI * outerR;
  const circumInner = 2 * Math.PI * innerR;

  // Gold gradient stops
  const gradId = "logoAnimGold";
  const bgGradId = "logoAnimBg";

  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: size, height: size }}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-[0_8px_32px_rgba(40,10,15,0.5)]"
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8A5E17" />
            <stop offset="25%" stopColor="#5B3808" />
            <stop offset="48%" stopColor="#D4AF37" />
            <stop offset="72%" stopColor="#96753A" />
            <stop offset="100%" stopColor="#B88628" />
          </linearGradient>
          <radialGradient id={bgGradId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F8F4EC" />
            <stop offset="70%" stopColor="#F0E8D8" />
            <stop offset="100%" stopColor="#E8DCC8" />
          </radialGradient>
          <linearGradient id="oliveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#556B2F" />
            <stop offset="100%" stopColor="#8A9A5B" />
          </linearGradient>
        </defs>

        {/* Background fill */}
        <motion.circle
          cx={cx} cy={cy} r={outerR}
          fill={`url(#${bgGradId})`}
          initial={{ opacity: 0 }}
          animate={isAtLeast("circle") ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Outer circle draw-on */}
        <motion.circle
          cx={cx} cy={cy} r={outerR}
          stroke={`url(#${gradId})`}
          strokeWidth={size * 0.015}
          fill="none"
          strokeDasharray={circumOuter}
          initial={{ strokeDashoffset: circumOuter, rotate: -90 }}
          animate={isAtLeast("circle") ? { strokeDashoffset: 0, rotate: -90 } : { strokeDashoffset: circumOuter }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />

        {/* Inner circle draw-on */}
        <motion.circle
          cx={cx} cy={cy} r={innerR}
          stroke={`url(#${gradId})`}
          strokeWidth={size * 0.006}
          fill="none"
          strokeDasharray={circumInner}
          initial={{ strokeDashoffset: circumInner, rotate: -90, opacity: 0.8 }}
          animate={isAtLeast("dots") ? { strokeDashoffset: 0, rotate: -90, opacity: 0.8 } : { strokeDashoffset: circumInner }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />

        {/* 8 Compass Dots */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => {
          const rad = (angle * Math.PI) / 180;
          const dotCx = cx + outerR * Math.cos(rad);
          const dotCy = cy + outerR * Math.sin(rad);
          return (
            <motion.circle
              key={idx}
              cx={dotCx} cy={dotCy}
              r={angle % 90 === 0 ? size * 0.018 : size * 0.01}
              fill={`url(#${gradId})`}
              initial={{ scale: 0, opacity: 0 }}
              animate={isAtLeast("dots") ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.04, type: "spring", stiffness: 400, damping: 15 }}
              style={{ transformOrigin: `${dotCx}px ${dotCy}px` }}
            />
          );
        })}

        {/* Crown / Lotus finial at top */}
        <g transform={`translate(${cx}, ${cy - outerR + size * 0.045}) scale(${size / 200 * 0.9})`}>
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={isAtLeast("crown") ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 350, damping: 18 }}
          >
            <path d="M0 -15 C2 -8 7 -2 10 5 C5 5 1 0 0 -6 C-1 0 -5 5 -10 5 C-7 -2 -2 -8 0 -15 Z" fill={`url(#${gradId})`} />
            <path d="M0 -3 C4 -2 13 1 15 8 C10 9 5 7 0 2 C-5 7 -10 9 -15 8 C-13 1 -4 -2 0 -3 Z" fill={`url(#${gradId})`} />
            <circle cx="0" cy="-18" r={size * 0.012} fill={`url(#${gradId})`} />
          </motion.g>
        </g>

        {/* Bottom ribbon */}
        <g transform={`translate(${cx}, ${cy + outerR - size * 0.04}) scale(${size / 200 * 0.85})`}>
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={isAtLeast("crown") ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.1, type: "spring", stiffness: 350, damping: 18 }}
          >
            <path d="M-22 -4 C-9 2 0 -7 0 -7 C0 -7 9 2 22 -4 C13 7 4 7 0 0 C-4 7 -13 7 -22 -4 Z" fill={`url(#${gradId})`} />
            <circle cx="0" cy="5" r={size * 0.014} fill={`url(#${gradId})`} />
          </motion.g>
        </g>

        {/* K letter */}
        <motion.text
          x={cx - size * 0.07}
          y={cy - size * 0.065}
          textAnchor="middle"
          fill={`url(#${gradId})`}
          stroke="#96753A"
          strokeWidth={size * 0.004}
          fontFamily="var(--font-cormorant), Georgia, serif"
          fontSize={size * 0.29}
          fontWeight="700"
          fontStyle="italic"
          initial={{ opacity: 0, x: cx - size * 0.3, y: cy - size * 0.3, scale: 0.3 }}
          animate={
            isAtLeast("K")
              ? { opacity: 1, x: 0, y: 0, scale: 1 }
              : { opacity: 0, x: cx - size * 0.3, y: cy - size * 0.3, scale: 0.3 }
          }
          transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 20 }}
        >
          {isKannada ? "ಕ" : "K"}
        </motion.text>

        {/* Ampersand */}
        <motion.text
          x={cx}
          y={cy + size * 0.05}
          textAnchor="middle"
          fill={`url(#${gradId})`}
          fontFamily="var(--font-cormorant), Georgia, serif"
          fontSize={size * 0.13}
          fontStyle="italic"
          opacity={0.9}
          initial={{ opacity: 0, scale: 0, rotate: -20 }}
          animate={
            isAtLeast("amp")
              ? { opacity: 0.9, scale: 1, rotate: 0 }
              : { opacity: 0, scale: 0, rotate: -20 }
          }
          transition={{ duration: 0.35, type: "spring", stiffness: 400, damping: 18 }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        >
          &amp;
        </motion.text>

        {/* S letter */}
        <motion.text
          x={cx + size * 0.07}
          y={cy + size * 0.155}
          textAnchor="middle"
          fill={`url(#${gradId})`}
          stroke="#96753A"
          strokeWidth={size * 0.004}
          fontFamily="var(--font-cormorant), Georgia, serif"
          fontSize={size * 0.29}
          fontWeight="700"
          fontStyle="italic"
          initial={{ opacity: 0, x: size * 0.3, y: size * 0.3, scale: 0.3 }}
          animate={
            isAtLeast("S")
              ? { opacity: 1, x: 0, y: 0, scale: 1 }
              : { opacity: 0, x: size * 0.3, y: size * 0.3, scale: 0.3 }
          }
          transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 20 }}
        >
          {isKannada ? "ಸ್ವ" : "S"}
        </motion.text>

        {/* Olive/Matcha leaf sprig accents around logo */}
        {isAtLeast("florals") && (
          <>
            {/* Top-left sprig */}
            <motion.g
              initial={{ opacity: 0, scale: 0, rotate: -30 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 280, damping: 16 }}
              style={{ transformOrigin: `${cx - outerR * 0.75}px ${cy - outerR * 0.75}px` }}
            >
              <path
                d={`M${cx - outerR * 0.95} ${cy - outerR * 0.6} C${cx - outerR * 0.75} ${cy - outerR * 0.95} ${cx - outerR * 0.4} ${cy - outerR * 0.9} ${cx - outerR * 0.6} ${cy - outerR * 0.6} Z`}
                fill="#556B2F" opacity="0.85"
              />
              <path
                d={`M${cx - outerR * 0.75} ${cy - outerR * 0.75} C${cx - outerR * 0.5} ${cy - outerR * 1.0} ${cx - outerR * 0.15} ${cy - outerR * 0.95} ${cx - outerR * 0.4} ${cy - outerR * 0.65} Z`}
                fill="#8A9A5B" opacity="0.85"
              />
            </motion.g>

            {/* Top-right sprig */}
            <motion.g
              initial={{ opacity: 0, scale: 0, rotate: 30 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.08, type: "spring", stiffness: 280, damping: 16 }}
              style={{ transformOrigin: `${cx + outerR * 0.75}px ${cy - outerR * 0.75}px` }}
            >
              <path
                d={`M${cx + outerR * 0.95} ${cy - outerR * 0.6} C${cx + outerR * 0.75} ${cy - outerR * 0.95} ${cx + outerR * 0.4} ${cy - outerR * 0.9} ${cx + outerR * 0.6} ${cy - outerR * 0.6} Z`}
                fill="#556B2F" opacity="0.85"
              />
              <path
                d={`M${cx + outerR * 0.75} ${cy - outerR * 0.75} C${cx + outerR * 0.5} ${cy - outerR * 1.0} ${cx + outerR * 0.15} ${cy - outerR * 0.95} ${cx + outerR * 0.4} ${cy - outerR * 0.65} Z`}
                fill="#8A9A5B" opacity="0.85"
              />
            </motion.g>

            {/* Small rose petal left */}
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.9, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.15, type: "spring", stiffness: 350 }}
              style={{ transformOrigin: `${cx - outerR * 0.9}px ${cy}px` }}
            >
              <circle cx={cx - outerR * 0.9} cy={cy} r={size * 0.038} fill="#C5495A" opacity="0.9" />
              <circle cx={cx - outerR * 0.9} cy={cy} r={size * 0.022} fill="#D9BDB0" opacity="0.85" />
              <circle cx={cx - outerR * 0.9} cy={cy} r={size * 0.01} fill="#B89555" />
            </motion.g>

            {/* Small rose petal right */}
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.9, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2, type: "spring", stiffness: 350 }}
              style={{ transformOrigin: `${cx + outerR * 0.9}px ${cy}px` }}
            >
              <circle cx={cx + outerR * 0.9} cy={cy} r={size * 0.038} fill="#8A5A96" opacity="0.9" />
              <circle cx={cx + outerR * 0.9} cy={cy} r={size * 0.022} fill="#B685C4" opacity="0.85" />
              <circle cx={cx + outerR * 0.9} cy={cy} r={size * 0.01} fill="#B89555" />
            </motion.g>
          </>
        )}

        {/* Golden sparkle burst */}
        {isAtLeast("burst") && (
          <>
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const len = size * (i % 2 === 0 ? 0.52 : 0.44);
              const x2 = cx + len * Math.cos(rad);
              const y2 = cy + len * Math.sin(rad);
              return (
                <motion.line
                  key={i}
                  x1={cx} y1={cy} x2={x2} y2={y2}
                  stroke={i % 3 === 0 ? "#D4AF37" : i % 3 === 1 ? "#B89555" : "#8A9A5B"}
                  strokeWidth={size * 0.008}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 0.9, 0] }}
                  transition={{ duration: 0.5, delay: i * 0.03, ease: "easeOut" }}
                />
              );
            })}
          </>
        )}
      </svg>
    </div>
  );
};

