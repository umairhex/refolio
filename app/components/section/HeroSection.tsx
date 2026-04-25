"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@/lib/gsap";
import { ArrowDownRight } from "lucide-react";
import { useClickSound } from "@/hooks/use-click-sound";
import { animateTo, createTimeline } from "@/lib/animations";
import MobileHero from "./MobileHero";
import { HERO_CONTENT } from "@/constants";

const HeroSection = () => {
  const container = useRef<HTMLDivElement>(null);
  const heroGrid = useRef<HTMLDivElement>(null);

  const playClick = useClickSound();

  useGSAP(
    () => {
      const tl = createTimeline({ defaults: { ease: "power4.out" } });

      animateTo(".hero-title-word", { yPercent: 100 });
      animateTo(".hero-image-box", {
        clipPath: "inset(0 100% 0 0)",
        opacity: 0,
      });
      animateTo(".hero-tag", { opacity: 0, x: -20 });
      animateTo(".hero-bg-text", { opacity: 0, scale: 0.9 });

      tl.to(".hero-bg-text", {
        opacity: 0.03,
        scale: 1,
        duration: 2,
        ease: "power2.out",
      })
        .to(
          ".hero-title-word",
          {
            yPercent: 0,
            duration: 1.2,
            stagger: 0.1,
          },
          "-=1.5",
        )
        .to(
          ".hero-image-box",
          {
            clipPath: "inset(0 0% 0 0)",
            opacity: 1,
            duration: 2,
            ease: "expo.inOut",
          },
          "-=1",
        )
        .to(
          ".hero-tag",
          {
            opacity: 1,
            x: 0,
            duration: 1,
            stagger: 0.1,
          },
          "-=1",
        );

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 40;
        const yPos = (clientY / window.innerHeight - 0.5) * 40;

        animateTo(heroGrid.current, {
          rotateY: xPos / 2,
          rotateX: -yPos / 2,
          duration: 1.2,
          ease: "power2.out",
        });

        animateTo(".hero-bg-text", {
          x: xPos,
          y: yPos,
          duration: 1.5,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    },
    { scope: container },
  );

  const scrollToAbout = () => {
    playClick();
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
        <h2 className="hero-bg-text text-stroke text-[25vw] font-black tracking-tighter whitespace-nowrap opacity-0">
          M UMAIR KHAN
        </h2>
      </div>

      <div
        ref={heroGrid}
        className="perspective-1000 relative z-10 hidden w-full max-w-400 grid-cols-12 items-center gap-8 md:grid"
      >
        <div className="col-span-3 flex flex-col gap-12">
          <div className="hero-tag flex flex-col gap-4">
            <span className="label-accent tracking-[0.4em]">
              SPECIALIZATION
            </span>
            <p className="max-w-50 text-sm leading-relaxed font-medium">
              {HERO_CONTENT.specialization}
            </p>
          </div>

          <div className="hero-tag flex flex-col gap-4">
            <span className="label-accent tracking-[0.4em]">
              LOCATION
            </span>
            <p className="font-arsenica text-sm font-medium italic">{HERO_CONTENT.location}</p>
          </div>
        </div>

        <div className="relative flex flex-col items-center justify-center md:col-span-6">
          <div className="hero-image-box relative aspect-3.5/5 w-full max-w-125 overflow-hidden shadow-2xl grayscale transition-all duration-700 hover:grayscale-0">
            <Image
              src="/assets/images/umair.webp"
              alt="Umair"
              fill
              className="scale-110 object-cover"
              priority
            />

            <div className="absolute bottom-6 left-6 flex items-center gap-4">
              <div className="h-2 w-2 animate-pulse rounded-full bg-white" />
              <span className="text-[10px] font-bold tracking-widest text-white uppercase">
                Active Now
              </span>
            </div>
          </div>

          <div className="pointer-events-none absolute top-[65%] -left-20 z-20 mix-blend-difference">
            <div className="flex justify-start overflow-hidden">
              <h1 className="hero-title-word text-foreground text-[9vw] leading-none font-black tracking-tighter">
                {HERO_CONTENT.title.line1}
              </h1>
            </div>
          </div>
        </div>

        <div className="flex h-full flex-col justify-between py-12 md:col-span-3 md:items-end">
          <div className="mb-auto flex justify-end overflow-hidden mix-blend-difference">
            <h1 className="hero-title-word text-foreground text-[9vw] leading-none font-black tracking-tighter">
              {HERO_CONTENT.title.line2}
            </h1>
          </div>

          <div className="flex flex-col gap-12 md:items-end">
            <div className="overflow-hidden mix-blend-difference">
              <h2 className="hero-title-word font-arsenica text-foreground text-[6vw] leading-none font-medium tracking-tighter italic">
                {HERO_CONTENT.title.line3}
              </h2>
            </div>

            <button
              className="hero-tag group flex cursor-pointer flex-col items-end gap-6 focus:outline-none"
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
            </button>
          </div>
        </div>
      </div>

      <MobileHero />

    </section>

  );
};

export default HeroSection;
