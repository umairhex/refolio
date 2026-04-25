'use client';

import { useRef } from "react";
import { useGSAP, gsap } from "@/lib/gsap";

export default function ContactPageAnimated({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".contact-reveal",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out",
          delay: 0.1,
        }
      );
    },
    { scope: containerRef },
  );

  return <div ref={containerRef}>{children}</div>;
}
 