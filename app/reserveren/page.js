import Cursor from "@/components/Cursor";
import V2Nav from "@/components/woodyv2/V2Nav";
import V2BookButton from "@/components/woodyv2/V2BookButton";
import V2Footer from "@/components/woodyv2/V2Footer";
import Reserveren from "@/components/woodyv2/Reserveren";

export const metadata = {
  title: "Reserveren — Woody",
  description:
    "Reserveer een tafeltje, plan je feestje of kom met je team naar Woody.",
};

export default function ReserverenPage() {
  return (
    <main>
      <Cursor variant="woody" />
      <V2Nav solid />
      <V2BookButton />
      <Reserveren />
      <V2Footer />
    </main>
  );
}
