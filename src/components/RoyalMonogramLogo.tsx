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
        className="w-full h-full filter drop-shadow-[0_2px_8px_rgba(100,31,44,0.18)]"
      >
        <defs>
          {/* Metallic Antique Gold Gradient */}
          <linearGradient id="royalGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DFBF7A" />
            <stop offset="25%" stopColor="#B89555" />
            <stop offset="50%" stopColor="#F5E4B9" />
            <stop offset="75%" stopColor="#96753A" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>

          {/* Deep Royal Burgundy Gradient */}
          <radialGradient id="burgundyBackdrop" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#822B3B" />
            <stop offset="70%" stopColor="#641F2C" />
            <stop offset="100%" stopColor="#3F121B" />
          </radialGradient>

          {/* Gold Shimmer Stroke */}
          <linearGradient id="goldStroke" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#96753A" />
            <stop offset="50%" stopColor="#F8F1E5" />
            <stop offset="100%" stopColor="#B89555" />
          </linearGradient>
        </defs>

        {variant === "seal" && (
          <>
            {/* Wax Seal Outer Ruffled Edge */}
            <circle cx="100" cy="100" r="95" fill="url(#burgundyBackdrop)" />
            <circle
              cx="100"
              cy="100"
              r="88"
              stroke="url(#royalGoldGrad)"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              opacity="0.85"
            />
          </>
        )}

        {/* Outer Circular Filigree & Botanical Wreath */}
        <circle cx="100" cy="100" r="82" stroke="url(#royalGoldGrad)" strokeWidth="2.5" />
        <circle cx="100" cy="100" r="76" stroke="url(#royalGoldGrad)" strokeWidth="1" opacity="0.6" />

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
              fill="url(#royalGoldGrad)"
              stroke="#FFF"
              strokeWidth="0.5"
            />
          );
        })}

        {/* Top Royal Crown / Lotus Finial */}
        <g transform="translate(100, 36) scale(0.85)">
          {/* Lotus Petal Center */}
          <path
            d="M0 -14 C2 -7 6 -2 9 4 C4 4 1 0 0 -5 C-1 0 -4 4 -9 4 C-6 -2 -2 -7 0 -14 Z"
            fill="url(#royalGoldGrad)"
          />
          {/* Side Lotus Flourishes */}
          <path
            d="M0 -3 C4 -2 12 1 14 7 C9 8 5 6 0 2 C-5 6 -9 8 -14 7 C-12 1 -4 -2 0 -3 Z"
            fill="url(#royalGoldGrad)"
          />
          <circle cx="0" cy="-16" r="2" fill="url(#royalGoldGrad)" />
        </g>

        {/* Bottom Auspicious Knot / Ribbon Flourish */}
        <g transform="translate(100, 164) scale(0.8)">
          <path
            d="M-20 -4 C-8 2 0 -6 0 -6 C0 -6 8 2 20 -4 C12 6 4 6 0 0 C-4 6 -12 6 -20 -4 Z"
            fill="url(#royalGoldGrad)"
          />
          <circle cx="0" cy="4" r="2.5" fill="url(#royalGoldGrad)" />
        </g>

        {/* Central Monogram Typography: Intertwined K & S or ಕನ್ನಡ ಕ & ಸ್ವ */}
        {isKannada ? (
          <g>
            <text
              x="100"
              y="114"
              textAnchor="middle"
              fill="url(#royalGoldGrad)"
              fontFamily="var(--font-noto-serif-kannada), serif"
              fontSize="38"
              fontWeight="bold"
              letterSpacing="2"
            >
              ಕ &amp; ಸ್ವ
            </text>
            <text
              x="100"
              y="136"
              textAnchor="middle"
              fill="url(#royalGoldGrad)"
              fontFamily="var(--font-noto-sans-kannada), sans-serif"
              fontSize="10"
              fontWeight="600"
              letterSpacing="4"
              opacity="0.9"
            >
              ನಿಶ್ಚಿತಾರ್ಥ
            </text>
          </g>
        ) : (
          <g>
            {/* Elegant Interlocking Calligraphy "K & S" */}
            <g transform="translate(100, 108)">
              {/* Monogram Background Shadow Effect */}
              <text
                x="-26"
                y="8"
                textAnchor="middle"
                fill="#3F121B"
                opacity="0.3"
                fontFamily="var(--font-cormorant), Georgia, serif"
                fontSize="62"
                fontWeight="700"
                fontStyle="italic"
              >
                K
              </text>
              <text
                x="26"
                y="8"
                textAnchor="middle"
                fill="#3F121B"
                opacity="0.3"
                fontFamily="var(--font-cormorant), Georgia, serif"
                fontSize="62"
                fontWeight="700"
                fontStyle="italic"
              >
                S
              </text>

              {/* Foreground Golden Monogram */}
              <text
                x="-28"
                y="6"
                textAnchor="middle"
                fill="url(#royalGoldGrad)"
                stroke="url(#goldStroke)"
                strokeWidth="0.5"
                fontFamily="var(--font-cormorant), Georgia, serif"
                fontSize="62"
                fontWeight="700"
                fontStyle="italic"
              >
                K
              </text>

              {/* Decorative Intertwining Ampersand */}
              <text
                x="0"
                y="4"
                textAnchor="middle"
                fill="#D4AF37"
                fontFamily="var(--font-cormorant), Georgia, serif"
                fontSize="32"
                fontStyle="italic"
                opacity="0.9"
              >
                &amp;
              </text>

              <text
                x="28"
                y="6"
                textAnchor="middle"
                fill="url(#royalGoldGrad)"
                stroke="url(#goldStroke)"
                strokeWidth="0.5"
                fontFamily="var(--font-cormorant), Georgia, serif"
                fontSize="62"
                fontWeight="700"
                fontStyle="italic"
              >
                S
              </text>
            </g>

            {/* Subtitle Royal Inscription */}
            <text
              x="100"
              y="142"
              textAnchor="middle"
              fill="url(#royalGoldGrad)"
              fontFamily="var(--font-lato), sans-serif"
              fontSize="8.5"
              fontWeight="700"
              letterSpacing="5"
              opacity="0.95"
            >
              ENGAGEMENT
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};
