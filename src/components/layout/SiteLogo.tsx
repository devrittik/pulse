import Image from "next/image";
import { Radio } from "lucide-react";
import type { SiteSettings } from "@/types";
import { urlFor } from "@/lib/sanity.image";
import { cn } from "@/lib/utils";

export function SiteLogo({
  settings,
  className,
}: {
  settings: SiteSettings;
  className?: string;
}) {
  if (settings.logo?.asset) {
    return (
      <Image
        src={urlFor(settings.logo).height(96).fit("max").url()}
        alt={`${settings.siteName} logo`}
        width={180}
        height={48}
        className={cn(
          "h-9 w-auto max-w-[150px] object-contain sm:h-10 sm:max-w-[190px] lg:h-11 lg:max-w-[220px]",
          className,
        )}
        priority
      />
    );
  }

  return (
    <span className="flex items-center gap-2 text-xl sm:text-2xl">
      <span className="grid size-9 place-items-center rounded-full bg-accent text-white sm:size-10">
        <Radio className="size-4" />
      </span>
      <span>{settings.siteName}</span>
    </span>
  );
}
