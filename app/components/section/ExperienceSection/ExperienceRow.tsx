"use client";

import { ExperienceItem } from "@/types";

interface ExperienceRowProps {
  item: ExperienceItem;
}

export const ExperienceRow = ({ item }: ExperienceRowProps) => {
  return (
    <div className="experience-row group relative flex cursor-pointer flex-col py-12 transition-all duration-500 hover:px-4 md:flex-row md:items-center md:py-20">
      <div className="row-line bg-background/10 absolute top-0 left-0 h-px w-full origin-left" />

      <div className="flex flex-col gap-2 md:w-1/4">
        <span className="text-[10px] font-bold tracking-[0.2em] opacity-40 md:text-xs">
          {item.period}
        </span>
        <div className="relative h-7 overflow-hidden md:h-9">
          <div className="flex flex-col transition-transform duration-500 ease-out will-change-transform group-hover:-translate-y-1/2">
            <h3 className="font-arsenica flex h-7 items-center text-xl leading-none font-bold tracking-tight whitespace-nowrap md:h-9 md:text-2xl">
              {item.company}
            </h3>
            <h3
              aria-hidden="true"
              className="font-arsenica flex h-7 items-center text-xl leading-none font-bold tracking-tight whitespace-nowrap italic md:h-9 md:text-2xl"
            >
              {item.company}
            </h3>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 md:mt-0 md:flex-1">
        <h4 className="text-2xl font-medium tracking-tighter uppercase md:text-4xl">{item.role}</h4>
        <p className="max-w-xl text-sm leading-relaxed opacity-50 transition-opacity duration-500 group-hover:opacity-80 md:text-base">
          {item.description}
        </p>
      </div>

      <div className="bg-background/0 group-hover:bg-background/3 absolute inset-0 -z-10 rounded-xl transition-all duration-500" />
    </div>
  );
};
