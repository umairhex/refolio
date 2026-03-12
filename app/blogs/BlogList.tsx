"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import PageSection from "../components/ui/PageSection";
import Container from "../components/ui/Container";
import type { BlogPost } from "@/lib/mdx";

const BlogList = ({ posts }: { posts: BlogPost[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      gsap.set(".blog-header-text", { y: 100, opacity: 0 });
      gsap.set(".blog-row", { y: 50, opacity: 0 });

      tl.to(".blog-header-text", {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.5,
      }).to(
        ".blog-row",
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "power3.out",
        },
        "-=0.6",
      );
    },
    { scope: containerRef },
  );

  return (
    <main ref={containerRef} className="bg-background min-h-screen">
      <Navbar />

      <PageSection className="pt-40 pb-20">
        <Container className="border-foreground/10 flex flex-col gap-6 border-b pb-20">
          <div className="overflow-hidden">
            <h1 className="font-arsenica blog-header-text text-[15vw] leading-[0.8] font-medium tracking-tighter uppercase italic md:text-[8vw]">
              Digital
            </h1>
          </div>
          <div className="flex items-end justify-between overflow-hidden">
            <h1 className="blog-header-text text-[15vw] leading-[0.8] font-medium tracking-tighter uppercase md:text-[8vw]">
              Journal
            </h1>
            <span className="blog-header-text hidden pb-4 text-[11px] font-bold tracking-[0.3em] uppercase opacity-40 md:block">
              ({posts.length.toString().padStart(2, "0")}) — ENTRIES
            </span>
          </div>
        </Container>
      </PageSection>

      <PageSection className="pb-64">
        <Container className="flex flex-col">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blogs/${post.slug}`}
              className="blog-row group border-foreground/5 hover:border-foreground relative flex flex-col justify-between border-b px-4 py-12 transition-colors duration-500 md:flex-row md:items-center md:py-16"
            >
              <div className="z-10 flex w-full items-start gap-6 md:w-3/5 md:items-center md:gap-16">
                <span className="mt-1 text-[10px] font-bold opacity-30 transition-opacity group-hover:opacity-100 md:mt-0 md:text-sm">
                  {(posts.length - i).toString().padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-3">
                  <h2 className="font-arsenica block origin-left pr-4 text-3xl font-medium tracking-tight uppercase transition-all duration-500 group-hover:translate-x-2 group-hover:-rotate-1 group-hover:-skew-x-12 md:text-5xl">
                    {post.title}
                  </h2>
                  <p className="mt-2 hidden max-w-lg text-sm font-medium opacity-50 md:block md:text-base">
                    {post.summary}
                  </p>

                  <div className="mt-4 flex translate-y-2 transform items-center gap-6 opacity-0 transition-opacity duration-500 group-hover:translate-y-0 group-hover:opacity-80">
                    <span className="text-[10px] font-bold tracking-widest uppercase opacity-60">
                      {post.date}
                    </span>
                    <span className="text-[10px] font-bold tracking-widest uppercase opacity-60">
                      {post.readingTime}
                    </span>
                  </div>
                </div>
              </div>

              <div className="ease-power4.out bg-muted pointer-events-none fixed top-1/2 right-20 z-0 hidden h-48 w-80 -translate-y-1/2 scale-50 overflow-hidden rounded-md opacity-0 shadow-2xl transition-transform duration-700 group-hover:scale-100 group-hover:opacity-100 lg:block">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="bg-background object-cover text-transparent grayscale transition-all duration-700 group-hover:grayscale-0"
                />
              </div>

              <div className="bg-foreground/0 group-hover:bg-foreground/2 absolute inset-0 -z-10 transition-colors duration-500" />
            </Link>
          ))}
        </Container>
      </PageSection>

      <Footer />
    </main>
  );
};

export default BlogList;
