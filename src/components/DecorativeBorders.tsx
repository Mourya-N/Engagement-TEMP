import React from "react";

export const RoyalCornerFlourish: React.FC<{
  className?: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}> = ({ className = "", position = "top-left" }) => {
  const getRotation = () => {
    switch (position) {
      case "top-right":
        return "scale-x-[-1]";
      case "bottom-left":
        return "scale-y-[-1]";
      case "bottom-right":
        return "scale-[-1]";
      default:
        return "";
    }
  };

  return (
    <div
      className={`pointer-events-none absolute w-16 h-16 sm:w-24 sm:h-24 ${getRotation()} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-gold opacity-85"
      >
        <path
          d="M4 4 C 30 4, 40 14, 50 25 C 60 36, 75 45, 96 46"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M4 4 C 4 30, 14 40, 25 50 C 36 60, 45 75, 46 96"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M8 8 C 25 8, 35 18, 42 26 C 26 35, 18 25, 8 8 Z"
          fill="currentColor"
          fillOpacity="0.25"
          stroke="currentColor"
          strokeWidth="1"
        />
        <circle cx="16" cy="16" r="3" fill="currentColor" />
        <circle cx="28" cy="12" r="2" fill="currentColor" />
        <circle cx="12" cy="28" r="2" fill="currentColor" />
        <path
          d="M4 4 L 4 35 M 4 4 L 35 4"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="square"
        />
      </svg>
    </div>
  );
};

export const RoyalDivider: React.FC<{
  className?: string;
  variant?: "lotus" | "simple" | "diya";
}> = ({ className = "", variant = "lotus" }) => {
  return (
    <div className={`flex items-center justify-center my-6 sm:my-8 select-none ${className}`}>
      <div className="h-[1px] w-16 sm:w-32 bg-gradient-to-r from-transparent via-gold to-gold/70" />
      <div className="mx-3 sm:mx-4 flex items-center text-gold">
        {variant === "lotus" && (
          <svg
            className="w-7 h-7 sm:w-9 sm:h-9"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Traditional Indian stylized lotus */}
            <path
              d="M20 6 C21 13 26 19 28 26 C23 26 21 21 20 18 C19 21 17 26 12 26 C14 19 19 13 20 6Z"
              fill="#B89555"
              fillOpacity="0.85"
            />
            <path
              d="M20 18 C24 16 32 20 34 27 C28 29 24 26 20 22 C16 26 12 29 6 27 C8 20 16 16 20 18Z"
              fill="#641F2C"
              fillOpacity="0.75"
            />
            <path
              d="M10 27 C15 31 25 31 30 27 C26 33 14 33 10 27 Z"
              fill="#B89555"
            />
            <circle cx="20" cy="24" r="1.5" fill="#F8F1E5" />
          </svg>
        )}
        {variant === "diya" && (
          <svg
            className="w-6 h-6 sm:w-8 sm:h-8"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 4 C17 8 19 11 18 14 C17 16 15 16 14 14 C13 11 15 8 16 4Z"
              fill="#D4AF37"
            />
            <path
              d="M8 17 C10 23 22 23 24 17 C25 21 21 25 16 25 C11 25 7 21 8 17Z"
              fill="#B89555"
            />
          </svg>
        )}
        {variant === "simple" && (
          <div className="flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="w-2.5 h-2.5 rotate-45 border border-gold bg-gold/30" />
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
          </div>
        )}
      </div>
      <div className="h-[1px] w-16 sm:w-32 bg-gradient-to-l from-transparent via-gold to-gold/70" />
    </div>
  );
};

export const MandapArchFrame: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return (
    <div
      className={`relative p-6 sm:p-10 md:p-14 bg-ivory/80 backdrop-blur-sm rounded-t-[50px] sm:rounded-t-[80px] rounded-b-2xl border-2 border-gold/40 shadow-royal transition-all duration-300 ${className}`}
      style={{
        backgroundImage: `radial-gradient(circle at 50% 0%, rgba(184, 149, 85, 0.08) 0%, transparent 70%)`,
      }}
    >
      <RoyalCornerFlourish position="top-left" className="top-2 left-2" />
      <RoyalCornerFlourish position="top-right" className="top-2 right-2" />
      <RoyalCornerFlourish position="bottom-left" className="bottom-2 left-2" />
      <RoyalCornerFlourish position="bottom-right" className="bottom-2 right-2" />

      {/* Decorative top arch crest */}
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex items-center justify-center bg-ivory px-4 py-1 border border-gold/50 rounded-full shadow-sm">
        <span className="text-xs uppercase tracking-widest text-gold font-medium">
          ✦ ॐ ✦
        </span>
      </div>

      {children}
    </div>
  );
};

