"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { SoundButton } from "@/app/components/ui/Sound";

interface NavbarMenuButtonProps {
  onClick: () => void;
  isScrolled: boolean;
  "aria-expanded"?: boolean;
}

export const NavbarMenuButton = ({ onClick, isScrolled, "aria-expanded": ariaExpanded }: NavbarMenuButtonProps) => {
  const bar1Ref = useRef<HTMLDivElement>(null);
  const bar2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(bar1Ref.current, {
      width: isScrolled ? 12 : 16,
      duration: 0.5,
      ease: "expo.out",
      overwrite: "auto",
    });
    gsap.to(bar2Ref.current, {
      width: isScrolled ? 16 : 12,
      duration: 0.5,
      ease: "expo.out",
      overwrite: "auto",
    });
  }, [isScrolled]);

  return (
    <SoundButton
      onClick={onClick}
      aria-label="Open navigation menu"
      aria-expanded={ariaExpanded}
      className={`group relative flex items-center gap-4 focus:outline-none ${isScrolled ? "scale-105" : ""}`}
    >
      <span className="text-foreground/60 hidden text-[10px] font-bold tracking-[0.2em] uppercase transition-colors group-hover:text-foreground md:inline">
        Menu
      </span>
      
      <div className="border-foreground/10 group-hover:border-foreground/20 group-hover:bg-foreground group-active:scale-95 relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border transition-all duration-500">
        <div className="flex flex-col items-center gap-1.5 transition-transform duration-500 group-hover:scale-110">
          <div 
            ref={bar1Ref}
            className="bg-foreground group-hover:bg-background h-[1.5px]"
          />
          <div 
            ref={bar2Ref}
            className="bg-foreground group-hover:bg-background h-[1.5px] opacity-60 group-hover:opacity-100" 
          />
        </div>
      </div>
    </SoundButton>
  );
};


