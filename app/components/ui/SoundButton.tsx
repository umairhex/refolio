"use client";

import { useClickSound } from "@/hooks/use-click-sound";

interface SoundButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const SoundButton = ({ children, onClick, ...props }: SoundButtonProps) => {
  const playClick = useClickSound();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await playClick();
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
};
