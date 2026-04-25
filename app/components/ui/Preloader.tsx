"use client";

import { useState, useRef, useEffect } from "react";
import { useGSAP, gsap } from "@/lib/gsap";
import { useLoadingActions } from "@/hooks/use-loading-store";

export default function Preloader() {
  const words = ["FULLSTACK", "CLOUD", "AUTOMATION"];

  const [isHidden, setIsHidden] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLSpanElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

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

  useGSAP(
    () => {
      if (!isVisible) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (contentRef.current && !prefersReducedMotion) {
        const xTo = gsap.quickTo(contentRef.current, "x", { duration: 1, ease: "power3.out" });
        const yTo = gsap.quickTo(contentRef.current, "y", { duration: 1, ease: "power3.out" });

        const mapX = gsap.utils.mapRange(0, window.innerWidth, -30, 30);
        const mapY = gsap.utils.mapRange(0, window.innerHeight, -30, 30);

        const handleMouseMove = (e: MouseEvent) => {
          xTo(mapX(e.clientX));
          yTo(mapY(e.clientY));
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => window.removeEventListener("mousemove", handleMouseMove);
      }
    },
    { scope: containerRef, dependencies: [isVisible] },
  );

  useGSAP(
    () => {
      if (!isVisible) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      gsap.set(progressBarRef.current, { scaleX: 0, transformOrigin: "left center" });

      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("refolio_preloader_seen", "true");

          gsap.to(containerRef.current, {
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

          if (percentageRef.current) {
            percentageRef.current.innerText = `${val}%`;
          }

          if (wordRef.current) {
            const wordIndex = Math.min(Math.floor((val / 101) * words.length), words.length - 1);
            wordRef.current.innerText = words[wordIndex];
          }

          if (progressBarRef.current) {
            gsap.set(progressBarRef.current, { scaleX: val / 100 });
          }

          if (containerRef.current) {
            containerRef.current.setAttribute("aria-valuenow", String(val));
          }
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
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Loading Portfolio"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] text-[#f5f5f7] select-none"
    >
      <div ref={contentRef} className="relative flex flex-col items-center will-change-transform">
        <div className="flex items-center gap-4 overflow-hidden">
          <span
            ref={percentageRef}
            className="text-[20vw] leading-none font-bold tracking-tighter uppercase italic lg:text-[12rem]"
          >
            0%
          </span>
        </div>

        <div className="mt-8 h-6 overflow-hidden">
          <span
            ref={wordRef}
            aria-live="polite"
            className="block text-[10px] font-bold tracking-[0.3em] uppercase opacity-50 md:text-xs"
          >
            {words[0]}
          </span>
        </div>
      </div>

      <div className="bg-foreground/10 absolute bottom-0 left-0 h-px w-full">
        <div ref={progressBarRef} className="bg-foreground h-full will-change-transform" />
      </div>

      <div className="absolute right-10 bottom-10 hidden overflow-hidden md:block">
        <span className="text-[10px] font-bold tracking-widest uppercase opacity-20">
          M UMAIR KHAN / 2025
        </span>
      </div>
    </div>
  );
}
