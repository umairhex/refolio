"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { SKILLS, SERVICES } from "@/constants";
import PageSection from "@/app/components/ui/PageSection";
import Container from "@/app/components/ui/Container";
import { ServiceItem } from "./ExpertiseSection/ServiceItem";
import { SkillCategory } from "./ExpertiseSection/SkillCategory";
import { animateFromViewport } from "@/lib/animations";

const ExpertiseSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      animateFromViewport(".service-item", {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "power4.out",
        trigger: ".services-grid",
      });

      animateFromViewport(".skill-category", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        trigger: ".skills-grid",
      });
    },
    { scope: containerRef },
  );

  return (
    <PageSection
      ref={containerRef}
      className="bg-background border-foreground/5 relative w-full border-t py-32 md:py-64"
    >
      <Container className="flex flex-col gap-40">
        <div className="flex max-w-2xl flex-col gap-8">
          <span className="label-accent tracking-[0.3em]">
            OUR EXPERTISE
          </span>
          <h2 className="text-4xl leading-[0.9] font-medium tracking-tighter md:text-7xl">
            I HELP BRANDS SCALE <br /> THROUGH{" "}
            <span className="font-arsenica italic">DIGITAL PRECISION</span>
          </h2>
        </div>

        <div className="services-grid grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {SERVICES.map((service) => (
            <ServiceItem key={service.id} service={service} />
          ))}
        </div>

        <div className="skills-grid border-foreground/5 mt-20 flex flex-col justify-between gap-20 border-t pt-32 md:flex-row">
          <div className="flex max-w-xs flex-col gap-6">
            <h4 className="font-arsenica text-3xl font-medium tracking-tighter italic">
              Tech Stack
            </h4>
            <p className="text-xs leading-loose font-bold tracking-widest uppercase opacity-50">
              Armed with the latest industry-standard tools to build, design, and optimize digital
              products from the ground up.
            </p>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-12 lg:grid-cols-4">
            {SKILLS.map((set) => (
              <SkillCategory key={set.category} skillCategory={set} />
            ))}
          </div>
        </div>
      </Container>
    </PageSection>
  );
};

export default ExpertiseSection;
