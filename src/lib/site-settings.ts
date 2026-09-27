import { fallbackSettings } from "@/lib/fallback-data";
import { isSanityConfigured, sanityClient } from "@/lib/sanity.client";
import { settingsQuery } from "@/lib/sanity.queries";
import type { SiteSettings } from "@/types";

/**
 * Returns published CMS settings and fills any missing optional values with
 * safe local defaults. The fallback also keeps local development usable before
 * a Sanity project has been configured.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSanityConfigured) {
    return fallbackSettings;
  }

  try {
    const settings = await sanityClient.fetch<Partial<SiteSettings> | null>(
      settingsQuery,
      {},
      {
        next: {
          revalidate: 60,
          tags: ["site-settings"],
        },
      },
    );

    return settings ? { ...fallbackSettings, ...settings } : fallbackSettings;
  } catch {
    return fallbackSettings;
  }
}
