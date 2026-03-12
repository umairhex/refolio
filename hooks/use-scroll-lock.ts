"use client";

import { useEffect } from "react";

export const useScrollLock = (active: boolean) => {
  useEffect(() => {
    const html = document.documentElement;
    const SCROLL_LOCK_CLASS = "scroll-locked";

    if (active) {
      html.classList.add(SCROLL_LOCK_CLASS);
    } else {
      html.classList.remove(SCROLL_LOCK_CLASS);
    }

    return () => {
      html.classList.remove(SCROLL_LOCK_CLASS);
    };
  }, [active]);
};
