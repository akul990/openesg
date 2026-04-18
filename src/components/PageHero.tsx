"use client";

import { useEffect, useRef } from "react";
import Image, { type StaticImageData } from "next/image";

interface PageHeroProps {
  src: StaticImageData | string;
  children: React.ReactNode;
}

export function PageHero({ src, children }: PageHeroProps) {
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
    <section className="relative flex min-h-screen items-center overflow-hidden bg-dark">
      {/* Parallax + Ken Burns background */}
      <div
        ref={bgRef}
        className="pointer-events-none absolute inset-x-0 -top-[25%] bottom-0 will-change-transform"
        aria-hidden
      >
        {/* Ken Burns zoom-pan on the image itself */}
        <div className="animate-ken-burns absolute inset-0">
          <Image src={src} alt="" fill className="object-cover object-center" priority />
        </div>
        <div className="absolute inset-0 bg-dark/72" />
        {/* Ambient glow */}
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]" />
      </div>

      {/* Wave transition at bottom */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0" aria-hidden>
        <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="block w-full">
          <path d="M0,28 C360,56 720,0 1080,28 C1260,42 1380,14 1440,28 L1440,56 L0,56 Z" fill="white" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative w-full py-24 sm:py-32">
        {children}
      </div>
    </section>
  );
}
