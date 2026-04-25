"use client";

import { useRef } from "react";
import { useGSAP, gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SKILLS, SERVICES } from "@/constants";
import PageSection from "@/app/components/ui/PageSection";
import Container from "@/app/components/ui/Container";
import { ServiceItem } from "./ExpertiseSection/ServiceItem";
import { SkillCategory } from "./ExpertiseSection/SkillCategory";

gsap.registerPlugin(ScrollTrigger);

const ExpertiseSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // 1. Header Entrance (Batched for independent triggers, Pure Fade)
      ScrollTrigger.batch(".expertise-header", {
        once: true,
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            stagger: 0.1,
            duration: 1.5,
            ease: "power2.out",
            overwrite: true,
          });
        },
        start: "top 90%",
      });

      // 2. Batched Services Entrance (Smooth Simultaneous Fade)
      ScrollTrigger.batch(".service-item", {
        once: true,
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
            overwrite: true,
          });
        },
        start: "top 85%",
      });

      // 3. Batched Skills Entrance (Smooth Simultaneous Fade)
      ScrollTrigger.batch(".skill-category", {
        once: true,
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
            overwrite: true,
          });
        },
        start: "top 90%",
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
        <div className="flex max-w-4xl flex-col gap-8">
          <span className="expertise-header label-accent tracking-[0.3em] opacity-0 will-change-transform">
            OUR EXPERTISE
          </span>
          <h2 className="expertise-header text-4xl leading-[0.9] font-medium tracking-tighter uppercase opacity-0 will-change-transform md:text-7xl">
            I HELP BRANDS <br /> SCALE THROUGH <br />
            <span className="font-arsenica italic">DIGITAL PRECISION</span>
          </h2>
        </div>

        <div className="services-grid grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {SERVICES.map((service: (typeof SERVICES)[0]) => (
            <ServiceItem key={service.id} service={service} />
          ))}
        </div>

        <div className="skills-grid border-foreground/5 mt-20 flex flex-col justify-between gap-20 border-t pt-32 md:flex-row">
          <div className="flex max-w-xs flex-col gap-6">
            <h4 className="expertise-header font-arsenica text-3xl font-medium tracking-tighter italic opacity-0 will-change-transform">
              Tech Stack
            </h4>
            <p className="expertise-header text-xs leading-loose font-light tracking-widest uppercase opacity-0 will-change-transform">
              Armed with the latest industry-standard tools to build, design, and optimize digital
              products from the ground up.
            </p>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-12 lg:grid-cols-4">
            {SKILLS.map((set: (typeof SKILLS)[0]) => (
              <SkillCategory key={set.category} skillCategory={set} />
            ))}
          </div>
        </div>
      </Container>
    </PageSection>
  );
};

export default ExpertiseSection;
