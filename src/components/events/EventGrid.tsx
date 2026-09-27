"use client";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Event } from "@/types";
import { EventCard } from "./EventCard";
import { EmptyState } from "@/components/shared/EmptyState";
export function EventGrid({ events }: { events: Event[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = [
    "All",
    ...Array.from(new Set(events.map((e) => e.category))),
  ];
  const shown = useMemo(
    () =>
      events.filter(
        (e) =>
          (category === "All" || e.category === category) &&
          e.title.toLowerCase().includes(query.toLowerCase()),
      ),
    [events, query, category],
  );
  return (
    <section
      id="events"
      className="mx-auto max-w-[1600px] px-[var(--gutter)] py-[var(--section)]"
    >
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[.2em] text-accent">
            On PULSE
          </p>
          <h2 className="mt-2 font-display text-3xl font-black sm:text-4xl">
            All events
          </h2>
        </div>
        <label className="flex min-w-64 items-center gap-3 rounded-full border border-border bg-card px-4 py-3 focus-within:border-accent">
          <Search className="size-4 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
          />
        </label>
      </div>
      <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition ${category === c ? "border-accent bg-accent text-white" : "border-border bg-card text-muted hover:text-foreground"}`}
          >
            {c}
          </button>
        ))}
      </div>
      {shown.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {shown.map((e) => (
            <EventCard key={e._id} event={e} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </section>
  );
}
