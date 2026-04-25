"use client";

import { useCallback, useEffect } from "react";
import { SOUND_CONFIG } from "@/constants";
import { useIsMuted } from "./use-sound-store";

let globalAudioContext: AudioContext | null = null;

export const useClickSound = () => {
  const isMuted = useIsMuted();

  useEffect(() => {
    return () => {};
  }, []);

  const playClick = useCallback(async () => {
    if (isMuted) return;

    try {
      if (!globalAudioContext) {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioContextClass) {
          globalAudioContext = new AudioContextClass();
        }
      }

      if (!globalAudioContext) return;
      const ctx = globalAudioContext;

      if (ctx.state === "suspended") {
        await ctx.resume();
      }

      const now = ctx.currentTime;
      const gainNode = ctx.createGain();
      gainNode.connect(ctx.destination);

      const bufferSize = ctx.sampleRate * 0.01;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = buffer;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = "highpass";
      noiseFilter.frequency.setValueAtTime(2000, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(SOUND_CONFIG.click.volume * 0.75, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.01);

      noiseSource.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(gainNode);

      const oscillator = ctx.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(1200, now);
      oscillator.frequency.exponentialRampToValueAtTime(400, now + 0.05);

      const oscGain = ctx.createGain();
      oscGain.gain.setValueAtTime(SOUND_CONFIG.click.volume, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      oscillator.connect(oscGain);
      oscGain.connect(gainNode);

      noiseSource.start(now);
      oscillator.start(now);
      oscillator.stop(now + 0.05);

      oscillator.onended = () => {
        oscillator.disconnect();
        noiseSource.disconnect();
        noiseFilter.disconnect();
        noiseGain.disconnect();
        oscGain.disconnect();
        gainNode.disconnect();
      };
    } catch (error) {
      console.warn("Web Audio API Error:", error);
    }
  }, [isMuted]);

  return playClick;
};
