"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { EXPERIENCE } from "@/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const ExperienceSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLElement>(".experience-row");

      rows.forEach((row) => {
        gsap.from(row, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.from(row.querySelector(".row-line"), {
          scaleX: 0,
          duration: 1.5,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: row,
            start: "top 95%",
          },
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full py-64 px-6 md:px-12 lg:px-24 bg-foreground text-background overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-32 gap-8">
          <div className="flex flex-col gap-6">
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-40">
              RESUME — 05
            </span>
            <h2
              className="text-4xl md:text-8xl font-medium tracking-tighter italic"
              style={{ fontFamily: "'Aresenica', serif" }}
            >
              JOURNEY
            </h2>
          </div>
          <p className="max-w-xs text-xs md:text-sm opacity-50 font-medium tracking-wide leading-relaxed">
            A record of professional milestones and core contributions within
            the digital landscape over the last 5 years.
          </p>
        </div>

        <div className="flex flex-col">
          {EXPERIENCE.map((item, index) => (
            <div
              key={index}
              className="experience-row group relative flex flex-col md:flex-row md:items-center py-12 md:py-20"
            >
              <div className="row-line absolute top-0 left-0 w-full h-px bg-background/10 origin-left" />

              <div className="flex flex-col gap-2 md:w-1/4">
                <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] opacity-40">
                  {item.period}
                </span>
                <h3
                  className="text-xl md:text-2xl font-bold tracking-tight group-hover:italic transition-all"
                  style={{ fontFamily: "'Aresenica', serif" }}
                >
                  {item.company}
                </h3>
              </div>

              <div className="flex flex-col gap-4 md:flex-1 mt-6 md:mt-0">
                <h4 className="text-2xl md:text-4xl font-medium tracking-tighter uppercase">
                  {item.role}
                </h4>
                <p className="text-sm md:text-base opacity-50 max-w-xl leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/2 transition-colors duration-500 -z-10" />
            </div>
          ))}
          <div className="row-line w-full h-px bg-background/10" />
        </div>
      </div>

      <div className="absolute top-1/2 right-[-10%] -translate-y-1/2 rotate-90 select-none pointer-events-none opacity-[0.03]">
        <span className="text-[30vw] font-bold tracking-tighter">ENGINEER</span>
      </div>
    </section>
  );
};

export default ExperienceSection;
