"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useAudio } from "@/context/AudioContext";
import { INVITATION_CONFIG } from "@/config/invitation";
import { RoyalCornerFlourish } from "./DecorativeBorders";
import { RoyalMonogramLogo } from "./RoyalMonogramLogo";
import { ArrowDown } from "lucide-react";

interface EnvelopeOpeningProps {
  onOpenComplete?: () => void;
}

// Auspicious temple chime sound synthesized with Web Audio API (instant, zero network latency)
const playAuspiciousChime = () => {
  if (typeof window === "undefined") return;
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    // Notes forming an auspicious pentatonic temple chord: C5, G5, C6
    const freqs = [523.25, 783.99, 1046.5];
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12 / (idx + 1), ctx.currentTime + 0.05 + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8 + idx * 0.3);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + 2.5);
    });
  } catch {
    // Graceful fallback if Web Audio is restricted
  }
};

export const EnvelopeOpening: React.FC<EnvelopeOpeningProps> = ({ onOpenComplete }) => {
  const { t, isKannada } = useLanguage();
  const { playAudio } = useAudio();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const handleOpen = () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);

    // Play auspicious chime
    playAuspiciousChime();

    // Fade in ambient instrumental music
    playAudio();

    // Trigger 3D flap unsealing
    setTimeout(() => {
      setIsOpen(true);
    }, 450);

    // Dismiss overlay and reveal invitation
    setTimeout(() => {
      setIsDismissed(true);
      if (onOpenComplete) onOpenComplete();
    }, 1700);
  };

  const handleSkip = () => {
    setIsDismissed(true);
    if (onOpenComplete) onOpenComplete();
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.85, ease: "easeInOut" } }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#F7F2E7] overflow-hidden px-4 select-none"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(248, 241, 229, 0.98), rgba(230, 217, 196, 0.98)), url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23B89555' fill-opacity='0.06' fill-rule='evenodd'%3E%3Cpath d='M40 0L80 40L40 80L0 40Z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
        role="region"
        aria-label="Invitation Envelope"
      >
        {/* Floating golden sparkle particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/6 w-2 h-2 rounded-full bg-gold/40 animate-ping" style={{ animationDuration: '4s' }} />
          <div className="absolute top-1/3 right-1/5 w-1.5 h-1.5 rounded-full bg-gold/50 animate-ping" style={{ animationDuration: '3.5s', animationDelay: '1s' }} />
          <div className="absolute bottom-1/4 left-1/4 w-2.5 h-2.5 rounded-full bg-gold/30 animate-ping" style={{ animationDuration: '5s', animationDelay: '2s' }} />
        </div>

        {/* Ambient Golden Shimmering Rings */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[320px] sm:w-[500px] md:w-[680px] aspect-square rounded-full border border-gold/20 animate-pulse-subtle" />
          <div className="absolute w-[240px] sm:w-[380px] md:w-[520px] aspect-square rounded-full border border-gold/15" />
        </div>

        {/* Skip button for accessibility */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 text-xs uppercase tracking-widest text-espresso/70 hover:text-burgundy bg-ivory-light/95 border border-gold/50 px-4 py-1.5 rounded-full shadow-sm hover:border-gold transition-all z-30 cursor-pointer"
        >
          {t("skipIntro")}
        </button>

        {/* Decorative corner flourishes */}
        <RoyalCornerFlourish position="top-left" className="top-4 left-4 sm:top-8 sm:left-8" />
        <RoyalCornerFlourish position="top-right" className="top-4 right-4 sm:top-8 right-8" />
        <RoyalCornerFlourish position="bottom-left" className="bottom-4 left-4 sm:bottom-8 sm:left-8" />
        <RoyalCornerFlourish position="bottom-right" className="bottom-4 right-4 sm:bottom-8 sm:right-8" />

        {/* Envelope Container with 3D Perspective */}
        <div className="relative w-full max-w-[340px] sm:max-w-[460px] md:max-w-[540px] aspect-[1.36/1] flex items-center justify-center [perspective:1200px]">
          {/* Card Inside (Elevates & slides up upon unsealing) */}
          <motion.div
            initial={{ y: 0, scale: 0.94 }}
            animate={isOpen ? { y: -115, scale: 1 } : { y: 0, scale: 0.94 }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-3 sm:inset-x-5 top-2 bottom-2 bg-gradient-to-b from-[#FFFDF9] to-[#FBF6EC] border-2 border-gold/70 rounded-2xl shadow-2xl p-4 sm:p-6 flex flex-col items-center justify-center text-center z-10"
          >
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-gold-dark font-semibold">
              {isKannada ? "|| ಶ್ರೀ ಮಂಜುನಾಥ ಸ್ವಾಮಿ ಪ್ರಸನ್ನ ||" : "|| SHREE MANJUNATHA SWAMY PRASANNA ||"}
            </span>

            {/* Bespoke Royal Logo inside Card */}
            <RoyalMonogramLogo size="md" isKannada={isKannada} variant="crest" className="my-1.5" />

            <p className="text-[11px] sm:text-xs uppercase tracking-widest text-espresso/70 font-semibold mb-0.5">
              {isKannada ? INVITATION_CONFIG.event.titleKn : INVITATION_CONFIG.event.title}
            </p>

            <h2
              className={`text-xl sm:text-2xl md:text-3xl font-serif font-bold text-burgundy tracking-wide ${
                isKannada ? "font-kannadaSerif" : ""
              }`}
            >
              {isKannada
                ? `${INVITATION_CONFIG.couple.bride.firstNameKn} & ${INVITATION_CONFIG.couple.groom.firstNameKn}`
                : `${INVITATION_CONFIG.couple.bride.firstName} & ${INVITATION_CONFIG.couple.groom.firstName}`}
            </h2>

            <p className="text-xs sm:text-sm text-gold-dark font-medium mt-1">
              {isKannada ? INVITATION_CONFIG.event.dateFormattedKn : INVITATION_CONFIG.event.dateFormatted}
            </p>

            <p className="text-[10px] sm:text-xs text-espresso/80 mt-0.5 font-medium">
              {isKannada ? INVITATION_CONFIG.event.venueNameKn : INVITATION_CONFIG.event.venueName} • {isKannada ? INVITATION_CONFIG.event.cityKn : INVITATION_CONFIG.event.city}
            </p>
          </motion.div>

          {/* Envelope Body (Back, Left/Right Flaps, and Bottom Pocket) */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#E2D4B7] via-[#D8C7A5] to-[#E9DEC5] rounded-2xl border-2 border-gold shadow-2xl overflow-hidden z-20">
            {/* Satin Inner Texture */}
            <div className="absolute inset-0 bg-gradient-to-t from-gold/15 to-transparent" />

            {/* Bottom Flap Triangle */}
            <div
              className="absolute inset-x-0 bottom-0 h-[56%] bg-gradient-to-t from-[#D3BE96] via-[#DDCBA7] to-[#E8DABF] border-t border-gold/40"
              style={{
                clipPath: "polygon(0 100%, 50% 12%, 100% 100%)",
              }}
            />

            {/* Left and Right Triangular Flaps */}
            <div
              className="absolute inset-y-0 left-0 w-1/2 bg-[#CDB78C] opacity-70"
              style={{
                clipPath: "polygon(0 0, 100% 50%, 0 100%)",
              }}
            />
            <div
              className="absolute inset-y-0 right-0 w-1/2 bg-[#CDB78C] opacity-70"
              style={{
                clipPath: "polygon(100% 0, 0 50%, 100% 100%)",
              }}
            />

            {/* Royal Gold Filigree Trim Border */}
            <div className="absolute inset-2 sm:inset-3 border border-gold/40 rounded-xl pointer-events-none" />

            {/* Red & Gold Silk Ribbon Band running horizontally */}
            <div className="absolute top-[49%] -translate-y-1/2 inset-x-0 h-9 bg-gradient-to-r from-burgundy-dark via-burgundy to-burgundy-dark border-y border-gold/60 shadow-md flex items-center justify-between px-4 pointer-events-none opacity-90">
              <div className="h-[1px] w-full bg-gold/40" />
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
              className="w-full h-full rounded-t-2xl border-b-2 border-gold/70 shadow-lg"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                background: "linear-gradient(180deg, #D6C298 0%, #E3D3AF 60%, #C9B284 100%)",
              }}
            />
          </motion.div>

          {/* Interactive Royal Gold Wax Seal with Aesthetic K & S Logo */}
          <motion.button
            onClick={handleOpen}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            animate={
              isOpening
                ? { scale: 1.5, opacity: 0, rotate: 25 }
                : { scale: [1, 1.04, 1], rotate: [0, -1, 1, 0] }
            }
            transition={
              isOpening
                ? { duration: 0.45 }
                : { repeat: Infinity, duration: 3.2, ease: "easeInOut" }
            }
            className="absolute top-[49%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center cursor-pointer group focus:outline-none focus:ring-4 focus:ring-gold/60"
            aria-label={t("openInvitation")}
          >
            <RoyalMonogramLogo size="lg" isKannada={isKannada} variant="seal" />
          </motion.button>
        </div>

        {/* Instructions & Invitation text */}
        <div className="absolute bottom-6 sm:bottom-10 inset-x-4 max-w-lg mx-auto text-center z-30">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-ivory-light/95 border-2 border-gold/50 rounded-2xl p-4 sm:p-5 shadow-royal backdrop-blur-md"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-gold-dark font-semibold mb-1 flex items-center justify-center gap-2">
              <span>✦</span>
              <span>{t("envelopeGreeting")}</span>
              <span>✦</span>
            </p>
            <p
              className={`text-xs sm:text-sm text-espresso/90 mb-3 font-medium ${
                isKannada ? "font-kannadaSans" : ""
              }`}
            >
              {t("envelopeInstruction")}
            </p>

            <button
              onClick={handleOpen}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-burgundy hover:bg-burgundy-light text-ivory text-xs sm:text-sm uppercase tracking-wider font-bold transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              <span>{t("envelopeTapToOpen")}</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </button>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
