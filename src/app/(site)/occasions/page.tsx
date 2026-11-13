import type { Metadata } from "next";
import { publicDB } from "@/lib/db";
import OccasionForm from "@/components/OccasionForm";
import { CheckIcon, PinIcon, ScooterIcon } from "@/components/icons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "بوكسات التجمعات والمناسبات",
  description:
    "اطلب بوكسات التجمعات الكبيرة، تجمعات طلاب الجامعة الروسية وBUC، أعياد الميلاد وطلبات الشركات في مدينة بدر من MIX Crepe & Pizza.",
};

export default async function OccasionsPage() {
  const db = await publicDB();
  const activeBranches = db.branches.filter((b) => b.isActive);

  return (
    <div className="mx-auto max-w-6xl px-3.5 sm:px-6 lg:px-8 py-6 sm:py-10 grid lg:grid-cols-12 gap-7 items-start">
      <div className="lg:col-span-6 space-y-5">
        <div className="rounded-[30px] bg-[#0D0D0D] mix-pattern-dark text-white border-2 border-[#FFC21A]/35 p-6 sm:p-8 shadow-xl space-y-3">
          <span className="inline-block rounded-full bg-[#FFC21A] text-[#0D0D0D] px-3.5 py-1 text-xs font-black">
            تجمعات الطلبة والشركات والعزومات
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-black text-white leading-tight">
            تجهيز بوكسات التجمعات وأعياد الميلاد في مدينة بدر
          </h1>
          <p className="text-xs sm:text-sm font-bold text-white/80 leading-relaxed">
            سواء تجمع طلاب في الجامعة الروسية أو جامعة بدر BUC أو حفلة عيد ميلاد
            أو اجتماع شركة — بنجهزلك طلبات كبيرة من البيتزا الإيطالي، ميكسات
            الكريب المقطعة، ووافل الشوكولاتة في الميعاد المحدد تمامًا.
          </p>
        </div>

        <div className="rounded-[28px] bg-white border border-[#0D0D0D]/14 p-5 sm:p-6 space-y-3">
          <h2 className="font-display text-lg font-black text-[#0D0D0D]">
            مميزات طلبات المجموعات من MIX
          </h2>
          <ul className="space-y-2.5 text-xs sm:text-sm font-bold text-[#0D0D0D]/80">
            <li className="flex items-start gap-2.5">
              <CheckIcon className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
              <span>
                خصومات خاصة للطلبات الجماعية وأكثر من 10 أفراد مع مشروبات مجانية.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <ScooterIcon className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
              <span>
                توصيل مجدول ساخن بالكامل لحرم الجامعات أو مقرات الشركات في بدر.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <PinIcon className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
              <span>
                إمكانية التجهيز والاستلام الفوري من فرع مول 8 بشارع الجامعة
                الروسية.
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="lg:col-span-6">
        <OccasionForm branches={activeBranches.length ? activeBranches : db.branches} />
      </div>
    </div>
  );
}
