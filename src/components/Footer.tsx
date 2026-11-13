"use client";

import { useState } from "react";
import Link from "next/link";
import type { Branch, Settings } from "@/lib/types";
import {
  ChevronDownIcon,
  ExternalLinkIcon,
  FacebookIcon,
  InstagramIcon,
  PhoneIcon,
  PinIcon,
  TalabatIcon,
  TikTokIcon,
} from "./icons";

const MENU_LINKS = [
  { label: "بيتزا إيطالي", href: "/menu?cat=pizza" },
  { label: "كريب حادق وميكس", href: "/menu?cat=savory_crepe" },
  { label: "ميكس كريب (الوحوش)", href: "/menu?cat=mix_crepe" },
  { label: "كريب حلو ووافل", href: "/menu?cat=waffles" },
  { label: "ساندوتشات وبطاطس", href: "/menu?cat=sandwiches" },
  { label: "المنيو الكامل", href: "/menu" },
];

const DISCOVER_LINKS = [
  { label: "العروض والتوفير", href: "/offers" },
  { label: "بوكسات وتجمعات", href: "/occasions" },
  { label: "الهوية البصرية", href: "/brand" },
  { label: "فرع مدينة بدر", href: "/branches" },
  { label: "عن ميكس كريب", href: "/about" },
  { label: "تواصل معنا", href: "/contact" },
];

export function Footer({
  branches = [],
  settings,
}: {
  branches?: Branch[];
  settings?: Settings;
}) {
  const [mobileOpen, setMobileOpen] = useState<
    "menu" | "discover" | "phones" | null
  >("phones");
  const [desktopPhonesOpen, setDesktopPhonesOpen] = useState(false);

  const mainBranch = branches.find((b) => b.isActive) ?? branches[0];
  const phones = settings?.orderPhones?.length
    ? settings.orderPhones
    : ["01098923225", "01125119375"];
  const talabatUrl =
    settings?.talabatUrl ||
    settings?.talabat ||
    "https://www.talabat.com/ar/egypt/restaurant/684423/mix-crepe-and-pizza?aid=9534";

  const socialItems = [
    {
      label: "Facebook",
      href: settings?.facebook || "https://www.facebook.com/mixcrepe22",
      icon: FacebookIcon,
    },
    {
      label: "Instagram",
      href: settings?.instagram || "https://www.instagram.com/mix_crepe_pizza/",
      icon: InstagramIcon,
    },
    {
      label: "TikTok",
      href: settings?.tiktok || "https://www.tiktok.com/@mix_crepe_pizza",
      icon: TikTokIcon,
    },
    {
      label: "Talabat",
      href: talabatUrl,
      icon: TalabatIcon,
    },
  ];

  const toggleMobile = (key: "menu" | "discover" | "phones") => {
    setMobileOpen((prev) => (prev === key ? null : key));
  };

  return (
    <footer className="mt-10 pb-20 md:pb-8">
      {/* Double-Framed Rounded Footer Shell (#0D0D0D Outer + #FFF3D6 Inner) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="rounded-[28px] sm:rounded-[34px] bg-[#0D0D0D] mix-pattern-dark p-3 sm:p-5 border-2 border-[#FFC21A]/35 shadow-[0_18px_45px_-16px_rgba(13,13,13,0.45)]">
          {/* Inner Cream Card */}
          <div className="rounded-[22px] sm:rounded-[26px] bg-[#FFF3D6] text-[#0D0D0D] overflow-hidden border border-[#0D0D0D]/10">
            {/* 1. Top Symmetrical 3-Pill Utility Strip */}
            <div className="px-4 sm:px-8 pt-5 pb-4 border-b border-[#0D0D0D]/10 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0D0D0D] text-[#FFC21A] px-3.5 py-1.5 text-xs font-black">
                <PinIcon className="w-3.5 h-3.5 shrink-0" />
                <span>مدينة بدر • مول 8 — شارع الجامعة الروسية</span>
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFC21A] text-[#0D0D0D] px-3.5 py-1.5 text-xs font-black">
                <span>GOLDEN STREET FOOD • التوصيل مفتوح دائمًا</span>
              </span>

              <button
                type="button"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("open-crepe-builder"))
                }
                className="inline-flex items-center gap-1.5 rounded-full bg-white hover:bg-[#0D0D0D] text-[#0D0D0D] hover:text-[#FFC21A] border border-[#0D0D0D]/15 px-3.5 py-1.5 text-xs font-black transition cursor-pointer"
              >
                <span>صمم كريبك — مكسها على مزاجك</span>
              </button>
            </div>

            {/* 2A. MOBILE COLLAPSIBLE DROPDOWNS (< lg) */}
            <div className="lg:hidden p-4 space-y-2.5">
              {/* Dropdown 1: المنيو */}
              <div className="rounded-2xl bg-white border border-[#0D0D0D]/12 overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleMobile("menu")}
                  aria-expanded={mobileOpen === "menu"}
                  className="w-full px-4 py-3 flex items-center justify-between text-xs sm:text-sm font-black text-[#0D0D0D] cursor-pointer"
                >
                  <span>أقسام المنيو</span>
                  <ChevronDownIcon
                    className={`w-4 h-4 text-[#0D0D0D] transition-transform duration-200 ${
                      mobileOpen === "menu" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileOpen === "menu" && (
                  <div className="px-3 pb-3 pt-1 border-t border-[#0D0D0D]/10 grid grid-cols-2 gap-1.5">
                    {MENU_LINKS.map((item) => (
                      <Link
                        key={item.href + item.label}
                        href={item.href}
                        className="rounded-xl bg-[#FFF3D6] hover:bg-[#0D0D0D] text-[#0D0D0D] hover:text-[#FFC21A] border border-[#0D0D0D]/12 px-2.5 py-2 text-xs font-extrabold text-center truncate transition"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Dropdown 2: اكتشف */}
              <div className="rounded-2xl bg-white border border-[#0D0D0D]/12 overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleMobile("discover")}
                  aria-expanded={mobileOpen === "discover"}
                  className="w-full px-4 py-3 flex items-center justify-between text-xs sm:text-sm font-black text-[#0D0D0D] cursor-pointer"
                >
                  <span>اكتشف ميكس</span>
                  <ChevronDownIcon
                    className={`w-4 h-4 text-[#0D0D0D] transition-transform duration-200 ${
                      mobileOpen === "discover" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileOpen === "discover" && (
                  <div className="px-3 pb-3 pt-1 border-t border-[#0D0D0D]/10 grid grid-cols-2 gap-1.5">
                    {DISCOVER_LINKS.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="rounded-xl bg-[#FFF3D6] hover:bg-[#0D0D0D] text-[#0D0D0D] hover:text-[#FFC21A] border border-[#0D0D0D]/12 px-2.5 py-2 text-xs font-extrabold text-center truncate transition"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Dropdown 3: العنوان وأرقام الطلبات */}
              <div className="rounded-2xl bg-white border border-[#0D0D0D]/12 overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleMobile("phones")}
                  aria-expanded={mobileOpen === "phones"}
                  className="w-full px-4 py-3 flex items-center justify-between text-xs sm:text-sm font-black text-[#0D0D0D] cursor-pointer"
                >
                  <span>العنوان وأرقام الطلبات (خطان)</span>
                  <ChevronDownIcon
                    className={`w-4 h-4 text-[#0D0D0D] shrink-0 transition-transform duration-200 ${
                      mobileOpen === "phones" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {mobileOpen === "phones" && (
                  <div className="px-3 pb-3 pt-2 border-t border-[#0D0D0D]/10 space-y-2.5">
                    <a
                      href={
                        mainBranch?.mapUrl ||
                        "https://maps.app.goo.gl/XC9GDwXD7cYGfKtF6"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl bg-[#FFF3D6] border border-[#0D0D0D]/14 px-3 py-2 flex items-center justify-between gap-2 text-xs font-extrabold text-[#0D0D0D]"
                    >
                      <span className="flex items-center gap-1.5">
                        <PinIcon className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
                        <span>
                          مدينة بدر — شارع الجامعة الروسية — مول 8 بجوار صيدلية
                          العزبي وبنك QNB
                        </span>
                      </span>
                      <ExternalLinkIcon className="w-3.5 h-3.5 text-[#0D0D0D] shrink-0" />
                    </a>

                    <div className="grid grid-cols-2 gap-1.5" dir="ltr">
                      {phones.map((ph, idx) => (
                        <a
                          key={ph}
                          href={`tel:${ph}`}
                          className={`rounded-xl py-2 px-2.5 flex items-center justify-center gap-1.5 text-xs font-en font-extrabold border transition ${
                            idx === 0
                              ? "bg-[#0D0D0D] text-[#FFC21A] border-[#0D0D0D]"
                              : "bg-[#FFF3D6] hover:bg-[#FFC21A] text-[#0D0D0D] border-[#0D0D0D]/15"
                          }`}
                        >
                          <PhoneIcon className="w-3 h-3 shrink-0" />
                          <span>{ph}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Symmetrical 4-Icon Official Social Bar */}
              <div className="pt-2 flex items-center justify-center gap-2.5">
                {socialItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      title={item.label}
                      className="w-11 h-11 rounded-full bg-white hover:bg-[#0D0D0D] text-[#0D0D0D] hover:text-[#FFC21A] border border-[#0D0D0D]/15 grid place-items-center transition shadow-2xs"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* 2B. DESKTOP SYMMETRICAL 3-COLUMN LAYOUT (`hidden lg:grid`) */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-8 px-10 py-8 text-center items-start">
              {/* Column 1: المنيو */}
              <div>
                <h3 className="text-base font-black text-[#0D0D0D] pb-2.5 mb-3 border-b border-[#0D0D0D]/12">
                  المنيو
                </h3>
                <ul className="space-y-2 text-sm font-bold text-[#0D0D0D]/80">
                  {MENU_LINKS.map((item) => (
                    <li key={item.href + item.label}>
                      <Link
                        href={item.href}
                        className="hover:text-[#F59E0B] transition"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2: اكتشف */}
              <div>
                <h3 className="text-base font-black text-[#0D0D0D] pb-2.5 mb-3 border-b border-[#0D0D0D]/12">
                  اكتشف ميكس
                </h3>
                <ul className="space-y-2 text-sm font-bold text-[#0D0D0D]/80">
                  {DISCOVER_LINKS.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="hover:text-[#F59E0B] transition"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: فرع مدينة بدر وتواصل معنا */}
              <div className="flex flex-col items-center">
                <h3 className="w-full text-base font-black text-[#0D0D0D] pb-2.5 mb-3 border-b border-[#0D0D0D]/12">
                  فرع مدينة بدر وتواصل معنا
                </h3>

                <a
                  href={
                    mainBranch?.mapUrl ||
                    "https://maps.app.goo.gl/XC9GDwXD7cYGfKtF6"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 text-sm font-bold text-[#0D0D0D]/85 hover:text-[#F59E0B] transition"
                >
                  <PinIcon className="w-4 h-4 text-[#F59E0B] shrink-0" />
                  <span>
                    شارع الجامعة الروسية — مول 8 بجوار صيدلية العزبي وQNB
                  </span>
                </a>

                {/* Collapsible Phone Dropdown on Desktop */}
                <div className="mt-3 w-full max-w-xs rounded-2xl bg-white border border-[#0D0D0D]/15 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setDesktopPhonesOpen((v) => !v)}
                    aria-expanded={desktopPhonesOpen}
                    className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-black text-[#0D0D0D] hover:text-[#F59E0B] transition cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <PhoneIcon className="w-3.5 h-3.5 text-[#F59E0B]" />
                      <span>أرقام الطلبات ({phones.length} خطوط)</span>
                    </span>
                    <ChevronDownIcon
                      className={`w-4 h-4 text-[#0D0D0D] transition-transform duration-200 ${
                        desktopPhonesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {desktopPhonesOpen && (
                    <div
                      className="px-3 pb-3 pt-1.5 border-t border-[#0D0D0D]/10 grid grid-cols-2 gap-1.5"
                      dir="ltr"
                    >
                      {phones.map((ph, idx) => (
                        <a
                          key={ph}
                          href={`tel:${ph}`}
                          className={`rounded-full py-1.5 px-2.5 text-xs font-en font-extrabold flex items-center justify-center gap-1 border transition ${
                            idx === 0
                              ? "bg-[#0D0D0D] text-[#FFC21A] border-[#0D0D0D]"
                              : "bg-[#FFF3D6] hover:bg-[#FFC21A] text-[#0D0D0D] border-[#0D0D0D]/15"
                          }`}
                        >
                          <PhoneIcon className="w-3 h-3 shrink-0" />
                          <span>{ph}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                {/* Symmetrical 4-Icon Social Bar */}
                <div className="mt-4 flex items-center justify-center gap-2.5">
                  {socialItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.label}
                        title={item.label}
                        className="w-10 h-10 rounded-full bg-white hover:bg-[#0D0D0D] text-[#0D0D0D] hover:text-[#FFC21A] border border-[#0D0D0D]/15 grid place-items-center transition shadow-2xs"
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 3. CENTERED, 100% UNCLIPPED FULL BRAND WORDMARK ("ميكس كريب وبيتزا") */}
            <div className="w-full px-3 sm:px-8 pt-4 pb-5 sm:pb-6 border-t border-[#0D0D0D]/10 flex flex-col items-center justify-center text-center">
              <span className="inline-block rounded-full bg-[#FFC21A] text-[#0D0D0D] px-4 py-0.5 text-[11px] sm:text-xs font-en-display font-black tracking-[0.14em] uppercase mb-1.5">
                MIX CREPE & PIZZA • GOLDEN STREET FOOD
              </span>
              <div className="w-full font-display text-[8.8vw] sm:text-[7.4vw] lg:text-[84px] font-black leading-[1.06] tracking-tight text-[#0D0D0D] text-center whitespace-nowrap">
                ميكس كريب وبيتزا
              </div>
            </div>
          </div>

          {/* 4. Symmetrical Outer Bottom Bar */}
          <div className="px-4 sm:px-6 pt-4 pb-1 flex flex-col lg:flex-row items-center justify-between gap-2.5 text-xs text-white/85 text-center">
            <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1">
              <span className="font-bold text-white">
                © {new Date().getFullYear()} MIX Crepe & Pizza • ميكس كريب وبيتزا
                — مدينة بدر
              </span>
              <span className="opacity-45 hidden sm:inline">•</span>
              <Link
                href="/admin"
                className="font-extrabold text-[#FFC21A] hover:underline transition-colors"
              >
                لوحة الإدارة
              </Link>
            </div>

            <a
              href="https://chameleon.vision/"
              target="_blank"
              rel="noopener noreferrer"
              dir="ltr"
              className="group inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white/8 hover:bg-white/15 text-white border border-white/15 hover:border-[#FFC21A]/60 transition-all duration-200 whitespace-nowrap"
            >
              <span className="text-[11px] font-semibold tracking-wide text-white/85 group-hover:text-white">
                Powered by
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/chameleon-logo.webp"
                alt="Chameleon"
                className="h-4 w-auto object-contain shrink-0 transition-transform duration-200 group-hover:scale-105"
              />
              <span className="text-xs font-en font-black tracking-wider text-[#FFC21A]">
                Chameleon
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
