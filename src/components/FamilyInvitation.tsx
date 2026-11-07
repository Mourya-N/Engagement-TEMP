"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { INVITATION_CONFIG } from "@/config/invitation";
import { MandapArchFrame, RoyalDivider, RoyalCornerFlourish } from "./DecorativeBorders";
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
              {t("familyHeading")}
            </motion.h2>

            <RoyalDivider variant="diya" />

            {/* Formal Invitation Message */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className={`text-sm sm:text-base md:text-lg text-espresso/90 leading-relaxed font-serif italic mb-8 sm:mb-12 max-w-2xl mx-auto ${
                isKannada ? "font-kannadaSerif not-italic" : ""
              }`}
            >
              &ldquo;{t("familyFormalInvite")}&rdquo;
            </motion.p>

            {/* Family & Couple Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 my-6 sm:my-8 text-center">
              {/* Bride & Family Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="relative flex flex-col items-center p-6 sm:p-8 rounded-3xl bg-ivory/80 border-2 border-gold/40 shadow-royal hover:shadow-royal-gold transition-all duration-300"
              >
                <RoyalCornerFlourish position="top-left" className="top-1 left-1 opacity-70" />
                <RoyalCornerFlourish position="bottom-right" className="bottom-1 right-1 opacity-70" />

                <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-gold mb-4 shadow-md bg-ivory">
                  <Image
                    src={couple.bride.image}
                    alt={couple.bride.fullName}
                    fill
                    sizes="144px"
                    className="object-cover object-top"
                  />
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

                {/* Brother Detail */}
                <div className="mt-2.5 w-full py-2 px-4 rounded-xl bg-gold/10 border border-gold/25 flex items-center justify-center gap-1.5 text-center">
                  <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
                  <span className="text-xs text-espresso font-medium">
                    <strong className="text-gold-dark font-semibold">
                      {isKannada ? "ಸಹೋದರ: " : "Brother: "}
                    </strong>
                    {isKannada ? couple.bride.brotherKn : couple.bride.brother}
                  </span>
                </div>
              </motion.div>

              {/* Groom & Family Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="relative flex flex-col items-center p-6 sm:p-8 rounded-3xl bg-ivory/80 border-2 border-gold/40 shadow-royal hover:shadow-royal-gold transition-all duration-300"
              >
                <RoyalCornerFlourish position="top-right" className="top-1 right-1 opacity-70" />
                <RoyalCornerFlourish position="bottom-left" className="bottom-1 left-1 opacity-70" />

                <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-gold mb-4 shadow-md bg-ivory">
                  <Image
                    src={couple.groom.image}
                    alt={couple.groom.fullName}
                    fill
                    sizes="144px"
                    className="object-cover object-top"
                  />
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

                {/* Groom Family Tag */}
                <div className="mt-2.5 w-full py-2 px-4 rounded-xl bg-gold/10 border border-gold/25 flex items-center justify-center gap-1.5 text-center">
                  <Heart className="w-3.5 h-3.5 text-burgundy" />
                  <span className="text-xs text-espresso font-medium">
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
