import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MIX Crepe & Pizza — ميكس كريب وبيتزا | مدينة بدر",
    short_name: "MIX Crepe",
    description:
      "مطعم MIX Crepe & Pizza في مدينة بدر — شارع الجامعة الروسية، مول 8. بيتزا إيطالي، كريب، فطائر حلوة ووافل مع توصيل سريع 01098923225.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFF3D6",
    theme_color: "#0D0D0D",
    dir: "rtl",
    lang: "ar",
    icons: [
      {
        src: "/icon-192.png?v=1",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png?v=1",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon-maskable-512.png?v=1",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
