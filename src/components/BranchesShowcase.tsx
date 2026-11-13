"use client";

import Link from "next/link";
import type { Branch, Settings } from "@/lib/types";
import {
  ClockIcon,
  ExternalLinkIcon,
  PhoneIcon,
  PinIcon,
  ScooterIcon,
  TalabatIcon,
  WhatsAppIcon,
} from "./icons";

const BADR_NEIGHBORHOODS = [
  "شارع الجامعة الروسية والمجاورة",
  "الحي الأول والحي الثاني",
  "الحي الثالث والحي الرابع",
  "الحي الخامس والحي السادس",
  "الحي المتميز والنرجس والياسمين",
  "سكن مصر والأندلس وزهرة العاصمة",
];

function normalizeHours(hours: string): string {
  if (!hours || hours.length > 34) {
    return "مفتوح طوال اليوم • توصيل سريع";
  }
  return hours;
}

function normalizeService(label: string): string {
  if (/Outdoor/i.test(label)) return "جلسات خارجية";
  if (/Roadside/i.test(label)) return "تقديم للسيارة";
  if (label === "استلام من المطعم") return "استلام من الفرع";
  return label;
}

export default function BranchesShowcase({
  branches,
  settings,
}: {
  branches: Branch[];
  settings?: Settings;
}) {
  const visibleBranches = branches.filter((b) => b.isActive);
  const list = visibleBranches.length ? visibleBranches : branches.slice(0, 1);

  const talabatUrl =
    settings?.talabatUrl ||
    settings?.talabat ||
    "https://www.talabat.com/ar/egypt/restaurant/684423/mix-crepe-and-pizza?aid=9534";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
      {/* Main Active Branch Card (7 cols) */}
      {list.map((b) => {
        const allPhones = Array.from(
          new Set(
            [b.phone, b.phone2, ...(b.extraPhones ?? [])].filter(
              (x): x is string => Boolean(x),
            ),
          ),
        );

        return (
          <div
            key={b.id}
            className="lg:col-span-7 rounded-[28px] sm:rounded-[34px] bg-white border border-[#0D0D0D]/14 p-5 sm:p-7 flex flex-col justify-between shadow-[0_14px_36px_-18px_rgba(13,13,13,0.16)] min-w-0"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFC21A] text-[#0D0D0D] px-3 py-1 text-xs font-black whitespace-nowrap">
                  <PinIcon className="w-3.5 h-3.5 shrink-0" />
                  <span>{b.city}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0D0D0D] text-[#FFC21A] px-3 py-1 text-xs font-black whitespace-nowrap">
                  <ClockIcon className="w-3.5 h-3.5 shrink-0" />
                  <span>{normalizeHours(b.hours)}</span>
                </span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-black text-[#0D0D0D] leading-snug">
                {b.name}
              </h3>
              <p className="text-xs sm:text-sm font-bold text-[#0D0D0D]/75 mt-1.5 leading-relaxed">
                {b.address}
              </p>

              {/* Services 2x2 Grid — Pure Crisp Arabic */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
                {b.services.slice(0, 4).map((svc) => (
                  <div
                    key={svc}
                    className="rounded-xl bg-[#FFF3D6] border border-[#0D0D0D]/10 px-2.5 py-2 text-center text-[11px] sm:text-xs font-black text-[#0D0D0D] whitespace-nowrap"
                  >
                    {normalizeService(svc)}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-[#0D0D0D]/10 space-y-2.5">
              {/* Primary Action Row */}
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/menu"
                  className="h-11 rounded-2xl bg-[#0D0D0D] hover:bg-[#171717] text-[#FFC21A] px-3 flex items-center justify-center gap-1.5 text-xs sm:text-sm font-black transition shadow-xs whitespace-nowrap"
                >
                  <span>تصفح المنيو والطلب</span>
                </Link>

                <a
                  href={`https://wa.me/${b.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="h-11 rounded-2xl bg-[#FFC21A] hover:bg-[#F59E0B] text-[#0D0D0D] px-3 flex items-center justify-center gap-1.5 text-xs sm:text-sm font-black transition shadow-xs whitespace-nowrap"
                >
                  <WhatsAppIcon className="w-4 h-4 shrink-0" />
                  <span>طلب واتساب</span>
                </a>
              </div>

              {/* Direct Clickable Phone Lines (2 Cols) */}
              <div className="grid grid-cols-2 gap-2" dir="ltr">
                {allPhones.slice(0, 2).map((ph) => (
                  <a
                    key={ph}
                    href={`tel:${ph}`}
                    className="h-10 rounded-2xl bg-[#FFF3D6] hover:bg-[#FFC21A] border border-[#0D0D0D]/15 px-3 flex items-center justify-center gap-1.5 text-xs font-en font-black text-[#0D0D0D] transition whitespace-nowrap"
                  >
                    <PhoneIcon className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
                    <span>{ph}</span>
                  </a>
                ))}
              </div>

              {/* Symmetrical Map & Talabat Row (2 Cols) */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={b.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="h-10 rounded-2xl bg-white hover:bg-[#FFF3D6] border border-[#0D0D0D]/15 px-3 flex items-center justify-center gap-1.5 text-xs font-black text-[#0D0D0D] transition whitespace-nowrap"
                >
                  <PinIcon className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
                  <span>الموقع على الخريطة</span>
                  <ExternalLinkIcon className="w-3 h-3 shrink-0" />
                </a>

                <a
                  href={talabatUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="h-10 rounded-2xl bg-white hover:bg-[#FFF3D6] border border-[#0D0D0D]/15 px-3 flex items-center justify-center gap-1.5 text-xs font-black text-[#0D0D0D] transition whitespace-nowrap"
                >
                  <TalabatIcon className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
                  <span>اطلب من طلبات</span>
                </a>
              </div>
            </div>
          </div>
        );
      })}

      {/* Badr City Delivery Zones Card (5 cols) — Clean Symmetrical Grid */}
      <div className="lg:col-span-5 rounded-[28px] sm:rounded-[34px] bg-[#0D0D0D] mix-pattern-dark text-white p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden border border-[#FFC21A]/30 shadow-lg min-w-0">
        <div
          className="pointer-events-none absolute -bottom-16 -left-16 w-52 h-52 rounded-full bg-[#FFC21A]/15 blur-2xl"
          aria-hidden="true"
        />

        <div className="relative z-10">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFC21A] text-[#0D0D0D] px-3 py-1 text-[11px] font-black whitespace-nowrap">
              <ScooterIcon className="w-3.5 h-3.5 shrink-0" />
              <span>نطاق التوصيل السريع</span>
            </span>
            <span className="text-xs font-bold text-[#FFF3D6]/80 whitespace-nowrap">
              {BADR_NEIGHBORHOODS.length} مناطق مخدومة
            </span>
          </div>

          <h3 className="font-display text-lg sm:text-2xl font-black text-white text-right leading-snug">
            من مول 8 لحد باب بيتك في مدينة بدر
          </h3>
          <p className="text-xs sm:text-sm text-[#FFF3D6]/80 mt-1.5 leading-relaxed text-right">
            البيتزا الإيطالي الساخنة والكريبات العملاقة والوافل والنوتيلا بتوصلك
            بسرعة لكل أحياء ومجاورات مدينة بدر.
          </p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {BADR_NEIGHBORHOODS.map((zone) => (
              <div
                key={zone}
                className="rounded-xl bg-white/10 border border-white/12 px-3 py-2 text-xs font-bold text-[#FFF3D6] flex items-center gap-2 text-right"
              >
                <PinIcon className="w-3.5 h-3.5 text-[#FFC21A] shrink-0" />
                <span className="leading-snug">{zone}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mt-5 pt-3.5 border-t border-white/15 flex items-center justify-between gap-3">
          <span className="text-xs font-bold text-white/90">
            واتساب الطلبات السريع:
          </span>
          <a
            href="https://wa.me/201098923225"
            target="_blank"
            rel="noreferrer"
            dir="ltr"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#FFC21A] hover:bg-[#F59E0B] text-[#0D0D0D] px-4 py-1.5 text-xs font-en font-black transition shrink-0"
          >
            <WhatsAppIcon className="w-3.5 h-3.5" />
            <span>01098923225</span>
          </a>
        </div>
      </div>
    </div>
  );
}
