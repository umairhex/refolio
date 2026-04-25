"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NavbarClock = ({ isScrolled }: { isScrolled: boolean }) => {
  const [time, setTime] = useState("");
  const [greeting, setGreeting] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handle = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(handle);
  }, []);

  useEffect(() => {
    if (!mounted) return;

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
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      className={`nav-item absolute left-1/2 flex -translate-x-1/2 items-center justify-center transition-all duration-700 ease-expo-out ${
        isScrolled ? "scale-90 opacity-40 xl:flex" : "lg:flex"
      }`}
    >

      <div className="flex items-center gap-3 text-[9px] font-bold tracking-[0.2em] uppercase">
        <AnimatePresence mode="wait">
          {!isScrolled && (
            <motion.div
              key="full-clock"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="flex items-center gap-3"
            >
              <span className="text-foreground/40 hidden xl:inline">{greeting}</span>
              <span className="bg-foreground/20 hidden h-1 w-1 rounded-full xl:inline" />
              <span className="text-foreground/40">Karachi, PK</span>
              <span className="bg-foreground/20 h-1 w-1 rounded-full" />
            </motion.div>
          )}
        </AnimatePresence>
        <span className="tabular-nums">{time || "00:00:00 AM"}</span>
      </div>
    </div>
  );
};

export default NavbarClock;

