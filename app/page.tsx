"use client";

import HeroSection from "./components/section/HeroSection";
import Navbar from "./components/layout/Navbar";
import WorkSection from "./components/section/WorkSection";
import ExpertiseSection from "./components/section/ExpertiseSection";
import ExperienceSection from "./components/section/ExperienceSection";
import AboutSection from "./components/section/AboutSection";
import Footer from "./components/layout/Footer";
import { useLoading } from "@/app/context/LoadingContext";

const Page = () => {
  const { isLoaded } = useLoading();

  return (
    <main className="min-h-screen">
      {isLoaded && (
        <>
          <Navbar />
          <HeroSection />
          <WorkSection />
          <ExpertiseSection />
          <ExperienceSection />
          <AboutSection />
          <Footer />
        </>
      )}
    </main>
  );
};

export default Page;
