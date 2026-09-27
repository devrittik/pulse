"use client";
import { cn } from "@/lib/utils";
export function Tabs({
  items,
  value,
  onChange,
}: {
  items: { label: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist">
      {items.map((i) => (
        <button
          key={i.value}
          role="tab"
          aria-selected={value === i.value}
          onClick={() => onChange(i.value)}
          className={cn(
            "rounded-full border px-4 py-2 text-sm transition",
            value === i.value
              ? "border-accent bg-accent text-white"
              : "border-border bg-card text-muted hover:text-foreground",
          )}
        >
          {i.label}
        </button>
      ))}
    </div>
  );
}
