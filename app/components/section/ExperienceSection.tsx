"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { EXPERIENCE } from "@/constants";
import { useClickSound } from "@/hooks/use-click-sound";
import PageSection from "@/app/components/ui/PageSection";
import Container from "@/app/components/ui/Container";

const ExperienceSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const playClick = useClickSound();

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
    <PageSection
      ref={containerRef}
      className="bg-foreground text-background relative w-full overflow-hidden py-32 md:py-64"
    >
      <Container>
        <div className="mb-32 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="flex flex-col gap-6">
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-40">
              RESUME — 05
            </span>
            <h2 className="font-arsenica text-4xl font-medium tracking-tighter italic md:text-8xl">
              JOURNEY
            </h2>
          </div>
          <p className="max-w-xs text-xs leading-relaxed font-medium tracking-wide opacity-50 md:text-sm">
            A record of professional milestones and core contributions within the digital landscape
            since 2019.
          </p>
        </div>

        <div className="flex flex-col">
          {EXPERIENCE.map((item, index) => (
            <div
              key={index}
              onClick={() => playClick()}
              className="experience-row group relative flex cursor-pointer flex-col py-12 md:flex-row md:items-center md:py-20"
            >
              <div className="row-line bg-background/10 absolute top-0 left-0 h-px w-full origin-left" />

              <div className="flex flex-col gap-2 md:w-1/4">
                <span className="text-[10px] font-bold tracking-[0.2em] opacity-40 md:text-xs">
                  {item.period}
                </span>
                <h3 className="font-arsenica text-xl font-bold tracking-tight transition-all group-hover:italic md:text-2xl">
                  {item.company}
                </h3>
              </div>

              <div className="mt-6 flex flex-col gap-4 md:mt-0 md:flex-1">
                <h4 className="text-2xl font-medium tracking-tighter uppercase md:text-4xl">
                  {item.role}
                </h4>
                <p className="max-w-xl text-sm leading-relaxed opacity-50 md:text-base">
                  {item.description}
                </p>
              </div>

              <div className="bg-background/0 group-hover:bg-background/2 absolute inset-0 -z-10 transition-colors duration-500" />
            </div>
          ))}
          <div className="row-line bg-background/10 h-px w-full" />
        </div>
      </Container>

      <div className="pointer-events-none absolute top-1/2 right-[-10%] -translate-y-1/2 rotate-90 opacity-[0.03] select-none">
        <span className="text-[30vw] font-bold tracking-tighter">ENGINEER</span>
      </div>
    </PageSection>
  );
};

export default ExperienceSection;
