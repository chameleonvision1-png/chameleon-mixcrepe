import type { Metadata } from "next";
import { publicDB } from "@/lib/db";
import MenuClient from "@/components/MenuClient";
import OpenQrButton from "@/components/OpenQrButton";
import OpenCrepeBuilderButton from "@/components/OpenCrepeBuilderButton";
import { PhoneIcon, TalabatIcon } from "@/components/icons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "منيو MIX Crepe & Pizza الكامل — البيتزا والكريب والوافل",
  description:
    "تصفح منيو مطعم ميكس كريب وبيتزا بمدينة بدر بالكامل: بيتزا إيطالي، كريب دجاج ولحوم، ميكسات عملاقة، ساندوتشات، بطاطس وجبن، فطائر حلوة، وافل، كريب حلو، ومشروبات.",
  openGraph: {
    images: ["/og-menu.jpg"],
  },
};

export default async function MenuPage(props: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const sp = await props.searchParams;
  const db = await publicDB();
  const categories = [...db.categories].sort(
    (a, b) => a.sortOrder - b.sortOrder,
  );
  const talabatUrl =
    db.settings.talabatUrl ||
    db.settings.talabat ||
    "https://www.talabat.com/ar/egypt/restaurant/684423/mix-crepe-and-pizza?aid=9534";

  return (
    <div className="pb-10">
      {/* Dark Charcoal Header Banner — Emblem Logo ONLY */}
      <div className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8 pt-4">
        <div className="rounded-[28px] sm:rounded-[36px] bg-[#0D0D0D] mix-pattern-dark text-white border-2 border-[#FFC21A]/35 p-5 sm:p-7 lg:p-8 shadow-xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-5">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-right min-w-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-emblem.webp"
                alt="MIX Crepe & Pizza"
                className="w-18 h-18 sm:w-22 sm:h-22 rounded-full object-contain border-2 border-[#FFC21A] bg-[#0D0D0D] p-1 shadow-lg shrink-0"
              />
              <div className="min-w-0">
                <span className="inline-block rounded-full bg-[#FFC21A] text-[#0D0D0D] px-3 py-0.5 text-[11px] font-black mb-1.5">
                  أكثر من {db.products.length} صنف محضر طازة
                </span>
                <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                  منيو ميكس كريب وبيتزا الكامل
                </h1>
                <p className="text-xs sm:text-sm font-semibold text-white/80 mt-1">
                  بيتزا إيطالي • كريبات وميكسات • بطاطس وجبن • فطائر حلوة ووافل
                  • مول 8 مدينة بدر
                </p>
              </div>
            </div>

            {/* Symmetrical 4-Action Grid — Strictly Single-Line Pills */}
            <div className="grid grid-cols-2 gap-2 w-full lg:w-auto shrink-0">
              <OpenCrepeBuilderButton
                label="مكسها على مزاجك"
                className="h-11 rounded-full bg-[#FFC21A] hover:bg-[#F59E0B] text-[#0D0D0D] px-3 sm:px-4 text-[11px] sm:text-xs font-black inline-flex items-center justify-center gap-1.5 transition cursor-pointer whitespace-nowrap"
              />
              <OpenQrButton
                label="باركود QR"
                className="h-11 rounded-full bg-white/10 hover:bg-white/20 border border-[#FFC21A]/40 text-white px-3 sm:px-4 text-[11px] sm:text-xs font-black inline-flex items-center justify-center gap-1.5 transition cursor-pointer whitespace-nowrap"
                iconClassName="w-4 h-4 text-[#FFC21A] shrink-0"
              />
              <a
                href={talabatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 rounded-full bg-white hover:bg-[#FFF3D6] text-[#0D0D0D] px-3 sm:px-4 text-[11px] sm:text-xs font-black inline-flex items-center justify-center gap-1.5 transition whitespace-nowrap"
              >
                <TalabatIcon className="w-4 h-4 text-[#F59E0B] shrink-0" />
                <span>اطلب من طلبات</span>
              </a>
              <a
                href="tel:01098923225"
                dir="ltr"
                className="h-11 rounded-full bg-white/10 hover:bg-[#FFC21A] text-[#FFC21A] hover:text-[#0D0D0D] border border-white/20 px-3 sm:px-4 text-[11px] sm:text-xs font-en font-black inline-flex items-center justify-center gap-1.5 transition whitespace-nowrap"
              >
                <PhoneIcon className="w-3.5 h-3.5 shrink-0" />
                <span>01098923225</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <MenuClient
        categories={categories}
        products={db.products}
        initialCat={sp.cat}
      />
    </div>
  );
}
