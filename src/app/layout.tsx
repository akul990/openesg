import type { Metadata } from "next";
import "./globals.css";

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
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
