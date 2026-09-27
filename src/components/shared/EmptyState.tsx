import { RadioTower } from "lucide-react";
export function EmptyState() {
  return (
    <div className="grid min-h-80 place-items-center rounded-xl border border-dashed border-border bg-card/50 text-center">
      <div>
        <RadioTower className="mx-auto size-12 text-accent" />
        <h3 className="mt-4 text-xl font-bold">No events found</h3>
        <p className="mt-2 text-sm text-muted">
          Try another search or category.
        </p>
      </div>
    </div>
  );
}
