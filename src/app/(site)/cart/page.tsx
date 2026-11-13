import type { Metadata } from "next";
import { publicDB } from "@/lib/db";
import CartClient from "@/components/CartClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "سلة الطلبات",
  description:
    "راجع سلة طلباتك من مطعم ميكس كريب وبيتزا (MIX Crepe & Pizza) بمدينة بدر وأرسل الطلب مباشرة عبر واتساب الفرع.",
};

export default async function CartPage() {
  const db = await publicDB();
  const talabatUrl =
    db.settings.talabatUrl ||
    db.settings.talabat ||
    "https://www.talabat.com/ar/egypt/restaurant/684423/mix-crepe-and-pizza?aid=9534";

  return <CartClient talabatUrl={talabatUrl} />;
}
