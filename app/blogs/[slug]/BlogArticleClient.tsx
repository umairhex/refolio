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
    <main ref={containerRef} className="bg-background min-h-screen">
      <Navbar />

      <PageSection className="pt-40 pb-20">
        <Container className="border-foreground/10 flex flex-col gap-16 border-b pb-20">
          <div className="article-header-meta flex flex-col justify-between gap-12 md:flex-row md:items-end">
            <div className="flex flex-col gap-4">
              <span className="label-accent tracking-[0.3em]">
                DATE
              </span>
              <span className="text-sm font-bold tracking-widest uppercase opacity-80">
                {post.date}
              </span>
            </div>

            <div className="flex flex-col gap-4 md:items-end">
              <span className="label-accent tracking-[0.3em]">
                DETAILS
              </span>
              <div className="flex items-center gap-6">
                <span className="text-sm font-bold tracking-widest uppercase opacity-80">
                  {post.category}
                </span>
                <span className="text-[10px] opacity-40">—</span>
                <span className="text-sm font-bold tracking-widest uppercase opacity-80">
                  {post.readingTime}
                </span>
              </div>
            </div>
          </div>

          <div className="overflow-hidden">
            <h1 className="font-arsenica max-w-5xl text-[10vw] leading-[0.8] font-medium tracking-tighter uppercase italic md:text-[6vw] lg:text-[7vw]">
              {post.title.split(" ").map((word, i) => (
                <span key={i} className="inline-block overflow-hidden pb-4">
                  <span className="article-title-word inline-block pr-[2vw]">{word}</span>
                </span>
              ))}
            </h1>
          </div>
        </Container>
      </PageSection>

      <PageSection className="pb-32">
        <Container>
          <div className="article-hero-image bg-muted relative mb-32 aspect-video w-full overflow-hidden shadow-2xl md:aspect-21/9">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="scale-105 object-cover"
              priority
            />
          </div>

          <article className="prose prose-invert prose-headings:font-normal prose-h1:text-foreground prose-h2:text-foreground selection:bg-foreground/20 selection:text-foreground mx-auto w-full max-w-212.5 leading-relaxed">
            {children}
          </article>
        </Container>
      </PageSection>

      <Footer />
    </main>
  );
}
