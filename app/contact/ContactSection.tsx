"use client";

import { Mail, ArrowRight } from "lucide-react";
import { CONTACT_EMAIL, SOCIAL_PROFILES } from "@/constants";
import SocialLinkCard from "../components/ui/SocialLinkCard";
import { SoundAnchor } from "../components/ui/Sound";
import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { gsap } from "@/lib/gsap";

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      const q = gsap.utils.selector(containerRef);
      const magneticElements = gsap.utils.toArray<HTMLElement>(q(".magnetic-target"));
      
      if (magneticElements.length === 0 || window.innerWidth < 1024) return;

      magneticElements.forEach((el) => {
        const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });

        const onMouseMove = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const distanceX = e.clientX - centerX;
          const distanceY = e.clientY - centerY;

          if (Math.abs(distanceX) < 150 && Math.abs(distanceY) < 150) {
            xTo(distanceX * 0.15);
            yTo(distanceY * 0.15);
          } else {
            xTo(0);
            yTo(0);
          }
        };

        const onMouseLeave = () => {
          xTo(0);
          yTo(0);
        };

        el.addEventListener("mousemove", onMouseMove);
        el.addEventListener("mouseleave", onMouseLeave);
        
        // Return cleanup for this specific element's listeners
        return () => {
          el.removeEventListener("mousemove", onMouseMove);
          el.removeEventListener("mouseleave", onMouseLeave);
        };
      });
    },
    { scope: containerRef },
  );

  const onEmailEnter = contextSafe(() => {
    gsap.to(".email-char", {
      y: -4,
      fontStyle: "italic",
      color: "var(--foreground)",
      stagger: 0.02,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  });

  const onEmailLeave = contextSafe(() => {
    gsap.to(".email-char", {
      y: 0,
      fontStyle: "normal",
      stagger: 0.01,
      duration: 0.4,
      ease: "power2.inOut",
      overwrite: "auto",
    });
  });

  return (
    <div ref={containerRef} className="mt-24 grid grid-cols-1 gap-20 lg:grid-cols-2 lg:gap-32">
      <div className="flex flex-col gap-16 md:gap-24">
        <div className="contact-reveal flex flex-col gap-10">
          <span className="label-accent text-[10px] font-light tracking-[0.5em] uppercase opacity-40">
            DIRECT EMAIL
          </span>
          <SoundAnchor
            href={`mailto:${CONTACT_EMAIL}`}
            onMouseEnter={onEmailEnter}
            onMouseLeave={onEmailLeave}
            className="magnetic-target group flex items-center gap-6 text-xl tracking-tight break-all transition-all duration-300 sm:text-2xl md:gap-8 md:text-3xl lg:text-4xl will-change-transform"
          >
            <div className="bg-foreground/5 border-foreground/10 group-hover:bg-foreground group-hover:text-background shrink-0 rounded-full border p-5 transition-all duration-500 md:p-6">
              <Mail
                size={22}
                className="transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12"
              />
            </div>
            <span className="relative inline-block overflow-hidden pb-1">
              {CONTACT_EMAIL.split("").map((char, i) => (
                <span
                  key={i}
                  className="email-char char inline-block transition-colors duration-300"
                  style={{ whiteSpace: char === " " ? "pre" : "normal" }}
                >
                  {char}
                </span>
              ))}
              <span className="bg-foreground ease-expo-out absolute bottom-0 left-0 h-[1.5px] w-0 transition-all duration-500 group-hover:w-full" />
            </span>
          </SoundAnchor>
        </div>

        <div className="contact-reveal flex flex-col gap-10">
          <span className="label-accent text-[10px] font-light tracking-[0.5em] uppercase opacity-40">
            SOCIALS
          </span>
          <div className="grid grid-cols-2 gap-x-12 gap-y-1 sm:grid-cols-2">
            {SOCIAL_PROFILES.map((profile) => (
              <SocialLinkCard key={profile.key} profile={profile} />
            ))}
          </div>
        </div>
      </div>

      <div className="contact-reveal group bg-foreground/3 border-foreground/5 relative flex h-full min-h-[400px] flex-col justify-between overflow-hidden border p-10 md:p-16 lg:p-20">
        <div className="relative z-10 flex flex-col gap-8">
          <h3 className="text-4xl leading-[0.9] font-medium tracking-tighter uppercase md:text-5xl lg:text-6xl">
            READY TO BRING <br /> YOUR IDEAS <br />{" "}
            <span className="font-arsenica tracking-normal lowercase italic">to life?</span>
          </h3>
          <p className="max-w-[300px] text-sm leading-relaxed opacity-50 md:text-base">
            I&apos;m currently accepting new projects and collaborations. If you have a vision,
            let&apos;s make it a reality together.
          </p>
        </div>

        <SoundAnchor
          href={`mailto:${CONTACT_EMAIL}`}
          className="magnetic-target group z-10 mt-12 flex items-center gap-6 text-[11px] font-bold tracking-[0.4em] uppercase will-change-transform"
        >
          START A PROJECT
          <div className="bg-foreground text-background flex h-12 w-12 items-center justify-center rounded-full transition-all duration-500 group-hover:scale-110 group-hover:-rotate-45">
            <ArrowRight size={18} />
          </div>
        </SoundAnchor>
      </div>
    </div>
  );
}
