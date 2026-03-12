"use client";

import Image from "next/image";
import { HERO_CONTENT } from "@/constants";

const MobileHero = () => {
  return (
    <div className="relative z-10 flex w-full flex-col gap-8 px-4 pt-28 pb-10 sm:px-6 md:hidden">
      <div className="flex w-full flex-col items-center">
        <div className="hero-mobile-image relative aspect-4/5 w-full max-w-85 overflow-hidden shadow-2xl grayscale transition-all duration-700 hover:grayscale-0">
          <Image
            src="/assets/images/umair.webp"
            alt="Umair"
            fill
            className="scale-110 object-cover"
            priority
          />
        </div>

        <div className="z-20 -mt-10 flex w-full flex-col items-center text-center mix-blend-difference sm:-mt-12">
          <div className="overflow-hidden">
            <h1 className="hero-title-word text-foreground text-[20vw] leading-none font-black tracking-tighter drop-shadow-2xl sm:text-[18vw]">
              {HERO_CONTENT.title.line1}
            </h1>
          </div>
          <div className="-mt-2 overflow-hidden">
            <h1 className="hero-title-word text-foreground text-[20vw] leading-none font-black tracking-tighter drop-shadow-2xl sm:text-[18vw]">
              {HERO_CONTENT.title.line2}
            </h1>
          </div>
          <div className="overflow-hidden">
            <h2 className="hero-title-word font-arsenica text-foreground text-[14vw] leading-[0.9] font-medium tracking-tighter italic drop-shadow-2xl sm:text-[11vw]">
              {HERO_CONTENT.title.line3}
            </h2>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-8">
        <div className="hero-tag flex flex-col gap-3">
          <span className="text-[9px] font-bold tracking-[0.3em] uppercase opacity-40">
            SPECIALIZATION
          </span>
          <p className="max-w-70 text-sm leading-relaxed font-medium">
            {HERO_CONTENT.specialization}
          </p>
        </div>

        <div className="hero-tag flex flex-col gap-3">
          <span className="text-[9px] font-bold tracking-[0.3em] uppercase opacity-40">
            LOCATION
          </span>
          <p className="font-arsenica text-sm font-medium italic">{HERO_CONTENT.location}</p>
        </div>
      </div>
    </div>
  );
};

export default MobileHero;
