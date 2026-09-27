import Image from "next/image";
import Link from "next/link";
import { Calendar, Play } from "lucide-react";
import type { Event } from "@/types";
import { urlFor } from "@/lib/sanity.image";
import { formatEventDate } from "@/lib/utils";
import { LiveBadge } from "./LiveBadge";
export function EventCard({ event }: { event: Event }) {
  const src = event.thumbnail
    ? urlFor(event.thumbnail).width(800).height(450).url()
    : event.thumbnailUrl;
  return (
    <Link
      href={`/event/${event.slug}`}
      className="group overflow-hidden rounded-xl border border-border bg-card transition duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-glow"
    >
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-card to-background">
        {src && (
          <Image
            src={src}
            alt={event.thumbnail?.alt || event.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width:768px) 100vw, 33vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="absolute left-3 top-3">
          {event.isLive ? (
            <LiveBadge />
          ) : (
            <span className="rounded-full bg-background/80 px-3 py-1 text-xs font-semibold backdrop-blur">
              {event.status.toUpperCase()}
            </span>
          )}
        </div>
        <span className="absolute bottom-3 right-3 grid size-10 place-items-center rounded-full bg-accent text-white opacity-0 transition group-hover:opacity-100">
          <Play className="size-4 fill-current" />
        </span>
      </div>
      <div className="p-5">
        <span className="text-xs font-bold uppercase tracking-widest text-accent">
          {event.category}
        </span>
        <h3 className="mt-2 line-clamp-2 font-display text-lg font-bold">
          {event.title}
        </h3>
        <p className="mt-3 flex items-center gap-2 text-xs text-muted">
          <Calendar className="size-3.5" />
          {formatEventDate(event.scheduledAt)}
        </p>
      </div>
    </Link>
  );
}
