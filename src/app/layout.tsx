import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Alexandria, Cairo, Montserrat, Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const alexandria = Alexandria({
  variable: "--font-alexandria",
  subsets: ["arabic", "latin"],
  weight: ["700", "800", "900"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const siteUrl = "https://mixcrepe.chameleon.vision";
const siteTitle = "MIX Crepe & Pizza — ميكس كريب وبيتزا | مدينة بدر";
const siteDescription =
  "الموقع الرسمي لمطعم MIX Crepe & Pizza (ميكس كريب وبيتزا) في مدينة بدر — شارع الجامعة الروسية، مول 8 بجوار صيدلية العزبي وبنك QNB الأهلي. بيتزا إيطالي، كريب حادق وحلو، فطائر حلوة، وافل، ومخصص الكريب مع توصيل سريع 01098923225.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "MIX Crepe & Pizza",
  title: {
    default: siteTitle,
    template: "%s | MIX Crepe & Pizza — ميكس كريب وبيتزا",
  },
  description: siteDescription,
  keywords: [
    "MIX Crepe & Pizza",
    "ميكس كريب وبيتزا",
    "كريب مدينة بدر",
    "بيتزا إيطالي مدينة بدر",
    "مول 8 شارع الجامعة الروسية",
    "منيو ميكس كريب",
    "مكسها على مزاجك",
    "وافل وفطائر حلوة بدر",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=1", sizes: "64x64", type: "image/png" },
      { url: "/icon-192.png?v=1", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png?v=1", sizes: "512x512", type: "image/png" },
    ],
    shortcut: ["/icon-192.png?v=1"],
    apple: [{ url: "/apple-icon?v=1", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: siteUrl,
    siteName: "MIX Crepe & Pizza | ميكس كريب وبيتزا",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/og-image.jpg?v=1",
        width: 1200,
        height: 630,
        alt: "MIX Crepe & Pizza — ميكس كريب وبيتزا مدينة بدر",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.jpg?v=1"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "MIX Crepe & Pizza",
  },
};

export const viewport: Viewport = {
  themeColor: "#0D0D0D",
};

const pwaInitScript = `
(function() {
  if (typeof window === "undefined") return;
  window.addEventListener("error", function(e) {
    if (e && e.filename && e.filename.indexOf("chrome-extension://") === 0) {
      e.stopImmediatePropagation();
    }
  }, true);
  window.addEventListener("unhandledrejection", function(e) {
    var stack = e && e.reason && e.reason.stack ? String(e.reason.stack) : "";
    if (stack.indexOf("chrome-extension://") !== -1) {
      e.stopImmediatePropagation();
      e.preventDefault();
    }
  }, true);
  window.addEventListener("beforeinstallprompt", function(e) {
    e.preventDefault();
    window.__pwaInstallPrompt = e;
    window.dispatchEvent(new Event("pwa-install-available"));
  });
  window.addEventListener("appinstalled", function() {
    window.__pwaInstallPrompt = null;
    window.dispatchEvent(new Event("pwa-app-installed"));
  });
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker.register("/sw.js", { scope: "/", updateViaCache: "none" }).then(function(reg) { reg.update(); }).catch(function() {});
    });
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${alexandria.variable} ${cairo.variable} ${poppins.variable} ${montserrat.variable}`}
    >
      <head>
        <Script id="pwa-init" strategy="beforeInteractive">
          {pwaInitScript}
        </Script>
      </head>
      <body className="min-h-dvh flex flex-col bg-[#FFF3D6] text-[#0D0D0D] antialiased selection:bg-[#FFC21A] selection:text-[#0D0D0D]">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
