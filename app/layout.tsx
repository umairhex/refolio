import React, { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import SmoothScroll from "@/app/components/SmoothScroll";
import Preloader from "@/app/components/ui/Preloader";
import { LoadingStoreProvider } from "@/hooks/use-loading-store";
import { SoundProvider } from "@/hooks/use-sound-store";
import { AnnouncementProvider } from "@/hooks/use-announcement-store";

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
  metadataBase: new URL("https://umairrx.dev"),
  title: {
    default: "M UMAIR KHAN — Full-Stack Engineer & AI Architect",
    template: "%s | M UMAIR KHAN",
  },
  description:
    "I'm M Umair Khan, a full-stack engineer specialized in high-performance SaaS products, AI integration, and rapid feature delivery.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

import { TooltipProvider } from "@/components/ui/tooltip";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", inter.variable)}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${aresenica.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LoadingStoreProvider>
            <AnnouncementProvider>
              <SoundProvider>
                <Preloader />
                <TooltipProvider delayDuration={0}>
                  <Suspense fallback={null}>
                    <SmoothScroll>{children}</SmoothScroll>
                  </Suspense>
                </TooltipProvider>
              </SoundProvider>
            </AnnouncementProvider>
          </LoadingStoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
