"use client";

import { animateTo } from "@/lib/animations";
import { SoundLink } from "@/app/components/ui/SoundLink";

export const NavbarLogo = () => {
  return (
    <div className="nav-item flex flex-1 justify-start">
      <SoundLink
        href="/"
        className="group flex items-center gap-3 focus:outline-none"
        aria-label="Go to home"
      >
        <span
          className="font-arsenica-display nav-logo block transform-gpu cursor-pointer text-2xl font-medium md:text-4xl"
          onMouseEnter={(e) => {
            animateTo(e.currentTarget, {
              rotateY: 20,
              rotateX: -10,
              x: 5,
              duration: 0.4,
              ease: "power2.out",
            });
          }}
          onMouseLeave={(e) => {
            animateTo(e.currentTarget, {
              rotateY: 0,
              rotateX: 0,
              x: 0,
              duration: 0.4,
              ease: "power2.out",
            });
          }}
          style={{
            letterSpacing: "-0.05em",
            perspective: "1000px",
            transformStyle: "preserve-3d",
          }}
        >
          Umair
        </span>
      </SoundLink>
    </div>
  );
};
