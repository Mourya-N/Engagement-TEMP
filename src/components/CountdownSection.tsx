"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { INVITATION_CONFIG } from "@/config/invitation";
import { RoyalDivider, RoyalCornerFlourish } from "./DecorativeBorders";
import { Clock, Sparkles } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export const CountdownSection: React.FC = () => {
  const { t, isKannada } = useLanguage();
  const { event } = INVITATION_CONFIG;

  const calculateTimeLeft = (): TimeLeft => {
    // Parse target date string into UTC timestamp
    const targetDate = new Date(event.dateISO).getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, isExpired: false };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: t("days"), value: timeLeft.days },
    { label: t("hours"), value: timeLeft.hours },
    { label: t("minutes"), value: timeLeft.minutes },
    { label: t("seconds"), value: timeLeft.seconds },
  ];

  return (
    <section
      id="countdown"
      className="py-16 sm:py-24 px-4 bg-burgundy text-ivory relative overflow-hidden"
      style={{
        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(100, 31, 44, 0.95), rgba(75, 22, 33, 0.98)), url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23B89555' fill-opacity='0.08' fill-rule='evenodd'%3E%3Cpath d='M20 0L40 20L20 40L0 20Z'/%3E%3C/g%3E%3C/svg%3E")`,
      }}
    >
      {/* Corner Flourishes in Gold */}
      <RoyalCornerFlourish position="top-left" className="top-4 left-4 text-gold-light opacity-60" />
      <RoyalCornerFlourish position="top-right" className="top-4 right-4 text-gold-light opacity-60" />
      <RoyalCornerFlourish position="bottom-left" className="bottom-4 left-4 text-gold-light opacity-60" />
      <RoyalCornerFlourish position="bottom-right" className="bottom-4 right-4 text-gold-light opacity-60" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 mb-2 text-gold-light"
        >
          <Clock className="w-4 h-4 animate-pulse-subtle" />
          <span
            className={`text-xs uppercase tracking-[0.25em] font-medium ${
              isKannada ? "font-kannadaSans tracking-normal" : ""
            }`}
          >
            {t("countdownSubheading")}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className={`text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-ivory mb-2 ${
            isKannada ? "font-kannadaSerif" : ""
          }`}
        >
          {t("countdownHeading")}
        </motion.h2>

        <RoyalDivider variant="simple" className="opacity-70" />

        {isClient && timeLeft.isExpired ? (
          <div className="my-8 p-6 bg-burgundy-light/60 border border-gold/40 rounded-2xl max-w-md mx-auto">
            <Sparkles className="w-8 h-8 text-gold mx-auto mb-2" />
            <h3 className="text-xl font-serif font-bold text-gold-light mb-1">
              {t("countdownExpiredTitle")}
            </h3>
            <p className="text-xs sm:text-sm text-ivory/90">{t("countdownExpiredDesc")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto my-8">
            {timeUnits.map((unit, index) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative bg-burgundy-dark/70 border border-gold/40 rounded-2xl p-4 sm:p-6 shadow-xl backdrop-blur-sm group hover:border-gold transition-all"
              >
                <div className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gold-light tracking-tight mb-1">
                  {String(unit.value).padStart(2, "0")}
                </div>
                <div
                  className={`text-xs uppercase tracking-widest text-ivory/80 font-medium ${
                    isKannada ? "font-kannadaSans normal-case text-sm tracking-normal" : ""
                  }`}
                >
                  {unit.label}
                </div>
                {/* Subtle ornamental accent dot */}
                <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-gold/50" />
              </motion.div>
            ))}
          </div>
        )}

        <p className="text-xs sm:text-sm text-ivory/70 font-serif italic mt-4">
          {isKannada ? event.muhurthamKn : event.muhurtham}
        </p>
      </div>
    </section>
  );
};

