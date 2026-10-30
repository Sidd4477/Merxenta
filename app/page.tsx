import Hero from "../src/components/home/Hero";
import Introduction from "../src/components/home/Introduction";
import OurServices from "../src/components/home/OurServices";
import Reveal from "../src/components/home/Reveal";
import Vision from "../src/components/home/Vision";
import Testimonials from "../src/components/home/Testimonials";
import LatestInsights from "../src/components/home/LatestInsights";
import FAQ from "../src/components/home/FAQ";
import Expertise from "../src/components/home/Expertise";
export default function Home() {
  return (
    <main>
      <Hero />
      <Introduction />
      <OurServices />
      <Expertise />
      <Vision />
      <Reveal />
      <Testimonials />
      <LatestInsights />
      <FAQ />
    </main>
  );
}