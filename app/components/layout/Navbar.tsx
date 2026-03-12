"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useGSAP } from "@/lib/gsap";
import { useNavbarVisibility } from "@/hooks/use-navbar-visibility";
import { createTimeline, animateTo } from "@/lib/animations";

import NavbarClock from "./NavbarClock";
import FullScreenMenu from "./FullScreenMenu";
import { NavbarLogo } from "./Navbar/NavbarLogo";
import { NavbarThemeSwitch } from "./Navbar/NavbarThemeSwitch";
import { NavbarSocials } from "./Navbar/NavbarSocials";
import { NavbarMenuButton } from "./Navbar/NavbarMenuButton";
import { HireMeButton } from "./Navbar/HireMeButton";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const { isScrolled, isVisible } = useNavbarVisibility();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useGSAP(
    () => {
      const tl = createTimeline();

      animateTo(navRef.current, { opacity: 0, y: -10 });
      animateTo(".nav-item", { opacity: 0, y: -20 });

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

          <NavbarLogo />

          <NavbarClock isScrolled={isScrolled} />

          <div className="nav-item flex flex-1 items-center justify-end gap-4 md:gap-6">
            <div className="hidden items-center gap-6 lg:flex">
              <NavbarThemeSwitch />

              <div className="bg-foreground/10 hidden h-4 w-px xl:block" />

              <NavbarSocials />

              <HireMeButton />
            </div>

            <NavbarMenuButton onClick={() => setIsMenuOpen(true)} isScrolled={isScrolled} />
          </div>
        </nav>
      </header>

      <FullScreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
