"use client";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
export function ErrorFallback({ reset }: { reset: () => void }) {
  return (
    <main className="grid min-h-[70vh] place-items-center px-[var(--gutter)] text-center">
      <div>
        <AlertTriangle className="mx-auto size-12 text-accent" />
        <h1 className="mt-5 font-display text-3xl font-black">
          Signal interrupted
        </h1>
        <p className="mt-2 text-muted">
          We couldn’t load this view. Please try again.
        </p>
        <Button onClick={reset} className="mt-6">
          <RefreshCw className="size-4" />
          Try again
        </Button>
      </div>
    </main>
  );
}
