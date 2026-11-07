"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { EnvelopeOpening } from "@/components/EnvelopeOpening";
import { HeroSection } from "@/components/HeroSection";
import { FamilyInvitation } from "@/components/FamilyInvitation";
import { ChildhoodMemories } from "@/components/ChildhoodMemories";
import { OurStory } from "@/components/OurStory";
import { CountdownSection } from "@/components/CountdownSection";
import { CeremonyDetails } from "@/components/CeremonyDetails";
import { PhotoGallery } from "@/components/PhotoGallery";
// import { RsvpSection } from "@/components/RsvpSection"; // RSVP currently paused as requested
import { ClosingSection } from "@/components/ClosingSection";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-ivory">
      {/* SECTION 1: Cinematic Envelope Opening */}
      <EnvelopeOpening />

      {/* Global Luxury Navigation */}
      <Navbar />

      {/* SECTION 2: Hero / Couple Introduction */}
      <HeroSection />

      {/* SECTION 3: Family Invitation */}
      <FamilyInvitation />

      {/* SECTION 4: Childhood Memories - Growing Up to Forever */}
      <ChildhoodMemories />

      {/* SECTION 5: Our Story */}
      <OurStory />

      {/* SECTION 6: Live Countdown */}
      <CountdownSection />

      {/* SECTION 7: Engagement Ceremony Details */}
      <CeremonyDetails />

      {/* SECTION 8: Photo Gallery */}
      <PhotoGallery />

      {/* SECTION 9: RSVP Section - Kept in codebase, commented out per request */}
      {/* <RsvpSection /> */}

      {/* SECTION 10: Closing Section */}
      <ClosingSection />
    </main>
  );
}
