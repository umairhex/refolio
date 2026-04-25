"use client";

import { useRef } from "react";
import { SkillCategory as SkillCategoryType } from "@/types";
import { useGSAP, gsap } from "@/lib/gsap";

interface SkillCategoryProps {
  skillCategory: SkillCategoryType;
}

export const SkillCategory = ({ skillCategory }: SkillCategoryProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: containerRef });

  const onItemEnter = contextSafe((e: React.MouseEvent<HTMLLIElement>) => {
    const line = e.currentTarget.querySelector(".skill-line");
    const textNode = e.currentTarget;

    gsap.to(line, { scaleX: 2, backgroundColor: "rgba(255,255,255,1)", duration: 0.4, ease: "power2.out", overwrite: "auto" });
    gsap.to(textNode, { x: 5, autoAlpha: 1, duration: 0.4, ease: "power2.out", overwrite: "auto" });
  });

  const onItemLeave = contextSafe((e: React.MouseEvent<HTMLLIElement>) => {
    const line = e.currentTarget.querySelector(".skill-line");
    const textNode = e.currentTarget;

    gsap.to(line, { scaleX: 1, backgroundColor: "rgba(255,255,255,0.3)", duration: 0.4, ease: "power2.out", overwrite: "auto" });
    gsap.to(textNode, { x: 0, autoAlpha: 0.6, duration: 0.4, ease: "power2.out", overwrite: "auto" });
  });

  return (
    <div ref={containerRef} className="skill-category group opacity-0 will-change-transform flex flex-col gap-8">
      <span className="text-[10px] tracking-[0.4em] uppercase opacity-20">
        {skillCategory.category}
      </span>
      <ul className="flex flex-col gap-4">
        {skillCategory.items.map((skill: string) => (
          <li
            key={skill}
            onMouseEnter={onItemEnter}
            onMouseLeave={onItemLeave}
            className="flex cursor-default items-center gap-3 text-sm opacity-60 will-change-transform"
          >
            <div className="skill-line h-px w-2 origin-left bg-foreground/30" />
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};
