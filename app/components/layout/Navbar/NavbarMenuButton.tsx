"use client";

import { SoundButton } from "@/app/components/ui/SoundButton";

interface NavbarMenuButtonProps {
  onClick: () => void;
  isScrolled: boolean;
}

export const NavbarMenuButton = ({ onClick, isScrolled }: NavbarMenuButtonProps) => {
  return (
    <SoundButton
      onClick={onClick}
      className={`group flex transform items-center gap-3 text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-500 focus:outline-none ${isScrolled ? "scale-105" : ""}`}
    >
      <span className="hidden md:inline">Menu</span>
      <div className="border-foreground/10 group-hover:bg-foreground group-hover:text-background relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border transition-all duration-500">
        <div className="flex flex-col items-center gap-1">
          <div className="h-px w-3 bg-current" />
          <div className="h-px w-3 bg-current opacity-60" />
        </div>
      </div>
    </SoundButton>
  );
};
