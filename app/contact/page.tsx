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
    <main ref={containerRef} className="bg-background min-h-screen">
      <Navbar />

      <PageSection className="pt-40 pb-64">
        <Container>
          <div className="border-foreground/10 flex flex-col gap-8 overflow-hidden border-b pb-20">
            <div className="overflow-hidden">
              <h1 className="font-arsenica contact-reveal text-[15vw] leading-[0.8] font-medium tracking-tighter uppercase italic md:text-[10vw]">
                Let&apos;s
              </h1>
            </div>
            <div className="overflow-hidden">
              <h1 className="contact-reveal text-[15vw] leading-[0.8] font-medium tracking-tighter uppercase md:text-[10vw]">
                Connect
              </h1>
            </div>
          </div>

          <div className="mt-32 grid grid-cols-1 gap-20 lg:grid-cols-2">
            <div className="flex flex-col gap-20">
              <div className="contact-reveal flex flex-col gap-8">
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">
                  DIRECT EMAIL
                </span>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  onClick={() => playClick()}
                  className="group flex items-center gap-4 text-lg font-medium tracking-tight break-all transition-all duration-300 hover:italic sm:text-2xl md:gap-6 md:text-3xl lg:text-4xl"
                >
                  <div className="border-foreground/10 group-hover:bg-foreground group-hover:text-background shrink-0 rounded-full border p-3 transition-colors duration-500 md:p-4">
                    <Mail size={24} />
                  </div>
                  {CONTACT_EMAIL}
                </a>
              </div>

              <div className="contact-reveal flex flex-col gap-8">
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

            <div className="contact-reveal bg-foreground/2 border-foreground/5 flex h-full min-h-[500px] flex-col justify-between border p-12 md:p-20">
              <div className="flex flex-col gap-8">
                <h3 className="text-3xl leading-tight font-medium tracking-tighter md:text-5xl">
                  READY TO BRING <br /> YOUR IDEAS <br />{" "}
                  <span className="font-arsenica italic">TO LIFE?</span>
                </h3>
                <p className="max-w-sm text-sm leading-relaxed opacity-50 md:text-base">
                  I&apos;m currently accepting new projects and collaborations. If you have a
                  vision, let&apos;s make it a reality.
                </p>
              </div>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                onClick={() => playClick()}
                className="group flex items-center gap-6 text-[11px] font-bold tracking-[0.4em] uppercase"
              >
                START A PROJECT
                <div className="border-foreground group-hover:bg-foreground group-hover:text-background flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-500">
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
