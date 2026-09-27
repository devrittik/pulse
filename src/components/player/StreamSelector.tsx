"use client";

import { useState } from "react";
import type { SanityImage, StreamLink } from "@/types";
import { urlFor } from "@/lib/sanity.image";
import { VideoPlayer } from "./VideoPlayer";
import { Tabs } from "@/components/ui/tabs";

export function StreamSelector({
  streams,
  title,
  eventThumbnail,
  fallbackThumbnail,
}: {
  streams: StreamLink[];
  title: string;
  eventThumbnail?: SanityImage;
  fallbackThumbnail?: string;
}) {
  const initial = streams.find((stream) => stream.isDefault) || streams[0];
  const [selected, setSelected] = useState(initial?.m3u8Url || "");

  if (!streams.length) {
    return (
      <div className="grid aspect-video place-items-center rounded-xl border border-border bg-card text-muted">
        No stream is currently available.
      </div>
    );
  }

  const activeStream =
    streams.find((stream) => stream.m3u8Url === selected) || initial;
  const poster = eventThumbnail
    ? urlFor(eventThumbnail).width(1600).height(900).fit("crop").url()
    : fallbackThumbnail;

  return (
    <div>
      <VideoPlayer
        key={selected}
        src={selected}
        title={`${title} — ${activeStream.linkName}`}
        poster={poster}
      />
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <span className="text-sm font-bold text-muted">STREAM SOURCE</span>
        <Tabs
          items={streams.map((stream) => ({
            label: stream.linkName,
            value: stream.m3u8Url,
          }))}
          value={selected}
          onChange={setSelected}
        />
      </div>
    </div>
  );
}
