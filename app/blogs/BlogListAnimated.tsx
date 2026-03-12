'use client';

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function BlogListAnimated({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      gsap.set(".blog-header-text", { y: 100, opacity: 0 });
      gsap.set(".blog-row", { y: 50, opacity: 0 });

      tl.to(".blog-header-text", {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.5,
      }).to(
        ".blog-row",
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "power3.out",
        },
        "-=0.6",
      );
    },
    { scope: containerRef },
  );

  return <div ref={containerRef}>{children}</div>;
}
