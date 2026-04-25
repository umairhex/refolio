"use client";

import { useRef } from "react";
import { ExperienceItem } from "@/types";
import { useGSAP, gsap } from "@/lib/gsap";

interface ExperienceRowProps {
  item: ExperienceItem;
}

export const ExperienceRow = ({ item }: ExperienceRowProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: containerRef });

  const onEnter = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
    const flipContainer = e.currentTarget.querySelector(".company-flip");
    const desc = e.currentTarget.querySelector(".row-desc");
    const bg = e.currentTarget.querySelector(".row-bg");
    const content = e.currentTarget.querySelector(".row-content");

    gsap.to(content, {
      x: 16,
      duration: 0.5,
      ease: "power3.out",
    });
    gsap.to(flipContainer, { yPercent: -50, duration: 0.5, ease: "expo.out" });
    gsap.to(desc, { opacity: 0.8, duration: 0.5, ease: "power2.out" });
    gsap.to(bg, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    });
  });

  const onLeave = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
    const flipContainer = e.currentTarget.querySelector(".company-flip");
    const desc = e.currentTarget.querySelector(".row-desc");
    const bg = e.currentTarget.querySelector(".row-bg");
    const content = e.currentTarget.querySelector(".row-content");

    gsap.to(content, {
      x: 0,
      duration: 0.5,
      ease: "power3.out",
    });
    gsap.to(flipContainer, { yPercent: 0, duration: 0.5, ease: "expo.out" });
    gsap.to(desc, { opacity: 0.5, duration: 0.5, ease: "power2.out" });
    gsap.to(bg, { opacity: 0, duration: 0.5, ease: "power2.out" });
  });

  return (
    <div
      ref={containerRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="experience-row relative flex cursor-pointer flex-col py-12 opacity-0 will-change-transform md:flex-row md:items-center md:py-20"
    >
      <div className="row-line bg-background/10 absolute top-0 left-0 h-px w-full origin-left will-change-transform" />

      <div className="row-content flex w-full flex-col will-change-transform md:flex-row md:items-center">
        <div className="flex flex-col gap-2 md:w-1/4">
          <span className="text-[10px] font-bold tracking-[0.2em] opacity-40 md:text-xs">
            {item.period}
          </span>
          <div className="relative h-7 overflow-hidden md:h-9">
            <div className="company-flip flex flex-col will-change-transform">
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
          <h4 className="text-2xl font-medium tracking-tighter uppercase md:text-4xl">
            {item.role}
          </h4>
          <p className="row-desc max-w-xl text-sm leading-relaxed opacity-50 md:text-base">
            {item.description}
          </p>
        </div>
      </div>

      <div className="row-bg bg-background/5 absolute inset-0 -z-10 opacity-0 will-change-transform" />
    </div>
  );
};
