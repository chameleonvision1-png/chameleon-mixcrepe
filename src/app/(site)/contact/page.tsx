import type { Metadata } from "next";
import { publicDB } from "@/lib/db";
import {
  ExternalLinkIcon,
  FacebookIcon,
  InstagramIcon,
  PhoneIcon,
  PinIcon,
  TalabatIcon,
  TikTokIcon,
  WhatsAppIcon,
} from "@/components/icons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description:
    "تواصل مع مطعم ميكس كريب وبيتزا (MIX Crepe & Pizza) بمدينة بدر — أرقام الطلبات والتوصيل 01098923225 و01125119375، واتساب، فيسبوك، انستجرام، وطلبات.",
};

export default async function ContactPage() {
  const db = await publicDB();
  const phones = db.settings.orderPhones?.length
    ? db.settings.orderPhones
    : ["01098923225", "01125119375"];
  const talabatUrl =
    db.settings.talabatUrl ||
    db.settings.talabat ||
    "https://www.talabat.com/ar/egypt/restaurant/684423/mix-crepe-and-pizza?aid=9534";

  return (
    <div className="mx-auto max-w-5xl px-3.5 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6">
      <div className="rounded-[30px] bg-[#0D0D0D] mix-pattern-dark text-white border-2 border-[#FFC21A]/35 p-6 sm:p-10 text-center space-y-3 shadow-xl">
        <span className="inline-block rounded-full bg-[#FFC21A] text-[#0D0D0D] px-4 py-1 text-xs font-black">
          الطلبات والشكاوى والمقترحات
        </span>
        <h1 className="font-display text-2xl sm:text-4xl font-black text-white">
          تواصل مع ميكس كريب وبيتزا — مدينة بدر
        </h1>
        <p className="text-xs sm:text-sm font-semibold text-white/80 max-w-xl mx-auto">
          فريقنا متواجد لخدمتك على مدار الساعة للطلبات الفورية والتوصيل السريع
          في مدينة بدر.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Phones & WhatsApp Card */}
        <div className="rounded-[28px] bg-white border border-[#0D0D0D]/14 p-6 space-y-4 shadow-xs">
          <h2 className="font-display text-lg font-black text-[#0D0D0D]">
            خطوط الطلبات السريعة والواتساب
          </h2>

          <div className="space-y-2.5" dir="ltr">
            {phones.map((ph, idx) => (
              <a
                key={ph}
                href={`tel:${ph}`}
                className={`w-full rounded-2xl py-3 px-4 flex items-center justify-between text-sm font-en font-black border transition ${
                  idx === 0
                    ? "bg-[#0D0D0D] text-[#FFC21A] border-[#0D0D0D]"
                    : "bg-[#FFF3D6] hover:bg-[#FFC21A] text-[#0D0D0D] border-[#0D0D0D]/15"
                }`}
              >
                <span className="flex items-center gap-2">
                  <PhoneIcon className="w-4 h-4 shrink-0" />
                  <span>{ph}</span>
                </span>
                <span dir="rtl" className="text-xs font-bold">
                  {idx === 0 ? "الخط الأساسي" : "خط إضافي"}
                </span>
              </a>
            ))}
          </div>

          <a
            href={`https://wa.me/2${phones[0] || "01098923225"}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-full bg-[#FFC21A] hover:bg-[#F59E0B] text-[#0D0D0D] py-3.5 px-5 flex items-center justify-center gap-2 text-sm font-black transition shadow-sm"
          >
            <WhatsAppIcon className="w-5 h-5" />
            <span>راسلنا على واتساب الآن</span>
          </a>
        </div>

        {/* Location & Official Channels */}
        <div className="rounded-[28px] bg-white border border-[#0D0D0D]/14 p-6 space-y-4 shadow-xs">
          <h2 className="font-display text-lg font-black text-[#0D0D0D]">
            العنوان والحسابات الرسمية
          </h2>

          <a
            href="https://maps.app.goo.gl/XC9GDwXD7cYGfKtF6"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-[#FFF3D6] border border-[#0D0D0D]/14 p-4 flex items-start justify-between gap-3 hover:border-[#FFC21A] transition"
          >
            <div className="flex items-start gap-2.5">
              <PinIcon className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
              <div className="text-xs font-bold text-[#0D0D0D] leading-relaxed">
                مدينة بدر — شارع الجامعة الروسية — مول 8 — بجوار صيدلية العزبي
                وبنك QNB الأهلي (محافظة القاهرة 11829)
              </div>
            </div>
            <ExternalLinkIcon className="w-4 h-4 text-[#0D0D0D] shrink-0" />
          </a>

          <div className="grid grid-cols-2 gap-2.5">
            <a
              href={db.settings.facebook || "https://www.facebook.com/mixcrepe22"}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-[#FFF3D6] hover:bg-[#0D0D0D] text-[#0D0D0D] hover:text-[#FFC21A] border border-[#0D0D0D]/14 p-3 flex items-center justify-center gap-2 text-xs font-black transition"
            >
              <FacebookIcon className="w-4 h-4 shrink-0" />
              <span>Facebook</span>
            </a>

            <a
              href={
                db.settings.instagram ||
                "https://www.instagram.com/mix_crepe_pizza/"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-[#FFF3D6] hover:bg-[#0D0D0D] text-[#0D0D0D] hover:text-[#FFC21A] border border-[#0D0D0D]/14 p-3 flex items-center justify-center gap-2 text-xs font-black transition"
            >
              <InstagramIcon className="w-4 h-4 shrink-0" />
              <span>Instagram</span>
            </a>

            <a
              href={
                db.settings.tiktok || "https://www.tiktok.com/@mix_crepe_pizza"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-[#FFF3D6] hover:bg-[#0D0D0D] text-[#0D0D0D] hover:text-[#FFC21A] border border-[#0D0D0D]/14 p-3 flex items-center justify-center gap-2 text-xs font-black transition"
            >
              <TikTokIcon className="w-4 h-4 shrink-0" />
              <span>TikTok</span>
            </a>

            <a
              href={talabatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-[#FFF3D6] hover:bg-[#0D0D0D] text-[#0D0D0D] hover:text-[#FFC21A] border border-[#0D0D0D]/14 p-3 flex items-center justify-center gap-2 text-xs font-black transition"
            >
              <TalabatIcon className="w-4 h-4 shrink-0" />
              <span>Talabat</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
