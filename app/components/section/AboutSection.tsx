"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const AboutSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const lines = gsap.utils.toArray<HTMLElement>(".about-line");

      lines.forEach((line) => {
        gsap.fromTo(
          line,
          { y: 100, opacity: 0, rotateZ: 2 },
          {
            y: 0,
            opacity: 1,
            rotateZ: 0,
            duration: 1.5,
            ease: "power4.out",
            scrollTrigger: {
              trigger: line,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        onEnter: () =>
          gsap.to("body", {
            backgroundColor: "var(--foreground)",
            color: "var(--background)",
            duration: 1,
          }),
        onLeave: () =>
          gsap.to("body", {
            backgroundColor: "var(--background)",
            color: "var(--foreground)",
            duration: 1,
          }),
        onEnterBack: () =>
          gsap.to("body", {
            backgroundColor: "var(--foreground)",
            color: "var(--background)",
            duration: 1,
          }),
        onLeaveBack: () =>
          gsap.to("body", {
            backgroundColor: "var(--background)",
            color: "var(--foreground)",
            duration: 1,
          }),
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full py-64 px-6 md:px-12 lg:px-24 flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="max-w-[1200px] w-full">
        <div className="flex flex-col gap-12" ref={textRef}>
          <div className="overflow-hidden">
            <h2
              className="about-line text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[0.9] italic"
              style={{ fontFamily: "'Aresenica', serif" }}
            >
              CRAFTING DIGITAL
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="about-line text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[0.9]">
              EXPERIENCES WITH
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2
              className="about-line text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[0.9] italic"
              style={{ fontFamily: "'Aresenica', serif" }}
            >
              PRECISION & ARTISTRY
            </h2>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-20">
            <div className="flex flex-col gap-8">
              <p className="text-xl md:text-2xl leading-relaxed font-light opacity-80">
                I am a multi-disciplinary engineer based in Pakistan,
                specialized in bridging the gap between design and technology.
              </p>
              <div className="w-20 h-px bg-foreground/30" />
            </div>

            <div className="flex flex-col gap-12 text-sm md:text-base opacity-60 leading-relaxed font-medium tracking-wide prose prose-invert">
              <p>
                My approach is rooted in brutalist minimalism and cinematic
                motion. I believe that every interaction should feel deliberate,
                every pixel should serve a purpose, and every animation should
                tell a story.
              </p>
              <p>
                Armed with the latest in modern web technologies, I build
                scalable, high-performance applications that don&apos;t just
                work—they wow.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 select-none pointer-events-none opacity-[0.02] whitespace-nowrap">
        <span className="text-[40vw] font-bold tracking-tighter">CREATIVE</span>
      </div>
    </section>
  );
};

export default AboutSection;
