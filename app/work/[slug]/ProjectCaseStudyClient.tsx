"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import PageSection from "@/app/components/ui/PageSection";
import Container from "@/app/components/ui/Container";
import { useClickSound } from "@/hooks/use-click-sound";
import type { Project } from "@/types";

export default function ProjectCaseStudyClient({
  project,
}: {
  project: Project;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playClick = useClickSound();

  useGSAP(
    () => {
      const tl = gsap.timeline();

      gsap.set(".case-title-word", { y: 100, opacity: 0 });
      gsap.set(".case-subheading", { opacity: 0, y: 20 });
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
          ".case-subheading",
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .to(
          ".case-header-meta",
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .to(
          ".case-hero-image",
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.5,
            ease: "expo.inOut",
          },
          "-=1"
        );

      // Scroll reveal for details
      gsap.utils.toArray<HTMLElement>(".case-detail-block").forEach((block) => {
        gsap.from(block, {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: block,
            start: "top 85%",
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <main ref={containerRef} className="min-h-screen bg-background">
      <Navbar />

      <PageSection className="pt-40 pb-20">
        <Container className="flex flex-col gap-12 border-b border-foreground/10 pb-20">
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

          <div className="flex flex-col gap-8">
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
            {project.subheading && (
              <p className="case-subheading text-2xl md:text-3xl font-medium tracking-tight opacity-60 max-w-2xl leading-tight">
                {project.subheading}
              </p>
            )}
          </div>
        </Container>
      </PageSection>

      <PageSection className="pb-32">
        <Container className="flex flex-col gap-32">
          <div className="w-full aspect-video relative case-hero-image overflow-hidden shadow-2xl bg-muted">
            <Image
              src={project.caseStudyImage || project.image}
              alt={project.title}
              height={1080}
              width={1920}
              quality={100}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1600px"
              className="object-cover"
              priority
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 max-w-[1200px] mx-auto">
            <div className="md:col-span-4 flex flex-col gap-12">
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-bold tracking-widest uppercase opacity-40">
                  OVERVIEW
                </span>
                <p className="text-base md:text-lg font-medium leading-relaxed opacity-80">
                  {project.overview || project.description}
                </p>
              </div>

              {project.stack && (
                <div className="flex flex-col gap-4">
                  <span className="text-[10px] font-bold tracking-widest uppercase opacity-40">
                    TECHNOLOGY STACK
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((item, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-[10px] font-bold border border-foreground/10 uppercase tracking-wider opacity-60"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {project.link && (
                <div className="flex flex-col gap-4">
                  <span className="text-[10px] font-bold tracking-widest uppercase opacity-40">
                    LIVE LINK
                  </span>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playClick()}
                    className="text-sm font-bold uppercase tracking-widest hover:line-through transition-all inline-block"
                  >
                    Visit Project →
                  </a>
                </div>
              )}
            </div>

            <div className="md:col-span-8 flex flex-col gap-24 md:pl-16 lg:pl-32 border-l border-foreground/10">
              {project.standout && (
                <div className="flex flex-col gap-6 relative pl-8 md:pl-12 border-l-2 border-foreground/20 py-4">
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">
                    CORE INNOVATION
                  </span>
                  <p className="text-2xl md:text-4xl font-arsenica italic font-medium leading-[1.1] tracking-tight opacity-90 max-w-2xl">
                    {project.standout}
                  </p>
                </div>
              )}

              {project.challenge && (
                <div className="flex flex-col gap-8">
                  <h2 className="font-arsenica text-4xl md:text-5xl font-medium tracking-tighter uppercase">
                    The Challenge
                  </h2>
                  <p className="text-lg md:text-xl leading-relaxed opacity-70 font-medium whitespace-pre-line">
                    {project.challenge}
                  </p>
                </div>
              )}

              {project.solution && (
                <div className="flex flex-col gap-8">
                  <h2 className="font-arsenica text-4xl md:text-5xl font-medium tracking-tighter uppercase">
                    The Solution
                  </h2>
                  <p className="text-lg md:text-xl leading-relaxed opacity-70 font-medium whitespace-pre-line">
                    {project.solution}
                  </p>
                </div>
              )}

              {project.details && (
                <div className="flex flex-col gap-24 pt-12">
                  {project.details.map((detail, i) => (
                    <div
                      key={i}
                      className="case-detail-block flex flex-col gap-6"
                    >
                      <div className="flex items-start gap-4 md:gap-8">
                        <span className="text-sm md:text-base font-bold opacity-20 pt-2 font-sans tracking-widest shrink-0">
                          {(i + 1).toString().padStart(2, "0")}—
                        </span>
                        <div className="flex flex-col gap-6">
                          <h3 className="font-arsenica text-3xl md:text-4xl font-medium tracking-tighter uppercase leading-none">
                            {detail.title.replace(/^\d+\.\s*/, "")}
                          </h3>
                          <p className="text-lg md:text-xl leading-relaxed opacity-70 font-medium whitespace-pre-line">
                            {detail.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </PageSection>

      <Footer />
    </main>
  );
}
