import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/src/components/Providers";

export const metadata: Metadata = {
  title: "openESG — Independent ESG & CSR Ratings",
  description:
    "Independent, transparent ESG and CSR ratings for investors. AI-powered analysis mapped to GRI, SASB, TCFD, CSRD, ISSB, and more.",
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
