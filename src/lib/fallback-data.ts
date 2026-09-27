import type { Event, SiteSettings } from "@/types";
import { staticSiteConfig } from "@/config/site";
export const fallbackSettings: SiteSettings = staticSiteConfig;
const demo = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";
export const fallbackEvents: Event[] = [
  {
    _id: "fallback-1",
    title: "Championship Night: Live",
    slug: "championship-night",
    category: "Football",
    isFeatured: true,
    isLive: true,
    status: "live",
    scheduledAt: new Date().toISOString(),
    tags: ["Featured", "Football"],
    streamLinks: [{ linkName: "Main Feed", m3u8Url: demo, isDefault: true }],
  },
  {
    _id: "fallback-2",
    title: "Courtside Live",
    slug: "courtside-live",
    category: "Basketball",
    isFeatured: false,
    isLive: true,
    status: "live",
    scheduledAt: new Date().toISOString(),
    tags: ["Basketball"],
    streamLinks: [{ linkName: "Arena Feed", m3u8Url: demo, isDefault: true }],
  },
  {
    _id: "fallback-3",
    title: "Grand Prix: Qualifying",
    slug: "grand-prix-qualifying",
    category: "Motorsport",
    isFeatured: false,
    isLive: false,
    status: "upcoming",
    scheduledAt: new Date(Date.now() + 86400000).toISOString(),
    tags: ["Motorsport"],
    streamLinks: [{ linkName: "World Feed", m3u8Url: demo, isDefault: true }],
  },
  {
    _id: "fallback-4",
    title: "Center Court Classics",
    slug: "center-court-classics",
    category: "Tennis",
    isFeatured: false,
    isLive: false,
    status: "ended",
    scheduledAt: new Date(Date.now() - 86400000).toISOString(),
    tags: ["Tennis"],
    streamLinks: [{ linkName: "Replay", m3u8Url: demo, isDefault: true }],
  },
];
export const getFallbackEvent = (slug: string) =>
  fallbackEvents.find((e) => e.slug === slug);
