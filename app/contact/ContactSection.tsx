'use client';

import { Mail, ArrowRight } from "lucide-react";
import { CONTACT_EMAIL, SOCIAL_PROFILES } from "@/constants";
import SocialLinkCard from "../components/ui/SocialLinkCard";
import { useClickSound } from "@/hooks/use-click-sound";

export default function ContactSection() {
  const playClick = useClickSound();

  return (
    <div className="mt-32 grid grid-cols-1 gap-20 lg:grid-cols-2">
      <div className="flex flex-col gap-20">
        <div className="contact-reveal flex flex-col gap-8">
          <span className="label-accent tracking-[0.3em]">
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
          <span className="label-accent tracking-[0.3em]">
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

      <div className="contact-reveal bg-foreground/2 border-foreground/5 flex h-full min-h-125x-col justify-between border p-12 md:p-20">
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
  );
}
