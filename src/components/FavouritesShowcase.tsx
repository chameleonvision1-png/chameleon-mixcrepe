"use client";

import Link from "next/link";
import { useRef } from "react";
import type { Product } from "@/lib/types";
import { ProductCard } from "./Product";
import { ChevronIcon, UtensilsIcon } from "./icons";

export default function FavouritesShowcase({
  products,
}: {
  products: Product[];
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const slide = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  if (!products.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div className="text-center sm:text-right">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#0D0D0D] text-[#FFC21A] px-3.5 py-1 text-xs font-black mb-2">
            <UtensilsIcon className="w-3.5 h-3.5" />
            <span>الأكثر طلبًا في مدينة بدر</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-[#0D0D0D] tracking-tight">
            الطعم اللي مستنيه — نجوم ميكس
          </h2>
          <p className="text-xs sm:text-sm font-bold text-[#0D0D0D]/65 mt-1">
            أشهر الكريبات العملاقة والبيتزا الإيطالي والتحلية السايحة في منيو
            MIX
          </p>
        </div>

        <div className="flex items-center justify-center sm:justify-end gap-2 shrink-0">
          <button
            type="button"
            onClick={() => slide(1)}
            aria-label="السابق"
            className="w-10 h-10 rounded-full bg-white hover:bg-[#0D0D0D] text-[#0D0D0D] hover:text-[#FFC21A] border border-[#0D0D0D]/15 grid place-items-center transition cursor-pointer shadow-2xs"
          >
            <ChevronIcon className="w-4 h-4 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => slide(-1)}
            aria-label="التالي"
            className="w-10 h-10 rounded-full bg-white hover:bg-[#0D0D0D] text-[#0D0D0D] hover:text-[#FFC21A] border border-[#0D0D0D]/15 grid place-items-center transition cursor-pointer shadow-2xs"
          >
            <ChevronIcon className="w-4 h-4" />
          </button>
          <Link
            href="/menu"
            className="rounded-full bg-[#FFC21A] hover:bg-[#F59E0B] text-[#0D0D0D] px-4 py-2.5 text-xs font-black transition whitespace-nowrap shadow-xs"
          >
            المنيو الكامل
          </Link>
        </div>
      </div>

      {/* Horizontal Carousel Strip */}
      <div
        ref={scrollerRef}
        className="flex gap-3.5 sm:gap-4 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="shrink-0 w-[235px] sm:w-[265px] snap-start flex flex-col"
          >
            <ProductCard product={product} variant="grid" eager />
          </div>
        ))}
      </div>
    </section>
  );
}
