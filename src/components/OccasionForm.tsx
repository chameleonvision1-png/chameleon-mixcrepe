"use client";

import { useState } from "react";
import type { Branch } from "@/lib/types";
import { occasionTypes } from "@/lib/format";
import { useStore } from "./store";
import { CheckIcon, WhatsAppIcon } from "./icons";

export default function OccasionForm({ branches }: { branches: Branch[] }) {
  const { branch } = useStore();
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");
  const [wa, setWa] = useState("");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setState("loading");
    const res = await fetch("/api/occasions", {
      method: "POST",
      body: new FormData(e.currentTarget),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
      setState("idle");
      return;
    }
    setWa(data.whatsappUrl);
    setState("done");
  };

  if (state === "done") {
    return (
      <div className="rounded-[28px] bg-white border-2 border-[#FFC21A] p-6 text-center lg:sticky lg:top-24 shadow-lg">
        <div className="w-14 h-14 mx-auto rounded-full bg-[#0D0D0D] text-[#FFC21A] grid place-items-center">
          <CheckIcon className="w-7 h-7" />
        </div>
        <h2 className="font-display text-xl font-black text-[#0D0D0D] mt-3">
          تم تسجيل طلب التجمع والبوكسات في MIX Crepe & Pizza
        </h2>
        <p className="text-[#0D0D0D]/72 mt-1.5 text-sm font-semibold">
          سنتواصل معك فورًا لتأكيد الأصناف والكميات وموعد التسليم. ولتسريع
          التنفيذ أرسل التفاصيل مباشرة عبر واتساب الفرع:
        </p>
        <a
          href={wa}
          target="_blank"
          rel="noreferrer"
          className="btn bg-[#FFC21A] hover:bg-[#F59E0B] text-[#0D0D0D] w-full mt-4"
        >
          <WhatsAppIcon /> إرسال التفاصيل عبر واتساب
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-[28px] bg-white border border-[#0D0D0D]/16 p-6 space-y-4 lg:sticky lg:top-24 shadow-[0_16px_38px_-16px_rgba(13,13,13,0.16)]"
    >
      <div>
        <span className="inline-block rounded-full bg-[#FFC21A] text-[#0D0D0D] px-3 py-1 text-xs font-black mb-2">
          تجمعات وبوكسات MIX • مدينة بدر
        </span>
        <h2 className="font-display text-xl font-black text-[#0D0D0D]">
          احجز بوكسات الشلة أو تجمعات الجامعة والمناسبات
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="label" htmlFor="o-name">
            الاسم *
          </label>
          <input id="o-name" name="name" required className="input" />
        </div>
        <div>
          <label className="label" htmlFor="o-phone">
            الموبايل *
          </label>
          <input
            id="o-phone"
            name="phone"
            required
            dir="ltr"
            inputMode="tel"
            className="input text-right"
            placeholder="01xxxxxxxxx"
          />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="o-type">
          نوع الطلب أو المناسبة *
        </label>
        <select id="o-type" name="type" className="input" required>
          {occasionTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="label" htmlFor="o-q">
            عدد الأفراد أو الكمية التقريبية
          </label>
          <input
            id="o-q"
            name="quantity"
            className="input"
            placeholder="مثال: 15 فرد / 10 كريبات + 5 بيتزا وسط + وافل"
          />
        </div>
        <div>
          <label className="label" htmlFor="o-d">
            التاريخ المطلوب *
          </label>
          <input id="o-d" name="date" type="date" required className="input" />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="o-b">
          الفرع
        </label>
        <select
          id="o-b"
          name="branchId"
          className="input"
          defaultValue={branch?.id}
        >
          {branches.filter((b) => b.isActive).map((b) => (
            <option key={b.id} value={b.id}>
              {b.name} — {b.city}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="label" htmlFor="o-det">
          تفاصيل الأصناف المطلوبة وعنوان التوصيل
        </label>
        <textarea
          id="o-det"
          name="details"
          rows={3}
          className="input"
          placeholder="اكتب الأصناف المطلوبة (بيتزا إيطالي، كريب مكس، وافل نوتيلا، مشروبات) وموعد التسليم…"
        />
      </div>

      {error && (
        <p className="text-sm font-bold text-[#0D0D0D] bg-[#FFC21A]/35 rounded-xl p-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "loading"}
        className="btn btn-primary w-full cursor-pointer"
      >
        {state === "loading" ? "جاري الإرسال…" : "إرسال الطلب وتأكيده عبر واتساب"}
      </button>
    </form>
  );
}
