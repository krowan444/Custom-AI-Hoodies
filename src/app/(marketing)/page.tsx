import Hero from "@/components/Hero";
import InspirationMarquee from "@/components/InspirationMarquee";
import FeatureGrid from "@/components/FeatureGrid";
import PromptShowcase from "@/components/PromptShowcase";
import Gallery from "@/components/Gallery";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import SubscriptionTable from "@/components/SubscriptionTable";
import FAQ from "@/components/FAQ";
import CTAStrip from "@/components/CTAStrip";
import TrustStrip from "@/components/TrustStrip";

export default function Home() {
  return (
    <>
      <Hero />
      <InspirationMarquee />
      <FeatureGrid />
      <PromptShowcase />
      <Gallery />
      <HowItWorks />
      <Testimonials />
      <SubscriptionTable />
      <FAQ />
      <CTAStrip />
      <TrustStrip />
    </>
  );
}
