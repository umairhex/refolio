"use client";

import React, { forwardRef } from "react";
import Link, { LinkProps } from "next/link";
import { useClickSound } from "@/hooks/use-click-sound";

const useSoundHandler = <T extends HTMLElement>(onClick?: (e: React.MouseEvent<T>) => void) => {
  const playClick = useClickSound();

  const handleClick = (e: React.MouseEvent<T>) => {
    playClick(); // Fire and forget
    if (onClick) {
      onClick(e);
    }
  };

  return handleClick;
};

export const SoundButton = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ children, onClick, ...props }, ref) => {
    const handleClick = useSoundHandler<HTMLButtonElement>(onClick);
    return (
      <button ref={ref} onClick={handleClick} {...props}>
        {children}
      </button>
    );
  }
);
SoundButton.displayName = "SoundButton";

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
    const handleClick = useSoundHandler<HTMLAnchorElement>(onClick);
    return (
      <Link ref={ref} onClick={handleClick} {...props}>
        {children}
      </Link>
    );
  }
);
SoundLink.displayName = "SoundLink";

export const SoundAnchor = forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ children, onClick, ...props }, ref) => {
    const handleClick = useSoundHandler<HTMLAnchorElement>(onClick);
    return (
      <a ref={ref} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }
);
SoundAnchor.displayName = "SoundAnchor";

