import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { RefObject } from "react";

export const useThemeScroll = (
  triggerRef: RefObject<HTMLElement | null>,
  options?: { invert?: boolean; enabled?: boolean },
) => {
  useGSAP(
    () => {
      if (!triggerRef.current) return;
      if (options?.enabled === false) return;

      const invert = options?.invert ?? false;
      const enterBg = invert ? "var(--background)" : "var(--foreground)";
      const enterText = invert ? "var(--foreground)" : "var(--background)";
      const leaveBg = invert ? "var(--foreground)" : "var(--background)";
      const leaveText = invert ? "var(--background)" : "var(--foreground)";

      /** Single body animation helper — DRY-006 fix. */
      const animateBody = (bg: string, color: string) =>
        gsap.to("body", { backgroundColor: bg, color, duration: 1 });

      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: "top center",
        end: "bottom center",
        onEnter:     () => animateBody(enterBg, enterText),
        onLeave:     () => animateBody(leaveBg, leaveText),
        onEnterBack: () => animateBody(enterBg, enterText),
        onLeaveBack: () => animateBody(leaveBg, leaveText),
      });
    },
    { scope: triggerRef },
  );
};
