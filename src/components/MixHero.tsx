"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useStore } from "./store";
import {
  CheckIcon,
  CustomizeSlidersIcon,
  PlusIcon,
  QrCodeIcon,
} from "./icons";

interface HeroSlide {
  id: string;
  productId: string;
  productName: string;
  sizeLabel: string;
  price: number;
  headlineTop: string;
  headlineBottom: string;
  subtitle: string;
  calloutTitle: string;
  sticker: string;
  image: string;
  cartImage: string;
  isHandCutout?: boolean;
}

const SLIDES: HeroSlide[] = [
  {
    id: "crepe-hand",
    productId: "mc2",
    productName: "كريب المدمر",
    sizeLabel: "دبل إكسترا",
    price: 195,
    headlineTop: "الكريب والبيتزا",
    headlineBottom: "على أصولهم في بدر",
    subtitle:
      "ميكس كريب وبيتزا — طعم مميز، حشوات غنية، وتوصيل سريع لحد باب بيتك.",
    calloutTitle: "كريب المدمر دبل",
    sticker: "GOLDEN STREET FOOD",
    image: "/images/hero/hero-crepe-hand.webp",
    cartImage: "/images/products/crepe-giant-mix.webp",
    isHandCutout: true,
  },
  {
    id: "pizza-supreme",
    productId: "pz2",
    productName: "بيتزا إيطالي سوبر سوبريم",
    sizeLabel: "كبير L",
    price: 210,
    headlineTop: "بيتزا إيطالي سايحة",
    headlineBottom: "موتزاريلا لآخر لقمة",
    subtitle:
      "عجينة هشة يوميًا، صوص إيطالي أصلي، وموتزاريلا طبيعية ساخنة من الفرن.",
    calloutTitle: "سوبر سوبريم كبير L",
    sticker: "مخبوزة بالفرن الإيطالي",
    image: "/images/hero/hero-pizza-supreme.webp",
    cartImage: "/images/products/pizza-supreme.webp",
  },
  {
    id: "sweet-crepe",
    productId: "swcr1",
    productName: "كريب نوتيلا وفراولة",
    sizeLabel: "حجم قياسي موحد",
    price: 90,
    headlineTop: "تحلية غير عادية",
    headlineBottom: "نوتيلا وفراولة طازجة",
    subtitle:
      "كريب حلو ووافل وفطائر ذهبية غرقانة بالنوتيلا واللوتس والبيستاشيو.",
    calloutTitle: "نوتيلا وفراولة",
    sticker: "الأكثر طلبًا بالحلو",
    image: "/images/hero/hero-sweet-crepe.webp",
    cartImage: "/images/products/sweet-crepe-strawberry.webp",
  },
];

export default function MixHero() {
  const [idx, setIdx] = useState(0);
  const [addedId, setAddedId] = useState<string | null>(null);
  const touchStartX = useRef<number | null>(null);
  const { addToCart } = useStore();

  const slide = SLIDES[idx];

  const handleQuickAdd = () => {
    addToCart({
      productId: slide.productId,
      name: slide.productName,
      image: slide.cartImage,
      sizeLabel: slide.sizeLabel,
      addons: [],
      unitPrice: slide.price,
      qty: 1,
    });
    setAddedId(slide.id);
    setTimeout(() => setAddedId(null), 1300);
  };

  const openQr = () => {
    window.dispatchEvent(new CustomEvent("open-qr-modal"));
  };

  const openBuilder = () => {
    window.dispatchEvent(new CustomEvent("open-crepe-builder"));
  };

  return (
    <section className="px-2.5 sm:px-6 lg:px-8 pt-2.5 sm:pt-4 overflow-x-clip">
      <div className="mx-auto max-w-7xl">
        <div
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
            touchStartX.current = null;
            if (Math.abs(dx) > 44) {
              setIdx((prev) =>
                dx > 0
                  ? (prev + 1) % SLIDES.length
                  : (prev - 1 + SLIDES.length) % SLIDES.length,
              );
            }
          }}
          className="relative rounded-[30px] sm:rounded-[40px] bg-[#0D0D0D] mix-pattern-dark text-[#FFF3D6] overflow-hidden border border-[#FFC21A]/25 shadow-[0_24px_56px_-22px_rgba(13,13,13,0.68)] h-[520px] sm:h-[565px] lg:h-[575px] xl:h-[600px]"
        >
          {/* Warm Golden Studio Spotlight Glow */}
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_62%,rgba(255,194,26,0.18),transparent_62%)]"
            aria-hidden="true"
          />

          {/* DESKTOP LAYOUT (lg:grid) — Strictly Locked Height (h-full) */}
          <div className="hidden lg:grid lg:grid-cols-12 items-center h-full px-10 xl:px-14 relative z-10 overflow-hidden">
            {/* Right Column (RTL Cols 1-5): Headline + Subtitle + 3 CTAs */}
            <div className="col-span-5 text-right z-20 flex flex-col justify-center h-full py-10">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/8 border border-[#FFC21A]/40 px-3.5 py-1 text-xs font-extrabold text-[#FFC21A]">
                  <span>MIX Crepe & Pizza • مول 8 — مدينة بدر</span>
                </div>

                <h1 className="font-display mt-4 text-[36px] xl:text-[44px] font-black leading-[1.12] tracking-tight text-[#FFF3D6]">
                  <span className="block whitespace-nowrap">
                    {slide.headlineTop}
                  </span>
                  <span className="block text-[#FFC21A] mt-1 whitespace-nowrap">
                    {slide.headlineBottom}
                  </span>
                </h1>

                <p className="mt-4 text-base xl:text-lg font-bold text-[#FFF3D6]/85 leading-relaxed max-w-md h-[56px] line-clamp-2">
                  {slide.subtitle}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-2.5">
                  <Link
                    href="/menu"
                    className="rounded-full bg-[#FFC21A] hover:bg-[#F59E0B] text-[#0D0D0D] px-6 py-3.5 text-sm font-black transition shadow-md"
                  >
                    شوف المنيو
                  </Link>
                  <button
                    type="button"
                    onClick={openBuilder}
                    className="rounded-full bg-[#FFF3D6] hover:bg-[#FFC21A] text-[#0D0D0D] px-5 py-3.5 text-xs font-black inline-flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <CustomizeSlidersIcon className="w-4 h-4 shrink-0" />
                    <span>مكسها على مزاجك</span>
                  </button>
                  <button
                    type="button"
                    onClick={openQr}
                    className="rounded-full bg-white/10 hover:bg-white/20 border border-[#FFC21A]/35 text-[#FFF3D6] px-4 py-3.5 text-xs font-black inline-flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <QrCodeIcon className="w-4 h-4 text-[#FFC21A]" />
                    <span>باركود QR</span>
                  </button>
                </div>

                {/* Slide Switcher Dots */}
                <div className="mt-6 flex items-center gap-2">
                  {SLIDES.map((s, i) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setIdx(i)}
                      className={`h-2.5 rounded-full transition-all cursor-pointer ${
                        i === idx
                          ? "w-9 bg-[#FFC21A]"
                          : "w-2.5 bg-[#FFF3D6]/35 hover:bg-[#FFF3D6]/65"
                      }`}
                      aria-label={s.calloutTitle}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Center Column (Cols 6-9): Fixed-Height Visual Stage */}
            <div className="col-span-4 h-full flex items-end justify-center relative z-10 overflow-hidden">
              {slide.isHandCutout ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={slide.image}
                  alt={slide.productName}
                  className="h-[510px] xl:h-[545px] w-auto object-contain object-bottom block select-none translate-y-1 drop-shadow-[0_18px_32px_rgba(255,194,26,0.22)]"
                />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="w-[325px] h-[325px] xl:w-[355px] xl:h-[355px] rounded-[36px] bg-[#171717] border-2 border-[#FFC21A]/45 p-3.5 shadow-2xl overflow-hidden flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={slide.image}
                      alt={slide.productName}
                      className="w-full h-full object-cover rounded-[26px]"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Left Column (RTL Cols 10-12): Callout + Quick-Add + Tilted Golden Sticker */}
            <div className="col-span-3 flex flex-col items-end justify-between h-full py-12 z-20">
              <div className="mt-8 flex items-center gap-3.5" dir="ltr">
                <button
                  type="button"
                  onClick={handleQuickAdd}
                  aria-label={`أضف ${slide.calloutTitle} للسلة`}
                  title="أضف سريعًا إلى السلة"
                  className={`w-12 h-12 rounded-full grid place-items-center shadow-lg transition active:scale-95 cursor-pointer shrink-0 ${
                    addedId === slide.id
                      ? "bg-[#F59E0B] text-[#0D0D0D]"
                      : "bg-[#FFF3D6] hover:bg-[#FFC21A] text-[#0D0D0D]"
                  }`}
                >
                  {addedId === slide.id ? (
                    <CheckIcon className="w-5 h-5" />
                  ) : (
                    <PlusIcon className="w-5 h-5" />
                  )}
                </button>

                <div className="text-right" dir="rtl">
                  <div className="text-lg xl:text-xl font-black text-[#FFF3D6] whitespace-nowrap">
                    {slide.calloutTitle}
                  </div>
                  <div className="mt-1 inline-flex items-center rounded-full bg-[#FFC21A] text-[#0D0D0D] px-3.5 py-0.5 text-sm font-black shadow-xs tabular-nums">
                    {slide.price} ج.م
                  </div>
                </div>

                <svg
                  viewBox="0 0 84 54"
                  fill="none"
                  className="w-16 h-11 text-[#FFC21A] shrink-0 mt-3"
                  aria-hidden="true"
                >
                  <path
                    d="M8 38 C 26 48, 44 42, 46 24 C 48 11, 34 12, 35 24 C 36 36, 58 34, 75 16"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M66 15 L76 15 L74 25"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="mb-4 self-start ms-4">
                <span className="inline-block rounded-full bg-[#FFC21A] text-[#0D0D0D] px-5 py-2 text-xs font-en-display font-black tracking-wide shadow-md -rotate-6 select-none whitespace-nowrap">
                  {slide.sticker}
                </span>
              </div>
            </div>
          </div>

          {/* MOBILE & TABLET LAYOUT (lg:hidden) — Locked Height (h-full) */}
          <div className="lg:hidden relative z-10 px-4 sm:px-6 pt-5 h-full flex flex-col items-center justify-between text-center overflow-hidden">
            {/* Fixed Top Copy & CTA Area */}
            <div className="w-full flex flex-col items-center shrink-0">
              <span className="inline-flex items-center rounded-full bg-white/8 border border-[#FFC21A]/40 px-3 py-1 text-[11px] font-extrabold text-[#FFC21A]">
                MIX Crepe & Pizza • مول 8 — مدينة بدر
              </span>

              <h1 className="font-display mt-2.5 text-[28px] sm:text-[40px] font-black leading-[1.1] tracking-tight text-[#FFF3D6] w-full">
                <span className="block truncate">{slide.headlineTop}</span>
                <span className="block text-[#FFC21A] mt-0.5 truncate">
                  {slide.headlineBottom}
                </span>
              </h1>

              <p className="mt-1.5 text-xs sm:text-sm font-bold text-[#FFF3D6]/85 max-w-xs sm:max-w-md leading-relaxed h-[38px] sm:h-[42px] line-clamp-2 flex items-center justify-center">
                {slide.subtitle}
              </p>

              <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                <Link
                  href="/menu"
                  className="rounded-full bg-[#FFC21A] text-[#0D0D0D] px-4 py-2 text-xs font-black shadow-sm"
                >
                  شوف المنيو
                </Link>
                <button
                  type="button"
                  onClick={openBuilder}
                  className="rounded-full bg-[#FFF3D6] text-[#0D0D0D] px-3.5 py-2 text-xs font-black inline-flex items-center gap-1 cursor-pointer"
                >
                  <CustomizeSlidersIcon className="w-3.5 h-3.5" />
                  <span>مكسها على مزاجك</span>
                </button>
                <button
                  type="button"
                  onClick={openQr}
                  className="rounded-full bg-white/10 border border-[#FFC21A]/35 text-[#FFF3D6] px-3 py-2 text-xs font-black inline-flex items-center gap-1 cursor-pointer"
                >
                  <QrCodeIcon className="w-3.5 h-3.5 text-[#FFC21A]" />
                  <span className="font-en">QR</span>
                </button>
              </div>
            </div>

            {/* Fixed-Height Bottom Visual Stage */}
            <div className="relative w-full h-[250px] sm:h-[290px] shrink-0 flex items-end justify-center overflow-hidden">
              {/* Right Floating Callout + Yellow Price Pill */}
              <div className="absolute right-0 top-8 sm:top-11 z-20 text-right max-w-[115px] sm:max-w-none">
                <div className="text-xs sm:text-sm font-black text-[#FFF3D6] leading-tight">
                  {slide.calloutTitle}
                </div>
                <span className="mt-1 inline-flex items-center rounded-full bg-[#FFC21A] text-[#0D0D0D] px-2.5 py-0.5 text-[11px] sm:text-xs font-black shadow-xs tabular-nums">
                  {slide.price} ج.م
                </span>
              </div>

              {/* Left Curved Golden Arrow + Circular `+` Button */}
              <div className="absolute left-1 top-5 sm:top-8 z-20 flex flex-col items-center gap-2">
                <svg
                  viewBox="0 0 64 46"
                  fill="none"
                  className="w-10 h-7 text-[#FFC21A]"
                  aria-hidden="true"
                >
                  <path
                    d="M10 8 C 8 28, 28 32, 50 22"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M43 18 L52 21 L47 29"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <button
                  type="button"
                  onClick={handleQuickAdd}
                  aria-label={`أضف ${slide.calloutTitle} للسلة`}
                  className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full grid place-items-center shadow-lg transition active:scale-95 cursor-pointer ${
                    addedId === slide.id
                      ? "bg-[#F59E0B] text-[#0D0D0D]"
                      : "bg-[#FFF3D6] text-[#0D0D0D]"
                  }`}
                >
                  {addedId === slide.id ? (
                    <CheckIcon className="w-4 h-4" />
                  ) : (
                    <PlusIcon className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Center Hero Image */}
              {slide.isHandCutout ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={slide.image}
                  alt={slide.productName}
                  className="h-[240px] sm:h-[280px] w-auto object-contain object-bottom block select-none translate-y-1 drop-shadow-[0_14px_24px_rgba(255,194,26,0.22)]"
                />
              ) : (
                <div className="h-full flex items-center justify-center pb-3">
                  <div className="w-[186px] h-[186px] sm:w-[224px] sm:h-[224px] rounded-[28px] bg-[#171717] border-2 border-[#FFC21A]/45 p-2 shadow-xl overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={slide.image}
                      alt={slide.productName}
                      className="w-full h-full object-cover rounded-[20px]"
                    />
                  </div>
                </div>
              )}

              {/* Mobile Slide Dots at Bottom Left */}
              <div className="absolute bottom-3 left-1 z-20 flex items-center gap-1.5">
                {SLIDES.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setIdx(i)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      i === idx ? "w-6 bg-[#FFC21A]" : "w-2 bg-[#FFF3D6]/40"
                    }`}
                    aria-label={s.calloutTitle}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
