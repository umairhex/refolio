"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CONTACT_EMAIL, SOCIAL_LINKS } from "@/constants";
import { ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".footer-title", {
        yPercent: 50,
        opacity: 0,
        rotateX: -30,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          onEnter: () =>
            gsap.to("body", {
              backgroundColor: "var(--foreground)",
              color: "var(--background)",
              duration: 1,
            }),
          onLeave: () =>
            gsap.to("body", {
              backgroundColor: "var(--background)",
              color: "var(--foreground)",
              duration: 1,
            }),
          onEnterBack: () =>
            gsap.to("body", {
              backgroundColor: "var(--foreground)",
              color: "var(--background)",
              duration: 1,
            }),
          onLeaveBack: () =>
            gsap.to("body", {
              backgroundColor: "var(--background)",
              color: "var(--foreground)",
              duration: 1,
            }),
        },
      });
    },
    { scope: footerRef },
  );

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-foreground text-background pt-40 pb-12 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto flex flex-col gap-32">
        <div className="flex flex-col items-start gap-8">
          <span className="text-[11px] font-bold tracking-[0.3em] uppercase opacity-40">
            HAVE A PROJECT IN MIND?
          </span>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="footer-title group relative inline-block group"
          >
            <h2 className="text-[14vw] md:text-[10vw] font-medium leading-[0.8] tracking-tighter uppercase transition-colors duration-500">
              LET&apos;S{" "}
              <span
                className="italic"
                style={{ fontFamily: "'Aresenica', serif" }}
              >
                WORK
              </span>{" "}
              <br /> TOGETHER
            </h2>
            <div className="absolute top-0 -right-20 md:-right-32 opacity-0 group-hover:opacity-100 group-hover:translate-x-4 transition-all duration-500">
              <ArrowUpRight className="w-20 h-20 md:w-32 md:h-32 stroke-1" />
            </div>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8 border-t border-background/10 pt-16">
          <div className="flex flex-col gap-6">
            <span className="text-[10px] font-bold tracking-widest opacity-40 uppercase">
              SOCIALS
            </span>
            <div className="flex flex-col gap-3">
              {Object.entries(SOCIAL_LINKS).map(([key, href]) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium hover:opacity-100 transition-opacity opacity-60 capitalize"
                >
                  {key}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <span className="text-[10px] font-bold tracking-widest opacity-40 uppercase">
              SITEMAP
            </span>
            <div className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-sm font-medium opacity-60 hover:opacity-100 transition-opacity"
              >
                Home
              </Link>
              <Link
                href="/#work"
                className="text-sm font-medium opacity-60 hover:opacity-100 transition-opacity"
              >
                Work
              </Link>
              <Link
                href="/#about"
                className="text-sm font-medium opacity-60 hover:opacity-100 transition-opacity"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium opacity-60 hover:opacity-100 transition-opacity"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-6 md:col-span-2 md:items-end">
            <span className="text-[10px] font-bold tracking-widest opacity-40 uppercase">
              LOCAL TIME
            </span>
            <p className="text-3xl md:text-5xl font-medium tracking-tighter">
              Islamabad, PK
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-background/5 pt-12 text-[10px] font-bold tracking-widest opacity-30">
          <span>
            © {new Date().getFullYear()} UMAIR HEX. ALL RIGHTS RESERVED.
          </span>
          <span>DESIGNED & DEVELOPED WITH PASSION</span>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-background/5 to-transparent pointer-events-none" />
    </footer>
  );
};

export default Footer;
