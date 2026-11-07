# Royal Indian Luxury Engagement Invitation Website

An award-winning, mobile-first, cinematic, and interactive digital engagement invitation inspired by royal Indian palaces, traditional ceremonies, and luxury wedding stationery.

Built with **Next.js 14**, **React 18**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

---

## 👑 Features & Architecture

- **Bilingual Experience**: Seamless English and authentic Kannada localization (`EN | ಕನ್ನಡ`) with persistent preference and no scroll jumping.
- **Section 1: Cinematic Envelope Opening**: 3D royal ivory envelope with animated gold wax seal, letter card reveal, and instant skip options.
- **Section 2: Hero & Couple Introduction**: Regal mandap frame highlighting demonstration couple (*Aadhya & Arjun* / *ಆದ್ಯ ಮತ್ತು ಅರ್ಜುನ್*), date, and city.
- **Section 3: Family Invitation**: Palace-inspired arch with traditional formal invitation and family greetings.
- **Section 4: Our Story**: Editorial romantic timeline detailing the couple's milestones with warm aesthetic typography.
- **Section 5: Live Countdown**: Real-time timer computed against Asia/Kolkata timezone with smooth seconds transitions and celebration messaging.
- **Section 6: Ceremony Details**: Rich venue card with schedule, direct **Google Maps** integration, **Add to Google Calendar**, and downloadable **.ICS file**.
- **Section 7: Photo Gallery & Lightbox**: Responsive grid with categories (*All, Couple, Traditional, Candid, Portraits*), full-screen lightbox, arrow/keyboard navigation, and mobile touch swipe.
- **Section 8: Interactive RSVP**: Input-validated attendance confirmation, dynamic headcount controls, golden confetti celebration, **WhatsApp pre-filled RSVP link**, and local-storage persistence ready for Supabase backend integration.
- **Section 9: Closing Section**: Auspicious blessings (*|| ಶುಭಮಸ್ತು ||*), royal monogram seal, and gratitude message.
- **Ambient Royal Music**: Auspicious sitar & flute audio player with smooth toggle and sound wave indicator.
- **Performance & Accessibility**: Zero layout shift, mobile-first responsiveness (320px to 4K displays), semantic HTML, and `prefers-reduced-motion` compliance.

---

## 🎨 Color Palette & Typography

| Color Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Royal Ivory** | `#F8F1E5` | Primary warm background |
| **Antique Gold** | `#B89555` | Ornamental arches, dividers & borders |
| **Royal Burgundy** | `#641F2C` | Headings, wax seal & primary buttons |
| **Emerald Green** | `#263D32` | Secondary accents & WhatsApp integration |
| **Dusty Rose** | `#D9BDB0` | Soft romantic floral tones |
| **Deep Espresso** | `#382A24` | High-contrast readable body text |

### Typography
- **English**: Cormorant Garamond (Headings) & Lato (Body)
- **Kannada**: Noto Serif Kannada (Headings) & Noto Sans Kannada (Body)

---

## 🛠️ How to Customize for a Real Client

All client information, photographs, dates, and copy are centralized in the `src/config/` and `src/locales/` folders. **You never need to edit React components directly.**

### 1. Changing Names & Event Details
Open `src/config/invitation.ts`:

```typescript
export const INVITATION_CONFIG = {
  couple: {
    bride: {
      firstName: "Your Bride Name",
      fullName: "Your Bride Full Name",
      firstNameKn: "ಕನ್ನಡ ಹೆಸರು",
      fullNameKn: "ಕನ್ನಡ ಪೂರ್ಣ ಹೆಸರು",
      parents: "Daughter of...",
      parentsKn: "ಶ್ರೀಮತಿ...",
      image: "/images/bride.jpg",
    },
    groom: {
      firstName: "Your Groom Name",
      fullName: "Your Groom Full Name",
      firstNameKn: "ಕನ್ನಡ ಹೆಸರು",
      fullNameKn: "ಕನ್ನಡ ಪೂರ್ಣ ಹೆಸರು",
      parents: "Son of...",
      parentsKn: "ಶ್ರೀಮತಿ...",
      image: "/images/groom.jpg",
    },
    monogram: "A & A",
    monogramKn: "ಆ & ಅ",
  },
  event: {
    title: "Engagement Ceremony",
    dateISO: "2026-12-14T10:30:00+05:30", // Update target date for countdown
    dateFormatted: "December 14, 2026",
    venueName: "Your Venue Name",
    address: "Complete Venue Address",
    googleMapsUrl: "https://maps.google.com/?q=Your+Venue",
    // ...
  }
};
```

### 2. Replacing Couple & Gallery Photographs
1. Place client photos in the `public/images/` directory.
2. Update the image paths in:
   - `src/config/invitation.ts` for `heroImage`, `storyImage`, and portraits.
   - `src/config/gallery.ts` for gallery photos and captions.

### 3. Updating English & Kannada Text
- English text: `src/locales/en.ts`
- Kannada text: `src/locales/kn.ts`

Both files follow the exact same key structure, ensuring seamless bilingual rendering.

### 4. Configuring WhatsApp & RSVP
In `src/config/invitation.ts`:
- Set `contact.whatsapp` to the family's WhatsApp phone number with international country code (e.g. `919876543210`).
- Responses in demo mode are automatically saved in browser `localStorage`.
- To connect a Supabase backend:
  1. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env.local`.
  2. Send `formData` in `src/components/RsvpSection.tsx` to your Supabase `rsvps` table.

---

## 🚀 Development & Deployment

### Prerequisites
- Node.js 18+ or 20+
- npm, yarn, or pnpm

### Quick Start
```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Open browser at
http://localhost:3000
```

### Production Build
```bash
# Build optimized static and server bundle
npm run build

# Start production server
npm run start
```

### Deploying to Vercel or Cloudflare
This is a standard Next.js application. You can deploy it to **Vercel** with one click or to any static/Node hosting platform.

---

## 📱 Mobile Responsiveness Checklist
- [x] Tested at 320px (iPhone SE / Small Androids)
- [x] Tested at 360px & 375px (Compact Viewports)
- [x] Tested at 390px & 412px & 430px (iPhone 14/15/16 Pro Max, Pixel, Galaxy)
- [x] Tested on Tablets (iPad, Galaxy Tab)
- [x] Tested on Desktops & 4K screens
- [x] Verified zero horizontal overflow (`overflow-x: hidden`)
- [x] Kannada Unicode conjuncts and vowel signs verified
- [x] Touch-friendly buttons (minimum 44x44px hit targets)

