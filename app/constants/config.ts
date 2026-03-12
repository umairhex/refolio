export const ANIMATION_CONFIG = {
  scrollTrigger: {
    defaultStart: "top 85%",
    defaultDuration: 0.8,
  },
  hero: {
    duration: 1.2,
    stagger: 0.1,
  },
  section: {
    duration: 0.8,
    stagger: 0.05,
  },
} as const;

export const COMPONENT_CONFIG = {
  work: {
    featuredProjectsLimit: 4,
  },
  experience: {
    itemsPerRow: 3,
  },
} as const;

export const SOUND_CONFIG = {
  click: {
    volume: 0.2,
    playbackRate: 1.0,
  },
} as const;
