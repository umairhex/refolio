'use client';

import { useRef } from "react";
import { useGSAP, gsap } from "@/lib/gsap";

export default function ContactPageAnimated({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(containerRef);
      gsap.fromTo(
        q(".contact-reveal"),
        { y: 100, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out",
          delay: 0.1,
        },
      );
    },
    { scope: containerRef },
  );

  return <div ref={containerRef}>{children}</div>;
}
 