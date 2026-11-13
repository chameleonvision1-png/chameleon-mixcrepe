import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const ROOT = "E:/Projects/Chameleon-MixCrepe";
const BRAIN = "C:/Users/antigravityadmin/.gemini/antigravity/brain/d003a65a-2ffa-42dd-acd7-e8ef5366e554";
const UPLOADED = path.join(BRAIN, ".user_uploaded");

for (const dir of [
  "public/images/products",
  "public/images/categories",
  "public/images/hero",
  "public/images/brand",
  "public/menu",
]) {
  fs.mkdirSync(path.join(ROOT, dir), { recursive: true });
}

/**
 * 4-Connected Exterior-Edge Flood-Fill Background Knockout:
 * Removes ONLY exterior black pixels physically connected to the 4 outer edges,
 * while strictly protecting the interior circle (`hypot(x-cx, y-cy) < rProtect`)
 * so interior black lettering (`mi`, `CREPE & PIZZA`) stays 100% opaque.
 */
async function knockoutOuterBlackBg(inputPath, threshold = 38) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const W = info.width;
  const H = info.height;
  const cx = 504.5;
  const cy = 510.5;
  const rProtect = 460;

  const visited = new Uint8Array(W * H);
  const queue = new Int32Array(W * H);
  let head = 0;
  let tail = 0;

  const brightness = (idx) => {
    const o = idx * 4;
    return Math.max(data[o], data[o + 1], data[o + 2]);
  };

  const tryPush = (x, y) => {
    if (x < 0 || x >= W || y < 0 || y >= H) return;
    const idx = y * W + x;
    if (visited[idx]) return;
    if (Math.hypot(x - cx, y - cy) < rProtect) return;
    if (brightness(idx) <= threshold) {
      visited[idx] = 1;
      queue[tail++] = idx;
    }
  };

  for (let x = 0; x < W; x++) {
    tryPush(x, 0);
    tryPush(x, H - 1);
  }
  for (let y = 0; y < H; y++) {
    tryPush(0, y);
    tryPush(W - 1, y);
  }

  while (head < tail) {
    const idx = queue[head++];
    const x = idx % W;
    const y = (idx / W) | 0;
    tryPush(x + 1, y);
    tryPush(x - 1, y);
    tryPush(x, y + 1);
    tryPush(x, y - 1);
  }

  const out = Buffer.from(data);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const idx = y * W + x;
      const o = idx * 4;
      if (visited[idx]) {
        out[o + 3] = 0;
      } else {
        const touchesBg =
          (x > 0 && visited[idx - 1]) ||
          (x + 1 < W && visited[idx + 1]) ||
          (y > 0 && visited[idx - W]) ||
          (y + 1 < H && visited[idx + W]);
        if (touchesBg) {
          const b = brightness(idx);
          if (b < 96) {
            const alpha = Math.max(0, Math.min(255, Math.round(((b - threshold) / (96 - threshold)) * 255)));
            out[o + 3] = alpha;
            if (alpha > 0 && alpha < 255) {
              // Edge RGB decontamination towards warm gold border (#E0A820)
              out[o] = Math.min(255, Math.round(out[o] * 1.12));
              out[o + 1] = Math.min(255, Math.round(out[o + 1] * 1.08));
            }
          }
        }
      }
    }
  }

  return sharp(out, { raw: { width: W, height: H, channels: 4 } }).trim();
}

console.log("1. Processing official MIX Crepe & Pizza 6-logo family (lossless WebP)...");

const masterLogoSrc = path.join(UPLOADED, "media_1794528202341_f2cad410.jpg");
const brandBoardSrc = path.join(UPLOADED, "media_1794528202629_f96992c8.jpg");

const knockedOut = await knockoutOuterBlackBg(masterLogoSrc, 38);
const emblemPngBuf = await knockedOut.png().toBuffer();

// 1. Primary Full Circular Seal Logo (`logo-seal.webp`)
await sharp(emblemPngBuf)
  .resize(720, 720, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .webp({ lossless: true })
  .toFile(path.join(ROOT, "public/logo-seal.webp"));

// 2. Emblem, Mobile Header Icon & App Icons (`lossless: true`)
for (const [file, size] of [
  ["public/logo-emblem.png", 512],
  ["public/logo-emblem.webp", 512],
  ["public/logo-mobile.webp", 512],
  ["public/logo-crest.png", 512],
  ["public/icon-512.png", 512],
  ["public/icon-192.png", 192],
  ["src/app/icon.png", 192],
  ["src/app/apple-icon.png", 180],
  ["public/favicon.ico", 64],
]) {
  const target = path.join(ROOT, file);
  const pipeline = sharp(emblemPngBuf).resize(size, size, {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  });
  if (file.endsWith(".webp")) {
    await pipeline.webp({ lossless: true }).toFile(target);
  } else {
    await pipeline.png().toFile(target);
  }
}

// Maskable 512 PWA Icon on Charcoal Black (`#0D0D0D`) Safe Zone
const innerEmblem = await sharp(emblemPngBuf)
  .resize(400, 400, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();

await sharp({
  create: { width: 512, height: 512, channels: 4, background: "#0D0D0D" },
})
  .composite([{ input: innerEmblem, gravity: "center" }])
  .png()
  .toFile(path.join(ROOT, "public/icon-maskable-512.png"));

// 3. Brand Icon Only (from brand board right-hand icon variation, circular mask)
const iconOnlyCrop = await sharp(brandBoardSrc)
  .extract({ left: 638, top: 55, width: 74, height: 74 })
  .resize(512, 512, { kernel: "lanczos3" })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const ioData = Buffer.from(iconOnlyCrop.data);
for (let y = 0; y < 512; y++) {
  for (let x = 0; x < 512; x++) {
    const dist = Math.hypot(x - 255.5, y - 255.5);
    const o = (y * 512 + x) * 4;
    if (dist > 246) ioData[o + 3] = 0;
    else if (dist > 242) ioData[o + 3] = Math.round(((246 - dist) / 4) * 255);
  }
}
await sharp(ioData, { raw: { width: 512, height: 512, channels: 4 } })
  .webp({ lossless: true })
  .toFile(path.join(ROOT, "public/logo-icon-only.webp"));

// 4. Monochrome Version (`logo-mono.webp`) & Reversed Version (`logo-reversed.webp`)
await sharp(emblemPngBuf)
  .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .grayscale()
  .modulate({ brightness: 1.05 })
  .webp({ lossless: true })
  .toFile(path.join(ROOT, "public/logo-mono.webp"));

const revRaw = await sharp(emblemPngBuf)
  .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const revBuf = Buffer.from(revRaw.data);
for (let i = 0; i < revBuf.length; i += 4) {
  if (revBuf[i + 3] < 20) continue;
  const lum = (revBuf[i] + revBuf[i + 1] + revBuf[i + 2]) / 3;
  // Brighten dark rings/lettering cleanly to Cream (#FFF3D6) for dark backgrounds while preserving gold/orange tones
  if (lum < 48) {
    revBuf[i] = 255;
    revBuf[i + 1] = 243;
    revBuf[i + 2] = 214;
  }
}
await sharp(revBuf, { raw: { width: 512, height: 512, channels: 4 } })
  .webp({ lossless: true })
  .toFile(path.join(ROOT, "public/logo-reversed.webp"));

// 5. Horizontal Secondary Logos (`logo-horizontal.webp` for light bg, `logo-horizontal-light.webp` for dark bg)
async function buildHorizontalLogo(mode) {
  const isLightText = mode === "dark-bg";
  const miColor = isLightText ? "#FFF3D6" : "#0D0D0D";
  const subColor = isLightText ? "#FFC21A" : "#0D0D0D";
  const xFill = "#F59E0B";
  const xStroke = isLightText ? "#FFF3D6" : "#0D0D0D";

  const W = 940;
  const H = 250;
  const emblemSmall = await sharp(emblemPngBuf)
    .resize(218, 218, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const textSvg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <g transform="translate(245, 22)">
      <!-- Stylized lowercase 'm' & 'i' matching official brand mark -->
      <text x="0" y="128" font-family="Poppins, Montserrat, Arial Black, sans-serif" font-weight="900" font-size="146" letter-spacing="-4" fill="${miColor}">mi</text>
      <!-- Dynamic tilted Warm Orange X -->
      <g transform="translate(178, 18)">
        <path d="M18 16 C44 48, 78 72, 118 104 L92 114 C62 88, 34 62, 6 24 Z" fill="${xFill}" stroke="${xStroke}" stroke-width="5" stroke-linejoin="round"/>
        <path d="M114 14 C80 48, 44 82, 8 112 L34 118 C64 88, 96 54, 130 22 Z" fill="#FFC21A" stroke="${xStroke}" stroke-width="5" stroke-linejoin="round"/>
      </g>
      <text x="8" y="188" font-family="Montserrat, Poppins, Arial, sans-serif" font-weight="800" font-size="40" letter-spacing="5.5" fill="${subColor}">CREPE &amp; PIZZA</text>
    </g>
  </svg>`);

  return sharp({
    create: { width: W, height: H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([
      { input: emblemSmall, left: 16, top: 16 },
      { input: textSvg, left: 0, top: 0 },
    ])
    .trim()
    .webp({ lossless: true });
}

await (await buildHorizontalLogo("light-bg")).toFile(path.join(ROOT, "public/logo-horizontal.webp"));
await (await buildHorizontalLogo("dark-bg")).toFile(path.join(ROOT, "public/logo-horizontal-light.webp"));

console.log("2. Extracting Brand Guidelines showcase crops...");
await sharp(brandBoardSrc)
  .resize({ width: 1400, withoutEnlargement: true })
  .webp({ quality: 90 })
  .toFile(path.join(ROOT, "public/images/brand/brand-board-full.webp"));

await sharp(brandBoardSrc)
  .extract({ left: 0, top: 322, width: 356, height: 212 })
  .resize(900, 540, { fit: "cover" })
  .webp({ quality: 88 })
  .toFile(path.join(ROOT, "public/images/brand/storefront-signage.webp"));

await sharp(brandBoardSrc)
  .extract({ left: 360, top: 332, width: 664, height: 204 })
  .resize(1200, 380, { fit: "cover" })
  .webp({ quality: 88 })
  .toFile(path.join(ROOT, "public/images/brand/packaging-lineup.webp"));

await sharp(brandBoardSrc)
  .extract({ left: 460, top: 538, width: 564, height: 144 })
  .resize(1120, 290, { fit: "cover" })
  .webp({ quality: 88 })
  .toFile(path.join(ROOT, "public/images/brand/brand-applications.webp"));

console.log("3. Processing bespoke generated Hero & Bento imagery...");
const GEN_HERO_CREPE = path.join(BRAIN, "hero_crepe_hand_clean_1794529591754.jpg");
const GEN_HERO_PIZZA = path.join(BRAIN, "hero_pizza_supreme_1794529469675.jpg");
const GEN_HERO_SWEET = path.join(BRAIN, "hero_sweet_crepe_standalone_1794529495777.jpg");
const GEN_BENTO_GRIDDLE = path.join(BRAIN, "bento_crepe_griddle_1794529472005.jpg");

await sharp(GEN_HERO_CREPE)
  .resize(1000, 900, { fit: "cover", position: "center" })
  .webp({ quality: 88 })
  .toFile(path.join(ROOT, "public/images/hero/hero-crepe-hand.webp"));

await sharp(GEN_HERO_PIZZA)
  .resize(1080, 900, { fit: "cover", position: "center" })
  .webp({ quality: 88 })
  .toFile(path.join(ROOT, "public/images/hero/hero-pizza-supreme.webp"));

await sharp(GEN_HERO_SWEET)
  .resize(1000, 900, { fit: "cover", position: "center" })
  .webp({ quality: 88 })
  .toFile(path.join(ROOT, "public/images/hero/hero-sweet-crepe.webp"));

await sharp(GEN_BENTO_GRIDDLE)
  .resize(1080, 800, { fit: "cover", position: "center" })
  .webp({ quality: 88 })
  .toFile(path.join(ROOT, "public/images/hero/bento-crepe-griddle.webp"));

await sharp(GEN_HERO_PIZZA)
  .resize(1440, 620, { fit: "cover", position: "center" })
  .webp({ quality: 86 })
  .toFile(path.join(ROOT, "public/images/hero/wide-streetfood-banner.webp"));

await sharp(GEN_BENTO_GRIDDLE)
  .resize(1280, 720, { fit: "cover", position: "center" })
  .webp({ quality: 86 })
  .toFile(path.join(ROOT, "public/images/hero/reviews-backdrop.webp"));

console.log("4. Preparing product & category culinary photography...");

const PHOTO_JOBS = [
  // Pizzas
  {
    out: "products/pizza-margherita.webp",
    w: 800,
    h: 640,
    urls: ["https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85"],
    fallback: GEN_HERO_PIZZA,
  },
  {
    out: "products/pizza-supreme.webp",
    w: 800,
    h: 640,
    urls: ["https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=85"],
    fallback: GEN_HERO_PIZZA,
  },
  {
    out: "products/pizza-chicken-ranch.webp",
    w: 800,
    h: 640,
    urls: ["https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=85"],
    fallback: GEN_HERO_PIZZA,
  },
  {
    out: "products/pizza-pepperoni.webp",
    w: 800,
    h: 640,
    urls: ["https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=900&q=85"],
    fallback: GEN_HERO_PIZZA,
  },
  {
    out: "products/pizza-four-cheese.webp",
    w: 800,
    h: 640,
    urls: ["https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=900&q=85"],
    fallback: GEN_HERO_PIZZA,
  },
  {
    out: "products/pizza-meat-lovers.webp",
    w: 800,
    h: 640,
    urls: ["https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=900&q=85"],
    fallback: GEN_HERO_PIZZA,
  },
  {
    out: "products/pizza-seafood.webp",
    w: 800,
    h: 640,
    urls: ["https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=900&q=85"],
    fallback: GEN_HERO_PIZZA,
  },
  {
    out: "products/pizza-bbq-chicken.webp",
    w: 800,
    h: 640,
    urls: ["https://images.unsplash.com/photo-1555072956-7758afb20e8f?auto=format&fit=crop&w=900&q=85"],
    fallback: GEN_HERO_PIZZA,
  },
  {
    out: "products/pizza-veggie.webp",
    w: 800,
    h: 640,
    urls: ["https://images.unsplash.com/photo-1548369937-47519962c11a?auto=format&fit=crop&w=900&q=85"],
    fallback: GEN_HERO_PIZZA,
  },

  // Savory & Mix Crepes
  {
    out: "products/crepe-crispy.webp",
    w: 800,
    h: 640,
    urls: [],
    fallback: GEN_HERO_CREPE,
  },
  {
    out: "products/crepe-strips.webp",
    w: 800,
    h: 640,
    urls: [],
    fallback: GEN_BENTO_GRIDDLE,
  },
  {
    out: "products/crepe-cordon-bleu.webp",
    w: 800,
    h: 640,
    urls: ["https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=900&q=85"],
    fallback: GEN_BENTO_GRIDDLE,
  },
  {
    out: "products/crepe-shawarma.webp",
    w: 800,
    h: 640,
    urls: [],
    fallback: "E:/Projects/Chameleon-MaakolatAlsham/public/images/products/shawarma-chicken-saj.webp",
  },
  {
    out: "products/crepe-shish.webp",
    w: 800,
    h: 640,
    urls: ["https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=900&q=85"],
    fallback: GEN_BENTO_GRIDDLE,
  },
  {
    out: "products/crepe-meat-burger.webp",
    w: 800,
    h: 640,
    urls: ["https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85"],
    fallback: GEN_BENTO_GRIDDLE,
  },
  {
    out: "products/crepe-sausage.webp",
    w: 800,
    h: 640,
    urls: ["https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=85"],
    fallback: GEN_BENTO_GRIDDLE,
  },
  {
    out: "products/crepe-giant-mix.webp",
    w: 800,
    h: 640,
    urls: [],
    fallback: GEN_HERO_CREPE,
  },
  {
    out: "products/crepe-samurai.webp",
    w: 800,
    h: 640,
    urls: [],
    fallback: GEN_BENTO_GRIDDLE,
  },
  {
    out: "products/crepe-cheese-melt.webp",
    w: 800,
    h: 640,
    urls: ["https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=85"],
    fallback: GEN_BENTO_GRIDDLE,
  },
  {
    out: "products/crepe-fries.webp",
    w: 800,
    h: 640,
    urls: ["https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85"],
    fallback: GEN_HERO_CREPE,
  },

  // Sandwiches & Fries
  {
    out: "products/sandwich-crispy.webp",
    w: 800,
    h: 640,
    urls: ["https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=900&q=85"],
    fallback: GEN_HERO_CREPE,
  },
  {
    out: "products/sandwich-burger.webp",
    w: 800,
    h: 640,
    urls: ["https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=85"],
    fallback: GEN_HERO_CREPE,
  },
  {
    out: "products/sandwich-kofta.webp",
    w: 800,
    h: 640,
    urls: [],
    fallback: "E:/Projects/Chameleon-MaakolatAlsham/public/images/products/western-shish.webp",
  },
  {
    out: "products/sandwich-sausage.webp",
    w: 800,
    h: 640,
    urls: ["https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=900&q=85"],
    fallback: GEN_BENTO_GRIDDLE,
  },
  {
    out: "products/fries-packet.webp",
    w: 800,
    h: 640,
    urls: ["https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=900&q=85"],
    fallback: GEN_HERO_CREPE,
  },

  // Sweet Pies, Waffles & Sweet Crepes
  {
    out: "products/pie-roll-choco.webp",
    w: 800,
    h: 640,
    urls: ["https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=900&q=85"],
    fallback: GEN_HERO_SWEET,
  },
  {
    out: "products/pie-roll-lotus.webp",
    w: 800,
    h: 640,
    urls: ["https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=900&q=85"],
    fallback: GEN_HERO_SWEET,
  },
  {
    out: "products/pie-nutella-fruit.webp",
    w: 800,
    h: 640,
    urls: [],
    fallback: GEN_HERO_SWEET,
  },
  {
    out: "products/pie-lotus-white.webp",
    w: 800,
    h: 640,
    urls: ["https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=85"],
    fallback: GEN_HERO_SWEET,
  },
  {
    out: "products/pie-oreo.webp",
    w: 800,
    h: 640,
    urls: ["https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85"],
    fallback: GEN_HERO_SWEET,
  },
  {
    out: "products/pie-custard-qeshta.webp",
    w: 800,
    h: 640,
    urls: ["https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=85"],
    fallback: GEN_HERO_SWEET,
  },
  {
    out: "products/waffle-nutella.webp",
    w: 800,
    h: 640,
    urls: ["https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=900&q=85"],
    fallback: GEN_HERO_SWEET,
  },
  {
    out: "products/waffle-lotus.webp",
    w: 800,
    h: 640,
    urls: ["https://images.unsplash.com/photo-1504387432042-8aca549e4729?auto=format&fit=crop&w=900&q=85"],
    fallback: GEN_HERO_SWEET,
  },
  {
    out: "products/sweet-crepe-strawberry.webp",
    w: 800,
    h: 640,
    urls: [],
    fallback: GEN_HERO_SWEET,
  },
  {
    out: "products/sweet-crepe-oreo.webp",
    w: 800,
    h: 640,
    urls: ["https://images.unsplash.com/photo-1565299543923-37dd37887442?auto=format&fit=crop&w=900&q=85"],
    fallback: GEN_HERO_SWEET,
  },
  {
    out: "products/sweet-crepe-lotus.webp",
    w: 800,
    h: 640,
    urls: ["https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=900&q=85"],
    fallback: GEN_HERO_SWEET,
  },

  // Drinks
  {
    out: "products/drink-pepsi-can.webp",
    w: 800,
    h: 640,
    urls: ["https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=900&q=85"],
    fallback: "E:/Projects/Chameleon-MaakolatAlsham/public/images/products/drink-pepsi.webp",
  },
  {
    out: "products/drink-pepsi-liter.webp",
    w: 800,
    h: 640,
    urls: ["https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=900&q=85"],
    fallback: "E:/Projects/Chameleon-MaakolatAlsham/public/images/products/drink-pepsi.webp",
  },
  {
    out: "products/drink-water.webp",
    w: 800,
    h: 640,
    urls: ["https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=900&q=85"],
    fallback: "E:/Projects/Chameleon-MaakolatAlsham/public/images/products/drink-water.webp",
  },
];

async function fetchBuffer(url) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) return null;
    const ab = await res.arrayBuffer();
    return Buffer.from(ab);
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}

for (const job of PHOTO_JOBS) {
  let buf = null;
  for (const u of job.urls) {
    buf = await fetchBuffer(u);
    if (buf && buf.length > 5000) break;
  }
  const dest = path.join(ROOT, "public/images", job.out);
  if (buf) {
    await sharp(buf).resize(job.w, job.h, { fit: "cover" }).webp({ quality: 84 }).toFile(dest);
  } else if (job.fallback && fs.existsSync(job.fallback)) {
    await sharp(job.fallback).resize(job.w, job.h, { fit: "cover" }).webp({ quality: 84 }).toFile(dest);
  } else {
    throw new Error(`Missing source for ${job.out}`);
  }
}

// Category thumbnails (`public/images/categories/`)
const CAT_MAP = {
  pizza: "products/pizza-supreme.webp",
  savory_crepe: "products/crepe-crispy.webp",
  mix_crepe: "products/crepe-giant-mix.webp",
  extra_crepe: "products/crepe-cordon-bleu.webp",
  cheese_fries: "products/crepe-cheese-melt.webp",
  sandwiches: "products/sandwich-crispy.webp",
  sweet_pies: "products/pie-roll-choco.webp",
  waffles: "products/waffle-nutella.webp",
  sweet_crepe: "products/sweet-crepe-strawberry.webp",
  drinks: "products/drink-pepsi-can.webp",
};

for (const [slug, rel] of Object.entries(CAT_MAP)) {
  const src = path.join(ROOT, "public/images", rel);
  const dst = path.join(ROOT, `public/images/categories/${slug}.webp`);
  await sharp(src).resize(400, 400, { fit: "cover" }).webp({ quality: 84 }).toFile(dst);
}

// Verify all assets exist and are non-empty
const allChecks = [
  "public/logo-seal.webp",
  "public/logo-emblem.webp",
  "public/logo-emblem.png",
  "public/logo-mobile.webp",
  "public/logo-horizontal.webp",
  "public/logo-horizontal-light.webp",
  "public/logo-icon-only.webp",
  "public/logo-mono.webp",
  "public/logo-reversed.webp",
  "public/favicon.ico",
  "src/app/icon.png",
  "src/app/apple-icon.png",
  "public/icon-192.png",
  "public/icon-512.png",
  "public/icon-maskable-512.png",
  "public/images/hero/hero-crepe-hand.webp",
  "public/images/hero/hero-pizza-supreme.webp",
  "public/images/hero/hero-sweet-crepe.webp",
  "public/images/hero/bento-crepe-griddle.webp",
  ...PHOTO_JOBS.map((j) => `public/images/${j.out}`),
  ...Object.keys(CAT_MAP).map((s) => `public/images/categories/${s}.webp`),
];

for (const rel of allChecks) {
  const st = fs.statSync(path.join(ROOT, rel));
  if (st.size < 1024) throw new Error(`Asset too small: ${rel} (${st.size} bytes)`);
}

console.log(`Done! Verified ${allChecks.length} brand, logo, hero, category, and product assets.`);
