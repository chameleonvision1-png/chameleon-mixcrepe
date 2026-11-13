import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BranchPicker from "@/components/BranchPicker";
import MobileCartBar from "@/components/MobileCartBar";
import CrepeBuilderModal from "@/components/CrepeBuilderModal";
import { StoreProvider } from "@/components/store";
import { publicDB } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await publicDB();
  const activeBranches = data.branches.filter((b) => b.isActive);
  const storeBranches = activeBranches.length
    ? activeBranches
    : data.branches.slice(0, 1);

  return (
    <StoreProvider branches={storeBranches}>
      <Header settings={data.settings} branches={storeBranches} />
      <main className="flex-1 w-full max-w-full min-w-0">{children}</main>
      <Footer branches={storeBranches} settings={data.settings} />
      <BranchPicker />
      <CrepeBuilderModal />
      <MobileCartBar
        whatsapp={storeBranches[0]?.whatsapp ?? "201098923225"}
      />
    </StoreProvider>
  );
}
