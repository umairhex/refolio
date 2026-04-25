"use client";

import Image from "next/image";
import { SoundLink } from "@/app/components/ui/Sound";
import { Project } from "@/types";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useRef } from "react";

interface ProjectItemProps {
  project: Project;
  index: number;
}

export const ProjectItem = ({ project, index }: ProjectItemProps) => {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const { contextSafe } = useGSAP({ scope: containerRef });

  const onEnter = contextSafe((e: React.MouseEvent<HTMLAnchorElement>) => {
    const wrapper = e.currentTarget.querySelector(".project-image-wrapper");
    const underline = e.currentTarget.querySelector(".project-underline");
    const linkLine = e.currentTarget.querySelector(".project-link-line");

    gsap.to(wrapper, {
      y: -10,
      boxShadow: "0 30px 60px -15px rgba(0,0,0,0.4)",
      duration: 0.6,
      ease: "power2.out",
    });

    gsap.to(underline, {
      width: "100%",
      duration: 0.6,
      ease: "expo.out",
    });

    gsap.to(linkLine, {
      width: 80,
      duration: 0.6,
      ease: "expo.out",
    });
  });

  const onLeave = contextSafe((e: React.MouseEvent<HTMLAnchorElement>) => {
    const wrapper = e.currentTarget.querySelector(".project-image-wrapper");
    const underline = e.currentTarget.querySelector(".project-underline");
    const linkLine = e.currentTarget.querySelector(".project-link-line");

    gsap.to(wrapper, {
      y: 0,
      boxShadow: "0 0 0 1px rgba(255,255,255,0.05)",
      duration: 0.6,
      ease: "power2.out",
    });

    gsap.to(underline, {
      width: 0,
      duration: 0.6,
      ease: "expo.out",
    });

    gsap.to(linkLine, {
      width: 40,
      duration: 0.6,
      ease: "expo.out",
    });
  });

  return (
    <SoundLink
      ref={containerRef}
      href={`/work/${project.slug}`}
      key={project.id}
      aria-label={`View project: ${project.title}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`project-item group flex flex-col active:scale-[0.98] will-change-transform ${
        index % 2 !== 0 ? "md:mt-24" : ""
      }`}
    >
      <div className="project-image-wrapper bg-muted relative mb-10 aspect-4/5 w-full overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.05)] will-change-transform">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority={index < 2}
        />

        <div className="absolute top-8 right-8 z-10">
          <span className="text-[10px] font-bold tracking-[0.4em] opacity-20 transition-opacity duration-500 group-hover:opacity-100">
            {(index + 1).toString().padStart(2, "0")}
          </span>
        </div>

        <div className="absolute bottom-8 left-8 z-10">
          <span className="border-foreground/10 bg-background/60 text-foreground group-hover:border-foreground/40 group-hover:bg-background/90 rounded-full border px-5 py-2.5 text-[9px] font-black tracking-[0.2em] uppercase backdrop-blur-2xl transition-all duration-500">
            {project.category}
          </span>
        </div>
      </div>

      <div className="project-info flex flex-col gap-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2">
            <h3 className="font-arsenica text-foreground relative text-3xl font-medium tracking-tight italic transition-colors duration-500 md:text-5xl">
              {project.title}
              <span className="project-underline bg-foreground absolute -bottom-1 left-0 h-px w-0" />
            </h3>
          </div>
          <div className="flex flex-col items-end gap-1 pt-3">
            <span className="text-[10px] font-black tracking-[0.4em] tabular-nums opacity-20 transition-opacity duration-500 group-hover:opacity-100">
              {project.year}
            </span>
            <div className="bg-foreground h-1 w-1 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-40" />
          </div>
        </div>

        <p className="text-foreground/50 group-hover:text-foreground/90 max-w-sm text-sm leading-[1.8] tracking-wide transition-all duration-500 md:text-base">
          {project.description}
        </p>

        <div className="group/link mt-2 flex items-center gap-5 overflow-hidden">
          <div className="project-link-line bg-foreground/20 group-hover:bg-foreground h-px w-10 transition-colors duration-500" />
          <span className="text-foreground/40 group-hover:text-foreground text-[10px] font-black tracking-[0.3em] uppercase transition-all duration-500 group-hover:tracking-[0.4em]">
            View Project
          </span>
        </div>
      </div>
    </SoundLink>
  );
};
