"use client";

import { useEffect, useState } from "react";
import type { Review } from "@/lib/types";
import { ChevronIcon, StarIcon } from "./icons";

export default function ReviewsBannerCarousel({
  reviews,
}: {
  reviews: Review[];
}) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (reviews.length <= 1) return;
    const t = setInterval(() => {
      setIdx((prev) => (prev + 1) % reviews.length);
    }, 5200);
    return () => clearInterval(t);
  }, [reviews.length]);

  if (!reviews.length) return null;
  const current = reviews[idx] ?? reviews[0];

  return (
    <section className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8 py-6">
      <div className="relative rounded-[30px] sm:rounded-[38px] overflow-hidden bg-[#0D0D0D] border-2 border-[#FFC21A]/35 shadow-[0_22px_50px_-20px_rgba(13,13,13,0.55)]">
        {/* Background Backdrop Photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero/reviews-backdrop.webp"
          alt="تقييمات عملاء MIX Crepe & Pizza"
          className="absolute inset-0 w-full h-full object-cover opacity-28"
        />
        <div
          className="absolute inset-0 bg-gradient-to-l from-[#0D0D0D]/95 via-[#0D0D0D]/88 to-[#0D0D0D]/75"
          aria-hidden="true"
        />

        <div className="relative z-10 p-6 sm:p-10 lg:p-12 grid lg:grid-cols-12 gap-6 items-center">
          {/* Social Proof Headline Column */}
          <div className="lg:col-span-5 text-center lg:text-right space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FFC21A] text-[#0D0D0D] px-4 py-1 text-xs font-black">
              <span>100% يوصون بنا • 83 مراجعة حقيقية</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
              كلام أهل مدينة بدر <span className="text-[#FFC21A]">فينا</span>
            </h2>

            <p className="text-xs sm:text-sm font-bold text-white/80 leading-relaxed max-w-md mx-auto lg:mx-0">
              أكثر من{" "}
              <span className="font-en text-[#FFC21A] font-black">61,000+</span>{" "}
              متابع على فيسبوك يشاركونا حبهم للكريب الساخن والبيتزا الإيطالي من
              مول 8.
            </p>
          </div>

          {/* Review Quote Card */}
          <div className="lg:col-span-7">
            <div className="rounded-[26px] bg-[#FFF3D6] text-[#0D0D0D] p-5 sm:p-7 border-2 border-[#FFC21A] shadow-xl">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-1 text-[#F59E0B]">
                  {Array.from({ length: current.rating || 5 }).map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 fill-[#F59E0B]" />
                  ))}
                </div>
                <span className="rounded-full bg-[#0D0D0D] text-[#FFC21A] px-3 py-0.5 text-[11px] font-black">
                  تجربة موثقة
                </span>
              </div>

              <p className="text-sm sm:text-base font-extrabold text-[#0D0D0D] leading-relaxed min-h-[56px]">
                «{current.text}»
              </p>

              <div className="mt-4 pt-3 border-t border-[#0D0D0D]/12 flex items-center justify-between gap-3">
                <span className="text-xs sm:text-sm font-black text-[#0D0D0D] truncate">
                  {current.name}
                </span>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      setIdx(
                        (prev) => (prev - 1 + reviews.length) % reviews.length,
                      )
                    }
                    aria-label="التقييم السابق"
                    className="w-8 h-8 rounded-full bg-white hover:bg-[#0D0D0D] text-[#0D0D0D] hover:text-[#FFC21A] border border-[#0D0D0D]/15 grid place-items-center transition cursor-pointer"
                  >
                    <ChevronIcon className="w-3.5 h-3.5 rotate-180" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIdx((prev) => (prev + 1) % reviews.length)}
                    aria-label="التقييم التالي"
                    className="w-8 h-8 rounded-full bg-white hover:bg-[#0D0D0D] text-[#0D0D0D] hover:text-[#FFC21A] border border-[#0D0D0D]/15 grid place-items-center transition cursor-pointer"
                  >
                    <ChevronIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
