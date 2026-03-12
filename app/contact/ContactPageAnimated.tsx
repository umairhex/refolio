'use client';

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { createTimeline, animateTo } from "@/lib/animations";

export default function ContactPageAnimated({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = createTimeline();
      animateTo(".contact-reveal", { y: 100, opacity: 0 });
      tl.to(".contact-reveal", {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.5,
      });
    },
    { scope: containerRef },
  );

  return <div ref={containerRef}>{children}</div>;
}
 