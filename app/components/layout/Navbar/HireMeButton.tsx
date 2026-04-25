"use client";

import { MousePointer2 } from "lucide-react";
import { SoundLink } from "@/app/components/ui/Sound";
import { useGSAP, gsap } from "@/lib/gsap";
import { useRef } from "react";

export const HireMeButton = () => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: buttonRef });

  const onEnter = contextSafe((e: React.MouseEvent) => {
    gsap.to(e.currentTarget, { scale: 1.05, duration: 0.3, ease: "power2.out", overwrite: "auto" });
  });

  const onLeave = contextSafe((e: React.MouseEvent) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: "power2.out", overwrite: "auto" });
  });

  const onTapStart = contextSafe((e: React.MouseEvent) => {
    gsap.to(e.currentTarget, { scale: 0.95, duration: 0.1, ease: "power2.out" });
  });

  const onTapEnd = contextSafe((e: React.MouseEvent) => {
    gsap.to(e.currentTarget, { scale: 1.05, duration: 0.2, ease: "power2.out" });
  });

  return (
    <div
      ref={buttonRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onMouseDown={onTapStart}
      onMouseUp={onTapEnd}
    >
      <SoundLink
        href="/contact"
        aria-label="Contact me for projects"
        className="bg-foreground text-background group flex h-10 items-center gap-2 rounded-full px-6 text-[10px] font-bold tracking-widest uppercase transition-shadow hover:shadow-[0_8px_20px_rgba(0,0,0,0.2)] focus:outline-none dark:hover:shadow-[0_8px_20px_rgba(255,255,255,0.1)]"
      >
        <span className="hidden sm:inline">Hire Me</span>
        <MousePointer2 size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </SoundLink>
    </div>
  );
};

