"use client";

import React, { forwardRef } from "react";
import { useClickSound } from "@/hooks/use-click-sound";

interface SoundAnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

export const SoundAnchor = forwardRef<HTMLAnchorElement, SoundAnchorProps>(
  ({ children, onClick, ...props }, ref) => {
    const playClick = useClickSound();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      playClick();
      if (onClick) {
        onClick(e);
      }
    };

    return (
      <a ref={ref} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  },
);

SoundAnchor.displayName = "SoundAnchor";
