"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Mail, Github, MousePointer2 } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useClickSound } from "@/hooks/use-click-sound";
import { useScrollVisibility } from "@/hooks/use-scroll-visibility";
import { SOCIAL_LINKS } from "@/constants";
import NavbarClock from "./NavbarClock";
import FullScreenMenu from "./FullScreenMenu";
import { gsap, useGSAP } from "@/lib/gsap";

import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

export default function Navbar() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const { isScrolled, isVisible } = useScrollVisibility();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const playClick = useClickSound();

  useGSAP(
    () => {
      const tl = gsap.timeline();

      gsap.set(navRef.current, { opacity: 0, y: -10 });
      gsap.set(".nav-item", { opacity: 0, y: -20 });

      tl.to(navRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power4.out",
      }).to(
        ".nav-item",
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
        },
        "-=0.6",
      );
    },
    { scope: navRef },
  );

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ease-in-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled && !isMenuOpen
            ? "bg-background/80 md:backdrop-blur-0 backdrop-blur-xl md:bg-transparent"
            : "from-background/40 pointer-events-none bg-linear-to-b to-transparent"
        }`}
      >
        <div className="pointer-events-none" />
        <nav
          ref={navRef}
          className={`ease-expo-out border-foreground/5 text-foreground pointer-events-auto mx-auto flex items-center justify-between overflow-hidden border px-6 py-3 transition-all duration-700 md:px-10 md:py-4 ${
            isScrolled
              ? "bg-background/80 border-foreground/10 mt-[calc(1rem+1vh)] w-[95%] rounded-full border px-8 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-2xl md:w-[92%] md:rounded-[24px] xl:w-[85%] 2xl:w-[75%]"
              : "mt-0 w-full border-transparent bg-transparent py-[clamp(1.5rem,4vh,3rem)]"
          }`}
        >
          <motion.div
            className="bg-foreground/20 absolute right-0 bottom-0 left-0 z-60 h-px"
            style={{ scaleX, transformOrigin: "0%" }}
          />

          <div className="nav-item flex flex-1 justify-start">
            <Link
              href="/"
              onClick={() => playClick()}
              className="group flex items-center gap-3 focus:outline-none"
              aria-label="Go to home"
            >
              <span
                className="font-arsenica-display nav-logo block transform-gpu cursor-pointer text-2xl font-medium md:text-4xl"
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    rotateY: 20,
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
                  letterSpacing: "-0.05em",
                  perspective: "1000px",
                  transformStyle: "preserve-3d",
                }}
              >
                Umair
              </span>
            </Link>
          </div>

          <NavbarClock isScrolled={isScrolled} />

          <div className="nav-item flex flex-1 items-center justify-end gap-4 md:gap-6">
            <div className="hidden items-center gap-6 lg:flex">
              <div className="text-foreground/40 hidden items-center gap-2 text-[10px] font-bold tracking-widest xl:flex">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => {
                        setTheme("light");
                        playClick();
                      }}
                      className={`transition-all focus:outline-none ${mounted && resolvedTheme === "light" ? "text-foreground opacity-100" : "hover:text-foreground opacity-50"}`}
                    >
                      L
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Switch to Light</TooltipContent>
                </Tooltip>
                <span>/</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => {
                        setTheme("dark");
                        playClick();
                      }}
                      className={`transition-all focus:outline-none ${mounted && resolvedTheme === "dark" ? "text-foreground opacity-100" : "hover:text-foreground opacity-50"}`}
                    >
                      D
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Switch to Dark</TooltipContent>
                </Tooltip>
              </div>

              <div className="bg-foreground/10 hidden h-4 w-px xl:block" />

              <div className="hidden items-center gap-4 xl:flex">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={SOCIAL_LINKS.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playClick()}
                      className="opacity-40 transition-opacity hover:opacity-100 focus:outline-none"
                    >
                      <Github size={15} />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>GitHub Profile</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="/contact"
                      onClick={() => playClick()}
                      className="opacity-40 transition-opacity hover:opacity-100 focus:outline-none"
                    >
                      <Mail size={15} />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>Send an Email</TooltipContent>
                </Tooltip>
              </div>

              <Link href="/contact" onClick={() => playClick()}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-foreground text-background flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-bold tracking-widest uppercase transition-shadow hover:shadow-lg"
                >
                  <span className="hidden sm:inline">Hire Me</span>
                  <MousePointer2 size={10} />
                </motion.button>
              </Link>
            </div>

            <button
              onClick={() => {
                setIsMenuOpen(true);
                playClick();
              }}
              className={`group flex transform items-center gap-3 text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-500 focus:outline-none ${isScrolled ? "scale-105" : ""}`}
            >
              <span className="hidden md:inline">Menu</span>
              <div className="border-foreground/10 group-hover:bg-foreground group-hover:text-background relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border transition-all duration-500">
                <div className="flex flex-col items-center gap-1">
                  <div className="h-px w-3 bg-current" />
                  <div className="h-px w-3 bg-current opacity-60" />
                </div>
              </div>
            </button>
          </div>
        </nav>
      </header>

      <FullScreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
