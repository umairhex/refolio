"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import PageSection from "@/app/components/ui/PageSection";
import Container from "@/app/components/ui/Container";
import type { Project } from "@/types";

export default function ProjectCaseStudyClient({
  project,
}: {
  project: Project;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      gsap.set(".case-title-word", { y: 100, opacity: 0 });
      gsap.set(".case-header-meta", { opacity: 0, y: 20 });
      gsap.set(".case-hero-image", { clipPath: "inset(100% 0 0 0)" });

      tl.to(".case-title-word", {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.05,
        ease: "power4.out",
        delay: 0.2,
      })
        .to(
          ".case-header-meta",
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.6",
        )
        .to(
          ".case-hero-image",
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.5,
            ease: "expo.inOut",
          },
          "-=1",
        );
    },
    { scope: containerRef },
  );

  return (
    <main ref={containerRef} className="min-h-screen bg-background">
      <Navbar />

      <PageSection className="pt-40 pb-20">
        <Container className="flex flex-col gap-16 border-b border-foreground/10 pb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 case-header-meta">
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">
                CLIENT
              </span>
              <span className="text-sm font-bold opacity-80 uppercase tracking-widest">
                {project.title}
              </span>
            </div>
            
            <div className="flex flex-col md:items-end gap-4">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">
                ROLE
              </span>
              <div className="flex items-center gap-6">
                <span className="text-sm font-bold opacity-80 uppercase tracking-widest">
                  {project.category}
                </span>
                <span className="text-[10px] opacity-40">—</span>
                <span className="text-sm font-bold opacity-80 uppercase tracking-widest">
                  {project.year}
                </span>
              </div>
            </div>
          </div>

          <div className="overflow-hidden">
            <h1 className="font-arsenica text-[10vw] md:text-[8vw] lg:text-[9vw] font-medium leading-[0.8] tracking-tighter uppercase italic max-w-6xl">
              {project.title.split(" ").map((word, i) => (
                <span key={i} className="inline-block overflow-hidden pb-4">
                  <span className="inline-block case-title-word pr-[2vw]">
                    {word}
                  </span>
                </span>
              ))}
            </h1>
          </div>
        </Container>
      </PageSection>

      <PageSection className="pb-32">
        <Container className="flex flex-col gap-32">
          <div className="w-full aspect-video relative case-hero-image overflow-hidden shadow-2xl bg-muted">
            <div
              className="absolute inset-0 opacity-20 z-10"
              style={{ backgroundColor: project.color }}
            />
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover scale-105"
              priority
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 max-w-[1200px] mx-auto">
            <div className="md:col-span-4 flex flex-col gap-12">
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-bold tracking-widest uppercase opacity-40">
                  OVERVIEW
                </span>
                <p className="text-base md:text-lg font-medium leading-relaxed opacity-80 max-w-sm">
                  {project.description}
                </p>
              </div>
            </div>
            <div className="md:col-span-8 flex flex-col gap-12 md:pl-16 lg:pl-32 border-l border-foreground/10">
              <h2 className="font-arsenica text-4xl md:text-5xl font-medium tracking-tighter uppercase">
                The Challenge
              </h2>
              <p className="text-lg md:text-xl leading-relaxed opacity-70 font-medium">
                Bringing brutalist architecture and cinematic motion to a modern web application requires strict attention to frame budgets and typography scale. {project.title} pushed the boundaries of what was computationally acceptable in-browser, combining multi-threaded design patterns with raw interaction hooks.
              </p>
            </div>
          </div>
        </Container>
      </PageSection>

      <Footer />
    </main>
  );
}
