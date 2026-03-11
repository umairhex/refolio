"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import PageSection from "@/app/components/ui/PageSection";
import Container from "@/app/components/ui/Container";
import type { BlogPost } from "@/lib/mdx";

export default function BlogArticleClient({
  post,
  children,
}: {
  post: BlogPost;
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      gsap.set(".article-title-word", { y: 100, opacity: 0 });
      gsap.set(".article-header-meta", { opacity: 0, y: 20 });
      gsap.set(".article-hero-image", { clipPath: "inset(100% 0 0 0)" });

      tl.to(".article-title-word", {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.05,
        ease: "power4.out",
        delay: 0.2,
      })
        .to(
          ".article-header-meta",
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.6",
        )
        .to(
          ".article-hero-image",
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.5,
            ease: "expo.inOut",
          },
          "-=1",
        );
    },
    { scope: containerRef },
  );

  return (
    <main ref={containerRef} className="min-h-screen bg-background">
      <Navbar />

      <PageSection className="pt-40 pb-20">
        <Container className="flex flex-col gap-16 border-b border-foreground/10 pb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 article-header-meta">
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">
                DATE
              </span>
              <span className="text-sm font-bold opacity-80 uppercase tracking-widest">
                {post.date}
              </span>
            </div>
            
            <div className="flex flex-col md:items-end gap-4">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">
                DETAILS
              </span>
              <div className="flex items-center gap-6">
                <span className="text-sm font-bold opacity-80 uppercase tracking-widest">
                  {post.category}
                </span>
                <span className="text-[10px] opacity-40">—</span>
                <span className="text-sm font-bold opacity-80 uppercase tracking-widest">
                  {post.readingTime}
                </span>
              </div>
            </div>
          </div>

          <div className="overflow-hidden">
            <h1 className="font-arsenica text-[10vw] md:text-[6vw] lg:text-[7vw] font-medium leading-[0.8] tracking-tighter uppercase italic max-w-5xl">
              {post.title.split(" ").map((word, i) => (
                <span key={i} className="inline-block overflow-hidden pb-4">
                  <span className="inline-block article-title-word pr-[2vw]">
                    {word}
                  </span>
                </span>
              ))}
            </h1>
          </div>
        </Container>
      </PageSection>

      <PageSection className="pb-32">
        <Container>
          <div className="w-full aspect-video md:aspect-21/9 relative mb-32 article-hero-image overflow-hidden shadow-2xl bg-muted">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover scale-105"
              priority
            />
          </div>

          <article className="prose prose-invert max-w-[850px] mx-auto w-full prose-headings:font-normal prose-h1:text-foreground prose-h2:text-foreground leading-relaxed selection:bg-foreground/20 selection:text-foreground">
            {children}
          </article>
        </Container>
      </PageSection>

      <Footer />
    </main>
  );
}
