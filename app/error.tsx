"use client";

import { useEffect } from "react";
import { MoveUpRight, RefreshCcw } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background p-6">
      <div className="relative max-w-xl w-full border border-foreground/10 bg-foreground/5 p-8 md:p-12 space-y-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-red-500">
            <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase">
              System Breach / 500
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none italic">
            Unexpected <br /> Logic Error
          </h1>
        </div>

        <p className="text-sm font-medium leading-relaxed opacity-60">
          The requested operation failed due to an internal system interrupt.
          The core engine has been halted to prevent data corruption.
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          <button
            onClick={() => reset()}
            className="flex items-center gap-3 bg-foreground text-background px-6 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
          >
            <RefreshCcw size={14} />
            Reboot System
          </button>

          <Link
            href="/"
            className="flex items-center gap-3 border border-foreground/20 px-6 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-foreground hover:text-background transition-all"
          >
            Return Home
            <MoveUpRight size={14} />
          </Link>
        </div>

        <div className="absolute -bottom-4 -right-4 text-[10vw] font-black opacity-[0.03] select-none pointer-events-none italic">
          CRITICAL_FAIL
        </div>
      </div>
    </div>
  );
}
