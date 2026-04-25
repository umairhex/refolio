"use client";

import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { useLoadingActions } from "@/hooks/use-loading-store";
import { createTimeline, animateTo } from "@/lib/animations";

export default function Preloader() {
  const words = ["FULLSTACK", "CLOUD", "AUTOMATION"];

  const [percentage, setPercentage] = useState(0);
  const [isHidden, setIsHidden] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [currentWord, setCurrentWord] = useState(words[0]);

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { setIsLoaded } = useLoadingActions();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hasSeenPreloader = sessionStorage.getItem("refolio_preloader_seen");

    if (!hasSeenPreloader) {
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => {
        setIsHidden(false);
        setIsVisible(true);
      });
    } else {
      setIsLoaded(true);
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [setIsLoaded]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!contentRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    const x = (clientX - innerWidth / 2) / 50;
    const y = (clientY - innerHeight / 2) / 50;

    animateTo(contentRef.current, {
      x,
      y,
      duration: 1,
      ease: "power2.out",
    });
  };

  useGSAP(
    () => {
      if (!isVisible) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const tl = createTimeline({
        onComplete: () => {
          sessionStorage.setItem("refolio_preloader_seen", "true");

          animateTo(containerRef.current, {
            yPercent: -100,
            duration: prefersReducedMotion ? 0.6 : 1.2,
            ease: "expo.inOut",
            onComplete: () => {
              setIsHidden(true);
              setIsLoaded(true);
              document.body.style.overflow = "";
            },
          });
        },
      });

      const count = { value: 0 };
      tl.to(count, {
        value: 100,
        duration: prefersReducedMotion ? 1.5 : 3,
        ease: "power2.inOut",
        onUpdate: () => {
          const val = Math.floor(count.value);
          setPercentage(val);

          const wordIndex = Math.min(Math.floor((val / 101) * words.length), words.length - 1);
          setCurrentWord(words[wordIndex]);
        },
      });

      tl.to({}, { duration: 0.2 });
    },
    { scope: containerRef, dependencies: [isVisible] },
  );

  if (isHidden) return null;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Loading Portfolio"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] text-[#f5f5f7] select-none"
    >
      <div ref={contentRef} className="relative flex flex-col items-center will-change-transform">
        <div className="flex items-center gap-4 overflow-hidden">
          <span className="text-[20vw] leading-none font-bold tracking-tighter uppercase italic lg:text-[12rem]">
            {percentage}%
          </span>
        </div>

        <div className="mt-8 h-6 overflow-hidden">
          <span
            aria-live="polite"
            className="block text-[10px] font-bold tracking-[0.3em] uppercase opacity-50 md:text-xs"
          >
            {currentWord}
          </span>
        </div>
      </div>

      <div className="bg-foreground/10 absolute bottom-0 left-0 h-px w-full">
        <div
          className="bg-foreground h-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="absolute right-10 bottom-10 hidden overflow-hidden md:block">
        <span className="text-[10px] font-bold tracking-widest uppercase opacity-20">
          M UMAIR KHAN / 2025
        </span>
      </div>
    </div>
  );
}
