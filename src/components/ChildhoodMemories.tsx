"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { INVITATION_CONFIG } from "@/config/invitation";
import { RoyalDivider, RoyalCornerFlourish } from "./DecorativeBorders";
import { Sparkles, Heart } from "lucide-react";

export const ChildhoodMemories: React.FC = () => {
  const { t, isKannada } = useLanguage();
  const { couple } = INVITATION_CONFIG;

  const childhoodData = couple.childhood || {
    brideImage: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=85",
    groomImage: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=85",
    brideAgeText: "Sweet Childhood Memories",
    brideAgeTextKn: "ಮುದ್ದು ಬಾಲ್ಯದ ಸವಿನೆನಪು",
    groomAgeText: "Golden Childhood Days",
    groomAgeTextKn: "ಬಂಗಾರದ ಬಾಲ್ಯದ ದಿನಗಳು",
  };

  return (
    <section id="memories" className="py-20 sm:py-28 px-4 bg-ivory-light relative overflow-hidden select-none">
      {/* Background Decorative Traditional Motif */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex items-center justify-center">
        <svg viewBox="0 0 400 400" className="w-[80vw] max-w-[600px] text-espresso" fill="currentColor">
          <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="200" cy="200" r="140" stroke="currentColor" strokeWidth="1" strokeDasharray="6 6" fill="none" />
          <circle cx="200" cy="200" r="100" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-gold/50 bg-ivory/90 text-gold-dark text-xs uppercase tracking-[0.2em] font-semibold mb-3 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isKannada ? "ಬಾಲ್ಯದ ಸವಿನೆನಪುಗಳು" : "Cherished Nostalgia"}</span>
            <Sparkles className="w-3.5 h-3.5" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className={`text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-burgundy ${
              isKannada ? "font-kannadaSerif" : ""
            }`}
          >
            {t("memoriesHeading")}
          </motion.h2>

          <RoyalDivider variant="lotus" />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className={`text-sm sm:text-base text-espresso/80 leading-relaxed max-w-xl mx-auto ${
              isKannada ? "font-kannadaSans" : ""
            }`}
          >
            {t("memoriesIntro")}
          </motion.p>
        </div>

        {/* Childhood Portraits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-center max-w-4xl mx-auto relative">
          {/* BRIDE CHILDHOOD CARD */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center group"
          >
            {/* Vintage Ornate Royal Photo Frame */}
            <div className="relative p-3.5 sm:p-4 rounded-3xl bg-gradient-to-br from-[#F5EBD7] via-[#EDE0C4] to-[#DFCEAA] border-2 border-gold/70 shadow-royal hover:shadow-royal-gold transition-all duration-500 max-w-[320px] w-full">
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-ivory-dark border border-gold/40 shadow-inner">
                <Image
                  src={childhoodData.brideImage}
                  alt="Little Kavana Childhood Portrait"
                  fill
                  sizes="(max-width: 640px) 280px, 320px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 filter sepia-[0.15] contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent pointer-events-none" />
                
                {/* Vintage Photo Ribbon Label */}
                <div className="absolute top-3 left-3 bg-burgundy/90 backdrop-blur-sm text-ivory text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full border border-gold/50 shadow-xs">
                  {isKannada ? childhoodData.brideAgeTextKn : childhoodData.brideAgeText}
                </div>
              </div>

              {/* Corner flourishes */}
              <RoyalCornerFlourish position="top-left" className="top-1 left-1" />
              <RoyalCornerFlourish position="top-right" className="top-1 right-1" />
              <RoyalCornerFlourish position="bottom-left" className="bottom-1 left-1" />
              <RoyalCornerFlourish position="bottom-right" className="bottom-1 right-1" />
            </div>

            {/* Bride Childhood Details */}
            <div className="mt-5 max-w-xs">
              <span className="text-xs uppercase tracking-widest text-gold-dark font-bold">
                {t("brideChildhoodBadge")}
              </span>
              <h3
                className={`text-xl sm:text-2xl font-serif font-bold text-burgundy mt-1 ${
                  isKannada ? "font-kannadaSerif" : ""
                }`}
              >
                {t("brideChildhoodTitle")}
              </h3>
              <p className="text-xs text-espresso/70 mt-1 font-medium">
                {isKannada ? couple.bride.parentsKn : couple.bride.parents}
              </p>
              <p
                className={`text-xs sm:text-sm text-espresso/80 italic mt-2.5 leading-relaxed bg-ivory/80 p-3 rounded-xl border border-gold/30 ${
                  isKannada ? "font-kannadaSans not-italic text-xs leading-relaxed" : ""
                }`}
              >
                &ldquo;{t("brideChildhoodDesc")}&rdquo;
              </p>
            </div>
          </motion.div>

          {/* GROOM CHILDHOOD CARD */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center group"
          >
            {/* Vintage Ornate Royal Photo Frame */}
            <div className="relative p-3.5 sm:p-4 rounded-3xl bg-gradient-to-br from-[#F5EBD7] via-[#EDE0C4] to-[#DFCEAA] border-2 border-gold/70 shadow-royal hover:shadow-royal-gold transition-all duration-500 max-w-[320px] w-full">
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-ivory-dark border border-gold/40 shadow-inner">
                <Image
                  src={childhoodData.groomImage}
                  alt="Little Sweekar Childhood Portrait"
                  fill
                  sizes="(max-width: 640px) 280px, 320px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 filter sepia-[0.15] contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent pointer-events-none" />

                {/* Vintage Photo Ribbon Label */}
                <div className="absolute top-3 left-3 bg-burgundy/90 backdrop-blur-sm text-ivory text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full border border-gold/50 shadow-xs">
                  {isKannada ? childhoodData.groomAgeTextKn : childhoodData.groomAgeText}
                </div>
              </div>

              {/* Corner flourishes */}
              <RoyalCornerFlourish position="top-left" className="top-1 left-1" />
              <RoyalCornerFlourish position="top-right" className="top-1 right-1" />
              <RoyalCornerFlourish position="bottom-left" className="bottom-1 left-1" />
              <RoyalCornerFlourish position="bottom-right" className="bottom-1 right-1" />
            </div>

            {/* Groom Childhood Details */}
            <div className="mt-5 max-w-xs">
              <span className="text-xs uppercase tracking-widest text-gold-dark font-bold">
                {t("groomChildhoodBadge")}
              </span>
              <h3
                className={`text-xl sm:text-2xl font-serif font-bold text-burgundy mt-1 ${
                  isKannada ? "font-kannadaSerif" : ""
                }`}
              >
                {t("groomChildhoodTitle")}
              </h3>
              <p className="text-xs text-espresso/70 mt-1 font-medium">
                {isKannada ? couple.groom.parentsKn : couple.groom.parents}
              </p>
              <p
                className={`text-xs sm:text-sm text-espresso/80 italic mt-2.5 leading-relaxed bg-ivory/80 p-3 rounded-xl border border-gold/30 ${
                  isKannada ? "font-kannadaSans not-italic text-xs leading-relaxed" : ""
                }`}
              >
                &ldquo;{t("groomChildhoodDesc")}&rdquo;
              </p>
            </div>
          </motion.div>
        </div>

        {/* Nostalgic Union Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 sm:mt-16 text-center max-w-lg mx-auto"
        >
          <div className="p-4 rounded-2xl bg-gradient-to-r from-ivory via-ivory-light to-ivory border-2 border-gold/50 shadow-xs flex items-center justify-center gap-3">
            <Heart className="w-4 h-4 text-burgundy fill-burgundy" />
            <span
              className={`text-xs sm:text-sm font-serif font-bold text-espresso tracking-wide ${
                isKannada ? "font-kannadaSerif" : ""
              }`}
            >
              {t("memoriesCenterBadge")}
            </span>
            <Heart className="w-4 h-4 text-burgundy fill-burgundy" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

