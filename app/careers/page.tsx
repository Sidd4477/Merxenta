import CareersHero from "@/src/components/careers/CareersHero";
import Environment from "@/src/components/careers/Environment";
import CareersVideo from "@/src/components/careers/CareersVideo";
import LatestInsights from "@/src/components/careers/LatestInsights";   
export default function CareersPage() {
  return (
    <main>
        <CareersHero />
        <Environment />
        <CareersVideo />
        <LatestInsights />
    </main>
  );
}