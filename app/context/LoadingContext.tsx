"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface LoadingContextType {
  isLoaded: boolean;
  setIsLoaded: (value: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

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
    <LoadingContext.Provider value={{ isLoaded, setIsLoaded }}>{children}</LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}
