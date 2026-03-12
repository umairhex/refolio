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
    slug: "resat",
    title: "RESAT",
    subheading: "The professional's edge in automated recruitment.",
    category: "AI Resume & ATS Engine",
    year: "2024",
    image: "/assets/projects/resat.webp",
    video: "/assets/videos/resat.mp4",
    caseStudyImage: "/assets/projects/case-study/resat.webp",
    description:
      "An AI-powered resume platform that analyzes, rewrites, and formats resumes for maximum ATS pass-through and recruiter readability.",
    overview:
      "Resat addresses the 'hidden barrier' of recruitment—Applicant Tracking Systems (ATS). It combines structured data input, multi-model AI optimization (GPT-4, Claude, Gemini), and server-side LaTeX compilation to produce high-impact resumes that bridge the gap between automated filters and human eyes.",
    challenge:
      "Most resume builders prioritize visual aesthetics over technical parseability. Non-standard layouts and missing keywords cause ATS systems to misparse or reject qualified candidates, while traditional editors lack real-time scoring against actual job descriptions.",
    solution:
      "A dual-approach system: content quality and format quality. Resat uses a dedicated LaTeX microservice for print-perfect, parseable PDFs and a real-time Score Analyzer that evaluates resumes against job descriptions, providing actionable feedback on keyword match, impact, and completeness.",
    details: [
      {
        title: "LaTeX-Powered Résumé Engine",
        content:
          "Moves beyond HTML/Word templates by using server-side LaTeX compilation via Docker. Produces typographically clean, ATS-optimized documents from structured form data or raw text input.",
      },
      {
        title: "Real-Time ATS Score Analyzer",
        content:
          "Evaluates resumes against specific job descriptions using server-side PDF parsing. Scores metrics on parsing quality, keyword alignment, and impact, providing section-by-section improvement guidance.",
      },
      {
        title: "Multi-Model AI Content Rewriter",
        content:
          "Integrates OpenAI, Gemini, and Anthropic via a configurable strategy. Rewrites content for maximum impact, aligns technical keywords, and assists in direct LaTeX code editing and fixing.",
      },
      {
        title: "Template & Version Management",
        content:
          "Enables rapid iteration by saving multiple resume variants and custom LaTeX templates with live thumbnails. Powered by persistent LocalStorage for privacy and zero-latency access.",
      },
      {
        title: "Structured vs. Raw Text Logic",
        content:
          "Flexible input modes allowing users to either fill structured forms or paste existing content, both of which are automatically escaped and mapped to Mustache-style LaTeX templates.",
      },
      {
        title: "Recruiter-Persona Feedback",
        content:
          "AI-powered insights that simulate recruiter perspectives, identifying strengths and weaknesses in the narrative while adjusting scores based on the specific context of the target role.",
      },
    ],
    stack: [
      "Next.js 16",
      "React",
      "Tailwind CSS",
      "Radix UI",
      "CodeMirror",
      "Node.js",
      "LaTeX",
      "Docker",
      "TeXLive",
      "OpenAI",
      "Google Gemini",
      "Anthropic Claude",
      "pdf-parse",
    ],
    standout:
      "Combines real-time ATS scoring, AI-powered keyword extraction, and LaTeX-based professional PDF generation in one high-performance platform.",
    color: "#E2E2E2",
  },
  {
    id: "02",
    slug: "cognix",
    title: "COGNIX",
    subheading: "The heartbeat of your Engineering Organization.",
    category: "AI DevOps & Code Intel",
    year: "2024",
    image: "/assets/projects/cognix.webp",
    video: "/assets/videos/congix.mp4",
    caseStudyImage: "/assets/projects/case-study/cognix.webp",
    description:
      "A unified AI-powered platform integrating software quality, task management, and team collaboration into a single workspace.",
    overview:
      "Cognix eliminates tool fragmentation by unifying code analysis, security auditing, and project management. Built on a triple-LLM architecture, it turns every commit into actionable intelligence, mapping quality to ISO 25010 standards and security to global compliance frameworks.",
    challenge:
      "Modern engineering teams suffer from a 'fragmented tool tax'—using separate platforms for Jira, SonarQube, Slack, and CI/CD. This results in data silos where security findings, code quality trends, and project milestones are disconnected, creating blind spots for managers.",
    solution:
      "Cognix centralizes the entire lifecycle. It integrates directly with GitHub to provide real-time code reasoning, automated security auditing (OWASP Top 10), and built-in chat. By connecting quality metrics directly to tickets and milestones, it provides a single, cohesive source of truth for engineering health.",
    details: [
      {
        title: "AI Code Analysis & Quality Scoring",
        content:
          "Leverages Google Gemini, OpenAI, and local LLMs to provide ISO 25010 standards-based assessment. Features file-by-file review, risk classification, and asynchronous processing via BullMQ.",
      },
      {
        title: "Security Auditing & Compliance",
        content:
          "Detects vulnerabilities across the Top 10 OWASP threats and maps findings to enterprise frameworks like SOC2, ISO 27001, and HIPAA. Generates SBOMs and provides deep remediation guidance.",
      },
      {
        title: "Unified Task & Milestone Management",
        content:
          "A full-featured issue tracker that links commits directly to tickets. AI generates technical summaries of changes, while milestone roadmaps track critical-path dependencies and progress.",
      },
      {
        title: "Secure Dockerized Evaluation System",
        content:
          "A sandboxed environment for automated coding exams and evaluations. Powered by Dockerode, it supports 18+ test frameworks with edge-case detection and plagiarism checking.",
      },
      {
        title: "Context-Aware Team Collaboration",
        content:
          "Built-in chat channels that reference code fragments, tickets, and analysis results directly. Real-time presence and threading keep technical discussions tied to the work.",
      },
      {
        title: "Build Monitoring & PDF Reporting",
        content:
          "Live tracking of build status and commit validation. Generates comprehensive audit-ready reports and stakeholder summaries in PDF format.",
      },
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "shadcn/ui",
      "Framer Motion",
      "TanStack Query",
      "Socket.io",
      "MongoDB",
      "Redis",
      "BullMQ",
      "Dockerode",
      "OpenAI",
      "Google Gemini",
      "NextAuth v5",
    ],
    standout:
      "A single platform that unifies AI-powered code analysis, security auditing, project management, and team collaboration with ISO 25010 quality scoring and compliance mapping.",
    color: "#D4D4D4",
  },
  {
    id: "03",
    slug: "cortex",
    title: "CORTEX DB",
    subheading: "The developer's headless CMS for existing infrastructure.",
    category: "Headless CMS",
    year: "2024",
    image: "/assets/projects/cortex.webp",
    video: "/assets/videos/cortex.mp4",
    caseStudyImage: "/assets/projects/case-study/cortex.webp",
    description:
      "An open-source headless CMS with a 'bring your own database' architecture, enabling visual content management without data migration.",
    overview:
      "Cortex DB bridges the gap between raw data and content management. It provides a visual admin panel that layers directly over existing MongoDB, PostgreSQL, or Supabase instances, allowing developers to manage content through a modern interface while maintaining true data ownership.",
    challenge:
      "Headless CMS tools often force vendor lock-in or proprietary storage. Developers with established infrastructure find it difficult to layer a visual editor over their existing data without complex migrations or high premium costs for simple schema management.",
    solution:
      "A 'bring your own database' philosophy. Cortex provides a visual schema builder and a Content Manager with dynamic forms that proxy CRUD operations to connected databases. Database introspection allows it to automatically discover schemas, while public read-only APIs enable seamless JAMstack consumption.",
    details: [
      {
        title: "Visual Collection Types Builder",
        content:
          "Define collection and single types with a drag-and-drop field builder. Support for 12+ field types including rich text, markdown, and media, driving both the UI and database schema visually.",
      },
      {
        title: "External Database Integration",
        content:
          "Layer the CMS over MongoDB, PostgreSQL, or Supabase. Feature-rich introspection automatically discovers existing tables and infers schemas, eliminating any need for data migration.",
      },
      {
        title: "Dynamic Content Management",
        content:
          "Automatic form generation matching your schema definitions. Managed through a high-performance SPA with inline editing and TanStack Table-powered views for large content collections.",
      },
      {
        title: "Zero Vendor Lock-in Architecture",
        content:
          "Cortex maintains metadata internally while content lives in your own infrastructure. A storage adapter pattern ensures CRUD operations remain decentralized and truly yours.",
      },
      {
        title: "Media Library & Public APIs",
        content:
          "Handle file uploads with multi-provider support. Dedicated read-only public endpoints with built-in rate limiting support unauthenticated JAMstack and static-site workflows.",
      },
      {
        title: "Secure Access & Performance",
        content:
          "Cookie-based JWT authentication with silent refresh and Axios interceptors. Built on an Express API optimized for serverless environments and connection caching.",
      },
    ],
    stack: [
      "React",
      "Express / Node.js",
      "MongoDB",
      "PostgreSQL",
      "Supabase",
      "TypeScript",
      "TanStack Query",
      "Framer Motion",
      "JWT Auth",
      "dnd-kit",
      "Docker",
    ],
    standout:
      "An open-source headless CMS with a 'bring your own database' architecture, enabling introspection and management without vendor lock-in.",
    color: "#A3A3A3",
  },
  {
    id: "04",
    slug: "palet",
    title: "PALET",
    subheading: "Designed for persistence. Crafted for speed.",
    category: "Design Asset Vault",
    year: "2025",
    image: "/assets/projects/palet.webp",
    video: "/assets/videos/palet.mp4",
    caseStudyImage: "/assets/projects/case-study/palet.webp",
    description:
      "A personal design asset vault for colors and typography, centralizing fundamental design primitives into a cloud-synced workspace.",
    overview:
      "Palet is a visual primates library designed for persistence and speed. It solves the fragmentation of design assets by providing a unified vault for colors and fonts with developer-ready exports and advanced color science based on the OKLab/LCH color space.",
    challenge:
      "Designers and developers often lose time hunting for hex codes and typeface files across scattered project folders, screenshots, and bookmarks. Most tools specialize in one or the other, but none provide a unified, friction-less vault for both.",
    solution:
      "A zero-friction workspace that utilizes Supabase for persistent cloud sync and anonymous-to-authenticated data migration. It features a perceptually uniform color generator, a secure font storage system with live previews, and an accessibility suite to ensure production-ready compliance.",
    details: [
      {
        title: "OKLab Color Generation",
        content:
          "Uses scientifically accurate color generation in the OKLab/LCH space for perceptually uniform harmonies. Features rule-based generation, slot locking, and human-readable color naming.",
      },
      {
        title: "Secure Font Vault",
        content:
          "Private cloud storage for TTF, OTF, and WOFF2 files via Supabase Storage. Includes visual previews with customizable text, waterfall sizing for type evaluation, and favorite management.",
      },
      {
        title: "Developer-Ready Export",
        content:
          "Bridges design and code with instant exports for CSS Custom Properties, SCSS, Tailwind config, and Figma tokens. Eliminates manual transcription and format conversion errors.",
      },
      {
        title: "WCAG Accessibility Suite",
        content:
          "Integrated contrast checking (AA/AAA), luminance calculation, and color vision simulation filters. Ensure compliance before design decisions reach production.",
      },
      {
        title: "Zero-Friction Onboarding",
        content:
          "Enables instant usage via anonymous sign-ins. All data seamlessly migrates to permanent accounts upon registration through custom PL/pgSQL transfer functions.",
      },
      {
        title: "Cloud-Synced Persistence",
        content:
          "Built on Supabase with Row-Level Security (RLS) ensuring absolute data isolation. High-performance Vite SPA architecture optimized for rapid asset retrieval and management.",
      },
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Framer Motion",
      "TanStack Query",
      "Supabase Auth",
      "Supabase Storage",
      "PostgreSQL",
      "OKLab / LCH",
    ],
    standout:
      "A personal design asset vault combining OKLab color science, font management, and developer-ready exports with zero-friction onboarding.",
    color: "#BDBDBD",
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "Strug Inc.",
    role: "Full-Stack Engineer",
    period: "Apr 2025 — Dec 2025",
    description:
      "Engineered a high-scale Super App ecosystem. Scaled product architecture to support multiple verticals including ecommerce and real-time logistics.",
  },
  {
    company: "Independent / Freelance",
    role: "Software Architect",
    period: "Jan 2024 — Mar 2025",
    description:
      "Collaborated with global startups to build and deploy robust web/mobile MVPs, custom n8n automation pipelines, and cloud-native backends.",
  },
  {
    company: "Zarliam Startup",
    role: "Developer & SEO Expert",
    period: "Sep 2023 — Dec 2023",
    description:
      "Architected core platform modules and implemented technical SEO strategies that secured top rankings for competitive keywords, driving early organic growth.",
  },
  {
    company: "Eziline Software House",
    role: "Web Developer Intern",
    period: "Jun 2023 — Aug 2023",
    description:
      "Developed web platforms with integrated AI subsystems, focusing on optimizing user journeys and automate support workflows.",
  },
];

export const SKILLS: SkillCategory[] = [
  {
    category: "WEB & MOBILE",
    items: ["Next.js / React", "React Native", "GSAP / Figma", "TypeScript"],
  },
  {
    category: "SYSTEMS & CLOUD",
    items: ["Node.js / Python", "Nginx / GraphQL", "Docker / K8s", "AWS / Terraform"],
  },
  {
    category: "AUTOMATION & AI",
    items: ["n8n / Workflows", "AI Agents", "LangChain / LLMs", "Automation"],
  },
  {
    category: "SQA & QUALITY",
    items: ["Playwright / Cypress", "Jest / Vitest", "Load Testing", "Security Audits"],
  },
];

export const SERVICES: Service[] = [
  {
    title: "FULL-STACK ENGINEERING",
    id: "01",
    description:
      "End-to-end development of high-performance web and mobile applications with focus on motion and UX.",
  },
  {
    title: "CLOUD & AUTOMATION",
    id: "02",
    description:
      "Designing scalable architectures and automating complex workflows with n8n and custom AI agents.",
  },
  {
    title: "QUALITY ENGINEERING",
    id: "03",
    description:
      "Ensuring product stability through automated testing, security audits, and robust SQA pipelines.",
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
    href: "https://www.linkedin.com/in/umairniazi",
    handle: "@umairniazi",
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

export const CONTACT_EMAIL = "umairniazidev@gmail.com";

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
