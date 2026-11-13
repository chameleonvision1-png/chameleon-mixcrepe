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
      {/* Centered Heading Above Card */}
      <div className="text-center mb-5 space-y-2">
        <div className="inline-flex items-center justify-center rounded-full bg-[#FFC21A] text-[#0D0D0D] px-4 py-1 text-xs font-black shadow-2xs">
          <span>100% يوصون بنا • +61,000 متابع على فيسبوك</span>
        </div>

        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-[#0D0D0D] leading-tight">
          كلام أهل مدينة بدر <span className="text-[#F59E0B]">فينا</span>
        </h2>
      </div>

      {/* Symmetrical Dark Photo Backdrop + Floating Center Quote Card */}
      <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden bg-[#0D0D0D] border-2 border-[#FFC21A]/40 shadow-[0_22px_50px_-20px_rgba(13,13,13,0.55)] px-4 pt-6 pb-10 sm:p-10 lg:p-12 flex items-center justify-center">
        {/* Background Backdrop Photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero/reviews-backdrop.webp"
          alt="تقييمات عملاء MIX Crepe & Pizza"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div
          className="absolute inset-0 bg-[#0D0D0D]/72"
          aria-hidden="true"
        />

        <figure className="relative z-10 w-full max-w-2xl mx-auto rounded-[24px] bg-[#FFF3D6] text-[#0D0D0D] border-2 border-[#FFC21A] px-5 sm:px-8 pt-5 sm:pt-6 pb-8 sm:pb-9 text-center shadow-2xl min-w-0">
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-3">
            <div className="flex items-center gap-1 text-[#F59E0B]">
              {Array.from({ length: current.rating || 5 }).map((_, i) => (
                <StarIcon key={i} className="w-4 h-4 fill-[#F59E0B]" />
              ))}
            </div>
            <span className="rounded-full bg-[#0D0D0D] text-[#FFC21A] px-3 py-0.5 text-[11px] font-black">
              تجربة موثقة
            </span>
          </div>

          <blockquote className="text-sm sm:text-base lg:text-lg font-extrabold text-[#0D0D0D] leading-relaxed break-words">
            «{current.text}»
          </blockquote>

          <figcaption className="mt-3 text-xs sm:text-sm font-black text-[#0D0D0D]/80 break-words">
            {current.name}
          </figcaption>

          {/* Overlapping Symmetrical Prev/Next Navigation Buttons */}
          <div
            dir="ltr"
            className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2.5"
          >
            <button
              type="button"
              onClick={() =>
                setIdx((prev) => (prev - 1 + reviews.length) % reviews.length)
              }
              aria-label="التقييم السابق"
              className="w-10 h-10 rounded-full bg-[#0D0D0D] hover:bg-black text-[#FFC21A] ring-4 ring-[#FFF3D6] grid place-items-center transition cursor-pointer shadow-md"
            >
              <ChevronIcon className="w-4 h-4 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => setIdx((prev) => (prev + 1) % reviews.length)}
              aria-label="التقييم التالي"
              className="w-10 h-10 rounded-full bg-[#FFC21A] hover:bg-[#F59E0B] text-[#0D0D0D] ring-4 ring-[#FFF3D6] grid place-items-center transition cursor-pointer shadow-md"
            >
              <ChevronIcon className="w-4 h-4" />
            </button>
          </div>
        </figure>
      </div>
    </section>
  );
}
