"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { useLanguage } from "@/context/LanguageContext";
import { useAudio } from "@/context/AudioContext";
import { INVITATION_CONFIG } from "@/config/invitation";
import { RoyalCornerFlourish } from "./DecorativeBorders";
import { RoyalMonogramLogo } from "./RoyalMonogramLogo";
import { AnimatedLogoReveal } from "./AnimatedLogoReveal";
import { ArrowDown, Sparkles } from "lucide-react";

interface EnvelopeOpeningProps {
  onOpenComplete?: () => void;
}

export const EnvelopeOpening: React.FC<EnvelopeOpeningProps> = ({ onOpenComplete }) => {
  const { t, isKannada } = useLanguage();
  const { playAudio } = useAudio();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [showLogoAnimation, setShowLogoAnimation] = useState(false);
  const onOpenCompleteRef = useRef(onOpenComplete);

  useEffect(() => {
    onOpenCompleteRef.current = onOpenComplete;
  }, [onOpenComplete]);

  // When browser is refreshed, always reset to the Open Invitation envelope page
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      try {
        sessionStorage.removeItem("invitation_opened");
        if (window.location.hash) {
          history.replaceState(null, "", window.location.pathname);
        }
      } catch {}
    }
  }, []);

  const handleOpen = () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);

    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("invitation_opened", "true");
      } catch {}
    }

    // Show animated logo creation sequence
    setShowLogoAnimation(true);
  };

  const handleLogoComplete = () => {
    // Play background audio on user interaction
    playAudio();

    // Auspicious celebratory golden confetti burst
    try {
      confetti({
        particleCount: 85,
        spread: 110,
        origin: { y: 0.45 },
        colors: ["#D4AF37", "#96753A", "#641F2C", "#F5E4B9", "#822B3B", "#556B2F", "#8A9A5B"],
        startVelocity: 42,
        gravity: 0.9,
      });
    } catch {}

    // Open the 3D envelope flap
    setIsOpen(true);

    // Transition smoothly directly into the couple section where the big logo is connected
    setTimeout(() => {
      setShowLogoAnimation(false);
      setIsDismissed(true);

      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("invitation-opened"));
      }

      if (onOpenCompleteRef.current) {
        onOpenCompleteRef.current();
      }

      const heroEl = document.getElementById("hero");
      if (heroEl) {
        heroEl.scrollIntoView({ behavior: "smooth" });
      }
    }, 700);
  };

  const handleSkip = () => {
    setIsDismissed(true);
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("invitation_opened", "true");
        window.dispatchEvent(new CustomEvent("invitation-opened"));
      } catch {}
    }
    if (onOpenComplete) onOpenComplete();
    const heroEl = document.getElementById("hero");
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {!isDismissed && (
        <motion.div
          key="royal-envelope-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.9, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#F4EDE0] overflow-hidden px-4 select-none"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 45%, rgba(255, 252, 246, 0.98), rgba(236, 222, 198, 0.98)), url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2396753A' fill-opacity='0.08' fill-rule='evenodd'%3E%3Cpath d='M40 0L80 40L40 80L0 40Z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
          role="region"
          aria-label="Royal Invitation Envelope"
        >
          {/* Animated Royal Palace Silhouette & Lattice Watermark */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.035] flex items-center justify-center">
            <svg viewBox="0 0 600 600" className="w-[120vw] max-w-[900px] text-espresso" fill="currentColor">
              <circle cx="300" cy="300" r="280" stroke="currentColor" strokeWidth="3" fill="none" />
              <circle cx="300" cy="300" r="220" stroke="currentColor" strokeWidth="1.5" strokeDasharray="8 8" fill="none" />
              <path d="M300 40 C170 40 70 160 70 320 L70 580 L530 580 L530 320 C530 160 430 40 300 40 Z" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>

          {/* Falling Auspicious Rose & Jasmine Petals */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[
              { left: "10%", delay: "0s", dur: "7s", size: "w-4 h-4", color: "bg-red-700/60" },
              { left: "25%", delay: "2.5s", dur: "8.5s", size: "w-3 h-3", color: "bg-amber-500/70" },
              { left: "45%", delay: "1.2s", dur: "6.8s", size: "w-3.5 h-3.5", color: "bg-red-800/65" },
              { left: "68%", delay: "3.2s", dur: "9s", size: "w-4 h-4", color: "bg-amber-400/75" },
              { left: "85%", delay: "0.8s", dur: "7.5s", size: "w-3 h-3", color: "bg-rose-700/60" },
            ].map((petal, i) => (
              <div
                key={i}
                className={`absolute -top-6 ${petal.size} ${petal.color} rounded-tl-3xl rounded-br-3xl shadow-xs`}
                style={{
                  left: petal.left,
                  animation: `floatPetal ${petal.dur} infinite linear`,
                  animationDelay: petal.delay,
                }}
              />
            ))}
          </div>

          {/* Floating Golden Light Dust Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/5 w-2 h-2 rounded-full bg-gold/50 animate-ping" style={{ animationDuration: "3.8s" }} />
            <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-gold/60 animate-ping" style={{ animationDuration: "4.2s", animationDelay: "1.2s" }} />
            <div className="absolute bottom-1/3 left-1/3 w-2.5 h-2.5 rounded-full bg-gold/40 animate-ping" style={{ animationDuration: "5s", animationDelay: "2.1s" }} />
            <div className="absolute bottom-1/4 right-1/5 w-2 h-2 rounded-full bg-gold/50 animate-ping" style={{ animationDuration: "3.5s", animationDelay: "0.5s" }} />
          </div>

          {/* Concentric Ambient Royal Golden Radiance Rings */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-[340px] sm:w-[540px] md:w-[720px] aspect-square rounded-full border border-gold/25 animate-pulse-subtle" />
            <div className="absolute w-[260px] sm:w-[420px] md:w-[560px] aspect-square rounded-full border border-gold/15" />
            <div className="absolute w-[180px] sm:w-[300px] md:w-[400px] aspect-square rounded-full border border-gold/20" />
          </div>

          {/* Skip button for instant entry */}
          <button
            onClick={handleSkip}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-xs uppercase tracking-widest text-espresso/80 hover:text-burgundy bg-ivory-light/95 border-2 border-gold/60 hover:border-gold px-4 py-1.5 rounded-full shadow-md transition-all z-30 cursor-pointer"
          >
            {t("skipIntro")}
          </button>

          {/* Decorative corner flourishes with deep antique gold leaf tone */}
          <RoyalCornerFlourish position="top-left" className="top-4 left-4 sm:top-8 sm:left-8" />
          <RoyalCornerFlourish position="top-right" className="top-4 right-4 sm:top-8 right-8" />
          <RoyalCornerFlourish position="bottom-left" className="bottom-4 left-4 sm:bottom-8 sm:left-8" />
          <RoyalCornerFlourish position="bottom-right" className="bottom-4 right-4 sm:bottom-8 sm:right-8" />

          {/* Envelope Container with 3D Perspective */}
          <div className="relative w-full max-w-[340px] sm:max-w-[460px] md:max-w-[540px] aspect-[1.36/1] flex items-center justify-center [perspective:1400px]">
            {/* Card Inside (Elevates & slides up upon unsealing) */}
            <motion.div
              initial={{ y: 0, scale: 0.94 }}
              animate={isOpen ? { y: -125, scale: 1 } : { y: 0, scale: 0.94 }}
              transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-3 sm:inset-x-5 top-2 bottom-2 bg-gradient-to-b from-[#FFFDF8] via-[#FAF4E6] to-[#F5ECE0] border-2 border-gold/80 rounded-2xl shadow-2xl p-4 sm:p-6 flex flex-col items-center justify-center text-center z-10"
            >
              {/* Auspicious Shloka Banner */}
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-gold-dark font-bold flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-gold" />
                <span>{isKannada ? "|| ಶ್ರೀ ಬೀರಲಿಂಗೇಶ್ವರ ಸ್ವಾಮಿ ಪ್ರಸನ್ನ ||" : "|| SHREE BEERALINGESHWARA SWAMY PRASANNA ||"}</span>
                <Sparkles className="w-3 h-3 text-gold" />
              </span>

              {/* Bespoke Royal Logo inside Card (K above, S slightly down) */}
              <RoyalMonogramLogo size="md" isKannada={isKannada} variant="crest" className="my-2" />

              <p className="text-[11px] sm:text-xs uppercase tracking-widest text-espresso/70 font-semibold mb-0.5">
                {isKannada ? INVITATION_CONFIG.event.titleKn : INVITATION_CONFIG.event.title}
              </p>

              <h2
                className={`text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-burgundy tracking-wide ${
                  isKannada ? "font-kannadaSerif" : ""
                }`}
              >
                {isKannada
                  ? `${INVITATION_CONFIG.couple.bride.firstNameKn} & ${INVITATION_CONFIG.couple.groom.firstNameKn}`
                  : `${INVITATION_CONFIG.couple.bride.firstName} & ${INVITATION_CONFIG.couple.groom.firstName}`}
              </h2>

              <p className="text-xs sm:text-sm text-gold-dark font-semibold mt-1">
                {isKannada ? INVITATION_CONFIG.event.dateFormattedKn : INVITATION_CONFIG.event.dateFormatted}
              </p>

              <p className="text-[10px] sm:text-xs text-espresso/80 mt-0.5 font-medium">
                {isKannada ? INVITATION_CONFIG.event.venueNameKn : INVITATION_CONFIG.event.venueName} •{" "}
                {isKannada ? INVITATION_CONFIG.event.cityKn : INVITATION_CONFIG.event.city}
              </p>
            </motion.div>

            {/* Envelope Body (Back, Left/Right Flaps, and Bottom Pocket) */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#DECFA8] via-[#CFBD92] to-[#E3D6B5] rounded-2xl border-2 border-gold shadow-[0_25px_60px_rgba(40,10,15,0.35)] overflow-hidden z-20">
              {/* Silk Texture Glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-gold/20 via-transparent to-transparent" />

              {/* Bottom Flap Triangle */}
              <div
                className="absolute inset-x-0 bottom-0 h-[56%] bg-gradient-to-t from-[#C7B283] via-[#D5C298] to-[#DFCEAA] border-t-2 border-gold/50"
                style={{
                  clipPath: "polygon(0 100%, 50% 12%, 100% 100%)",
                }}
              />

              {/* Left and Right Triangular Flaps */}
              <div
                className="absolute inset-y-0 left-0 w-1/2 bg-[#C2AC7C] opacity-80"
                style={{
                  clipPath: "polygon(0 0, 100% 50%, 0 100%)",
                }}
              />
              <div
                className="absolute inset-y-0 right-0 w-1/2 bg-[#C2AC7C] opacity-80"
                style={{
                  clipPath: "polygon(100% 0, 0 50%, 100% 100%)",
                }}
              />

              {/* Royal Gold Filigree Trim Border */}
              <div className="absolute inset-2 sm:inset-3 border-2 border-gold/50 rounded-xl pointer-events-none" />

              {/* Red & Gold Silk Ribbon Band running horizontally */}
              <div className="absolute top-[49%] -translate-y-1/2 inset-x-0 h-10 bg-gradient-to-r from-[#4E0F1B] via-[#641F2C] to-[#4E0F1B] border-y-2 border-gold/80 shadow-md flex items-center justify-between px-4 pointer-events-none">
                <div className="h-[1px] w-full bg-gold/50" />
              </div>
            </div>

            {/* Top Flap (Opens in 3D upwards) */}
            <motion.div
              initial={{ rotateX: 0 }}
              animate={isOpening ? { rotateX: -180 } : { rotateX: 0 }}
              transition={{ duration: 0.85, ease: "easeInOut" }}
              style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
              className="absolute top-0 inset-x-0 h-[55%] z-30"
            >
              <div
                className="w-full h-full rounded-t-2xl border-b-2 border-gold/80 shadow-lg"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  background: "linear-gradient(180deg, #CEBB90 0%, #D8C7A0 60%, #BFAC7F 100%)",
                }}
              />
            </motion.div>

            {/* Interactive Royal Dark Gold Wax Seal with K above & S down */}
            <div className="absolute top-[49%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex items-center justify-center">
              {/* Pulsing Concentric Golden Aura Ring */}
              <div className="absolute -inset-3 rounded-full border-2 border-gold/50 animate-ping opacity-60 pointer-events-none" style={{ animationDuration: "2.8s" }} />
              <div className="absolute -inset-1.5 rounded-full border border-gold/40 animate-pulse pointer-events-none" />

              <motion.button
                onClick={handleOpen}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.93 }}
                animate={
                  isOpening
                    ? { scale: 1.5, opacity: 0, rotate: 25 }
                    : { scale: [1, 1.05, 1], rotate: [0, -1, 1, 0] }
                }
                transition={
                  isOpening
                    ? { duration: 0.45 }
                    : { repeat: Infinity, duration: 3.2, ease: "easeInOut" }
                }
                className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center cursor-pointer group focus:outline-none focus:ring-4 focus:ring-gold/70"
                aria-label={t("openInvitation")}
              >
                <RoyalMonogramLogo size="lg" isKannada={isKannada} variant="seal" />
              </motion.button>
            </div>
          </div>

          {/* Instructions & Interactive Tap to Open Button */}
          <div className="absolute bottom-6 sm:bottom-10 inset-x-4 max-w-lg mx-auto text-center z-30">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-ivory-light/95 border-2 border-gold/60 rounded-2xl p-4 sm:p-5 shadow-royal backdrop-blur-md"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-gold-dark font-bold mb-1 flex items-center justify-center gap-2">
                <span>✦</span>
                <span>{t("envelopeGreeting")}</span>
                <span>✦</span>
              </p>
              <p
                className={`text-xs sm:text-sm text-espresso/90 mb-3 font-semibold ${
                  isKannada ? "font-kannadaSans" : ""
                }`}
              >
                {t("envelopeInstruction")}
              </p>

              <button
                onClick={handleOpen}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-burgundy-dark via-burgundy to-burgundy-dark hover:from-burgundy hover:to-burgundy-light text-ivory text-xs sm:text-sm uppercase tracking-wider font-bold transition-all shadow-md hover:shadow-royal-gold cursor-pointer border border-gold/50"
              >
                <Sparkles className="w-4 h-4 text-gold-light" />
                <span>{t("envelopeTapToOpen")}</span>
                <ArrowDown className="w-4 h-4 animate-bounce text-gold-light" />
              </button>
            </motion.div>
          </div>

          {/* ===== ANIMATED LOGO REVEAL OVERLAY ===== */}
          <AnimatePresence>
            {showLogoAnimation && (
              <motion.div
                key="logo-reveal-overlay"
                className="fixed inset-0 z-[60] flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
                style={{
                  background: "radial-gradient(ellipse at center, rgba(255,252,246,0.97) 0%, rgba(240,228,208,0.97) 100%)",
                }}
              >
                {/* Olive/matcha ambient ring behind logo */}
                <div className="absolute w-[380px] h-[380px] rounded-full border border-olive/20 animate-pulse pointer-events-none" />
                <div className="absolute w-[460px] h-[460px] rounded-full border border-matcha/10 animate-pulse pointer-events-none" style={{ animationDelay: "0.5s" }} />

                {/* Animated floral petals raining in background */}
                {[10, 25, 40, 60, 75, 88].map((left, i) => (
                  <div
                    key={i}
                    className="absolute -top-4 w-3 h-3 rounded-tl-3xl rounded-br-3xl opacity-60"
                    style={{
                      left: `${left}%`,
                      background: i % 3 === 0 ? "#D4AF37" : i % 3 === 1 ? "#556B2F" : "#C5495A",
                      animation: `floatPetal ${6 + i * 0.8}s infinite linear`,
                      animationDelay: `${i * 0.4}s`,
                    }}
                  />
                ))}

                {/* The Logo Animation — seamlessly connects to the big logo in couple section */}
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.15, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative z-10"
                >
                  <AnimatedLogoReveal
                    isKannada={isKannada}
                    size={240}
                    onComplete={handleLogoComplete}
                  />
                </motion.div>

                {/* "Opening your invitation..." subtle label below logo */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className={`absolute bottom-24 text-xs uppercase tracking-[0.3em] text-espresso/60 font-semibold ${isKannada ? "font-kannadaSans" : ""}`}
                >
                  {isKannada ? "ನಿಮ್ಮ ಆಮಂತ್ರಣವನ್ನು ತೆರೆಯಲಾಗುತ್ತಿದೆ..." : "Opening your invitation..."}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
