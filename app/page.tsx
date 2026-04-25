import HeroSection from "./components/section/HeroSection";
import Navbar from "./components/layout/Navbar";
import WorkSection from "./components/section/WorkSection";
import ExpertiseSection from "./components/section/ExpertiseSection";
import ExperienceSection from "./components/section/ExperienceSection";
import AboutSection from "./components/section/AboutSection";
import Footer from "./components/layout/Footer";
import PageContent from "./components/PageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  description:
    "I'm M Umair Khan, a full-stack engineer specialized in high-performance SaaS products, AI integration, and rapid feature delivery.",
  openGraph: {
    title: "M UMAIR KHAN — Full-Stack Engineer & AI Architect",
    description:
      "I'm M Umair Khan, a full-stack engineer specialized in high-performance SaaS products, AI integration, and rapid feature delivery.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "M UMAIR KHAN — Full-Stack Engineer & AI Architect",
    description: "Full-stack engineer specialized in high-performance SaaS products and AI integration.",
    creator: "@umairhex",
  },
};

export default function Page() {
  return (
    <main className="min-h-screen">
      <PageContent>
        <Navbar />
        <HeroSection />
        <WorkSection />
        <ExpertiseSection />
        <ExperienceSection />
        <AboutSection />
        <Footer />
      </PageContent>
    </main>
  );
}
