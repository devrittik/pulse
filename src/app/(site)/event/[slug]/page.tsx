import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { Calendar, Tag } from "lucide-react";
import { StreamSelector } from "@/components/player/StreamSelector";
import { EventCard } from "@/components/events/EventCard";
import { LiveBadge } from "@/components/events/LiveBadge";
import { eventBySlugQuery, relatedEventsQuery } from "@/lib/sanity.queries";
import { sanityClient, isSanityConfigured } from "@/lib/sanity.client";
import { fallbackEvents, getFallbackEvent } from "@/lib/fallback-data";
import { formatEventDate } from "@/lib/utils";
import type { Event } from "@/types";
export const revalidate = 60;
type Props = { params: Promise<{ slug: string }> };
async function getEvent(slug: string): Promise<Event | undefined> {
  if (!isSanityConfigured) return getFallbackEvent(slug);
  try {
    return (
      (await sanityClient.fetch<Event | null>(eventBySlugQuery, { slug })) ||
      getFallbackEvent(slug)
    );
  } catch {
    return getFallbackEvent(slug);
  }
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);
  return event
    ? {
        title: event.title,
        description: `Watch ${event.title} live on PULSE`,
        openGraph: {
          title: event.title,
          description: `Stream ${event.title} live`,
          type: "video.other",
        },
      }
    : { title: "Event not found" };
}
export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) notFound();
  let related: Event[] = [];
  if (isSanityConfigured)
    try {
      related = await sanityClient.fetch<Event[]>(relatedEventsQuery, {
        slug,
        category: event.category,
      });
    } catch {}
  if (!related.length)
    related = fallbackEvents
      .filter((e) => e.slug !== slug && e.category === event.category)
      .slice(0, 4);
  return (
    <main className="mx-auto min-h-screen max-w-[1600px] px-[var(--gutter)] pb-[var(--section)] pt-28">
      <div className="-mx-[var(--gutter)] sm:mx-0">
        <StreamSelector
          streams={event.streamLinks || []}
          title={event.title}
          eventThumbnail={event.thumbnail}
          fallbackThumbnail={event.thumbnailUrl}
        />
      </div>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
        <article>
          {event.isLive && <LiveBadge />}
          <p className="mt-4 text-sm font-bold uppercase tracking-[.2em] text-accent">
            {event.category}
          </p>
          <h1 className="mt-2 font-display text-3xl font-black sm:text-5xl">
            {event.title}
          </h1>
          <div className="mt-5 flex flex-wrap gap-5 text-sm text-muted">
            <span className="flex items-center gap-2">
              <Calendar className="size-4" />
              {formatEventDate(event.scheduledAt)}
            </span>
            <span className="flex items-center gap-2">
              <Tag className="size-4" />
              {event.tags?.join(" • ")}
            </span>
          </div>
          {event.description && (
            <div className="mt-8 max-w-3xl leading-7 text-muted">
              <PortableText value={event.description} />
            </div>
          )}
        </article>
        <aside className="rounded-xl border border-border bg-card p-6">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-accent">
            Event status
          </p>
          <p className="mt-2 text-2xl font-black capitalize">{event.status}</p>
          <p className="mt-3 text-sm leading-6 text-muted">
            Streams are provided by the event broadcaster. Select another source
            above if playback is interrupted.
          </p>
        </aside>
      </div>
      {related.length > 0 && (
        <section className="mt-[var(--section)]">
          <h2 className="mb-6 font-display text-3xl font-black">
            Related events
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((e) => (
              <EventCard key={e._id} event={e} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
