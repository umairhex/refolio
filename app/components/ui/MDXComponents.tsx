import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import type { ReactNode } from "react";
import { SoundAnchor } from "./SoundAnchor";

export const createMDXComponents = (overrides: MDXComponents = {}): MDXComponents => ({
  ...mdxComponents,
  ...overrides,
});

export const mdxComponents: MDXComponents = {
  h1: ({ children }: { children?: ReactNode }) => (
    <h1 className="font-arsenica mt-16 mb-8 text-5xl leading-[0.9] font-medium tracking-tighter uppercase italic md:text-7xl">
      {children}
    </h1>
  ),
  h2: ({ children }: { children?: ReactNode }) => (
    <h2 className="font-arsenica mt-16 mb-6 text-4xl font-medium tracking-tighter uppercase md:text-5xl">
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: ReactNode }) => (
    <h3 className="font-arsenica mt-12 mb-4 text-2xl font-medium tracking-tighter italic md:text-3xl">
      {children}
    </h3>
  ),
  p: ({ children }: { children?: ReactNode }) => (
    <p className="mb-8 max-w-200 text-base leading-relaxed font-medium tracking-wide opacity-80 md:text-lg">
      {children}
    </p>
  ),
  a: ({ href, children }: { href?: string; children?: ReactNode }) => (
    <SoundAnchor
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="decoration-foreground/30 hover:decoration-foreground font-bold underline transition-colors"
    >
      {children}
    </SoundAnchor>
  ),
  blockquote: ({ children }: { children?: ReactNode }) => (
    <blockquote className="border-foreground relative my-24 max-w-212.5 overflow-visible border-l-4 py-4 pl-8 md:pl-12">
      <div className="font-arsenica pointer-events-none absolute -top-12 -left-6 text-[180px] leading-none opacity-[0.03] select-none"></div>
      <div className="[&_p]:font-arsenica! relative z-10 [&_p]:mb-0! [&_p]:text-3xl! [&_p]:leading-[1.1]! [&_p]:tracking-tighter! [&_p]:italic! [&_p]:opacity-100! [&_p]:md:text-5xl!">
        {children}
      </div>
    </blockquote>
  ),
  ul: ({ children }: { children?: ReactNode }) => (
    <ul className="mb-10 flex max-w-200 list-none flex-col gap-4">{children}</ul>
  ),
  ol: ({ children }: { children?: ReactNode }) => (
    <ol className="mb-10 flex max-w-200 list-decimal flex-col gap-4 pl-5 text-base opacity-80 md:text-lg">
      {children}
    </ol>
  ),
  li: ({ children }: { children?: ReactNode }) => (
    <li className="group flex items-start gap-5 text-base opacity-80 md:text-lg">
      <div className="border-foreground group-hover:bg-foreground mt-2.5 h-2 w-2 shrink-0 rounded-full border transition-colors" />
      <span className="leading-relaxed font-medium tracking-wide">{children}</span>
    </li>
  ),
  pre: (props: React.ComponentPropsWithoutRef<"pre">) => (
    <div className="group border-foreground/10 relative my-12 max-w-212.5 overflow-hidden rounded-sm border bg-[#0E0E0E] shadow-2xl">
      <div className="flex h-8 w-full items-center gap-2 border-b border-white/5 bg-[#161616] px-4 shadow-xl select-none">
        <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
      </div>
      <pre
        {...props}
        className="overflow-x-auto p-6 font-mono text-[13px] leading-loose font-medium opacity-90 selection:bg-white/20 selection:text-white md:p-8 md:text-sm"
      >
        {props.children}
      </pre>
    </div>
  ),
  code: (props: React.ComponentPropsWithoutRef<"code">) => {
    if (props.className && props.className.includes("language-")) {
      return <code {...props} />;
    }

    return (
      <code
        {...props}
        className="bg-foreground/10 text-foreground mx-1 rounded-sm px-1.5 py-0.5 font-mono text-[0.85em] tracking-wider"
      />
    );
  },
  img: (props: React.ComponentPropsWithoutRef<"img">) => (
    <div className="bg-muted relative my-16 aspect-video w-full max-w-225 overflow-hidden shadow-2xl">
      {props.src && (
        <Image
          src={props.src as string}
          alt={props.alt || "Article graphic"}
          fill
          className="ease-expo-out scale-100 object-cover grayscale transition-transform duration-1000 hover:scale-105 hover:grayscale-0"
        />
      )}
    </div>
  ),
};
