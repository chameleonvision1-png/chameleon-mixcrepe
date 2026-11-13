import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const PUB = path.join(ROOT, "public");

async function buildOg(filename, opts) {
  const W = 1200;
  const H = 630;

  const logoBuf = await sharp(path.join(PUB, "logo-seal.webp"))
    .resize(250, 250, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const heroBuf = await sharp(path.join(PUB, opts.heroPath))
    .resize(420, 420, { fit: "cover" })
    .composite([
      {
        input: Buffer.from(
          `<svg width="420" height="420"><rect x="3" y="3" width="414" height="414" rx="34" fill="none" stroke="#FFC21A" stroke-width="6"/></svg>`,
        ),
      },
    ])
    .png()
    .toBuffer();

  const bgSvg = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="glow" cx="50%" cy="50%" r="55%">
        <stop offset="0%" stop-color="#FFC21A" stop-opacity="0.22"/>
        <stop offset="100%" stop-color="#0D0D0D" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="#0D0D0D"/>
    <rect width="${W}" height="${H}" fill="url(#glow)"/>
    <rect x="24" y="24" width="${W - 48}" height="${H - 48}" rx="32" fill="none" stroke="#FFC21A" stroke-width="4" stroke-opacity="0.75"/>
    <rect x="520" y="96" width="330" height="40" rx="20" fill="#FFC21A"/>
    <text x="685" y="122" font-family="Arial, sans-serif" font-size="18" font-weight="900" fill="#0D0D0D" text-anchor="middle">${opts.pill}</text>
    <text x="900" y="218" font-family="Arial, sans-serif" font-size="52" font-weight="900" fill="#FFF3D6" text-anchor="end">${opts.title}</text>
    <text x="900" y="280" font-family="Arial, sans-serif" font-size="30" font-weight="800" fill="#FFC21A" text-anchor="end">${opts.sub}</text>
    <text x="900" y="346" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#FFFFFF" fill-opacity="0.82" text-anchor="end">${opts.details}</text>
    <rect x="520" y="455" width="380" height="58" rx="29" fill="#FFF3D6"/>
    <text x="710" y="492" font-family="Arial, sans-serif" font-size="22" font-weight="900" fill="#0D0D0D" text-anchor="middle">mixcrepe.chameleon.vision</text>
  </svg>`);

  await sharp(bgSvg)
    .composite([
      { input: heroBuf, left: 64, top: 105 },
      { input: logoBuf, left: 915, top: 185 },
    ])
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(path.join(PUB, filename));

  console.log(`Generated ${filename}`);
}

await buildOg("og-image.jpg", {
  pill: "GOLDEN STREET FOOD • BADR CITY",
  title: "MIX Crepe &amp; Pizza",
  sub: "Italian Pizza • Crepes • Waffles",
  details: "Mall 8, Russian University St • 01098923225",
  heroPath: "images/hero/hero-pizza-supreme.webp",
});

await buildOg("og-menu.jpg", {
  pill: "FULL INTERACTIVE MENU • 110+ ITEMS",
  title: "MIX Crepe &amp; Pizza Menu",
  sub: "Custom Crepe Builder &amp; Fast Delivery",
  details: "Pizza • Giant Mix Crepes • Sweet Pies &amp; Waffles",
  heroPath: "images/hero/hero-crepe-hand.webp",
});
