"use client";

import { useStore } from "./store";
import { PinIcon } from "./icons";

export default function PickBranchButton({
  className,
  label = "تفاصيل فرع مدينة بدر",
}: {
  className?: string;
  label?: string;
}) {
  const { openPicker } = useStore();
  return (
    <button
      type="button"
      onClick={openPicker}
      className={className ?? "btn btn-outline cursor-pointer"}
    >
      <PinIcon className="w-4 h-4 shrink-0" /> {label}
    </button>
  );
}

export function OrderFromBranchButton({
  branchId,
  className,
}: {
  branchId: string;
  className?: string;
}) {
  const { setBranchId } = useStore();
  return (
    <a
      href="/menu"
      onClick={() => setBranchId(branchId)}
      className={className ?? "btn btn-primary text-sm py-2.5"}
    >
      اطلب من الفرع ده
    </a>
  );
}
