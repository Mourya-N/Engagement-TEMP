"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { INVITATION_CONFIG } from "@/config/invitation";
import { RoyalDivider, RoyalCornerFlourish } from "./DecorativeBorders";
import { Heart, Sparkles, Coffee } from "lucide-react";

export const OurStory: React.FC = () => {
  const { t, isKannada } = useLanguage();
  const { couple } = INVITATION_CONFIG;

  const milestones = [
    {
      title: t("storyMilestone1Title"),
      date: t("storyMilestone1Date"),
      desc: t("storyMilestone1Desc"),
      icon: Coffee,
    },
    {
      title: t("storyMilestone2Title"),
      date: t("storyMilestone2Date"),
      desc: t("storyMilestone2Desc"),
      icon: Sparkles,
    },
    {
      title: t("storyMilestone3Title"),
      date: t("storyMilestone3Date"),
      desc: t("storyMilestone3Desc"),
      icon: Heart,
    },
  ];

  return (
    <section id="story" className="py-20 sm:py-28 px-4 bg-ivory relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-xs sm:text-sm uppercase tracking-[0.2em] text-gold-dark font-medium mb-2 ${
              isKannada ? "font-kannadaSans tracking-normal" : ""
            }`}
          >
            {t("storySubheading")}
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
            {t("storyHeading")}
          </motion.h2>
          <RoyalDivider variant="lotus" />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className={`text-sm sm:text-base text-espresso/80 leading-relaxed max-w-xl mx-auto ${
              isKannada ? "font-kannadaSans" : ""
            }`}
          >
            {t("storyIntro")}
          </motion.p>
        </div>

        {/* Editorial Layout: Photo & Milestones */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Story Photograph with Royal Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <div className="relative p-3 bg-ivory-light rounded-3xl border-2 border-gold/40 shadow-royal max-w-[340px] sm:max-w-[400px]">
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-ivory-dark">
                <Image
                  src={couple.storyImage}
                  alt="Couple Story Moment"
                  fill
                  sizes="(max-width: 1024px) 340px, 400px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent" />
              </div>
              <RoyalCornerFlourish position="top-left" className="top-1 left-1" />
              <RoyalCornerFlourish position="bottom-right" className="bottom-1 right-1" />

              {/* Romantic Quote Tag */}
              <div className="absolute -bottom-4 right-4 bg-burgundy text-ivory px-4 py-2 rounded-xl border border-gold/60 shadow-md">
                <p className="text-xs font-serif italic tracking-wide">
                  &ldquo;Love, Trust & Tradition&rdquo;
                </p>
              </div>
            </div>
          </motion.div>

          {/* Timeline Milestones */}
          <div className="lg:col-span-7 flex flex-col gap-8 sm:gap-10">
            {milestones.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative pl-12 sm:pl-16 group"
                >
                  {/* Vertical Timeline Guide Line */}
                  {index < milestones.length - 1 && (
                    <div className="absolute left-[19px] sm:left-[23px] top-10 bottom-[-32px] w-[2px] bg-gradient-to-b from-gold/60 via-gold/30 to-transparent" />
                  )}

                  {/* Icon Node */}
                  <div className="absolute left-0 top-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-ivory-light border-2 border-gold flex items-center justify-center text-burgundy shadow-sm group-hover:bg-burgundy group-hover:text-ivory transition-colors">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gold-dark group-hover:text-gold-light" />
                  </div>

                  {/* Content Box */}
                  <div className="bg-ivory-light/80 p-5 sm:p-6 rounded-2xl border border-gold/30 shadow-xs hover:border-gold/60 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <h3
                        className={`text-lg sm:text-xl font-serif font-bold text-burgundy ${
                          isKannada ? "font-kannadaSerif" : ""
                        }`}
                      >
                        {item.title}
                      </h3>
                      <span className="text-xs uppercase tracking-wider text-gold-dark font-semibold">
                        {item.date}
                      </span>
                    </div>
                    <p
                      className={`text-xs sm:text-sm text-espresso/80 leading-relaxed ${
                        isKannada ? "font-kannadaSans" : ""
                      }`}
                    >
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

