import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PULSE — Live Event Streaming",
    short_name: "PULSE",
    description: "Live moments. One pulse.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0f",
    theme_color: "#e50914",
    icons: [
      { src: "/api/favicon", sizes: "192x192", type: "image/png" },
      { src: "/api/favicon", sizes: "512x512", type: "image/png" },
      {
        src: "/api/favicon",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
