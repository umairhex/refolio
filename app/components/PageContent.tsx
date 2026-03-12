'use client';

import { useLoading } from "@/app/context/LoadingContext";

export default function PageContent({ children }: { children: React.ReactNode }) {
  const { isLoaded } = useLoading();

  if (!isLoaded) return null;

  return <>{children}</>;
}
