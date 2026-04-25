"use client";

import { SoundButton } from "@/app/components/ui/Sound";
import { motion } from "framer-motion";

interface NavbarMenuButtonProps {
  onClick: () => void;
  isScrolled: boolean;
  "aria-expanded"?: boolean;
}

export const NavbarMenuButton = ({ onClick, isScrolled, "aria-expanded": ariaExpanded }: NavbarMenuButtonProps) => {
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
          <motion.div 
            className="bg-foreground group-hover:bg-background h-[1.5px] w-4"
            animate={{ width: isScrolled ? 12 : 16 }}
          />
          <motion.div 
            className="bg-foreground group-hover:bg-background h-[1.5px] w-4 opacity-60 group-hover:opacity-100" 
            animate={{ width: isScrolled ? 16 : 12 }}
          />
        </div>
      </div>
    </SoundButton>
  );
};


