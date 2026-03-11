import type React from "react";

export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  description: string;
  color: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
}

export interface NavLink {
  name: string;
  href: string;
}

export interface SocialProfile {
  key: string;

  href: string;

  handle: string;

  icon: React.ComponentType<{ size?: number }>;
}
