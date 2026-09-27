/**
 * Seeds a development dataset with site settings and sample events.
 * Run: npm run sanity:seed
 * Add -- --replace to overwrite documents previously created by this script.
 */
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-01-01" });
const replace = process.argv.includes("--replace");
const demoStream = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";

type SeedDocument = { _id: string; _type: string; [key: string]: unknown };

const documents: SeedDocument[] = [
  {
    _id: "siteSettings",
    _type: "siteSettings",
    siteName: "PULSE",
    subtitle: "Every Moment. Live.",
    siteDescription: "Live moments. One pulse.",
    developerName: "PULSE Labs",
    developerPortfolio: "https://example.com",
    developerGithub: "https://github.com",
    developerTwitter: "https://x.com",
    footerText: "Streaming the moments that matter.",
  },
  {
    _id: "event-championship-night",
    _type: "event",
    title: "Championship Night: Live",
    slug: { _type: "slug", current: "championship-night" },
    category: "Football",
    isFeatured: true,
    isLive: true,
    scheduledAt: new Date().toISOString(),
    status: "live",
    tags: ["Featured", "Football"],
    streamLinks: [
      {
        _key: "main",
        _type: "streamLink",
        linkName: "Main Feed",
        m3u8Url: demoStream,
        isDefault: true,
      },
    ],
  },
  {
    _id: "event-grand-prix",
    _type: "event",
    title: "Grand Prix: Qualifying",
    slug: { _type: "slug", current: "grand-prix-qualifying" },
    category: "Motorsport",
    isFeatured: false,
    isLive: false,
    scheduledAt: new Date(Date.now() + 86_400_000).toISOString(),
    status: "upcoming",
    tags: ["Motorsport"],
    streamLinks: [
      {
        _key: "world",
        _type: "streamLink",
        linkName: "World Feed",
        m3u8Url: demoStream,
        isDefault: true,
      },
    ],
  },
];

async function seed() {
  console.log(
    `Seeding ${documents.length} documents into ${client.config().dataset}…`,
  );
  let transaction = client.transaction();
  for (const document of documents) {
    transaction = replace
      ? transaction.createOrReplace(document)
      : transaction.createIfNotExists(document);
  }
  const result = await transaction.commit({ visibility: "async" });
  console.log(`Seed complete. Transaction: ${result.transactionId}`);
}

seed().catch((error: unknown) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
