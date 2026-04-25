"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useGSAP } from "@/lib/gsap";
import { useNavbarVisibility } from "@/hooks/use-navbar-visibility";
import { createTimeline, animateTo } from "@/lib/animations";

import NavbarClock from "./NavbarClock";
import FullScreenMenu from "./FullScreenMenu";
import { NavbarLogo } from "./Navbar/NavbarLogo";
import { ThemeTogglerButton } from "@/components/animate-ui/components/buttons/theme-toggler";
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
      <motion.header
        initial={false}
        animate={{
          y: isVisible ? 0 : -100,
          transition: { type: "spring", stiffness: 300, damping: 30 },
        }}
        className="fixed top-0 left-0 z-50 w-full"
      >
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isScrolled && !isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="bg-background/60 absolute inset-0 backdrop-blur-xl" />
          <div className="bg-foreground/5 absolute right-0 bottom-0 left-0 h-px" />
        </div>

        <motion.div
          className="bg-primary absolute top-0 right-0 left-0 z-60 h-[2px] origin-left"
          style={{ scaleX }}
        />

        <motion.nav
          ref={navRef}
          layout
          animate={{
            width: isScrolled ? "94%" : "100%",
            y: isScrolled ? 12 : 0,
            paddingLeft: isScrolled ? "2.5rem" : "2.5rem",
            paddingRight: isScrolled ? "2.5rem" : "2.5rem",
          }}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
          className={`ease-expo-out relative mx-auto flex items-center justify-between transition-all duration-700 ${
            isScrolled
              ? "bg-background/40 border-foreground/10 h-16 rounded-full border shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-2xl"
              : "h-20"
          }`}
        >
          <NavbarLogo />

          <NavbarClock isScrolled={isScrolled} />

          <div className="nav-item flex flex-1 items-center justify-end gap-3 md:gap-4 lg:gap-6">
            <div className="hidden items-center gap-4 lg:flex xl:gap-6">
              <ThemeTogglerButton
                variant="ghost"
                size="xs"
                className="h-10 w-10 rounded-full"
                modes={["light", "dark"]}
              />

              <div className="bg-foreground/10 hidden h-4 w-px xl:block" />

              <NavbarSocials />

              <HireMeButton />
            </div>

            <NavbarMenuButton
              onClick={() => setIsMenuOpen(true)}
              isScrolled={isScrolled}
              aria-expanded={isMenuOpen}
            />
          </div>
        </motion.nav>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen ? (
          <FullScreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        ) : null}
      </AnimatePresence>
    </>
  );
}
