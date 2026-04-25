"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { useThemeScroll } from "@/hooks/use-theme-scroll";
import PageSection from "@/app/components/ui/PageSection";
import Container from "@/app/components/ui/Container";
import { animateFromViewport } from "@/lib/animations";

const AboutSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useThemeScroll(containerRef);

  useGSAP(
    () => {
      animateFromViewport(".about-line", {
        y: 100,
        opacity: 0,
        rotationZ: 2,
        duration: 1.5,
        ease: "power4.out",
      });
    },
    { scope: containerRef },
  );

  return (
    <PageSection
      ref={containerRef}
      id="about"
      className="relative flex w-full flex-col items-center justify-center overflow-hidden py-32 md:py-64"
    >
      <Container className="w-full">
        <div className="flex flex-col gap-12" ref={textRef}>
          <div className="overflow-hidden">
            <h2 className="about-line font-arsenica text-5xl leading-[0.9] font-medium tracking-tighter italic md:text-7xl lg:text-8xl">
              CRAFTING DIGITAL
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="about-line text-5xl leading-[0.9] font-medium tracking-tighter md:text-7xl lg:text-8xl">
              EXPERIENCES WITH
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="about-line font-arsenica text-5xl leading-[0.9] font-medium tracking-tighter italic md:text-7xl lg:text-8xl">
              PRECISION & ARTISTRY
            </h2>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-20 md:grid-cols-2">
            <div className="flex flex-col gap-8">
              <p className="text-xl leading-relaxed font-light opacity-80 md:text-2xl">
                I am a full-stack engineer specialized in building high-performance SaaS products,
                automating complex workflows with AI, and crafting pixel-perfect digital
                experiences.
              </p>
              <div className="bg-foreground/30 h-px w-20" />
            </div>

            <div className="prose prose-invert flex flex-col gap-12 text-sm leading-relaxed tracking-wide opacity-60 md:text-base">
              <p>
                With a background in computer science and specialized training from Meta, I bridge
                the gap between complex AI models and seamless user interfaces. My work focuses on
                integrating LLMs (GPT, Gemini, Claude) into real-time production systems.
              </p>
              <p>
                From leading award-winning teams at Air University to optimizing feature delivery at
                Strug Inc. by 85%, I thrive on creating digital ecosystems that are both technically
                robust and visually striking.
              </p>
            </div>
          </div>
        </div>
      </Container>

      <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap opacity-[0.02] select-none">
        <span className="text-[40vw] font-bold tracking-tighter uppercase italic">ARCHITECT</span>
      </div>
    </PageSection>
  );
};

export default AboutSection;
