import type { Metadata } from "next";
import Link from "next/link";
import { publicDB } from "@/lib/db";
import OfferCard from "@/components/OfferCard";
import OpenCrepeBuilderButton from "@/components/OpenCrepeBuilderButton";
import { OfferTagIcon } from "@/components/icons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "العروض والتوفير",
  description:
    "أحدث عروض وخصومات ميكس كريب وبيتزا (MIX Crepe & Pizza) في مدينة بدر — بوكسات الشلة، كومبو الكريب 180 بدل 250 ج.م، وعروض البيتزا الإيطالي.",
};

async function loadActiveOffers() {
  const db = await publicDB();
  const now = Date.now();
  return db.offers.filter(
    (o) => o.isActive && new Date(o.endsAt).getTime() >= now,
  );
}

export default async function OffersPage() {
  const activeOffers = await loadActiveOffers();

  return (
    <div className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      <div className="rounded-[30px] sm:rounded-[38px] bg-[#0D0D0D] mix-pattern-dark text-white border-2 border-[#FFC21A]/40 p-6 sm:p-10 text-center space-y-3 shadow-xl">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFC21A] text-[#0D0D0D] px-4 py-1 text-xs font-black">
          <OfferTagIcon className="w-4 h-4 shrink-0" />
          <span>عروض وبوكسات التوفير • MIX Crepe & Pizza</span>
        </span>
        <h1 className="font-display text-2xl sm:text-4xl font-black text-white">
          أقوى عروض ميكس كريب وبيتزا في مدينة بدر
        </h1>
        <p className="text-xs sm:text-sm font-semibold text-white/80 max-w-2xl mx-auto leading-relaxed">
          أضف أي عرض مباشر إلى السلة بسعر مخفض أو صمّم الكريب الخاص بك عبر
          مكسها على مزاجك.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
          <Link href="/menu" className="btn bg-[#FFC21A] text-[#0D0D0D] text-xs">
            المنيو الكامل
          </Link>
          <OpenCrepeBuilderButton label="مكسها على مزاجك" />
        </div>
      </div>

      {activeOffers.length === 0 ? (
        <div className="rounded-[28px] bg-white border border-[#0D0D0D]/14 p-12 text-center">
          <h2 className="font-display text-xl font-black text-[#0D0D0D]">
            لا توجد عروض نشطة حاليًا
          </h2>
          <p className="text-sm text-[#0D0D0D]/65 mt-1 font-semibold">
            تصفح المنيو الكامل لأكثر من 110 صنف من البيتزا والكريب والوافل.
          </p>
          <Link href="/menu" className="btn btn-primary mt-4 text-xs">
            افتح المنيو
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {activeOffers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      )}
    </div>
  );
}
