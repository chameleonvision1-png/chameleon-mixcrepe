import type { Metadata } from "next";
import Link from "next/link";
import { publicDB } from "@/lib/db";
import MixHero from "@/components/MixHero";
import FavouritesShowcase from "@/components/FavouritesShowcase";
import ReviewsBannerCarousel from "@/components/ReviewsBannerCarousel";
import BranchesShowcase from "@/components/BranchesShowcase";
import OfferCard from "@/components/OfferCard";
import OpenCrepeBuilderButton from "@/components/OpenCrepeBuilderButton";
import {
  CrepeConeIcon,
  OfferTagIcon,
  PaletteIcon,
  PizzaSliceIcon,
  ScooterIcon,
  StarIcon,
  TalabatIcon,
} from "@/components/icons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title:
    "MIX Crepe & Pizza | ميكس كريب وبيتزا — أفضل كريب وبيتزا إيطالي ووافل في مدينة بدر",
  description:
    "مطعم ميكس كريب وبيتزا (MIX Crepe & Pizza) في مدينة بدر — مول 8 شارع الجامعة الروسية. بيتزا إيطالي طازجة، ميكس كريب، وافل، وفطائر حلوة مع توصيل سريع وخدمة مكسها على مزاجك.",
};

async function loadHomeData() {
  const db = await publicDB();
  const activeBranches = db.branches.filter((b) => b.isActive);
  const bestSellers = db.products
    .filter((p) => p.isBestSeller && p.isAvailable)
    .slice(0, 14);
  const now = Date.now();
  const activeOffers = db.offers
    .filter((o) => o.isActive && new Date(o.endsAt).getTime() >= now)
    .slice(0, 4);
  return { db, activeBranches, bestSellers, activeOffers };
}

export default async function HomePage() {
  const { db, activeBranches, bestSellers, activeOffers } = await loadHomeData();

  const talabatUrl =
    db.settings.talabatUrl ||
    db.settings.talabat ||
    "https://www.talabat.com/ar/egypt/restaurant/684423/mix-crepe-and-pizza?aid=9534";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "MIX Crepe & Pizza — ميكس كريب وبيتزا",
    alternateName: "ميكس كريب وبيتزا",
    url: "https://mixcrepe.chameleon.vision",
    image: "https://mixcrepe.chameleon.vision/og-image.jpg",
    logo: "https://mixcrepe.chameleon.vision/logo-seal.webp",
    servesCuisine: ["Italian Pizza", "Crepes", "Waffles", "Street Food"],
    priceRange: "$$",
    telephone: ["+201098923225", "+201125119375"],
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "شارع الجامعة الروسية — مول 8 — بجوار صيدلية العزبي وبنك QNB الأهلي",
      addressLocality: "مدينة بدر",
      addressRegion: "القاهرة",
      postalCode: "11829",
      addressCountry: "EG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 30.1413125,
      longitude: 31.7200625,
    },
    hasMenu: "https://mixcrepe.chameleon.vision/menu",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Saturday",
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    sameAs: [
      db.settings.facebook,
      db.settings.instagram,
      db.settings.tiktok,
      talabatUrl,
    ].filter(Boolean),
  };

  return (
    <div className="space-y-4 pb-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Hero Section */}
      <MixHero />

      {/* 2. Brand Introduction + Verified Social Proof Strip */}
      <section className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        <div className="rounded-[30px] sm:rounded-[38px] bg-white border border-[#0D0D0D]/14 p-5 sm:p-8 lg:p-10 shadow-[0_14px_38px_-20px_rgba(13,13,13,0.16)] grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 min-w-0 text-center lg:text-right space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FFC21A] text-[#0D0D0D] px-4 py-1 text-xs font-en-display font-black tracking-wide">
              <span>GOLDEN STREET FOOD</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-[#0D0D0D] leading-tight">
              أفضل أنواع الكريب والبيتزا الإيطالي والوافل{" "}
              <span className="text-[#F59E0B]">بمدينة بدر</span>
            </h2>

            <p className="text-xs sm:text-sm lg:text-base font-bold text-[#0D0D0D]/72 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              طعم مميز وخامات عالية الجودة في قلب مدينة بدر بمول 8 أمام الجامعة
              الروسية — أكثر من 110 صنف من البيتزا الإيطالي، الكريبات العملاقة،
              الفطائر الحلوة، والوافل الساخن مع توصيل سريع لجميع الأحياء.
            </p>

            {/* 4 Verified Proof Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              <div className="rounded-2xl bg-[#FFF3D6] border border-[#0D0D0D]/10 p-3 text-center">
                <div className="font-en text-lg sm:text-xl font-black text-[#0D0D0D]">
                  +61K
                </div>
                <div className="text-[11px] font-extrabold text-[#0D0D0D]/70 mt-0.5">
                  متابع على فيسبوك
                </div>
              </div>

              <div className="rounded-2xl bg-[#FFF3D6] border border-[#0D0D0D]/10 p-3 text-center">
                <div className="font-en text-lg sm:text-xl font-black text-[#0D0D0D] inline-flex items-center justify-center gap-1">
                  <span>100%</span>
                  <StarIcon className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                </div>
                <div className="text-[11px] font-extrabold text-[#0D0D0D]/70 mt-0.5">
                  توصية من 83 مراجعة
                </div>
              </div>

              <div className="rounded-2xl bg-[#0D0D0D] text-[#FFC21A] p-3 text-center">
                <div className="text-sm sm:text-base font-black">مفتوح دائمًا</div>
                <div className="text-[11px] font-bold text-white/75 mt-0.5">
                  توصيل واستلام سريع
                </div>
              </div>

              <div className="rounded-2xl bg-[#FFC21A] text-[#0D0D0D] p-3 text-center">
                <div className="text-sm sm:text-base font-black">مول 8 بدر</div>
                <div className="text-[11px] font-extrabold text-[#0D0D0D]/80 mt-0.5">
                  شارع الجامعة الروسية
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <Link
                href="/brand"
                className="inline-flex items-center gap-2 rounded-full bg-[#0D0D0D] hover:bg-[#171717] text-[#FFC21A] px-5 py-2.5 text-xs font-black transition"
              >
                <PaletteIcon className="w-4 h-4 shrink-0" />
                <span>استكشف الهوية البصرية لـ MIX</span>
              </Link>
              <a
                href={talabatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#FFF3D6] hover:bg-[#FFC21A] text-[#0D0D0D] border border-[#0D0D0D]/15 px-5 py-2.5 text-xs font-black transition"
              >
                <TalabatIcon className="w-4 h-4 text-[#F59E0B] shrink-0" />
                <span>اطلب من طلبات</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 min-w-0">
            <div className="relative rounded-[28px] overflow-hidden border-2 border-[#FFC21A] bg-[#0D0D0D] aspect-[4/3] shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero/wide-streetfood-banner.webp"
                alt="MIX Crepe & Pizza — بيتزا وكريب ووافل في مدينة بدر"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/70 to-transparent p-4 flex items-center justify-between gap-2">
                <span className="text-xs font-black text-white">
                  تشكيلة الحادق والحلو طازة على الطلب
                </span>
                <span className="rounded-full bg-[#FFC21A] text-[#0D0D0D] px-3 py-1 text-[11px] font-black shrink-0 inline-flex items-center gap-1">
                  <ScooterIcon className="w-3.5 h-3.5" />
                  <span>توصيل لبدر</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Signature Two-Column Bento: Italian Pizza vs. Giant Crepes */}
      <section className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
          {/* Dark Bento Card — Italian Pizza */}
          <div className="rounded-[30px] sm:rounded-[36px] bg-[#0D0D0D] mix-pattern-dark text-white border border-[#FFC21A]/30 p-5 sm:p-7 flex flex-col sm:flex-row items-center gap-5 shadow-lg overflow-hidden">
            <div className="w-full sm:w-48 h-48 rounded-[24px] overflow-hidden border-2 border-[#FFC21A]/45 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero/hero-pizza-supreme.webp"
                alt="البيتزا الإيطالي في ميكس كريب وبيتزا"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 text-center sm:text-right space-y-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFC21A] text-[#0D0D0D] px-3 py-0.5 text-[11px] font-black">
                <PizzaSliceIcon className="w-3.5 h-3.5" />
                <span>29 صنف بيتزا إيطالي</span>
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-black text-white">
                عجينة إيطالية وموتزاريلا سايحة
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-white/78 leading-relaxed">
                من المارجريتا والسوبر سوبريم والدجاج رانش لحد السي فود والميكس
                جبن بأحجام وسط M وكبير L.
              </p>
              <div className="pt-1">
                <Link
                  href="/menu?cat=pizza"
                  className="inline-flex items-center justify-center rounded-full bg-[#FFC21A] hover:bg-[#F59E0B] text-[#0D0D0D] px-5 py-2.5 text-xs font-black transition"
                >
                  استكشف قسم البيتزا الإيطالي
                </Link>
              </div>
            </div>
          </div>

          {/* Golden Bento Card — Crepe Griddle */}
          <div className="rounded-[30px] sm:rounded-[36px] bg-[#FFC21A] text-[#0D0D0D] border-2 border-[#0D0D0D]/15 p-5 sm:p-7 flex flex-col sm:flex-row items-center gap-5 shadow-lg overflow-hidden">
            <div className="w-full sm:w-48 h-48 rounded-[24px] overflow-hidden border-2 border-[#0D0D0D]/25 shrink-0 bg-[#0D0D0D]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero/bento-crepe-griddle.webp"
                alt="ميكس كريب وعملاق الكريب على الصاج"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 text-center sm:text-right space-y-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0D0D0D] text-[#FFC21A] px-3 py-0.5 text-[11px] font-black">
                <CrepeConeIcon className="w-3.5 h-3.5" />
                <span>الوحوش والميكسات الحادقة</span>
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-black text-[#0D0D0D]">
                كريب الفيل والمدمر على الصاج
              </h3>
              <p className="text-xs sm:text-sm font-bold text-[#0D0D0D]/80 leading-relaxed">
                كريبات سنجل ودبل إكسترا، رولات مقطعة، وحشوات مزدوجة من
                الكرسبي والكوردن بلو والبرجر والشاورما.
              </p>
              <div className="pt-1">
                <Link
                  href="/menu?cat=mix_crepe"
                  className="inline-flex items-center justify-center rounded-full bg-[#0D0D0D] hover:bg-black text-[#FFC21A] px-5 py-2.5 text-xs font-black transition"
                >
                  اكتشف ميكس الكريب والوحوش
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Crepe Builder Callout Banner */}
      <section className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8 py-3">
        <div className="rounded-[30px] sm:rounded-[38px] bg-[#0D0D0D] mix-pattern-dark text-white border-2 border-[#FFC21A] p-6 sm:p-9 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-[0_20px_46px_-22px_rgba(13,13,13,0.65)]">
          <div className="text-center lg:text-right space-y-2 max-w-2xl">
            <span className="inline-block rounded-full bg-[#FFC21A] text-[#0D0D0D] px-3.5 py-1 text-xs font-black">
              تجربة حصرية في MIX • سعر فوري
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-white leading-tight">
              اختار الحشوة وسيب الباقي علينا —{" "}
              <span className="text-[#FFC21A]">مكسها على مزاجك</span>
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-white/80 leading-relaxed">
              حدّد قاعدة الكريب (سنجل أو دبل إكسترا أو رول مقطع) واجمع حتى 3
              حشوات + الجبنة السايحة + الصوصات والإضافات وشوف السعر لحظيًا قبل
              الإضافة للسلة.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <OpenCrepeBuilderButton
              label="ابدأ تصميم كريبك الآن"
              className="rounded-full bg-[#FFC21A] hover:bg-[#F59E0B] text-[#0D0D0D] px-7 py-3.5 text-sm font-black inline-flex items-center gap-2 transition shadow-lg cursor-pointer"
            />
          </div>
        </div>
      </section>

      {/* 5. Best Sellers Carousel */}
      <FavouritesShowcase products={bestSellers} />

      {/* 6. Active Offers Section */}
      {activeOffers.length > 0 && (
        <section className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
            <div className="text-center sm:text-right">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#FFC21A] text-[#0D0D0D] px-3.5 py-1 text-xs font-black mb-2">
                <OfferTagIcon className="w-3.5 h-3.5" />
                <span>عروض التوفير والبوكسات</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-[#0D0D0D]">
                أقوى عروض ميكس كريب وبيتزا
              </h2>
            </div>

            <Link
              href="/offers"
              className="self-center sm:self-auto rounded-full bg-[#0D0D0D] hover:bg-[#171717] text-[#FFC21A] px-5 py-2.5 text-xs font-black transition"
            >
              عرض كل العروض
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {activeOffers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        </section>
      )}

      {/* 7. Customer Reviews Carousel */}
      <ReviewsBannerCarousel reviews={db.reviews} />

      {/* 8. Active Branch & Delivery Zones */}
      <section className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8 pt-4">
        <div className="text-center sm:text-right mb-5">
          <h2 className="font-display text-2xl sm:text-3xl font-black text-[#0D0D0D]">
            موقعنا وتوصيل مدينة بدر
          </h2>
          <p className="text-xs sm:text-sm font-bold text-[#0D0D0D]/65 mt-1">
            فرع مدينة بدر — شارع الجامعة الروسية — مول 8 بجوار صيدلية العزبي
            وبنك QNB الأهلي
          </p>
        </div>

        <BranchesShowcase branches={activeBranches} settings={db.settings} />
      </section>
    </div>
  );
}
