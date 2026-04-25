"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@/lib/gsap";
import { ArrowDownRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MobileHero from "./MobileHero";
import { HERO_CONTENT } from "@/constants";
import { SoundButton } from "@/app/components/ui/Sound";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const container = useRef<HTMLDivElement>(null);
  const heroGrid = useRef<HTMLDivElement>(null);
  const scrollButton = useRef<HTMLButtonElement>(null);
  const heroImage = useRef<HTMLImageElement>(null);
  const bgText = useRef<HTMLHeadingElement>(null);

  // High-performance quickTo refs
  const xToGrid = useRef<((v: number) => void) | null>(null);
  const yToGrid = useRef<((v: number) => void) | null>(null);
  const xToBg = useRef<((v: number) => void) | null>(null);
  const yToBg = useRef<((v: number) => void) | null>(null);
  const xToImg = useRef<((v: number) => void) | null>(null);
  const yToImg = useRef<((v: number) => void) | null>(null);
  const xToBtn = useRef<((v: number) => void) | null>(null);
  const yToBtn = useRef<((v: number) => void) | null>(null);

  const { contextSafe } = useGSAP(
    () => {
      // 1. Entrance Animation
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(".hero-bg-text", 
      {
        opacity: 0,
        scale: 0.9,
      },
      {
        opacity: 0.05,
        scale: 1,
        duration: 2,
        ease: "power2.out",
      })
        .fromTo(
          ".hero-title-word",
          {
            yPercent: 100,
            opacity: 0,
          },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.1,
          },
          "-=1.5"
        )
        .fromTo(
          ".hero-image-box",
          {
            clipPath: "inset(0 100% 0 0)",
            opacity: 0,
          },
          {
            clipPath: "inset(0 0% 0 0)",
            opacity: 1,
            duration: 2,
            ease: "expo.inOut",
          },
          "-=1"
        )
        .fromTo(
          ".hero-tag",
          {
            opacity: 0,
            x: -20,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            stagger: 0.1,
          },
          "-=1"
        );

      // 2. Floating Animation for Tags
      gsap.to(".hero-tag", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2,
      });

      // 3. Initialize high-performance quickTo functions
      const xToGridLocal = gsap.quickTo(heroGrid.current, "rotateY", { duration: 1.2, ease: "power2.out" });
      const yToGridLocal = gsap.quickTo(heroGrid.current, "rotateX", { duration: 1.2, ease: "power2.out" });
      const xToBgLocal = gsap.quickTo(".hero-bg-text", "x", { duration: 1.5, ease: "power2.out" });
      const yToBgLocal = gsap.quickTo(".hero-bg-text", "y", { duration: 1.5, ease: "power2.out" });
      const xToImgLocal = gsap.quickTo(heroImage.current, "x", { duration: 1.5, ease: "power2.out" });
      const yToImgLocal = gsap.quickTo(heroImage.current, "y", { duration: 1.5, ease: "power2.out" });
      const xToBtnLocal = gsap.quickTo(scrollButton.current, "x", { duration: 0.6, ease: "power2.out" });
      const yToBtnLocal = gsap.quickTo(scrollButton.current, "y", { duration: 0.6, ease: "power2.out" });

      // Sync refs for external use if needed
      xToGrid.current = xToGridLocal;
      yToGrid.current = yToGridLocal;
      xToBg.current = xToBgLocal;
      yToBg.current = yToBgLocal;
      xToImg.current = xToImgLocal;
      yToImg.current = yToImgLocal;
      xToBtn.current = xToBtnLocal;
      yToBtn.current = yToBtnLocal;

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        
        const mapX = gsap.utils.mapRange(0, window.innerWidth, -20, 20);
        const mapY = gsap.utils.mapRange(0, window.innerHeight, -20, 20);
        
        const xPos = mapX(clientX);
        const yPos = mapY(clientY);

        xToGridLocal(xPos / 2);
        yToGridLocal(-yPos / 2);
        xToBgLocal(xPos);
        yToBgLocal(yPos);
        xToImgLocal(-xPos * 0.5);
        yToImgLocal(-yPos * 0.5);

        const btn = document.getElementById("hero-scroll-btn");
        if (btn) {
          const rect = btn.getBoundingClientRect();
          const btnX = rect.left + rect.width / 2;
          const btnY = rect.top + rect.height / 2;
          const dist = Math.hypot(clientX - btnX, clientY - btnY);

          if (dist < 150) {
            xToBtnLocal((clientX - btnX) * 0.4);
            yToBtnLocal((clientY - btnY) * 0.4);
          } else {
            xToBtnLocal(0);
            yToBtnLocal(0);
          }
        }
      };

      // 4. Scroll Parallax
      gsap.to(".hero-bg-text", {
        yPercent: 50,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(heroGrid.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      window.addEventListener("mousemove", handleMouseMove);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    },
    { scope: container }
  );

  const onImageEnter = contextSafe((e: React.MouseEvent) => {
    const img = e.currentTarget.querySelector("img");
    gsap.to(img, {
      scale: 1.1,
      duration: 1,
      ease: "power2.out",
      overwrite: "auto",
    });
  });

  const onImageLeave = contextSafe((e: React.MouseEvent) => {
    const img = e.currentTarget.querySelector("img");
    gsap.to(img, {
      scale: 1.25,
      duration: 1,
      ease: "power2.out",
      overwrite: "auto",
    });
  });

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={container}
      className="bg-background noise relative flex h-screen min-h-200 w-full items-center justify-center overflow-hidden px-6 pt-[calc(2rem+5vh)] md:px-12 lg:px-24"
    >
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center select-none">
        <h2
          ref={bgText}
          className="hero-bg-text text-stroke text-[25vw] font-black tracking-tighter whitespace-nowrap opacity-0 will-change-transform"
        >
          M UMAIR KHAN
        </h2>
      </div>

      <div
        ref={heroGrid}
        className="perspective-1000 relative z-10 hidden w-full max-w-400 grid-cols-12 items-center gap-8 will-change-transform md:grid"
      >
        <div className="col-span-3 flex flex-col gap-12">
          <div className="hero-tag flex flex-col gap-4 opacity-0 will-change-transform">
            <span className="label-accent tracking-[0.4em]">SPECIALIZATION</span>
            <p className="max-w-50 text-sm leading-relaxed font-medium">
              {HERO_CONTENT.specialization}
            </p>
          </div>

          <div className="hero-tag flex flex-col gap-4 opacity-0 will-change-transform">
            <span className="label-accent tracking-[0.4em]">LOCATION</span>
            <p className="font-arsenica text-sm font-medium italic">{HERO_CONTENT.location}</p>
          </div>
        </div>

        <div className="relative flex flex-col items-center justify-center md:col-span-6">
          <div 
            onMouseEnter={onImageEnter}
            onMouseLeave={onImageLeave}
            className="hero-image-box group relative aspect-3.5/5 w-full max-w-125 overflow-hidden shadow-2xl grayscale transition-all duration-700 hover:grayscale-0"
          >
            <Image
              ref={heroImage}
              src="/assets/images/umair.webp"
              alt="Umair"
              fill
              className="scale-125 object-cover will-change-transform"
              priority
            />
          </div>

          <div className="pointer-events-none absolute top-[65%] -left-20 z-20 mix-blend-difference">
            <div className="flex justify-start overflow-hidden">
              <h1 className="hero-title-word text-foreground text-[9vw] leading-none font-black tracking-tighter opacity-0 will-change-transform">
                {HERO_CONTENT.title.line1}
              </h1>
            </div>
          </div>
        </div>

        <div className="flex h-full flex-col justify-between py-12 md:col-span-3 md:items-end">
          <div className="mb-auto flex justify-end overflow-hidden mix-blend-difference">
            <h1 className="hero-title-word text-foreground text-[9vw] leading-none font-black tracking-tighter opacity-0 will-change-transform">
              {HERO_CONTENT.title.line2}
            </h1>
          </div>

          <div className="flex flex-col gap-12 md:items-end">
            <div className="overflow-hidden mix-blend-difference">
              <h2 className="hero-title-word font-arsenica text-foreground text-[6vw] leading-none font-medium tracking-tighter italic opacity-0 will-change-transform">
                {HERO_CONTENT.title.line3}
              </h2>
            </div>

            <SoundButton
              ref={scrollButton}
              id="hero-scroll-btn"
              className="hero-tag group flex cursor-pointer flex-col items-end gap-6 opacity-0 focus:outline-none"
              onClick={scrollToAbout}
            >
              <div className="flex items-center gap-4">
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase opacity-40 transition-opacity duration-500 group-hover:opacity-100">
                  Scroll to explore
                </span>
                <div className="border-foreground relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border transition-colors duration-500 group-hover:border-transparent">
                  <div className="bg-foreground ease-power4.out absolute inset-0 translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
                  <ArrowDownRight
                    size={18}
                    className="group-hover:text-background relative z-10 transition-all duration-500"
                  />
                </div>
              </div>
            </SoundButton>
          </div>
        </div>
      </div>

      <MobileHero />
    </section>
  );
};

export default HeroSection;
