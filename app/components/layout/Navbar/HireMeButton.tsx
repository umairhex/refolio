"use client";

import { MousePointer2 } from "lucide-react";
import { SoundLink } from "@/app/components/ui/SoundLink";

export const HireMeButton = () => {
  return (
    <SoundLink
      href="/contact"
      className="bg-foreground text-background group flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-bold tracking-widest uppercase transition-all hover:scale-105 active:scale-95 hover:shadow-lg focus:outline-none"
    >
      <span className="hidden sm:inline">Hire Me</span>
      <MousePointer2 size={10} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </SoundLink>
  );
};
