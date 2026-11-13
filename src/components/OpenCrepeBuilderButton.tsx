"use client";

import { CustomizeSlidersIcon } from "./icons";

export function OpenCrepeBuilderButton({
  label = "مكسها على مزاجك",
  className = "inline-flex items-center justify-center gap-2 rounded-full bg-[#FFC21A] hover:bg-[#F59E0B] text-[#0D0D0D] font-black text-xs sm:text-sm px-5 py-3 transition shadow-xs cursor-pointer whitespace-nowrap",
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
          window.dispatchEvent(new CustomEvent("open-crepe-builder"));
        }
      }}
      className={className}
    >
      <CustomizeSlidersIcon className={iconClassName} />
      <span>{label}</span>
    </button>
  );
}

export default OpenCrepeBuilderButton;
