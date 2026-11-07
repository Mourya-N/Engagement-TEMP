"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { INVITATION_CONFIG } from "@/config/invitation";

interface AudioContextType {
  isPlaying: boolean;
  toggleAudio: () => void;
  playAudio: () => void;
  pauseAudio: () => void;
  songTitle: string;
}

const AudioReactContext = createContext<AudioContextType | undefined>(undefined);

// Extra seconds to skip from start of audio (dialogue/wording at beginning)
// The original file was trimmed at 6s; we skip 2 more seconds client-side = 8s total cut
const AUDIO_START_OFFSET_SECONDS = 2.0;

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const audioSrc = INVITATION_CONFIG.audio?.src || "/audio/wedding-melody.mp3";
        const audio = new Audio(audioSrc);
        audio.loop = true;
        audio.volume = 0.45;

        // Skip extra 2 seconds of wording at start safely once metadata is available
        const setInitialOffset = () => {
          try {
            if (audio.currentTime < AUDIO_START_OFFSET_SECONDS) {
              audio.currentTime = AUDIO_START_OFFSET_SECONDS;
            }
          } catch {}
        };

        audio.addEventListener("loadedmetadata", setInitialOffset);
        audio.addEventListener("canplay", setInitialOffset);

        audio.onplay = () => setIsPlaying(true);
        audio.onpause = () => setIsPlaying(false);
        audio.onended = () => setIsPlaying(false);

        // When audio loops back to 0, skip to offset again to avoid hearing start
        audio.addEventListener("timeupdate", () => {
          try {
            if (audio.currentTime < AUDIO_START_OFFSET_SECONDS && audio.duration > AUDIO_START_OFFSET_SECONDS) {
              audio.currentTime = AUDIO_START_OFFSET_SECONDS;
            }
          } catch {}
        });

        audioRef.current = audio;
      } catch {
        // Fallback
      }
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
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay policy prevented playback until explicit user tap
          setIsPlaying(false);
        });
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      try {
        audioRef.current.pause();
      } catch {}
    }
    setIsPlaying(false);
  };

  const toggleAudio = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  return (
    <AudioReactContext.Provider
      value={{
        isPlaying,
        toggleAudio,
        playAudio,
        pauseAudio,
        songTitle: INVITATION_CONFIG.audio.title || "Traditional Wedding Instrumental",
      }}
    >
      {children}
    </AudioReactContext.Provider>
  );
};

export const useAudio = (): AudioContextType => {
  const context = useContext(AudioReactContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
