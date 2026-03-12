"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { useThemeScroll } from "@/hooks/use-theme-scroll";
import { CONTACT_EMAIL, SOCIAL_LINKS, FOOTER_LINKS } from "@/constants";
import { ArrowUpRight } from "lucide-react";
import Container from "@/app/components/ui/Container";
import { useClickSound } from "@/hooks/use-click-sound";

const Footer = ({
  disableBodyTheme = false,
}: {
  disableBodyTheme?: boolean;
}) => {
  const footerRef = useRef<HTMLElement>(null);
  const playClick = useClickSound();

  useThemeScroll(footerRef, { enabled: !disableBodyTheme });

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
      <Container className="flex flex-col gap-32">
        <div className="flex flex-col items-start gap-8">
          <span className="text-[11px] font-bold tracking-[0.3em] uppercase opacity-40">
            HAVE A PROJECT IN MIND?
          </span>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            onClick={() => playClick()}
            className="footer-title group relative inline-block group"
          >
            <h2 className="text-[14vw] md:text-[10vw] font-medium leading-[0.8] tracking-tighter uppercase transition-colors duration-500">
              LET&apos;S <span className="italic font-arsenica">WORK</span>{" "}
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
                  onClick={() => playClick()}
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
              {FOOTER_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium opacity-60 hover:opacity-100 transition-opacity"
                  onClick={() => playClick()}
                >
                  {link.name}
                </Link>
              ))}
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
            © {new Date().getFullYear()} M UMAIR KHAN. ALL RIGHTS RESERVED.
          </span>
          <span>DESIGNED & DEVELOPED WITH PASSION</span>
        </div>
      </Container>

      <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-background/5 to-transparent pointer-events-none" />
    </footer>
  );
};

export default Footer;
