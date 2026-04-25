"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useIsMuted, useSoundActions } from "@/hooks/use-sound-store";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

export const SoundToggle = () => {
  const isMuted = useIsMuted();
  const { toggleMute } = useSoundActions();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
          className="text-foreground/40 hover:text-foreground relative flex h-10 w-10 items-center justify-center rounded-full transition-colors focus:outline-none"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={isMuted ? "muted" : "unmuted"}
              initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 20 }}
              transition={{ duration: 0.2 }}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </motion.div>
          </AnimatePresence>
          <motion.div
            className="bg-foreground/5 absolute inset-0 -z-10 rounded-full opacity-0"
            whileHover={{ opacity: 1, scale: 1.1 }}
          />
        </button>
      </TooltipTrigger>
      <TooltipContent>
        {isMuted ? "Sound Off" : "Sound On"}
      </TooltipContent>
    </Tooltip>
  );
};
