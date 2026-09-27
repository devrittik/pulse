import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Toaster } from "sonner";

import { getSiteSettings } from "@/lib/site-settings";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const title = `${settings.siteName} | ${settings.subtitle}`;

  return {
    metadataBase: new URL(siteUrl),
    manifest: "/manifest.webmanifest",
    title: {
      default: title,
      template: `%s | ${settings.siteName}`,
    },
    description: settings.siteDescription,
    icons: {
      icon: {
        url: "/api/favicon",
        type: "image/png",
        sizes: "512x512",
      },
    },
    openGraph: {
      title,
      description: settings.siteDescription,
      type: "website",
      url: siteUrl,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: settings.siteDescription,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body suppressHydrationWarning>
        {children}
        <Toaster theme="dark" richColors position="top-right" />
      </body>
    </html>
  );
}
