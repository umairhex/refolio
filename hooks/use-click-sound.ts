"use client";

import useSound from "use-sound";
import { SOUND_PATHS } from "@/app/constants/sounds";

export const useClickSound = () => {
  const [playClick] = useSound(SOUND_PATHS.click, { volume: 0.2 });
  return playClick;
};
