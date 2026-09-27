import { NextResponse } from "next/server";
import { isSanityConfigured, sanityClient } from "@/lib/sanity.client";
import { urlFor } from "@/lib/sanity.image";
import type { SanityImage } from "@/types";

// Favicons are intentionally resolved at request time so a newly published
// Site Settings icon is not hidden behind Next.js' route cache.
export const dynamic = "force-dynamic";

const faviconQuery = `*[_type == "siteSettings"] | order(_updatedAt desc)[0]{favicon}`;

export async function GET() {
  if (!isSanityConfigured) {
    return new NextResponse(null, { status: 404 });
  }

  try {
    const settings = await sanityClient.fetch<{ favicon?: SanityImage } | null>(
      faviconQuery,
      {},
      { cache: "no-store" },
    );
    if (!settings?.favicon?.asset) {
      return new NextResponse(null, { status: 404 });
    }

    const imageUrl = urlFor(settings.favicon)
      .width(512)
      .height(512)
      .fit("crop")
      .format("png")
      .url();
    const image = await fetch(imageUrl, { cache: "no-store" });
    if (!image.ok) return new NextResponse(null, { status: 502 });

    return new NextResponse(await image.arrayBuffer(), {
      headers: {
        "Content-Type": "image/png",
        // Revalidate in the browser instead of retaining an old local icon.
        "Cache-Control": "no-cache, must-revalidate",
      },
    });
  } catch {
    return new NextResponse(null, { status: 502 });
  }
}
