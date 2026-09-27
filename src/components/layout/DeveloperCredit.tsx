import { SiGithub, SiX } from "react-icons/si";
import { Globe } from "lucide-react";
import type { SiteSettings } from "@/types";
export function DeveloperCredit({ settings }: { settings: SiteSettings }) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
      <span>Built by {settings.developerName}</span>
      <a
        aria-label="Portfolio"
        href={settings.developerPortfolio}
        target="_blank"
        rel="noreferrer"
        className="hover:text-accent"
      >
        <Globe className="size-4" />
      </a>
      <a
        aria-label="GitHub"
        href={settings.developerGithub}
        target="_blank"
        rel="noreferrer"
        className="hover:text-accent"
      >
        <SiGithub />
      </a>
      <a
        aria-label="X"
        href={settings.developerTwitter}
        target="_blank"
        rel="noreferrer"
        className="hover:text-accent"
      >
        <SiX />
      </a>
    </div>
  );
}
