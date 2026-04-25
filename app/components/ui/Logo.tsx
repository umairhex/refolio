"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export const Logo = ({ className, width = 130, height = 40 }: LogoProps) => {
  return (
    <div className={cn("relative flex items-center", className)} style={{ width, height }}>
      {/* Light Theme Logo */}
      <Image
        src="/assets/logos/UmairSignatureBlackLogo.svg"
        alt="Umair Signature Logo"
        width={width}
        height={height}
        className="h-auto w-full object-contain dark:hidden"
        priority
      />
      {/* Dark Theme Logo */}
      <Image
        src="/assets/logos/UmairSignatureWhiteLogo.svg"
        alt="Umair Signature Logo"
        width={width}
        height={height}
        className="hidden h-auto w-full object-contain dark:block"
        priority
      />
    </div>
  );
};
