"use client";

import Link from "next/link";
import {
  ArrowRight, Check, Zap, RefreshCw, FileText, ShieldAlert,
  Layers, BarChart2, AlertTriangle, TrendingUp, Download,
  LayoutDashboard, BadgeCheck, Globe, Clock,
} from "lucide-react";
import { Navbar } from "@/src/components/Navbar";
import { Footer } from "@/src/components/Footer";

/* ── Data ───────────────────────────────────────────────────────── */
const STEPS = [
  {
    n: "01",
    icon: FileText,
    title: "Connect your data",
    body: "Upload a spreadsheet or connect your accounting software. It takes under two minutes. We handle the rest.",
    color: "bg-primary/10 text-primary",
  },
  {
    n: "02",
    icon: Zap,
    title: "We do the heavy lifting",
    body: "OpenESG reads your data, maps it to ESG categories, and calculates your emissions and scores — automatically, in seconds.",
    color: "bg-accent/20 text-emerald-700",
  },
  {
    n: "03",
    icon: BarChart2,
    title: "Understand your footprint",
    body: "Get a clear view of your carbon emissions by category, trends over time, and how you compare to industry peers.",
    color: "bg-sky-100 text-sky-700",
  },
  {
    n: "04",
    icon: Download,
    title: "Download your report",
    body: "Export a compliance-ready PDF report — structured for CSRD, GRI, and TCFD. Share it with investors, banks, or auditors instantly.",
    color: "bg-amber-100 text-amber-700",
  },
];

const FEATURES = [
  {
    icon: RefreshCw,
    title: "Automated ESG Data Collection",
    desc: "We pull sustainability disclosures, annual reports, and CSR data so you never have to copy and paste again.",
    value: "Save 40+ hours per reporting cycle",
    accent: "bg-primary/10 text-primary",
  },
  {
    icon: Clock,
    title: "Real-Time Tracking",
    desc: "ESG scores and news are refreshed daily and weekly. You're always working with current data, not last year's filing.",
    value: "Never make decisions on stale information",
    accent: "bg-accent/20 text-emerald-700",
  },
  {
    icon: FileText,
    title: "One-Click Report Generation",
    desc: "Generate investor-grade ESG reports in seconds. Pre-structured for CSRD, GRI, TCFD, and SASB — no formatting required.",
    value: "Reports that took months, done in minutes",
    accent: "bg-sky-100 text-sky-700",
  },
  {
    icon: ShieldAlert,
    title: "Greenwashing Detection",
    desc: "We cross-check public sustainability claims against real data. Vague or unsupported claims get flagged — automatically.",
    value: "Protect your reputation and your investors",
    accent: "bg-rose-100 text-rose-700",
  },
  {
    icon: Layers,
    title: "Multi-Framework Mapping",
    desc: "One data input maps simultaneously to GRI, ESRS, TCFD, SASB, and ISSB. No more maintaining five separate spreadsheets.",
    value: "Full framework coverage from a single source",
    accent: "bg-amber-100 text-amber-700",
  },
  {
    icon: Globe,
    title: "Peer Benchmarking",
    desc: "See how any company's ESG performance compares to sector and regional peers — across every metric that matters.",
    value: "Benchmark in seconds, not weeks",
    accent: "bg-violet-100 text-violet-700",
  },
];

const PROBLEMS = [
  {
    title: "Manual ESG reporting is exhausting.",
    body: "It takes months of work, costs tens of thousands in consultant fees, and is already outdated by the time it's published. There has to be a better way.",
  },
  {
    title: "ESG data is scattered everywhere.",
    body: "It lives in PDFs, press releases, annual reports, and spreadsheets across dozens of sources. Tracking it down is a full-time job.",
  },
  {
    title: "Anyone can claim 'sustainable'.",
    body: "Without independent verification, greenwashing goes unchallenged. That's a risk — to investors, to regulators, and to the companies making the claims.",
  },
];

const DELIVERABLES = [
  { icon: LayoutDashboard, label: "Live ESG Dashboard",       desc: "Track emissions, scores, and trends in real time." },
  { icon: FileText,        label: "Downloadable Reports",     desc: "One-click PDF exports formatted for compliance." },
  { icon: BarChart2,       label: "Comparable ESG Scores",    desc: "See how you stack up against sector peers." },
  { icon: ShieldAlert,     label: "Weekly Greenwashing Alerts", desc: "Get notified when claims don't match reality." },
  { icon: Layers,          label: "Framework Coverage Map",   desc: "GRI, ESRS, TCFD, SASB — all in one place." },
  { icon: Download,        label: "Structured Data Exports",  desc: "Clean CSV and JSON for your own analysis tools." },
];

const TRUST = [
  {
    icon: BadgeCheck,
    title: "Built on verified data",
    body: "Every score comes from primary source disclosures — annual reports, regulatory filings, and official ESG publications. Not aggregators. Not estimates.",
  },
  {
    icon: FileText,
    title: "Every number is traceable",
    body: "Full methodology and source attribution behind every score and metric. You can always see where a number came from and why.",
  },
  {
    icon: RefreshCw,
    title: "Always current",
    body: "ESG data changes constantly. New filings, revised targets, greenwashing incidents — we track it all and update scores as it happens.",
  },
];

/* ── Page ───────────────────────────────────────────────────────── */
export default function AutomatePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">

        {/* ── 1. Hero ──────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-dark py-20 sm:py-28">
          {/* Subtle grid texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "48px 48px" }}
            aria-hidden
          />
          {/* Glow blobs */}
          <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-primary/25 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-accent/15 blur-3xl" aria-hidden />

          <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            {/* Eyebrow */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white/70 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              ESG Automation Platform
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
              Your ESG data,{" "}
              <span className="text-accent">always up to date.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
              OpenESG automatically collects sustainability data, maps it to global frameworks, detects greenwashing, and delivers clean reports — without the manual work, the spreadsheets, or the consultant fees.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/autoesg"
                className="flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 hover:shadow-xl"
              >
                <Zap className="h-4 w-4" />
                Start Automating Free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#how-it-works"
                className="rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white/80 transition-all hover:border-white/40 hover:bg-white/10"
              >
                See How It Works
              </a>
            </div>

            {/* Social proof strip */}
            <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { stat: "15+",    label: "Reporting frameworks supported"  },
                { stat: "Daily",  label: "ESG data updates"                },
                { stat: "< 5 min",label: "Time to your first report"       },
                { stat: "100%",   label: "Automated — no manual work"      },
              ].map(({ stat, label }) => (
                <div key={label} className="rounded-2xl border border-white/8 bg-white/5 px-4 py-4 backdrop-blur">
                  <p className="text-xl font-black text-accent">{stat}</p>
                  <p className="mt-1 text-[10px] leading-snug text-white/50">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 2. How It Works ──────────────────────────────────── */}
        <section id="how-it-works" className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-14 text-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">How It Works</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                From raw data to clear insights — in four steps.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-slate-500">
                No setup complexity. No learning curve. Just connect and go.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.n} className="relative flex flex-col rounded-2xl border border-slate-100 bg-surface p-6 shadow-sm">
                    {/* Step number watermark */}
                    <span className="absolute right-4 top-3 font-mono text-4xl font-black text-slate-100 select-none">
                      {step.n}
                    </span>
                    <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${step.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">{step.title}</h3>
                    <p className="mt-2 text-[12px] leading-relaxed text-slate-500">{step.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 3. Key Features ──────────────────────────────────── */}
        <section className="bg-surface py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Features</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Everything you need to stay ESG-ready.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-slate-500">
                Built for teams who don&apos;t have time to become ESG experts — but can&apos;t afford to get it wrong.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f) => {
                const Icon = f.icon;
                return (
                  <article key={f.title} className="group flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                    <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${f.accent}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">{f.title}</h3>
                    <p className="mt-2 flex-1 text-[12px] leading-relaxed text-slate-500">{f.desc}</p>
                    <div className="mt-4 flex items-center gap-1.5 text-[11px] font-semibold text-primary">
                      <Check className="h-3.5 w-3.5 shrink-0" />
                      {f.value}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 4. Why It Matters ────────────────────────────────── */}
        <section className="bg-dark py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-accent">Why It Matters</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                ESG reporting is broken.<br className="hidden sm:block" /> We&apos;re fixing it.
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              {PROBLEMS.map((p, i) => (
                <div key={p.title} className="rounded-2xl border border-white/8 bg-white/5 p-6">
                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-white/8 text-sm font-black text-accent">
                    0{i + 1}
                  </div>
                  <h3 className="text-base font-bold text-white">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{p.body}</p>
                </div>
              ))}
            </div>

            {/* Solution statement */}
            <div className="mt-8 rounded-2xl border border-primary/30 bg-primary/10 px-6 py-5">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-white">OpenESG automates all of this.</p>
                  <p className="mt-0.5 text-sm text-white/55">
                    Collect → structure → analyze → report. One platform. No manual work. No consultant needed.
                  </p>
                </div>
                <Link
                  href="/autoesg"
                  className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-primary/90"
                >
                  Get started <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. What You Get ──────────────────────────────────── */}
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Outputs</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                What you actually get.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-slate-500">
                No black boxes. Here&apos;s exactly what OpenESG delivers — every time you run a report.
              </p>
            </div>

            {/* Deliverables grid */}
            <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {DELIVERABLES.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-surface p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{label}</p>
                    <p className="mt-0.5 text-[12px] text-slate-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Live dashboard mockup */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
              {/* Window chrome */}
              <div className="flex items-center gap-2 border-b border-slate-100 bg-surface px-5 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-primary/60" />
                <span className="ml-3 text-[11px] font-medium text-slate-400">OpenESG — ESG Dashboard</span>
                <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary">Live</span>
              </div>

              <div className="p-6">
                {/* Company header */}
                <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Acme GmbH · FY 2025</p>
                    <p className="mt-1 text-2xl font-black text-slate-900">
                      142.7 <span className="text-sm font-semibold text-slate-400">tCO₂e total</span>
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-bold text-amber-700">↑ +12% vs last quarter</span>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold text-primary">Scope 1 · 2 · 3</span>
                    <span className="rounded-full bg-sky-100 px-3 py-1 text-[10px] font-bold text-sky-700">GRI Aligned</span>
                  </div>
                </div>

                {/* Emission bars */}
                <div className="space-y-3">
                  {[
                    { label: "Transport & Travel",  pct: 42, val: "59.9 t", color: "bg-rose-400" },
                    { label: "Energy & Utilities",  pct: 28, val: "39.9 t", color: "bg-amber-400" },
                    { label: "Supply Chain Spend",  pct: 18, val: "25.7 t", color: "bg-violet-400" },
                    { label: "Facilities & Other",  pct: 12, val: "17.1 t", color: "bg-slate-300" },
                  ].map((row) => (
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

                {/* Insight chips */}
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-[10px] font-semibold text-rose-700">
                    <AlertTriangle className="h-3 w-3" />
                    Transport is your #1 emission source
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[10px] font-semibold text-primary">
                    <TrendingUp className="h-3 w-3" />
                    Below sector median for your size
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[10px] font-semibold text-sky-700">
                    <FileText className="h-3 w-3" />
                    CSRD report ready to export
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. Trust Layer ───────────────────────────────────── */}
        <section className="bg-surface py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Why Trust Us</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Data you can rely on.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-slate-500">
                ESG data is only useful if it&apos;s accurate, transparent, and current. We take all three seriously.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {TRUST.map(({ icon: Icon, title, body }) => (
                <div key={title} className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-500">{body}</p>
                </div>
              ))}
            </div>

            {/* Framework logos strip */}
            <div className="mt-10 rounded-2xl border border-slate-100 bg-white px-6 py-5">
              <p className="mb-4 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400">Frameworks Covered</p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {["GRI", "CSRD", "ESRS", "TCFD", "SASB", "ISSB", "UNGC", "CDP", "ISO 14001"].map((fw) => (
                  <span key={fw} className="rounded-full border border-primary/15 bg-primary/5 px-3.5 py-1.5 text-[11px] font-bold text-primary">
                    {fw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 7. CTA ───────────────────────────────────────────── */}
        <section className="bg-dark py-16 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            {/* Eyebrow */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Get started today
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Stop doing ESG<br className="hidden sm:block" /> reporting manually.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/55">
              Start automating today. No consultants, no spreadsheets, no six-month projects. Just clean data and clear reports — from the moment you sign up.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/autoesg"
                className="flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 hover:shadow-xl"
              >
                <Zap className="h-4 w-4" />
                Start Automating Free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/pricing"
                className="rounded-full border-2 border-white/20 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5"
              >
                View Pricing
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
              {[
                "Free to get started",
                "No credit card required",
                "First report in under 5 minutes",
              ].map((b) => (
                <div key={b} className="flex items-center gap-2 text-sm font-medium text-white/50">
                  <Check className="h-4 w-4 text-accent" />
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
