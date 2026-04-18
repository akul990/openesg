import { Navbar } from "@/src/components/Navbar";
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

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-white">
      <Navbar />
      <main className="flex-1">
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
