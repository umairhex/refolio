"use client";

import { SkillCategory as SkillCategoryType } from "@/types";

interface SkillCategoryProps {
  skillCategory: SkillCategoryType;
}

export const SkillCategory = ({ skillCategory }: SkillCategoryProps) => {
  return (
    <div className="skill-category flex flex-col gap-6">
      <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-30">
        {skillCategory.category}
      </span>
      <ul className="flex flex-col gap-3">
        {skillCategory.items.map((skill: string) => (
          <li
            key={skill}
            className="group flex cursor-default items-center gap-3 text-sm font-medium opacity-70 transition-opacity hover:opacity-100"
          >
            <div className="bg-foreground h-1 w-1 scale-0 rounded-full transition-transform group-hover:scale-100" />
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};
