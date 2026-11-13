"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useStore } from "./store";
import { useLockBodyScroll } from "@/lib/useLockBodyScroll";
import {
  CREPE_BASES,
  CREPE_CHEESES,
  CREPE_EXTRAS,
  CREPE_PROTEINS,
  CREPE_SAUCES,
  priceCustomCrepe,
} from "@/lib/crepe-builder";
import { formatPrice } from "@/lib/format";
import {
  CheckIcon,
  CloseIcon,
  CrepeConeIcon,
  CustomizeSlidersIcon,
  MinusIcon,
  PlusIcon,
} from "./icons";

export function CrepeBuilderModal() {
  const [open, setOpen] = useState(false);
  const [baseId, setBaseId] = useState(CREPE_BASES[0].id);
  const [proteinIds, setProteinIds] = useState<string[]>(["crispy", "strips"]);
  const [cheeseId, setCheeseId] = useState(CREPE_CHEESES[0].id);
  const [sauceIds, setSauceIds] = useState<string[]>(["ranch"]);
  const [extraIds, setExtraIds] = useState<string[]>(["olives_peppers"]);
  const [note, setNote] = useState("");
  const [qty, setQty] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const { addToCart } = useStore();
  useLockBodyScroll(open);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("open-crepe-builder", onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("open-crepe-builder", onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const toggleMulti = (
    list: string[],
    setter: (v: string[]) => void,
    id: string,
    max: number,
  ) => {
    if (list.includes(id)) {
      setter(list.filter((x) => x !== id));
      return;
    }
    if (list.length >= max) return;
    setter([...list, id]);
  };

  const result = priceCustomCrepe({
    baseId,
    proteinIds,
    cheeseId,
    sauceIds,
    extraIds,
  });

  const canSubmit = result.proteins.length > 0;

  const handleAdd = () => {
    if (!canSubmit) return;
    const summaryNames = result.proteins.map((p) => p.label).join(" + ");
    addToCart({
      productId: "custom_crepe",
      name: `كريب مكسها على مزاجك (${summaryNames})`,
      image: "/images/products/crepe-giant-mix.webp",
      sizeLabel: result.base.label,
      addons: result.addons,
      note: note.trim() || undefined,
      unitPrice: result.total,
      qty,
    });
    setAddedFeedback(true);
    setTimeout(() => {
      setAddedFeedback(false);
      setOpen(false);
      setQty(1);
      setNote("");
    }, 850);
  };

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      dir="rtl"
      className="fixed inset-0 z-[95] flex items-end sm:items-center justify-center p-2 sm:p-4 overscroll-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="crepe-builder-title"
    >
      <div
        className="absolute inset-0 bg-[#0D0D0D]/75 backdrop-blur-xs touch-none"
        onClick={() => setOpen(false)}
      />

      <div className="relative z-10 w-full max-w-2xl rounded-3xl bg-[#FFF3D6] border-2 border-[#FFC21A] shadow-2xl overflow-hidden max-h-[92dvh] flex flex-col">
        {/* Header */}
        <div
          dir="ltr"
          className="bg-[#0D0D0D] text-white px-4 sm:px-6 py-4 grid grid-cols-[40px_1fr_40px] items-center gap-3 shrink-0 border-b border-[#FFC21A]/25"
        >
          <span className="w-10 h-10 rounded-2xl bg-[#FFC21A] text-[#0D0D0D] grid place-items-center">
            <CustomizeSlidersIcon className="w-5 h-5" />
          </span>

          <div dir="rtl" className="min-w-0 text-center">
            <h2
              id="crepe-builder-title"
              className="font-display text-base sm:text-lg font-black text-[#FFC21A] truncate"
            >
              مكسها على مزاجك — صمّم كريبك بنفسك
            </h2>
            <p className="text-[11px] sm:text-xs font-bold text-white/75 truncate">
              اختار القاعدة + حتى 3 حشوات + الجبنة + الصوصات والإضافات
            </p>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="إغلاق"
            className="w-10 h-10 rounded-full bg-white/12 hover:bg-[#FFC21A] text-white hover:text-[#0D0D0D] grid place-items-center transition cursor-pointer"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Builder Body */}
        <div
          data-modal-scroll
          className="flex-1 overflow-y-auto overscroll-contain touch-pan-y p-4 sm:p-6 space-y-5"
        >
          {/* Step 1: Base */}
          <section className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-[#0D0D0D] flex items-center gap-1.5">
                <CrepeConeIcon className="w-4 h-4 text-[#F59E0B]" />
                <span>1. اختار قاعدة الكريب</span>
              </h3>
              <span className="text-[11px] font-extrabold text-[#0D0D0D]/60">
                اختيار أساسي
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {CREPE_BASES.map((base) => {
                const selected = baseId === base.id;
                return (
                  <button
                    key={base.id}
                    type="button"
                    onClick={() => setBaseId(base.id)}
                    className={`rounded-2xl p-3 border text-right transition cursor-pointer flex sm:flex-col items-center sm:items-start justify-between gap-2 ${
                      selected
                        ? "bg-[#0D0D0D] text-white border-[#0D0D0D] shadow-md"
                        : "bg-white text-[#0D0D0D] border-[#0D0D0D]/12 hover:border-[#FFC21A]"
                    }`}
                  >
                    <div>
                      <div className="text-xs sm:text-sm font-black">
                        {base.label}
                      </div>
                      {base.tag && (
                        <div
                          className={`text-[11px] font-bold mt-0.5 ${
                            selected ? "text-white/75" : "text-[#0D0D0D]/55"
                          }`}
                        >
                          {base.tag}
                        </div>
                      )}
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-black tabular-nums ${
                        selected
                          ? "bg-[#FFC21A] text-[#0D0D0D]"
                          : "bg-[#FFF3D6] text-[#0D0D0D]"
                      }`}
                    >
                      {base.price} ج.م
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Step 2: Proteins */}
          <section className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-[#0D0D0D]">
                2. اختار الحشوات (من 1 إلى 3 أصناف)
              </h3>
              <span className="rounded-full bg-[#FFC21A] text-[#0D0D0D] px-2.5 py-0.5 text-[11px] font-black tabular-nums">
                {proteinIds.length} / 3
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CREPE_PROTEINS.map((item) => {
                const active = proteinIds.includes(item.id);
                const disabled = !active && proteinIds.length >= 3;
                return (
                  <button
                    key={item.id}
                    type="button"
                    disabled={disabled}
                    onClick={() =>
                      toggleMulti(proteinIds, setProteinIds, item.id, 3)
                    }
                    className={`rounded-2xl px-3 py-2.5 border text-right flex items-center justify-between gap-2 transition ${
                      active
                        ? "bg-[#0D0D0D] text-white border-[#0D0D0D] cursor-pointer"
                        : disabled
                          ? "bg-white/50 text-[#0D0D0D]/35 border-[#0D0D0D]/8 cursor-not-allowed"
                          : "bg-white text-[#0D0D0D] border-[#0D0D0D]/12 hover:border-[#FFC21A] cursor-pointer"
                    }`}
                  >
                    <span className="text-xs font-extrabold truncate">
                      {item.label}
                    </span>
                    <span
                      className={`text-[11px] font-black shrink-0 tabular-nums ${
                        active ? "text-[#FFC21A]" : "text-[#F59E0B]"
                      }`}
                    >
                      +{item.price}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Step 3: Cheese */}
          <section className="space-y-2.5">
            <h3 className="text-sm font-black text-[#0D0D0D]">
              3. نوع الجبنة السايحة
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CREPE_CHEESES.map((item) => {
                const active = cheeseId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCheeseId(item.id)}
                    className={`rounded-2xl px-3 py-2.5 border text-right flex items-center justify-between gap-2 transition cursor-pointer ${
                      active
                        ? "bg-[#0D0D0D] text-white border-[#0D0D0D]"
                        : "bg-white text-[#0D0D0D] border-[#0D0D0D]/12 hover:border-[#FFC21A]"
                    }`}
                  >
                    <span className="text-xs font-extrabold truncate">
                      {item.label}
                    </span>
                    <span
                      className={`text-[11px] font-black shrink-0 tabular-nums ${
                        active ? "text-[#FFC21A]" : "text-[#F59E0B]"
                      }`}
                    >
                      {item.price === 0 ? "مشمول" : `+${item.price}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Step 4: Sauces */}
          <section className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-[#0D0D0D]">
                4. الصوصات (حتى 3 صوصات)
              </h3>
              <span className="text-[11px] font-black text-[#0D0D0D]/60 tabular-nums">
                {sauceIds.length} / 3
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CREPE_SAUCES.map((item) => {
                const active = sauceIds.includes(item.id);
                const disabled = !active && sauceIds.length >= 3;
                return (
                  <button
                    key={item.id}
                    type="button"
                    disabled={disabled}
                    onClick={() =>
                      toggleMulti(sauceIds, setSauceIds, item.id, 3)
                    }
                    className={`rounded-2xl px-3 py-2.5 border text-right flex items-center justify-between gap-2 transition ${
                      active
                        ? "bg-[#0D0D0D] text-white border-[#0D0D0D] cursor-pointer"
                        : disabled
                          ? "bg-white/50 text-[#0D0D0D]/35 border-[#0D0D0D]/8 cursor-not-allowed"
                          : "bg-white text-[#0D0D0D] border-[#0D0D0D]/12 hover:border-[#FFC21A] cursor-pointer"
                    }`}
                  >
                    <span className="text-xs font-extrabold truncate">
                      {item.label}
                    </span>
                    <span
                      className={`text-[11px] font-black shrink-0 tabular-nums ${
                        active ? "text-[#FFC21A]" : "text-[#F59E0B]"
                      }`}
                    >
                      {item.price === 0 ? "مشمول" : `+${item.price}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Step 5: Extras */}
          <section className="space-y-2.5">
            <h3 className="text-sm font-black text-[#0D0D0D]">
              5. إضافات داخل الكريب
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {CREPE_EXTRAS.map((item) => {
                const active = extraIds.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      toggleMulti(extraIds, setExtraIds, item.id, 4)
                    }
                    className={`rounded-2xl px-3 py-2.5 border text-right flex items-center justify-between gap-2 transition cursor-pointer ${
                      active
                        ? "bg-[#0D0D0D] text-white border-[#0D0D0D]"
                        : "bg-white text-[#0D0D0D] border-[#0D0D0D]/12 hover:border-[#FFC21A]"
                    }`}
                  >
                    <span className="text-xs font-extrabold truncate">
                      {item.label}
                    </span>
                    <span
                      className={`text-[11px] font-black shrink-0 tabular-nums ${
                        active ? "text-[#FFC21A]" : "text-[#F59E0B]"
                      }`}
                    >
                      {item.price === 0 ? "مجاني" : `+${item.price}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Kitchen Note */}
          <div>
            <label
              htmlFor="crepe-builder-note"
              className="block text-xs font-black text-[#0D0D0D] mb-1.5"
            >
              ملاحظات للشيف (اختياري)
            </label>
            <input
              id="crepe-builder-note"
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="مثال: تحميص زيادة، بدون فلفل حار..."
              className="w-full rounded-2xl bg-white border border-[#0D0D0D]/15 px-3.5 py-2.5 text-xs font-bold text-[#0D0D0D] outline-none focus:border-[#0D0D0D]"
            />
          </div>
        </div>

        {/* Sticky Footer Summary + CTA */}
        <div className="shrink-0 bg-white border-t border-[#0D0D0D]/12 px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 rounded-full bg-[#FFF3D6] border border-[#0D0D0D]/15 px-2 py-1">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="تقليل الكمية"
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
                aria-label="زيادة الكمية"
                className="w-7 h-7 rounded-full bg-white hover:bg-[#FFC21A] text-[#0D0D0D] grid place-items-center transition cursor-pointer"
              >
                <PlusIcon className="w-3.5 h-3.5" />
              </button>
            </div>

            <div>
              <div className="text-[11px] font-bold text-[#0D0D0D]/60">
                الإجمالي الفوري
              </div>
              <div className="text-base font-black text-[#0D0D0D] tabular-nums">
                {formatPrice(result.total * qty)}
              </div>
            </div>
          </div>

          <button
            type="button"
            disabled={!canSubmit || addedFeedback}
            onClick={handleAdd}
            className="flex-1 sm:flex-initial rounded-full bg-[#0D0D0D] hover:bg-[#171717] disabled:opacity-50 text-[#FFC21A] px-6 py-3 text-xs sm:text-sm font-black inline-flex items-center justify-center gap-2 transition cursor-pointer shadow-md"
          >
            {addedFeedback ? (
              <>
                <CheckIcon className="w-4 h-4" />
                <span>تمت الإضافة للسلة</span>
              </>
            ) : !canSubmit ? (
              <span>اختار حشوة واحدة على الأقل</span>
            ) : (
              <>
                <PlusIcon className="w-4 h-4" />
                <span>أضف الكريب للسلة</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default CrepeBuilderModal;
