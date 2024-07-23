import About from "@/components/About";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import usePreventZoom from "@/hooks/usePreventZoom";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Work />
    </main>
  );
}
