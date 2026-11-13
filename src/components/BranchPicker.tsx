"use client";

import Link from "next/link";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useStore } from "./store";
import { useLockBodyScroll } from "@/lib/useLockBodyScroll";
import {
  ChevronDownIcon,
  ExternalLinkIcon,
  PhoneIcon,
  PinIcon,
  UtensilsIcon,
  WhatsAppIcon,
  XIcon,
} from "./icons";

export default function BranchPicker() {
  const { pickerOpen, closePicker, branches, branchId, setBranchId } =
    useStore();
  const [phonesOpenId, setPhonesOpenId] = useState<string | null>(null);

  useLockBodyScroll(pickerOpen);

  if (!pickerOpen || typeof document === "undefined") return null;

  const activeBranches = branches.filter((b) => b.isActive);
  const displayBranches = activeBranches.length ? activeBranches : branches;

  return createPortal(
    <div
      dir="rtl"
      className="fixed inset-0 z-[95] flex items-end sm:items-center justify-center p-2.5 sm:p-4 animate-modal-backdrop overscroll-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="branch-picker-title"
    >
      <div
        className="absolute inset-0 bg-[#0D0D0D]/75 backdrop-blur-xs touch-none"
        onClick={closePicker}
      />

      <div className="relative z-10 w-full max-w-lg rounded-3xl bg-[#FFF3D6] shadow-2xl border-2 border-[#FFC21A] overflow-hidden animate-modal-content max-h-[88dvh] flex flex-col">
        {/* Header */}
        <div
          dir="ltr"
          className="bg-[#0D0D0D] text-white px-4 py-3.5 grid grid-cols-[40px_1fr_40px] items-center gap-2.5 shrink-0 border-b border-[#FFC21A]/25"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-emblem.webp"
            alt="MIX Crepe & Pizza"
            className="w-10 h-10 rounded-full object-contain select-none"
          />
          <div dir="rtl" className="min-w-0 text-center">
            <h3
              id="branch-picker-title"
              className="text-sm sm:text-base font-black text-[#FFC21A] truncate"
            >
              فرع MIX Crepe & Pizza — مدينة بدر
            </h3>
            <p className="text-[11px] text-white/80 font-bold truncate">
              تفاصيل الفرع وأرقام التوصيل وخريطة الوصول
            </p>
          </div>
          <button
            type="button"
            onClick={closePicker}
            aria-label="إغلاق"
            className="w-10 h-10 rounded-full bg-white/12 hover:bg-[#FFC21A] text-white hover:text-[#0D0D0D] grid place-items-center cursor-pointer transition"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div
          data-modal-scroll
          className="flex-1 overflow-y-auto overscroll-contain touch-pan-y p-4 space-y-3"
        >
          {displayBranches.map((b) => {
            const selected = branchId === b.id;
            const phonesExpanded = phonesOpenId === b.id;
            const extraPhones = [
              b.phone2,
              ...(b.extraPhones ?? []),
            ].filter((x): x is string => Boolean(x));

            return (
              <div
                key={b.id}
                onClick={() => setBranchId(b.id)}
                className={`rounded-3xl bg-white p-4 border-2 transition cursor-pointer space-y-3 ${
                  selected
                    ? "border-[#0D0D0D] shadow-md"
                    : "border-[#0D0D0D]/15 hover:border-[#FFC21A]"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="rounded-full bg-[#FFC21A] text-[#0D0D0D] px-2.5 py-0.5 text-[11px] font-black">
                        {b.city}
                      </span>
                      <span className="rounded-full bg-[#0D0D0D] text-[#FFC21A] px-2.5 py-0.5 text-[11px] font-black">
                        {b.hours}
                      </span>
                    </div>
                    <h4 className="font-display text-base font-black text-[#0D0D0D] mt-2">
                      {b.name}
                    </h4>
                    <p className="text-xs font-bold text-[#0D0D0D]/70 mt-0.5">
                      {b.address}
                    </p>
                  </div>
                </div>

                {/* Primary Contact Grid */}
                <div
                  className="grid grid-cols-2 gap-2"
                  dir="ltr"
                  onClick={(e) => e.stopPropagation()}
                >
                  <a
                    href={`tel:${b.phone}`}
                    className="h-11 rounded-2xl bg-[#FFC21A] hover:bg-[#F59E0B] text-[#0D0D0D] px-3 flex items-center justify-center gap-1.5 text-xs font-en font-black transition shadow-2xs"
                  >
                    <PhoneIcon className="w-3.5 h-3.5 shrink-0" />
                    <span>{b.phone}</span>
                  </a>

                  <a
                    href={`https://wa.me/${b.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    dir="rtl"
                    className="h-11 rounded-2xl bg-[#0D0D0D] hover:bg-black text-[#FFC21A] px-3 flex items-center justify-center gap-1.5 text-xs font-black transition shadow-2xs"
                  >
                    <WhatsAppIcon className="w-4 h-4 shrink-0" />
                    <span>طلب واتساب</span>
                  </a>
                </div>

                {/* Secondary Row: Extra Phones + Google Maps */}
                <div
                  className="space-y-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setPhonesOpenId((prev) =>
                          prev === b.id ? null : b.id,
                        )
                      }
                      aria-expanded={phonesExpanded}
                      className="h-10 rounded-2xl bg-[#FFF3D6] hover:bg-[#FFC21A]/40 border border-[#0D0D0D]/15 px-3 flex items-center justify-between gap-1.5 text-xs font-black text-[#0D0D0D] transition cursor-pointer"
                    >
                      <span className="flex items-center gap-1.5 truncate">
                        <PhoneIcon className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
                        <span className="truncate">
                          خط آخر ({extraPhones.length})
                        </span>
                      </span>
                      <ChevronDownIcon
                        className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
                          phonesExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <a
                      href={b.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="h-10 rounded-2xl bg-[#FFF3D6] hover:bg-[#FFC21A] text-[#0D0D0D] border border-[#0D0D0D]/15 px-3 flex items-center justify-center gap-1.5 text-xs font-black transition"
                    >
                      <PinIcon className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
                      <span className="truncate">خريطة مول 8</span>
                      <ExternalLinkIcon className="w-3 h-3 shrink-0" />
                    </a>
                  </div>

                  {phonesExpanded && extraPhones.length > 0 && (
                    <div
                      className="rounded-2xl bg-[#FFF3D6] border border-[#0D0D0D]/14 p-2.5 grid grid-cols-2 gap-2"
                      dir="ltr"
                    >
                      {extraPhones.map((ph) => (
                        <a
                          key={ph}
                          href={`tel:${ph}`}
                          className="h-9 rounded-xl bg-white hover:bg-[#0D0D0D] text-[#0D0D0D] hover:text-[#FFC21A] border border-[#0D0D0D]/15 px-2.5 flex items-center justify-center gap-1.5 text-xs font-en font-extrabold transition"
                        >
                          <PhoneIcon className="w-3 h-3 shrink-0" />
                          <span>{ph}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                {/* Branch Services 2x2 Grid */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {b.services.slice(0, 4).map((s) => (
                    <div
                      key={s}
                      className="rounded-xl bg-[#FFF3D6] border border-[#0D0D0D]/12 py-2 px-2.5 text-center text-[11px] font-extrabold text-[#0D0D0D]/85 truncate"
                    >
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Sticky Footer CTA */}
        <div className="shrink-0 p-3.5 bg-white border-t border-[#0D0D0D]/12">
          <Link
            href="/menu"
            onClick={closePicker}
            className="w-full h-11 rounded-full bg-[#0D0D0D] hover:bg-[#171717] text-[#FFC21A] font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-sm"
          >
            <UtensilsIcon className="w-4 h-4 text-[#FFC21A]" />
            <span>تصفح منيو ميكس كريب وبيتزا واطلب الآن</span>
          </Link>
        </div>
      </div>
    </div>,
    document.body,
  );
}
