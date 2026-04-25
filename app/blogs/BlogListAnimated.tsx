'use client';

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function BlogListAnimated({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(containerRef);
      gsap.fromTo(
        q(".blog-header-text"),
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

      gsap.fromTo(
        q(".blog-row"),
        { y: 50, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "power3.out",
          delay: 0.4,
          clearProps: "transform",
        },
      );
    },
    { scope: containerRef },
  );

  return <div ref={containerRef}>{children}</div>;
}
