import type { Metadata } from "next";
import { publicDB } from "@/lib/db";
import BranchesShowcase from "@/components/BranchesShowcase";
import { PinIcon } from "@/components/icons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "فرع مدينة بدر ومناطق التوصيل",
  description:
    "موقع مطعم ميكس كريب وبيتزا (MIX Crepe & Pizza) في مدينة بدر — شارع الجامعة الروسية — مول 8 بجوار صيدلية العزبي وبنك QNB، أرقام التوصيل، وخريطة الوصول.",
};

export default async function BranchesPage() {
  const db = await publicDB();
  const activeBranches = db.branches.filter((b) => b.isActive);

  return (
    <div className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6">
      <div className="rounded-[30px] sm:rounded-[38px] bg-[#0D0D0D] mix-pattern-dark text-white border-2 border-[#FFC21A]/35 p-6 sm:p-10 text-center space-y-3 shadow-xl">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFC21A] text-[#0D0D0D] px-4 py-1 text-xs font-black">
          <PinIcon className="w-4 h-4 shrink-0" />
          <span>فرع مدينة بدر الرسمي</span>
        </span>
        <h1 className="font-display text-2xl sm:text-4xl font-black text-white">
          زورنا في مول 8 — شارع الجامعة الروسية
        </h1>
        <p className="text-xs sm:text-sm font-semibold text-white/80 max-w-2xl mx-auto">
          بجوار صيدلية العزبي وبنك QNB الأهلي — جلسات خارجية مريحة، استلام من
          الفرع وتقديم للسيارة، وتوصيل سريع لكل أحياء مدينة بدر.
        </p>
      </div>

      <BranchesShowcase
        branches={activeBranches.length ? activeBranches : db.branches.slice(0, 1)}
        settings={db.settings}
      />
    </div>
  );
}
