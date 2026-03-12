import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { RefObject } from "react";

type ThemeScrollMode = "light-to-dark" | "dark-to-light";

interface UseThemeScrollOptions {
  mode?: ThemeScrollMode;

  enabled?: boolean;

  target?: string | HTMLElement;
}

const THEME_COLORS = {
  "light-to-dark": {
    enterBg: "var(--foreground)",
    enterText: "var(--background)",
    leaveBg: "var(--background)",
    leaveText: "var(--foreground)",
  },
  "dark-to-light": {
    enterBg: "var(--background)",
    enterText: "var(--foreground)",
    leaveBg: "var(--foreground)",
    leaveText: "var(--background)",
  },
} as const;

export const useThemeScroll = (
  triggerRef: RefObject<HTMLElement | null>,
  options?: UseThemeScrollOptions,
) => {
  useGSAP(
    () => {
      if (!triggerRef.current) return;
      if (options?.enabled === false) return;

      const { enterBg, enterText, leaveBg, leaveText } =
        THEME_COLORS[options?.mode ?? "light-to-dark"];
      const target = options?.target ?? "body";

      const animateBody = (bg: string, color: string) =>
        gsap.to(target, { backgroundColor: bg, color, duration: 1 });

      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: "top center",
        end: "bottom center",
        onEnter: () => animateBody(enterBg, enterText),
        onLeave: () => animateBody(leaveBg, leaveText),
        onEnterBack: () => animateBody(enterBg, enterText),
        onLeaveBack: () => animateBody(leaveBg, leaveText),
      });
    },
    { scope: triggerRef },
  );
};
