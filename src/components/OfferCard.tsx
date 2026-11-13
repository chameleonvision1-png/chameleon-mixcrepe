"use client";

import { useState } from "react";
import type { Offer } from "@/lib/types";
import { useStore } from "./store";
import { formatPrice } from "@/lib/format";
import { CheckIcon, OfferTagIcon, PlusIcon } from "./icons";

export default function OfferCard({ offer }: { offer: Offer }) {
  const { addToCart } = useStore();
  const [added, setAdded] = useState(false);

  const discount =
    offer.oldPrice > offer.price
      ? Math.round(((offer.oldPrice - offer.price) / offer.oldPrice) * 100)
      : 0;

  const handleAdd = () => {
    addToCart({
      productId: `offer:${offer.id}`,
      name: offer.title,
      image: offer.image,
      sizeLabel: "عرض خاص",
      addons: [],
      unitPrice: offer.price,
      qty: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div className="rounded-[26px] bg-white border border-[#0D0D0D]/14 overflow-hidden shadow-[0_12px_30px_-16px_rgba(13,13,13,0.18)] flex flex-col justify-between group">
      <div>
        <div className="relative h-48 sm:h-52 bg-[#FFF3D6] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={offer.image}
            alt={offer.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/60 via-transparent to-transparent" />

          {offer.badge && (
            <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-[#FFC21A] text-[#0D0D0D] px-3 py-1 text-[11px] font-black shadow-sm">
              <OfferTagIcon className="w-3 h-3 shrink-0" />
              <span>{offer.badge}</span>
            </span>
          )}

          {discount > 0 && (
            <span className="absolute top-3 left-3 rounded-full bg-[#0D0D0D] text-[#FFC21A] border border-[#FFC21A]/40 px-2.5 py-1 text-[11px] font-en font-black tabular-nums">
              -{discount}%
            </span>
          )}
        </div>

        <div className="p-4 sm:p-5 text-right">
          <h3 className="font-display text-base sm:text-lg font-black text-[#0D0D0D] leading-snug">
            {offer.title}
          </h3>
          <p className="text-xs font-bold text-[#0D0D0D]/70 mt-1.5 leading-relaxed">
            {offer.description}
          </p>
          {offer.terms && (
            <p className="text-[11px] font-extrabold text-[#F59E0B] mt-2">
              {offer.terms}
            </p>
          )}
        </div>
      </div>

      <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-3 border-t border-[#0D0D0D]/10 flex items-center justify-between gap-3">
        <div className="flex flex-col items-start">
          {offer.oldPrice > offer.price && (
            <span className="text-xs font-bold text-[#0D0D0D]/45 line-through tabular-nums">
              {formatPrice(offer.oldPrice)}
            </span>
          )}
          <span className="text-lg font-black text-[#0D0D0D] tabular-nums">
            {formatPrice(offer.price)}
          </span>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className={`rounded-full px-4 py-2.5 text-xs font-black inline-flex items-center gap-1.5 transition cursor-pointer shadow-xs ${
            added
              ? "bg-[#FFC21A] text-[#0D0D0D]"
              : "bg-[#0D0D0D] hover:bg-[#171717] text-[#FFC21A]"
          }`}
        >
          {added ? (
            <>
              <CheckIcon className="w-3.5 h-3.5" />
              <span>أضيف للسلة</span>
            </>
          ) : (
            <>
              <PlusIcon className="w-3.5 h-3.5" />
              <span>أضف العرض للسلة</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
