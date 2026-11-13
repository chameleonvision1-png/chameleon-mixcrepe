"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Category, Product } from "@/lib/types";
import { ProductCard } from "./Product";
import { useStore } from "./store";
import OpenCrepeBuilderButton from "./OpenCrepeBuilderButton";
import { GridIcon, ListIcon, PinIcon, SearchIcon, XIcon } from "./icons";

type FilterId = "all" | "best" | "pizza" | "crepe" | "sweet";

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "الكل" },
  { id: "best", label: "الأكثر طلبًا" },
  { id: "pizza", label: "البيتزا الإيطالي" },
  { id: "crepe", label: "الكريب والميكسات" },
  { id: "sweet", label: "الحلو والوافل" },
];

const MenuChapters = memo(function MenuChapters({
  visibleCats,
  filtered,
  view,
  setSectionRef,
}: {
  visibleCats: Category[];
  filtered: Product[];
  view: "grid" | "menu";
  setSectionRef: (id: string) => (el: HTMLElement | null) => void;
}) {
  return (
    <div className="space-y-9">
      {visibleCats.map((cat) => {
        const items = filtered.filter((p) => p.categoryId === cat.id);
        return (
          <section
            key={cat.id}
            ref={setSectionRef(cat.id)}
            id={`cat-${cat.id}`}
            className="scroll-mt-32 space-y-4"
          >
            {/* Category Banner Header */}
            <div className="rounded-[24px] bg-white border border-[#0D0D0D]/14 px-4 sm:px-5 py-3.5 flex items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF3D6] border border-[#0D0D0D]/12 overflow-hidden shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cat.image}
                    alt={cat.nameAr}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h2 className="font-display text-lg sm:text-xl font-black text-[#0D0D0D] truncate">
                    {cat.nameAr}
                  </h2>
                  {cat.nameEn && (
                    <p className="text-[11px] font-en font-extrabold tracking-wide text-[#F59E0B] uppercase">
                      {cat.nameEn}
                    </p>
                  )}
                </div>
              </div>

              <span className="shrink-0 rounded-full bg-[#0D0D0D] text-[#FFC21A] px-3 py-1 text-xs font-black tabular-nums">
                {items.length} صنف
              </span>
            </div>

            {/* Category Products */}
            {view === "menu" ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
                {items.map((p) => (
                  <ProductCard key={p.id} product={p} variant="menu" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4">
                {items.map((p) => (
                  <ProductCard key={p.id} product={p} variant="grid" />
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
});

export default function MenuClient({
  categories,
  products,
  initialCat,
}: {
  categories: Category[];
  products: Product[];
  initialCat?: string;
}) {
  const { branch, hydrated, openPicker } = useStore();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<FilterId>("all");
  const [view, setView] = useState<"grid" | "menu">("grid");

  const resolvedInitialCat = useMemo(() => {
    if (!initialCat) return categories[0]?.id ?? "";
    const match = categories.find(
      (c) => c.id === initialCat || c.slug === initialCat,
    );
    return match?.id ?? categories[0]?.id ?? "";
  }, [initialCat, categories]);

  const [activeCat, setActiveCat] = useState<string>(resolvedInitialCat);
  const activeCatRef = useRef(activeCat);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const stickyBarRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const pillRafRef = useRef(0);
  const animatingCatRef = useRef<string | null>(null);
  const isStripTouchingRef = useRef(false);
  const stripTouchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isJumpingRef = useRef(false);
  const jumpTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setSectionRef = useCallback(
    (id: string) => (el: HTMLElement | null) => {
      sectionRefs.current[id] = el;
    },
    [],
  );

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return products.filter((p) => {
      if (query) {
        const hay = `${p.nameAr} ${p.nameEn ?? ""} ${p.descriptionAr}`.toLowerCase();
        if (!hay.includes(query)) return false;
      }
      switch (filter) {
        case "best":
          return p.isBestSeller;
        case "pizza":
          return p.categoryId === "pizza";
        case "crepe":
          return (
            p.categoryId === "savory_crepe" ||
            p.categoryId === "mix_crepe" ||
            p.categoryId === "extra_crepe"
          );
        case "sweet":
          return p.taste === "sweet";
        default:
          return true;
      }
    });
  }, [q, filter, products]);

  const visibleCats = useMemo(
    () => categories.filter((c) => filtered.some((p) => p.categoryId === c.id)),
    [categories, filtered],
  );

  const catCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const p of filtered) {
      map[p.categoryId] = (map[p.categoryId] || 0) + 1;
    }
    return map;
  }, [filtered]);

  const centerActivePill = useCallback((catId: string, immediate = false) => {
    const box = pillsRef.current;
    const pill = box?.querySelector<HTMLElement>(`[data-cat="${catId}"]`);
    if (!box || !pill) return;

    if (!immediate && pillRafRef.current && animatingCatRef.current === catId) {
      return;
    }

    if (pillRafRef.current) {
      cancelAnimationFrame(pillRafRef.current);
      pillRafRef.current = 0;
    }

    const boxRect = box.getBoundingClientRect();
    const pillRect = pill.getBoundingClientRect();
    const delta =
      pillRect.left +
      pillRect.width * 0.5 -
      (boxRect.left + boxRect.width * 0.5);

    if (Math.abs(delta) < 2) {
      animatingCatRef.current = null;
      return;
    }

    const startScrollLeft = box.scrollLeft;
    if (immediate) {
      box.scrollLeft = startScrollLeft + delta;
      animatingCatRef.current = null;
      return;
    }

    animatingCatRef.current = catId;
    const startTime = performance.now();
    const duration = Math.min(360, Math.max(240, Math.abs(delta) * 1.1));

    const step = (now: number) => {
      if (isStripTouchingRef.current) {
        pillRafRef.current = 0;
        animatingCatRef.current = null;
        return;
      }
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      box.scrollLeft = startScrollLeft + delta * eased;

      if (t < 1) {
        pillRafRef.current = requestAnimationFrame(step);
      } else {
        pillRafRef.current = 0;
        animatingCatRef.current = null;
      }
    };
    pillRafRef.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    if (!activeCat) return;
    if (!isStripTouchingRef.current) {
      centerActivePill(activeCat, false);
    }
  }, [activeCat, visibleCats, centerActivePill]);

  useEffect(() => {
    if (initialCat && resolvedInitialCat) {
      setTimeout(() => {
        const el = sectionRefs.current[resolvedInitialCat];
        if (!el) return;
        const stickyBottom =
          stickyBarRef.current?.getBoundingClientRect().bottom ?? 120;
        const top =
          window.scrollY + el.getBoundingClientRect().top - stickyBottom - 14;
        window.scrollTo({
          top: Math.max(0, top),
          behavior: "smooth",
        });
      }, 60);
    }
  }, [initialCat, resolvedInitialCat]);

  useEffect(() => {
    if (visibleCats.length === 0) return;
    let ticking = false;

    const unlockJumpOnManualInput = () => {
      if (isJumpingRef.current) {
        isJumpingRef.current = false;
        if (jumpTimerRef.current) {
          clearTimeout(jumpTimerRef.current);
          jumpTimerRef.current = null;
        }
      }
    };

    const onScroll = () => {
      if (isJumpingRef.current || ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        const stickyBottom =
          stickyBarRef.current?.getBoundingClientRect().bottom ?? 120;
        const triggerLine = stickyBottom + 24;
        const hysteresis = 20;
        const prevId = activeCatRef.current;
        let candidateId = visibleCats[0].id;

        const doc = document.documentElement;
        if (window.innerHeight + window.scrollY >= doc.scrollHeight - 24) {
          candidateId = visibleCats[visibleCats.length - 1].id;
        } else {
          for (const c of visibleCats) {
            const el = sectionRefs.current[c.id];
            if (!el) continue;
            if (el.getBoundingClientRect().top <= triggerLine) {
              candidateId = c.id;
            } else {
              break;
            }
          }

          if (candidateId !== prevId) {
            const prevIdx = visibleCats.findIndex((c) => c.id === prevId);
            const candIdx = visibleCats.findIndex((c) => c.id === candidateId);

            if (prevIdx !== -1 && candIdx === prevIdx + 1) {
              const nextEl = sectionRefs.current[candidateId];
              if (
                nextEl &&
                nextEl.getBoundingClientRect().top > triggerLine - hysteresis
              ) {
                candidateId = prevId;
              }
            } else if (prevIdx !== -1 && candIdx === prevIdx - 1) {
              const prevEl = sectionRefs.current[prevId];
              if (
                prevEl &&
                prevEl.getBoundingClientRect().top < triggerLine + hysteresis
              ) {
                candidateId = prevId;
              }
            }
          }
        }

        if (candidateId !== prevId) {
          activeCatRef.current = candidateId;
          setActiveCat(candidateId);
        }
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", unlockJumpOnManualInput, { passive: true });
    window.addEventListener("touchmove", unlockJumpOnManualInput, {
      passive: true,
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", unlockJumpOnManualInput);
      window.removeEventListener("touchmove", unlockJumpOnManualInput);
      if (jumpTimerRef.current) clearTimeout(jumpTimerRef.current);
      if (stripTouchTimerRef.current) clearTimeout(stripTouchTimerRef.current);
      if (pillRafRef.current) cancelAnimationFrame(pillRafRef.current);
    };
  }, [visibleCats]);

  const jump = (id: string) => {
    const el = sectionRefs.current[id];
    if (!el) return;
    isStripTouchingRef.current = false;
    isJumpingRef.current = true;
    activeCatRef.current = id;
    setActiveCat(id);
    centerActivePill(id, false);
    if (jumpTimerRef.current) clearTimeout(jumpTimerRef.current);

    const stickyBottom =
      stickyBarRef.current?.getBoundingClientRect().bottom ?? 120;
    const top =
      window.scrollY + el.getBoundingClientRect().top - stickyBottom - 14;
    window.scrollTo({
      top: Math.max(0, top),
      behavior: "smooth",
    });

    jumpTimerRef.current = setTimeout(() => {
      isJumpingRef.current = false;
    }, 650);
  };

  return (
    <div className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8 py-5 w-full min-w-0">
      {/* Search + View Switcher + Filter Strip */}
      <div className="bg-white rounded-[26px] p-3.5 sm:p-4 border border-[#0D0D0D]/14 shadow-[0_10px_28px_-14px_rgba(13,13,13,0.1)] space-y-3">
        <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
          <div className="relative flex-1 min-w-0">
            <SearchIcon className="w-4 h-4 text-[#0D0D0D] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="ابحث في منيو ميكس (بيتزا سوبر سوبريم، كريب الفيل، المدمر، وافل نوتيلا…)"
              className="w-full rounded-full border border-[#0D0D0D]/14 bg-[#FFF3D6]/55 focus:bg-white focus:border-[#0D0D0D] focus:outline-none pr-10 pl-9 py-2.5 text-xs sm:text-sm font-bold text-[#0D0D0D]"
            />
            {q && (
              <button
                type="button"
                onClick={() => setQ("")}
                aria-label="مسح البحث"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0D0D0D]/45 hover:text-[#0D0D0D] cursor-pointer"
              >
                <XIcon className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
            <div className="grid grid-cols-2 flex-1 sm:flex-initial rounded-full bg-[#FFF3D6] border border-[#0D0D0D]/14 p-1">
              <button
                type="button"
                onClick={() => setView("menu")}
                className={`rounded-full px-3.5 py-1.5 text-xs font-black inline-flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  view === "menu"
                    ? "bg-[#0D0D0D] text-[#FFC21A] shadow-xs"
                    : "text-[#0D0D0D]/75 hover:text-[#0D0D0D]"
                }`}
              >
                <ListIcon className="w-3.5 h-3.5 shrink-0" />
                <span>قائمة</span>
              </button>
              <button
                type="button"
                onClick={() => setView("grid")}
                className={`rounded-full px-3.5 py-1.5 text-xs font-black inline-flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  view === "grid"
                    ? "bg-[#0D0D0D] text-[#FFC21A] shadow-xs"
                    : "text-[#0D0D0D]/75 hover:text-[#0D0D0D]"
                }`}
              >
                <GridIcon className="w-3.5 h-3.5 shrink-0" />
                <span>بطاقات</span>
              </button>
            </div>

            {hydrated && branch && (
              <button
                type="button"
                onClick={openPicker}
                className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-[#FFF3D6] hover:bg-[#FFC21A] border border-[#0D0D0D]/15 px-3 py-2 text-[11px] font-black text-[#0D0D0D] transition cursor-pointer"
              >
                <PinIcon className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
                <span>مول 8 — بدر</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
          {FILTERS.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-black border transition cursor-pointer ${
                  active
                    ? "bg-[#0D0D0D] text-[#FFC21A] border-[#0D0D0D]"
                    : "bg-[#FFF3D6] text-[#0D0D0D]/80 border-[#0D0D0D]/12 hover:border-[#FFC21A]"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Inline Custom Crepe Builder Banner */}
      <div className="mt-4 rounded-[26px] bg-[#0D0D0D] mix-pattern-dark text-white p-4 sm:p-5 border border-[#FFC21A]/35 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
        <div className="text-center sm:text-right">
          <span className="inline-block rounded-full bg-[#FFC21A] text-[#0D0D0D] px-3 py-0.5 text-[11px] font-black mb-1.5">
            توليفة خاصة على ذوقك
          </span>
          <h3 className="font-display text-base sm:text-lg font-black text-white">
            اختار الحشوة وسيب الباقي علينا — صمّم كريبك بنفسك
          </h3>
          <p className="text-xs font-semibold text-white/75 mt-0.5">
            اجمع حتى 3 حشوات (كرسبي، إستربس، كوردن بلو، شاورما، برجر) مع الجبن
            والصوصات بسعر محسوب فورًا.
          </p>
        </div>

        <OpenCrepeBuilderButton label="افتح مصمم الكريب الآن" />
      </div>

      {/* Sticky Category Jump Strip */}
      <div
        ref={stickyBarRef}
        className="sticky top-14 lg:top-16 z-30 -mx-3.5 px-3.5 sm:mx-0 sm:px-0 py-2.5 mt-3 bg-[#FFF3D6]/95 backdrop-blur-md border-b border-[#0D0D0D]/12"
      >
        <div
          ref={pillsRef}
          onTouchStart={() => {
            isStripTouchingRef.current = true;
            if (stripTouchTimerRef.current)
              clearTimeout(stripTouchTimerRef.current);
          }}
          onTouchEnd={() => {
            if (stripTouchTimerRef.current)
              clearTimeout(stripTouchTimerRef.current);
            stripTouchTimerRef.current = setTimeout(() => {
              isStripTouchingRef.current = false;
            }, 400);
          }}
          className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5"
        >
          {visibleCats.map((c) => {
            const active = activeCat === c.id;
            return (
              <button
                key={c.id}
                type="button"
                data-cat={c.id}
                onClick={() => jump(c.id)}
                className={`shrink-0 rounded-full px-3.5 py-2 text-xs sm:text-sm font-black inline-flex items-center gap-2 border transition cursor-pointer ${
                  active
                    ? "bg-[#0D0D0D] text-[#FFC21A] border-[#0D0D0D] shadow-sm"
                    : "bg-white text-[#0D0D0D]/85 border-[#0D0D0D]/12 hover:border-[#FFC21A]"
                }`}
              >
                <span>{c.nameAr}</span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-black tabular-nums ${
                    active
                      ? "bg-[#FFC21A] text-[#0D0D0D]"
                      : "bg-[#FFF3D6] text-[#0D0D0D]"
                  }`}
                >
                  {catCounts[c.id] || 0}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Menu Sections */}
      <div className="mt-6">
        {visibleCats.length === 0 ? (
          <div className="rounded-[28px] bg-white border border-[#0D0D0D]/14 p-12 text-center">
            <h3 className="text-lg font-black text-[#0D0D0D]">
              لا توجد أصناف مطابقة لبحثك
            </h3>
            <p className="text-xs sm:text-sm text-[#0D0D0D]/65 mt-1 font-semibold">
              جرّب كلمة بحث أخرى أو اعرض كل أقسام منيو ميكس كريب وبيتزا
            </p>
            <button
              type="button"
              onClick={() => {
                setQ("");
                setFilter("all");
              }}
              className="btn btn-primary mt-4 text-xs"
            >
              عرض كل المنيو
            </button>
          </div>
        ) : (
          <MenuChapters
            visibleCats={visibleCats}
            filtered={filtered}
            view={view}
            setSectionRef={setSectionRef}
          />
        )}
      </div>
    </div>
  );
}
