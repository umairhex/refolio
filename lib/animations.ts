import { gsap } from "./gsap";

export interface AnimationOptions extends gsap.TweenVars {
  once?: boolean;
  trigger?: string | HTMLElement;
}

export const animateFromViewport = (
  selector: string | HTMLElement | null,
  options: AnimationOptions = {},
) => {
  if (!selector) return;

  if (shouldReduceMotion()) {
    gsap.set(selector, { y: 0, opacity: 1 });
    return;
  }

  const {
    y = 40,
    opacity = 0,
    duration = 0.8,
    delay = 0,
    stagger = 0,
    ease = "power2.out",
    once = true,
    trigger,
    ...rest
  } = options;

  gsap.from(selector, {
    y,
    opacity,
    duration,
    delay,
    stagger,
    ease,
    ...rest,
    scrollTrigger: {
      trigger: trigger || (typeof selector === "string" ? selector : (selector as HTMLElement)),
      start: "top 85%",
      once,
    },
  });
};

export const createTimeline = (options: gsap.TimelineVars = {}) => gsap.timeline(options);

export const animateTo = (selector: string | HTMLElement | null, values: gsap.TweenVars) => {
  if (!selector) return;
  if (values.duration === undefined) {
    gsap.set(selector, values);
  } else {
    gsap.to(selector, values);
  }
};

export const animateFrom = (selector: string | HTMLElement | null, values: gsap.TweenVars) => {
  if (!selector) return;
  gsap.from(selector, values);
};

export const animateFromTo = (
  selector: string | HTMLElement | null,
  fromValues: gsap.TweenVars,
  toValues: gsap.TweenVars,
) => {
  if (!selector) return;
  gsap.fromTo(selector, fromValues, toValues);
};

export const shouldReduceMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const toArray = <T = HTMLElement>(selector: string | object): T[] => {
  return gsap.utils.toArray<T>(selector);
};
