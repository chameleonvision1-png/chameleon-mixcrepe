"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useStore } from "./store";
import { formatPrice, paymentMethods } from "@/lib/format";
import { orderWhatsAppText, waLink } from "@/lib/whatsapp";
import OpenCrepeBuilderButton from "./OpenCrepeBuilderButton";
import {
  CartIcon,
  MinusIcon,
  PhoneIcon,
  PinIcon,
  PlusIcon,
  TalabatIcon,
  TrashIcon,
  WhatsAppIcon,
} from "./icons";

export default function CartClient({
  talabatUrl = "https://www.talabat.com/ar/egypt/restaurant/684423/mix-crepe-and-pizza?aid=9534",
}: {
  talabatUrl?: string;
}) {
  const {
    cart,
    subtotal,
    updateQty,
    removeLine,
    clearCart,
    branch,
    hydrated,
    openPicker,
  } = useStore();
  const router = useRouter();
  const [orderType, setOrderType] = useState<"delivery" | "pickup">("delivery");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    payment: paymentMethods[0],
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12 space-y-4">
        <div className="h-28 rounded-[28px] bg-white/75 animate-pulse border border-[#0D0D0D]/10" />
        <div className="h-64 rounded-[28px] bg-white/75 animate-pulse border border-[#0D0D0D]/10" />
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-14">
        <div className="rounded-[34px] bg-white border-2 border-[#0D0D0D]/14 p-8 sm:p-10 text-center shadow-[0_20px_50px_-24px_rgba(13,13,13,0.2)]">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#FFF3D6] border border-[#0D0D0D]/15 text-[#0D0D0D] grid place-items-center">
            <CartIcon className="w-8 h-8" />
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-black text-[#0D0D0D] mt-4">
            سلتك لسه فاضية!
          </h1>
          <p className="text-sm text-[#0D0D0D]/70 mt-2 font-semibold leading-relaxed">
            استكشف منيو MIX من البيتزا الإيطالي والكريبات العملاقة والوافل
            والفطائر الحلوة — أو صمّم كريبك على مزاجك.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            <Link href="/menu" className="btn btn-primary text-sm">
              تصفح المنيو واطلب الآن
            </Link>
            <OpenCrepeBuilderButton label="مكسها على مزاجك" />
            <Link
              href="/offers"
              className="btn bg-[#FFF3D6] border border-[#0D0D0D]/15 text-[#0D0D0D] text-sm"
            >
              شوف العروض
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const deliveryFee = orderType === "delivery" ? branch?.deliveryFee || 0 : 0;
  const total = subtotal + deliveryFee;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!branch) {
      setError("من فضلك اختر الفرع");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          branchId: branch.id,
          customerName: form.name,
          customerPhone: form.phone,
          orderType,
          address: orderType === "delivery" ? form.address : undefined,
          paymentMethod: form.payment,
          notes: form.notes,
          items: cart.map((l) => ({
            productId: l.productId,
            sizeLabel: l.sizeLabel,
            addons: l.addons.map((a) => a.label),
            note: l.note,
            qty: l.qty,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "حصل خطأ، جرّب تاني");
        setLoading(false);
        return;
      }
      const waUrl =
        data.whatsappUrl || waLink(branch.whatsapp, orderWhatsAppText(data.order, branch));
      clearCart();
      window.open(waUrl, "_blank", "noopener");
      router.push(`/order/${data.order.id}`);
    } catch {
      setError("مشكلة في الاتصال، جرّب تاني");
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-3.5 sm:px-6 lg:px-8 py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_420px] gap-6 items-start">
      {/* Cart Lines */}
      <div className="min-w-0 w-full space-y-3.5">
        <div className="rounded-[28px] bg-white border border-[#0D0D0D]/14 p-5 sm:p-6 shadow-xs text-center sm:text-right">
          <h1 className="font-display text-2xl sm:text-3xl font-black text-[#0D0D0D]">
            سلة طلباتك ({cart.reduce((n, l) => n + l.qty, 0)})
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-[#0D0D0D]/65 mt-1.5 leading-relaxed">
            راجع الأصناف والأحجام المختارة قبل إرسال الطلب إلى فرع مول 8 —
            مدينة بدر
          </p>
        </div>

        {cart.map((l) => (
          <div
            key={l.key}
            className="rounded-[24px] bg-white border border-[#0D0D0D]/14 p-3.5 sm:p-4 flex gap-3 sm:gap-3.5 shadow-xs min-w-0 w-full"
          >
            <div className="w-20 h-20 rounded-2xl bg-[#FFF3D6] border border-[#0D0D0D]/10 overflow-hidden shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={l.image}
                alt={l.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2 min-w-0">
                  <h3 className="font-display font-black text-sm sm:text-base text-[#0D0D0D] text-right leading-snug break-words">
                    {l.name}
                  </h3>
                  <button
                    type="button"
                    onClick={() => removeLine(l.key)}
                    className="w-7 h-7 rounded-full bg-[#FFF3D6] hover:bg-[#0D0D0D] text-[#0D0D0D]/70 hover:text-[#FFC21A] grid place-items-center shrink-0 transition cursor-pointer"
                    aria-label="حذف"
                  >
                    <TrashIcon className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-xs text-[#0D0D0D]/68 mt-0.5 font-semibold text-right break-words">
                  {l.sizeLabel && <span>{l.sizeLabel}</span>}
                  {l.addons.length > 0 && (
                    <span>
                      {" "}
                      • إضافات: {l.addons.map((a) => a.label).join("، ")}
                    </span>
                  )}
                  {l.note && (
                    <div className="text-[#F59E0B] mt-0.5">
                      ملاحظة: {l.note}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 mt-2.5">
                <div className="flex items-center gap-1 bg-[#FFF3D6] border border-[#0D0D0D]/14 rounded-full p-0.5">
                  <button
                    type="button"
                    onClick={() => updateQty(l.key, l.qty - 1)}
                    className="w-7 h-7 rounded-full bg-white hover:bg-[#FFC21A] text-[#0D0D0D] grid place-items-center cursor-pointer transition"
                    aria-label="تقليل"
                  >
                    <MinusIcon className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-6 text-center font-black text-sm tabular-nums">
                    {l.qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQty(l.key, l.qty + 1)}
                    className="w-7 h-7 rounded-full bg-white hover:bg-[#FFC21A] text-[#0D0D0D] grid place-items-center cursor-pointer transition"
                    aria-label="زيادة"
                  >
                    <PlusIcon className="w-3.5 h-3.5" />
                  </button>
                </div>

                <span className="inline-flex items-center rounded-full bg-[#0D0D0D] px-3 py-0.5 text-xs sm:text-sm font-black text-[#FFC21A] tabular-nums whitespace-nowrap">
                  {formatPrice(l.unitPrice * l.qty)}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Quick Restaurant Upsells — Symmetrical 2x2 Grid + Builder CTA */}
        <div className="rounded-[24px] p-4 sm:p-5 bg-white border border-[#0D0D0D]/14 min-w-0 w-full space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-black text-xs sm:text-sm text-[#0D0D0D]">
              تحب تزوّد بيتزا، بطاطس بالجبن، وافل نوتيلا أو مشروب؟
            </p>
            <OpenCrepeBuilderButton
              label="صمّم كريب مخصص"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#FFC21A] hover:bg-[#F59E0B] text-[#0D0D0D] px-3.5 py-1.5 text-xs font-black transition cursor-pointer"
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <Link
              href="/menu?cat=pizza"
              className="rounded-xl text-center text-xs font-extrabold bg-[#FFF3D6] hover:bg-[#0D0D0D] text-[#0D0D0D] hover:text-[#FFC21A] border border-[#0D0D0D]/14 px-2.5 py-2 truncate transition"
            >
              بيتزا إيطالي
            </Link>
            <Link
              href="/menu?cat=mix_crepe"
              className="rounded-xl text-center text-xs font-extrabold bg-[#FFF3D6] hover:bg-[#0D0D0D] text-[#0D0D0D] hover:text-[#FFC21A] border border-[#0D0D0D]/14 px-2.5 py-2 truncate transition"
            >
              ميكس كريب
            </Link>
            <Link
              href="/menu?cat=waffles"
              className="rounded-xl text-center text-xs font-extrabold bg-[#FFF3D6] hover:bg-[#0D0D0D] text-[#0D0D0D] hover:text-[#FFC21A] border border-[#0D0D0D]/14 px-2.5 py-2 truncate transition"
            >
              الوافل والحلو
            </Link>
            <Link
              href="/menu?cat=drinks"
              className="rounded-xl text-center text-xs font-extrabold bg-[#FFF3D6] hover:bg-[#0D0D0D] text-[#0D0D0D] hover:text-[#FFC21A] border border-[#0D0D0D]/14 px-2.5 py-2 truncate transition"
            >
              المشروبات
            </Link>
          </div>
        </div>
      </div>

      {/* Checkout Form Card */}
      <form
        onSubmit={submit}
        className="min-w-0 w-full rounded-[28px] bg-white border-2 border-[#0D0D0D]/16 p-4 sm:p-6 space-y-4 lg:sticky lg:top-20 shadow-[0_18px_42px_-18px_rgba(13,13,13,0.18)]"
      >
        <div className="flex items-center justify-between gap-2 border-b border-[#0D0D0D]/10 pb-3 min-w-0">
          <h2 className="font-display text-lg sm:text-xl font-black text-[#0D0D0D]">
            تأكيد بيانات الطلب
          </h2>
          <span className="shrink-0 rounded-full bg-[#FFC21A] text-[#0D0D0D] px-3 py-0.5 text-xs font-black">
            MIX Crepe & Pizza
          </span>
        </div>

        {/* Active Branch Selector */}
        {branch && (
          <div className="rounded-2xl bg-[#FFF3D6] border border-[#0D0D0D]/15 p-3 flex items-center justify-between gap-2 min-w-0">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 text-xs font-black text-[#0D0D0D] min-w-0">
                <PinIcon className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
                <span className="truncate">{branch.name}</span>
              </div>
              <div className="text-[11px] font-semibold text-[#0D0D0D]/68 mt-0.5 truncate">
                {branch.address}
              </div>
            </div>
            <button
              type="button"
              onClick={openPicker}
              className="shrink-0 rounded-full bg-white border border-[#0D0D0D]/20 px-3 py-1 text-[11px] font-black text-[#0D0D0D] hover:bg-[#0D0D0D] hover:text-[#FFC21A] transition cursor-pointer"
            >
              تفاصيل الفرع
            </button>
          </div>
        )}

        {/* Order Type Toggle */}
        <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-[#FFF3D6] border border-[#0D0D0D]/14">
          <button
            type="button"
            onClick={() => setOrderType("delivery")}
            className={`py-2.5 px-2 rounded-xl text-xs font-black transition cursor-pointer truncate ${
              orderType === "delivery"
                ? "bg-[#0D0D0D] text-[#FFC21A] shadow-xs"
                : "text-[#0D0D0D]/75 hover:text-[#0D0D0D]"
            }`}
          >
            توصيل دليفري
          </button>
          <button
            type="button"
            onClick={() => setOrderType("pickup")}
            className={`py-2.5 px-2 rounded-xl text-xs font-black transition cursor-pointer truncate ${
              orderType === "pickup"
                ? "bg-[#0D0D0D] text-[#FFC21A] shadow-xs"
                : "text-[#0D0D0D]/75 hover:text-[#0D0D0D]"
            }`}
          >
            استلام من مول 8
          </button>
        </div>

        <div>
          <label
            className="label text-xs font-extrabold text-[#0D0D0D] mb-1 block"
            htmlFor="c-name"
          >
            الاسم الكريم *
          </label>
          <input
            id="c-name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="اكتب اسمك الثلاثي أو الثنائي"
            className="input text-sm"
          />
        </div>

        <div>
          <label
            className="label text-xs font-extrabold text-[#0D0D0D] mb-1 block"
            htmlFor="c-phone"
          >
            رقم الموبايل للتأكيد *
          </label>
          <input
            id="c-phone"
            required
            dir="ltr"
            inputMode="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="01xxxxxxxxx"
            className="input text-right text-sm"
          />
        </div>

        {orderType === "delivery" && (
          <div>
            <label
              className="label text-xs font-extrabold text-[#0D0D0D] mb-1 block"
              htmlFor="c-addr"
            >
              العنوان التفصيلي في مدينة بدر *
            </label>
            <textarea
              id="c-addr"
              required
              rows={2}
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="الحي / المجاورة / الكمبوند / رقم العمارة والشقة وعلامة مميزة…"
              className="input text-sm"
            />
          </div>
        )}

        <div>
          <label
            className="label text-xs font-extrabold text-[#0D0D0D] mb-1 block"
            htmlFor="c-pay"
          >
            طريقة الدفع
          </label>
          <select
            id="c-pay"
            value={form.payment}
            onChange={(e) => setForm({ ...form, payment: e.target.value })}
            className="input text-sm min-w-0 max-w-full"
          >
            {paymentMethods.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            className="label text-xs font-extrabold text-[#0D0D0D] mb-1 block"
            htmlFor="c-notes"
          >
            ملاحظات إضافية للطلب (اختياري)
          </label>
          <input
            id="c-notes"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            placeholder="مثال: رن الجرس، كاتشب زيادة، تحميص إضافي…"
            className="input text-sm"
          />
        </div>

        {/* Totals */}
        <div className="rounded-2xl bg-[#FFF3D6] border border-[#0D0D0D]/14 p-3.5 space-y-1.5 text-sm">
          <div className="flex justify-between gap-2 font-bold text-[#0D0D0D]/75">
            <span>إجمالي الأصناف</span>
            <span className="tabular-nums whitespace-nowrap">
              {formatPrice(subtotal)}
            </span>
          </div>
          {orderType === "delivery" && (
            <div className="flex justify-between gap-2 text-xs font-semibold text-[#0D0D0D]/60">
              <span>خدمة التوصيل بمدينة بدر</span>
              <span>تُحدد حسب الحي</span>
            </div>
          )}
          <div className="pt-2 border-t border-[#0D0D0D]/14 flex justify-between gap-2 text-base font-black text-[#0D0D0D]">
            <span>الإجمالي</span>
            <span className="tabular-nums whitespace-nowrap">
              {formatPrice(total)}
            </span>
          </div>
        </div>

        {error && (
          <p className="text-xs font-bold text-[#0D0D0D] bg-[#FFC21A]/35 border border-[#0D0D0D]/20 rounded-xl p-3">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-[#0D0D0D] hover:bg-black text-[#FFC21A] font-black py-3.5 px-5 flex items-center justify-center gap-2 text-sm shadow-md transition cursor-pointer disabled:opacity-60"
        >
          <WhatsAppIcon className="w-5 h-5 text-[#FFC21A] shrink-0" />
          <span>
            {loading ? "جاري تسجيل الطلب…" : "تأكيد وإرسال الطلب عبر واتساب"}
          </span>
        </button>

        {/* Secondary Channels: Phone & Talabat */}
        <div className="pt-1 space-y-2">
          <p className="text-center text-[11px] font-bold text-[#0D0D0D]/60">
            أو اطلب عبر الهاتف أو تطبيق طلبات:
          </p>
          <div className="grid grid-cols-2 gap-2" dir="ltr">
            <a
              href="tel:01098923225"
              className="h-9 rounded-full bg-[#FFF3D6] hover:bg-[#FFC21A] border border-[#0D0D0D]/15 font-en text-xs text-[#0D0D0D] font-black inline-flex items-center justify-center gap-1.5 transition"
            >
              <PhoneIcon className="w-3 h-3 shrink-0" />
              <span>01098923225</span>
            </a>
            <a
              href="tel:01125119375"
              className="h-9 rounded-full bg-[#FFF3D6] hover:bg-[#FFC21A] border border-[#0D0D0D]/15 font-en text-xs text-[#0D0D0D] font-black inline-flex items-center justify-center gap-1.5 transition"
            >
              <PhoneIcon className="w-3 h-3 shrink-0" />
              <span>01125119375</span>
            </a>
          </div>
          <a
            href={talabatUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-9 rounded-full bg-white hover:bg-[#FFC21A] border border-[#0D0D0D]/15 text-xs text-[#0D0D0D] font-black inline-flex items-center justify-center gap-1.5 transition"
          >
            <TalabatIcon className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
            <span>اطلب من طلبات (Talabat)</span>
          </a>
        </div>
      </form>
    </div>
  );
}
