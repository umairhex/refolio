"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { EXPERIENCE } from "@/constants";
import PageSection from "@/app/components/ui/PageSection";
import Container from "@/app/components/ui/Container";
import { ExperienceRow } from "./ExperienceSection/ExperienceRow";
import { animateFromViewport, animateFrom, toArray } from "@/lib/animations";

const ExperienceSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const rows = toArray<HTMLElement>(".experience-row");

      rows.forEach((row) => {
        animateFromViewport(row, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });

        const line = row.querySelector(".row-line");
        if (line) {
          animateFrom(line as HTMLElement, {
            scaleX: 0,
            duration: 1.5,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: row,
              start: "top 95%",
            },
          });
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <PageSection
      ref={containerRef}
      className="bg-foreground text-background relative w-full overflow-hidden py-32 md:py-64"
    >
      <Container>
        <div className="mb-32 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="flex flex-col gap-6">
            <span className="label-accent tracking-[0.4em]">
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
            <ExperienceRow key={index} item={item} />
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
