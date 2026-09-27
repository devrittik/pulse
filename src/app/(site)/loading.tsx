import { SkeletonCard } from "@/components/shared/SkeletonCard";
export default function Loading() {
  return (
    <main className="min-h-screen pt-28">
      <div className="mx-auto max-w-[1600px] px-[var(--gutter)]">
        <div className="h-[45vh] animate-pulse rounded-xl bg-card" />
        <div className="grid gap-5 py-[var(--section)] sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }, (_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
