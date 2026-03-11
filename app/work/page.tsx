"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { PROJECTS } from "@/constants";

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
        },
        "-=0.6",
      );
    },
    { scope: containerRef },
  );

  return (
    <main ref={containerRef} className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-40 pb-20 px-6 md:px-12 lg:px-24">
        <div className="flex flex-col gap-6 max-w-[1600px] mx-auto border-b border-foreground/10 pb-20">
          <div className="overflow-hidden">
            <h1
              className="work-header-text text-[15vw] md:text-[8vw] font-medium leading-[0.8] tracking-tighter uppercase italic"
              style={{ fontFamily: "'Aresenica', serif" }}
            >
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
        </div>
      </section>

      <section className="pb-64 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1600px] mx-auto flex flex-col">
          {PROJECTS.map((project) => (
            <Link
              key={project.id}
              href={`/work/${project.id}`}
              className="project-row group relative flex flex-col md:flex-row md:items-center justify-between py-12 border-b border-foreground/5 transition-colors duration-500 hover:border-foreground"
            >
              <div className="flex items-center gap-8 md:gap-16 z-10">
                <span className="text-[10px] md:text-sm font-bold opacity-30 group-hover:opacity-100 transition-opacity">
                  {project.id}
                </span>
                <h2
                  className="text-3xl md:text-6xl font-medium tracking-tight uppercase group-hover:italic transition-all duration-500"
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

              <div className="fixed pointer-events-none opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-48 z-0 transition-all duration-700 ease-power4.out">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover rounded-sm grayscale"
                />
              </div>

              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/2 transition-colors duration-500 -z-10" />
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default WorkPage;
