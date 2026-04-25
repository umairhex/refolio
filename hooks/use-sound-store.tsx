"use client";

import React, { createContext, useContext } from "react";
import { createStore, useStore } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface SoundState {
  isMuted: boolean;
  actions: {
    toggleMute: () => void;
    setMuted: (muted: boolean) => void;
  };
}

const createSoundStore = () =>
  createStore<SoundState>()(
    devtools(
      persist(
        (set) => ({
          isMuted: false,
          actions: {
            toggleMute: () =>
              set((state) => ({ isMuted: !state.isMuted }), false, "sound/toggleMute"),
            setMuted: (muted: boolean) => set({ isMuted: muted }, false, "sound/setMuted"),
          },
        }),
        {
          name: "sound-storage",
          partialize: (state) => ({ isMuted: state.isMuted }),
        }
      ),
      { name: "SoundStore" }
    )
  );

type SoundStore = ReturnType<typeof createSoundStore>;
const SoundContext = createContext<SoundStore | null>(null);

export const SoundProvider = ({ children }: { children: React.ReactNode }) => {
  const [store] = React.useState(() => createSoundStore());
  return (
    <SoundContext.Provider value={store}>
      {children}
    </SoundContext.Provider>
  );
};

export function useIsMuted() {
  const store = useContext(SoundContext);
  if (!store) throw new Error("useIsMuted must be used within a SoundProvider");
  return useStore(store, (state) => state.isMuted);
}

export function useSoundActions() {
  const store = useContext(SoundContext);
  if (!store) throw new Error("useSoundActions must be used within a SoundProvider");
  return useStore(store, (state) => state.actions);
}
