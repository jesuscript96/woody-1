import Cursor from "@/components/Cursor";
import V2Nav from "@/components/woodyv2/V2Nav";
import V2BookButton from "@/components/woodyv2/V2BookButton";
import V2Footer from "@/components/woodyv2/V2Footer";
import EditorialPage from "@/components/woodyv2/EditorialPage";
import { woodyV2Pages } from "@/lib/woody-v2-pages";

export const metadata = {
  title: "Over — Woody",
  description: "Over Bar Woody — de stadsherberg van nu.",
};

export default function OverPage() {
  return (
    <main>
      <Cursor variant="woody" />
      <V2Nav solid />
      <V2BookButton />
      <EditorialPage data={woodyV2Pages.over} />
      <V2Footer />
    </main>
  );
}
