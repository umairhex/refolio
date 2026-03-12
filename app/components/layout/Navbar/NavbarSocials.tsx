"use client";

import { Mail, Github } from "lucide-react";
import { SOCIAL_LINKS } from "@/constants";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { SoundLink } from "@/app/components/ui/SoundLink";
import { SoundAnchor } from "@/app/components/ui/SoundAnchor";

export const NavbarSocials = () => {
  return (
    <div className="hidden items-center gap-4 xl:flex">
      <Tooltip>
        <TooltipTrigger asChild>
          <SoundAnchor
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-40 transition-opacity hover:opacity-100 focus:outline-none"
          >
            <Github size={15} />
          </SoundAnchor>
        </TooltipTrigger>
        <TooltipContent>GitHub Profile</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <SoundLink
            href="/contact"
            className="opacity-40 transition-opacity hover:opacity-100 focus:outline-none"
          >
            <Mail size={15} />
          </SoundLink>
        </TooltipTrigger>
        <TooltipContent>Send an Email</TooltipContent>
      </Tooltip>
    </div>
  );
};
