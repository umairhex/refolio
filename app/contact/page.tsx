"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { CONTACT_EMAIL, SOCIAL_PROFILES } from "@/constants";
import { Mail, ArrowRight } from "lucide-react";
import { useClickSound } from "@/hooks/use-click-sound";
import SocialLinkCard from "../components/ui/SocialLinkCard";
import PageSection from "../components/ui/PageSection";
import Container from "../components/ui/Container";

const ContactPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playClick = useClickSound();

  useGSAP(
    () => {
      const tl = gsap.timeline();
      gsap.set(".contact-reveal", { y: 100, opacity: 0 });
      tl.to(".contact-reveal", {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.5,
      });
    },
    { scope: containerRef },
  );

  return (
    <main ref={containerRef} className="min-h-screen bg-background">
      <Navbar />

      <PageSection className="pt-40 pb-64">
        <Container>
          <div className="flex flex-col gap-8 border-b border-foreground/10 pb-20 overflow-hidden">
            <div className="overflow-hidden">
              <h1
                className="font-arsenica contact-reveal text-[15vw] md:text-[10vw] font-medium leading-[0.8] tracking-tighter uppercase italic"
              >
                Let&apos;s
              </h1>
            </div>
            <div className="overflow-hidden">
              <h1 className="contact-reveal text-[15vw] md:text-[10vw] font-medium leading-[0.8] tracking-tighter uppercase">
                Connect
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mt-32">
            <div className="flex flex-col gap-20">
              <div className="flex flex-col gap-8 contact-reveal">
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">
                  DIRECT EMAIL
                </span>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="group flex items-center gap-4 md:gap-6 text-lg sm:text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight hover:italic transition-all duration-300 break-all"
                >
                  <div className="p-3 md:p-4 rounded-full border border-foreground/10 group-hover:bg-foreground group-hover:text-background transition-colors duration-500 shrink-0">
                    <Mail size={24} />
                  </div>
                  {CONTACT_EMAIL}
                </a>
              </div>

              <div className="flex flex-col gap-8 contact-reveal">
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">
                  SOCIALS
                </span>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  {SOCIAL_PROFILES.map((profile) => (
                    <SocialLinkCard
                      key={profile.key}
                      profile={profile}
                      onClick={() => playClick()}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between contact-reveal bg-foreground/2 p-12 md:p-20 border border-foreground/5 h-full min-h-[500px]">
              <div className="flex flex-col gap-8">
                <h3 className="text-3xl md:text-5xl font-medium tracking-tighter leading-tight">
                  READY TO BRING <br /> YOUR IDEAS <br />{" "}
                  <span className="italic font-arsenica">
                    TO LIFE?
                  </span>
                </h3>
                <p className="text-sm md:text-base opacity-50 max-w-sm leading-relaxed">
                  I&apos;m currently accepting new projects and collaborations.
                  If you have a vision, let&apos;s make it a reality.
                </p>
              </div>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="group flex items-center gap-6 text-[11px] font-bold tracking-[0.4em] uppercase"
              >
                START A PROJECT
                <div className="w-12 h-12 rounded-full border border-foreground flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all duration-500">
                  <ArrowRight size={16} />
                </div>
              </a>
            </div>
          </div>
        </Container>
      </PageSection>

      <Footer disableBodyTheme />
    </main>
  );
};

export default ContactPage;
