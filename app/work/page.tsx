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
      className="project-row group border-foreground/5 hover:border-foreground relative flex flex-col justify-between border-b px-4 py-12 transition-colors duration-500 md:flex-row md:items-center"
    >
      <div className="z-10 flex items-center gap-8 md:gap-16">
        <span className="text-[10px] font-bold opacity-30 transition-opacity group-hover:opacity-100 md:text-sm">
          {project.id}
        </span>
        <h2
          className="ease-expo text-3xl font-medium tracking-tight uppercase transition-all duration-700 group-hover:translate-x-6 group-hover:tracking-widest group-hover:italic md:text-6xl"
          style={{ fontFamily: "inherit" }}
        >
          {project.title}
        </h2>
      </div>

      <div className="z-10 mt-6 flex items-baseline gap-8 md:mt-0 md:gap-32">
        <span className="text-[10px] font-bold tracking-widest uppercase opacity-40 md:text-sm">
          {project.category}
        </span>
        <span className="text-[10px] font-bold opacity-40 md:text-sm">{project.year}</span>
      </div>

      <div
        ref={imageRef}
        className="ease-power4.out pointer-events-none fixed top-0 left-0 z-0 h-48 w-80 -translate-x-1/2 -translate-y-1/2 scale-50 opacity-0 transition-opacity duration-700 group-hover:scale-100 group-hover:opacity-100"
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

      <div className="bg-foreground/0 group-hover:bg-foreground/2 absolute inset-0 -z-10 transition-colors duration-500" />
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
