"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { useLanguage } from "@/context/LanguageContext";
import { INVITATION_CONFIG } from "@/config/invitation";
import { MandapArchFrame, RoyalDivider } from "./DecorativeBorders";
import {
  CheckCircle2,
  XCircle,
  MessageCircle,
  Users,
  Send,
  Sparkles,
  Info,
} from "lucide-react";

interface RsvpFormData {
  name: string;
  attending: "yes" | "no" | "";
  guestCount: number;
  message: string;
}

export const RsvpSection: React.FC = () => {
  const { t, isKannada } = useLanguage();
  const { rsvp, contact, couple } = INVITATION_CONFIG;

  const [formData, setFormData] = useState<RsvpFormData>({
    name: "",
    attending: "yes",
    guestCount: rsvp.defaultGuests,
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validate form inputs
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = t("nameRequired");
    }

    if (!formData.attending) {
      newErrors.attendance = t("attendanceRequired");
    }

    if (formData.attending === "yes") {
      if (formData.guestCount < 1) {
        newErrors.guestCount = t("guestCountMin");
      } else if (formData.guestCount > rsvp.maxGuestsAllowed) {
        newErrors.guestCount = t("guestCountMax");
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit RSVP (Backend-ready + LocalStorage Persistence)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Save to local storage for demo persistence
    try {
      const existingRsvps = JSON.parse(localStorage.getItem("engagement_rsvps") || "[]");
      const submission = {
        ...formData,
        timestamp: new Date().toISOString(),
      };
      existingRsvps.push(submission);
      localStorage.setItem("engagement_rsvps", JSON.stringify(existingRsvps));
    } catch {
      // Ignore localStorage exceptions
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger royal golden confetti if attending
      if (formData.attending === "yes") {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#B89555", "#641F2C", "#F8F1E5", "#D4AF37"],
        });
      }
    }, 600);
  };

  // Generate WhatsApp confirmation link with prefilled details
  const getWhatsAppUrl = () => {
    const attendanceText =
      formData.attending === "yes" ? "Attending (Joyfully Accept)" : "Regretfully Declining";
    const guestText = formData.attending === "yes" ? `\nGuests: ${formData.guestCount}` : "";
    const wishesText = formData.message.trim() ? `\nWishes: "${formData.message}"` : "";

    const rawMessage = isKannada
      ? `ನಮಸ್ಕಾರ, ನಾನು ${formData.name || "ಅತಿಥಿ"}.\nಆದ್ಯ ಮತ್ತು ಅರ್ಜುನ್ ಅವರ ನಿಶ್ಚಿತಾರ್ಥಕ್ಕೆ RSVP:\nಸ್ಥಿತಿ: ${formData.attending === "yes" ? "ಸಂತೋಷದಿಂದ ಆಗಮಿಸುತ್ತೇವೆ" : "ಕ್ಷಮಿಸಿ, ಬರಲು ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲ"}${guestText}${wishesText}`
      : `Namaskara, I am ${formData.name || "Guest"}.\nRSVP for Engagement Ceremony of Aadhya & Arjun:\nStatus: ${attendanceText}${guestText}${wishesText}`;

    return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(rawMessage)}`;
  };

  return (
    <section id="rsvp" className="py-20 sm:py-28 px-4 bg-ivory-light relative overflow-hidden">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-xs sm:text-sm uppercase tracking-[0.2em] text-gold-dark font-medium mb-2 ${
              isKannada ? "font-kannadaSans tracking-normal" : ""
            }`}
          >
            {isKannada
              ? `ನವೆಂಬರ್ ೩೦, ೨೦೨೬ ರೊಳಗೆ ತಿಳಿಸಿ`
              : `Kindly RSVP by ${rsvp.deadlineDate}`}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className={`text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-burgundy ${
              isKannada ? "font-kannadaSerif" : ""
            }`}
          >
            {t("rsvpHeading")}
          </motion.h2>
          <RoyalDivider variant="lotus" />
          <p
            className={`text-xs sm:text-sm text-espresso/80 max-w-lg mx-auto ${
              isKannada ? "font-kannadaSans" : ""
            }`}
          >
            {t("rsvpSubheading")}
          </p>
        </div>

        {/* RSVP Card Frame */}
        <MandapArchFrame>
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-8 text-center max-w-md mx-auto"
              >
                <div className="w-16 h-16 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center mx-auto mb-4 text-burgundy">
                  <Sparkles className="w-8 h-8 text-gold-dark" />
                </div>
                <h3
                  className={`text-2xl sm:text-3xl font-serif font-bold text-burgundy mb-2 ${
                    isKannada ? "font-kannadaSerif" : ""
                  }`}
                >
                  {t("rsvpSuccessTitle")}
                </h3>
                <p
                  className={`text-sm sm:text-base text-espresso/90 mb-6 leading-relaxed ${
                    isKannada ? "font-kannadaSans" : ""
                  }`}
                >
                  {formData.attending === "yes"
                    ? t("rsvpSuccessDesc")
                    : t("rsvpDeclineDesc")}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald text-ivory text-xs sm:text-sm font-semibold tracking-wide shadow-md hover:bg-emerald-light transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{t("btnRsvpWhatsapp")}</span>
                  </a>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: "",
                        attending: "yes",
                        guestCount: rsvp.defaultGuests,
                        message: "",
                      });
                    }}
                    className="text-xs uppercase tracking-wider text-espresso/70 hover:text-burgundy underline underline-offset-4 py-2 cursor-pointer"
                  >
                    {isKannada ? "ಮತ್ತೊಂದು ಪ್ರತಿಕ್ರಿಯೆ ನೀಡಿ" : "Submit another response"}
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto py-2">
                {/* Guest Name */}
                <div>
                  <label
                    htmlFor="guest-name"
                    className={`block text-xs uppercase tracking-wider font-semibold text-espresso mb-2 ${
                      isKannada ? "font-kannadaSans normal-case text-sm" : ""
                    }`}
                  >
                    {t("guestNameLabel")} *
                  </label>
                  <input
                    id="guest-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t("guestNamePlaceholder")}
                    className={`w-full px-4 py-3 rounded-xl bg-ivory border ${
                      errors.name ? "border-red-500" : "border-gold/50"
                    } text-espresso placeholder:text-espresso/40 focus:outline-none focus:ring-2 focus:ring-gold/60 text-sm`}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-600 mt-1.5 font-medium">{errors.name}</p>
                  )}
                </div>

                {/* Attendance Choice Radio/Buttons */}
                <div>
                  <span
                    className={`block text-xs uppercase tracking-wider font-semibold text-espresso mb-2 ${
                      isKannada ? "font-kannadaSans normal-case text-sm" : ""
                    }`}
                  >
                    {t("guestAttendanceLabel")} *
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, attending: "yes" })}
                      className={`p-3 rounded-xl border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        formData.attending === "yes"
                          ? "bg-burgundy text-ivory border-burgundy shadow-sm font-semibold"
                          : "bg-ivory border-gold/40 text-espresso/80 hover:border-gold"
                      }`}
                    >
                      <CheckCircle2
                        className={`w-4 h-4 ${
                          formData.attending === "yes" ? "text-gold-light" : "text-emerald"
                        }`}
                      />
                      <span className="text-xs sm:text-sm">{t("attendingYes")}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, attending: "no" })}
                      className={`p-3 rounded-xl border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        formData.attending === "no"
                          ? "bg-espresso text-ivory border-espresso shadow-sm font-semibold"
                          : "bg-ivory border-gold/40 text-espresso/80 hover:border-gold"
                      }`}
                    >
                      <XCircle
                        className={`w-4 h-4 ${
                          formData.attending === "no" ? "text-dustyrose" : "text-espresso/50"
                        }`}
                      />
                      <span className="text-xs sm:text-sm">{t("attendingNo")}</span>
                    </button>
                  </div>
                </div>

                {/* Number of Guests (Only if attending) */}
                {formData.attending === "yes" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label
                      htmlFor="guest-count"
                      className={`block text-xs uppercase tracking-wider font-semibold text-espresso mb-2 ${
                        isKannada ? "font-kannadaSans normal-case text-sm" : ""
                      }`}
                    >
                      {t("guestCountLabel")}
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-gold/50 rounded-xl bg-ivory overflow-hidden p-1 shadow-xs">
                        {Array.from({ length: rsvp.maxGuestsAllowed }).map((_, idx) => {
                          const count = idx + 1;
                          return (
                            <button
                              key={count}
                              type="button"
                              onClick={() => setFormData({ ...formData, guestCount: count })}
                              className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                                formData.guestCount === count
                                  ? "bg-burgundy text-ivory shadow-xs"
                                  : "text-espresso/80 hover:bg-gold/15"
                              }`}
                            >
                              {count}
                            </button>
                          );
                        })}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-espresso/70">
                        <Users className="w-4 h-4 text-gold-dark" />
                        <span>Max {rsvp.maxGuestsAllowed}</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Optional Message / Wishes */}
                <div>
                  <label
                    htmlFor="guest-message"
                    className={`block text-xs uppercase tracking-wider font-semibold text-espresso mb-2 ${
                      isKannada ? "font-kannadaSans normal-case text-sm" : ""
                    }`}
                  >
                    {t("guestMessageLabel")}
                  </label>
                  <textarea
                    id="guest-message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t("guestMessagePlaceholder")}
                    className="w-full px-4 py-3 rounded-xl bg-ivory border border-gold/50 text-espresso placeholder:text-espresso/40 focus:outline-none focus:ring-2 focus:ring-gold/60 text-sm resize-none"
                  />
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-burgundy hover:bg-burgundy-light text-ivory text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4 text-gold-light" />
                    <span>{isSubmitting ? t("rsvpSubmitting") : t("btnSubmitRsvp")}</span>
                  </button>

                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald hover:bg-emerald-light text-ivory text-xs sm:text-sm font-semibold tracking-wide shadow-md transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{t("btnRsvpWhatsapp")}</span>
                  </a>
                </div>

                {/* Demo Architecture Notice */}
                <div className="pt-4 flex items-start gap-2 text-[11px] text-espresso/60 border-t border-gold/20">
                  <Info className="w-3.5 h-3.5 text-gold-dark shrink-0 mt-0.5" />
                  <span>{t("rsvpDemoNotice")}</span>
                </div>
              </form>
            )}
          </AnimatePresence>
        </MandapArchFrame>
      </div>
    </section>
  );
};

