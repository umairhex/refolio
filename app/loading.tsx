export default function Loading() {
  return (
    <div className="bg-background pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
      <div className="relative flex flex-col items-center gap-4">
        <div className="border-foreground/20 border-t-foreground h-12 w-12 animate-spin rounded-full border-2" />
        <span className="label-accent animate-pulse tracking-[0.4em]">
          Initializing System
        </span>
      </div>

      <div className="bg-foreground/5 absolute top-0 left-0 h-px w-full" />
      <div className="bg-foreground/5 absolute bottom-0 left-0 h-px w-full" />
      <div className="bg-foreground/5 absolute top-0 left-0 ml-12 hidden h-full w-px md:block" />
      <div className="bg-foreground/5 absolute top-0 right-0 mr-12 hidden h-full w-px md:block" />
    </div>
  );
}
