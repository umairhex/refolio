"use client";

import { useState, useEffect } from "react";

const NavbarClock = ({ isScrolled }: { isScrolled: boolean }) => {
  const [time, setTime] = useState("");
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();

      if (hours >= 5 && hours < 12) setGreeting("Good Morning");
      else if (hours >= 12 && hours < 17) setGreeting("Good Afternoon");
      else if (hours >= 17 && hours < 21) setGreeting("Good Evening");
      else setGreeting("Good Night");

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
  }, []);

  return (
    <div
      className={`nav-item flex flex-col items-center justify-center transition-all duration-500 ${isScrolled ? "scale-90 opacity-40 translate-y-1 hidden xl:flex" : "flex-1 hidden lg:flex"}`}
    >
      <div className="flex items-center gap-3 text-[9px] font-bold tracking-[0.2em] uppercase">
        <span className="hidden xl:inline">{greeting}</span>
        <span className="w-1 h-1 rounded-full bg-foreground/20 hidden xl:inline" />
        <span>{time || "00:00:00 AM"}</span>
      </div>
    </div>
  );
};

export default NavbarClock;
