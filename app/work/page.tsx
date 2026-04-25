import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { PROJECTS } from "@/constants";
import PageSection from "../components/ui/PageSection";
import Container from "../components/ui/Container";
import { ProjectRow } from "./components/ProjectRow";
import WorkPageAnimated from "./WorkPageAnimated";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects and case studies showcasing full-stack engineering and design.",
};

export default function WorkPage() {
  return (
    <WorkPageAnimated>
      <main className="bg-background min-h-screen">
        <Navbar />

        <PageSection className="pt-40 pb-20">
          <Container className="border-foreground/10 flex flex-col gap-6 border-b pb-20">
            <div className="overflow-hidden">
              <h1 className="font-arsenica work-header-text opacity-0 will-change-transform text-[15vw] leading-[0.8] font-medium tracking-tighter uppercase italic md:text-[8vw]">
                Selected
              </h1>
            </div>
            <div className="flex items-end justify-between overflow-hidden">
              <h1 className="work-header-text opacity-0 will-change-transform text-[15vw] leading-[0.8] font-medium tracking-tighter uppercase md:text-[8vw]">
                Archive
              </h1>
              <span className="work-header-text opacity-0 will-change-transform hidden pb-4 text-[11px] font-bold tracking-[0.3em] uppercase md:block">
                ({PROJECTS.length.toString().padStart(2, "0")}) — TOTAL
              </span>
            </div>
          </Container>
        </PageSection>

        <PageSection className="pb-64">
          <Container className="flex flex-col">
            {PROJECTS.map((project, index) => (
              <ProjectRow key={project.id} project={project} index={index} />
            ))}
          </Container>
        </PageSection>

        <Footer />
      </main>
    </WorkPageAnimated>
  );
}
