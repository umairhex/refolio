"use client";

import { Mail, Github, LucideIcon } from "lucide-react";
import { SOCIAL_LINKS, CONTACT_EMAIL } from "@/constants";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { SoundAnchor } from "@/app/components/ui/Sound";
import { useGSAP, gsap } from "@/lib/gsap";
import { useRef } from "react";

const SocialItem = ({ href, icon: Icon, label, isEmail }: { href: string; icon: LucideIcon; label: string; isEmail?: boolean }) => {
  const containerRef = useRef<HTMLAnchorElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      gsap.set(".social-bg", { autoAlpha: 0, scale: 0.9 });
    },
    { scope: containerRef },
  );

  const onEnter = contextSafe(() => {
    gsap.to(".social-bg", {
      autoAlpha: 1,
      scale: 1.1,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  });

  const onLeave = contextSafe(() => {
    gsap.to(".social-bg", {
      autoAlpha: 0,
      scale: 0.9,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  });

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <SoundAnchor
          ref={containerRef}
          href={isEmail ? `mailto:${href}` : href}
          target={isEmail ? undefined : "_blank"}
          rel={isEmail ? undefined : "noopener noreferrer"}
          aria-label={label}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          className="text-foreground/40 hover:text-foreground relative flex h-10 w-10 items-center justify-center rounded-full transition-colors focus:outline-none"
        >
          <Icon size={18} />
          <div
            className="social-bg bg-foreground/5 absolute inset-0 -z-10 rounded-full"
          />
        </SoundAnchor>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
};

export const NavbarSocials = () => {
  return (
    <div className="hidden items-center gap-3 xl:flex">
      <SocialItem href={SOCIAL_LINKS.github} icon={Github} label="GitHub Profile" />
      <SocialItem href={CONTACT_EMAIL} icon={Mail} label="Send an Email" isEmail />
    </div>
  );
};
