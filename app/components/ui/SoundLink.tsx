"use client";

import Link, { LinkProps } from "next/link";
import React, { forwardRef } from "react";
import { useClickSound } from "@/hooks/use-click-sound";

interface SoundLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  style?: React.CSSProperties;
  tabIndex?: number;
  onMouseEnter?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const SoundLink = forwardRef<HTMLAnchorElement, SoundLinkProps>(
  ({ children, onClick, ...props }, ref) => {
    const playClick = useClickSound();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      playClick();
      if (onClick) {
        onClick(e);
      }
    };

    return (
      <Link ref={ref} onClick={handleClick} {...props}>
        {children}
      </Link>
    );
  },
);

SoundLink.displayName = "SoundLink";
