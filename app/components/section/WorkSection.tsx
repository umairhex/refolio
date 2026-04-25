"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { PROJECTS, COMPONENT_CONFIG } from "@/constants";
import PageSection from "@/app/components/ui/PageSection";
import Container from "@/app/components/ui/Container";
import { SoundLink } from "@/app/components/ui/Sound";
import { ProjectItem } from "./WorkSection/ProjectItem";
import { animateFromViewport, animateTo, animateFromTo, toArray } from "@/lib/animations";

interface WorkSectionProps {
  limit?: number;
}

const WorkSection = ({ limit = COMPONENT_CONFIG.work.featuredProjectsLimit }: WorkSectionProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const viewAllBtn = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      const items = toArray<HTMLElement>(".project-item");

      animateFromViewport(".work-header-content", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
      });

      items.forEach((item) => {
        const info = item.querySelector(".project-info");
        const wrapper = item.querySelector(".project-image-wrapper");

        if (info) {
          animateFromViewport(info as HTMLElement, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 100%",
            },
          });
        }

        if (wrapper) {
          animateFromTo(
            wrapper as HTMLElement,
            { clipPath: "inset(100% 0 0 0)" },
            {
              clipPath: "inset(0% 0 0 0)",
              duration: 1,
              ease: "power4.out",
              scrollTrigger: {
                trigger: item,
                start: "top 100%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }
      });

      const handleMouseMove = (e: MouseEvent) => {
        if (viewAllBtn.current) {
          const rect = viewAllBtn.current.getBoundingClientRect();
          const x = e.clientX - (rect.left + rect.width / 2);
          const y = e.clientY - (rect.top + rect.height / 2);
          const distance = Math.hypot(x, y);

          if (distance < 150) {
            animateTo(viewAllBtn.current, {
              x: x * 0.3,
              y: y * 0.3,
              duration: 0.6,
              ease: "power2.out",
            });
          } else {
            animateTo(viewAllBtn.current, { x: 0, y: 0, duration: 0.6, ease: "power2.out" });
          }
        }
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    },
    { scope: containerRef },
  );

  return (
    <PageSection ref={containerRef} id="work" className="bg-background relative w-full pt-12 pb-64">
      <Container className="flex flex-col gap-16 md:gap-32">
        <div className="border-foreground/10 flex flex-col items-start gap-4 border-b pb-6 md:flex-row md:items-end md:justify-between md:gap-0 md:pb-8">
          <h2 className="work-header-content max-w-[80vw] text-4xl font-medium tracking-tighter md:text-6xl">
            SELECTED PROJECTS
          </h2>
          <span className="work-header-content pb-2 text-[10px] font-bold tracking-[0.2em] uppercase opacity-40 md:text-[11px]">
            ({limit.toString().padStart(2, "0")}) — WORK
          </span>
        </div>

        <div className="grid grid-cols-1 gap-x-20 gap-y-10 md:grid-cols-2 md:gap-y-40">
          {PROJECTS.slice(0, limit).map((project: (typeof PROJECTS)[0], index: number) => (
            <ProjectItem key={project.id} project={project} index={index} />
          ))}
        </div>

        <div className="mt-0 flex justify-center md:mt-12">
          <SoundLink
            ref={viewAllBtn}
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
