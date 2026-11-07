"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAudio } from "@/context/AudioContext";
import { INVITATION_CONFIG } from "@/config/invitation";
import { RoyalMonogramLogo } from "./RoyalMonogramLogo";
import { Menu, X, Volume2, VolumeX } from "lucide-react";

export const Navbar: React.FC = () => {
  const { language, setLanguage, t, isKannada } = useLanguage();
  const { isPlaying, toggleAudio } = useAudio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLogoDocked, setIsLogoDocked] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
        setIsLogoDocked(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleDock = () => {
      setIsLogoDocked(true);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("invitation-dock-logo", handleDock);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("invitation-dock-logo", handleDock);
    };
  }, []);

  const navItems = [
    { href: "#hero", label: t("navCouple") },
    { href: "#family", label: t("navInvitation") },
    { href: "#memories", label: t("navMemories") },
    { href: "#story", label: t("navStory") },
    { href: "#countdown", label: t("navCountdown") },
    { href: "#ceremony", label: t("navDetails") },
    { href: "#gallery", label: t("navGallery") },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-ivory/95 backdrop-blur-md shadow-md border-b border-gold/30 py-2"
          : "bg-transparent py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Royal Monogram Logo (Glides into top-left corner as big logo docks) */}
        <button
          onClick={() => handleNavClick("#hero")}
          className={`flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none transition-all duration-700 ${
            isScrolled || isLogoDocked ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3 pointer-events-none"
          }`}
          aria-label="Back to top"
        >
          <RoyalMonogramLogo size="sm" isKannada={isKannada} variant="crest" className="transition-transform group-hover:scale-105" />
          <div className="hidden xs:flex flex-col">
            <span
              className={`text-[10px] uppercase tracking-[0.2em] text-gold-dark font-semibold ${
                isKannada ? "font-kannadaSans" : ""
              }`}
            >
              {isKannada ? "ನಿಶ್ಚಿತಾರ್ಥ ಮಹೋತ್ಸವ" : "Engagement Ceremony"}
            </span>
            <span
              className={`text-sm font-serif font-bold text-espresso leading-none ${
                isKannada ? "font-kannadaSerif" : ""
              }`}
            >
              {isKannada
                ? `${INVITATION_CONFIG.couple.bride.firstNameKn} & ${INVITATION_CONFIG.couple.groom.firstNameKn}`
                : `${INVITATION_CONFIG.couple.bride.firstName} & ${INVITATION_CONFIG.couple.groom.firstName}`}
            </span>
          </div>
        </button>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Main Navigation">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className={`text-xs uppercase tracking-widest font-semibold transition-colors hover:text-burgundy cursor-pointer text-espresso/80 ${
                isKannada ? "font-kannadaSans normal-case text-sm tracking-normal" : ""
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Controls: Language Toggle & Music Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio Toggle */}
          <button
            onClick={toggleAudio}
            className={`p-2 rounded-full border transition-all flex items-center justify-center cursor-pointer ${
              isPlaying
                ? "bg-gold/20 border-gold text-burgundy shadow-royal-gold animate-pulse-subtle"
                : "bg-ivory-light/80 border-gold/40 text-espresso/70 hover:border-gold"
            }`}
            title={isPlaying ? t("musicPlaying") : t("musicMuted")}
            aria-label={t("toggleMusic")}
          >
            {isPlaying ? (
              <Volume2 className="w-4 h-4 text-burgundy" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* Bilingual Switcher: EN | ಕನ್ನಡ */}
          <div className="flex items-center bg-ivory-light/90 border border-gold/40 rounded-full p-0.5 shadow-sm">
            <button
              onClick={() => setLanguage("en")}
              className={`px-2.5 py-1 text-xs rounded-full font-medium transition-all cursor-pointer ${
                language === "en"
                  ? "bg-burgundy text-ivory shadow-xs font-semibold"
                  : "text-espresso/70 hover:text-espresso"
              }`}
              aria-label="Switch to English"
            >
              EN
            </button>
            <span className="text-gold/40 text-xs select-none">|</span>
            <button
              onClick={() => setLanguage("kn")}
              className={`px-2.5 py-1 text-xs rounded-full font-kannadaSans font-medium transition-all cursor-pointer ${
                language === "kn"
                  ? "bg-burgundy text-ivory shadow-xs font-semibold"
                  : "text-espresso/70 hover:text-espresso"
              }`}
              aria-label="ಕನ್ನಡಕ್ಕೆ ಬದಲಿಸಿ"
            >
              ಕನ್ನಡ
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-espresso hover:text-burgundy hover:bg-gold/10 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bg-ivory-light/98 backdrop-blur-xl border-b border-gold/40 shadow-xl px-6 py-6 transition-all duration-300">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`py-2 text-left text-sm uppercase tracking-wider font-semibold transition-colors hover:text-burgundy flex items-center justify-between border-b border-gold/10 cursor-pointer text-espresso ${
                  isKannada ? "font-kannadaSans normal-case text-base tracking-normal" : ""
                }`}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
