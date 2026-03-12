"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { usePathname } from "next/navigation";
import { NAV_LINKS, SOCIAL_PROFILES } from "@/constants";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { useMenuAnimation } from "@/hooks/use-menu-animation";
import { SoundLink } from "@/app/components/ui/SoundLink";
import { SoundButton } from "@/app/components/ui/SoundButton";
import { SoundAnchor } from "@/app/components/ui/SoundAnchor";

export default function FullScreenMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useScrollLock(isOpen);

  useMenuAnimation({ isOpen, menuRef, containerRef: container });

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const text = e.currentTarget.querySelector(".menu-text");
    const bar = e.currentTarget.querySelector(".menu-bar");
    if (!text || !bar) return;
    gsap.killTweensOf([text, bar]);
    gsap.to(text, {
      rotateY: -8,
      rotateX: 5,
      x: 20,
      color: "var(--background)",
      duration: 0.5,
      ease: "power3.out",
    });
    gsap.to(bar, {
      scaleX: 1,
      scaleY: 1,
      duration: 0.5,
      ease: "power4.out",
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const text = e.currentTarget.querySelector(".menu-text");
    const bar = e.currentTarget.querySelector(".menu-bar");
    if (!text || !bar) return;
    gsap.killTweensOf([text, bar]);
    gsap.to(text, {
      rotateY: 0,
      rotateX: 0,
      x: 0,
      color: "var(--foreground)",
      duration: 0.5,
      ease: "power3.out",
    });
    gsap.to(bar, {
      scaleX: 0,
      scaleY: 0.05,
      duration: 0.5,
      ease: "power4.out",
    });
  };

  return (
    <div ref={container}>
      <div
        ref={menuRef}
        className="bg-background text-foreground fixed inset-0 z-100 flex-col justify-center px-6 md:px-16 lg:px-24"
        style={{ display: "none" }}
      >
        <SoundButton
          onClick={onClose}
          className="group absolute top-6 right-6 flex cursor-pointer items-center gap-3 text-[10px] font-bold tracking-[0.15em] uppercase focus:outline-none md:top-10 md:right-10 md:text-[11px]"
          tabIndex={isOpen ? 0 : -1}
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
                <div
                  className="w-full overflow-hidden"
                  style={{ padding: "20px 0", margin: "-20px 0" }}
                >
                  <div
                    className="menu-link w-full origin-top-left transform"
                    style={{ perspective: "1000px" }}
                  >
                    <SoundLink
                      href={link.href}
                      onClick={onClose}
                      tabIndex={isOpen ? 0 : -1}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      className="font-arsenica-display relative block w-full cursor-pointer py-3 text-[14vw] leading-none font-medium tracking-tighter uppercase focus:outline-none md:py-5 md:text-[10vw] lg:text-[90px]"
                      style={{
                        transformStyle: "preserve-3d",
                        opacity: isActive ? 1 : 0.4,
                        transition: "opacity 0.3s ease",
                      }}
                    >
                      <div
                        className="menu-bar bg-foreground pointer-events-none absolute top-0 left-0 z-0 h-full w-full"
                        style={{
                          transform: "scaleX(0) scaleY(0.05)",
                          transformOrigin: "left center",
                        }}
                      />
                      <span
                        className="menu-text relative z-10 flex origin-left transform-gpu items-center gap-6 pb-2 pl-2 lg:pl-4"
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        {link.name}
                        {isActive && (
                          <span className="mt-4 text-[10px] font-bold tracking-[0.4em] italic opacity-30 md:mt-8">
                            (CURRENT)
                          </span>
                        )}
                      </span>
                    </SoundLink>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-foreground/50 border-foreground/10 absolute right-6 bottom-6 left-6 flex flex-col items-start justify-between gap-4 border-t pt-6 text-[10px] tracking-[0.15em] uppercase md:right-16 md:bottom-10 md:left-16 md:flex-row md:items-center md:text-[11px] lg:right-24 lg:left-24">
          <span>{`© ${new Date().getFullYear()} M UMAIR KHAN`}</span>
          <div className="flex gap-6">
            {SOCIAL_PROFILES.map((p) => (
              <SoundAnchor
                key={p.key}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground cursor-pointer capitalize transition-colors focus:outline-none"
                tabIndex={isOpen ? 0 : -1}
              >
                {p.key}
              </SoundAnchor>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
