import Link from "next/link";
import { Search } from "lucide-react";
import type { SiteSettings } from "@/types";
import { SiteLogo } from "./SiteLogo";

export function Navbar({ settings }: { settings: SiteSettings }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-[4.5rem] max-w-[1600px] items-center justify-between px-[var(--gutter)] sm:h-20">
        <Link
          href="/"
          aria-label={`${settings.siteName} home`}
          className="font-display text-xl font-black tracking-tight"
        >
          <SiteLogo settings={settings} />
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/#events"
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-muted hover:text-foreground sm:block"
          >
            Browse
          </Link>
          <Link
            href="/#events"
            aria-label="Search"
            className="grid size-9 place-items-center rounded-full border border-border bg-card"
          >
            <Search className="size-4" />
          </Link>
        </div>
      </nav>
    </header>
  );
}
