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
    <main ref={containerRef} className="min-h-screen bg-background">
      <Navbar />

      <PageSection className="pt-40 pb-20">
        <Container className="flex flex-col gap-6 border-b border-foreground/10 pb-20">
          <div className="overflow-hidden">
            <h1 className="font-arsenica blog-header-text text-[15vw] md:text-[8vw] font-medium leading-[0.8] tracking-tighter uppercase italic">
              Digital
            </h1>
          </div>
          <div className="overflow-hidden flex justify-between items-end">
            <h1 className="blog-header-text text-[15vw] md:text-[8vw] font-medium leading-[0.8] tracking-tighter uppercase">
              Journal
            </h1>
            <span className="blog-header-text text-[11px] font-bold tracking-[0.3em] uppercase opacity-40 pb-4 hidden md:block">
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
              className="blog-row group relative flex flex-col md:flex-row md:items-center justify-between py-12 md:py-16 border-b border-foreground/5 transition-colors duration-500 hover:border-foreground px-4"
            >
              <div className="flex items-start md:items-center gap-6 md:gap-16 z-10 w-full md:w-3/5">
                <span className="text-[10px] md:text-sm font-bold opacity-30 group-hover:opacity-100 transition-opacity mt-1 md:mt-0">
                  {(posts.length - i).toString().padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-3">
                  <h2 className="font-arsenica text-3xl md:text-5xl font-medium tracking-tight uppercase block transition-all duration-500 group-hover:-skew-x-12 group-hover:-rotate-1 group-hover:translate-x-2 origin-left pr-4">
                    {post.title}
                  </h2>
                  <p className="text-sm md:text-base opacity-50 font-medium max-w-lg mt-2 hidden md:block">
                    {post.summary}
                  </p>

                  <div className="flex items-center gap-6 mt-4 opacity-0 group-hover:opacity-80 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0 transform">
                    <span className="text-[10px] font-bold tracking-widest uppercase opacity-60">
                      {post.date}
                    </span>
                    <span className="text-[10px] font-bold tracking-widest uppercase opacity-60">
                      {post.readingTime}
                    </span>
                  </div>
                </div>
              </div>

              <div className="fixed pointer-events-none opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 top-1/2 right-20 -translate-y-1/2 w-80 h-48 z-0 transition-transform duration-700 ease-power4.out hidden lg:block overflow-hidden shadow-2xl bg-muted rounded-md">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 bg-background text-transparent"
                />
              </div>

              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/2 transition-colors duration-500 -z-10" />
            </Link>
          ))}
        </Container>
      </PageSection>

      <Footer />
    </main>
  );
};

export default BlogList;
