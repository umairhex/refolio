import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import SmoothScroll from "@/app/components/SmoothScroll";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const aresenica = localFont({
  src: "../public/arsenica.ttf",
  style: "regular",
  variable: "--font-arsenica",
});

export const metadata: Metadata = {
  title: "Umair Hex — Full-Stack Engineer & Creative Technologist",
  description:
    "I'm Umair, a full-stack engineer crafting high-performance digital experiences with a focus on motion, brutalist aesthetics, and precision engineering.",
};

import { TooltipProvider } from "@/components/ui/tooltip";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-sans", inter.variable)}
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${aresenica.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={0}>
            <SmoothScroll>{children}</SmoothScroll>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
