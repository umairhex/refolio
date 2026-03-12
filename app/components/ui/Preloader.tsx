"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useLoading } from "@/app/context/LoadingContext";

export default function Preloader() {
  const [percentage, setPercentage] = useState(0);
  const [isHidden, setIsHidden] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const words = ["ENGINEERING", "AESTHETICS", "PRECISION", "BRUTALISM"];

  const { setIsLoaded } = useLoading();

  useEffect(() => {
    const hasSeenPreloader = sessionStorage.getItem("refolio_preloader_seen");

    if (!hasSeenPreloader) {
      setIsHidden(false);
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!contentRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    const x = (clientX - innerWidth / 2) / 50;
    const y = (clientY - innerHeight / 2) / 50;

    gsap.to(contentRef.current, {
      x,
      y,
      duration: 1,
      ease: "power2.out",
    });
  };

  useGSAP(
    () => {
      if (!isVisible) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

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

      if (prefersReducedMotion) {
        tl.to(
          { val: 0 },
          {
            val: 100,
            duration: 1,
            onUpdate: function () {
              setPercentage(Math.floor(this.targets()[0].val));
            },
          },
        );
        return;
      }

      const count = { value: 0 };
      tl.to(count, {
        value: 100,
        duration: 2.5,
        ease: "power2.inOut",
        onUpdate: () => setPercentage(Math.floor(count.value)),
      });

      words.forEach((word, i) => {
        const startTime = (i * 2.1) / words.length;
        tl.to(
          wordRef.current,
          {
            opacity: 0,
            y: -10,
            duration: 0.15,
            onComplete: () => {
              if (wordRef.current) wordRef.current.innerText = word;
            },
          },
          startTime,
        ).to(wordRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.15,
        });
      });

      tl.to({}, { duration: 0.4 });
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
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-foreground select-none overflow-hidden"
    >
      <div
        ref={contentRef}
        className="relative flex flex-col items-center will-change-transform"
      >
        <div className="overflow-hidden flex items-center gap-4">
          <span className="text-[20vw] lg:text-[12rem] font-bold tracking-tighter leading-none italic uppercase">
            {percentage}%
          </span>
        </div>

        <div className="mt-8 overflow-hidden h-6">
          <span
            ref={wordRef}
            aria-live="polite"
            className="block text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase opacity-50"
          >
            {words[0]}
          </span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-foreground/10">
        <div
          className="h-full bg-foreground transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="absolute bottom-10 right-10 overflow-hidden hidden md:block">
        <span className="text-[10px] font-bold tracking-widest uppercase opacity-20">
          M UMAIR KHAN / 2025
        </span>
      </div>
    </div>
  );
}
