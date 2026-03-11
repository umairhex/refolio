"use client";

import { useRef } from "react";
import Image from "next/image";
import { CONTACT_EMAIL } from "@/constants";
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
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
