"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { useThemeScroll } from "@/hooks/use-theme-scroll";
import { CONTACT_EMAIL, SOCIAL_LINKS, FOOTER_LINKS } from "@/constants";
import { ArrowUpRight } from "lucide-react";
import Container from "@/app/components/ui/Container";
import { useClickSound } from "@/hooks/use-click-sound";

const Footer = ({ disableBodyTheme = false }: { disableBodyTheme?: boolean }) => {
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
      className="bg-foreground text-background relative w-full overflow-hidden px-6 pt-40 pb-12 md:px-12 lg:px-24"
    >
      <Container className="flex flex-col gap-32">
        <div className="flex flex-col items-start gap-8">
          <span className="text-[11px] font-bold tracking-[0.3em] uppercase opacity-40">
            HAVE A PROJECT IN MIND?
          </span>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            onClick={() => playClick()}
            className="footer-title group group relative inline-block"
          >
            <h2 className="text-[14vw] leading-[0.8] font-medium tracking-tighter uppercase transition-colors duration-500 md:text-[10vw]">
              LET&apos;S <span className="font-arsenica italic">WORK</span> <br /> TOGETHER
            </h2>
            <div className="absolute top-0 -right-20 opacity-0 transition-all duration-500 group-hover:translate-x-4 group-hover:opacity-100 md:-right-32">
              <ArrowUpRight className="h-20 w-20 stroke-1 md:h-32 md:w-32" />
            </div>
          </a>
        </div>

        <div className="border-background/10 grid grid-cols-1 gap-16 border-t pt-16 md:grid-cols-4 md:gap-8">
          <div className="flex flex-col gap-6">
            <span className="text-[10px] font-bold tracking-widest uppercase opacity-40">
              SOCIALS
            </span>
            <div className="flex flex-col gap-3">
              {Object.entries(SOCIAL_LINKS).map(([key, href]) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium capitalize opacity-60 transition-opacity hover:opacity-100"
                  onClick={() => playClick()}
                >
                  {key}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <span className="text-[10px] font-bold tracking-widest uppercase opacity-40">
              SITEMAP
            </span>
            <div className="flex flex-col gap-3">
              {FOOTER_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium opacity-60 transition-opacity hover:opacity-100"
                  onClick={() => playClick()}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6 md:col-span-2 md:items-end">
            <span className="text-[10px] font-bold tracking-widest uppercase opacity-40">
              LOCAL TIME
            </span>
            <p className="text-3xl font-medium tracking-tighter md:text-5xl">Islamabad, PK</p>
          </div>
        </div>

        <div className="border-background/5 flex flex-col items-center justify-between gap-6 border-t pt-12 text-[10px] font-bold tracking-widest opacity-30 md:flex-row">
          <span>© {new Date().getFullYear()} M UMAIR KHAN. ALL RIGHTS RESERVED.</span>
          <span>DESIGNED & DEVELOPED WITH PASSION</span>
        </div>
      </Container>

      <div className="from-background/5 pointer-events-none absolute top-0 right-0 h-full w-1/2 bg-linear-to-l to-transparent" />
    </footer>
  );
};

export default Footer;
