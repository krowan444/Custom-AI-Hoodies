import Hero from "@/components/Hero";
import InspirationMarquee from "@/components/InspirationMarquee";
import HowItWorks from "@/components/HowItWorks";
import Gallery from "@/components/Gallery";
import SubscriptionTable from "@/components/SubscriptionTable";

export default function Home() {
  return (
    <>
      <Hero />
      <InspirationMarquee />
      <HowItWorks />
      <Gallery />
      <SubscriptionTable />
    </>
  );
}
