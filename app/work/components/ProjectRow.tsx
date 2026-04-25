"use client";

import React, { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { PROJECTS } from "@/constants";
import { SoundLink } from "@/app/components/ui/Sound";
import AnimatedProjectImage from "@/app/components/ui/AnimatedProjectImage";
import { gsap } from "@/lib/gsap";

interface ProjectRowProps {
  project: (typeof PROJECTS)[0];
  index: number;
}

export const ProjectRow = ({ project, index }: ProjectRowProps) => {
  const rowRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: rowRef });

  useGSAP(
    () => {
      if (!rowRef.current || !imageRef.current) return;

      // Ensure GSAP handles centering and initial state to prevent CSS transform conflicts
      gsap.set(imageRef.current, { xPercent: -50, yPercent: -50, scale: 0.5, opacity: 0 });

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

      const handleImageEnter = (e: MouseEvent) => {
        gsap.set(imageRef.current, {
          x: e.clientX,
          y: e.clientY,
        });
      };

      const element = rowRef.current;
      element.addEventListener("mousemove", moveImage);
      element.addEventListener("mouseenter", handleImageEnter);

      return () => {
        element.removeEventListener("mousemove", moveImage);
        element.removeEventListener("mouseenter", handleImageEnter);
      };
    },
    { scope: rowRef },
  );

  const onEnter = contextSafe((e: React.MouseEvent<HTMLAnchorElement>) => {
    const title = e.currentTarget.querySelector(".project-title");
    const bg = e.currentTarget.querySelector(".row-bg");

    if (title) {
      gsap.to(title, {
        x: 24,
        fontStyle: "italic",
        duration: 0.5,
        ease: "power3.out",
      });
    }
    if (bg) {
      gsap.to(bg, { opacity: 1, duration: 0.5, ease: "power2.out" });
    }
    
    gsap.to(".project-row-image", { scale: 1, opacity: 1, duration: 0.7, ease: "power4.out" });
  });

  const onLeave = contextSafe((e: React.MouseEvent<HTMLAnchorElement>) => {
    const title = e.currentTarget.querySelector(".project-title");
    const bg = e.currentTarget.querySelector(".row-bg");

    if (title) {
      gsap.to(title, {
        x: 0,
        fontStyle: "normal",
        duration: 0.5,
        ease: "power3.out",
      });
    }
    if (bg) {
      gsap.to(bg, { opacity: 0, duration: 0.5, ease: "power2.out" });
    }
    
    gsap.to(".project-row-image", { scale: 0.5, opacity: 0, duration: 0.7, ease: "power4.out" });
  });

  return (
    <SoundLink
      ref={rowRef}
      href={`/work/${project.slug}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="project-row group border-foreground/5 hover:border-foreground relative flex flex-col justify-between border-b px-4 py-12 opacity-0 transition-colors duration-500 focus:outline-none md:flex-row md:items-center"
    >
      <div className="z-10 flex items-center gap-8 md:gap-16">
        <span className="text-[10px] font-bold opacity-30 transition-opacity group-hover:opacity-100 md:text-sm">
          {project.id}
        </span>
        <h2 className="project-title ease-expo text-3xl font-medium tracking-tight uppercase will-change-transform md:text-6xl">
          {project.title}
        </h2>
      </div>

      <div className="z-10 mt-6 flex items-baseline gap-8 md:mt-0 md:gap-32">
        <span className="label-accent tracking-widest md:text-sm">{project.category}</span>
        <span className="text-[10px] font-bold opacity-40 md:text-sm">{project.year}</span>
      </div>

      <div
        ref={imageRef}
        className="project-row-image pointer-events-none fixed top-0 left-0 z-0 h-48 w-80 opacity-0 will-change-transform"
      >
        <AnimatedProjectImage
          src={project.image}
          alt={project.title}
          videoSrc={project.video}
          width={320}
          height={192}
          forcePlay={true}
          priority={index < 4}
          objectPosition="top"
        />
      </div>

      <div className="row-bg bg-foreground/2 absolute inset-0 -z-10 opacity-0 will-change-transform" />
    </SoundLink>
  );
};
