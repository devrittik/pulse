import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import type { Event } from "@/types";
import { urlFor } from "@/lib/sanity.image";
import { LiveBadge } from "./LiveBadge";
export function EventHero({ event }: { event: Event }) {
  const src = event.thumbnail
    ? urlFor(event.thumbnail).width(1800).height(900).url()
    : event.thumbnailUrl;
  return (
    <section className="relative min-h-[72vh] overflow-hidden border-b border-border">
      {src && (
        <Image
          src={src}
          alt={event.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/20" />
      <div className="relative mx-auto flex min-h-[72vh] max-w-[1600px] items-end px-[var(--gutter)] pb-16 pt-32">
        <div className="max-w-3xl">
          {event.isLive && <LiveBadge />}
          <p className="mt-5 text-sm font-bold uppercase tracking-[.25em] text-accent">
            {event.category} • Featured event
          </p>
          <h1 className="mt-3 font-display text-4xl font-black leading-[.95] sm:text-6xl lg:text-8xl">
            {event.title}
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted sm:text-lg">
            The action is happening now. Choose your feed and stream every
            defining moment live.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/event/${event.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-bold text-white"
            >
              <Play className="size-4 fill-current" />
              Watch now
            </Link>
            <a
              href="#events"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3 font-bold backdrop-blur"
            >
              Explore events
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
