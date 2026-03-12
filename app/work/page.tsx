"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { PROJECTS } from "@/constants";
import PageSection from "../components/ui/PageSection";
import Container from "../components/ui/Container";
import AnimatedProjectImage from "@/app/components/ui/AnimatedProjectImage";
import { useClickSound } from "@/hooks/use-click-sound";

const ProjectRow = ({ project }: { project: (typeof PROJECTS)[0] }) => {
  const rowRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const playClick = useClickSound();

  useGSAP(
    () => {
      if (!rowRef.current || !imageRef.current) return;

      const xTo = gsap.quickTo(imageRef.current, "x", {
        duration: 0.4,
        ease: "power3",
      });
      const yTo = gsap.quickTo(imageRef.current, "y", {
        duration: 0.4,
        ease: "power3",
      });

      const moveImage = (e: MouseEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };

      const handleMouseEnter = (e: MouseEvent) => {
        gsap.set(imageRef.current, {
          x: e.clientX,
          y: e.clientY,
        });
      };

      rowRef.current.addEventListener("mousemove", moveImage);
      rowRef.current.addEventListener("mouseenter", handleMouseEnter);

      return () => {
        rowRef.current?.removeEventListener("mousemove", moveImage);
        rowRef.current?.removeEventListener("mouseenter", handleMouseEnter);
      };
    },
    { scope: rowRef },
  );

  return (
    <Link
      ref={rowRef}
      href={`/work/${project.slug}`}
      onClick={() => playClick()}
      className="px-4 project-row group relative flex flex-col md:flex-row md:items-center justify-between py-12 border-b border-foreground/5 transition-colors duration-500 hover:border-foreground"
    >
      <div className="flex items-center gap-8 md:gap-16 z-10">
        <span className="text-[10px] md:text-sm font-bold opacity-30 group-hover:opacity-100 transition-opacity">
          {project.id}
        </span>
        <h2
          className="text-3xl md:text-6xl font-medium tracking-tight uppercase group-hover:italic group-hover:translate-x-6 group-hover:tracking-widest transition-all duration-700 ease-expo"
          style={{ fontFamily: "inherit" }}
        >
          {project.title}
        </h2>
      </div>

      <div className="flex items-baseline gap-8 md:gap-32 z-10 mt-6 md:mt-0">
        <span className="text-[10px] md:text-sm font-bold tracking-widest uppercase opacity-40">
          {project.category}
        </span>
        <span className="text-[10px] md:text-sm font-bold opacity-40">
          {project.year}
        </span>
      </div>

      <div
        ref={imageRef}
        className="fixed top-0 left-0 pointer-events-none opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 -translate-x-1/2 -translate-y-1/2 w-80 h-48 z-0 transition-opacity duration-700 ease-power4.out"
      >
        <AnimatedProjectImage
          src={project.image}
          alt={project.title}
          videoSrc={project.video}
          width={320}
          height={192}
          forcePlay={true}
          objectPosition="top"
        />
      </div>

      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/2 transition-colors duration-500 -z-10" />
    </Link>
  );
};

const WorkPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      gsap.set(".work-header-text", { y: 100, opacity: 0 });
      gsap.set(".project-row", { y: 50, opacity: 0 });

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
    <main ref={containerRef} className="min-h-screen bg-background">
      <Navbar />

      <PageSection className="pt-40 pb-20">
        <Container className="flex flex-col gap-6 border-b border-foreground/10 pb-20">
          <div className="overflow-hidden">
            <h1 className="font-arsenica work-header-text text-[15vw] md:text-[8vw] font-medium leading-[0.8] tracking-tighter uppercase italic">
              Selected
            </h1>
          </div>
          <div className="overflow-hidden flex justify-between items-end">
            <h1 className="work-header-text text-[15vw] md:text-[8vw] font-medium leading-[0.8] tracking-tighter uppercase">
              Archive
            </h1>
            <span className="work-header-text text-[11px] font-bold tracking-[0.3em] uppercase opacity-40 pb-4 hidden md:block">
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
