"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import FullScreenMenu from "./FullScreenMenu";
import { CONTACT_EMAIL } from "@/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export default function Navbar() {
  const [time, setTime] = useState("");
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      gsap.set(".nav-item", { opacity: 0, y: -20 });

      tl.to(navRef.current, {
        width: "98%",
        opacity: 1,
        duration: 1.2,
        ease: "power4.inOut",
      }).to(
        ".nav-item",
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.4",
      );
    },
    { scope: navRef },
  );

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Karachi",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

      setTime(`PKT - ${formatter.format(now)}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className="relative mx-auto mt-4 md:mt-6 w-[90%] opacity-0 max-w-[1500px] z-50 flex items-center justify-between px-6 md:px-8 py-3.5 bg-background/70 backdrop-blur-lg border border-foreground/5 rounded-[6px] text-foreground"
      >
        <div className="flex-1 flex justify-start nav-item">
          <Link href="/">
            <span
              className="text-lg md:text-xl font-bold italic cursor-pointer block transform-gpu nav-logo"
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  rotateY: 15,
                  rotateX: -10,
                  x: 5,
                  duration: 0.4,
                  ease: "power2.out",
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  rotateY: 0,
                  rotateX: 0,
                  x: 0,
                  duration: 0.4,
                  ease: "power2.out",
                });
              }}
              style={{
                fontFamily: "'Aresenica', 'Didot', 'Georgia', serif",
                letterSpacing: "-0.05em",
                perspective: "1000px",
                transformStyle: "preserve-3d",
              }}
            >
              Umair
            </span>
          </Link>
        </div>

        <div className="flex-1 hidden lg:flex justify-start opacity-70 text-[10px] md:text-[11px] font-bold tracking-widest uppercase nav-item">
          {time || "PKT - 00:00:00 AM"}
        </div>

        <div className="flex-1 hidden md:flex justify-center text-[10px] md:text-[11px] font-bold tracking-[0.15em] uppercase gap-2 text-foreground/40 nav-item">
          <button
            onClick={() => setTheme("light")}
            className={`transition-all cursor-pointer ${
              mounted && resolvedTheme === "light"
                ? "text-foreground opacity-100"
                : "hover:text-foreground hover:opacity-100"
            }`}
          >
            LIGHT
          </button>
          <span className="font-normal opacity-50">|</span>
          <button
            onClick={() => setTheme("dark")}
            className={`transition-all cursor-pointer ${
              mounted && resolvedTheme === "dark"
                ? "text-foreground opacity-100"
                : "hover:text-foreground hover:opacity-100"
            }`}
          >
            DARK
          </button>
        </div>

        <div className="flex-1 hidden lg:flex justify-end opacity-70 text-[10px] md:text-[11px] font-bold tracking-[0.05em] lowercase nav-item">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="hover:opacity-100 transition-opacity cursor-pointer"
          >
            {CONTACT_EMAIL}
          </a>
        </div>

        <div className="flex-1 flex justify-end nav-item">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center gap-3 text-[10px] md:text-[11px] font-bold tracking-[0.15em] uppercase group cursor-pointer"
          >
            <span>MENU</span>
            <div className="w-[18px] h-[18px] rounded-full border-[1.5px] border-foreground/40 group-hover:border-foreground transition-colors flex items-center justify-center">
              <div className="w-[3px] h-[3px] bg-foreground rounded-full animate-pulse" />
            </div>
          </button>
        </div>
      </nav>

      <FullScreenMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
    </>
  );
}
