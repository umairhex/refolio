"use client";

import { animateTo } from "@/lib/animations";
import { SoundLink } from "@/app/components/ui/Sound";
import { Logo } from "@/app/components/ui/Logo";

export const NavbarLogo = () => {
  return (
    <div className="nav-item flex flex-1 justify-start">
      <SoundLink
        href="/"
        className="group flex items-center gap-3 focus:outline-none"
        aria-label="Go to home"
      >
        <div
          className="nav-logo block transform-gpu cursor-pointer"
          onMouseEnter={(e) => {
            animateTo(e.currentTarget, {
              scale: 1.05,
              rotateY: 10,
              rotateX: -5,
              duration: 0.4,
              ease: "power2.out",
            });
          }}
          onMouseLeave={(e) => {
            animateTo(e.currentTarget, {
              scale: 1,
              rotateY: 0,
              rotateX: 0,
              duration: 0.4,
              ease: "power2.out",
            });
          }}
          style={{
            perspective: "1000px",
            transformStyle: "preserve-3d",
          }}
        >
          <Logo width={100} height={30} />
        </div>
      </SoundLink>
    </div>
  );
};
