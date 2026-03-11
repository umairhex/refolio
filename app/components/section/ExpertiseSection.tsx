"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { SKILLS, SERVICES } from "@/constants";
import PageSection from "@/app/components/ui/PageSection";
import Container from "@/app/components/ui/Container";

const ExpertiseSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".service-item", {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 80%",
        },
      });

      gsap.from(".skill-category", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".skills-grid",
          start: "top 85%",
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <PageSection
      ref={containerRef}
      className="relative w-full py-32 md:py-64 bg-background border-t border-foreground/5"
    >
      <Container className="flex flex-col gap-40">
        <div className="flex flex-col gap-8 max-w-2xl">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">
            OUR EXPERTISE
          </span>
          <h2 className="text-4xl md:text-7xl font-medium tracking-tighter leading-[0.9]">
            I HELP BRANDS SCALE <br /> THROUGH{" "}
            <span
              className="italic font-arsenica"
            >
              DIGITAL PRECISION
            </span>
          </h2>
        </div>

        <div className="services-grid grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="service-item group flex flex-col gap-8 p-8 border border-foreground/5 hover:border-foreground transition-colors duration-500"
            >
              <span className="text-[12px] font-bold opacity-30">
                {service.id}
              </span>
              <h3 className="text-2xl font-medium tracking-tight uppercase">
                {service.title}
              </h3>
              <p className="text-sm opacity-60 leading-relaxed max-w-[280px]">
                {service.description}
              </p>
              <div className="mt-auto pt-8 flex items-center gap-4 overflow-hidden">
                <div className="w-8 h-px bg-foreground/20 group-hover:w-full transition-all duration-700" />
              </div>
            </div>
          ))}
        </div>

        <div className="skills-grid mt-20 flex flex-col md:flex-row justify-between gap-20 border-t border-foreground/5 pt-32">
          <div className="flex flex-col gap-6 max-w-xs">
            <h4
              className="font-arsenica text-3xl font-medium tracking-tighter italic"
            >
              Tech Stack
            </h4>
            <p className="text-xs opacity-50 font-bold tracking-widest uppercase leading-loose">
              Armed with the latest industry-standard tools to build, design,
              and optimize digital products from the ground up.
            </p>
          </div>

          <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-12">
            {SKILLS.map((set) => (
              <div
                key={set.category}
                className="skill-category flex flex-col gap-6"
              >
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-30">
                  {set.category}
                </span>
                <ul className="flex flex-col gap-3">
                  {set.items.map((skill) => (
                    <li
                      key={skill}
                      className="text-sm font-medium opacity-70 hover:opacity-100 transition-opacity cursor-default flex items-center gap-3 group"
                    >
                      <div className="w-1 h-1 rounded-full bg-foreground scale-0 group-hover:scale-100 transition-transform" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </PageSection>
  );
};

export default ExpertiseSection;
