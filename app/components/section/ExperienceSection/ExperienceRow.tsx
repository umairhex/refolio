"use client";

import { ExperienceItem } from "@/types";

interface ExperienceRowProps {
  item: ExperienceItem;
}

export const ExperienceRow = ({ item }: ExperienceRowProps) => {
  return (
    <div className="experience-row group relative flex cursor-pointer flex-col py-12 md:flex-row md:items-center md:py-20">
      <div className="row-line bg-background/10 absolute top-0 left-0 h-px w-full origin-left" />

      <div className="flex flex-col gap-2 md:w-1/4">
        <span className="text-[10px] font-bold tracking-[0.2em] opacity-40 md:text-xs">
          {item.period}
        </span>
        <h3 className="font-arsenica text-xl font-bold tracking-tight transition-all group-hover:italic md:text-2xl">
          {item.company}
        </h3>
      </div>

      <div className="mt-6 flex flex-col gap-4 md:mt-0 md:flex-1">
        <h4 className="text-2xl font-medium tracking-tighter uppercase md:text-4xl">
          {item.role}
        </h4>
        <p className="max-w-xl text-sm leading-relaxed opacity-50 md:text-base">
          {item.description}
        </p>
      </div>

      <div className="bg-background/0 group-hover:bg-background/2 absolute inset-0 -z-10 transition-colors duration-500" />
    </div>
  );
};
