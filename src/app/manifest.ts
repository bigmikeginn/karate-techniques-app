import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jitsu-Do Techniques Library",
    short_name: "Jitsu-Do",
    description: "Karate and Brazilian Jiu-Jitsu technique library for Jitsu-Do Academy students.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#dc2626",
    icons: [
      {
        src: "/karate-logo.png",
        sizes: "96x96",
        type: "image/png",
      },
    ],
  };
}
