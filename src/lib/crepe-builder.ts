export interface CrepeOption {
  id: string;
  label: string;
  price: number;
  tag?: string;
}

export const CREPE_BASES: CrepeOption[] = [
  { id: "single", label: "كريب سنجل عادي", price: 65, tag: "لفّة كلاسيك" },
  { id: "double", label: "كريب دبل إكسترا", price: 85, tag: "حجم أكبر" },
  { id: "roll", label: "رول ميكس كريب مقطع", price: 95, tag: "6 قطع رول" },
];

export const CREPE_PROTEINS: CrepeOption[] = [
  { id: "crispy", label: "دجاج كرسبي", price: 35 },
  { id: "strips", label: "دجاج إستربس", price: 35 },
  { id: "super_crunchy", label: "سوبر كرانشي", price: 38 },
  { id: "cordon", label: "كوردن بلو", price: 42 },
  { id: "shish", label: "شيش طاووق", price: 38 },
  { id: "shawarma", label: "شاورما دجاج", price: 38 },
  { id: "fajita", label: "فاهيتا دجاج", price: 40 },
  { id: "pane", label: "دجاج بانيه", price: 32 },
  { id: "nuggets", label: "ناجتس دجاج", price: 30 },
  { id: "burger", label: "برجر لحم", price: 35 },
  { id: "kofta", label: "كفتة مشوية", price: 38 },
  { id: "sausage_oriental", label: "سجق شرقي", price: 38 },
  { id: "hotdog", label: "سوسيس هوت دوج", price: 30 },
];

export const CREPE_CHEESES: CrepeOption[] = [
  { id: "mozzarella", label: "جبنة موتزاريلا سايحة", price: 0 },
  { id: "cheddar", label: "شرائح جبنة شيدر", price: 10 },
  { id: "roumi", label: "جبنة رومي", price: 10 },
  { id: "mix_cheese", label: "ميكس جبن ثلاثي", price: 20 },
  { id: "turkey_mix", label: "تركي مدخن + ميكس جبن", price: 30 },
];

export const CREPE_SAUCES: CrepeOption[] = [
  { id: "ranch", label: "صوص رانش", price: 10 },
  { id: "bbq", label: "صوص باربيكيو", price: 10 },
  { id: "cheddar_sauce", label: "صوص شيدر سايح", price: 15 },
  { id: "mayo_ketchup", label: "مايونيز وكاتشب", price: 0 },
  { id: "spicy", label: "صوص حار سبايسي", price: 5 },
];

export const CREPE_EXTRAS: CrepeOption[] = [
  { id: "fries", label: "بطاطس محمرة داخل الكريب", price: 15 },
  { id: "jalapeno", label: "شرائح هالبينو", price: 10 },
  { id: "mushroom", label: "مشروم فريش", price: 15 },
  { id: "olives_peppers", label: "زيتون وفلفل ألوان", price: 0 },
];

export interface CustomCrepeSelection {
  baseId: string;
  proteinIds: string[];
  cheeseId: string;
  sauceIds: string[];
  extraIds: string[];
}

export function priceCustomCrepe(sel: CustomCrepeSelection) {
  const base = CREPE_BASES.find((b) => b.id === sel.baseId) ?? CREPE_BASES[0];
  const proteins = CREPE_PROTEINS.filter((p) => sel.proteinIds.includes(p.id)).slice(0, 3);
  const cheese = CREPE_CHEESES.find((c) => c.id === sel.cheeseId) ?? CREPE_CHEESES[0];
  const sauces = CREPE_SAUCES.filter((s) => sel.sauceIds.includes(s.id)).slice(0, 3);
  const extras = CREPE_EXTRAS.filter((e) => sel.extraIds.includes(e.id)).slice(0, 4);

  const addons: { label: string; price: number }[] = [
    ...proteins.map((p) => ({ label: `حشوة: ${p.label}`, price: p.price })),
    { label: `جبنة: ${cheese.label}`, price: cheese.price },
    ...sauces.map((s) => ({ label: `صوص: ${s.label}`, price: s.price })),
    ...extras.map((e) => ({ label: `إضافة: ${e.label}`, price: e.price })),
  ];

  const total =
    base.price +
    proteins.reduce((sum, p) => sum + p.price, 0) +
    cheese.price +
    sauces.reduce((sum, s) => sum + s.price, 0) +
    extras.reduce((sum, e) => sum + e.price, 0);

  return { base, proteins, cheese, sauces, extras, addons, total };
}

/**
 * Deterministic server-side validation and re-pricing for `custom_crepe` orders
 * sent as addon labels (`حشوة: ...`, `جبنة: ...`, `صوص: ...`, `إضافة: ...`).
 */
export function resolveCustomCrepeOrderLine(sizeLabel?: string, addonLabels: string[] = []) {
  const base = CREPE_BASES.find((b) => b.label === sizeLabel) ?? CREPE_BASES[0];
  const proteinIds: string[] = [];
  let cheeseId = CREPE_CHEESES[0].id;
  const sauceIds: string[] = [];
  const extraIds: string[] = [];

  for (const raw of addonLabels) {
    const clean = raw.trim();
    const p = CREPE_PROTEINS.find((x) => clean === `حشوة: ${x.label}` || clean === x.label);
    if (p) {
      proteinIds.push(p.id);
      continue;
    }
    const c = CREPE_CHEESES.find((x) => clean === `جبنة: ${x.label}` || clean === x.label);
    if (c) {
      cheeseId = c.id;
      continue;
    }
    const s = CREPE_SAUCES.find((x) => clean === `صوص: ${x.label}` || clean === x.label);
    if (s) {
      sauceIds.push(s.id);
      continue;
    }
    const e = CREPE_EXTRAS.find((x) => clean === `إضافة: ${x.label}` || clean === x.label);
    if (e) {
      extraIds.push(e.id);
    }
  }

  return priceCustomCrepe({
    baseId: base.id,
    proteinIds,
    cheeseId,
    sauceIds,
    extraIds,
  });
}
