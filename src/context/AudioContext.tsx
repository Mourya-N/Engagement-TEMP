"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { INVITATION_CONFIG } from "@/config/invitation";

interface AudioContextType {
  isPlaying: boolean;
  toggleAudio: () => void;
  playAudio: () => void;
  pauseAudio: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio element
    if (typeof window !== "undefined") {
      const audio = new Audio(INVITATION_CONFIG.audio.src);
      audio.loop = true;
      audio.volume = 0.4;
      audioRef.current = audio;

      audio.onplay = () => setIsPlaying(true);
      audio.onpause = () => setIsPlaying(false);
      audio.onerror = () => {
        // If remote audio fails to load, gracefully reset
        setIsPlaying(false);
      };
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Autoplay was blocked
          setIsPlaying(false);
        });
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleAudio = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  return (
    <AudioContext.Provider value={{ isPlaying, toggleAudio, playAudio, pauseAudio }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = (): AudioContextType => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};

