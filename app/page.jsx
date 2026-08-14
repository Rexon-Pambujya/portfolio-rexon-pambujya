import HeroVoyage from "@/components/voyage/HeroVoyage";
import OceanGap from "@/components/voyage/OceanGap";
import About from "@/components/About";
import Work from "@/components/Work";
import ContactCta from "@/components/ContactCta";

export default function Home() {
  return (
    <>
      <HeroVoyage />

      {/* Decks are ports; the gaps between them are open water. From lg up
          the decks are held off the right edge so there's a permanent
          channel of open sea beside them for the ship to sail through —
          it should never be fully hidden by content. */}
      <div className="px-3 sm:px-6 lg:pr-[30%] xl:pr-[26%]">
        <About />
        <OceanGap label="Making way" />
        <Work />
      </div>

      {/* the docking happens here, in clear water */}
      <OceanGap label="Approaching port" tall />

      <div className="px-3 pb-4 sm:px-6 sm:pb-8">
        <ContactCta />
      </div>
    </>
  );
}
