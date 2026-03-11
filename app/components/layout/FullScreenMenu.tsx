"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { NAV_LINKS, SOCIAL_LINKS } from "@/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export default function FullScreenMenu({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const tlContainer = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      gsap.set(menuRef.current, { yPercent: -100, display: "none" });

      const tl = gsap.timeline({ paused: true });

      tl.to(menuRef.current, {
        yPercent: 0,
        duration: 0.8,
        ease: "power4.inOut",
        onStart: () => {
          gsap.set(menuRef.current, { display: "flex" });
        },
      }).fromTo(
        ".menu-link",
        { y: 150, opacity: 0, rotate: 5 },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
        },
        "-=0.5",
      );

      tlContainer.current = tl;
    },
    { scope: container },
  );

  useEffect(() => {
    if (tlContainer.current) {
      if (isOpen) {
        tlContainer.current.play();

        document.body.style.overflow = "hidden";
      } else {
        tlContainer.current.reverse().then(() => {
          if (!isOpen) {
            gsap.set(menuRef.current, { display: "none" });
            document.body.style.overflow = "visible";
          }
        });
      }
    }
  }, [isOpen]);

  return (
    <div ref={container}>
      <div
        ref={menuRef}
        className="fixed inset-0 z-100 flex-col justify-center bg-background text-foreground px-6 md:px-16 lg:px-24"
        style={{ display: "none" }}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 md:top-10 md:right-10 flex items-center gap-3 text-[10px] md:text-[11px] font-bold tracking-[0.15em] uppercase group cursor-pointer"
        >
          <span>CLOSE</span>
          <div className="w-[18px] h-[18px] rounded-full border-[1.5px] border-foreground/40 group-hover:border-foreground transition-colors flex items-center justify-center">
            <div className="w-[3px] h-[3px] bg-foreground rounded-full animate-pulse" />
          </div>
        </button>

        <div className="flex flex-col mt-16 md:mt-0">
          {NAV_LINKS.map((link, i) => (
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
                    onClick={() => setIsOpen(false)}
                    onMouseEnter={(e) => {
                      const text = e.currentTarget.querySelector(".menu-text");
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
                      const text = e.currentTarget.querySelector(".menu-text");
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
                    className="relative block w-full text-[14vw] md:text-[10vw] lg:text-[90px] font-medium leading-none tracking-tighter uppercase cursor-pointer py-3 md:py-5"
                    style={{
                      fontFamily: "'Aresenica', 'Didot', 'Georgia', serif",
                      transformStyle: "preserve-3d",
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
                      className="menu-text block transform-gpu origin-left relative z-10 pl-2 lg:pl-4 pb-2"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {link.name}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-6 md:bottom-10 left-6 right-6 md:left-16 lg:left-24 md:right-16 lg:right-24 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[10px] md:text-[11px] tracking-[0.15em] uppercase text-foreground/50 border-t border-foreground/10 pt-6">
          <span>{`© ${new Date().getFullYear()} UMAIR`}</span>
          <div className="flex gap-6">
            <a
              href={SOCIAL_LINKS.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors cursor-pointer"
            >
              Twitter
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors cursor-pointer"
            >
              LinkedIn
            </a>
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors cursor-pointer"
            >
              Github
            </a>
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors cursor-pointer"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
