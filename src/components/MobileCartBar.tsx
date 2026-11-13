"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useStore } from "./store";
import { formatPrice } from "@/lib/format";
import {
  ArrowUpIcon,
  CartIcon,
  ChevronIcon,
  WhatsAppIcon,
} from "./icons";

export function MobileCartBar({
  whatsapp = "201098923225",
}: {
  whatsapp?: string;
}) {
  const pathname = usePathname();
  const { cart, subtotal, hydrated } = useStore();
  const [showTop, setShowTop] = useState(false);

  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const hideCartBar = pathname?.startsWith("/cart") || pathname?.startsWith("/admin");

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 380);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      {/* Desktop Floating Action Pair (WhatsApp + Scroll Top) */}
      <div className="hidden md:flex fixed bottom-5 left-5 z-40 items-center gap-2.5">
        {showTop && (
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="العودة للأعلى"
            className="w-11 h-11 rounded-full bg-[#FFF3D6] hover:bg-[#FFC21A] text-[#0D0D0D] border-2 border-[#0D0D0D]/20 shadow-lg grid place-items-center transition cursor-pointer"
          >
            <ArrowUpIcon className="w-4 h-4" />
          </button>
        )}

        <a
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="تواصل واتساب"
          className="h-11 px-4 rounded-full bg-[#0D0D0D] hover:bg-[#171717] text-[#FFC21A] border border-[#FFC21A]/50 shadow-xl flex items-center gap-2 text-xs font-black transition"
        >
          <WhatsAppIcon className="w-4 h-4 text-[#FFC21A] shrink-0" />
          <span>اطلب واتساب</span>
        </a>
      </div>

      {/* Mobile Bottom Docked Cart / WhatsApp Bar */}
      {!hideCartBar && hydrated && count > 0 && (
        <div className="md:hidden fixed bottom-3 inset-x-3 z-40 pointer-events-none">
          <Link
            href="/cart"
            className="pointer-events-auto w-full rounded-full bg-[#0D0D0D] text-white border-2 border-[#FFC21A] shadow-[0_14px_30px_-8px_rgba(13,13,13,0.65)] px-4 py-3 flex items-center justify-between gap-3"
          >
            <span className="flex items-center gap-2.5 min-w-0">
              <span className="relative w-8 h-8 rounded-full bg-[#FFC21A] text-[#0D0D0D] grid place-items-center shrink-0">
                <CartIcon className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-white text-[#0D0D0D] text-[10px] font-en font-black grid place-items-center border border-[#0D0D0D]/20 tabular-nums">
                  {count}
                </span>
              </span>
              <span className="text-sm font-extrabold tracking-tight truncate">
                عرض سلة ميكس كريب وبيتزا
              </span>
            </span>

            <span className="flex items-center gap-1.5 shrink-0">
              <span className="text-sm font-black text-[#FFC21A] tabular-nums">
                {formatPrice(subtotal)}
              </span>
              <ChevronIcon className="w-4 h-4 text-white/75" />
            </span>
          </Link>
        </div>
      )}
    </>
  );
}

export default MobileCartBar;
