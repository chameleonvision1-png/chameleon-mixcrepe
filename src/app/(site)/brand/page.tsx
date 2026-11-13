import type { Metadata } from "next";
import Link from "next/link";
import OpenCrepeBuilderButton from "@/components/OpenCrepeBuilderButton";
import {
  CrepeConeIcon,
  DrinkCupIcon,
  OfferTagIcon,
  PaletteIcon,
  PinIcon,
  PizzaSliceIcon,
  ScooterIcon,
  StarIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "الهوية البصرية الكاملة — GOLDEN STREET FOOD | MIX Crepe & Pizza",
  description:
    "دليل الهوية البصرية الكامل لمطعم ميكس كريب وبيتزا (MIX Crepe & Pizza): نظام الشعارات الستة، قاعدة الألوان 60/25/15، الخطوط، الأنماط والأيقونات، التغليف وواجهة المحل، وقوالب السوشيال ميديا.",
};

const LOGOS = [
  {
    name: "الختم الكامل (Full Seal)",
    desc: "الختم الدائري الرسمي بالتفاصيل الذهبية والخلفيات الداكنة والتغليف المميز.",
    src: "/logo-seal.webp",
    dark: true,
    rule: "المقاس الأدنى: 48px • التغليف واللافتات الخارجية",
  },
  {
    name: "الأيقونة الأساسية (Primary Emblem)",
    desc: "الشارة الدائرية الصافية لشعار التطبيق والباركود وصور الحسابات الرسمية.",
    src: "/logo-emblem.webp",
    dark: true,
    rule: "المقاس الأدنى: 36px • السوشيال ميديا والتطبيق",
  },
  {
    name: "القفل الأفقي الداكن (Dark Lockup)",
    desc: "الاستخدام القياسي على الخلفيات الفاتحة والكريمية مثل شريط المنيو العلوي.",
    src: "/logo-horizontal.webp",
    dark: false,
    rule: "العرض الأدنى: 120px • الهيدر والمطبوعات الفاتحة",
  },
  {
    name: "القفل الأفقي الفاتح (Light Lockup)",
    desc: "النسخة البيضاء والذهبية المصممة خصيصًا للخلفيات السوداء والفحمية.",
    src: "/logo-horizontal-light.webp",
    dark: true,
    rule: "العرض الأدنى: 120px • اللوحات المضيئة والفوتر الداكن",
  },
  {
    name: "العلامة الرمزية فقط (Icon Only)",
    desc: "رمز الكريب والبيتزا المجرّد بدون نص — مثالي للطباعة الصغيرة والأختام.",
    src: "/logo-icon-only.webp",
    dark: false,
    rule: "مساحة أمان 15% من القطر في كل الاتجاهات",
  },
  {
    name: "الختم أحادي اللون والذهبي المعكوس",
    desc: "نسخة التباين العالي للأكياس الحرارية والأكياس الكرافت والكوب.",
    src: "/logo-mono.webp",
    dark: false,
    rule: "أقصى تباين بالطباعة الحبر الواحد",
  },
];

const COLORS = [
  {
    hex: "#0D0D0D",
    name: "Charcoal Black",
    ar: "الأسود الفحمي",
    ratio: "60%",
    role: "الأساس الرئيسي والخلفيات الجريئة والنصوص القيادية",
    textClass: "text-[#FFC21A]",
  },
  {
    hex: "#FFC21A",
    name: "MIX Yellow",
    ar: "الأصفر الميكسي",
    ratio: "25%",
    role: "لون الطاقة والأزرار الأساسية والملصقات البارزة",
    textClass: "text-[#0D0D0D]",
  },
  {
    hex: "#F59E0B",
    name: "Warm Orange",
    ar: "البرتقالي الدافئ",
    ratio: "Accent",
    role: "درجة التحميص الذهبي وتدرجات الجبنة السايحة",
    textClass: "text-[#0D0D0D]",
  },
  {
    hex: "#FFF3D6",
    name: "Cream Beige",
    ar: "البيج الكريمي",
    ratio: "15%",
    role: "مساحات القراءة المريحة وخلفيات المنيو وبطاقات الأصناف",
    textClass: "text-[#0D0D0D]",
  },
];

const VECTOR_ICONS = [
  { label: "بيتزا إيطالي", en: "Italian Pizza", Icon: PizzaSliceIcon },
  { label: "كريب صاج", en: "Crepe Cone", Icon: CrepeConeIcon },
  { label: "مشروبات", en: "Cold Drinks", Icon: DrinkCupIcon },
  { label: "عروض يومية", en: "Hot Offers", Icon: OfferTagIcon },
  { label: "مول 8 بدر", en: "Branch Pin", Icon: PinIcon },
  { label: "توصيل سريع", en: "Express Delivery", Icon: ScooterIcon },
];

export default function BrandPage() {
  return (
    <div className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10">
      {/* 1. Hero Banner */}
      <section className="rounded-[32px] sm:rounded-[40px] bg-[#0D0D0D] mix-pattern-dark text-white border-2 border-[#FFC21A]/40 p-6 sm:p-10 lg:p-12 shadow-2xl grid lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 text-center lg:text-right space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#FFC21A] text-[#0D0D0D] px-4 py-1 text-xs font-en-display font-black tracking-wide">
            <PaletteIcon className="w-4 h-4 shrink-0" />
            <span>GOLDEN STREET FOOD • BRAND IDENTITY SYSTEM</span>
          </span>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            نظام الهوية البصرية لـ{" "}
            <span className="text-[#FFC21A]">MIX Crepe & Pizza</span>
          </h1>

          <p className="text-xs sm:text-sm lg:text-base font-bold text-white/80 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            من المطبخ الإيطالي وأصل الكريب المقرمش في مدينة بدر — صُمّمت
            الهوية بالكامل على لوحة ألوان فحمية وذهبية صريحة لتجمع بين طاقة
            أكل الشارع الفاخر ووضوح التجربة الرقمية.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-2">
            <Link
              href="/menu"
              className="rounded-full bg-[#FFC21A] hover:bg-[#F59E0B] text-[#0D0D0D] px-6 py-3 text-xs sm:text-sm font-black transition"
            >
              شوف المنيو التفاعلي
            </Link>
            <OpenCrepeBuilderButton
              label="جرّب مكسها على مزاجك"
              className="rounded-full bg-white/10 hover:bg-white/20 text-white border border-[#FFC21A]/45 px-5 py-3 text-xs sm:text-sm font-black inline-flex items-center gap-2 transition cursor-pointer"
              iconClassName="w-4 h-4 text-[#FFC21A]"
            />
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center">
          <div className="rounded-[28px] bg-[#171717] border-2 border-[#FFC21A] p-4 sm:p-5 shadow-2xl max-w-sm w-full text-center space-y-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-seal.webp"
              alt="شعار الختم الرسمي MIX Crepe & Pizza"
              className="w-44 h-44 sm:w-52 sm:h-52 mx-auto object-contain"
            />
            <div className="font-en-display text-xs font-black tracking-[0.2em] text-[#FFC21A]">
              MIX CREPE & PIZZA • BADR CITY
            </div>
          </div>
        </div>
      </section>

      {/* 2. 6-Logo System */}
      <section className="space-y-5">
        <div className="text-center sm:text-right">
          <span className="inline-block rounded-full bg-[#0D0D0D] text-[#FFC21A] px-3.5 py-1 text-xs font-black mb-2">
            01 • نظام الشعارات الستة
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-black text-[#0D0D0D]">
            تشكيلة الشعارات وقواعد الاستخدام
          </h2>
          <p className="text-xs sm:text-sm font-bold text-[#0D0D0D]/68 mt-1">
            ست نسخ متناسقة تضمن وضوح العلامة على الواجهات المضيئة، علب البيتزا،
            أكواب الكريب، وشاشات الموبايل.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LOGOS.map((logo) => (
            <div
              key={logo.name}
              className="rounded-[26px] bg-white border border-[#0D0D0D]/14 overflow-hidden flex flex-col justify-between shadow-xs"
            >
              <div
                className={`h-48 p-6 flex items-center justify-center ${
                  logo.dark ? "bg-[#0D0D0D] mix-pattern-dark" : "bg-[#FFF3D6]"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="max-h-32 w-auto object-contain"
                />
              </div>
              <div className="p-4 sm:p-5 text-right space-y-1.5">
                <h3 className="font-display text-base font-black text-[#0D0D0D]">
                  {logo.name}
                </h3>
                <p className="text-xs font-semibold text-[#0D0D0D]/72 leading-relaxed">
                  {logo.desc}
                </p>
                <div className="pt-2 border-t border-[#0D0D0D]/10 text-[11px] font-extrabold text-[#F59E0B]">
                  {logo.rule}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Strict 60 / 25 / 15 Color Palette */}
      <section className="space-y-5">
        <div className="text-center sm:text-right">
          <span className="inline-block rounded-full bg-[#FFC21A] text-[#0D0D0D] px-3.5 py-1 text-xs font-black mb-2">
            02 • قاعدة الألوان 60 / 25 / 15
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-black text-[#0D0D0D]">
            لوحة الألوان المعتمدة (4 ألوان صارمة فقط)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {COLORS.map((c) => (
            <div
              key={c.hex}
              className="rounded-[26px] bg-white border border-[#0D0D0D]/14 overflow-hidden shadow-xs"
            >
              <div
                style={{ backgroundColor: c.hex }}
                className={`h-32 p-4 flex flex-col justify-between border-b border-[#0D0D0D]/10 ${c.textClass}`}
              >
                <span className="self-start rounded-full bg-black/20 backdrop-blur-xs px-3 py-0.5 text-[11px] font-en font-black text-white">
                  {c.ratio}
                </span>
                <span className="font-en-display text-xl font-black tracking-wide" dir="ltr">
                  {c.hex}
                </span>
              </div>
              <div className="p-4 text-right space-y-1">
                <div className="font-en font-black text-sm text-[#0D0D0D]">
                  {c.name}
                </div>
                <div className="text-xs font-black text-[#F59E0B]">{c.ar}</div>
                <p className="text-xs font-semibold text-[#0D0D0D]/70 leading-relaxed pt-1">
                  {c.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Typography & Pattern/Iconography */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Typography Specimens */}
        <div className="lg:col-span-6 rounded-[28px] bg-white border border-[#0D0D0D]/14 p-5 sm:p-7 space-y-4">
          <span className="inline-block rounded-full bg-[#0D0D0D] text-[#FFC21A] px-3 py-1 text-xs font-black">
            03 • نظام الخطوط (Typography)
          </span>
          <h3 className="font-display text-2xl font-black text-[#0D0D0D]">
            ثنائية الخط العربي والإنجليزي
          </h3>

          <div className="rounded-2xl bg-[#FFF3D6] border border-[#0D0D0D]/12 p-4 space-y-1.5">
            <div className="text-[11px] font-black text-[#F59E0B]">
              العناوين العربية (Display) — Alexandria & Cairo
            </div>
            <div className="font-display text-2xl font-black text-[#0D0D0D]">
              ميكس كريب وبيتزا • الطعم اللي يحكي حكايته
            </div>
          </div>

          <div
            dir="ltr"
            className="rounded-2xl bg-[#0D0D0D] text-white p-4 space-y-1.5"
          >
            <div className="text-[11px] font-en font-black text-[#FFC21A]">
              English Display & Pricing — Poppins & Montserrat
            </div>
            <div className="font-en-display text-2xl font-black tracking-tight">
              GOLDEN STREET FOOD • 180 EGP
            </div>
          </div>
        </div>

        {/* Pattern & Vector Icon Set */}
        <div className="lg:col-span-6 rounded-[28px] bg-[#0D0D0D] mix-pattern-dark text-white border-2 border-[#FFC21A]/35 p-5 sm:p-7 space-y-4">
          <span className="inline-block rounded-full bg-[#FFC21A] text-[#0D0D0D] px-3 py-1 text-xs font-black">
            04 • النمط الهندسي ومجموعة الأيقونات (2px Uniform Stroke)
          </span>
          <h3 className="font-display text-2xl font-black text-white">
            أيقونات المنيو ولافتات التوجيه
          </h3>

          <div className="grid grid-cols-3 gap-2.5">
            {VECTOR_ICONS.map(({ label, en, Icon }) => (
              <div
                key={label}
                className="rounded-2xl bg-[#FFF3D6] text-[#0D0D0D] p-3 text-center flex flex-col items-center justify-center gap-1.5"
              >
                <Icon className="w-6 h-6 text-[#0D0D0D]" />
                <div className="text-xs font-black">{label}</div>
                <div className="text-[10px] font-en font-bold text-[#0D0D0D]/60">
                  {en}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Real-World Applications Gallery */}
      <section className="space-y-5">
        <div className="text-center sm:text-right">
          <span className="inline-block rounded-full bg-[#0D0D0D] text-[#FFC21A] px-3.5 py-1 text-xs font-black mb-2">
            05 • التطبيقات الواقعية والتغليف
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-black text-[#0D0D0D]">
            واجهة الفرع، التغليف الكامل، والزي الرسمي
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="rounded-[26px] bg-white border border-[#0D0D0D]/14 overflow-hidden shadow-xs">
            <div className="h-56 bg-[#0D0D0D] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/brand/storefront-signage.webp"
                alt="تصميم واجهة ولافتات فرع MIX Crepe & Pizza"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 text-right">
              <h3 className="font-display text-base font-black text-[#0D0D0D]">
                واجهة الفرع واللافتات المضيئة
              </h3>
              <p className="text-xs font-semibold text-[#0D0D0D]/70 mt-1">
                تندة صفراء بارزة مع حروف مضيئة باللون الأبيض والذهبي على واجهة
                سوداء مطفية.
              </p>
            </div>
          </div>

          <div className="rounded-[26px] bg-white border border-[#0D0D0D]/14 overflow-hidden shadow-xs">
            <div className="h-56 bg-[#FFF3D6] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/brand/packaging-lineup.webp"
                alt="تشكيلة تغليف علب البيتزا وأقماع الكريب وأكواب المشروبات"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 text-right">
              <h3 className="font-display text-base font-black text-[#0D0D0D]">
                خط التغليف الكامل (Boxes & Cones)
              </h3>
              <p className="text-xs font-semibold text-[#0D0D0D]/70 mt-1">
                علب البيتزا السوداء بنمط MIX، مخروط الكريب الورقي، أكواب
                المشروبات، وأكياس الطلبات.
              </p>
            </div>
          </div>

          <div className="rounded-[26px] bg-white border border-[#0D0D0D]/14 overflow-hidden shadow-xs">
            <div className="h-56 bg-[#FFF3D6] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/brand/brand-applications.webp"
                alt="الزي الرسمي لفريق العمل ولافتة الشارع"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 text-right">
              <h3 className="font-display text-base font-black text-[#0D0D0D]">
                الزي الرسمي وأيقونة التطبيق واللافتة الجانبية
              </h3>
              <p className="text-xs font-semibold text-[#0D0D0D]/70 mt-1">
                تيشيرت بولو أسود بياقة صفراء، مريلة الشيف، كاب التوصيل، واللافتة
                الدائرية.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. 7 Social Media Campaign Templates */}
      <section className="space-y-5">
        <div className="text-center sm:text-right">
          <span className="inline-block rounded-full bg-[#FFC21A] text-[#0D0D0D] px-3.5 py-1 text-xs font-black mb-2">
            06 • قوالب السوشيال ميديا الجاهزة (7 تصاميم)
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-black text-[#0D0D0D]">
            حملات انستجرام وفيسبوك وتيك توك بصيغة <span className="font-en">1:1</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Template 1 */}
          <div className="aspect-square rounded-[28px] bg-[#0D0D0D] mix-pattern-dark text-white p-5 flex flex-col justify-between border-2 border-[#FFC21A] relative overflow-hidden">
            <div className="flex items-center justify-between">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-emblem.webp" alt="MIX" className="w-10 h-10 object-contain" />
              <span className="rounded-full bg-[#FFC21A] text-[#0D0D0D] px-2.5 py-0.5 text-[10px] font-black">
                01 • إطلاق
              </span>
            </div>
            <div className="flex-1 flex items-center justify-center my-1 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero/hero-crepe-hand.webp"
                alt="كريب المدمر"
                className="h-36 object-contain"
              />
            </div>
            <div className="text-center">
              <div className="font-display text-base font-black text-[#FFC21A]">
                الكريب والبيتزا على أصولهم
              </div>
              <div className="text-[11px] font-bold text-white/75">
                مول 8 • مدينة بدر • 01098923225
              </div>
            </div>
          </div>

          {/* Template 2 */}
          <div className="aspect-square rounded-[28px] bg-[#FFC21A] text-[#0D0D0D] p-5 flex flex-col justify-between border-2 border-[#0D0D0D]">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-[#0D0D0D] text-[#FFC21A] px-2.5 py-0.5 text-[10px] font-black">
                02 • مكسها على مزاجك
              </span>
              <CrepeConeIcon className="w-5 h-5" />
            </div>
            <div className="space-y-2 text-right">
              <h4 className="font-display text-2xl font-black leading-tight">
                اختار الحشوة وسيب الباقي علينا
              </h4>
              <p className="text-xs font-extrabold text-[#0D0D0D]/80">
                كرسبي + إستربس + تركي مدخن + صوص شيدر ورانش سايح.
              </p>
            </div>
            <div className="rounded-full bg-[#0D0D0D] text-[#FFC21A] py-2 px-4 text-center text-xs font-en font-black">
              mixcrepe.chameleon.vision
            </div>
          </div>

          {/* Template 3 */}
          <div className="aspect-square rounded-[28px] bg-[#0D0D0D] text-white p-5 flex flex-col justify-between border-2 border-[#FFC21A]">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-[#F59E0B] text-[#0D0D0D] px-2.5 py-0.5 text-[10px] font-black">
                03 • عرض التوفير
              </span>
              <OfferTagIcon className="w-5 h-5 text-[#FFC21A]" />
            </div>
            <div className="text-center space-y-1">
              <div className="text-xs font-bold text-white/60 line-through font-en">
                250 EGP
              </div>
              <div className="font-en-display text-5xl font-black text-[#FFC21A]">
                180 <span className="text-lg">ج.م</span>
              </div>
              <div className="font-display text-sm font-black">
                كومبو كريب + بطاطس بالجبن + بيبسي
              </div>
            </div>
            <div className="text-center text-[11px] font-bold text-[#FFF3D6]/80">
              عرض متاح أونلاين وفي الفرع
            </div>
          </div>

          {/* Template 4 */}
          <div className="aspect-square rounded-[28px] bg-white border-2 border-[#0D0D0D]/15 overflow-hidden relative flex flex-col justify-end p-5 text-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/hero/hero-pizza-supreme.webp"
              alt="سوبر سوبريم"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/40 to-transparent" />
            <div className="relative z-10 space-y-1">
              <span className="inline-block rounded-full bg-[#FFC21A] text-[#0D0D0D] px-2.5 py-0.5 text-[10px] font-black">
                04 • البيتزا الإيطالي
              </span>
              <div className="font-display text-lg font-black">
                بيتزا سوبر سوبريم
              </div>
              <div className="text-xs font-bold text-[#FFC21A]">
                وسط M • كبير L — طازجة من الفرن
              </div>
            </div>
          </div>

          {/* Template 5 */}
          <div className="aspect-square rounded-[28px] bg-[#FFF3D6] border-2 border-[#0D0D0D]/15 overflow-hidden relative flex flex-col justify-end p-5 text-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/hero/hero-sweet-crepe.webp"
              alt="نوتيلا وفراولة"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/35 to-transparent" />
            <div className="relative z-10 space-y-1">
              <span className="inline-block rounded-full bg-[#FFC21A] text-[#0D0D0D] px-2.5 py-0.5 text-[10px] font-black">
                05 • ركن الحلو والوافل
              </span>
              <div className="font-display text-lg font-black">
                كريب نوتيلا وفراولة طازجة
              </div>
              <div className="text-xs font-bold text-[#FFC21A]">
                90 ج.م • غرقانة نوتيلا أصلية
              </div>
            </div>
          </div>

          {/* Template 6 */}
          <div className="aspect-square rounded-[28px] bg-[#0D0D0D] mix-pattern-dark text-white p-5 flex flex-col justify-between border-2 border-[#FFC21A]/45">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-[#FFC21A] text-[#0D0D0D] px-2.5 py-0.5 text-[10px] font-black">
                06 • ثقة العملاء
              </span>
              <div className="flex gap-0.5 text-[#FFC21A]">
                <StarIcon className="w-3.5 h-3.5 fill-[#FFC21A]" />
                <StarIcon className="w-3.5 h-3.5 fill-[#FFC21A]" />
                <StarIcon className="w-3.5 h-3.5 fill-[#FFC21A]" />
              </div>
            </div>
            <div className="text-center space-y-1">
              <div className="font-en-display text-4xl font-black text-[#FFC21A]">
                100%
              </div>
              <div className="font-display text-base font-black">
                نسبة التوصية على فيسبوك
              </div>
              <div className="text-xs font-bold text-white/75">
                +61,000 متابع • 83 مراجعة من أهل بدر
              </div>
            </div>
            <div className="rounded-xl bg-white/10 p-2 text-center text-[11px] font-bold">
              شكرًا لأهالي مدينة بدر والجامعة الروسية
            </div>
          </div>

          {/* Template 7 */}
          <div className="sm:col-span-2 aspect-[2/1] sm:aspect-auto rounded-[28px] bg-[#FFC21A] text-[#0D0D0D] p-5 sm:p-6 flex flex-col justify-between border-2 border-[#0D0D0D]">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-[#0D0D0D] text-[#FFC21A] px-3 py-0.5 text-[10px] font-black">
                07 • التوصيل داخل مدينة بدر
              </span>
              <ScooterIcon className="w-6 h-6" />
            </div>
            <div className="space-y-1.5 text-right my-2">
              <h4 className="font-display text-xl sm:text-2xl font-black">
                من مول 8 — شارع الجامعة الروسية لباب بيتك
              </h4>
              <p className="text-xs font-extrabold text-[#0D0D0D]/80">
                تغطية فورية لكل أحياء ومجاورات مدينة بدر • خدمة تيك أواي وجلسات
                خارجية واستلام من أمام المحل.
              </p>
            </div>
            <div
              dir="ltr"
              className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#0D0D0D]/15 text-xs font-en font-black"
            >
              <span>01098923225 / 01125119375</span>
              <span>@mix_crepe_pizza</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
