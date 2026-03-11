"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, SOCIAL_PROFILES } from "@/constants";
import { useClickSound } from "@/hooks/use-click-sound";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { useMenuAnimation } from "@/hooks/use-menu-animation";

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
  const playClick = useClickSound();

  useScrollLock(isOpen);

  useMenuAnimation({ isOpen, menuRef, containerRef: container });

  return (
    <div ref={container}>
      <div
        ref={menuRef}
        className="fixed inset-0 z-100 flex-col justify-center bg-background text-foreground px-6 md:px-16 lg:px-24"
        style={{ display: "none" }}
      >
        <button
          onClick={() => {
            onClose();
            playClick();
          }}
          className="absolute top-6 right-6 md:top-10 md:right-10 flex items-center gap-3 text-[10px] md:text-[11px] font-bold tracking-[0.15em] uppercase group cursor-pointer focus:outline-none"
          tabIndex={isOpen ? 0 : -1}
          aria-label="Close Menu"
        >
          <span>CLOSE</span>
          <div className="w-[18px] h-[18px] rounded-full border-[1.5px] border-foreground/40 group-hover:border-foreground transition-colors flex items-center justify-center">
            <div className="w-[3px] h-[3px] bg-foreground rounded-full animate-pulse" />
          </div>
        </button>

        <div className="flex flex-col mt-16 md:mt-0">
          {NAV_LINKS.map((link, i) => {
            const isActive = pathname === link.href;
            return (
              <div
                key={i}
                className="border-b border-foreground/5 last:border-0 group"
              >
                <div
                  className="overflow-hidden w-full"
                  style={{ padding: "20px 0", margin: "-20px 0" }}
                >
                  <div
                    className="menu-link transform origin-top-left w-full"
                    style={{ perspective: "1000px" }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => {
                        onClose();
                        playClick();
                      }}
                      tabIndex={isOpen ? 0 : -1}
                      onMouseEnter={(e) => {
                        const text =
                          e.currentTarget.querySelector(".menu-text");
                        const bar = e.currentTarget.querySelector(".menu-bar");
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
                      }}
                      onMouseLeave={(e) => {
                        const text =
                          e.currentTarget.querySelector(".menu-text");
                        const bar = e.currentTarget.querySelector(".menu-bar");
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
                      }}
                      className="font-arsenica-display relative block w-full text-[14vw] md:text-[10vw] lg:text-[90px] font-medium leading-none tracking-tighter uppercase cursor-pointer py-3 md:py-5 focus:outline-none"
                      style={{
                        transformStyle: "preserve-3d",
                        opacity: isActive ? 1 : 0.4,
                        transition: "opacity 0.3s ease",
                      }}
                    >
                      <div
                        className="menu-bar absolute top-0 left-0 w-full h-full bg-foreground pointer-events-none z-0"
                        style={{
                          transform: "scaleX(0) scaleY(0.05)",
                          transformOrigin: "left center",
                        }}
                      />
                      <span
                        className="menu-text transform-gpu origin-left relative z-10 pl-2 lg:pl-4 pb-2 flex items-center gap-6"
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        {link.name}
                        {isActive && (
                          <span className="text-[10px] tracking-[0.4em] italic font-bold opacity-30 mt-4 md:mt-8">
                            (CURRENT)
                          </span>
                        )}
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="absolute bottom-6 md:bottom-10 left-6 right-6 md:left-16 lg:left-24 md:right-16 lg:right-24 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[10px] md:text-[11px] tracking-[0.15em] uppercase text-foreground/50 border-t border-foreground/10 pt-6">
          <span>{`© ${new Date().getFullYear()} UMAIR`}</span>
          <div className="flex gap-6">
            {SOCIAL_PROFILES.map((p) => (
              <a
                key={p.key}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors cursor-pointer capitalize"
                onClick={() => playClick()}
                tabIndex={isOpen ? 0 : -1}
              >
                {p.key}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
