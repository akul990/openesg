"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plug,
  Cpu,
  GitMerge,
  BarChart2,
  FileText,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Check,
  Zap,
  Database,
  Layers,
  TrendingUp,
  AlertTriangle,
  Clock,
  Code2,
  Upload,
  RefreshCw,
} from "lucide-react";
import { Navbar } from "@/src/components/Navbar";
import { Footer } from "@/src/components/Footer";

/* ── Types ──────────────────────────────────────────────────────── */
type Layer = {
  id: number;
  icon: React.ElementType;
  tag: string;
  title: string;
  subtitle: string;
  color: { bg: string; text: string; border: string; dot: string; light: string };
  inputs: string[];
  outputs: string[];
  tech: string[];
  detail: string;
  sprint: string;
};

/* ── Data ───────────────────────────────────────────────────────── */
const LAYERS: Layer[] = [
  {
    id: 1,
    icon: Plug,
    tag: "Ingestion",
    title: "Data Ingestion Layer",
    subtitle: "Connect once, ingest forever",
    color: { bg: "bg-violet-500", text: "text-violet-600", border: "border-violet-200", dot: "bg-violet-400", light: "bg-violet-50" },
    inputs: ["QuickBooks OAuth / API", "Xero OAuth / API", "CSV upload fallback", "Bank statement import"],
    outputs: ["Raw transaction ledger", "Vendor list", "Expense categories", "Date-stamped entries"],
    tech: ["OAuth 2.0 PKCE flow", "QuickBooks REST API v3", "Xero API v2", "Papa Parse (CSV)"],
    detail:
      "Start narrow — QuickBooks and Xero cover ~70% of EU SMEs. OAuth handles auth; CSV fallback ensures nothing blocks a first demo. Extract expenses, vendors, categories, and transaction dates. Don't try to pull everything — just what maps to emissions.",
    sprint: "Week 1",
  },
  {
    id: 2,
    icon: GitMerge,
    tag: "Normalization",
    title: "Data Normalization Layer",
    subtitle: "Turn messy bookkeeping into structured data",
    color: { bg: "bg-sky-500", text: "text-sky-600", border: "border-sky-200", dot: "bg-sky-400", light: "bg-sky-50" },
    inputs: ["Raw vendor names", "Free-text categories", "Multi-currency amounts", "Mixed date formats"],
    outputs: ["Standardized category tags", "EUR-normalised amounts", "Vendor classification", "Clean ledger rows"],
    tech: ["GPT-4o-mini classification", "Static rules engine (fast path)", "Open Exchange Rates API", "Fuzzy matching (Fuse.js)"],
    detail:
      '"Fuel", "Petrol", "BP Diesel invoice" all mean Transport. A lightweight rules dictionary handles 80% of cases fast and cheap. GPT-4o-mini catches the long tail. Currency normalization is critical in the EU — multi-currency is the default, not the edge case.',
    sprint: "Week 1–2",
  },
  {
    id: 3,
    icon: Database,
    tag: "Mapping Engine",
    title: "Carbon / ESG Mapping Engine",
    subtitle: "Your first real IP — transactions → CO₂",
    color: { bg: "bg-emerald-500", text: "text-emerald-600", border: "border-emerald-200", dot: "bg-emerald-400", light: "bg-emerald-50" },
    inputs: ["Normalized category tags", "EUR amounts", "Vendor metadata", "Date ranges"],
    outputs: ["tCO₂e per transaction", "Scope 1 / 2 / 3 split", "Emission factor applied", "Methodology trace"],
    tech: ["DEFRA emission factors 2024", "EXIOBASE spend-based factors", "GHG Protocol methodology", "Scope 3 Category 1 & 6"],
    detail:
      "Map each normalized category to a spend-based emission factor from DEFRA or EXIOBASE. Electricity bill → kWh → grid emission factor. Travel → km estimate → transport factor. This is a lookup table at MVP — sophisticated models come later. Always store which factor was applied for audit trails.",
    sprint: "Week 2–3",
  },
  {
    id: 4,
    icon: BarChart2,
    tag: "Scoring",
    title: "Insight + Scoring Layer",
    subtitle: "Numbers mean nothing without context",
    color: { bg: "bg-amber-500", text: "text-amber-600", border: "border-amber-200", dot: "bg-amber-400", light: "bg-amber-50" },
    inputs: ["tCO₂e per category", "Historical periods", "Industry benchmarks", "Framework thresholds"],
    outputs: ["Total emissions summary", "Category % breakdown", "MoM / QoQ trend", "Plain-English insights"],
    tech: ["Static peer benchmarks (SBTI data)", "Rule-based insight generation", "Simple trend detection", "Framework gap scoring"],
    detail:
      '"Transport = 42% of your emissions" is worth more than a raw number. Build a thin insight layer: top emitting category, biggest month-over-month change, comparison to sector median. Keep AI minimal at MVP — rule-based insights are faster to ship, easier to verify, and good enough to charge for.',
    sprint: "Week 3–4",
  },
  {
    id: 5,
    icon: FileText,
    tag: "Report Layer",
    title: "Report + Dashboard Layer",
    subtitle: "The output users actually pay for",
    color: { bg: "bg-rose-500", text: "text-rose-600", border: "border-rose-200", dot: "bg-rose-400", light: "bg-rose-50" },
    inputs: ["Scored emissions data", "Insights + trends", "Compliance gap flags", "Company metadata"],
    outputs: ["Live dashboard", "CSRD-lite PDF export", "Auditor evidence pack", "Framework alignment summary"],
    tech: ["React dashboard (this stack)", "react-pdf or Puppeteer (PDF)", "CSRD Annex 1 structure", "CSV data export"],
    detail:
      "Two outputs: a live dashboard for ongoing monitoring, and a PDF export structured around CSRD Annex 1 (E1 climate change section). The PDF is the product — it\'s what a bookkeeper hands to their accountant or what an SME submits to their bank for green lending. Keep the dashboard simple: total, breakdown, trend, red flags.",
    sprint: "Week 4–6",
  },
];

const TIMELINE = [
  { week: "Week 1", focus: "Ingestion + Normalization skeleton", tasks: ["QuickBooks OAuth integration", "Xero OAuth integration", "CSV upload parser", "Category rules engine (80 rules)"], color: "bg-violet-500" },
  { week: "Week 2", focus: "Normalization + Mapping Engine v1", tasks: ["GPT-4o-mini fallback classifier", "DEFRA factor lookup table", "Scope 1/2/3 assignment logic", "Transaction → tCO₂e pipeline"], color: "bg-emerald-500" },
  { week: "Week 3", focus: "Scoring Layer + first dashboard", tasks: ["Category breakdown engine", "MoM trend detection", "Insight generation rules", "Basic dashboard UI"], color: "bg-amber-500" },
  { week: "Week 4", focus: "PDF report + CSRD structure", tasks: ["CSRD Annex 1 E1 template", "PDF rendering (react-pdf)", "Auditor evidence export", "End-to-end pipeline test"], color: "bg-rose-500" },
  { week: "Week 5–6", focus: "Polish + first paying customer", tasks: ["Error handling + edge cases", "Onboarding flow", "Stripe billing integration", "5 beta customer pilots"], color: "bg-sky-500" },
];

const WHAT_YOU_GET = [
  {
    title: "Live Emissions Dashboard",
    icon: TrendingUp,
    items: [
      "Total tCO₂e for any date range",
      "Breakdown by Scope 1, 2, and 3",
      "Top 5 emitting categories",
      "Month-over-month trend chart",
      "Sector benchmark comparison",
    ],
  },
  {
    title: "CSRD-Lite PDF Report",
    icon: FileText,
    items: [
      "Structured to CSRD Annex 1 (E1)",
      "Emission factor methodology trace",
      "Data lineage per transaction",
      "Gap analysis vs disclosure requirements",
      "Ready to share with auditors or banks",
    ],
  },
];

const WHY_NOW = [
  { icon: AlertTriangle, stat: "50,000+", label: "EU SMEs now in CSRD scope by 2026", color: "text-rose-500" },
  { icon: Clock,         stat: "6 months", label: "Average time to produce first ESG report manually", color: "text-amber-500" },
  { icon: Zap,           stat: "< 1 hour", label: "Target time with automated ingestion", color: "text-emerald-500" },
  { icon: TrendingUp,    stat: "€80–150K", label: "Typical Big 4 ESG consulting engagement cost", color: "text-violet-500" },
];

/* ── Pipeline connector ─────────────────────────────────────────── */
function PipelineArrow() {
  return (
    <div className="hidden shrink-0 items-center lg:flex" aria-hidden>
      <div className="h-px w-6 bg-slate-200" />
      <ChevronRight className="h-4 w-4 text-slate-300" />
    </div>
  );
}

/* ── Layer card ─────────────────────────────────────────────────── */
function LayerCard({ layer, open, onToggle }: { layer: Layer; open: boolean; onToggle: () => void }) {
  const Icon = layer.icon;
  return (
    <div className={`rounded-2xl border bg-white shadow-sm transition-shadow duration-200 ${open ? "shadow-md " + layer.color.border : "border-slate-100"}`}>
      {/* Header */}
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start gap-4 p-5 text-left"
      >
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white ${layer.color.bg}`}>
          <Icon className="h-5 w-5" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold uppercase tracking-widest ${layer.color.text}`}>{layer.tag}</span>
            <span className="text-[10px] text-slate-400">·</span>
            <span className="text-[10px] font-semibold text-slate-400">{layer.sprint}</span>
          </div>
          <p className="mt-0.5 text-sm font-bold text-slate-900">{layer.title}</p>
          <p className="text-[11px] text-slate-500">{layer.subtitle}</p>
        </div>
        <ChevronDown className={`mt-1 h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Expanded content */}
      {open && (
        <div className="border-t border-slate-100 px-5 pb-5 pt-4">
          <p className="text-[12px] leading-relaxed text-slate-600">{layer.detail}</p>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {/* Inputs */}
            <div>
              <p className="mb-2 text-[9px] font-bold uppercase tracking-widest text-slate-400">Inputs</p>
              <ul className="space-y-1">
                {layer.inputs.map(i => (
                  <li key={i} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                    <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${layer.color.dot}`} />{i}
                  </li>
                ))}
              </ul>
            </div>
            {/* Outputs */}
            <div>
              <p className="mb-2 text-[9px] font-bold uppercase tracking-widest text-slate-400">Outputs</p>
              <ul className="space-y-1">
                {layer.outputs.map(o => (
                  <li key={o} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                    <ArrowRight className={`h-3 w-3 shrink-0 ${layer.color.text}`} />{o}
                  </li>
                ))}
              </ul>
            </div>
            {/* Tech */}
            <div>
              <p className="mb-2 text-[9px] font-bold uppercase tracking-widest text-slate-400">Tech / Data</p>
              <ul className="space-y-1">
                {layer.tech.map(t => (
                  <li key={t} className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
                    <Code2 className="h-3 w-3 shrink-0 text-slate-300" />{t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────────────── */
export default function AutomatePage() {
  const [openLayer, setOpenLayer] = useState<number | null>(1);
  const [openWeek, setOpenWeek]   = useState<number | null>(0);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="flex-1">

        {/* ── Hero ────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-slate-950 py-20 sm:py-28">
          {/* grid texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "40px 40px" }}
            aria-hidden
          />
          {/* glow blobs */}
          <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-violet-500/15 blur-3xl" aria-hidden />

          <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              MVP Architecture · 4–6 week build · EU SME focus
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Automated ESG Compliance<br className="hidden sm:block" />
              <span className="text-emerald-400"> for Underserved Companies</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
              EU SMEs face CSRD reporting obligations but can&apos;t afford sustainability consultants.
              This is the architecture for an automated compliance engine that connects to their accounting software and outputs an audit-ready carbon snapshot — in hours, not months.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/autoesg"
                className="flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-400 hover:shadow-xl"
              >
                <Zap className="h-4 w-4" />
                Launch AutoESG Tool
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#architecture"
                className="rounded-full border border-white/20 bg-white/5 px-7 py-3 text-sm font-semibold text-white/80 transition-all hover:border-white/40 hover:bg-white/10"
              >
                Explore the Architecture
              </Link>
            </div>

            {/* Why now stats */}
            <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {WHY_NOW.map(({ icon: Icon, stat, label, color }) => (
                <div key={label} className="rounded-2xl border border-white/8 bg-white/5 px-4 py-4 backdrop-blur">
                  <Icon className={`mx-auto mb-2 h-5 w-5 ${color}`} />
                  <p className={`text-xl font-black ${color}`}>{stat}</p>
                  <p className="mt-0.5 text-[10px] leading-snug text-white/50">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pipeline overview ────────────────────────────── */}
        <section id="architecture" className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-4 text-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">MVP Architecture</span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">5 components. One pipeline.</h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-500">
                Designed to be shippable in 4–6 weeks. Each layer is independently deployable, testable, and replaceable.
              </p>
            </div>

            {/* Pipeline nodes */}
            <div className="mt-10 flex flex-col items-stretch gap-3 lg:flex-row lg:items-center lg:gap-0">
              {LAYERS.map((layer, idx) => {
                const Icon = layer.icon;
                return (
                  <>
                    <div key={layer.id} className={`flex flex-1 flex-col items-center rounded-2xl border p-4 text-center transition-all duration-200 ${layer.color.border} ${layer.color.light}`}>
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-white ${layer.color.bg}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className={`mt-3 text-[9px] font-bold uppercase tracking-widest ${layer.color.text}`}>{layer.tag}</span>
                      <p className="mt-1 text-xs font-bold leading-tight text-slate-800">{layer.title}</p>
                      <span className="mt-2 rounded-full bg-white/70 px-2 py-0.5 text-[9px] font-semibold text-slate-500 ring-1 ring-slate-200">{layer.sprint}</span>
                    </div>
                    {idx < LAYERS.length - 1 && <PipelineArrow key={`arrow-${idx}`} />}
                  </>
                );
              })}
            </div>

            <p className="mt-4 text-center text-[10px] text-slate-400">
              Data flows left → right. Each layer is independently testable. Swap any component without rebuilding the pipeline.
            </p>
          </div>
        </section>

        {/* ── Layer deep-dives ─────────────────────────────── */}
        <section className="bg-slate-50 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">Layer Deep-Dive</span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">What each component actually does</h2>
              <p className="mt-2 text-sm text-slate-500">Click any layer to see inputs, outputs, tech stack, and build notes.</p>
            </div>
            <div className="space-y-3">
              {LAYERS.map(layer => (
                <LayerCard
                  key={layer.id}
                  layer={layer}
                  open={openLayer === layer.id}
                  onToggle={() => setOpenLayer(openLayer === layer.id ? null : layer.id)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── What you get ─────────────────────────────────── */}
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">Outputs</span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">What companies actually get</h2>
              <p className="mt-3 text-sm text-slate-500">Two outputs. One for day-to-day monitoring. One for compliance and investors.</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {WHAT_YOU_GET.map(({ title, icon: Icon, items }) => (
                <div key={title} className="rounded-2xl border border-slate-100 bg-slate-50 p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{title}</h3>
                  </div>
                  <ul className="mt-5 space-y-2.5">
                    {items.map(item => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                          <Check className="h-2.5 w-2.5 text-emerald-700" />
                        </span>
                        <span className="text-sm text-slate-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Dashboard mockup */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
              <div className="border-b border-slate-100 bg-slate-50 px-5 py-3">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-[11px] text-slate-400">OpenESG — Emissions Dashboard</span>
                </div>
              </div>
              <div className="p-6">
                {/* Mock dashboard header */}
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Acme GmbH · FY 2025</p>
                    <p className="mt-0.5 text-2xl font-black text-slate-900">142.7 <span className="text-sm font-semibold text-slate-400">tCO₂e total</span></p>
                  </div>
                  <div className="flex gap-2">
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-bold text-amber-700">+12% vs last quarter</span>
                    <span className="rounded-full bg-sky-100 px-3 py-1 text-[10px] font-bold text-sky-700">Scope 1 · 2 · 3</span>
                  </div>
                </div>

                {/* Mock category bars */}
                <div className="space-y-3">
                  {[
                    { label: "Transport & Travel",    pct: 42, val: "59.9 t", color: "bg-rose-400" },
                    { label: "Energy & Utilities",    pct: 28, val: "39.9 t", color: "bg-amber-400" },
                    { label: "Supply Chain Spend",    pct: 18, val: "25.7 t", color: "bg-violet-400" },
                    { label: "Facilities & Other",    pct: 12, val: "17.1 t", color: "bg-slate-300" },
                  ].map(row => (
                    <div key={row.label}>
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="font-medium text-slate-700">{row.label}</span>
                        <span className="font-semibold text-slate-500">{row.val} · {row.pct}%</span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                        <div className={`h-full rounded-full ${row.color}`} style={{ width: `${row.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mock insight chips */}
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-[10px] font-semibold text-rose-700">
                    <AlertTriangle className="h-3 w-3" />
                    Transport = 42% of emissions — top priority
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-semibold text-emerald-700">
                    <TrendingUp className="h-3 w-3" />
                    Below sector median for your size
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[10px] font-semibold text-sky-700">
                    <FileText className="h-3 w-3" />
                    CSRD E1 report ready to export
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Sprint timeline ───────────────────────────────── */}
        <section className="bg-slate-950 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Build Roadmap</span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">4–6 week sprint to MVP</h2>
              <p className="mt-3 text-sm text-white/50">Realistic. Tight. Shippable. One founder + one eng.</p>
            </div>

            <div className="space-y-3">
              {TIMELINE.map((wk, idx) => (
                <div key={wk.week} className="overflow-hidden rounded-2xl border border-white/8 bg-white/5">
                  <button
                    type="button"
                    onClick={() => setOpenWeek(openWeek === idx ? null : idx)}
                    className="flex w-full items-center gap-4 px-5 py-4 text-left"
                  >
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[10px] font-black text-white ${wk.color}`}>{idx + 1}</span>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">{wk.week}</span>
                      <p className="text-sm font-semibold text-white">{wk.focus}</p>
                    </div>
                    <ChevronDown className={`h-4 w-4 shrink-0 text-white/30 transition-transform ${openWeek === idx ? "rotate-180" : ""}`} />
                  </button>
                  {openWeek === idx && (
                    <div className="border-t border-white/8 px-5 pb-4 pt-3">
                      <ul className="space-y-2">
                        {wk.tasks.map(t => (
                          <li key={t} className="flex items-center gap-2.5 text-[12px] text-white/60">
                            <Check className={`h-3.5 w-3.5 shrink-0 ${wk.color.replace("bg-", "text-")}`} />
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Design principles ─────────────────────────────── */}
        <section className="bg-white py-14 sm:py-18">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">MVP Principles</span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">What keeps this shippable</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Upload,    title: "Narrow inputs first",   body: "QuickBooks + Xero = 70% of EU SMEs. CSV fallback ensures nothing blocks launch. Add more connectors post-revenue.", color: "bg-violet-100 text-violet-700" },
                { icon: Layers,    title: "No overkill AI",        body: "Rules handle 80% of classification cheaply. GPT-4o-mini catches the rest. Sophisticated LLMs come after product-market fit.", color: "bg-emerald-100 text-emerald-700" },
                { icon: RefreshCw, title: "Audit trail always",    body: "Store the emission factor applied to every transaction. Compliance without traceability is worthless — build this in from day one.", color: "bg-amber-100 text-amber-700" },
                { icon: Database,  title: "Public data only",      body: "DEFRA, EXIOBASE, GHG Protocol factors are free and legally sound. Don't build proprietary factor databases at MVP.", color: "bg-sky-100 text-sky-700" },
              ].map(({ icon: Icon, title, body, color }) => (
                <div key={title} className="rounded-xl border border-slate-100 bg-slate-50 p-5 shadow-sm">
                  <div className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${color}`}>
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-slate-900">{title}</h3>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-slate-500">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────── */}
        <section className="bg-emerald-600 py-14 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Want early access?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/80">
              We&apos;re onboarding the first 20 EU SMEs for free in exchange for feedback. Connect your QuickBooks or Xero, and we&apos;ll generate your first CSRD carbon snapshot at no cost.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/autoesg"
                className="flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-bold text-emerald-700 shadow-lg transition-all hover:bg-emerald-50 hover:shadow-xl"
              >
                <Zap className="h-4 w-4" />
                Launch AutoESG Tool — Free
              </Link>
              <Link
                href="/pricing"
                className="rounded-full border-2 border-white/50 px-8 py-3 text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/10"
              >
                View Pricing
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
              {["No credit card required", "First report free", "Cancel anytime"].map(b => (
                <div key={b} className="flex items-center gap-2 text-sm font-medium text-white/80">
                  <Check className="h-4 w-4 text-white" />
                  {b}
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
