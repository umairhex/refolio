"use client";

import { useRef } from "react";
import { useGSAP, gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EXPERIENCE } from "@/constants";
import PageSection from "@/app/components/ui/PageSection";
import Container from "@/app/components/ui/Container";
import { ExperienceRow } from "./ExperienceSection/ExperienceRow";




const ExperienceSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(containerRef);

      // 1. Heading reveal (Pure Fade)
      gsap.to(q(".experience-title"), {
        autoAlpha: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: q(".experience-title"),
          start: "top 90%",
        },
      });

      // 2. Batched Rows Entrance (Smooth Fade)
      ScrollTrigger.batch(q(".experience-row"), {
        once: true,
        onEnter: (elements) => {
          gsap.to(elements, {
            autoAlpha: 1,
            stagger: 0.15,
            duration: 1.5,
            ease: "power2.out",
            overwrite: true,
          });
        },
        start: "top 85%",
      });

      // 3. Animate all separator lines natively
      const lines = gsap.utils.toArray<HTMLElement>(q(".row-line"));
      
      // Ensure they start at 0 width natively
      gsap.set(lines, { scaleX: 0 });

      lines.forEach((line) => {
        gsap.to(line, {
          scaleX: 1,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: line,
            start: "top 95%",
          },
        });
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
            <h2 className="experience-title opacity-0 font-arsenica text-4xl font-medium tracking-tighter italic md:text-8xl will-change-transform">
              JOURNEY
            </h2>
          </div>
          <p className="max-w-xs text-xs leading-relaxed font-medium tracking-wide opacity-50 md:text-sm">
            A record of professional milestones and core contributions within the digital landscape
            since 2019.
          </p>
        </div>

        <div className="experience-list flex flex-col">
          {EXPERIENCE.map((item, index) => (
            <ExperienceRow key={index} item={item} />
          ))}
          <div className="row-line bg-background/10 h-px w-full origin-left" />
        </div>
      </Container>

      <div className="pointer-events-none absolute top-1/2 right-[-10%] -translate-y-1/2 rotate-90 opacity-[0.03] select-none">
        <span className="text-[30vw] font-bold tracking-tighter">ENGINEER</span>
      </div>
    </PageSection>
  );
};

export default ExperienceSection;
