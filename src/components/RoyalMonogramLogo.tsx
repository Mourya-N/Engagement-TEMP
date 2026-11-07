import React from "react";

interface RoyalMonogramLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  isKannada?: boolean;
  variant?: "seal" | "crest" | "header" | "minimal";
}

export const RoyalMonogramLogo: React.FC<RoyalMonogramLogoProps> = ({
  className = "",
  size = "md",
  isKannada = false,
  variant = "crest",
}) => {
  const sizeMap = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-24 h-24",
    xl: "w-32 h-32",
  };

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${sizeMap[size]} ${className}`}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_4px_12px_rgba(40,10,15,0.35)]"
      >
        <defs>
          {/* Deep Royal Burnished Antique Dark Gold Gradient */}
          <linearGradient id="royalDarkGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8A5E17" />
            <stop offset="25%" stopColor="#5B3808" />
            <stop offset="48%" stopColor="#B88628" />
            <stop offset="72%" stopColor="#4D2E05" />
            <stop offset="100%" stopColor="#7A5214" />
          </linearGradient>

          {/* Deep Rich Shadow Tone for Monogram */}
          <linearGradient id="deepGoldShadow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#361D03" />
            <stop offset="100%" stopColor="#1A0C01" />
          </linearGradient>

          {/* Deep Dark Royal Burgundy Wax Gradient */}
          <radialGradient id="burgundyBackdropDark" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4E0F1B" />
            <stop offset="65%" stopColor="#2E070F" />
            <stop offset="100%" stopColor="#180206" />
          </radialGradient>

          {/* Dark Gold Metallic Rim Stroke */}
          <linearGradient id="darkGoldStroke" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5B3808" />
            <stop offset="50%" stopColor="#C99738" />
            <stop offset="100%" stopColor="#4D2E05" />
          </linearGradient>
        </defs>

        {variant === "seal" && (
          <>
            {/* Wax Seal Outer Ruffled Edge */}
            <circle cx="100" cy="100" r="95" fill="url(#burgundyBackdropDark)" />
            <circle
              cx="100"
              cy="100"
              r="89"
              stroke="url(#royalDarkGoldGrad)"
              strokeWidth="2"
              strokeDasharray="4 3"
              opacity="0.9"
            />
            {/* Inner subtle wax groove */}
            <circle
              cx="100"
              cy="100"
              r="85"
              stroke="#180206"
              strokeWidth="1.5"
              opacity="0.75"
            />
          </>
        )}

        {/* Outer Circular Filigree & Botanical Royal Wreath */}
        <circle cx="100" cy="100" r="82" stroke="url(#royalDarkGoldGrad)" strokeWidth="3" />
        <circle cx="100" cy="100" r="76" stroke="url(#royalDarkGoldGrad)" strokeWidth="1.2" opacity="0.8" />

        {/* 8 Ornamental Compass Dots */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => {
          const rad = (angle * Math.PI) / 180;
          const cx = 100 + 82 * Math.cos(rad);
          const cy = 100 + 82 * Math.sin(rad);
          return (
            <circle
              key={idx}
              cx={cx}
              cy={cy}
              r={angle % 90 === 0 ? "3.5" : "2"}
              fill="url(#royalDarkGoldGrad)"
              stroke="#2E070F"
              strokeWidth="0.8"
            />
          );
        })}

        {/* Top Royal Crown / Lotus Finial */}
        <g transform="translate(100, 34) scale(0.9)">
          {/* Lotus Petal Center */}
          <path
            d="M0 -15 C2 -8 7 -2 10 5 C5 5 1 0 0 -6 C-1 0 -5 5 -10 5 C-7 -2 -2 -8 0 -15 Z"
            fill="url(#royalDarkGoldGrad)"
          />
          {/* Side Lotus Flourishes */}
          <path
            d="M0 -3 C4 -2 13 1 15 8 C10 9 5 7 0 2 C-5 7 -10 9 -15 8 C-13 1 -4 -2 0 -3 Z"
            fill="url(#royalDarkGoldGrad)"
          />
          <circle cx="0" cy="-18" r="2.5" fill="url(#royalDarkGoldGrad)" />
        </g>

        {/* Bottom Auspicious Knot / Ribbon Flourish */}
        <g transform="translate(100, 166) scale(0.85)">
          <path
            d="M-22 -4 C-9 2 0 -7 0 -7 C0 -7 9 2 22 -4 C13 7 4 7 0 0 C-4 7 -13 7 -22 -4 Z"
            fill="url(#royalDarkGoldGrad)"
          />
          <circle cx="0" cy="5" r="2.8" fill="url(#royalDarkGoldGrad)" />
        </g>

        {/* Central Monogram Typography: K above and S slightly down */}
        {isKannada ? (
          <g transform="translate(100, 100)">
            {/* Background Drop Shadow for 'ಕ' */}
            <text
              x="-12"
              y="-4"
              textAnchor="middle"
              fill="url(#deepGoldShadow)"
              opacity="0.45"
              fontFamily="var(--font-noto-serif-kannada), serif"
              fontSize="40"
              fontWeight="bold"
            >
              ಕ
            </text>
            {/* Foreground 'ಕ' (Bride Kavana - Placed Above) */}
            <text
              x="-14"
              y="-6"
              textAnchor="middle"
              fill="url(#royalDarkGoldGrad)"
              stroke="url(#darkGoldStroke)"
              strokeWidth="0.6"
              fontFamily="var(--font-noto-serif-kannada), serif"
              fontSize="40"
              fontWeight="bold"
            >
              ಕ
            </text>

            {/* Connecting Delicate Ampersand */}
            <text
              x="2"
              y="11"
              textAnchor="middle"
              fill="url(#royalDarkGoldGrad)"
              fontFamily="var(--font-cormorant), Georgia, serif"
              fontSize="24"
              fontStyle="italic"
              opacity="0.85"
            >
              &amp;
            </text>

            {/* Background Drop Shadow for 'ಸ್ವ' */}
            <text
              x="16"
              y="32"
              textAnchor="middle"
              fill="url(#deepGoldShadow)"
              opacity="0.45"
              fontFamily="var(--font-noto-serif-kannada), serif"
              fontSize="38"
              fontWeight="bold"
            >
              ಸ್ವ
            </text>
            {/* Foreground 'ಸ್ವ' (Groom Sweekar - Placed Slightly Down) */}
            <text
              x="14"
              y="30"
              textAnchor="middle"
              fill="url(#royalDarkGoldGrad)"
              stroke="url(#darkGoldStroke)"
              strokeWidth="0.6"
              fontFamily="var(--font-noto-serif-kannada), serif"
              fontSize="38"
              fontWeight="bold"
            >
              ಸ್ವ
            </text>
          </g>
        ) : (
          <g transform="translate(100, 100)">
            {/* Upper Letter: K (Bride Kavana) - Shifted Above & Left */}
            <text
              x="-14"
              y="-12"
              textAnchor="middle"
              fill="url(#deepGoldShadow)"
              opacity="0.5"
              fontFamily="var(--font-cormorant), Georgia, serif"
              fontSize="58"
              fontWeight="700"
              fontStyle="italic"
            >
              K
            </text>
            <text
              x="-16"
              y="-14"
              textAnchor="middle"
              fill="url(#royalDarkGoldGrad)"
              stroke="url(#darkGoldStroke)"
              strokeWidth="0.75"
              fontFamily="var(--font-cormorant), Georgia, serif"
              fontSize="58"
              fontWeight="700"
              fontStyle="italic"
            >
              K
            </text>

            {/* Connecting Delicate Royal Ampersand in the Center */}
            <text
              x="0"
              y="9"
              textAnchor="middle"
              fill="url(#royalDarkGoldGrad)"
              fontFamily="var(--font-cormorant), Georgia, serif"
              fontSize="26"
              fontStyle="italic"
              opacity="0.85"
            >
              &amp;
            </text>

            {/* Lower Letter: S (Groom Sweekar) - Shifted Slightly Down & Right */}
            <text
              x="16"
              y="32"
              textAnchor="middle"
              fill="url(#deepGoldShadow)"
              opacity="0.5"
              fontFamily="var(--font-cormorant), Georgia, serif"
              fontSize="58"
              fontWeight="700"
              fontStyle="italic"
            >
              S
            </text>
            <text
              x="14"
              y="30"
              textAnchor="middle"
              fill="url(#royalDarkGoldGrad)"
              stroke="url(#darkGoldStroke)"
              strokeWidth="0.75"
              fontFamily="var(--font-cormorant), Georgia, serif"
              fontSize="58"
              fontWeight="700"
              fontStyle="italic"
            >
              S
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};
