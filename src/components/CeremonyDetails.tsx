"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { INVITATION_CONFIG } from "@/config/invitation";
import { MandapArchFrame, RoyalDivider } from "./DecorativeBorders";
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Music,
  Heart,
  Utensils,
  ExternalLink,
  Download,
  Shirt,
  Navigation,
} from "lucide-react";

export const CeremonyDetails: React.FC = () => {
  const { t, isKannada } = useLanguage();
  const { event, couple } = INVITATION_CONFIG;

  const googleMapsUrl = "https://maps.app.goo.gl/HYsMCpFWu63V42vh9?g_st=ac";
  const appleMapsUrl = "https://maps.apple.com/?q=Nandagokula+Party+Hall&ll=12.898681,76.391895";
  const mapsEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.1405734944983!2d76.39189537507507!3d12.898681087409749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba55ff76b663a8b%3A0x1b52718bfba7c3cb!2sNandagokula%20Party%20Hall!5e0!3m2!1sen!2sin!4v1794068211755!5m2!1sen!2sin";

  // Icon mapping
  const getIcon = (name: string) => {
    switch (name) {
      case "Music":
        return <Music className="w-4 h-4 text-gold-dark" />;
      case "Sparkles":
        return <Sparkles className="w-4 h-4 text-gold-dark" />;
      case "Heart":
        return <Heart className="w-4 h-4 text-gold-dark" />;
      case "Utensils":
        return <Utensils className="w-4 h-4 text-gold-dark" />;
      default:
        return <Sparkles className="w-4 h-4 text-gold-dark" />;
    }
  };

  // Google Calendar URL Generator for Jan 24, 2027
  const generateGoogleCalendarUrl = () => {
    const title = encodeURIComponent(
      `Engagement Ceremony: ${couple.bride.firstName} & ${couple.groom.firstName}`
    );
    const dates = "20270124T050000Z/20270124T090000Z";
    const details = encodeURIComponent(
      `Traditional Engagement Ceremony of ${couple.bride.fullName} and ${couple.groom.fullName}. Venue: ${event.venueName}, ${event.address}.`
    );
    const location = encodeURIComponent(`${event.venueName}, ${event.address}`);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  // Download .ics file
  const handleDownloadIcs = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Royal Engagement//Kavana and Sweekar//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      "UID:engagement-kavana-sweekar-20270124@invitation",
      "DTSTAMP:20261107T120000Z",
      "DTSTART:20270124T050000Z",
      "DTEND:20270124T090000Z",
      `SUMMARY:Engagement Ceremony: ${couple.bride.firstName} & ${couple.groom.firstName}`,
      `DESCRIPTION:Auspicious Engagement Ceremony of ${couple.bride.fullName} & ${couple.groom.fullName}. Dress code: ${event.dressCode}`,
      `LOCATION:${event.venueName}, ${event.address}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Engagement-Kavana-and-Sweekar.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  // Smart map opener: checks device or defaults to Google Maps
  const handleAddressClick = () => {
    if (typeof window !== "undefined") {
      const isApple = /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent);
      if (isApple) {
        window.open(appleMapsUrl, "_blank");
      } else {
        window.open(googleMapsUrl, "_blank");
      }
    }
  };

  return (
    <section id="ceremony" className="py-20 sm:py-28 px-4 bg-ivory-light relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-xs sm:text-sm uppercase tracking-[0.2em] text-gold-dark font-medium mb-2 ${
              isKannada ? "font-kannadaSans tracking-normal" : ""
            }`}
          >
            {t("ceremonySubheading")}
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
            {t("ceremonyHeading")}
          </motion.h2>
          <RoyalDivider variant="lotus" />
        </div>

        {/* Central Luxury Event Card */}
        <MandapArchFrame>
          <div className="flex flex-col items-center text-center">
            {/* Auspicious Muhurtham Highlight Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-burgundy text-ivory text-xs sm:text-sm font-semibold tracking-wide shadow-sm mb-6 border border-gold/40">
              <Sparkles className="w-4 h-4 text-gold-light" />
              <span>{isKannada ? event.muhurthamKn : event.muhurtham}</span>
            </div>

            {/* Event Name */}
            <h3
              className={`text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-espresso mb-4 ${
                isKannada ? "font-kannadaSerif" : ""
              }`}
            >
              {isKannada ? event.titleKn : event.title}
            </h3>

            {/* Key Information Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl my-4 text-center">
              {/* Date & Day */}
              <div className="p-4 rounded-2xl bg-ivory/90 border border-gold/40 flex flex-col items-center shadow-xs">
                <Calendar className="w-5 h-5 text-gold-dark mb-2" />
                <span className="text-xs uppercase tracking-wider text-espresso/70 font-semibold">
                  {isKannada ? event.dayKn : event.day}
                </span>
                <span className="text-sm sm:text-base font-serif font-bold text-burgundy mt-1">
                  {isKannada ? event.dateFormattedKn : event.dateFormatted}
                </span>
              </div>

              {/* Time */}
              <div className="p-4 rounded-2xl bg-ivory/90 border border-gold/40 flex flex-col items-center shadow-xs">
                <Clock className="w-5 h-5 text-gold-dark mb-2" />
                <span className="text-xs uppercase tracking-wider text-espresso/70 font-semibold">
                  {isKannada ? "ಸಮಯ" : "Time"}
                </span>
                <span className="text-sm sm:text-base font-serif font-bold text-burgundy mt-1">
                  {isKannada ? event.timeKn : event.time}
                </span>
              </div>

              {/* Dress Code */}
              <div className="p-4 rounded-2xl bg-ivory/90 border border-gold/40 flex flex-col items-center shadow-xs">
                <Shirt className="w-5 h-5 text-gold-dark mb-2" />
                <span className="text-xs uppercase tracking-wider text-espresso/70 font-semibold">
                  {t("dressCodeLabel")}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-espresso mt-1">
                  {isKannada ? event.dressCodeKn : event.dressCode}
                </span>
              </div>
            </div>

            {/* Clickable Venue & Full Address Box */}
            <div
              onClick={handleAddressClick}
              role="button"
              tabIndex={0}
              className="group my-6 p-5 sm:p-6 rounded-2xl bg-ivory border-2 border-gold/50 hover:border-gold hover:shadow-royal-gold shadow-sm max-w-xl w-full cursor-pointer transition-all duration-300"
              title={isKannada ? "ಮ್ಯಾಪ್‌ನಲ್ಲಿ ವೀಕ್ಷಿಸಲು ಕ್ಲಿಕ್ ಮಾಡಿ" : "Click to open in Google Maps / Apple Maps"}
            >
              <div className="flex items-center justify-center gap-2 mb-2 text-burgundy group-hover:text-burgundy-light transition-colors">
                <MapPin className="w-5 h-5 text-gold-dark group-hover:scale-110 transition-transform" />
                <h4
                  className={`text-lg sm:text-xl font-serif font-bold ${
                    isKannada ? "font-kannadaSerif" : ""
                  }`}
                >
                  {isKannada ? event.venueNameKn : event.venueName}
                </h4>
              </div>

              <p
                className={`text-xs sm:text-sm text-espresso/90 leading-relaxed font-medium group-hover:text-espresso transition-colors ${
                  isKannada ? "font-kannadaSans" : ""
                }`}
              >
                {isKannada ? event.addressKn : event.address}
              </p>

              <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-gold-dark font-semibold group-hover:text-burgundy transition-colors">
                <Navigation className="w-3.5 h-3.5" />
                <span>{isKannada ? "ಮ್ಯಾಪ್ಸ್‌ನಲ್ಲಿ ತೆರೆಯಿರಿ (ಗೂಗಲ್ / ಆ್ಯಪಲ್ ಮ್ಯಾಪ್ಸ್)" : "Open in Google Maps / Apple Maps"}</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </div>
            </div>

            {/* Embedded Responsive Google Map */}
            <div className="w-full max-w-2xl my-4 rounded-2xl overflow-hidden border-2 border-gold/60 shadow-royal bg-ivory">
              <div className="bg-ivory-light px-4 py-2 border-b border-gold/40 flex items-center justify-between text-xs font-semibold text-espresso">
                <div className="flex items-center gap-1.5 text-gold-dark">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{isKannada ? "ಸ್ಥಳದ ನಕ್ಷೆ" : "Interactive Location Map"}</span>
                </div>
                <span className="text-[11px] text-espresso/60 font-normal">
                  Channarayapatna, Hassan
                </span>
              </div>
              <div className="relative aspect-[16/9] w-full">
                <iframe
                  src={mapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Nandagokula Party Hall Venue Location Map"
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Action Buttons: Maps & Calendar */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 my-4">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-burgundy hover:bg-burgundy-light text-ivory text-xs sm:text-sm font-bold tracking-wide shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-gold-light" />
                <span>Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <a
                href={appleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-ivory border-2 border-gold/60 hover:border-gold text-espresso hover:text-burgundy text-xs sm:text-sm font-bold tracking-wide shadow-xs transition-all cursor-pointer"
              >
                <Navigation className="w-4 h-4 text-gold-dark" />
                <span>Apple Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <a
                href={generateGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-ivory border-2 border-gold/60 hover:border-gold text-espresso hover:text-burgundy text-xs sm:text-sm font-bold tracking-wide shadow-xs transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-gold-dark" />
                <span>{t("btnAddToCalendar")}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <button
                onClick={handleDownloadIcs}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-ivory-light border border-gold/50 hover:border-gold text-espresso/80 hover:text-burgundy text-xs sm:text-sm font-semibold tracking-wide shadow-xs transition-all cursor-pointer"
                title={t("btnDownloadIcs")}
              >
                <Download className="w-4 h-4 text-gold-dark" />
                <span>{t("btnDownloadIcs")}</span>
              </button>
            </div>

            {/* Program Schedule Itinerary */}
            <div className="w-full max-w-2xl mt-12 pt-8 border-t border-gold/30 text-left">
              <h4
                className={`text-center text-xl sm:text-2xl font-serif font-bold text-burgundy mb-6 ${
                  isKannada ? "font-kannadaSerif" : ""
                }`}
              >
                {t("scheduleTitle")}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {event.schedule.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-ivory/70 border border-gold/30 flex items-start gap-3.5"
                  >
                    <div className="p-2 rounded-lg bg-gold/15 border border-gold/30 mt-0.5">
                      {getIcon(item.iconName)}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gold-dark tracking-wider block">
                        {item.time}
                      </span>
                      <h5
                        className={`text-sm font-serif font-bold text-espresso mt-0.5 ${
                          isKannada ? "font-kannadaSerif" : ""
                        }`}
                      >
                        {t(item.titleKey as any)}
                      </h5>
                      <p
                        className={`text-xs text-espresso/75 mt-1 leading-relaxed ${
                          isKannada ? "font-kannadaSans" : ""
                        }`}
                      >
                        {t(item.descKey as any)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </MandapArchFrame>
      </div>
    </section>
  );
};
