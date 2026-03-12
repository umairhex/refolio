export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background pointer-events-none">
      <div className="relative flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-2 border-foreground/20 border-t-foreground animate-spin rounded-full" />
        <span className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-40 animate-pulse">
          Initializing System
        </span>
      </div>

      <div className="absolute top-0 left-0 w-full h-px bg-foreground/5" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-foreground/5" />
      <div className="absolute top-0 left-0 w-px h-full bg-foreground/5 ml-12 hidden md:block" />
      <div className="absolute top-0 right-0 w-px h-full bg-foreground/5 mr-12 hidden md:block" />
    </div>
  );
}
