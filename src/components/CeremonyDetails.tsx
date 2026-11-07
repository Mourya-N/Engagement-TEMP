"use client";

import React from "react";
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
} from "lucide-react";

export const CeremonyDetails: React.FC = () => {
  const { t, isKannada } = useLanguage();
  const { event, couple } = INVITATION_CONFIG;

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
    // Start: 2027-01-24 10:30 AM IST (05:00 UTC) -> 20270124T050000Z
    // End: 2027-01-24 02:30 PM IST (09:00 UTC) -> 20270124T090000Z
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

            {/* Venue & Full Address Box */}
            <div className="my-6 p-5 sm:p-6 rounded-2xl bg-ivory border-2 border-gold/50 shadow-sm max-w-xl w-full">
              <div className="flex items-center justify-center gap-2 mb-2 text-burgundy">
                <MapPin className="w-5 h-5 text-gold-dark" />
                <h4
                  className={`text-lg sm:text-xl font-serif font-bold ${
                    isKannada ? "font-kannadaSerif" : ""
                  }`}
                >
                  {isKannada ? event.venueNameKn : event.venueName}
                </h4>
              </div>
              <p
                className={`text-xs sm:text-sm text-espresso/90 leading-relaxed font-medium ${
                  isKannada ? "font-kannadaSans" : ""
                }`}
              >
                {isKannada ? event.addressKn : event.address}
              </p>
            </div>

            {/* Action Buttons: Maps & Calendar */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 my-2">
              <a
                href={event.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-burgundy hover:bg-burgundy-light text-ivory text-xs sm:text-sm font-bold tracking-wide shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-gold-light" />
                <span>{t("btnViewLocation")}</span>
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
