"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@/lib/gsap";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import PageSection from "@/app/components/ui/PageSection";
import Container from "@/app/components/ui/Container";
import { SoundAnchor } from "@/app/components/ui/Sound";
import type { Project } from "@/types";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "@/lib/gsap";




export default function ProjectCaseStudyClient({ project }: { project: Project }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(containerRef);

      // 1. Header Elements
      gsap.fromTo(
        q(".case-title-word"),
        { y: 100, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1.2,
          stagger: 0.05,
          ease: "power4.out",
          delay: 0.2,
        },
      );

      gsap.fromTo(
        q(".case-subheading"),
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.6,
        },
      );

      gsap.fromTo(
        q(".case-header-meta"),
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.6,
        },
      );

      gsap.fromTo(
        q(".case-hero-image"),
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.5,
          ease: "expo.inOut",
          delay: 0.4,
        },
      );

      // 2. Batched Details
      ScrollTrigger.batch(q(".case-detail-block"), {
        once: true,
        onEnter: (elements) => {
          gsap.fromTo(
            elements,
            { y: 60, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 1.2,
              stagger: 0.1,
              ease: "power3.out",
              overwrite: true,
            },
          );
        },
        start: "top 85%",
      });
    },
    { scope: containerRef },
  );

  return (
    <main ref={containerRef} className="bg-background min-h-screen">
      <Navbar />

      <PageSection className="pt-40 pb-20">
        <Container className="border-foreground/10 flex flex-col gap-12 border-b pb-20">
          <div className="case-header-meta opacity-0 will-change-transform flex flex-col justify-between gap-12 md:flex-row md:items-end">
            <div className="flex flex-col gap-4">
              <span className="label-accent tracking-[0.3em]">CLIENT</span>
              <span className="text-sm font-bold tracking-widest uppercase opacity-80">
                {project.title}
              </span>
            </div>

            <div className="flex flex-col gap-4 md:items-end">
              <span className="label-accent tracking-[0.3em]">ROLE</span>
              <div className="flex items-center gap-6">
                <span className="text-sm font-bold tracking-widest uppercase opacity-80">
                  {project.category}
                </span>
                <span className="text-[10px] opacity-40">—</span>
                <span className="text-sm font-bold tracking-widest uppercase opacity-80">
                  {project.year}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="overflow-hidden">
              <h1 className="font-arsenica max-w-6xl text-[10vw] leading-[0.8] font-medium tracking-tighter uppercase italic md:text-[8vw] lg:text-[9vw]">
                {project.title.split(" ").map((word: string, i: number) => (
                  <span key={i} className="inline-block overflow-hidden pb-4">
                    <span className="case-title-word opacity-0 will-change-transform inline-block pr-[2vw]">{word}</span>
                  </span>
                ))}
              </h1>
            </div>
            {project.subheading && (
              <p className="case-subheading opacity-0 will-change-transform max-w-2xl text-2xl leading-tight font-medium tracking-tight md:text-3xl">
                {project.subheading}
              </p>
            )}
          </div>
        </Container>
      </PageSection>

      <PageSection className="pb-32">
        <Container className="flex flex-col gap-32">
          <div className="case-hero-image bg-muted relative aspect-video w-full overflow-hidden shadow-2xl">
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

          <div className="mx-auto grid max-w-300 grid-cols-1 gap-16 md:grid-cols-12 md:gap-8">
            <div className="flex flex-col gap-12 md:col-span-4">
              <div className="flex flex-col gap-4">
                <span className="label-accent tracking-widest">OVERVIEW</span>
                <p className="text-base leading-relaxed font-medium opacity-80 md:text-lg">
                  {project.overview || project.description}
                </p>
              </div>

              {project.stack && (
                <div className="flex flex-col gap-4">
                  <span className="label-accent tracking-widest">TECHNOLOGY STACK</span>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((item: string, i: number) => (
                      <span
                        key={i}
                        className="border-foreground/10 border px-2 py-1 text-[10px] font-bold tracking-wider uppercase opacity-60"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {project.link && (
                <div className="flex flex-col gap-4">
                  <span className="label-accent tracking-widest">LIVE LINK</span>
                  <SoundAnchor
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-sm font-bold tracking-widest uppercase transition-all hover:line-through"
                  >
                    Visit Project →
                  </SoundAnchor>
                </div>
              )}
            </div>

            <div className="border-foreground/10 flex flex-col gap-24 border-l md:col-span-8 md:pl-16 lg:pl-32">
              {project.standout && (
                <div className="border-foreground/20 relative flex flex-col gap-6 border-l-2 py-4 pl-8 md:pl-12">
                  <span className="label-accent tracking-[0.3em]">CORE INNOVATION</span>
                  <p className="font-arsenica max-w-2xl text-2xl leading-[1.1] font-medium tracking-tight italic opacity-90 md:text-4xl">
                    {project.standout}
                  </p>
                </div>
              )}

              {project.challenge && (
                <div className="flex flex-col gap-8">
                  <h2 className="font-arsenica text-4xl font-medium tracking-tighter uppercase md:text-5xl">
                    The Challenge
                  </h2>
                  <p className="text-lg leading-relaxed font-medium whitespace-pre-line opacity-70 md:text-xl">
                    {project.challenge}
                  </p>
                </div>
              )}

              {project.solution && (
                <div className="flex flex-col gap-8">
                  <h2 className="font-arsenica text-4xl font-medium tracking-tighter uppercase md:text-5xl">
                    The Solution
                  </h2>
                  <p className="text-lg leading-relaxed font-medium whitespace-pre-line opacity-70 md:text-xl">
                    {project.solution}
                  </p>
                </div>
              )}

              {project.details && (
                <div className="flex flex-col gap-24 pt-12">
                  {project.details.map((detail: { title: string; content: string }, i: number) => (
                    <div key={i} className="case-detail-block opacity-0 will-change-transform flex flex-col gap-6">
                      <div className="flex items-start gap-4 md:gap-8">
                        <span className="shrink-0 pt-2 font-sans text-sm font-bold tracking-widest opacity-20 md:text-base">
                          {(i + 1).toString().padStart(2, "0")}—
                        </span>
                        <div className="flex flex-col gap-6">
                          <h3 className="font-arsenica text-3xl leading-none font-medium tracking-tighter uppercase md:text-4xl">
                            {detail.title.replace(/^\d+\.\s*/, "")}
                          </h3>
                          <p className="text-lg leading-relaxed font-medium whitespace-pre-line opacity-70 md:text-xl">
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
