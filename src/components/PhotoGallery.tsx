"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { GALLERY_CONFIG, GalleryPhoto } from "@/config/gallery";
import { RoyalDivider, RoyalCornerFlourish } from "./DecorativeBorders";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

export const PhotoGallery: React.FC = () => {
  const { t, isKannada } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const filteredPhotos =
    selectedCategory === "all"
      ? GALLERY_CONFIG.photos
      : GALLERY_CONFIG.photos.filter((p) => p.category === selectedCategory);

  const openLightbox = (photoId: string) => {
    const index = filteredPhotos.findIndex((p) => p.id === photoId);
    if (index !== -1) {
      setActivePhotoIndex(index);
    }
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
  };

  const nextPhoto = useCallback(() => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((prev) => (prev! + 1) % filteredPhotos.length);
    }
  }, [activePhotoIndex, filteredPhotos.length]);

  const prevPhoto = useCallback(() => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((prev) =>
        prev! === 0 ? filteredPhotos.length - 1 : prev! - 1
      );
    }
  }, [activePhotoIndex, filteredPhotos.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhotoIndex, nextPhoto, prevPhoto]);

  // Mobile Touch Swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextPhoto();
      } else {
        prevPhoto();
      }
    }
    setTouchStartX(null);
  };

  return (
    <section id="gallery" className="py-20 sm:py-28 px-4 bg-ivory relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
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
            {t("gallerySubheading")}
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
            {t("galleryHeading")}
          </motion.h2>
          <RoyalDivider variant="lotus" />

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {GALLERY_CONFIG.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-burgundy text-ivory shadow-sm"
                    : "bg-ivory-light border border-gold/40 text-espresso/80 hover:border-gold"
                } ${isKannada ? "font-kannadaSans normal-case text-sm tracking-normal" : ""}`}
              >
                {t(cat.labelKey as any)}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => openLightbox(photo.id)}
              className="relative group rounded-2xl overflow-hidden cursor-pointer bg-ivory-dark border border-gold/40 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={photo.thumbnail}
                  alt={photo.altText}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-108"
                />
                {/* Gold border shine overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-ivory">
                  <span className="text-xs font-serif italic text-gold-light">
                    {t(photo.captionKey as any)}
                  </span>
                  <div className="absolute top-3 right-3 p-1.5 rounded-full bg-ivory/20 backdrop-blur-sm text-ivory">
                    <Maximize2 className="w-4 h-4 text-gold-light" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activePhotoIndex !== null && filteredPhotos[activePhotoIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-espresso/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            role="dialog"
            aria-modal="true"
            aria-label="Image Lightbox"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-ivory/10 hover:bg-ivory/20 text-ivory border border-gold/40 transition-colors z-20 cursor-pointer"
              aria-label={t("lightboxClose")}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Nav Button */}
            <button
              onClick={prevPhoto}
              className="absolute left-2 sm:left-6 p-3 rounded-full bg-ivory/10 hover:bg-ivory/25 text-ivory border border-gold/40 transition-colors z-20 cursor-pointer"
              aria-label={t("lightboxPrev")}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Nav Button */}
            <button
              onClick={nextPhoto}
              className="absolute right-2 sm:right-6 p-3 rounded-full bg-ivory/10 hover:bg-ivory/25 text-ivory border border-gold/40 transition-colors z-20 cursor-pointer"
              aria-label={t("lightboxNext")}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Modal Image Box */}
            <div className="relative max-w-4xl max-h-[80vh] w-full h-[75vh] flex flex-col items-center justify-center">
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-gold/50 shadow-2xl">
                <Image
                  src={filteredPhotos[activePhotoIndex].url}
                  alt={filteredPhotos[activePhotoIndex].altText}
                  fill
                  priority
                  className="object-contain"
                />
              </div>

              {/* Caption and Counter */}
              <div className="mt-4 text-center max-w-xl">
                <p className="text-sm sm:text-base text-ivory font-serif italic">
                  {t(filteredPhotos[activePhotoIndex].captionKey as any)}
                </p>
                <span className="text-xs uppercase tracking-widest text-gold-light font-medium mt-1 inline-block">
                  {activePhotoIndex + 1} / {filteredPhotos.length}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

