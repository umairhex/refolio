"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { SoundLink } from "@/app/components/ui/Sound";
import { Logo } from "@/app/components/ui/Logo";
import { useRef } from "react";

export const NavbarLogo = () => {
  const logoRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: logoRef });

  const onEnter = contextSafe((e: React.MouseEvent) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      rotateY: 10,
      rotateX: -5,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  });

  const onLeave = contextSafe((e: React.MouseEvent) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      rotateY: 0,
      rotateX: 0,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  });

  return (
    <div className="nav-item absolute inset-x-0 flex justify-center lg:relative lg:inset-auto lg:flex-1 lg:justify-start">
      <SoundLink
        href="/"
        className="group flex items-center gap-3 focus:outline-none"
        aria-label="Go to home"
      >
        <div
          ref={logoRef}
          className="nav-logo block transform-gpu cursor-pointer"
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
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
