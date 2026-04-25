"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { useNavbarVisibility } from "@/hooks/use-navbar-visibility";
import { gsap } from "@/lib/gsap";

import NavbarClock from "./NavbarClock";
import dynamic from "next/dynamic";
const FullScreenMenu = dynamic(() => import("./FullScreenMenu"), { ssr: false });
import { NavbarLogo } from "./Navbar/NavbarLogo";
import { ThemeTogglerButton } from "@/components/animate-ui/components/buttons/theme-toggler";
import { NavbarSocials } from "./Navbar/NavbarSocials";
import { NavbarMenuButton } from "./Navbar/NavbarMenuButton";
import { HireMeButton } from "./Navbar/HireMeButton";
import { SoundToggle } from "./Navbar/SoundToggle";
import { AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const { isScrolled, isVisible } = useNavbarVisibility();

  // 1. Entrance Animation
  useGSAP(
    () => {
      const q = gsap.utils.selector(navRef);
      const tl = gsap.timeline();

      gsap.set(navRef.current, { autoAlpha: 0, y: -10 });
      gsap.set(q(".nav-item"), { autoAlpha: 0, y: -20 });

      tl.to(navRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 1.2,
        ease: "power4.out",
      }).to(
        q(".nav-item"),
        {
          autoAlpha: 1,
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

  // 2. Visibility Animation (Show/Hide on Scroll)
  useGSAP(() => {
    gsap.to(headerRef.current, {
      y: isVisible ? 0 : -100,
      duration: 0.6,
      ease: "expo.out",
      overwrite: "auto",
    });
  }, [isVisible]);

  // 3. Scrolled State Animation (Floating Nav)
  useGSAP(() => {
    if (!navRef.current) return;

    gsap.to(navRef.current, {
      width: isScrolled ? "94%" : "100%",
      y: isScrolled ? 12 : 0,
      height: isScrolled ? 64 : 80, // h-16 vs h-20
      duration: 0.8,
      ease: "expo.out",
      overwrite: "auto",
    });
  }, [isScrolled]);

  // 4. Scroll Progress Animation
  useGSAP(() => {
    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });
  }, []);

  return (
    <>
      <header ref={headerRef} className="fixed top-0 left-0 z-50 w-full will-change-transform">
        {/* Background Layer */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isScrolled && !isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="bg-background/60 absolute inset-0 backdrop-blur-xl" />
          <div className="bg-foreground/5 absolute right-0 bottom-0 left-0 h-px" />
        </div>

        {/* Scroll Progress Bar */}
        <div
          ref={progressRef}
          className="bg-primary absolute top-0 right-0 left-0 z-60 h-[2px] origin-left scale-x-0 will-change-transform"
        />

        <nav
          ref={navRef}
          className={`relative mx-auto flex items-center justify-between px-10 transition-all duration-700 will-change-[width,transform] ${
            isScrolled
              ? "bg-background/40 border-foreground/10 rounded-full border shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-2xl"
              : ""
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

              <SoundToggle />

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
        </nav>
      </header>

      <AnimatePresence>
        {isMenuOpen ? (
          <FullScreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        ) : null}
      </AnimatePresence>
    </>
  );
}
