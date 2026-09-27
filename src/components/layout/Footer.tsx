import type { SiteSettings } from "@/types";
import { DeveloperCredit } from "./DeveloperCredit";
import { SiteLogo } from "./SiteLogo";

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto flex max-w-[1600px] flex-col justify-between gap-6 px-[var(--gutter)] py-10 md:flex-row md:items-center">
        <div>
          <div className="font-display text-lg font-black">
            <SiteLogo settings={settings} />
          </div>
          <p className="mt-2 text-sm text-muted">{settings.footerText}</p>
        </div>
        <DeveloperCredit settings={settings} />
      </div>
    </footer>
  );
}
