import type { Metadata } from "next";
import Link from "next/link";
import { publicDB } from "@/lib/db";
import {
  CrepeConeIcon,
  PaletteIcon,
  PizzaSliceIcon,
  ScooterIcon,
  StarIcon,
} from "@/components/icons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "عن ميكس كريب وبيتزا",
  description:
    "تعرّف على قصة مطعم MIX Crepe & Pizza (ميكس كريب وبيتزا) في مدينة بدر — شغف بالبيتزا الإيطالي والكريبات العملاقة والوافل طازجة يوميًا.",
};

export default async function AboutPage() {
  const db = await publicDB();

  return (
    <div className="mx-auto max-w-6xl px-3.5 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      <div className="rounded-[32px] bg-[#0D0D0D] mix-pattern-dark text-white border-2 border-[#FFC21A]/40 p-6 sm:p-10 shadow-xl grid lg:grid-cols-12 gap-7 items-center">
        <div className="lg:col-span-7 space-y-4 text-center lg:text-right">
          <span className="inline-block rounded-full bg-[#FFC21A] text-[#0D0D0D] px-4 py-1 text-xs font-en-display font-black">
            MIX CREPE & PIZZA • BADR CITY
          </span>
          <h1 className="font-display text-2xl sm:text-4xl font-black text-white leading-tight">
            قصة ميكس كريب وبيتزا في قلب مدينة بدر
          </h1>
          <p className="text-xs sm:text-sm lg:text-base font-bold text-white/80 leading-relaxed">
            بدأنا بهدف بسيط في مدينة بدر بشارع الجامعة الروسية (مول 8): تقديم
            أفضل كريب مقرمش بحشوات غنية وبيتزا بعجينة إيطالية هشة وموتزاريلا
            سايحة، مع ركن خاص للوافل والفطائر الحلوة — باستخدام خامات عالية
            الجودة وتحضير طازج لكل أوردر.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1">
            <Link
              href="/menu"
              className="rounded-full bg-[#FFC21A] hover:bg-[#F59E0B] text-[#0D0D0D] px-6 py-3 text-xs sm:text-sm font-black transition"
            >
              تصفح المنيو ({db.products.length}+ صنف)
            </Link>
            <Link
              href="/brand"
              className="rounded-full bg-white/10 hover:bg-white/20 text-white border border-[#FFC21A]/40 px-5 py-3 text-xs sm:text-sm font-black inline-flex items-center gap-2 transition"
            >
              <PaletteIcon className="w-4 h-4 text-[#FFC21A]" />
              <span>دليل الهوية البصرية</span>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-[28px] overflow-hidden border-2 border-[#FFC21A] bg-[#171717]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/brand/storefront-signage.webp"
              alt="واجهة مطعم ميكس كريب وبيتزا"
              className="w-full h-64 sm:h-72 object-cover"
            />
          </div>
        </div>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-[24px] bg-white border border-[#0D0D0D]/14 p-5 space-y-2">
          <PizzaSliceIcon className="w-7 h-7 text-[#F59E0B]" />
          <h2 className="font-display text-base font-black text-[#0D0D0D]">
            29 صنف بيتزا إيطالي
          </h2>
          <p className="text-xs font-semibold text-[#0D0D0D]/70 leading-relaxed">
            صوص طماطم متبل وموتزاريلا سايحة وعجينة تُخبز طازجة على الطلب.
          </p>
        </div>

        <div className="rounded-[24px] bg-white border border-[#0D0D0D]/14 p-5 space-y-2">
          <CrepeConeIcon className="w-7 h-7 text-[#F59E0B]" />
          <h2 className="font-display text-base font-black text-[#0D0D0D]">
            كريبات الوحوش والميكس
          </h2>
          <p className="text-xs font-semibold text-[#0D0D0D]/70 leading-relaxed">
            كريب الفيل والمدمر والساموراي بالإضافة لميزة مكسها على مزاجك.
          </p>
        </div>

        <div className="rounded-[24px] bg-white border border-[#0D0D0D]/14 p-5 space-y-2">
          <StarIcon className="w-7 h-7 text-[#F59E0B]" />
          <h2 className="font-display text-base font-black text-[#0D0D0D]">
            100% توصية العملاء
          </h2>
          <p className="text-xs font-semibold text-[#0D0D0D]/70 leading-relaxed">
            ثقة أكثر من 61 ألف متابع وتقييم ممتاز من أهالي وطلاب مدينة بدر.
          </p>
        </div>

        <div className="rounded-[24px] bg-white border border-[#0D0D0D]/14 p-5 space-y-2">
          <ScooterIcon className="w-7 h-7 text-[#F59E0B]" />
          <h2 className="font-display text-base font-black text-[#0D0D0D]">
            توصيل سريع بمدينة بدر
          </h2>
          <p className="text-xs font-semibold text-[#0D0D0D]/70 leading-relaxed">
            توصيل مباشر، استلام من المطعم، استلام من السيارة وجلسات خارجية.
          </p>
        </div>
      </div>
    </div>
  );
}
