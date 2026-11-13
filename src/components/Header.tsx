"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "./store";
import { useLockBodyScroll } from "@/lib/useLockBodyScroll";
import type { Branch, Settings } from "@/lib/types";
import {
  CartIcon,
  ChevronDownIcon,
  CloseIcon,
  CustomizeSlidersIcon,
  DownloadAppIcon,
  FacebookIcon,
  InstagramIcon,
  MenuIcon,
  PhoneIcon,
  PinIcon,
  QrCodeIcon,
  ShareIosIcon,
  CheckIcon,
  TalabatIcon,
  TikTokIcon,
  UtensilsIcon,
  WhatsAppIcon,
} from "./icons";
import { MenuQrModal } from "./MenuQrModal";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const QUICK_CATEGORIES = [
  { label: "بيتزا إيطالي", href: "/menu?cat=pizza" },
  { label: "كريب حادق", href: "/menu?cat=savory_crepe" },
  { label: "ميكس كريب", href: "/menu?cat=mix_crepe" },
  { label: "كريب إكسترا", href: "/menu?cat=extra_crepe" },
  { label: "ساندوتشات", href: "/menu?cat=sandwiches" },
  { label: "بطاطس وجبن", href: "/menu?cat=cheese_fries" },
  { label: "فطائر حلوة", href: "/menu?cat=sweet_pies" },
  { label: "وافل ذهبي", href: "/menu?cat=waffles" },
  { label: "كريب حلو", href: "/menu?cat=sweet_crepe" },
  { label: "مشروبات", href: "/menu?cat=drinks" },
];

const SITE_PAGES = [
  { label: "الرئيسية", href: "/" },
  { label: "المنيو الكامل", href: "/menu" },
  { label: "العروض والتوفير", href: "/offers" },
  { label: "بوكسات وتجمعات", href: "/occasions" },
  { label: "الهوية البصرية", href: "/brand" },
  { label: "فرع مدينة بدر", href: "/branches" },
  { label: "عن ميكس", href: "/about" },
  { label: "تواصل معنا", href: "/contact" },
  { label: "سلة الطلبات", href: "/cart" },
];

export function Header({
  settings,
  branches = [],
}: {
  settings?: Settings;
  branches?: Branch[];
}) {
  const pathname = usePathname();
  const isMenuPage = pathname?.startsWith("/menu") ?? false;

  const { cart, hydrated, openPicker } = useStore();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  // Derived open state tied to pathname so route navigation auto-closes cleanly
  const [drawerPath, setDrawerPath] = useState<string | null>(null);
  const open = drawerPath === pathname;

  const [openSection, setOpenSection] = useState<
    "cats" | "pages" | "phones" | null
  >("cats");
  const [qrOpen, setQrOpen] = useState(false);

  // PWA Install Prompt
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [installedNow, setInstalledNow] = useState(false);
  const [showInstallGuide, setShowInstallGuide] = useState(false);

  const isStandalone =
    installedNow ||
    (hydrated &&
      typeof window !== "undefined" &&
      (window.matchMedia("(display-mode: standalone)").matches ||
        Boolean((window.navigator as { standalone?: boolean }).standalone)));

  const isIosDevice =
    hydrated &&
    typeof window !== "undefined" &&
    /iPhone|iPad|iPod/i.test(window.navigator.userAgent);

  useLockBodyScroll(open || showInstallGuide);

  useEffect(() => {
    const onOpenQr = () => setQrOpen(true);
    window.addEventListener("open-qr-modal", onOpenQr);
    window.addEventListener("open-menu-qr", onOpenQr);
    return () => {
      window.removeEventListener("open-qr-modal", onOpenQr);
      window.removeEventListener("open-menu-qr", onOpenQr);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    return () =>
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
  }, []);

  const openDrawer = () => setDrawerPath(pathname ?? "/");
  const closeDrawer = () => setDrawerPath(null);

  const toggleSection = (key: "cats" | "pages" | "phones") => {
    setOpenSection((prev) => (prev === key ? null : key));
  };

  const openBuilder = () => {
    closeDrawer();
    window.dispatchEvent(new CustomEvent("open-crepe-builder"));
  };

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
        setInstalledNow(true);
      }
    } else {
      setShowInstallGuide(true);
    }
  };

  const mainBranch =
    branches.find((b) => b.isActive) ?? branches[0];
  const orderPhones = settings?.orderPhones?.length
    ? settings.orderPhones
    : ["01098923225", "01125119375"];
  const primaryPhone = orderPhones[0] || "01098923225";
  const waPhone = mainBranch?.whatsapp || `2${primaryPhone}`;
  const talabatUrl =
    settings?.talabatUrl ||
    settings?.talabat ||
    "https://www.talabat.com/ar/egypt/restaurant/684423/mix-crepe-and-pizza?aid=9534";

  const SOCIAL_ITEMS = [
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

  const desktopNav = [
    { label: "الرئيسية", href: "/" },
    { label: "المنيو", href: "/menu" },
    { label: "العروض", href: "/offers" },
    { label: "عن ميكس", href: "/about" },
    { label: "الهوية", href: "/brand" },
    { label: "تواصل", href: "/contact" },
  ];

  return (
    <>
      <header
        dir="ltr"
        className="sticky top-0 z-50 px-2.5 sm:px-6 pt-2.5 sm:pt-3 pb-1 pointer-events-none"
      >
        <div className="max-w-7xl mx-auto pointer-events-auto">
          <div className="h-14 sm:h-16 rounded-full bg-[#FFF3D6]/95 backdrop-blur-md border border-[#0D0D0D]/15 shadow-[0_10px_28px_-12px_rgba(13,13,13,0.32)] px-3 sm:px-5 flex items-center justify-between gap-2">
            {/* Far Left: Logo ONLY (strictly no adjacent text) */}
            <Link
              href="/"
              aria-label="MIX Crepe & Pizza"
              className="shrink-0 flex items-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={isMenuPage ? "/logo-horizontal.webp" : "/logo-mobile.webp"}
                alt="MIX Crepe & Pizza"
                className={
                  isMenuPage
                    ? "h-8 sm:h-10 w-auto max-w-[155px] sm:max-w-[200px] object-contain"
                    : "h-9 sm:h-11 w-auto max-w-[130px] sm:max-w-[165px] object-contain"
                }
              />
            </Link>

            {/* Center: Desktop Nav (RTL order) */}
            <nav
              dir="rtl"
              aria-label="التنقل الرئيسي"
              className="hidden lg:flex items-center gap-1"
            >
              {desktopNav.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname?.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3.5 py-2 rounded-full text-xs xl:text-sm font-black transition whitespace-nowrap ${
                      active
                        ? "bg-[#0D0D0D] text-[#FFC21A]"
                        : "text-[#0D0D0D] hover:bg-[#0D0D0D]/8"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <button
                type="button"
                onClick={openBuilder}
                className="px-3.5 py-2 rounded-full bg-[#FFC21A] hover:bg-[#F59E0B] text-[#0D0D0D] text-xs xl:text-sm font-black inline-flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap"
              >
                <CustomizeSlidersIcon className="w-3.5 h-3.5 shrink-0" />
                <span>مكسها على مزاجك</span>
              </button>
            </nav>

            {/* Far Right: Cart + Burger Menu */}
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/cart"
                aria-label="سلة الطلبات"
                className="relative h-10 sm:h-11 px-3 sm:px-4 rounded-full bg-[#0D0D0D] hover:bg-[#171717] text-[#FFC21A] flex items-center gap-1.5 text-xs font-black transition shadow-xs"
              >
                <CartIcon className="w-4 h-4 shrink-0" />
                <span dir="rtl" className="hidden sm:inline">
                  السلة
                </span>
                {hydrated && count > 0 && (
                  <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-[#FFC21A] text-[#0D0D0D] text-[11px] font-en font-black grid place-items-center tabular-nums">
                    {count}
                  </span>
                )}
              </Link>

              <button
                type="button"
                onClick={openDrawer}
                aria-label="فتح القائمة"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-[#FFC21A] text-[#0D0D0D] border border-[#0D0D0D]/15 grid place-items-center transition cursor-pointer"
              >
                <MenuIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Portal Slide-over Navigation Drawer */}
      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            dir="rtl"
            className="fixed inset-0 z-[90] flex justify-end overscroll-none"
            role="dialog"
            aria-modal="true"
            aria-label="القائمة الرئيسية"
          >
            <div
              className="absolute inset-0 bg-[#0D0D0D]/70 backdrop-blur-xs touch-none"
              onClick={closeDrawer}
            />

            <aside className="relative z-10 w-[90vw] max-w-[390px] h-full bg-[#FFF3D6] border-r-2 border-[#FFC21A] shadow-2xl flex flex-col overflow-hidden">
              {/* 1. Drawer Top Header */}
              <div
                dir="ltr"
                className="shrink-0 bg-[#0D0D0D] px-4 py-3.5 flex items-center justify-between border-b border-[#FFC21A]/25"
              >
                <Link
                  href="/"
                  onClick={closeDrawer}
                  className="shrink-0"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/logo-horizontal-light.webp"
                    alt="MIX Crepe & Pizza"
                    className="h-9 w-auto max-w-[200px] object-contain"
                  />
                </Link>

                <button
                  type="button"
                  onClick={closeDrawer}
                  aria-label="إغلاق القائمة"
                  className="w-9 h-9 rounded-full bg-white/12 hover:bg-[#FFC21A] text-white hover:text-[#0D0D0D] grid place-items-center transition cursor-pointer shrink-0"
                >
                  <CloseIcon className="w-4 h-4" />
                </button>
              </div>

              {/* 2. Scrollable Structured Body */}
              <div
                data-modal-scroll
                className="flex-1 overflow-y-auto overscroll-contain touch-pan-y p-4 space-y-3 no-scrollbar"
              >
                {/* Compact Branch Status Bar */}
                <button
                  type="button"
                  onClick={() => {
                    closeDrawer();
                    openPicker();
                  }}
                  className="w-full rounded-2xl bg-white border border-[#0D0D0D]/15 px-3.5 py-2.5 flex items-center justify-between gap-2 hover:border-[#0D0D0D] transition cursor-pointer shadow-2xs"
                >
                  <span className="flex items-center gap-2 text-xs font-black text-[#0D0D0D] truncate">
                    <PinIcon className="w-4 h-4 text-[#F59E0B] shrink-0" />
                    <span className="truncate">
                      مدينة بدر • مول 8 — شارع الجامعة الروسية
                    </span>
                  </span>
                  <span className="shrink-0 rounded-full bg-[#FFC21A] text-[#0D0D0D] px-2.5 py-0.5 text-[11px] font-black">
                    مفتوح دائمًا
                  </span>
                </button>

                {/* Symmetrical 2x2 Quick Action Bento */}
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/menu"
                    onClick={closeDrawer}
                    className="rounded-2xl bg-[#0D0D0D] hover:bg-[#171717] text-white p-3 flex flex-col items-center justify-center gap-1.5 text-center transition shadow-xs"
                  >
                    <UtensilsIcon className="w-5 h-5 text-[#FFC21A]" />
                    <span className="text-xs font-black">المنيو التفاعلي</span>
                  </Link>

                  <button
                    type="button"
                    onClick={openBuilder}
                    className="rounded-2xl bg-[#FFC21A] hover:bg-[#F59E0B] text-[#0D0D0D] p-3 flex flex-col items-center justify-center gap-1.5 text-center transition shadow-xs cursor-pointer"
                  >
                    <CustomizeSlidersIcon className="w-5 h-5 text-[#0D0D0D]" />
                    <span className="text-xs font-black">مكسها على مزاجك</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      closeDrawer();
                      setQrOpen(true);
                    }}
                    className="rounded-2xl bg-white hover:bg-[#FFF3D6] text-[#0D0D0D] border border-[#0D0D0D]/15 p-3 flex flex-col items-center justify-center gap-1.5 text-center transition cursor-pointer"
                  >
                    <QrCodeIcon className="w-5 h-5 text-[#F59E0B]" />
                    <span className="text-xs font-black">باركود QR</span>
                  </button>

                  <a
                    href={talabatUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-2xl bg-white hover:bg-[#FFF3D6] text-[#0D0D0D] border border-[#0D0D0D]/15 p-3 flex flex-col items-center justify-center gap-1.5 text-center transition"
                  >
                    <TalabatIcon className="w-5 h-5 text-[#F59E0B]" />
                    <span className="text-xs font-black">اطلب من طلبات</span>
                  </a>
                </div>

                {/* DROPDOWN 1: أقسام المنيو */}
                <div className="rounded-2xl bg-white border border-[#0D0D0D]/14 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleSection("cats")}
                    aria-expanded={openSection === "cats"}
                    className="w-full px-4 py-3 flex items-center justify-between text-xs sm:text-sm font-black text-[#0D0D0D] hover:text-[#F59E0B] transition cursor-pointer"
                  >
                    <span>أقسام المنيو (10 أقسام)</span>
                    <ChevronDownIcon
                      className={`w-4 h-4 text-[#0D0D0D] transition-transform duration-200 ${
                        openSection === "cats" ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openSection === "cats" && (
                    <div className="px-3 pb-3 pt-1 border-t border-[#0D0D0D]/10 grid grid-cols-2 gap-1.5">
                      {QUICK_CATEGORIES.map((cat) => (
                        <Link
                          key={cat.href}
                          href={cat.href}
                          onClick={closeDrawer}
                          className="rounded-xl bg-[#FFF3D6] hover:bg-[#0D0D0D] text-[#0D0D0D] hover:text-[#FFC21A] border border-[#0D0D0D]/12 px-2.5 py-2 text-xs font-extrabold text-center truncate transition"
                        >
                          {cat.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* DROPDOWN 2: صفحات الموقع */}
                <div className="rounded-2xl bg-white border border-[#0D0D0D]/14 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleSection("pages")}
                    aria-expanded={openSection === "pages"}
                    className="w-full px-4 py-3 flex items-center justify-between text-xs sm:text-sm font-black text-[#0D0D0D] hover:text-[#F59E0B] transition cursor-pointer"
                  >
                    <span>تصفح صفحات الموقع</span>
                    <ChevronDownIcon
                      className={`w-4 h-4 text-[#0D0D0D] transition-transform duration-200 ${
                        openSection === "pages" ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openSection === "pages" && (
                    <div className="px-3 pb-3 pt-1 border-t border-[#0D0D0D]/10 grid grid-cols-2 gap-1.5">
                      {SITE_PAGES.map((pg, idx) => {
                        const active = pathname === pg.href;
                        return (
                          <Link
                            key={pg.href}
                            href={pg.href}
                            onClick={closeDrawer}
                            className={`rounded-xl px-2.5 py-2 text-xs font-extrabold text-center truncate border transition ${
                              idx === SITE_PAGES.length - 1 ? "col-span-2" : ""
                            } ${
                              active
                                ? "bg-[#0D0D0D] text-[#FFC21A] border-[#0D0D0D]"
                                : "bg-[#FFF3D6] hover:bg-[#FFC21A] text-[#0D0D0D] border-[#0D0D0D]/12"
                            }`}
                          >
                            {pg.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* DROPDOWN 3: أرقام الطلبات */}
                <div className="rounded-2xl bg-white border border-[#0D0D0D]/14 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleSection("phones")}
                    aria-expanded={openSection === "phones"}
                    className="w-full px-4 py-3 flex items-center justify-between text-xs sm:text-sm font-black text-[#0D0D0D] hover:text-[#F59E0B] transition cursor-pointer"
                  >
                    <span>أرقام الطلبات والتوصيل (خطان)</span>
                    <ChevronDownIcon
                      className={`w-4 h-4 text-[#0D0D0D] transition-transform duration-200 ${
                        openSection === "phones" ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openSection === "phones" && (
                    <div
                      className="px-3 pb-3 pt-1 border-t border-[#0D0D0D]/10 grid grid-cols-2 gap-1.5"
                      dir="ltr"
                    >
                      {orderPhones.map((ph, idx) => (
                        <a
                          key={ph}
                          href={`tel:${ph}`}
                          className={`rounded-xl py-2 px-2.5 flex items-center justify-center gap-1.5 text-xs font-en font-black border transition ${
                            idx === 0
                              ? "bg-[#0D0D0D] text-[#FFC21A] border-[#0D0D0D]"
                              : "bg-[#FFF3D6] hover:bg-[#FFC21A] text-[#0D0D0D] border-[#0D0D0D]/15"
                          }`}
                        >
                          <PhoneIcon className="w-3.5 h-3.5 shrink-0" />
                          <span>{ph}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                {/* Install PWA Button */}
                {!isStandalone && (
                  <button
                    type="button"
                    onClick={handleInstallClick}
                    className="w-full rounded-2xl bg-[#0D0D0D] hover:bg-[#171717] text-white px-4 py-3 flex items-center justify-center gap-2 text-xs font-black transition cursor-pointer"
                  >
                    <DownloadAppIcon className="w-4 h-4 text-[#FFC21A] shrink-0" />
                    <span>تثبيت تطبيق ميكس كريب وبيتزا على الهاتف</span>
                  </button>
                )}

                {/* Symmetrical 4-Icon Official Social Bar */}
                <div className="pt-1">
                  <div className="grid grid-cols-4 gap-2">
                    {SOCIAL_ITEMS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={item.label}
                          title={item.label}
                          className="h-11 rounded-2xl bg-white hover:bg-[#0D0D0D] text-[#0D0D0D] hover:text-[#FFC21A] border border-[#0D0D0D]/15 grid place-items-center transition"
                        >
                          <Icon className="w-4 h-4" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 3. Pinned Symmetrical Bottom Bar */}
              <div
                dir="ltr"
                className="shrink-0 p-3.5 bg-white border-t border-[#0D0D0D]/12 grid grid-cols-2 gap-2"
              >
                <a
                  href={`tel:${primaryPhone}`}
                  className="rounded-full bg-[#0D0D0D] hover:bg-black text-[#FFC21A] py-2.5 px-3 flex items-center justify-center gap-1.5 text-xs font-en font-black transition"
                >
                  <PhoneIcon className="w-3.5 h-3.5 shrink-0" />
                  <span>{primaryPhone}</span>
                </a>
                <a
                  href={`https://wa.me/${waPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="rtl"
                  className="rounded-full bg-[#FFC21A] hover:bg-[#F59E0B] text-[#0D0D0D] py-2.5 px-3 flex items-center justify-center gap-1.5 text-xs font-black transition"
                >
                  <WhatsAppIcon className="w-4 h-4 text-[#0D0D0D] shrink-0" />
                  <span>اطلب واتساب</span>
                </a>
              </div>
            </aside>
          </div>,
          document.body,
        )}

      {/* Install PWA Guide Modal */}
      {showInstallGuide &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            dir="rtl"
            className="fixed inset-0 z-[96] flex items-center justify-center p-4 overscroll-none"
            role="dialog"
            aria-modal="true"
          >
            <div
              className="absolute inset-0 bg-[#0D0D0D]/70 backdrop-blur-xs touch-none"
              onClick={() => setShowInstallGuide(false)}
            />
            <div className="relative z-10 w-full max-w-sm rounded-3xl bg-[#FFF3D6] border-2 border-[#FFC21A] p-5 shadow-2xl text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-emblem.webp"
                alt="MIX Crepe & Pizza"
                className="w-16 h-16 mx-auto rounded-full object-contain drop-shadow-md"
              />
              <h3 className="text-lg font-black text-[#0D0D0D] mt-3">
                تثبيت تطبيق ميكس كريب وبيتزا
              </h3>

              {isIosDevice ? (
                <div className="mt-4 space-y-2.5 text-xs font-bold text-[#0D0D0D]/80 bg-white rounded-2xl p-4 border border-[#0D0D0D]/12 text-right">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#0D0D0D] text-[#FFC21A] text-xs font-black grid place-items-center shrink-0">
                      1
                    </span>
                    <span className="inline-flex items-center gap-1 flex-wrap">
                      اضغط على زر المشاركة{" "}
                      <ShareIosIcon className="w-4 h-4 text-[#0D0D0D] inline" />{" "}
                      في متصفح Safari
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#0D0D0D] text-[#FFC21A] text-xs font-black grid place-items-center shrink-0">
                      2
                    </span>
                    <span>
                      اختر «إضافة إلى الشاشة الرئيسية» (Add to Home Screen)
                    </span>
                  </div>
                </div>
              ) : (
                <div className="mt-4 space-y-2.5 text-xs font-bold text-[#0D0D0D]/80 bg-white rounded-2xl p-4 border border-[#0D0D0D]/12 text-right">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#0D0D0D] text-[#FFC21A] text-xs font-black grid place-items-center shrink-0">
                      1
                    </span>
                    <span>افتح قائمة المتصفح العلوية</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#0D0D0D] text-[#FFC21A] text-xs font-black grid place-items-center shrink-0">
                      2
                    </span>
                    <span>
                      اختر «تثبيت التطبيق» أو «الإضافة إلى الشاشة الرئيسية»
                    </span>
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={() => setShowInstallGuide(false)}
                className="w-full mt-4 rounded-full bg-[#0D0D0D] hover:bg-[#171717] text-[#FFC21A] font-black text-sm py-3 flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <CheckIcon className="w-4 h-4" />
                <span>تمام</span>
              </button>
            </div>
          </div>,
          document.body,
        )}

      <MenuQrModal
        open={qrOpen}
        onClose={() => setQrOpen(false)}
        settings={settings}
      />
    </>
  );
}

export default Header;
