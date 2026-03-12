import { Twitter, Linkedin, Github, Instagram } from "lucide-react";
import type {
  Project,
  ExperienceItem,
  SkillCategory,
  Service,
  NavLink,
  SocialProfile,
} from "@/types";

export const PROJECTS: Project[] = [
  {
    id: "01",
    slug: "synergy-ai",
    title: "SYNERGY AI",
    category: "Full-Stack Development",
    year: "2024",
    image: "/assets/projects/resat.webp",
    video: "/assets/videos/resat.mp4",
    description: "Next-gen automation platform powered by neural networks.",
    color: "#E2E2E2",
  },
  {
    id: "02",
    slug: "velocity",
    title: "VELOCITY",
    category: "Brand Identity / UIUX",
    year: "2023",
    image: "/assets/projects/cortex.webp",
    video: "/assets/videos/cortex.mp4",
    description: "Aerodynamic digital experience for automotive giants.",
    color: "#D4D4D4",
  },
  {
    id: "03",
    slug: "neo-shelter",
    title: "NEO-SHELTER",
    category: "E-Commerce",
    year: "2024",
    image: "/assets/images/project-3.webp",
    description: "Brutalist architectural marketplace for modern nomads.",
    color: "#BDBDBD",
  },
  {
    id: "04",
    slug: "oracle",
    title: "ORACLE",
    category: "Software Engineering",
    year: "2023",
    image: "/assets/images/project-4.webp",
    description: "Decentralized data forecasting protocol for Web3.",
    color: "#A3A3A3",
  },
  {
    id: "05",
    slug: "lumina",
    title: "LUMINA",
    category: "Creative Direction",
    year: "2024",
    image: "/assets/images/project-1.webp",
    description:
      "Immersive lighting installation exploring human-machine synergy.",
    color: "#C0C0C0",
  },
  {
    id: "06",
    slug: "kinetic",
    title: "KINETIC",
    category: "Experience Design",
    year: "2023",
    image: "/assets/images/project-2.webp",
    description: "Fluid interface system for high-performance creative tools.",
    color: "#A9A9A9",
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "FASTER SOLUTIONS",
    role: "Senior Full-Stack Engineer",
    period: "2023 — Present",
    description:
      "Architecting high-performance web systems and leading digital transformation projects.",
  },
  {
    company: "NEURAL CORE",
    role: "Interaction Designer",
    period: "2022 — 2023",
    description:
      "Bridging the gap between AI complexity and intuitive user experiences.",
  },
  {
    company: "VANTAGE STUDIO",
    role: "Front-End Developer",
    period: "2021 — 2022",
    description:
      "Crafting pixel-perfect, motion-rich interfaces for high-end boutique brands.",
  },
  {
    company: "FREELANCE",
    role: "Digital Artisan",
    period: "2019 — 2021",
    description:
      "Building bespoke digital products for startups and individuals worldwide.",
  },
];

export const SKILLS: SkillCategory[] = [
  {
    category: "ENGINEERING",
    items: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
  },
  {
    category: "MOTION",
    items: ["GSAP", "Framer Motion", "Three.js", "WebGPU"],
  },
  {
    category: "DESIGN",
    items: ["Figma", "Brutalist UI", "Typography", "Motion Identity"],
  },
  {
    category: "STRATEGY",
    items: [
      "Product Architecture",
      "Design Systems",
      "Conversion Optimization",
    ],
  },
];

export const SERVICES: Service[] = [
  {
    title: "FULL-STACK DEVELOPMENT",
    id: "01",
    description:
      "Scalable, high-performance web applications built with the latest industry standards.",
  },
  {
    title: "INTERACTIVE DESIGN",
    id: "02",
    description:
      "Memorable digital experiences that combine cinematic motion with seamless utility.",
  },
  {
    title: "BRAND IDENTITY",
    id: "03",
    description:
      "Creating sharp, cohesive visual languages that resonate with a modern audience.",
  },
];

export const SOCIAL_PROFILES: SocialProfile[] = [
  {
    key: "twitter",
    href: "https://twitter.com/umairhex",
    handle: "@umairhex",
    icon: Twitter,
  },
  {
    key: "linkedin",
    href: "https://www.linkedin.com/in/umairhex",
    handle: "@umairhex",
    icon: Linkedin,
  },
  {
    key: "github",
    href: "https://github.com/umairhex",
    handle: "@umairhex",
    icon: Github,
  },
  {
    key: "instagram",
    href: "https://www.instagram.com/umairhex",
    handle: "@umairhex",
    icon: Instagram,
  },
];

export const SOCIAL_LINKS: Record<string, string> = Object.fromEntries(
  SOCIAL_PROFILES.map((p) => [p.key, p.href]),
);

export const CONTACT_EMAIL = "umairnniazidev@gmail.com";

export const NAV_LINKS: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/work" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/contact" },
];

export const FOOTER_LINKS: NavLink[] = [
  ...NAV_LINKS.slice(0, 2),
  { name: "Blogs", href: "/blogs" },
  ...NAV_LINKS.slice(2),
];
