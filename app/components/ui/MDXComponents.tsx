import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import type { ReactNode } from "react";

export const mdxComponents: MDXComponents = {
  h1: ({ children }: { children?: ReactNode }) => (
    <h1 className="font-arsenica text-5xl md:text-7xl font-medium tracking-tighter mt-16 mb-8 uppercase italic leading-[0.9]">
      {children}
    </h1>
  ),
  h2: ({ children }: { children?: ReactNode }) => (
    <h2 className="font-arsenica text-4xl md:text-5xl font-medium tracking-tighter mt-16 mb-6 uppercase">
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: ReactNode }) => (
    <h3 className="font-arsenica text-2xl md:text-3xl font-medium tracking-tighter mt-12 mb-4 italic">
      {children}
    </h3>
  ),
  p: ({ children }: { children?: ReactNode }) => (
    <p className="text-base md:text-lg leading-relaxed opacity-80 mb-8 max-w-[800px] font-medium tracking-wide">
      {children}
    </p>
  ),
  a: ({ href, children }: { href?: string; children?: ReactNode }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline decoration-foreground/30 hover:decoration-foreground transition-colors font-bold"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }: { children?: ReactNode }) => (
    <blockquote className="relative my-24 pl-8 md:pl-12 border-l-4 border-foreground max-w-[850px] py-4 overflow-visible">
      <div className="absolute -top-12 -left-6 text-[180px] font-arsenica opacity-[0.03] leading-none select-none pointer-events-none"></div>
      <div className="relative z-10 [&_p]:text-3xl! [&_p]:md:text-5xl! [&_p]:font-arsenica! [&_p]:italic! [&_p]:opacity-100! [&_p]:leading-[1.1]! [&_p]:tracking-tighter! [&_p]:mb-0!">
        {children}
      </div>
    </blockquote>
  ),
  ul: ({ children }: { children?: ReactNode }) => (
    <ul className="flex flex-col gap-4 list-none mb-10 max-w-[800px]">
      {children}
    </ul>
  ),
  ol: ({ children }: { children?: ReactNode }) => (
    <ol className="flex flex-col gap-4 list-decimal pl-5 mb-10 max-w-[800px] opacity-80 text-base md:text-lg">
      {children}
    </ol>
  ),
  li: ({ children }: { children?: ReactNode }) => (
    <li className="flex items-start gap-5 text-base md:text-lg opacity-80 group">
      <div className="mt-[10px] w-2 h-2 rounded-full border border-foreground group-hover:bg-foreground shrink-0 transition-colors" />
      <span className="leading-relaxed font-medium tracking-wide">
        {children}
      </span>
    </li>
  ),
  pre: (props: React.ComponentPropsWithoutRef<"pre">) => (
    <div className="relative group max-w-[850px] my-12 shadow-2xl rounded-sm overflow-hidden border border-foreground/10 bg-[#0E0E0E]">
      <div className="w-full h-8 flex items-center gap-2 px-4 shadow-xl select-none bg-[#161616] border-b border-white/5">
        <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
        <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
        <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
      </div>
      <pre
        {...props}
        className="p-6 md:p-8 overflow-x-auto text-[13px] md:text-sm font-mono font-medium opacity-90 leading-loose selection:bg-white/20 selection:text-white"
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
        className="px-1.5 py-0.5 rounded-sm bg-foreground/10 text-[0.85em] font-mono tracking-wider text-foreground mx-1"
      />
    );
  },
  img: (props: React.ComponentPropsWithoutRef<"img">) => (
    <div className="relative w-full max-w-[900px] aspect-video my-16 bg-muted overflow-hidden shadow-2xl">
      {props.src && (
        <Image
          src={props.src as string}
          alt={props.alt || "Article graphic"}
          fill
          className="object-cover scale-100 hover:scale-105 transition-transform duration-1000 ease-expo-out grayscale hover:grayscale-0"
        />
      )}
    </div>
  ),
};
