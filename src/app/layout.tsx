import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { AudioProvider } from "@/context/AudioContext";
import { PetalsOverlay } from "@/components/PetalsOverlay";
import { INVITATION_CONFIG } from "@/config/invitation";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#F8F1E5",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://kavana-sweekar-engagement.in"),
  title: "Engagement Celebration: Kavana & Sweekar | ನಿಶ್ಚಿತಾರ್ಥ ಮಹೋತ್ಸವ",
  description:
    "Cordially inviting you to celebrate the auspicious Engagement Ceremony of Kavana G H & Sweekar L on Sunday, January 24, 2027 at Nandagokula Party Hall, Channarayapatna, Hassan.",
  keywords: [
    "Engagement Celebration",
    "Kavana and Sweekar",
    "Nischitartha Mahotsava",
    "Nandagokula Party Hall Channarayapatna",
    "Hassan Wedding",
    "Traditional Karnataka Engagement Invitation",
  ],
  authors: [{ name: "Kavana & Sweekar" }],
  openGraph: {
    title: "Engagement Celebration: Kavana & Sweekar",
    description:
      "Join us to celebrate the auspicious union of Kavana & Sweekar on January 24, 2027 at Nandagokula Party Hall, Channarayapatna, Hassan.",
    url: "https://kavana-sweekar-engagement.in",
    siteName: "Kavana & Sweekar Engagement Invitation",
    images: [
      {
        url: INVITATION_CONFIG.couple.heroImage,
        width: 1200,
        height: 630,
        alt: "Engagement Celebration of Kavana & Sweekar",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Engagement Celebration: Kavana & Sweekar",
    description: "Auspicious Traditional Engagement Ceremony of Kavana & Sweekar.",
    images: [INVITATION_CONFIG.couple.heroImage],
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='48' fill='%23641F2C' stroke='%23B89555' stroke-width='4'/><text x='50' y='60' font-size='38' font-family='serif' fill='%23F8F1E5' text-anchor='middle'>K&amp;S</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anek+Kannada:wght@400;500;600;700;800&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Lato:ital,wght@0,300;0,400;0,700;1,400&family=Noto+Sans+Kannada:wght@300;400;500;600;700&family=Noto+Serif+Kannada:wght@400;500;600;700;800&family=Tiro+Kannada:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-gold/30 selection:text-burgundy min-h-screen flex flex-col bg-ivory text-espresso">
        <LanguageProvider>
          <AudioProvider>
            <PetalsOverlay />
            {children}
          </AudioProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
