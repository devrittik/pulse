/**
 * Idempotent event normalization migration.
 * - derives status when missing
 * - keeps isLive in sync with status
 * - adds empty tags/streamLinks arrays
 * Run a preview first: npm run sanity:migrate:dry
 */
import { getCliClient } from "sanity/cli";

type LegacyEvent = {
  _id: string;
  _rev: string;
  status?: "live" | "upcoming" | "ended";
  isLive?: boolean;
  scheduledAt?: string;
  tags?: string[];
  streamLinks?: unknown[];
};

const client = getCliClient({ apiVersion: "2025-01-01" });
const dryRun = process.argv.includes("--dry-run");

function deriveStatus(event: LegacyEvent): "live" | "upcoming" | "ended" {
  if (event.status) return event.status;
  if (event.isLive) return "live";
  if (event.scheduledAt && new Date(event.scheduledAt).getTime() > Date.now())
    return "upcoming";
  return "ended";
}

async function migrate() {
  const events = await client.fetch<LegacyEvent[]>(
    `*[_type == "event"]{_id,_rev,status,isLive,scheduledAt,tags,streamLinks}`,
  );
  console.log(
    `${dryRun ? "Previewing" : "Migrating"} ${events.length} events…`,
  );

  for (const event of events) {
    const status = deriveStatus(event);
    const patch = {
      status,
      isLive: status === "live",
      tags: event.tags ?? [],
      streamLinks: event.streamLinks ?? [],
    };
    console.log(event._id, patch);
    if (!dryRun) {
      // Revision guard prevents silently overwriting edits made during migration.
      await client
        .patch(event._id)
        .ifRevisionId(event._rev)
        .set(patch)
        .commit({ visibility: "async" });
    }
  }
  console.log(
    dryRun ? "Dry run complete; no documents changed." : "Migration complete.",
  );
}

migrate().catch((error: unknown) => {
  console.error("Migration failed:", error);
  process.exit(1);
});
