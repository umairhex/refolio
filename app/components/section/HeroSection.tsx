"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@/lib/gsap";
import { ArrowDownRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import MobileHero from "./MobileHero";
import { HERO_CONTENT } from "@/constants";
import { SoundButton } from "@/app/components/ui/Sound";

const HeroSection = () => {
  const container = useRef<HTMLDivElement>(null);
  const heroGrid = useRef<HTMLDivElement>(null);
  const scrollButton = useRef<HTMLButtonElement>(null);
  const heroImage = useRef<HTMLImageElement>(null);
  const bgText = useRef<HTMLHeadingElement>(null);



  const { contextSafe } = useGSAP(
    () => {
      const q = gsap.utils.selector(container);
      const mm = gsap.matchMedia();

      // 1. Entrance Animation (Global)
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        q(".hero-bg-text"),
        {
          autoAlpha: 0,
          scale: 0.9,
        },
        {
          autoAlpha: 0.05,
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
        },
      )
        .fromTo(
          q(".hero-title-word"),
          {
            yPercent: 100,
            autoAlpha: 0,
          },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 0.8,
            stagger: 0.05,
          },
          "-=1.2",
        )
        .fromTo(
          q(".hero-image-box"),
          {
            clipPath: "inset(0 100% 0 0)",
            autoAlpha: 0,
          },
          {
            clipPath: "inset(0 0% 0 0)",
            autoAlpha: 1,
            duration: 1.4,
            ease: "expo.inOut",
          },
          "-=0.8",
        )
        .fromTo(
          q(".hero-tag"),
          {
            autoAlpha: 0,
            x: -20,
          },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.05,
          },
          "-=0.7",
        );

      // 2. Floating Animation for Tags (Global)
      gsap.to(q(".hero-tag"), {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2,
      });

      // 3. Desktop Parallax (using matchMedia)
      mm.add("(min-width: 1024px)", () => {
        // Initialize high-performance quickTo functions
        const xToGridLocal = gsap.quickTo(heroGrid.current, "rotateY", { duration: 0.8, ease: "power2.out" });
        const yToGridLocal = gsap.quickTo(heroGrid.current, "rotateX", { duration: 0.8, ease: "power2.out" });
        const xToBgLocal = gsap.quickTo(q(".hero-bg-text"), "x", { duration: 1.0, ease: "power2.out" });
        const yToBgLocal = gsap.quickTo(q(".hero-bg-text"), "y", { duration: 1.0, ease: "power2.out" });
        const xToImgLocal = gsap.quickTo(heroImage.current, "x", { duration: 1.0, ease: "power2.out" });
        const yToImgLocal = gsap.quickTo(heroImage.current, "y", { duration: 1.0, ease: "power2.out" });
        const xToBtnLocal = gsap.quickTo(scrollButton.current, "x", { duration: 0.4, ease: "power2.out" });
        const yToBtnLocal = gsap.quickTo(scrollButton.current, "y", { duration: 0.4, ease: "power2.out" });

        const handleMouseMove = (e: MouseEvent) => {
          const { clientX, clientY } = e;
          const mapX = gsap.utils.mapRange(0, window.innerWidth, -20, 20);
          const mapY = gsap.utils.mapRange(0, window.innerHeight, -20, 20);

          const xPos = mapX(clientX);
          const yPos = mapY(clientY);

          xToGridLocal(xPos / 2);
          yToGridLocal(-yPos / 2);
          xToBgLocal(xPos);
          yToBgLocal(yPos);
          xToImgLocal(-xPos);
          yToImgLocal(-yPos);

          if (scrollButton.current) {
            const rect = scrollButton.current.getBoundingClientRect();
            const btnCenterX = rect.left + rect.width / 2;
            const btnCenterY = rect.top + rect.height / 2;
            const distBtnX = clientX - btnCenterX;
            const distBtnY = clientY - btnCenterY;

            if (Math.hypot(distBtnX, distBtnY) < 150) {
              xToBtnLocal(distBtnX * 0.4);
              yToBtnLocal(distBtnY * 0.4);
            } else {
              xToBtnLocal(0);
              yToBtnLocal(0);
            }
          }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
      });

      // 4. Scroll-based parallax (Global)
      gsap.to(heroGrid.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: container },
  );

  const onImageEnter = contextSafe((e: React.MouseEvent) => {
    const img = e.currentTarget.querySelector("img");
    gsap.to(img, {
      scale: 1.1,
      duration: 1,
      ease: "power2.out",
      overwrite: "auto",
    });
  });

  const onImageLeave = contextSafe((e: React.MouseEvent) => {
    const img = e.currentTarget.querySelector("img");
    gsap.to(img, {
      scale: 1.25,
      duration: 1,
      ease: "power2.out",
      overwrite: "auto",
    });
  });

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={container}
      className="bg-background noise relative flex h-screen min-h-200 w-full items-center justify-center overflow-hidden px-6 pt-[calc(2rem+5vh)] md:px-12 lg:px-24"
    >
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center select-none">
        <h2
          ref={bgText}
          className="hero-bg-text text-stroke text-[25vw] font-black tracking-tighter whitespace-nowrap opacity-0 will-change-transform"
        >
          M UMAIR KHAN
        </h2>
      </div>

      <div
        ref={heroGrid}
        className="perspective-1000 relative z-10 hidden w-full max-w-400 grid-cols-12 items-center gap-8 will-change-transform md:grid"
      >
        <div className="col-span-3 flex flex-col gap-12">
          <div className="hero-tag flex flex-col gap-4 opacity-0 will-change-transform">
            <span className="label-accent tracking-[0.4em]">SPECIALIZATION</span>
            <p className="max-w-50 text-sm leading-relaxed font-medium">
              {HERO_CONTENT.specialization}
            </p>
          </div>

          <div className="hero-tag flex flex-col gap-4 opacity-0 will-change-transform">
            <span className="label-accent tracking-[0.4em]">LOCATION</span>
            <p className="font-arsenica text-sm font-medium italic">{HERO_CONTENT.location}</p>
          </div>
        </div>

        <div className="relative flex flex-col items-center justify-center md:col-span-6">
          <div
            onMouseEnter={onImageEnter}
            onMouseLeave={onImageLeave}
            className="hero-image-box group relative aspect-3.5/5 w-full max-w-125 overflow-hidden shadow-2xl grayscale transition-all duration-700 hover:grayscale-0"
          >
            <Image
              ref={heroImage}
              src="/assets/images/umair.webp"
              alt="Umair"
              fill
              className="scale-125 object-cover will-change-transform"
              priority
            />
          </div>

          <div className="pointer-events-none absolute top-[65%] -left-20 z-20 mix-blend-difference">
            <div className="flex justify-start overflow-hidden">
              <h1 className="hero-title-word text-foreground text-[9vw] leading-none font-black tracking-tighter opacity-0 will-change-transform">
                {HERO_CONTENT.title.line1}
              </h1>
            </div>
          </div>
        </div>

        <div className="flex h-full flex-col justify-between py-12 md:col-span-3 md:items-end">
          <div className="mb-auto flex justify-end overflow-hidden mix-blend-difference">
            <h1 className="hero-title-word text-foreground text-[9vw] leading-none font-black tracking-tighter opacity-0 will-change-transform">
              {HERO_CONTENT.title.line2}
            </h1>
          </div>

          <div className="flex flex-col gap-12 md:items-end">
            <div className="overflow-hidden mix-blend-difference">
              <h2 className="hero-title-word font-arsenica text-foreground text-[6vw] leading-none font-medium tracking-tighter italic opacity-0 will-change-transform">
                {HERO_CONTENT.title.line3}
              </h2>
            </div>

            <SoundButton
              ref={scrollButton}
              id="hero-scroll-btn"
              className="hero-tag group flex cursor-pointer flex-col items-end gap-6 opacity-0 focus:outline-none"
              onClick={scrollToAbout}
            >
              <div className="flex items-center gap-4">
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase opacity-40 transition-opacity duration-500 group-hover:opacity-100">
                  Scroll to explore
                </span>
                <div className="border-foreground relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border transition-colors duration-500 group-hover:border-transparent">
                  <div className="bg-foreground ease-power4.out absolute inset-0 translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
                  <ArrowDownRight
                    size={18}
                    className="group-hover:text-background relative z-10 transition-all duration-500"
                  />
                </div>
              </div>
            </SoundButton>
          </div>
        </div>
      </div>

      <MobileHero />
    </section>
  );
};

export default HeroSection;
