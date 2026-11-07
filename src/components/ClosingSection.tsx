"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { INVITATION_CONFIG } from "@/config/invitation";
import { RoyalDivider, RoyalCornerFlourish } from "./DecorativeBorders";
import { Heart, Share2, Check, MessageCircle } from "lucide-react";

export const ClosingSection: React.FC = () => {
  const { t, isKannada } = useLanguage();
  const { couple, event } = INVITATION_CONFIG;
  const [copied, setCopied] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShare = async () => {
    const shareData = {
      title: `${couple.bride.firstName} & ${couple.groom.firstName} - Engagement Invitation`,
      text: isKannada
        ? `ನಮಸ್ಕಾರ! ಕವನ ಮತ್ತು ಸ್ವೀಕಾರ್ ಅವರ ಶುಭ ನಿಶ್ಚಿತಾರ್ಥ ಮಹೋತ್ಸವದ ಆಮಂತ್ರಣ ಪತ್ರಿಕೆ ಇಲ್ಲಿದೆ. ದಿನಾಂಕ: ೨೪ ಜನವರಿ ೨೦೨೭, ನಂದಗೋಕುಲ ಪಾರ್ಟಿ ಹಾಲ್, ಚನ್ನರಾಯಪಟ್ಟಣ.`
        : `Namaskara! You are cordially invited to the Engagement Ceremony of Kavana & Sweekar on Sunday, January 24, 2027 at Nandagokula Party Hall, Channarayapatna, Hassan.`,
      url: typeof window !== "undefined" ? window.location.href : "https://kavana-sweekar-engagement.in",
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // Share cancelled or failed
      }
    } else {
      // Fallback: copy link
      if (typeof window !== "undefined") {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    }
  };

  const getWhatsAppShareUrl = () => {
    const message = isKannada
      ? `ನಮಸ್ಕಾರ! ಕವನ ಮತ್ತು ಸ್ವೀಕಾರ್ ಅವರ ಶುಭ ನಿಶ್ಚಿತಾರ್ಥ ಮಹೋತ್ಸವಕ್ಕೆ ಸಕುಟುಂಬ ಸಮೇತರಾಗಿ ಆಗಮಿಸಿ ನವಜೋಡಿಯನ್ನು ಹರಸಬೇಕಾಗಿ ವಿನಂತಿ.\n\nದಿನಾಂಕ: ಭಾನುವಾರ, ೨೪ ಜನವರಿ ೨೦೨೭\nಸ್ಥಳ: ನಂದಗೋಕುಲ ಪಾರ್ಟಿ ಹಾಲ್, ಚನ್ನರಾಯಪಟ್ಟಣ, ಹಾಸನ.\nಆಮಂತ್ರಣ ಪತ್ರಿಕೆ ವೀಕ್ಷಿಸಿ: ${typeof window !== "undefined" ? window.location.href : ""}`
      : `Namaskara! Cordially inviting you and your family to the auspicious Engagement Ceremony of Kavana & Sweekar.\n\nDate: Sunday, January 24, 2027\nVenue: Nandagokula Party Hall, Channarayapatna, Hassan.\nView Invitation: ${typeof window !== "undefined" ? window.location.href : ""}`;

    return `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
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

        <RoyalDivider variant="kalash" className="text-gold" />

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
          className="my-4 inline-flex flex-col items-center"
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

        {/* Share Invitation Buttons */}
        <div className="my-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href={getWhatsAppShareUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald hover:bg-emerald-light text-ivory text-xs sm:text-sm font-semibold tracking-wide shadow-md transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{isKannada ? "ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳಿ" : "Share via WhatsApp"}</span>
          </a>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ivory/15 hover:bg-ivory/25 text-ivory border border-gold/50 text-xs sm:text-sm font-semibold tracking-wide shadow-xs transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-gold-light" />
                <span>{isKannada ? "ಲಿಂಕ್ ನಕಲಿಸಲಾಗಿದೆ!" : "Link Copied!"}</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-gold-light" />
                <span>{isKannada ? "ಆಮಂತ್ರಣ ಹಂಚಿಕೊಳ್ಳಿ" : "Share Invitation"}</span>
              </>
            )}
          </button>
        </div>

        {/* Back to top link */}
        <div className="mt-10 pt-6 border-t border-gold/20 flex flex-col items-center gap-2">
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
