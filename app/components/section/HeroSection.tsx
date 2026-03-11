"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

const HeroSection = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      gsap.set(".hero-text", { yPercent: 120, rotateZ: 3 });
      gsap.set(".hero-image-container", {
        scale: 0.8,
        opacity: 0,
        rotateZ: -10,
      });
      gsap.set(".hero-image", { scale: 1.4 });
      gsap.set(".hero-cta", { opacity: 0, y: 30 });
      gsap.set(".hero-decoration", { opacity: 0 });
      gsap.set(".hero-draw-path", {
        strokeDasharray: 1000,
        strokeDashoffset: 1000,
      });

      tl.to(".hero-text", {
        yPercent: 0,
        rotateZ: 0,
        duration: 1.2,
        stagger: 0.1,
      })
        .to(
          ".hero-image-container",
          {
            scale: 1,
            opacity: 1,
            rotateZ: -4,
            duration: 1.5,
            ease: "power3.out",
          },
          "-=0.9",
        )
        .to(
          ".hero-image",
          {
            scale: 1.1,
            duration: 1.5,
            ease: "power3.out",
          },
          "<",
        )
        .to(
          ".hero-cta",
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.1,
          },
          "-=1.0",
        )
        .to(
          ".hero-decoration",
          {
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
          },
          "-=0.5",
        )
        .to(
          ".hero-draw-path",
          {
            strokeDashoffset: 0,
            duration: 1.5,
            stagger: 0.3,
            ease: "power2.inOut",
          },
          "<",
        );
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative w-full flex items-center justify-center bg-background overflow-hidden px-4 py-8 md:py-12 lg:py-16 max-w-[100vw]"
    >
      <div className="relative flex flex-col items-center w-full select-none">
        <div className="overflow-hidden relative z-10 pt-2 md:pt-4">
          <h1
            className="hero-text text-center leading-none whitespace-nowrap text-foreground transform origin-bottom-left inline-block"
            style={{
              fontFamily: "'Aresenica', 'Didot', 'Georgia', serif",
              fontWeight: 400,
              fontSize: "clamp(2rem, 9.5vw, 6.5rem)",
              letterSpacing: "-0.01em",
            }}
          >
            FULL-STACK
          </h1>

          {/* Decorative Sparkle Top Left */}
          <div className="absolute -top-2 -left-8 hero-decoration opacity-0 pointer-events-none">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"
                fill="currentColor"
                className="text-foreground/30"
              />
            </svg>
          </div>

          {/* Long Curled Line under Full-Stack */}
          <div className="absolute -bottom-1 -right-4 w-32 hero-decoration pointer-events-none">
            <svg viewBox="0 0 160 20" fill="none" className="w-full">
              <path
                className="hero-draw-path"
                d="M5 15C40 5 120 5 155 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeOpacity="0.4"
              />
            </svg>
          </div>
        </div>

        <div
          className="relative z-20 shrink-0"
          style={{
            width: "clamp(120px, 24vw, 240px)",
            height: "clamp(150px, 30vw, 300px)",
            marginTop: "clamp(-25px, -3.5vw, -45px)",
            marginBottom: "clamp(-50px, -7vw, -100px)",
          }}
        >
          {/* Side Annotation Line Left */}
          <div className="absolute top-1/2 -left-12 hero-decoration opacity-0 hidden md:block">
            <svg width="2" height="60" viewBox="0 0 2 60" fill="none">
              <path
                className="hero-draw-path"
                d="M1 0V60"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="4 4"
                strokeOpacity="0.3"
              />
            </svg>
          </div>

          <div
            className="hero-image-container w-full h-full overflow-hidden shadow-2xl bg-muted"
            style={{
              filter: "grayscale(100%)",
            }}
          >
            <Image
              src="/assets/images/umair.webp"
              fill
              className="hero-image object-cover"
              alt="Developer Umair"
              priority
            />
          </div>

          {/* Side Annotation Line Right */}
          <div className="absolute bottom-1/4 -right-16 hero-decoration opacity-0 hidden lg:block">
            <p className="text-[10px] tracking-[0.2em] uppercase opacity-40 font-bold rotate-90 origin-left">
              Based in PK
            </p>
          </div>
        </div>

        <div
          className="overflow-hidden relative z-30 pb-2 md:pb-4"
          style={{ mixBlendMode: "difference" }}
        >
          <h1
            className="hero-text text-center font-medium leading-none whitespace-nowrap transform origin-bottom-left inline-block"
            style={{
              fontWeight: 500,
              fontSize: "clamp(2.1rem, 9.5vw, 7.5rem)",
              letterSpacing: "-0.04em",
              color: "white",
            }}
          >
            ENGINEER
          </h1>

          {/* Curled Scribble Accent */}
          <div className="absolute bottom-0 right-0 w-48 hero-decoration pointer-events-none opacity-0">
            <svg viewBox="0 0 200 40" fill="none" className="w-full">
              <path
                className="hero-draw-path"
                d="M10 30C50 10 150 10 190 30"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeOpacity="0.6"
              />
              <path
                className="hero-draw-path"
                d="M30 35C70 15 130 15 170 35"
                stroke="white"
                strokeWidth="1"
                strokeLinecap="round"
                strokeOpacity="0.3"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
