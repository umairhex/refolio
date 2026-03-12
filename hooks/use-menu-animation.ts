"use client";

import { useRef, useEffect } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface UseMenuAnimationOptions {
  isOpen: boolean;
  menuRef: React.RefObject<HTMLDivElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export const useMenuAnimation = ({ isOpen, menuRef, containerRef }: UseMenuAnimationOptions) => {
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      gsap.set(menuRef.current, { yPercent: -100, display: "none" });

      const tl = gsap.timeline({ paused: true });

      tl.to(menuRef.current, {
        yPercent: 0,
        duration: 0.8,
        ease: "power4.inOut",
        onStart: () => {
          gsap.set(menuRef.current, { display: "flex" });
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

      tlRef.current = tl;
    },
    { scope: containerRef },
  );

  useEffect(() => {
    if (!tlRef.current) return;
    if (isOpen) {
      tlRef.current.play();
    } else {
      tlRef.current.reverse().then(() => {
        gsap.set(menuRef.current, { display: "none" });
      });
    }
  }, [isOpen, menuRef]);
};
