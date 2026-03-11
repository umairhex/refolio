"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { PROJECTS } from "@/constants";
import { useClickSound } from "@/hooks/use-click-sound";
import PageSection from "@/app/components/ui/PageSection";
import Container from "@/app/components/ui/Container";

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
        y: -100,
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
    <PageSection
      ref={containerRef}
      id="work"
      className="relative w-full bg-background pt-32 pb-64"
    >
      <Container className="flex flex-col gap-24 md:gap-40">
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-end border-b border-foreground/10 pb-6 md:pb-8 gap-4 md:gap-0">
          <h2 className="text-4xl md:text-6xl font-medium tracking-tighter max-w-[80vw]">
            SELECTED PROJECTS
          </h2>
          <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] opacity-40 uppercase pb-2">
            (04) — WORK
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-40">
          {PROJECTS.slice(0, limit).map((project, index) => (
            <Link
              href={`/work/${project.slug}`}
              key={project.id}
              className={`project-item group flex flex-col ${
                index % 2 !== 0 ? "md:mt-40" : ""
              }`}
            >
              <div className="project-image-wrapper relative w-full aspect-4/5 overflow-hidden bg-muted mb-8 group-hover:shadow-2xl transition-shadow duration-500">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="project-image object-cover scale-110"
                />

                <div className="absolute top-6 left-6 z-10">
                  <span className="px-4 py-2 bg-background/80 backdrop-blur-md rounded-full text-[10px] font-bold tracking-widest uppercase border border-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="project-info flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-arsenica text-3xl md:text-5xl font-medium tracking-tight hero-text italic">
                    {project.title}
                  </h3>
                  <span className="text-sm font-bold opacity-40 pt-2">
                    {project.year}
                  </span>
                </div>

                <p className="text-foreground/60 max-w-sm leading-relaxed text-sm md:text-base">
                  {project.description}
                </p>

                <div className="flex items-center gap-4 mt-4 overflow-hidden group/link">
                  <div className="w-8 h-px bg-foreground/20 group-hover/link:w-16 transition-all duration-500" />
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase cursor-pointer">
                    View Project
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-0 md:mt-12">
          <Link
            href="/work"
            onClick={() => playClick()}
            className="group relative flex items-center gap-8 px-12 py-6 rounded-full border border-foreground/30 hover:border-foreground text-foreground bg-foreground/3 backdrop-blur-sm transition-all duration-500 overflow-hidden"
          >
            <span className="relative z-10 text-[11px] font-bold tracking-[0.3em] uppercase group-hover:text-background transition-colors duration-500">
              VIEW ALL PROJECTS
            </span>
            <div className="relative z-10 w-2 h-2 rounded-full bg-foreground group-hover:scale-[3] transition-transform duration-500 group-hover:bg-background" />

            <div className="absolute inset-0 bg-foreground translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-power4.out" />
          </Link>
        </div>
      </Container>
    </PageSection>
  );
};

export default WorkSection;
