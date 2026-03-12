"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { PROJECTS } from "@/constants";
import { useClickSound } from "@/hooks/use-click-sound";
import PageSection from "@/app/components/ui/PageSection";
import Container from "@/app/components/ui/Container";
import AnimatedProjectImage from "@/app/components/ui/AnimatedProjectImage";

interface WorkSectionProps {
  limit?: number;
}

const WorkSection = ({ limit = 4 }: WorkSectionProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const playClick = useClickSound();

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>(".project-item");

      items.forEach((item) => {
        gsap.fromTo(
          item.querySelector(".project-info"),
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );

        gsap.fromTo(
          item.querySelector(".project-image-wrapper"),
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
      });

      gsap.to(".project-image", {
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
            <Link
              href={`/work/${project.slug}`}
              key={project.id}
              onClick={() => playClick()}
              className={`project-item group flex flex-col ${index % 2 !== 0 ? "md:mt-40" : ""}`}
            >
              <div className="project-image-wrapper bg-muted relative mb-8 aspect-4/5 w-full overflow-hidden transition-shadow duration-500 group-hover:shadow-2xl">
                <AnimatedProjectImage
                  src={project.image}
                  alt={project.title}
                  videoSrc={project.video}
                />

                <div className="absolute bottom-6 left-6 z-10">
                  <span className="bg-background/80 border-foreground/5 rounded-full border px-4 py-2 text-[10px] font-bold tracking-widest uppercase opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="project-info flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <h3 className="font-arsenica hero-text text-3xl font-medium tracking-tight italic md:text-5xl">
                    {project.title}
                  </h3>
                  <span className="pt-2 text-sm font-bold opacity-40">{project.year}</span>
                </div>

                <p className="text-foreground/60 max-w-sm text-sm leading-relaxed md:text-base">
                  {project.description}
                </p>

                <div className="group/link mt-4 flex items-center gap-4 overflow-hidden">
                  <div className="bg-foreground/20 h-px w-8 transition-all duration-500 group-hover/link:w-16" />
                  <span className="cursor-pointer text-[10px] font-bold tracking-[0.2em] uppercase">
                    View Project
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-0 flex justify-center md:mt-12">
          <Link
            href="/work"
            onClick={() => playClick()}
            className="group border-foreground/30 hover:border-foreground text-foreground bg-foreground/3 relative flex items-center gap-8 overflow-hidden rounded-full border px-12 py-6 backdrop-blur-sm transition-all duration-500"
          >
            <span className="group-hover:text-background relative z-10 text-[11px] font-bold tracking-[0.3em] uppercase transition-colors duration-500">
              VIEW ALL PROJECTS
            </span>
            <div className="bg-foreground group-hover:bg-background relative z-10 h-2 w-2 rounded-full transition-transform duration-500 group-hover:scale-[3]" />

            <div className="bg-foreground ease-power4.out absolute inset-0 translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
          </Link>
        </div>
      </Container>
    </PageSection>
  );
};

export default WorkSection;
