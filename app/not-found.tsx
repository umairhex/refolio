import Link from "next/link";
import { MoveLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background p-6">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <h1 className="text-[40vw] font-black tracking-tighter opacity-[0.02] italic">
          404
        </h1>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center space-y-6">
        <div className="space-y-2">
          <span className="text-[10px] font-bold tracking-[0.5em] uppercase opacity-40">
            Navigation Interrupted
          </span>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter italic uppercase leading-none">
            Void Found
          </h2>
        </div>

        <p className="max-w-md text-sm font-medium leading-relaxed opacity-60">
          The coordinates you&apos;ve entered do not exist within the current
          architecture. The path has been pruned or never existed.
        </p>

        <Link
          href="/"
          className="group mt-8 flex items-center gap-4 border border-foreground/20 px-8 py-4 rounded-full font-bold text-xs uppercase tracking-[0.3em] hover:bg-foreground hover:text-background transition-all duration-500"
        >
          <MoveLeft
            size={16}
            className="group-hover:-translate-x-2 transition-transform"
          />
          Back to Architecture
        </Link>
      </div>

      <div className="absolute top-12 left-12 w-12 h-12 border-l border-t border-foreground/10" />
      <div className="absolute top-12 right-12 w-12 h-12 border-r border-t border-foreground/10" />
      <div className="absolute bottom-12 left-12 w-12 h-12 border-l border-bottom border-foreground/10" />
      <div className="absolute bottom-12 right-12 w-12 h-12 border-r border-bottom border-foreground/10" />
    </div>
  );
}
