"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { useThemeScroll } from "@/hooks/use-theme-scroll";
import { CONTACT_EMAIL, SOCIAL_LINKS, FOOTER_LINKS } from "@/constants";
import { ArrowUpRight } from "lucide-react";
import Container from "@/app/components/ui/Container";
import { SoundLink } from "@/app/components/ui/SoundLink";
import { SoundAnchor } from "@/app/components/ui/SoundAnchor";
import { animateFromViewport } from "@/lib/animations";

const Footer = ({ disableBodyTheme = false }: { disableBodyTheme?: boolean }) => {
  const footerRef = useRef<HTMLElement>(null);

  useThemeScroll(footerRef, { enabled: !disableBodyTheme });

  useGSAP(
    () => {
      animateFromViewport(".footer-title", {
        yPercent: 50,
        opacity: 0,
        rotateX: -30,
        duration: 1.5,
        ease: "power4.out",
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
          <SoundAnchor
            href={`mailto:${CONTACT_EMAIL}`}
            className="footer-title group relative inline-block focus:outline-none"
          >
            <h2 className="text-[14vw] leading-[0.8] font-medium tracking-tighter uppercase transition-colors duration-500 md:text-[10vw]">
              LET&apos;S <span className="font-arsenica italic">WORK</span> <br /> TOGETHER
            </h2>
            <div className="absolute top-0 -right-20 opacity-0 transition-all duration-500 group-hover:translate-x-4 group-hover:opacity-100 md:-right-32">
              <ArrowUpRight className="h-20 w-20 stroke-1 md:h-32 md:w-32" />
            </div>
          </SoundAnchor>
        </div>

        <div className="border-background/10 grid grid-cols-1 gap-16 border-t pt-16 md:grid-cols-4 md:gap-8">
          <div className="flex flex-col gap-6">
            <span className="label-accent tracking-widest">
              SOCIALS
            </span>
            <div className="flex flex-col gap-3">
              {Object.entries(SOCIAL_LINKS).map(([key, href]) => (
                <SoundAnchor
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium capitalize opacity-60 transition-opacity hover:opacity-100 focus:outline-none"
                >
                  {key}
                </SoundAnchor>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <span className="label-accent tracking-widest">
              SITEMAP
            </span>
            <div className="flex flex-col gap-3">
              {FOOTER_LINKS.map((link) => (
                <SoundLink
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium opacity-60 transition-opacity hover:opacity-100 focus:outline-none"
                >
                  {link.name}
                </SoundLink>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6 md:col-span-2 md:items-end">
            <span className="label-accent tracking-widest">
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
