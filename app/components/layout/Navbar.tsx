"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Mail, Github, MousePointer2 } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import useSound from "use-sound";

import FullScreenMenu from "./FullScreenMenu";
import { SOCIAL_LINKS } from "@/constants";
import { CLICK_SOUND } from "@/app/constants/sounds";
import { useLenis } from "lenis/react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export default function Navbar() {
  const [time, setTime] = useState("");
  const [greeting, setGreeting] = useState("");
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const lenis = useLenis();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [playClick] = useSound(CLICK_SOUND, { volume: 0.2 });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useGSAP(
    () => {
      const tl = gsap.timeline();
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

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();

      if (hours >= 5 && hours < 12) setGreeting("Good Morning");
      else if (hours >= 12 && hours < 17) setGreeting("Good Afternoon");
      else if (hours >= 17 && hours < 21) setGreeting("Good Evening");
      else setGreeting("Good Night");

      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Karachi",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

      setTime(formatter.format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollToTop = () => {
    lenis?.scrollTo(0, { lerp: 0.05 });
    playClick();
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled && !isMenuOpen
            ? "bg-background/80 md:bg-transparent backdrop-blur-xl md:backdrop-blur-0"
            : "bg-linear-to-b from-background/40 to-transparent pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-background/5 backdrop-blur-[2px] pointer-events-none" />
        <nav
          ref={navRef}
          className={`mx-auto transition-all duration-700 ease-expo-out flex items-center justify-between px-6 md:px-10 py-3 md:py-4 border border-foreground/5 text-foreground overflow-hidden pointer-events-auto ${
            isScrolled
              ? "mt-[calc(1rem+1vh)] w-[95%] md:w-[92%] xl:w-[85%] 2xl:w-[75%] bg-background/80 backdrop-blur-2xl rounded-full md:rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-foreground/10 py-3 px-8"
              : "mt-0 w-full bg-transparent border-transparent py-[clamp(1.5rem,4vh,3rem)]"
          }`}
          style={{ opacity: 0, transform: "translateY(-10px)" }}
        >
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-px bg-foreground/20 z-60"
            style={{ scaleX, transformOrigin: "0%" }}
          />

          <div className="flex-1 flex justify-start nav-item">
            <button
              onClick={handleScrollToTop}
              className="group flex items-center gap-3 focus:outline-none"
              aria-label="Scroll to top"
            >
              <span
                className="text-lg md:text-2xl font-bold italic cursor-pointer block transform-gpu nav-logo"
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
                  fontFamily: "'Aresenica', 'Didot', 'Georgia', serif",
                  letterSpacing: "-0.05em",
                  perspective: "1000px",
                  transformStyle: "preserve-3d",
                }}
              >
                Umair
              </span>
            </button>
          </div>

          <div
            className={`nav-item flex flex-col items-center justify-center transition-all duration-500 ${isScrolled ? "scale-90 opacity-40 translate-y-1 hidden xl:flex" : "flex-1 hidden lg:flex"}`}
          >
            <div className="flex items-center gap-3 text-[9px] font-bold tracking-[0.2em] uppercase">
              <span className="hidden xl:inline">{greeting}</span>
              <span className="w-1 h-1 rounded-full bg-foreground/20 hidden xl:inline" />
              <span>{time || "00:00:00 AM"}</span>
            </div>
          </div>

          <div className="flex-1 flex justify-end items-center gap-4 md:gap-6 nav-item">
            <div className="hidden lg:flex items-center gap-6">
              <div className="items-center gap-2 text-[10px] font-bold tracking-widest text-foreground/40 hidden xl:flex">
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

              <div className="h-4 w-px bg-foreground/10 hidden xl:block" />

              <div className="items-center gap-4 hidden xl:flex">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={SOCIAL_LINKS.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playClick()}
                      className="opacity-40 hover:opacity-100 transition-opacity focus:outline-none"
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
                      className="opacity-40 hover:opacity-100 transition-opacity focus:outline-none"
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
                  className="flex items-center gap-2 px-4 py-1.5 bg-foreground text-background text-[10px] font-bold tracking-widest uppercase rounded-full hover:shadow-lg transition-shadow"
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
              className={`flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] uppercase group transform transition-all duration-500 focus:outline-none ${isScrolled ? "scale-105" : ""}`}
            >
              <span className="hidden md:inline">Menu</span>
              <div className="relative w-8 h-8 rounded-full border border-foreground/10 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all duration-500 overflow-hidden">
                <div className="flex flex-col gap-1 items-center">
                  <div className="w-3 h-px bg-current" />
                  <div className="w-3 h-px bg-current opacity-60" />
                </div>
              </div>
            </button>
          </div>
        </nav>
      </header>

      <FullScreenMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
    </>
  );
}
