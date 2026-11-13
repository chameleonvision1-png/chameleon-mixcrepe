"use client";

import { QrCodeIcon } from "./icons";

export default function OpenQrButton({
  label = "باركود المنيو QR",
  className = "inline-flex items-center justify-center gap-1.5 rounded-full bg-[#FFC21A] hover:bg-[#F59E0B] text-[#0D0D0D] font-black text-xs sm:text-sm px-3.5 py-2.5 sm:px-5 sm:py-3 transition shadow-xs cursor-pointer whitespace-nowrap",
  iconClassName = "w-4 h-4 shrink-0 text-[#0D0D0D]",
}: {
  label?: string;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("open-qr-modal"));
        }
      }}
      className={className}
    >
      <QrCodeIcon className={iconClassName} />
      <span>{label}</span>
    </button>
  );
}
