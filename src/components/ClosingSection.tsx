"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { INVITATION_CONFIG } from "@/config/invitation";
import { RoyalDivider, RoyalCornerFlourish } from "./DecorativeBorders";
import { Heart } from "lucide-react";

export const ClosingSection: React.FC = () => {
  const { t, isKannada } = useLanguage();
  const { couple } = INVITATION_CONFIG;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="relative py-20 sm:py-28 px-4 bg-espresso text-ivory text-center overflow-hidden"
      style={{
        backgroundImage: `radial-gradient(circle at 50% 30%, rgba(78, 60, 52, 0.98), rgba(38, 28, 24, 0.99)), url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23B89555' fill-opacity='0.08' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
      }}
    >
      <RoyalCornerFlourish position="top-left" className="top-4 left-4 text-gold opacity-50" />
      <RoyalCornerFlourish position="top-right" className="top-4 right-4 text-gold opacity-50" />
      <RoyalCornerFlourish position="bottom-left" className="bottom-4 left-4 text-gold opacity-50" />
      <RoyalCornerFlourish position="bottom-right" className="bottom-4 right-4 text-gold opacity-50" />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Auspicious Sanskrit / Kannada Blessing */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.25em] text-gold font-medium mb-3"
        >
          {t("closingBlessing")}
        </motion.p>

        {/* Closing Title */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className={`text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-ivory mb-2 ${
            isKannada ? "font-kannadaSerif" : ""
          }`}
        >
          {t("closingHeading")}
        </motion.h2>

        <RoyalDivider variant="lotus" className="text-gold" />

        {/* Gratitude Paragraph */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className={`text-sm sm:text-base md:text-lg text-ivory/85 leading-relaxed font-serif italic mb-8 max-w-xl mx-auto ${
            isKannada ? "font-kannadaSerif not-italic" : ""
          }`}
        >
          &ldquo;{t("closingMessage")}&rdquo;
        </motion.p>

        {/* Couple Signature Monogram Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="my-6 inline-flex flex-col items-center"
        >
          <div className="w-16 h-16 rounded-full border-2 border-gold flex items-center justify-center bg-espresso-light mb-3 shadow-royal-gold">
            <span
              className={`text-gold font-serif font-bold text-xl tracking-widest ${
                isKannada ? "font-kannadaSerif text-lg" : ""
              }`}
            >
              {isKannada ? couple.monogramKn : couple.monogram}
            </span>
          </div>

          <h3
            className={`text-2xl sm:text-3xl font-serif font-bold text-gold-light ${
              isKannada ? "font-kannadaSerif" : ""
            }`}
          >
            {isKannada
              ? `${couple.bride.fullNameKn} & ${couple.groom.fullNameKn}`
              : `${couple.bride.fullName} & ${couple.groom.fullName}`}
          </h3>

          <p
            className={`text-xs uppercase tracking-widest text-ivory/70 mt-1 font-semibold ${
              isKannada ? "font-kannadaSans normal-case text-sm" : ""
            }`}
          >
            {t("closingFamilySign")}
          </p>
        </motion.div>

        {/* Back to top link */}
        <div className="mt-12 pt-6 border-t border-gold/20 flex flex-col items-center gap-2">
          <button
            onClick={scrollToTop}
            className="text-xs uppercase tracking-widest text-gold hover:text-gold-light transition-colors cursor-pointer py-1"
          >
            ↑ {isKannada ? "ಮೇಲಕ್ಕೆ ಹೋಗಿ" : "Back to top"}
          </button>
          <p className="text-[11px] text-ivory/50 flex items-center gap-1.5 mt-2">
            <span>Crafted with devotion & royal elegance</span>
            <Heart className="w-3 h-3 text-burgundy-light fill-burgundy" />
          </p>
        </div>
      </div>
    </footer>
  );
};
