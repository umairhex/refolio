"use client";

import { useGSAP } from "@/lib/gsap";
import { animateFromViewport, AnimationOptions } from "@/lib/animations";

export const useScrollAnimation = (selector: string, options: AnimationOptions = {}) => {
  useGSAP(() => {
    animateFromViewport(selector, options);
  });
};
