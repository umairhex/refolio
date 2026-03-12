"use client";

import React, { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { PROJECTS } from "@/constants";
import { SoundLink } from "@/app/components/ui/SoundLink";
import AnimatedProjectImage from "@/app/components/ui/AnimatedProjectImage";
import { gsap } from "@/lib/gsap";

interface ProjectRowProps {
  project: (typeof PROJECTS)[0];
}

export const ProjectRow = ({ project }: ProjectRowProps) => {
  const rowRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!rowRef.current || !imageRef.current) return;

      const xTo = gsap.quickTo(imageRef.current, "x", {
        duration: 0.4,
        ease: "power3",
      });
      const yTo = gsap.quickTo(imageRef.current, "y", {
        duration: 0.4,
        ease: "power3",
      });

      const moveImage = (e: MouseEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };

      const handleMouseEnter = (e: MouseEvent) => {
        gsap.set(imageRef.current, {
          x: e.clientX,
          y: e.clientY,
        });
      };

      const element = rowRef.current;
      element.addEventListener("mousemove", moveImage);
      element.addEventListener("mouseenter", handleMouseEnter);

      return () => {
        element.removeEventListener("mousemove", moveImage);
        element.removeEventListener("mouseenter", handleMouseEnter);
      };
    },
    { scope: rowRef }
  );

  return (
    <SoundLink
      ref={rowRef}
      href={`/work/${project.slug}`}
      className="project-row group border-foreground/5 hover:border-foreground relative flex flex-col justify-between border-b px-4 py-12 transition-colors duration-500 md:flex-row md:items-center focus:outline-none"
    >
      <div className="z-10 flex items-center gap-8 md:gap-16">
        <span className="text-[10px] font-bold opacity-30 transition-opacity group-hover:opacity-100 md:text-sm">
          {project.id}
        </span>
        <h2
          className="ease-expo text-3xl font-medium tracking-tight uppercase transition-all duration-700 group-hover:translate-x-6 group-hover:tracking-widest group-hover:italic md:text-6xl"
        >
          {project.title}
        </h2>
      </div>

      <div className="z-10 mt-6 flex items-baseline gap-8 md:mt-0 md:gap-32">
        <span className="label-accent tracking-widest md:text-sm">
          {project.category}
        </span>
        <span className="text-[10px] font-bold opacity-40 md:text-sm">{project.year}</span>
      </div>

      <div
        ref={imageRef}
        className="ease-power4.out pointer-events-none fixed top-0 left-0 z-0 h-48 w-80 -translate-x-1/2 -translate-y-1/2 scale-50 opacity-0 transition-opacity duration-700 group-hover:scale-100 group-hover:opacity-100"
      >
        <AnimatedProjectImage
          src={project.image}
          alt={project.title}
          videoSrc={project.video}
          width={320}
          height={192}
          forcePlay={true}
          objectPosition="top"
        />
      </div>

      <div className="bg-foreground/0 group-hover:bg-foreground/2 absolute inset-0 -z-10 transition-colors duration-500" />
    </SoundLink>
  );
};
