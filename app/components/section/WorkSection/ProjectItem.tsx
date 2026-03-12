"use client";

import { SoundLink } from "@/app/components/ui/SoundLink";
import AnimatedProjectImage from "@/app/components/ui/AnimatedProjectImage";
import { Project } from "@/types";

interface ProjectItemProps {
  project: Project;
  index: number;
}

export const ProjectItem = ({ project, index }: ProjectItemProps) => {
  return (
    <SoundLink
      href={`/work/${project.slug}`}
      key={project.id}
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
    </SoundLink>
  );
};
