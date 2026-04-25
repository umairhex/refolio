"use client";

import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { NAV_LINKS, SOCIAL_PROFILES } from "@/constants";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { SoundButton, SoundLink, SoundAnchor } from "@/app/components/ui/Sound";
import { useGSAP, gsap } from "@/lib/gsap";
import { useRef, useEffect } from "react";

export default function FullScreenMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  useScrollLock(isOpen);
  const menuRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const { contextSafe } = useGSAP(
    () => {
      if (!menuRef.current) return;
      const q = gsap.utils.selector(menuRef);

      // 1. Initial State
      gsap.set(menuRef.current, { yPercent: -100, autoAlpha: 0 });
      gsap.set(q(".menu-link-wrapper"), { y: 100, autoAlpha: 0, rotateX: 45 });
      gsap.set(q(".menu-footer"), { autoAlpha: 0, y: 20 });

      // 2. Create Timeline
      tl.current = gsap.timeline({ paused: true })
        .to(menuRef.current, {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: "power4.inOut",
        })
        .to(
          q(".menu-link-wrapper"),
          {
            y: 0,
            autoAlpha: 1,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .to(
          q(".menu-footer"),
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        );
    },
    { scope: menuRef }
  );

  useEffect(() => {
    if (isOpen) {
      tl.current?.play();
    } else {
      tl.current?.reverse();
    }
  }, [isOpen]);

  const onLinkEnter = contextSafe((e: React.MouseEvent) => {
    const bg = e.currentTarget.querySelector(".link-hover-bg");
    const text = e.currentTarget.querySelector(".link-text");
    
    gsap.to(bg, { scaleX: 1, scaleY: 1, duration: 0.5, ease: "expo.out" });
    gsap.to(text, { 
      rotateY: -8, 
      rotateX: 5, 
      x: 20, 
      color: "var(--background)", 
      duration: 0.5, 
      ease: "expo.out" 
    });
  });

  const onLinkLeave = contextSafe((e: React.MouseEvent) => {
    const bg = e.currentTarget.querySelector(".link-hover-bg");
    const text = e.currentTarget.querySelector(".link-text");
    
    gsap.to(bg, { scaleX: 0, scaleY: 0.05, duration: 0.5, ease: "expo.out" });
    gsap.to(text, { 
      rotateY: 0, 
      rotateX: 0, 
      x: 0, 
      color: "var(--foreground)", 
      duration: 0.5, 
      ease: "expo.out" 
    });
  });

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={menuRef}
      className="bg-background text-foreground fixed inset-0 z-100 flex flex-col justify-center px-6 md:px-16 lg:px-24 will-change-transform"
      style={{ visibility: "hidden" }} // Start hidden to prevent flash
    >
      <SoundButton
        onClick={onClose}
        className="group absolute top-6 right-6 flex cursor-pointer items-center gap-3 text-[10px] font-bold tracking-[0.15em] uppercase focus:outline-none md:top-10 md:right-10 md:text-[11px]"
        aria-label="Close Menu"
      >
        <span>CLOSE</span>
        <div className="border-foreground/40 group-hover:border-foreground flex h-4.5 w-4.5 items-center justify-center rounded-full border-[1.5px] transition-colors">
          <div className="bg-foreground h-0.75 w-0.75 animate-pulse rounded-full" />
        </div>
      </SoundButton>

      <div className="mt-16 flex flex-col md:mt-0">
        {NAV_LINKS.map((link, i) => {
          const isActive = pathname === link.href;
          return (
            <div key={i} className="border-foreground/5 group border-b last:border-0">
              <div className="menu-link-wrapper w-full overflow-hidden" style={{ padding: "20px 0", margin: "-20px 0" }}>
                <SoundLink
                  href={link.href}
                  onClick={onClose}
                  onMouseEnter={onLinkEnter}
                  onMouseLeave={onLinkLeave}
                  className="font-arsenica-display relative block w-full cursor-pointer py-3 text-[14vw] leading-none font-medium tracking-tighter uppercase focus:outline-none md:py-5 md:text-[10vw] lg:text-[90px]"
                  style={{
                    transformStyle: "preserve-3d",
                    opacity: isActive ? 1 : 0.4,
                  }}
                >
                  <div className="relative w-full h-full">
                    <div 
                      className="link-hover-bg bg-foreground pointer-events-none absolute inset-0 z-0 origin-left scale-x-0 scale-y-[0.05]" 
                    />
                    <span
                      className="link-text relative z-10 flex origin-left transform-gpu items-center gap-6 pb-2 pl-2 lg:pl-4 transition-colors duration-300"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {link.name}
                      {isActive && (
                        <span className="mt-4 text-[10px] font-bold tracking-[0.4em] italic opacity-30 md:mt-8 lowercase">
                          (current)
                        </span>
                      )}
                    </span>
                  </div>
                </SoundLink>
              </div>
            </div>
          );
        })}
      </div>

      <div className="menu-footer text-foreground/50 border-foreground/10 absolute right-6 bottom-6 left-6 flex flex-col items-start justify-between gap-4 border-t pt-6 text-[10px] tracking-[0.15em] uppercase md:right-16 md:bottom-10 md:left-16 md:flex-row md:items-center md:text-[11px] lg:right-24 lg:left-24">
        <span>{`© ${new Date().getFullYear()} M UMAIR KHAN`}</span>
        <div className="flex gap-6">
          {SOCIAL_PROFILES.map((p) => (
            <SoundAnchor
              key={p.key}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground cursor-pointer capitalize transition-colors focus:outline-none"
            >
              {p.key}
            </SoundAnchor>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}
