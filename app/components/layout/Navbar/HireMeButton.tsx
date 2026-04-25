"use client";

import { MousePointer2 } from "lucide-react";
import { SoundLink } from "@/app/components/ui/SoundLink";
import { motion } from "framer-motion";

export const HireMeButton = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <SoundLink
        href="/contact"
        aria-label="Contact me for projects"
        className="bg-foreground text-background group flex h-10 items-center gap-2 rounded-full px-6 text-[10px] font-bold tracking-widest uppercase transition-shadow hover:shadow-[0_8px_20px_rgba(0,0,0,0.2)] focus:outline-none dark:hover:shadow-[0_8px_20px_rgba(255,255,255,0.1)]"
      >
        <span className="hidden sm:inline">Hire Me</span>
        <MousePointer2 size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </SoundLink>

    </motion.div>
  );
};

