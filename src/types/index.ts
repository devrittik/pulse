import type { PortableTextBlock } from "@portabletext/react";
export interface SanityImage {
  asset?: { _ref?: string; _id?: string; url?: string };
  alt?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}
export interface StreamLink {
  _key?: string;
  linkName: string;
  m3u8Url: string;
  isDefault: boolean;
}
export type EventStatus = "live" | "upcoming" | "ended";
export interface Event {
  _id: string;
  title: string;
  slug: string;
  description?: PortableTextBlock[];
  thumbnail?: SanityImage;
  thumbnailUrl?: string;
  category: string;
  isFeatured: boolean;
  isLive: boolean;
  scheduledAt: string;
  streamLinks: StreamLink[];
  tags: string[];
  status: EventStatus;
}
export interface SiteSettings {
  siteName: string;
  subtitle: string;
  siteDescription: string;
  logo?: SanityImage;
  favicon?: SanityImage;
  ogImage?: SanityImage;
  developerName: string;
  developerPortfolio: string;
  developerGithub: string;
  developerTwitter: string;
  footerText: string;
}
