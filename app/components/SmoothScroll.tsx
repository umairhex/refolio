"use client";

import { usePathname } from "next/navigation";
import { useEffect, ReactNode } from "react";
import { ReactLenis, useLenis } from "lenis/react";

function ScrollToTop() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  return null;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <ScrollToTop />
      {children}
    </ReactLenis>
  );
}
