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
    <div className="bg-background fixed inset-0 z-50 flex flex-col items-center justify-center p-6">
      <div className="border-foreground/10 bg-foreground/5 relative w-full max-w-xl space-y-8 border p-8 md:p-12">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-red-500">
            <div className="h-2 w-2 animate-pulse rounded-full bg-current" />
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase">
              System Breach / 500
            </span>
          </div>
          <h1 className="text-4xl leading-none font-black tracking-tighter uppercase italic md:text-6xl">
            Unexpected <br /> Logic Error
          </h1>
        </div>

        <p className="text-sm leading-relaxed font-medium opacity-60">
          The requested operation failed due to an internal system interrupt. The core engine has
          been halted to prevent data corruption.
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          <button
            onClick={() => reset()}
            className="bg-foreground text-background flex items-center gap-3 rounded-full px-6 py-4 text-xs font-bold tracking-widest uppercase transition-all hover:scale-105 active:scale-95"
          >
            <RefreshCcw size={14} />
            Reboot System
          </button>

          <Link
            href="/"
            className="border-foreground/20 hover:bg-foreground hover:text-background flex items-center gap-3 rounded-full border px-6 py-4 text-xs font-bold tracking-widest uppercase transition-all"
          >
            Return Home
            <MoveUpRight size={14} />
          </Link>
        </div>

        <div className="pointer-events-none absolute -right-4 -bottom-4 text-[10vw] font-black italic opacity-[0.03] select-none">
          CRITICAL_FAIL
        </div>
      </div>
    </div>
  );
}
