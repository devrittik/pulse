import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { getSiteSettings } from "@/lib/site-settings";

/** The public-site chrome is isolated in this route group, so /studio stays clean. */
export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <>
      <Navbar settings={settings} />
      {children}
      <Footer settings={settings} />
    </>
  );
}
