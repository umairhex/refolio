export const SOUND_PATHS = {
  click: "/sounds/click.mp3",
} as const;

export type SoundKey = keyof typeof SOUND_PATHS;
