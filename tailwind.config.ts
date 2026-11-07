import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/config/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: "#F8F1E5",
          light: "#FDFBF7",
          dark: "#EDE2D1",
        },
        gold: {
          DEFAULT: "#B89555",
          light: "#D8B97A",
          dark: "#96753A",
          accent: "#D4AF37",
        },
        burgundy: {
          DEFAULT: "#641F2C",
          light: "#822B3B",
          dark: "#4B1621",
        },
        emerald: {
          DEFAULT: "#263D32",
          light: "#355244",
          dark: "#1A2B23",
        },
        dustyrose: {
          DEFAULT: "#D9BDB0",
          light: "#E8D5CC",
          dark: "#C59E8E",
        },
        espresso: {
          DEFAULT: "#382A24",
          light: "#4E3C34",
          dark: "#261C18",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-lato)", "sans-serif"],
        kannadaSerif: ["var(--font-noto-serif-kannada)", "serif"],
        kannadaSans: ["var(--font-noto-sans-kannada)", "sans-serif"],
      },
      boxShadow: {
        'royal': '0 10px 30px -10px rgba(100, 31, 44, 0.15), 0 4px 6px -2px rgba(184, 149, 85, 0.1)',
        'royal-gold': '0 0 25px rgba(184, 149, 85, 0.25)',
        'wax-seal': 'inset 0 2px 4px rgba(255, 255, 255, 0.3), 0 8px 16px rgba(100, 31, 44, 0.35)',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'petal-fall': 'fall 12s linear infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(3deg)' },
        },
        fall: {
          '0%': { transform: 'translateY(-10vh) translateX(0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.85' },
          '90%': { opacity: '0.85' },
          '100%': { transform: 'translateY(105vh) translateX(40px) rotate(360deg)', opacity: '0' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

