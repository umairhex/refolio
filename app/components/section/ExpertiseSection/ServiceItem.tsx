"use client";

import { useRef } from "react";
import { Service } from "@/types";
import { useGSAP, gsap } from "@/lib/gsap";

interface ServiceItemProps {
  service: Service;
}

export const ServiceItem = ({ service }: ServiceItemProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: containerRef });

  const onEnter = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
    const title = e.currentTarget.querySelector(".service-title");
    const desc = e.currentTarget.querySelector(".service-desc");
    const id = e.currentTarget.querySelector(".service-id");
    const indicator = e.currentTarget.querySelector(".service-indicator");
    const bottomLine = e.currentTarget.querySelector(".service-bottom-line");

    gsap.to(e.currentTarget, {
      y: -5,
      backgroundColor: "rgba(255,255,255,0.02)",
      borderColor: "rgba(255,255,255,0.2)",
      duration: 0.6,
      ease: "power3.out",
    });

    gsap.to(title, { x: 5, duration: 0.5, ease: "power2.out", overwrite: "auto" });
    gsap.to(desc, { autoAlpha: 0.8, duration: 0.5, ease: "power2.out", overwrite: "auto" });
    gsap.to(id, { autoAlpha: 1, duration: 0.5, ease: "power2.out", overwrite: "auto" });
    gsap.to(indicator, { scaleX: 2, backgroundColor: "rgba(255,255,255,0.4)", duration: 0.6, ease: "expo.out", overwrite: "auto" });
    gsap.to(bottomLine, { x: "0%", duration: 0.7, ease: "expo.out", overwrite: "auto" });
  });

  const onLeave = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
    const title = e.currentTarget.querySelector(".service-title");
    const desc = e.currentTarget.querySelector(".service-desc");
    const id = e.currentTarget.querySelector(".service-id");
    const indicator = e.currentTarget.querySelector(".service-indicator");
    const bottomLine = e.currentTarget.querySelector(".service-bottom-line");

    gsap.to(e.currentTarget, {
      y: 0,
      backgroundColor: "rgba(255,255,255,0)",
      borderColor: "rgba(255,255,255,0.05)",
      duration: 0.6,
      ease: "power3.out",
      overwrite: "auto",
    });

    gsap.to(title, { x: 0, duration: 0.5, ease: "power2.out", overwrite: "auto" });
    gsap.to(desc, { autoAlpha: 0.5, duration: 0.5, ease: "power2.out", overwrite: "auto" });
    gsap.to(id, { autoAlpha: 0.2, duration: 0.5, ease: "power2.out", overwrite: "auto" });
    gsap.to(indicator, { scaleX: 1, backgroundColor: "rgba(255,255,255,0.1)", duration: 0.6, ease: "expo.out", overwrite: "auto" });
    gsap.to(bottomLine, { x: "-100%", duration: 0.5, ease: "power3.in", overwrite: "auto" });
  });

  return (
    <div
      ref={containerRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="service-item opacity-0 will-change-transform flex flex-col gap-8 border border-foreground/5 bg-foreground/0 p-8 cursor-default"
    >
      <div className="flex items-center justify-between">
        <span className="service-id text-[12px] font-bold tracking-widest opacity-20">
          {service.id}
        </span>
        <div className="service-indicator h-px w-4 origin-right bg-foreground/10" />
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="service-title text-2xl font-medium tracking-tight uppercase md:text-3xl will-change-transform">
          {service.title}
        </h3>
        <p className="service-desc max-w-[280px] text-sm leading-relaxed opacity-50">
          {service.description}
        </p>
      </div>

      <div className="mt-auto flex items-center pt-8">
        <div className="relative h-px w-full overflow-hidden bg-foreground/10">
          <div className="service-bottom-line absolute inset-0 -translate-x-full bg-foreground will-change-transform" />
        </div>
      </div>
    </div>
  );
};
