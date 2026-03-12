import type React from "react";

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  year: string;
  image: string;
  video?: string;
  caseStudyImage?: string;
  description: string;
  overview?: string;
  subheading?: string;
  challenge?: string;
  solution?: string;
  stack?: string[];
  details?: { title: string; content: string }[];
  standout?: string;
  link?: string;
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
