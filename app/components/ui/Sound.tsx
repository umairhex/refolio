"use client";

import React from "react";
import Link, { LinkProps } from "next/link";
import { useClickSound } from "@/hooks/use-click-sound";


const useSoundHandler = <T extends HTMLElement>(onClick?: (e: React.MouseEvent<T>) => void) => {
  const playClick = useClickSound();

  const handleClick = async (e: React.MouseEvent<T>) => {
    await playClick();
    if (onClick) {
      onClick(e);
    }
  };

  return handleClick;
};

const SoundButton = ({ children, onClick, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const handleClick = useSoundHandler<HTMLButtonElement>(onClick);
  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
};

interface SoundLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  style?: React.CSSProperties;
  tabIndex?: number;
  onMouseEnter?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  ref?: React.Ref<HTMLAnchorElement>;
}

const SoundLink = ({ children, onClick, ref, ...props }: SoundLinkProps) => {
  const handleClick = useSoundHandler<HTMLAnchorElement>(onClick);
  return (
    <Link ref={ref} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};

interface SoundAnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  ref?: React.Ref<HTMLAnchorElement>;
}

const SoundAnchor = ({ children, onClick, ref, ...props }: SoundAnchorProps) => {
  const handleClick = useSoundHandler<HTMLAnchorElement>(onClick);
  return (
    <a ref={ref} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};

export const Sound = {
  Button: SoundButton,
  Link: SoundLink,
  Anchor: SoundAnchor,
};
