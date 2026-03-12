"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { SoundButton } from "@/app/components/ui/SoundButton";

export const NavbarThemeSwitch = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setMounted(true);
    });
  }, []);

  return (
    <div className="text-foreground/40 hidden items-center gap-2 text-[10px] font-bold tracking-widest xl:flex">
      <Tooltip>
        <TooltipTrigger asChild>
          <SoundButton
            onClick={() => setTheme("light")}
            className={`transition-all focus:outline-none ${mounted && resolvedTheme === "light" ? "text-foreground opacity-100" : "hover:text-foreground opacity-50"}`}
          >
            L
          </SoundButton>
        </TooltipTrigger>
        <TooltipContent>Switch to Light</TooltipContent>
      </Tooltip>
      <span>/</span>
      <Tooltip>
        <TooltipTrigger asChild>
          <SoundButton
            onClick={() => setTheme("dark")}
            className={`transition-all focus:outline-none ${mounted && resolvedTheme === "dark" ? "text-foreground opacity-100" : "hover:text-foreground opacity-50"}`}
          >
            D
          </SoundButton>
        </TooltipTrigger>
        <TooltipContent>Switch to Dark</TooltipContent>
      </Tooltip>
    </div>
  );
};
