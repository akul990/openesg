"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { WaveBackground } from "@/src/components/WaveBackground";

const companies = [
  {
    name: "Apple Inc.",
    ticker: "AAPL",
    meta: "Technology — NASDAQ: AAPL",
    score: 74,
    e: 68, s: 79, g: 81,
    csr: "B+",
    tags: ["GRI Aligned", "TCFD Compliant", "SBTi Committed"],
    insights: [
      { tone: "bg-green-400",  text: "Strong Scope 1 and 2 disclosure with third-party assurance referenced in the sustainability report." },
      { tone: "bg-amber-400",  text: "Greenwashing flag: Scope 3 targets described without baseline year, boundary, or verification detail." },
      { tone: "bg-amber-400",  text: "Board diversity below sector median based on latest proxy statement and committee composition." },
      { tone: "bg-green-400",  text: "Community investment up 34% year over year with project-level outcomes disclosed in the CSR annex." },
    ],
  },
  {
    name: "Unilever plc",
    ticker: "ULVR",
    meta: "Consumer Staples — LSE: ULVR",
    score: 84,
    e: 88, s: 82, g: 79,
    csr: "A–",
    tags: ["GRI Comprehensive", "TCFD Compliant", "CDP A-List"],
    insights: [
      { tone: "bg-green-400",  text: "Net-zero roadmap covers full value chain with independently verified interim milestones." },
      { tone: "bg-green-400",  text: "Living wage commitment extended to tier-2 suppliers across 12 high-risk sourcing markets." },
      { tone: "bg-amber-400",  text: "Plastic packaging reduction targets lag behind voluntary pledges made in 2022 annual report." },
      { tone: "bg-green-400",  text: "Board-level ESG committee with quarterly reporting cadence and published terms of reference." },
    ],
  },
  {
    name: "ExxonMobil Corporation",
    ticker: "XOM",
    meta: "Energy — NYSE: XOM",
    score: 41,
    e: 29, s: 48, g: 54,
    csr: "C",
    tags: ["TCFD Partial", "GRI Core"],
    insights: [
      { tone: "bg-red-400",    text: "Scope 3 emissions disclosure absent from 2023 sustainability report despite ISSB IFRS S2 alignment claim." },
      { tone: "bg-red-400",    text: "Active litigation in three jurisdictions regarding historical climate-risk disclosure to investors." },
      { tone: "bg-amber-400",  text: "Low-carbon investment budget represents less than 4% of total capex — below energy-sector peer median." },
      { tone: "bg-amber-400",  text: "Executive pay partially linked to emissions metrics but weighting below 10% of total incentive package." },
    ],
  },
  {
    name: "SAP SE",
    ticker: "SAP",
    meta: "Technology — XETRA: SAP",
    score: 85,
    e: 83, s: 87, g: 86,
    csr: "A",
    tags: ["GRI Comprehensive", "CSRD Ready", "SBTi 1.5°C"],
    insights: [
      { tone: "bg-green-400",  text: "Carbon-neutral operations since 2023 with 100% renewable electricity across all owned facilities." },
      { tone: "bg-green-400",  text: "Employee well-being index disclosed annually with third-party benchmark against 50+ technology peers." },
      { tone: "bg-amber-400",  text: "Supply chain human-rights due diligence covers tier-1 only; tier-2 assessment roadmap not yet published." },
      { tone: "bg-green-400",  text: "Governance transparency score highest in DACH region; 45% female board representation as of Q1 2025." },
    ],
  },
];

const INTERVAL = 4500;

export function RatingDemo() {
  const [active, setActive]     = useState(0);
  const [barReady, setBarReady] = useState(false);
  const sectionRef   = useRef<HTMLElement>(null);
  const hasInView    = useRef(false);
  const router       = useRouter();

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => advance(1), INTERVAL);
    return () => clearInterval(timer);
  }, [active]);

  // Re-animate bars on every carousel change (once section is in view)
  useEffect(() => {
    setBarReady(false);
    if (!hasInView.current) return;
    const t = setTimeout(() => setBarReady(true), 60);
    return () => clearTimeout(t);
  }, [active]);

  // Trigger bar animation when section scrolls into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasInView.current) {
          hasInView.current = true;
          setTimeout(() => setBarReady(true), 120);
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function advance(dir: 1 | -1) {
    setActive((prev) => (prev + dir + companies.length) % companies.length);
  }

  const c = companies[active];
  const circumference = 2 * Math.PI * 52;

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-dark py-12 sm:py-20">

      {/* ── Canvas wave background ────────────── */}
      <WaveBackground />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Carousel dot nav + arrows */}
        <div className="mb-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => advance(-1)}
            className="rounded-full border border-white/15 bg-white/5 p-1.5 text-white/60 transition hover:bg-white/10 hover:text-white"
            aria-label="Previous"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 12L6 8l4-4"/></svg>
          </button>
          <div className="flex gap-2">
            {companies.map((co, i) => (
              <button
                key={co.name}
                type="button"
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-accent" : "w-2 bg-white/25 hover:bg-white/50"}`}
                aria-label={co.name}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => advance(1)}
            className="rounded-full border border-white/15 bg-white/5 p-1.5 text-white/60 transition hover:bg-white/10 hover:text-white"
            aria-label="Next"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 4l4 4-4 4"/></svg>
          </button>
        </div>

        {/* Card grid — boxes stay fixed, only inner content animates */}
        <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch">

          {/* Score card */}
          <div className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-sm sm:p-8">
            <div key={active} className="animate-content-fade flex flex-col flex-1">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <button
                    type="button"
                    onClick={() => router.push(`/platform/companies?ticker=${c.ticker}`)}
                    className="group flex items-center gap-1.5 text-left"
                  >
                    <p className="text-lg font-semibold text-white transition-colors group-hover:text-accent">{c.name}</p>
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0 text-white/30 transition-colors group-hover:text-accent" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12L12 4M12 4H6M12 4v6"/></svg>
                  </button>
                  <p className="mt-1 text-sm text-white/70">{c.meta}</p>
                </div>
                <div className="relative flex h-28 w-28 items-center justify-center">
                  <svg className="absolute inset-0 h-28 w-28 -rotate-90 text-accent" viewBox="0 0 120 120" aria-hidden>
                    <circle cx="60" cy="60" r="52" className="fill-none stroke-white/10" strokeWidth="10" />
                    <circle
                      cx="60" cy="60" r="52"
                      className="fill-none stroke-current transition-all duration-700"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={`${barReady ? (c.score / 100) * circumference : 0} ${circumference}`}
                    />
                  </svg>
                  <div className="relative text-center">
                    <p className="text-3xl font-bold text-white">{c.score}</p>
                    <p className="text-xs font-semibold text-white/75">/100</p>
                  </div>
                </div>
              </div>

              <p className="mt-2 text-xs font-medium uppercase tracking-wide text-white/65">Overall ESG score</p>

              <div className="mt-8 space-y-4">
                {[
                  { label: "Environment", val: c.e, cls: "bg-emerald-500", delay: "0ms" },
                  { label: "Social",      val: c.s, cls: "bg-accent",      delay: "150ms" },
                  { label: "Governance",  val: c.g, cls: "bg-sky-500",     delay: "300ms" },
                ].map(({ label, val, cls, delay }) => (
                  <div key={label}>
                    <div className="flex items-center justify-between text-xs font-semibold text-white/85">
                      <span>{label}</span><span>{val}</span>
                    </div>
                    <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className={`h-full rounded-full ${cls}`}
                        style={{
                          width: barReady ? `${val}%` : "0%",
                          transition: `width 1s cubic-bezier(0.22,1,0.36,1) ${delay}`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                  CSR Rating: {c.csr}
                </span>
                {c.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-white/80">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Insights */}
          <div className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <div key={active} className="animate-content-fade flex flex-col flex-1 gap-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-white/75">AI-generated diligence notes</h3>
              <div className="grid gap-3">
                {c.insights.map((item) => (
                  <div key={item.text} className="flex gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition-colors duration-200 hover:border-accent/40 hover:bg-white/10">
                    <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${item.tone}`} aria-hidden />
                    <p className="text-sm leading-relaxed text-white/85">{item.text}</p>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-xs leading-relaxed text-white/55">
                Ratings based on publicly disclosed information only.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
