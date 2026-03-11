"use client";

import { useEffect } from "react";

export const useScrollLock = (active: boolean) => {
  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);
};
