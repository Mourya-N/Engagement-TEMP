"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { INVITATION_CONFIG } from "@/config/invitation";
import { RoyalDivider, RoyalCornerFlourish } from "./DecorativeBorders";
import { Calendar, MapPin, ChevronDown } from "lucide-react";

export const HeroSection: React.FC = () => {
  const { t, isKannada } = useLanguage();
  const { couple, event } = INVITATION_CONFIG;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-16 px-4 overflow-hidden bg-ivory"
      style={{
        backgroundImage: `radial-gradient(ellipse at 50% 30%, rgba(253, 251, 247, 0.95), rgba(248, 241, 229, 0.98))`,
      }}
    >
      {/* Subtle royal background watermark arch */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] flex items-center justify-center"
        aria-hidden="true"
      >
        <svg viewBox="0 0 500 700" className="w-[85vw] max-w-[650px] text-espresso" fill="currentColor">
          <path d="M250 50 C120 50, 40 180, 40 350 L40 700 L460 700 L460 350 C460 180, 380 50, 250 50 Z" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Auspicious Mangala Inscription */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-3"
        >
          <span className="inline-block text-xs sm:text-sm uppercase tracking-[0.25em] text-gold-dark font-medium px-4 py-1.5 rounded-full border border-gold/40 bg-ivory-light/80 shadow-xs">
            {isKannada ? "|| ಶ್ರೀ ಗಣೇಶಾಯ ನಮಃ ||" : "|| SHREE GANESHAYA NAMAHA ||"}
          </span>
        </motion.div>

        {/* Announcement Header */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`text-xs sm:text-sm uppercase tracking-[0.2em] text-espresso/70 mb-2 font-medium ${
            isKannada ? "font-kannadaSans tracking-normal text-sm sm:text-base" : ""
          }`}
        >
          {t("heroSubtitle")}
        </motion.p>

        {/* Couple Names Banner with Ampersand */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="my-3 sm:my-4 flex flex-col md:flex-row items-center justify-center gap-2 sm:gap-4 md:gap-6"
        >
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-burgundy tracking-wide ${
              isKannada ? "font-kannadaSerif" : ""
            }`}
          >
            {isKannada ? couple.bride.firstNameKn : couple.bride.firstName}
          </h1>

          <div className="flex items-center justify-center my-1 md:my-0">
            <span className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-gold px-2">
              &
            </span>
          </div>

          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-burgundy tracking-wide ${
              isKannada ? "font-kannadaSerif" : ""
            }`}
          >
            {isKannada ? couple.groom.firstNameKn : couple.groom.firstName}
          </h1>
        </motion.div>

        {/* Traditional Royal Lotus Divider */}
        <RoyalDivider variant="lotus" className="w-full max-w-xs" />

        {/* Central Couple Photograph (Visual Focal Point) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative my-4 sm:my-6 group"
        >
          {/* Ornamental Mandap Outer Frame */}
          <div className="relative p-2.5 sm:p-3 rounded-t-[140px] sm:rounded-t-[180px] rounded-b-3xl bg-gradient-to-b from-gold/50 via-gold/30 to-gold/60 shadow-royal">
            <div className="relative overflow-hidden rounded-t-[132px] sm:rounded-t-[172px] rounded-b-2xl w-[260px] sm:w-[320px] md:w-[380px] aspect-[4/5] bg-ivory-dark">
              <Image
                src={couple.heroImage}
                alt={`${couple.bride.fullName} and ${couple.groom.fullName}`}
                fill
                priority
                sizes="(max-width: 640px) 260px, (max-width: 768px) 320px, 380px"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Corner flourishes on photo frame */}
            <RoyalCornerFlourish position="bottom-left" className="bottom-1 left-1" />
            <RoyalCornerFlourish position="bottom-right" className="bottom-1 right-1" />
          </div>

          {/* Monogram Badge at Bottom Center */}
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-ivory-light border-2 border-gold shadow-md flex items-center justify-center text-burgundy font-serif font-bold text-base">
            {isKannada ? couple.monogramKn : couple.monogram}
          </div>
        </motion.div>

        {/* Ceremony Date & Venue Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-espresso font-medium"
        >
          <div className="flex items-center gap-2 bg-ivory-light/90 px-4 py-2 rounded-full border border-gold/40 shadow-xs">
            <Calendar className="w-4 h-4 text-gold-dark" />
            <span>{isKannada ? event.dateFormattedKn : event.dateFormatted}</span>
          </div>
          <div className="flex items-center gap-2 bg-ivory-light/90 px-4 py-2 rounded-full border border-gold/40 shadow-xs">
            <MapPin className="w-4 h-4 text-gold-dark" />
            <span>{isKannada ? event.cityKn : event.city}</span>
          </div>
        </motion.div>

        {/* Scroll cue button */}
        <button
          onClick={() => scrollToSection("family")}
          className="mt-10 sm:mt-12 flex flex-col items-center gap-1.5 text-xs uppercase tracking-widest text-espresso/60 hover:text-burgundy transition-colors cursor-pointer group"
          aria-label={t("heroScrollDown")}
        >
          <span className={isKannada ? "font-kannadaSans" : ""}>{t("heroScrollDown")}</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-gold-dark group-hover:text-burgundy" />
        </button>
      </div>
    </section>
  );
};

