"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { INVITATION_CONFIG } from "@/config/invitation";
import { MandapArchFrame, RoyalDivider, RoyalCornerFlourish } from "./DecorativeBorders";
import {
  ConnectingLoveThread,
  RealisticRose,
  RealisticOrchid,
  RealisticDaffodil,
  OliveMatchaLeafSprig,
  AnimatedLetterText,
} from "./RoyalFlorals";
import { Users, Heart, Sparkles } from "lucide-react";

export const FamilyInvitation: React.FC = () => {
  const { t, isKannada } = useLanguage();
  const { couple } = INVITATION_CONFIG;

  return (
    <section id="family" className="py-20 sm:py-28 px-4 bg-ivory-light relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <MandapArchFrame>
          <div className="text-center max-w-3xl mx-auto py-2">
            {/* Header Titles */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`text-xs sm:text-sm uppercase tracking-[0.25em] text-gold-dark font-medium mb-2 ${
                isKannada ? "font-kannadaSans tracking-normal text-sm" : ""
              }`}
            >
              {t("familySubheading")}
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className={`text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-burgundy mb-4 ${
                isKannada ? "font-kannadaSerif" : ""
              }`}
            >
              <AnimatedLetterText text={t("familyHeading")} />
            </motion.h2>

            <RoyalDivider variant="diya" />

            {/* Formal Invitation Message */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className={`text-sm sm:text-base md:text-lg text-espresso/90 leading-relaxed font-serif italic mb-6 sm:mb-8 max-w-2xl mx-auto ${
                isKannada ? "font-kannadaSerif not-italic leading-[1.9] sm:leading-[2.1] text-espresso" : ""
              }`}
            >
              &ldquo;{t("familyFormalInvite")}&rdquo;
            </motion.p>

            {/* Sacred Connecting Love Thread with Heart Medallion joining Bride & Groom Cards */}
            <ConnectingLoveThread isKannada={isKannada} />

            {/* Family & Couple Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 my-4 sm:my-6 text-center">
              {/* Bride & Family Card */}
              <motion.div
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative flex flex-col items-center p-6 sm:p-8 rounded-3xl bg-ivory/85 border-2 border-olive/40 shadow-royal hover:border-olive hover:shadow-[0_8px_32px_rgba(85,107,47,0.22)] transition-all duration-300 group"
              >
                {/* Botanical Accent: Orchid & Olive Leaf */}
                <div className="absolute top-2 left-2 pointer-events-none z-10 flex items-center">
                  <RealisticOrchid size={30} className="-rotate-12" />
                  <OliveMatchaLeafSprig orientation="left" size={28} className="-ml-2.5 opacity-85" />
                </div>

                {/* Animated Royal Heart-Shaped Tag appearing after scroll */}
                <motion.div
                  initial={{ opacity: 0, scale: 0, y: -12 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.4 }}
                  className="absolute -top-3.5 sm:-top-4 right-4 sm:right-6 z-20 flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-burgundy via-burgundy-light to-burgundy border-2 border-gold text-ivory shadow-lg"
                >
                  <motion.div
                    animate={{ scale: [1, 1.25, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Heart className="w-3.5 h-3.5 text-gold-light fill-gold" />
                  </motion.div>
                  <span className={`text-[11px] sm:text-xs font-serif font-bold tracking-wider text-gold-light ${isKannada ? "font-kannadaDisplay normal-case tracking-normal" : ""}`}>
                    {t("brideHeartTag")}
                  </span>
                </motion.div>

                <RoyalCornerFlourish position="top-left" className="top-1 left-1 opacity-70" />
                <RoyalCornerFlourish position="bottom-right" className="bottom-1 right-1 opacity-70" />

                {/* Avatar with Heart Medallion */}
                <div className="relative mb-4">
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-gold shadow-md bg-ivory">
                    <Image
                      src={couple.bride.image}
                      alt={couple.bride.fullName}
                      fill
                      sizes="160px"
                      className="object-cover object-center transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  {/* Heart-Shaped Royal Medallion */}
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 350, damping: 18, delay: 0.6 }}
                    className="absolute -bottom-1 -right-1 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-gold-dark via-gold-light to-gold p-0.5 shadow-md flex items-center justify-center z-10"
                  >
                    <div className="w-full h-full rounded-full bg-burgundy flex items-center justify-center">
                      <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gold-light fill-gold animate-pulse" />
                    </div>
                  </motion.div>
                </div>

                <span className="text-xs uppercase tracking-widest text-gold-dark font-semibold mb-1">
                  {isKannada ? "ವಧು" : "The Bride"}
                </span>

                <h3
                  className={`text-2xl sm:text-3xl font-serif font-bold text-burgundy mb-2 ${
                    isKannada ? "font-kannadaSerif" : ""
                  }`}
                >
                  {isKannada ? couple.bride.fullNameKn : couple.bride.fullName}
                </h3>

                {/* Parents Details */}
                <div className="mt-3 w-full py-3 px-4 rounded-xl bg-ivory-light/90 border border-gold/30 flex flex-col gap-1 text-center">
                  <p className="text-xs uppercase tracking-wider text-gold-dark font-medium">
                    {isKannada ? "ಪೋಷಕರು" : "Parents"}
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-espresso">
                    {isKannada ? couple.bride.motherKn : couple.bride.mother}
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-espresso">
                    {isKannada ? couple.bride.fatherKn : couple.bride.father}
                  </p>
                </div>

                {/* Bride Family Tag with Olive & Matcha Luxury Styling */}
                <div className="mt-2.5 w-full py-2 px-4 rounded-xl bg-matcha/20 border border-matcha/50 flex items-center justify-center gap-1.5 text-center">
                  <Sparkles className="w-3.5 h-3.5 text-olive-dark" />
                  <span className="text-xs text-olive-dark font-bold">
                    {isKannada ? couple.bride.familyTitleKn : couple.bride.familyTitle}
                  </span>
                </div>
              </motion.div>

              {/* Groom & Family Card */}
              <motion.div
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="relative flex flex-col items-center p-6 sm:p-8 rounded-3xl bg-ivory/85 border-2 border-olive/40 shadow-royal hover:border-olive hover:shadow-[0_8px_32px_rgba(85,107,47,0.22)] transition-all duration-300 group"
              >
                {/* Botanical Accent: Rose & Matcha Leaf */}
                <div className="absolute top-2 left-2 pointer-events-none z-10 flex items-center">
                  <RealisticRose color="ruby" size={26} className="rotate-12" />
                  <OliveMatchaLeafSprig orientation="right" size={26} className="-ml-2 opacity-85" />
                </div>

                {/* Animated Royal Heart-Shaped Tag appearing after scroll */}
                <motion.div
                  initial={{ opacity: 0, scale: 0, y: -12 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.5 }}
                  className="absolute -top-3.5 sm:-top-4 right-4 sm:right-6 z-20 flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-burgundy via-burgundy-light to-burgundy border-2 border-gold text-ivory shadow-lg"
                >
                  <motion.div
                    animate={{ scale: [1, 1.25, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                  >
                    <Heart className="w-3.5 h-3.5 text-gold-light fill-gold" />
                  </motion.div>
                  <span className={`text-[11px] sm:text-xs font-serif font-bold tracking-wider text-gold-light ${isKannada ? "font-kannadaDisplay normal-case tracking-normal" : ""}`}>
                    {t("groomHeartTag")}
                  </span>
                </motion.div>

                <RoyalCornerFlourish position="top-right" className="top-1 right-1 opacity-70" />
                <RoyalCornerFlourish position="bottom-left" className="bottom-1 left-1 opacity-70" />

                {/* Avatar with Heart Medallion */}
                <div className="relative mb-4">
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-gold shadow-md bg-ivory">
                    <Image
                      src={couple.groom.image}
                      alt={couple.groom.fullName}
                      fill
                      sizes="160px"
                      className="object-cover object-center transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  {/* Heart-Shaped Royal Medallion */}
                  <motion.div
                    initial={{ scale: 0, rotate: 20 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 350, damping: 18, delay: 0.7 }}
                    className="absolute -bottom-1 -right-1 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-gold-dark via-gold-light to-gold p-0.5 shadow-md flex items-center justify-center z-10"
                  >
                    <div className="w-full h-full rounded-full bg-burgundy flex items-center justify-center">
                      <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gold-light fill-gold animate-pulse" />
                    </div>
                  </motion.div>
                </div>

                <span className="text-xs uppercase tracking-widest text-gold-dark font-semibold mb-1">
                  {isKannada ? "ವರ" : "The Groom"}
                </span>

                <h3
                  className={`text-2xl sm:text-3xl font-serif font-bold text-burgundy mb-2 ${
                    isKannada ? "font-kannadaSerif" : ""
                  }`}
                >
                  {isKannada ? couple.groom.fullNameKn : couple.groom.fullName}
                </h3>

                {/* Parents Details */}
                <div className="mt-3 w-full py-3 px-4 rounded-xl bg-ivory-light/90 border border-gold/30 flex flex-col gap-1 text-center">
                  <p className="text-xs uppercase tracking-wider text-gold-dark font-medium">
                    {isKannada ? "ಪೋಷಕರು" : "Parents"}
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-espresso">
                    {isKannada ? couple.groom.motherKn : couple.groom.mother}
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-espresso">
                    {isKannada ? couple.groom.fatherKn : couple.groom.father}
                  </p>
                </div>

                {/* Groom Family Tag with Olive & Matcha Luxury Styling */}
                <div className="mt-2.5 w-full py-2 px-4 rounded-xl bg-matcha/20 border border-matcha/50 flex items-center justify-center gap-1.5 text-center">
                  <Heart className="w-3.5 h-3.5 text-olive-dark fill-olive" />
                  <span className="text-xs text-olive-dark font-bold">
                    {isKannada ? couple.groom.familyTitleKn : couple.groom.familyTitle}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Auspicious Closing Line */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className={`text-xs sm:text-sm text-espresso/80 max-w-md mx-auto mt-6 italic ${
                isKannada ? "font-kannadaSans not-italic text-sm" : ""
              }`}
            >
              {t("familyCordiallyWelcomes")}
            </motion.p>
          </div>
        </MandapArchFrame>
      </div>
    </section>
  );
};
