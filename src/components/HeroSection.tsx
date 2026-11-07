"use client";

import React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { INVITATION_CONFIG } from "@/config/invitation";
import { RoyalDivider, RoyalCornerFlourish, FloralLeavesContinuousAnimation } from "./DecorativeBorders";
import { RoyalMonogramLogo } from "./RoyalMonogramLogo";
import {
  RealisticRose,
  RealisticOrchid,
  RealisticDaffodil,
  OliveMatchaLeafSprig,
  AnimatedLetterText,
} from "./RoyalFlorals";
import { Calendar, MapPin, ChevronDown, Sparkles, Clock, Heart } from "lucide-react";

export const HeroSection: React.FC = () => {
  const { t, isKannada } = useLanguage();
  const { couple, event } = INVITATION_CONFIG;
  const [mounted, setMounted] = React.useState(false);
  const [isMovedToNavbar, setIsMovedToNavbar] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);

    const handleInvitationOpened = () => {
      // After 3 seconds, move the big logo to the left corner in nav bar and auto scroll until
      // the shree beeralingeshwara swamy prasanna tag comes near nav bar
      const timer = setTimeout(() => {
        setIsMovedToNavbar(true);

        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("invitation-dock-logo"));
          const tag = document.getElementById("beeralingeshwara-tag");
          if (tag) {
            const targetY = tag.getBoundingClientRect().top + window.scrollY - 74;
            window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
          }
        }
      }, 3000);

      return () => clearTimeout(timer);
    };

    window.addEventListener("invitation-opened", handleInvitationOpened);
    return () => window.removeEventListener("invitation-opened", handleInvitationOpened);
  }, []);

  const { scrollY } = useScroll();

  React.useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      if (latest > 50 && !isMovedToNavbar) {
        setIsMovedToNavbar(true);
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("invitation-dock-logo"));
        }
      }
    });
    return () => unsubscribe();
  }, [scrollY, isMovedToNavbar]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-20 px-4 overflow-hidden bg-ivory select-none"
      style={{
        backgroundImage: `radial-gradient(ellipse at 50% 30%, rgba(255, 253, 248, 0.98), rgba(244, 234, 218, 0.98)), url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2396753A' fill-opacity='0.035' fill-rule='evenodd'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z'/%3E%3C/g%3E%3C/svg%3E")`,
      }}
    >
      {/* Royal Palace Mandap Arch Silhouette */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045] flex items-center justify-center"
        aria-hidden="true"
      >
        <svg viewBox="0 0 500 700" className="w-[95vw] max-w-[800px] text-espresso" fill="currentColor">
          <path d="M250 30 C110 30, 20 160, 20 350 L20 700 L480 700 L480 350 C480 160, 390 30, 250 30 Z" />
          <path d="M250 60 C130 60, 50 180, 50 350 L50 670 L450 670 L450 350 C450 180, 370 60, 250 60 Z" fill="none" stroke="currentColor" strokeWidth="3" />
        </svg>
      </div>

      {/* Floating Golden Ambient Sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/6 left-1/10 w-2 h-2 rounded-full bg-gold/40 animate-pulse" />
        <div className="absolute top-1/4 right-1/8 w-2.5 h-2.5 rounded-full bg-gold/50 animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-1/4 left-1/6 w-1.5 h-1.5 rounded-full bg-gold/60 animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Grand Royal Monogram Logo (Displayed Big upon opening, moves to left corner in nav bar after 3 seconds) */}
        <motion.div
          animate={
            isMovedToNavbar
              ? {
                  x: typeof window !== "undefined" ? -window.innerWidth / 2 + 56 : -300,
                  y: -95,
                  scale: 0.38,
                  opacity: 0,
                }
              : { x: 0, y: 0, scale: 1.35, opacity: 1 }
          }
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 flex flex-col items-center cursor-pointer origin-center"
        >
          <div className="p-3 sm:p-3.5 rounded-full bg-gradient-to-br from-ivory-light via-ivory to-ivory-dark border-2 border-gold shadow-royal-gold hover:shadow-2xl transition-all">
            <RoyalMonogramLogo size="lg" isKannada={isKannada} variant="crest" />
          </div>
        </motion.div>

        {/* Auspicious Mangala Inscription with Golden Diyas / Sparkles */}
        <motion.div
          id="beeralingeshwara-tag"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 scroll-mt-20"
        >
          <span className="inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.25em] text-gold-dark font-bold px-6 py-2.5 rounded-full border-2 border-gold/60 bg-ivory-light/95 shadow-md">
            <Sparkles className="w-4 h-4 text-gold-dark" />
            <span className={isKannada ? "font-kannadaDisplay" : ""}>
              {isKannada ? "|| ಶ್ರೀ ಬೀರಲಿಂಗೇಶ್ವರ ಸ್ವಾಮಿ ಪ್ರಸನ್ನ ||" : "|| SHREE BEERALINGESHWARA SWAMY PRASANNA ||"}
            </span>
            <Sparkles className="w-4 h-4 text-gold-dark" />
          </span>
        </motion.div>

        {/* Auspicious Announcement Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, type: "spring", stiffness: 260, damping: 22 }}
          className="flex items-center justify-center gap-3 mb-2"
        >
          <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-gold" />
          <p
            className={`text-sm sm:text-lg md:text-xl uppercase tracking-[0.2em] text-gold-dark font-bold ${
              isKannada ? "font-kannadaModern tracking-normal text-base sm:text-lg font-semibold" : ""
            }`}
          >
            {isKannada ? "ನಿಶ್ಚಿತಾರ್ಥ ಶುಭ ಮಹೋತ್ಸವ" : "ENGAGEMENT CELEBRATION"}
          </p>
          <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-gold" />
        </motion.div>

        {/* Couple Names Banner with Letter-by-Letter Pop-in Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="my-3 sm:my-5 flex flex-col md:flex-row items-center justify-center gap-2 sm:gap-4 md:gap-6"
        >
          {/* Bride Name with Animated Letters */}
          <div className="flex flex-col items-center">
            <h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-burgundy tracking-wide drop-shadow-sm ${
                isKannada ? "font-kannadaDisplay leading-normal py-1" : ""
              }`}
            >
              <AnimatedLetterText
                text={isKannada ? couple.bride.fullNameKn : couple.bride.fullName}
                delay={0.1}
              />
            </h1>
            <span className={`text-[11px] sm:text-xs uppercase tracking-widest text-gold-dark font-semibold mt-1 ${isKannada ? "font-kannadaModern normal-case text-xs" : ""}`}>
              {isKannada ? "ವಧು" : "Bride-to-be"}
            </span>
          </div>

          {/* Central Sacred Golden Ampersand */}
          <div className="flex items-center justify-center my-1 md:my-0">
            <span className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-gold px-4 select-none drop-shadow-xs">
              &
            </span>
          </div>

          {/* Groom Name with Animated Letters */}
          <div className="flex flex-col items-center">
            <h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-burgundy tracking-wide drop-shadow-sm ${
                isKannada ? "font-kannadaDisplay leading-normal py-1" : ""
              }`}
            >
              <AnimatedLetterText
                text={isKannada ? couple.groom.fullNameKn : couple.groom.fullName}
                delay={0.3}
              />
            </h1>
            <span className={`text-[11px] sm:text-xs uppercase tracking-widest text-gold-dark font-semibold mt-1 ${isKannada ? "font-kannadaModern normal-case text-xs" : ""}`}>
              {isKannada ? "ವರ" : "Groom-to-be"}
            </span>
          </div>
        </motion.div>

        {/* Traditional Royal Lotus Divider */}
        <RoyalDivider variant="lotus" className="w-full max-w-sm mb-4" />

        {/* Warm Emotional Blessing Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 32, x: -18 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 0.85, delay: 0.35, type: "spring", stiffness: 200, damping: 20 }}
          className={`text-xs sm:text-sm text-espresso/80 max-w-lg mx-auto mb-3 leading-relaxed ${
            isKannada ? "font-kannadaModern not-italic text-sm leading-loose" : "font-serif italic"
          }`}
        >
          {isKannada
            ? "ಎರಡು ಕುಟುಂಬಗಳ ಸಮ್ಮತಿಯೊಂದಿಗೆ, ಹಿರಿಯರ ಆಶೀರ್ವಾದದ ಬಲದಲ್ಲಿ ಆರಂಭವಾಗುತ್ತಿರುವ ಪವಿತ್ರ ಪ್ರೇಮ ಪಯಣ."
            : "Two souls united by destiny, blessed by tradition and guided by love as they begin their sacred journey together."}
        </motion.p>

        {/* Romantic Motto Container Tag (Moved to top after blessing subtitle) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-6 inline-flex items-center gap-2 bg-gradient-to-r from-burgundy via-burgundy-light to-burgundy px-5 sm:px-6 py-2 rounded-full border-2 border-gold shadow-md text-center"
        >
          <Heart className="w-3.5 h-3.5 text-gold-light fill-gold animate-pulse" />
          <p className={`text-xs sm:text-sm font-serif italic tracking-wide text-ivory flex items-center justify-center gap-1.5 ${isKannada ? "font-kannadaDisplay not-italic normal-case" : ""}`}>
            {isKannada ? "ಸಪ್ತಪದಿಯ ಪವಿತ್ರ ಮುನ್ನುಡಿ" : "Together Towards Eternity"}
          </p>
          <Heart className="w-3.5 h-3.5 text-gold-light fill-gold animate-pulse" />
        </motion.div>

        {/* Central Couple Photograph (New Royal Scalloped Palace Jharokha Arch Frame) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45 }}
          className="relative my-4 sm:my-6 group"
        >
          {/* Continuous Floral and Leaves Royal Animation */}
          <FloralLeavesContinuousAnimation />

          {/* Ornate Realistic Floral Clusters Draped on Frame (Roses, Orchids, Daffodils, Olive/Matcha Sprigs) */}
          <div className="absolute -top-7 -left-7 sm:-top-9 sm:-left-9 z-20 pointer-events-none flex items-center">
            <RealisticRose color="ruby" size={44} className="animate-pulse-subtle" />
            <RealisticOrchid size={38} className="-ml-3 -mt-3 rotate-12" />
            <OliveMatchaLeafSprig orientation="left" size={42} className="-ml-4 -mt-4 opacity-90" />
          </div>

          <div className="absolute -top-7 -right-7 sm:-top-9 sm:-right-9 z-20 pointer-events-none flex items-center scale-x-[-1]">
            <RealisticRose color="blush" size={40} className="animate-pulse-subtle" />
            <RealisticDaffodil size={38} className="-ml-3 -mt-3 -rotate-12" />
            <OliveMatchaLeafSprig orientation="left" size={42} className="-ml-4 -mt-4 opacity-90" />
          </div>

          <div className="absolute top-1/2 -left-6 sm:-left-8 -translate-y-1/2 z-20 pointer-events-none hidden sm:block">
            <RealisticOrchid size={34} className="-rotate-45 opacity-85" />
          </div>
          <div className="absolute top-1/2 -right-6 sm:-right-8 -translate-y-1/2 z-20 pointer-events-none hidden sm:block">
            <RealisticDaffodil size={34} className="rotate-45 opacity-85" />
          </div>

          {/* Premium Royal Portrait Frame — Multi-tier octagonal medallion with gold filigree & olive/matcha velvet ring */}
          <div className="relative">
            {/* SVG Filigree Corner Ornaments (absolute positioned) */}
            {[
              { top: "-14px", left: "-14px", rotate: "0deg" },
              { top: "-14px", right: "-14px", rotate: "90deg" },
              { bottom: "-14px", left: "-14px", rotate: "-90deg" },
              { bottom: "-14px", right: "-14px", rotate: "180deg" },
            ].map((pos, i) => (
              <svg
                key={i}
                width="36" height="36" viewBox="0 0 36 36" fill="none"
                className="absolute z-30 pointer-events-none"
                style={{ ...pos }}
              >
                <path d="M2 2 C2 10 10 18 18 18 C10 18 2 26 2 34" stroke="#D4AF37" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <path d="M2 2 C10 2 18 10 18 18 C18 10 26 2 34 2" stroke="#D4AF37" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <circle cx="2" cy="2" r="2.5" fill="#D4AF37" />
                <circle cx="18" cy="18" r="1.5" fill="#8A9A5B" />
              </svg>
            ))}

            {/* Outermost olive/matcha velvet ring */}
            <div
              className="relative p-[14px] sm:p-[16px] bg-gradient-to-br from-olive-dark via-matcha to-olive border-[3px] border-gold/80 shadow-[0_32px_80px_rgba(40,10,15,0.42),inset_0_0_20px_rgba(212,175,55,0.15)]"
              style={{ borderRadius: "38% 38% 42% 42% / 40% 40% 44% 44%" }}
            >
              {/* Gold filigree middle ring */}
              <div
                className="relative p-[10px] sm:p-[12px] bg-gradient-to-b from-[#E8D89A] via-[#CFBA80] to-[#E5D4A0] border-2 border-gold"
                style={{ borderRadius: "35% 35% 40% 40% / 38% 38% 42% 42%" }}
              >
                {/* Inner ivory silk ring */}
                <div
                  className="relative p-[6px] bg-gradient-to-b from-[#FBF6EE] via-[#F5EDD8] to-[#EEE2C8] border border-gold/60"
                  style={{ borderRadius: "32% 32% 38% 38% / 35% 35% 40% 40%" }}
                >
                  {/* Photo container */}
                  <div
                    className="relative overflow-hidden w-[260px] sm:w-[330px] md:w-[390px] aspect-[4/5] bg-ivory-dark shadow-inner"
                    style={{ borderRadius: "29% 29% 36% 36% / 32% 32% 38% 38%" }}
                  >
                    <Image
                      src={couple.heroImage}
                      alt={`${couple.bride.fullName} and ${couple.groom.fullName}`}
                      fill
                      priority
                      sizes="(max-width: 640px) 260px, (max-width: 768px) 330px, 390px"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                    {/* Warm vignette overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso/35 via-transparent to-transparent pointer-events-none" />
                    {/* Subtle gold shimmer on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/0 via-gold/0 to-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Aesthetic Royal Monogram Logo Badge at Bottom Center */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 p-1.5 rounded-full bg-gradient-to-br from-ivory-light via-ivory to-ivory-dark border-2 border-gold shadow-xl flex items-center justify-center z-20">
            <RoyalMonogramLogo size="lg" isKannada={isKannada} variant="crest" />
          </div>
        </motion.div>

        {/* Ceremony Key Details Cards (Date, Muhurtham, Venue) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full max-w-2xl text-center text-xs sm:text-sm text-espresso font-semibold"
        >
          {/* Date Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 240, damping: 22 }}
            className="flex flex-col items-center bg-ivory-light/95 p-3.5 rounded-2xl border border-gold/50 shadow-xs hover:border-olive/60 hover:shadow-[0_4px_16px_rgba(85,107,47,0.18)] transition-all"
          >
            <Calendar className="w-5 h-5 text-olive mb-1" />
            <span className="text-[10px] uppercase tracking-wider text-espresso/60 font-bold">
              {isKannada ? "ದಿನಾಂಕ" : "Date"}
            </span>
            <span className="text-xs sm:text-sm text-burgundy font-bold mt-0.5">
              {isKannada ? event.dateFormattedKn : event.dateFormatted}
            </span>
          </motion.div>

          {/* Muhurtham Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 240, damping: 22 }}
            className="flex flex-col items-center bg-matcha-soft/20 p-3.5 rounded-2xl border-2 border-matcha/50 shadow-xs hover:border-olive hover:shadow-[0_4px_16px_rgba(85,107,47,0.22)] transition-all"
          >
            <Clock className="w-5 h-5 text-olive-dark mb-1" />
            <span className="text-[10px] uppercase tracking-wider text-olive-dark font-bold">
              {isKannada ? "ಶುಭ ಮುಹೂರ್ತ" : "Shubha Muhurtham"}
            </span>
            <span className="text-xs sm:text-sm text-burgundy font-bold mt-0.5">
              10:45 AM - 11:45 AM
            </span>
          </motion.div>

          {/* Venue Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 240, damping: 22 }}
            onClick={() => scrollToSection("ceremony")}
            role="button"
            tabIndex={0}
            className="flex flex-col items-center bg-ivory-light/95 p-3.5 rounded-2xl border border-gold/50 shadow-xs hover:border-olive/60 hover:shadow-[0_4px_16px_rgba(85,107,47,0.18)] transition-all cursor-pointer"
          >
            <MapPin className="w-5 h-5 text-olive mb-1" />
            <span className="text-[10px] uppercase tracking-wider text-espresso/60 font-bold">
              {isKannada ? "ಸ್ಥಳ" : "Venue"}
            </span>
            <span className="text-xs sm:text-sm text-burgundy font-bold mt-0.5 truncate max-w-[180px]">
              {isKannada ? event.venueNameKn : event.venueName}
            </span>
          </motion.div>
        </motion.div>

        {/* Scroll cue button */}
        <button
          onClick={() => scrollToSection("family")}
          className="mt-12 sm:mt-14 flex flex-col items-center gap-1.5 text-xs uppercase tracking-widest text-espresso/70 hover:text-burgundy transition-colors cursor-pointer group"
          aria-label={t("heroScrollDown")}
        >
          <span className={isKannada ? "font-kannadaSans" : ""}>{t("heroScrollDown")}</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-gold-dark group-hover:text-burgundy" />
        </button>
      </div>
    </section>
  );
};
