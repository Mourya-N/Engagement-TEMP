"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { EnvelopeOpening } from "@/components/EnvelopeOpening";
import { HeroSection } from "@/components/HeroSection";
import { FamilyInvitation } from "@/components/FamilyInvitation";
import { OurStory } from "@/components/OurStory";
import { CountdownSection } from "@/components/CountdownSection";
import { CeremonyDetails } from "@/components/CeremonyDetails";
import { PhotoGallery } from "@/components/PhotoGallery";
// import { RsvpSection } from "@/components/RsvpSection"; // RSVP currently paused as requested
import { ClosingSection } from "@/components/ClosingSection";

export default function Home() {
  const [, setEnvelopeOpened] = useState(false);

  return (
    <main className="relative min-h-screen bg-ivory">
      {/* SECTION 1: Cinematic Envelope Opening */}
      <EnvelopeOpening onOpenComplete={() => setEnvelopeOpened(true)} />

      {/* Global Luxury Navigation */}
      <Navbar />

      {/* SECTION 2: Hero / Couple Introduction */}
      <HeroSection />

      {/* SECTION 3: Family Invitation */}
      <FamilyInvitation />

      {/* SECTION 4: Our Story */}
      <OurStory />

      {/* SECTION 5: Live Countdown */}
      <CountdownSection />

      {/* SECTION 6: Engagement Ceremony Details */}
      <CeremonyDetails />

      {/* SECTION 7: Photo Gallery */}
      <PhotoGallery />

      {/* SECTION 8: RSVP Section - Kept in codebase, commented out per request */}
      {/* <RsvpSection /> */}

      {/* SECTION 9: Closing Section */}
      <ClosingSection />
    </main>
  );
}
