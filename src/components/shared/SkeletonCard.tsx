export function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl border border-border bg-card">
      <div className="aspect-video bg-border" />
      <div className="space-y-3 p-5">
        <div className="h-3 w-20 rounded bg-border" />
        <div className="h-5 w-3/4 rounded bg-border" />
        <div className="h-3 w-1/2 rounded bg-border" />
      </div>
    </div>
  );
}
