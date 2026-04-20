import type { Metadata } from "next";
import { Navbar } from "@/src/components/Navbar";

export const metadata: Metadata = {
  title: "OpenESG — Free ESG Compliance & Sustainability Ratings Platform",
  description:
    "Automate ESG compliance and get free company sustainability ratings. Map your disclosures to CSRD, GRI, TCFD, SASB, and ISSB without paying Big 4 consulting rates. Start free in under an hour.",
  openGraph: {
    title: "OpenESG — ESG Compliance Automation & Free Sustainability Ratings",
    description:
      "Stop paying for ESG consultants. OpenESG automates compliance for CSRD, GRI, TCFD, SASB, and ISSB — in under an hour.",
  },
};
import { Hero } from "@/src/components/Hero";
import { LogoStrip } from "@/src/components/LogoStrip";
import { HowItWorks } from "@/src/components/HowItWorks";
import { Features } from "@/src/components/Features";
import { RatingDemo } from "@/src/components/RatingDemo";
import { GlobalPresence } from "@/src/components/GlobalPresence";
import { Frameworks } from "@/src/components/Frameworks";
import { Pricing } from "@/src/components/Pricing";
import { CTA } from "@/src/components/CTA";
import { Footer } from "@/src/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";


export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <SpeedInsights />
        <Hero />
        <LogoStrip />
        <HowItWorks />
        <Features />
        <RatingDemo />
        <Frameworks />
        <GlobalPresence />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
