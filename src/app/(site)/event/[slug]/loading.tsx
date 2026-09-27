import { SkeletonCard } from "@/components/shared/SkeletonCard";
export default function Loading() {
  return (
    <main className="mx-auto min-h-screen max-w-[1600px] px-[var(--gutter)] pt-28">
      <div className="aspect-video animate-pulse rounded-xl bg-card" />
      <div className="mt-8 h-12 w-2/3 animate-pulse rounded bg-card" />
      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </main>
  );
}
