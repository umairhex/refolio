"use client";

import React, { createContext, useContext } from "react";
import { createStore, useStore } from "zustand";
import { devtools } from "zustand/middleware";

interface LoadingState {
  isLoaded: boolean;
  actions: {
    setIsLoaded: (value: boolean) => void;
  };
}

const createLoadingStore = () =>
  createStore<LoadingState>()(
    devtools(
      (set) => ({
        isLoaded: false,
        actions: {
          setIsLoaded: (value: boolean) =>
            set({ isLoaded: value }, false, "loading/setIsLoaded"),
        },
      }),
      { name: "LoadingStore" }
    )
  );

type LoadingStore = ReturnType<typeof createLoadingStore>;
const LoadingContext = createContext<LoadingStore | null>(null);

export const LoadingStoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [store] = React.useState(() => createLoadingStore());

  return (
    <LoadingContext.Provider value={store}>
      {children}
    </LoadingContext.Provider>
  );
};

export function useIsLoaded() {
  const store = useContext(LoadingContext);
  if (!store) throw new Error("useIsLoaded must be used within a LoadingStoreProvider");
  return useStore(store, (state) => state.isLoaded);
}

export function useLoadingActions() {
  const store = useContext(LoadingContext);
  if (!store) throw new Error("useLoadingActions must be used within a LoadingStoreProvider");
  return useStore(store, (state) => state.actions);
}
