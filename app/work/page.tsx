"use client";

import React, { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { PROJECTS } from "@/constants";
import PageSection from "../components/ui/PageSection";
import Container from "../components/ui/Container";
import { ProjectRow } from "./components/ProjectRow";
import { createTimeline, animateTo } from "@/lib/animations";

const WorkPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = createTimeline();

      animateTo(".work-header-text", { y: 100, opacity: 0 });
      animateTo(".project-row", { y: 50, opacity: 0 });

      tl.to(".work-header-text", {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.5,
      }).to(
        ".project-row",
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "power3.out",
          clearProps: "transform",
        },
        "-=0.6",
      );
    },
    { scope: containerRef },
  );

  return (
    <main ref={containerRef} className="bg-background min-h-screen">
      <Navbar />

      <PageSection className="pt-40 pb-20">
        <Container className="border-foreground/10 flex flex-col gap-6 border-b pb-20">
          <div className="overflow-hidden">
            <h1 className="font-arsenica work-header-text text-[15vw] leading-[0.8] font-medium tracking-tighter uppercase italic md:text-[8vw]">
              Selected
            </h1>
          </div>
          <div className="flex items-end justify-between overflow-hidden">
            <h1 className="work-header-text text-[15vw] leading-[0.8] font-medium tracking-tighter uppercase md:text-[8vw]">
              Archive
            </h1>
            <span className="work-header-text hidden pb-4 text-[11px] font-bold tracking-[0.3em] uppercase opacity-40 md:block">
              ({PROJECTS.length.toString().padStart(2, "0")}) — TOTAL
            </span>
          </div>
        </Container>
      </PageSection>

      <PageSection className="pb-64">
        <Container className="flex flex-col">
          {PROJECTS.map((project) => (
            <ProjectRow key={project.id} project={project} />
          ))}
        </Container>
      </PageSection>

      <Footer />
    </main>
  );
};

export default WorkPage;
