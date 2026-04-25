"use client";

import { Mail, Github } from "lucide-react";
import { SOCIAL_LINKS } from "@/constants";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Sound } from "@/app/components/ui/Sound";
import { motion } from "framer-motion";

export const NavbarSocials = () => {
  return (
    <div className="hidden items-center gap-3 xl:flex">
      <Tooltip>
        <TooltipTrigger asChild>
          <Sound.Anchor
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit GitHub Profile"
            className="text-foreground/40 hover:text-foreground relative flex h-10 w-10 items-center justify-center rounded-full transition-colors focus:outline-none"
          >
            <Github size={18} />
            <motion.div
              className="bg-foreground/5 absolute inset-0 -z-10 rounded-full opacity-0"
              whileHover={{ opacity: 1, scale: 1.1 }}
            />
          </Sound.Anchor>
        </TooltipTrigger>
        <TooltipContent>GitHub Profile</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Sound.Link
            href="/contact"
            aria-label="Send an Email"
            className="text-foreground/40 hover:text-foreground relative flex h-10 w-10 items-center justify-center rounded-full transition-colors focus:outline-none"
          >
            <Mail size={18} />
            <motion.div
              className="bg-foreground/5 absolute inset-0 -z-10 rounded-full opacity-0"
              whileHover={{ opacity: 1, scale: 1.1 }}
            />
          </Sound.Link>
        </TooltipTrigger>
        <TooltipContent>Send an Email</TooltipContent>
      </Tooltip>
    </div>

  );
};

