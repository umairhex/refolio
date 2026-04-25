"use client";

import React, { createContext, use, useState, useEffect } from "react";

interface LoadingState {
  isLoaded: boolean;
}

interface LoadingActions {
  setIsLoaded: (value: boolean) => void;
}

interface LoadingContextValue {
  state: LoadingState;
  actions: LoadingActions;
}

const LoadingContext = createContext<LoadingContextValue | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const hasSeenPreloader = sessionStorage.getItem("refolio_preloader_seen");
    if (hasSeenPreloader) {
      const timeout = setTimeout(() => {
        setIsLoaded(true);
      }, 0);
      return () => clearTimeout(timeout);
    }
  }, []);

  return (
    <LoadingContext value={{ state: { isLoaded }, actions: { setIsLoaded } }}>
      {children}
    </LoadingContext>
  );
}

export function useLoading() {
  const context = use(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}
