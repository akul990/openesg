"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import heroBg from "@/src/assets/hero-bg.webp";


export function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-dark">
      {/* Parallax background image */}
      <div
        ref={bgRef}
        className="pointer-events-none absolute inset-x-0 -top-[25%] bottom-0 will-change-transform"
        aria-hidden
      >
        <Image
          src={heroBg}
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
        {/* Dark overlay to keep text readable */}
        <div className="absolute inset-0 bg-dark/70" />
      </div>

      {/* Gradient blobs */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
      >
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-primary/40 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            The World&apos;s Most Trusted Independent ESG &amp; CSR Rating
            Platform
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg text-emerald-100/80 sm:text-xl">
            We evaluate 10,000+ companies across 60 countries using AI-powered
            analysis mapped to GRI, SASB, TCFD, CSRD, and ISSB frameworks.
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-accent/90 hover:shadow-xl"
            >
              Search a Company
            </button>
            <button
              type="button"
              className="rounded-full border-2 border-white/80 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-white hover:bg-white/10"
            >
              See How We Rate
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {[
            "10,000+ Companies Rated",
            "60+ Countries",
            "15+ Frameworks",
          ].map((label) => (
            <span
              key={label}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-emerald-50/90 backdrop-blur transition-colors hover:border-accent/40 hover:bg-white/10 sm:text-sm"
            >
              {label}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}
