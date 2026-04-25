"use client";

import React, { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { createTimeline, animateTo } from "@/lib/animations";
import { gsap } from "@/lib/gsap";

interface UseMenuAnimationOptions {
  isOpen: boolean;
  menuRef: React.RefObject<HTMLDivElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export const useMenuAnimation = ({ isOpen, menuRef, containerRef }: UseMenuAnimationOptions) => {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      animateTo(menuRef.current, { yPercent: -100, display: "none" });
    },
    { scope: containerRef },
  );

  useGSAP(
    () => {
      if (!menuRef.current) return;

      if (!timelineRef.current) {
        const tl = createTimeline({
          paused: true,
          reversed: true,
        });

        tl.to(menuRef.current, {
          yPercent: 0,
          duration: 0.8,
          ease: "power4.inOut",
          onStart: () => {
            gsap.set(menuRef.current, { display: "flex" });
          },
          onReverseComplete: () => {
            gsap.set(menuRef.current, { display: "none" });
          },
        }).fromTo(
          ".menu-link",
          { y: 150, opacity: 0, rotate: 5 },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.5",
        );

        timelineRef.current = tl;
      }

      if (isOpen) {
        timelineRef.current.play();
      } else {
        timelineRef.current.reverse();
      }
    },
    { scope: containerRef, dependencies: [isOpen] },
  );
};
