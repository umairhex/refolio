'use client';

import { useIsLoaded } from "@/hooks/use-loading-store";

export default function PageContent({ children }: { children: React.ReactNode }) {
  const isLoaded = useIsLoaded();

  if (!isLoaded) return null;

  return <>{children}</>;
}
