"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import type { Product, ProductAddon, ProductSize } from "@/lib/types";
import { useStore } from "./store";
import { formatPrice } from "@/lib/format";
import { useLockBodyScroll } from "@/lib/useLockBodyScroll";
import { CheckIcon, MinusIcon, PlusIcon, XIcon } from "./icons";

export function ProductCard({
  product,
  variant = "grid",
  eager = false,
}: {
  product: Product;
  variant?: "grid" | "menu";
  eager?: boolean;
}) {
  const { addToCart, branchId } = useStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [added, setAdded] = useState(false);

  const unavailable =
    !product.isAvailable ||
    (branchId && product.unavailableBranches?.includes(branchId));

  const firstSize = product.sizes[0] ?? {
    id: `${product.id}_s`,
    label: "حجم قياسي موحد",
    price: 0,
  };
  const minPrice = product.sizes.reduce(
    (m, s) => (s.price < m ? s.price : m),
    firstSize.price,
  );
  const hasMultipleSizes = product.sizes.length > 1;
  const hasAddons = product.addons.length > 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (unavailable) return;
    if (hasMultipleSizes || hasAddons) {
      setModalOpen(true);
      return;
    }
    addToCart({
      productId: product.id,
      name: product.nameAr,
      image: product.image,
      sizeLabel: firstSize.label,
      addons: [],
      unitPrice: firstSize.price,
      qty: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  if (variant === "menu") {
    return (
      <>
        <div
          onClick={() => !unavailable && setModalOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              if (!unavailable) setModalOpen(true);
            }
          }}
          className={`rounded-[22px] bg-white border border-[#0D0D0D]/14 p-3 sm:p-3.5 flex items-center gap-3.5 transition text-right min-w-0 ${
            unavailable
              ? "opacity-55 cursor-not-allowed"
              : "hover:border-[#FFC21A] hover:shadow-md cursor-pointer"
          }`}
        >
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#FFF3D6] overflow-hidden shrink-0 border border-[#0D0D0D]/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image}
              alt={product.nameAr}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {product.badge && (
              <span className="absolute top-1.5 right-1.5 rounded-full bg-[#FFC21A] text-[#0D0D0D] px-2 py-0.5 text-[10px] font-black shadow-2xs">
                {product.badge}
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0 flex flex-col justify-between gap-2">
            <div>
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-display text-sm sm:text-base font-black text-[#0D0D0D] leading-snug">
                  {product.nameAr}
                </h4>
                {product.isSpicy && (
                  <span className="shrink-0 rounded-full bg-[#F59E0B] text-[#0D0D0D] px-2 py-0.5 text-[10px] font-black">
                    حار
                  </span>
                )}
              </div>

              <p className="text-xs font-semibold text-[#0D0D0D]/68 mt-1 line-clamp-2 leading-relaxed">
                {product.descriptionAr}
              </p>

              {product.allergens && product.allergens.length > 0 && (
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {product.allergens.slice(0, 3).map((al) => (
                    <span
                      key={al}
                      className="rounded-full bg-[#FFF3D6] border border-[#0D0D0D]/10 px-2 py-0.5 text-[10px] font-bold text-[#0D0D0D]/75"
                    >
                      {al}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-2 pt-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="inline-flex items-center rounded-full bg-[#FFF3D6] border border-[#0D0D0D]/12 px-2.5 py-0.5 text-xs sm:text-sm font-black text-[#0D0D0D] tabular-nums">
                  {hasMultipleSizes
                    ? `من ${formatPrice(minPrice)}`
                    : formatPrice(firstSize.price)}
                </span>
                {!hasMultipleSizes && (
                  <span className="text-[10px] font-bold text-[#0D0D0D]/55">
                    {firstSize.label}
                  </span>
                )}
              </div>

              <button
                type="button"
                disabled={Boolean(unavailable)}
                onClick={handleQuickAdd}
                aria-label={`أضف ${product.nameAr} للسلة`}
                className={`h-9 px-3.5 rounded-full text-xs font-black inline-flex items-center gap-1 transition cursor-pointer shrink-0 ${
                  added
                    ? "bg-[#FFC21A] text-[#0D0D0D]"
                    : "bg-[#0D0D0D] hover:bg-[#171717] text-[#FFC21A]"
                }`}
              >
                {added ? (
                  <>
                    <CheckIcon className="w-3.5 h-3.5" />
                    <span>تم</span>
                  </>
                ) : (
                  <>
                    <PlusIcon className="w-3.5 h-3.5" />
                    <span>{hasMultipleSizes ? "الأحجام" : "أضف"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <ProductModal
          product={product}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      </>
    );
  }

  return (
    <>
      <div
        onClick={() => !unavailable && setModalOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (!unavailable) setModalOpen(true);
          }
        }}
        className={`rounded-[24px] bg-white border border-[#0D0D0D]/14 overflow-hidden flex flex-col justify-between h-full transition group ${
          unavailable
            ? "opacity-55 cursor-not-allowed"
            : "hover:border-[#FFC21A] hover:shadow-lg cursor-pointer"
        }`}
      >
        <div>
          <div className="relative h-44 sm:h-48 bg-[#FFF3D6] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image}
              alt={product.nameAr}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading={eager ? "eager" : "lazy"}
            />
            {product.badge && (
              <span className="absolute top-2.5 right-2.5 rounded-full bg-[#FFC21A] text-[#0D0D0D] px-2.5 py-0.5 text-[11px] font-black shadow-xs">
                {product.badge}
              </span>
            )}
            {product.isSpicy && (
              <span className="absolute top-2.5 left-2.5 rounded-full bg-[#0D0D0D] text-[#FFC21A] px-2.5 py-0.5 text-[10px] font-black">
                حار
              </span>
            )}
          </div>

          <div className="p-3.5 sm:p-4 text-right">
            <h4 className="font-display text-sm sm:text-base font-black text-[#0D0D0D] leading-snug line-clamp-1">
              {product.nameAr}
            </h4>
            <p className="text-xs font-semibold text-[#0D0D0D]/68 mt-1 line-clamp-2 leading-relaxed min-h-[38px]">
              {product.descriptionAr}
            </p>
            {product.allergens && product.allergens.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {product.allergens.slice(0, 3).map((al) => (
                  <span
                    key={al}
                    className="rounded-full bg-[#FFF3D6] border border-[#0D0D0D]/10 px-2 py-0.5 text-[10px] font-bold text-[#0D0D0D]/75"
                  >
                    {al}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="px-3.5 sm:px-4 pb-3.5 sm:pb-4 pt-2.5 border-t border-[#0D0D0D]/10 flex items-center justify-between gap-2">
          <div>
            <div className="text-sm sm:text-base font-black text-[#0D0D0D] tabular-nums">
              {hasMultipleSizes
                ? `من ${formatPrice(minPrice)}`
                : formatPrice(firstSize.price)}
            </div>
            {!hasMultipleSizes && (
              <div className="text-[10px] font-bold text-[#0D0D0D]/55">
                {firstSize.label}
              </div>
            )}
          </div>

          <button
            type="button"
            disabled={Boolean(unavailable)}
            onClick={handleQuickAdd}
            aria-label={`أضف ${product.nameAr} للسلة`}
            className={`w-9 h-9 rounded-full grid place-items-center transition cursor-pointer shrink-0 shadow-2xs ${
              added
                ? "bg-[#FFC21A] text-[#0D0D0D]"
                : "bg-[#0D0D0D] hover:bg-[#171717] text-[#FFC21A]"
            }`}
          >
            {added ? (
              <CheckIcon className="w-4 h-4" />
            ) : (
              <PlusIcon className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <ProductModal
        product={product}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}

export function ProductModal({
  product,
  open,
  onClose,
}: {
  product: Product;
  open: boolean;
  onClose: () => void;
}) {
  const { addToCart } = useStore();
  const [size, setSize] = useState<ProductSize>(
    product.sizes[0] ?? {
      id: `${product.id}_std`,
      label: "حجم قياسي موحد",
      price: 0,
    },
  );
  const [addons, setAddons] = useState<ProductAddon[]>([]);
  const [note, setNote] = useState("");
  const [qty, setQty] = useState(1);

  useLockBodyScroll(open);

  if (!open || typeof document === "undefined") return null;

  const toggleAddon = (a: ProductAddon) => {
    setAddons((prev) =>
      prev.some((x) => x.id === a.id)
        ? prev.filter((x) => x.id !== a.id)
        : [...prev, a],
    );
  };

  const unitPrice =
    size.price + addons.reduce((sum, a) => sum + a.price, 0);

  const handleConfirm = () => {
    addToCart({
      productId: product.id,
      name: product.nameAr,
      image: product.image,
      sizeLabel: size.label,
      addons: addons.map((a) => ({ label: a.label, price: a.price })),
      note: note.trim() || undefined,
      unitPrice,
      qty,
    });
    onClose();
  };

  return createPortal(
    <div
      dir="rtl"
      className="fixed inset-0 z-[95] flex items-end sm:items-center justify-center p-2 sm:p-4 animate-modal-backdrop overscroll-none"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-[#0D0D0D]/75 backdrop-blur-xs touch-none"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-lg rounded-3xl bg-[#FFF3D6] border-2 border-[#FFC21A] shadow-2xl overflow-hidden max-h-[90dvh] flex flex-col">
        {/* Top Image Banner */}
        <div className="relative h-52 sm:h-60 bg-[#0D0D0D] shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.nameAr}
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق"
            className="absolute top-3 left-3 w-9 h-9 rounded-full bg-[#0D0D0D]/80 hover:bg-[#FFC21A] text-white hover:text-[#0D0D0D] grid place-items-center transition cursor-pointer"
          >
            <XIcon className="w-4 h-4" />
          </button>
          {product.badge && (
            <span className="absolute bottom-3 right-3 rounded-full bg-[#FFC21A] text-[#0D0D0D] px-3 py-1 text-xs font-black shadow">
              {product.badge}
            </span>
          )}
        </div>

        {/* Scrollable Details */}
        <div
          data-modal-scroll
          className="flex-1 overflow-y-auto overscroll-contain touch-pan-y p-4 sm:p-5 space-y-4"
        >
          <div>
            <h3 className="font-display text-lg sm:text-xl font-black text-[#0D0D0D]">
              {product.nameAr}
            </h3>
            <p className="text-xs sm:text-sm font-bold text-[#0D0D0D]/72 mt-1 leading-relaxed">
              {product.descriptionAr}
            </p>
            {product.allergens && product.allergens.length > 0 && (
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-black text-[#0D0D0D]/60">
                  مكونات / مسببات حساسية:
                </span>
                {product.allergens.map((al) => (
                  <span
                    key={al}
                    className="rounded-full bg-white border border-[#0D0D0D]/12 px-2.5 py-0.5 text-[11px] font-bold text-[#0D0D0D]"
                  >
                    {al}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Size Selector */}
          <div className="space-y-2">
            <h4 className="text-xs font-black text-[#0D0D0D]">اختيار الحجم</h4>
            <div className="grid grid-cols-2 gap-2">
              {product.sizes.map((s) => {
                const selected = size.id === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`rounded-2xl px-3.5 py-2.5 border flex items-center justify-between text-xs font-black transition cursor-pointer ${
                      product.sizes.length === 1 ? "col-span-2" : ""
                    } ${
                      selected
                        ? "bg-[#0D0D0D] text-[#FFC21A] border-[#0D0D0D]"
                        : "bg-white text-[#0D0D0D] border-[#0D0D0D]/14 hover:border-[#FFC21A]"
                    }`}
                  >
                    <span>{s.label}</span>
                    <span className="tabular-nums">{formatPrice(s.price)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Optional Addons */}
          {product.addons.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-black text-[#0D0D0D]">
                إضافات إختيارية
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.addons.map((a) => {
                  const checked = addons.some((x) => x.id === a.id);
                  return (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => toggleAddon(a)}
                      className={`rounded-2xl px-3 py-2.5 border flex items-center justify-between text-xs font-bold transition cursor-pointer ${
                        checked
                          ? "bg-[#0D0D0D] text-white border-[#0D0D0D]"
                          : "bg-white text-[#0D0D0D] border-[#0D0D0D]/14 hover:border-[#FFC21A]"
                      }`}
                    >
                      <span>{a.label}</span>
                      <span
                        className={`font-black tabular-nums ${
                          checked ? "text-[#FFC21A]" : "text-[#F59E0B]"
                        }`}
                      >
                        +{a.price} ج.م
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Note */}
          <div>
            <label
              htmlFor={`note-${product.id}`}
              className="block text-xs font-black text-[#0D0D0D] mb-1"
            >
              ملاحظات الطلب (اختياري)
            </label>
            <input
              id={`note-${product.id}`}
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="مثال: بدون فلفل، صوص زيادة..."
              className="w-full rounded-2xl bg-white border border-[#0D0D0D]/15 px-3.5 py-2.5 text-xs font-bold text-[#0D0D0D] outline-none focus:border-[#0D0D0D]"
            />
          </div>
        </div>

        {/* Sticky Bottom CTA */}
        <div className="shrink-0 bg-white border-t border-[#0D0D0D]/12 px-4 py-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1 rounded-full bg-[#FFF3D6] border border-[#0D0D0D]/14 px-2 py-1">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              aria-label="تقليل"
              className="w-7 h-7 rounded-full bg-white hover:bg-[#FFC21A] text-[#0D0D0D] grid place-items-center transition cursor-pointer"
            >
              <MinusIcon className="w-3.5 h-3.5" />
            </button>
            <span className="w-7 text-center text-xs font-black tabular-nums">
              {qty}
            </span>
            <button
              type="button"
              onClick={() => setQty((q) => q + 1)}
              aria-label="زيادة"
              className="w-7 h-7 rounded-full bg-white hover:bg-[#FFC21A] text-[#0D0D0D] grid place-items-center transition cursor-pointer"
            >
              <PlusIcon className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 rounded-full bg-[#0D0D0D] hover:bg-[#171717] text-[#FFC21A] py-3 px-4 text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition cursor-pointer shadow-sm"
          >
            <span>أضف للسلة</span>
            <span className="tabular-nums">
              ({formatPrice(unitPrice * qty)})
            </span>
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default ProductCard;
