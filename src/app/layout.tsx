import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/src/components/Providers";

export const metadata: Metadata = {
  title: {
    default: "OpenESG — Free ESG Ratings & Sustainability Compliance Platform",
    template: "%s | OpenESG",
  },
  description:
    "Free ESG scores, company sustainability ratings, and automated compliance reporting. Mapped to CSRD, GRI, TCFD, SASB, ISSB, SFDR, and EU Taxonomy. Used by analysts, investors, and compliance teams globally.",
  keywords: [
    "ESG ratings",
    "ESG scores",
    "sustainability reporting",
    "ESG compliance software",
    "CSRD compliance",
    "GRI reporting standards",
    "TCFD climate disclosures",
    "ISSB sustainability standards",
    "SFDR PAI reporting",
    "EU taxonomy",
    "ESG investing",
    "ESG data",
    "greenwashing detection",
    "scope 3 emissions",
    "carbon disclosure",
    "ESG analysis",
    "corporate sustainability",
    "free ESG score",
    "ESG framework comparison",
    "sustainability compliance",
  ],
  openGraph: {
    type: "website",
    siteName: "OpenESG",
    title: "OpenESG — Free ESG Ratings & Sustainability Compliance Platform",
    description:
      "Free ESG scores and compliance automation mapped to CSRD, GRI, TCFD, SASB, and ISSB. Get your sustainability report in minutes, not months.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenESG — Free ESG Ratings & Sustainability Compliance",
    description:
      "Free ESG scores and automated compliance for CSRD, GRI, TCFD, SASB, and ISSB. Start free today.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
