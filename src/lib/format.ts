export const formatPrice = (n: number) => `${n.toLocaleString("ar-EG")} ج.م`;

export const statusLabels: Record<string, string> = {
  new: "جديد",
  preparing: "جاري التحضير",
  delivering: "خرج للتوصيل",
  done: "مكتمل",
  cancelled: "ملغي",
  contacted: "تم التواصل",
  confirmed: "مؤكد",
};

export const paymentMethods = [
  "الدفع عند الاستلام (كاش)",
  "إنستاباي (InstaPay)",
  "محفظة إلكترونية (فودافون كاش / اتصالات كاش)",
];

export const occasionTypes = [
  "بوكسات كريب وبيتزا للطلبة وتجمعات الجامعة الروسية",
  "لمة عيلة وويك إند (بيتزا إيطالي + ميكس كريب)",
  "طلبات شركات ومصانع بمدينة بدر",
  "حفلة عيد ميلاد أو تخرج",
  "بوكس فطائر حلوة ووافل للحلويات",
  "استفسار أو اقتراح للإدارة",
];
