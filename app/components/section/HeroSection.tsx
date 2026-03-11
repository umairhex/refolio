"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowDownRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

const HeroSection = () => {
  const container = useRef<HTMLDivElement>(null);
  const heroGrid = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      gsap.set(".hero-title-word", { yPercent: 100 });
      gsap.set(".hero-image-box", {
        clipPath: "inset(0 100% 0 0)",
        opacity: 0,
      });
      gsap.set(".hero-tag", { opacity: 0, x: -20 });
      gsap.set(".hero-bg-text", { opacity: 0, scale: 0.9 });

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

        gsap.to(heroGrid.current, {
          rotateY: xPos / 2,
          rotateX: -yPos / 2,
          duration: 1.2,
          ease: "power2.out",
        });

        gsap.to(".hero-bg-text", {
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

  return (
    <section
      ref={container}
      className="relative w-full h-screen min-h-[800px] flex items-center justify-center bg-background overflow-hidden px-6 md:px-12 lg:px-24 pt-[calc(2rem+5vh)] noise"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <h2 className="hero-bg-text text-[25vw] font-black tracking-tighter opacity-0 text-stroke whitespace-nowrap">
          UMAIR HEX
        </h2>
      </div>

      <div
        ref={heroGrid}
        className="relative z-10 w-full max-w-[1600px] grid grid-cols-1 md:grid-cols-12 gap-8 items-center perspective-1000"
      >
        <div className="md:col-span-3 flex flex-col gap-12 md:order-1 order-2">
          <div className="hero-tag flex flex-col gap-4">
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-40">
              SPECIALIZATION
            </span>
            <p className="text-sm font-medium leading-relaxed max-w-[200px]">
              Architecting digital systems with a focus on high-end motion &
              brutalist aesthetics.
            </p>
          </div>

          <div className="hero-tag flex flex-col gap-4">
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-40">
              LOCATION
            </span>
            <p
              className="text-sm font-medium italic"
              style={{ fontFamily: "'Aresenica', serif" }}
            >
              Islamabad — Pakistan
            </p>
          </div>
        </div>

        <div className="md:col-span-6 flex flex-col items-center justify-center md:order-2 order-1 relative">
          <div className="hero-image-box relative w-full aspect-4/5 md:aspect-3.5/5 max-w-[500px] overflow-hidden shadow-2xl grayscale transition-all duration-700 hover:grayscale-0">
            <Image
              src="/assets/images/umair.webp"
              alt="Umair"
              fill
              className="object-cover scale-110"
              priority
            />

            <div className="absolute bottom-6 left-6 flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-[10px] font-bold tracking-widest text-white uppercase">
                Active Now
              </span>
            </div>
          </div>

          <div className="absolute top-[60%] md:top-[65%] -left-8 md:-left-20 z-20 pointer-events-none mix-blend-difference">
            <div className="overflow-hidden">
              <h1 className="hero-title-word text-[14vw] md:text-[9vw] font-black leading-none tracking-tighter text-foreground">
                FULL
              </h1>
            </div>
          </div>
        </div>

        <div className="md:col-span-3 flex flex-col md:items-end justify-between h-full py-12 md:order-3 order-3">
          <div className="overflow-hidden mb-auto mix-blend-difference">
            <h1 className="hero-title-word text-[14vw] md:text-[9vw] font-black leading-none tracking-tighter text-right text-foreground">
              STACK
            </h1>
          </div>

          <div className="flex flex-col md:items-end gap-12">
            <div className="overflow-hidden mix-blend-difference">
              <h2
                className="hero-title-word text-[8vw] md:text-[6vw] font-medium leading-none tracking-tighter italic text-foreground"
                style={{ fontFamily: "'Aresenica', serif" }}
              >
                Engineer
              </h2>
            </div>

            <div className="hero-tag flex flex-col items-end gap-6 group cursor-pointer">
              <div className="flex items-center gap-4">
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase">
                  Scroll to explore
                </span>
                <div className="w-12 h-12 rounded-full border border-foreground flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all duration-500">
                  <ArrowDownRight
                    size={18}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-px bg-foreground/5" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-foreground/5" />
      <div className="absolute top-0 left-0 w-px h-full bg-foreground/5 ml-12 hidden md:block" />
      <div className="absolute top-0 right-0 w-px h-full bg-foreground/5 mr-12 hidden md:block" />
    </section>
  );
};

export default HeroSection;
