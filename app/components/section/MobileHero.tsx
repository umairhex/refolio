"use client";

import Image from "next/image";

const MobileHero = () => {
  return (
    <div className="relative z-10 w-full flex flex-col md:hidden pt-28 pb-10 gap-8 px-4 sm:px-6">
      <div className="flex flex-col items-center w-full">
        <div className="hero-mobile-image relative w-full aspect-4/5 max-w-[340px] overflow-hidden shadow-2xl grayscale transition-all duration-700 hover:grayscale-0">
          <Image
            src="/assets/images/umair.webp"
            alt="Umair"
            fill
            className="object-cover scale-110"
            priority
          />
        </div>

        <div className="flex flex-col w-full mix-blend-difference -mt-10 sm:-mt-12 z-20 items-center text-center">
          <div className="overflow-hidden">
            <h1 className="hero-title-word text-[20vw] sm:text-[18vw] font-black leading-none tracking-tighter text-foreground drop-shadow-2xl">
              FULL
            </h1>
          </div>
          <div className="overflow-hidden -mt-2">
            <h1 className="hero-title-word text-[20vw] sm:text-[18vw] font-black leading-none tracking-tighter text-foreground drop-shadow-2xl">
              STACK
            </h1>
          </div>
          <div className="overflow-hidden">
            <h2 className="hero-title-word font-arsenica text-[14vw] sm:text-[11vw] font-medium leading-[0.9] tracking-tighter italic text-foreground drop-shadow-2xl">
              Engineer
            </h2>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8 mt-4">
        <div className="hero-tag flex flex-col gap-3">
          <span className="text-[9px] font-bold tracking-[0.3em] uppercase opacity-40">
            SPECIALIZATION
          </span>
          <p className="text-sm font-medium leading-relaxed max-w-[280px]">
            Full-Stack Engineer specialized in AI-powered systems and rapid
            feature delivery.
          </p>
        </div>

        <div className="hero-tag flex flex-col gap-3">
          <span className="text-[9px] font-bold tracking-[0.3em] uppercase opacity-40">
            LOCATION
          </span>
          <p className="font-arsenica text-sm font-medium italic">
            Islamabad — Pakistan
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileHero;
