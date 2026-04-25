"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useIsMuted, useSoundActions } from "@/hooks/use-sound-store";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { useGSAP, gsap } from "@/lib/gsap";
import { useRef } from "react";

export const SoundToggle = () => {
  const isMuted = useIsMuted();
  const { toggleMute } = useSoundActions();
  const iconRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP();

  // 1. Icon Switch Animation
  useGSAP(() => {
    if (!iconRef.current) return;
    
    gsap.fromTo(iconRef.current, 
      { autoAlpha: 0, scale: 0.5, rotate: isMuted ? -20 : 20 },
      { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.3, ease: "back.out(1.7)" }
    );
  }, [isMuted]);

  // 2. Hover Animation
  const onEnter = contextSafe((e: React.MouseEvent) => {
    const bg = e.currentTarget.querySelector(".sound-bg");
    gsap.to(bg, { autoAlpha: 1, scale: 1.1, duration: 0.4, ease: "power2.out", overwrite: "auto" });
  });

  const onLeave = contextSafe((e: React.MouseEvent) => {
    const bg = e.currentTarget.querySelector(".sound-bg");
    gsap.to(bg, { autoAlpha: 0, scale: 0.9, duration: 0.4, ease: "power2.out", overwrite: "auto" });
  });

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={toggleMute}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
          className="text-foreground/40 hover:text-foreground relative flex h-10 w-10 items-center justify-center rounded-full transition-colors focus:outline-none"
        >
          <div ref={iconRef} className="will-change-transform">
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </div>
          <div
            ref={bgRef}
            className="sound-bg bg-foreground/5 absolute inset-0 -z-10 rounded-full opacity-0 will-change-transform"
          />
        </button>
      </TooltipTrigger>
      <TooltipContent>
        {isMuted ? "Sound Off" : "Sound On"}
      </TooltipContent>
    </Tooltip>
  );
};
