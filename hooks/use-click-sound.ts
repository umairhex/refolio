"use client";

import useSound from "use-sound";
import { CLICK_SOUND } from "@/app/constants/sounds";

export const useClickSound = () => {
  const [playClick] = useSound(CLICK_SOUND, { volume: 0.2 });
  return playClick;
};
