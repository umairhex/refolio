import { SoundLink } from "@/app/components/ui/Sound";
import { MoveLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-background fixed inset-0 z-50 flex flex-col items-center justify-center p-6">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none">
        <h1 className="text-[40vw] font-black tracking-tighter italic opacity-[0.02]">404</h1>
      </div>

      <div className="relative z-10 flex flex-col items-center space-y-6 text-center">
        <div className="space-y-2">
          <span className="label-accent tracking-[0.5em]">
            Navigation Interrupted
          </span>
          <h2 className="text-5xl leading-none font-black tracking-tighter uppercase italic md:text-8xl">
            Void Found
          </h2>
        </div>

        <p className="max-w-md text-sm leading-relaxed font-medium opacity-60">
          The coordinates you&apos;ve entered do not exist within the current architecture. The path
          has been pruned or never existed.
        </p>

        <SoundLink
          href="/"
          className="group border-foreground/20 hover:bg-foreground hover:text-background mt-8 flex items-center gap-4 rounded-full border px-8 py-4 text-xs font-bold tracking-[0.3em] uppercase transition-all duration-500"
        >
          <MoveLeft size={16} className="transition-transform group-hover:-translate-x-2" />
          Back to Architecture
        </SoundLink>
      </div>

      <div className="border-foreground/10 absolute top-12 left-12 h-12 w-12 border-t border-l" />
      <div className="border-foreground/10 absolute top-12 right-12 h-12 w-12 border-t border-r" />
      <div className="border-bottom border-foreground/10 absolute bottom-12 left-12 h-12 w-12 border-l" />
      <div className="border-bottom border-foreground/10 absolute right-12 bottom-12 h-12 w-12 border-r" />
    </div>
  );
}
