"use client";

import { useState, useEffect } from "react";

const NavbarClock = ({ isScrolled }: { isScrolled: boolean }) => {
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handle = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(handle);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const updateTime = () => {
      const now = new Date();

      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Karachi",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

      setTime(formatter.format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      className={`nav-item ease-expo-out absolute left-1/2 hidden -translate-x-1/2 items-center justify-center transition-all duration-700 lg:flex ${
        isScrolled ? "scale-90 opacity-40 xl:flex" : ""
      }`}
    >
      <div className="flex items-center gap-3 text-[9px] font-bold tracking-[0.2em] uppercase">
        <div className="flex items-center gap-1.5 text-emerald-500">
          <div className="h-1 w-1 animate-pulse rounded-full bg-current" />
          <span className="text-[8px] font-black">AVAILABLE</span>
        </div>
        <span className="bg-foreground/20 h-1 w-1 rounded-full opacity-40" />
        <span className="tabular-nums opacity-40">{time || "00:00:00 AM"}</span>
      </div>
    </div>
  );
};

export default NavbarClock;
