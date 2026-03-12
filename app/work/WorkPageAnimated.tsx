'use client';

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { createTimeline, animateTo } from "@/lib/animations";

export default function WorkPageAnimated({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = createTimeline();

      animateTo(".work-header-text", { y: 100, opacity: 0 });
      animateTo(".project-row", { y: 50, opacity: 0 });

      tl.to(".work-header-text", {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.5,
      }).to(
        ".project-row",
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "power3.out",
          clearProps: "transform",
        },
        "-=0.6",
      );
    },
    { scope: containerRef },
  );

  return <div ref={containerRef}>{children}</div>;
}
