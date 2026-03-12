"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { PROJECTS } from "@/constants";
import PageSection from "@/app/components/ui/PageSection";
import Container from "@/app/components/ui/Container";
import { SoundLink } from "@/app/components/ui/SoundLink";
import { ProjectItem } from "./WorkSection/ProjectItem";
import { animateFromViewport, animateTo, animateFromTo, toArray } from "@/lib/animations";
import { COMPONENT_CONFIG } from "@/app/constants/config";

interface WorkSectionProps {
  limit?: number;
}

const WorkSection = ({ limit = COMPONENT_CONFIG.work.featuredProjectsLimit }: WorkSectionProps) => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const items = toArray<HTMLElement>(".project-item");

      items.forEach((item) => {
        const info = item.querySelector(".project-info");
        const wrapper = item.querySelector(".project-image-wrapper");

        if (info) {
          animateFromViewport(info as HTMLElement, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          });
        }

        if (wrapper) {
          animateFromTo(
            wrapper as HTMLElement,
            { clipPath: "inset(100% 0 0 0)" },
            {
              clipPath: "inset(0% 0 0 0)",
              duration: 1.2,
              ease: "power4.inOut",
              scrollTrigger: {
                trigger: item,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }
      });

      animateTo(".project-image", {
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <PageSection ref={containerRef} id="work" className="bg-background relative w-full pt-32 pb-64">
      <Container className="flex flex-col gap-24 md:gap-40">
        <div className="border-foreground/10 flex flex-col items-start gap-4 border-b pb-6 md:flex-row md:items-end md:justify-between md:gap-0 md:pb-8">
          <h2 className="max-w-[80vw] text-4xl font-medium tracking-tighter md:text-6xl">
            SELECTED PROJECTS
          </h2>
          <span className="pb-2 text-[10px] font-bold tracking-[0.2em] uppercase opacity-40 md:text-[11px]">
            ({limit.toString().padStart(2, "0")}) — WORK
          </span>
        </div>

        <div className="grid grid-cols-1 gap-x-20 gap-y-40 md:grid-cols-2">
          {PROJECTS.slice(0, limit).map((project, index) => (
            <ProjectItem key={project.id} project={project} index={index} />
          ))}
        </div>

        <div className="mt-0 flex justify-center md:mt-12">
          <SoundLink
            href="/work"
            className="group border-foreground/30 hover:border-foreground text-foreground bg-foreground/3 relative flex items-center gap-8 overflow-hidden rounded-full border px-12 py-6 backdrop-blur-sm transition-all duration-500"
          >
            <span className="group-hover:text-background relative z-10 text-[11px] font-bold tracking-[0.3em] uppercase transition-colors duration-500">
              VIEW ALL PROJECTS
            </span>
            <div className="bg-foreground group-hover:bg-background relative z-10 h-2 w-2 rounded-full transition-transform duration-500 group-hover:scale-[3]" />

            <div className="bg-foreground ease-power4.out absolute inset-0 translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
          </SoundLink>
        </div>
      </Container>
    </PageSection>
  );
};

export default WorkSection;
