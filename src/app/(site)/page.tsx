import { EventHero } from "@/components/events/EventHero";
import { EventGrid } from "@/components/events/EventGrid";
import { fallbackEvents } from "@/lib/fallback-data";
import { sanityClient, isSanityConfigured } from "@/lib/sanity.client";
import { eventsQuery } from "@/lib/sanity.queries";
import type { Event } from "@/types";
export const revalidate = 60;
async function getEvents(): Promise<Event[]> {
  if (!isSanityConfigured) return fallbackEvents;
  try {
    const data = await sanityClient.fetch<Event[]>(eventsQuery);
    return data?.length ? data : fallbackEvents;
  } catch {
    return fallbackEvents;
  }
}
export default async function Home() {
  const events = await getEvents();
  const featured = events.find((e) => e.isFeatured) || events[0];
  return (
    <main>
      {featured && <EventHero event={featured} />}
      <EventGrid events={events} />
    </main>
  );
}
