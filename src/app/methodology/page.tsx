import {
  ShieldCheck, Database, Cpu, BarChart3, BadgeCheck, RefreshCw,
  AlertTriangle, Eye, FileSearch, Globe, Layers, Zap,
} from "lucide-react";
import { Navbar } from "@/src/components/Navbar";
import { Footer } from "@/src/components/Footer";
import { Frameworks } from "@/src/components/Frameworks";

export const metadata = {
  title: "Methodology — openESG",
  description:
    "How openESG collects, extracts, normalises, and scores ESG and CSR data across 10,000+ companies worldwide.",
};

const dataSources = [
  {
    icon: FileSearch,
    title: "Annual & Sustainability Reports",
    body: "Integrated reports, standalone sustainability reports, and CSR disclosures filed directly by companies in structured and unstructured formats.",
  },
  {
    icon: Globe,
    title: "Regulatory Filings",
    body: "SEC 10-K/proxy statements, ESMA-aligned CSRD reports, ASX, LSE, and other exchange sustainability annexes.",
  },
  {
    icon: Layers,
    title: "Voluntary Framework Submissions",
    body: "CDP climate, water, and forests questionnaires; UN Global Compact COPs; SBTi commitments; PRI transparency reports.",
  },
  {
    icon: AlertTriangle,
    title: "Adverse Media & Third-Party Data",
    body: "Structured controversy data, environmental penalties, human-rights incidents, and governance violations sourced from public records and verified news.",
  },
];

const steps = [
  { n: "01", icon: Database,   title: "Collect",   body: "Ingest public filings and disclosures across 60+ countries, normalised to a common document schema." },
  { n: "02", icon: Cpu,        title: "Extract",   body: "NLP models parse quantitative metrics, targets, policies, and narrative ESG claims from each document." },
  { n: "03", icon: Layers,     title: "Normalise",  body: "Extracted data is mapped to our unified metric taxonomy aligned across GRI, SASB, TCFD, CSRD, and ISSB." },
  { n: "04", icon: BarChart3,  title: "Score",     body: "Pillar and sub-dimension scores are weighted by sector materiality and aggregated to a 0–100 composite." },
  { n: "05", icon: Eye,        title: "Validate",  body: "Automated QA checks and human analyst review flag anomalies, missing disclosures, and contradictory claims." },
  { n: "06", icon: BadgeCheck, title: "Publish",   body: "Ratings are released with full evidence trails so every score is auditable back to the source document." },
];

const dimensions = [
  {
    pillar: "E — Environmental",
    color: "bg-emerald-50 border-emerald-200",
    badge: "bg-emerald-100 text-emerald-800",
    items: ["Climate & GHG Emissions", "Energy Transition", "Water & Effluents", "Waste & Circular Economy", "Biodiversity & Land Use", "Supply-Chain Emissions"],
  },
  {
    pillar: "S — Social",
    color: "bg-sky-50 border-sky-200",
    badge: "bg-sky-100 text-sky-800",
    items: ["Labour Standards & Safety", "Supply-Chain Human Rights", "Community Impact", "Diversity, Equity & Inclusion", "Product Safety & Liability", "Data Privacy & Security"],
  },
  {
    pillar: "G — Governance",
    color: "bg-violet-50 border-violet-200",
    badge: "bg-violet-100 text-violet-800",
    items: ["Board Structure & Independence", "Executive Compensation", "Shareholder Rights", "Transparency & Disclosure Quality", "Anti-Corruption & Ethics", "Audit & Risk Oversight"],
  },
];

const updateTypes = [
  { icon: Zap,       title: "Triggered Updates",   body: "Scores refresh automatically within 48 hours when a company publishes a new disclosure, files with a regulator, or a material controversy is confirmed." },
  { icon: RefreshCw, title: "Quarterly Sweeps",     body: "A systematic re-extraction sweep covers all 10,000+ companies each quarter to catch amendments and retroactive restatements." },
  { icon: ShieldCheck, title: "Annual Deep Review", body: "Our analyst team conducts a full methodology review each year, recalibrating sector weights against updated academic research and framework revisions." },
];

export default function MethodologyPage() {
  return (
    <div className="flex min-h-full flex-col bg-white">
      <Navbar />
      <main className="flex-1">

        {/* ── Hero ─────────────────────────────── */}
        <section className="relative overflow-hidden bg-dark py-20 sm:py-28">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-emerald-100/80">
              <ShieldCheck className="h-3.5 w-3.5" /> Independent · Transparent · Rigorous
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              How We Rate ESG Performance
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-emerald-100/75">
              Our ratings are built on public data, AI-powered extraction, and sector-adjusted scoring — with no commercial relationships with the companies we rate.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {["10,000+ Companies", "60+ Countries", "15+ Frameworks", "No Pay-to-Play"].map((b) => (
                <span key={b} className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-emerald-50/90 backdrop-blur">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Independence ─────────────────────── */}
        <section className="bg-white py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary">Our Founding Principle</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Ratings you can trust because we answer to no one but the data
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  Unlike some rating providers, openESG does not accept payment from the companies it evaluates, does not offer consulting services to rated entities, and does not allow commercial relationships to influence scores.
                </p>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  Our analysts operate under a strict conflict-of-interest policy, and every rating is produced from publicly available information that any third party can verify independently.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-slate-700">
                  {["No issuer-paid ratings", "Full source citations for every score", "Published conflict-of-interest policy", "Formal dispute resolution process"].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-surface p-8 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Our commitment in numbers</p>
                <div className="mt-6 grid grid-cols-2 gap-6">
                  {[
                    { v: "100%", l: "Public-data only" },
                    { v: "0",   l: "Issuer-paid ratings" },
                    { v: "48h", l: "Max re-score latency" },
                    { v: "5yr", l: "Historical coverage" },
                  ].map(({ v, l }) => (
                    <div key={l}>
                      <p className="text-3xl font-bold text-primary">{v}</p>
                      <p className="mt-1 text-sm text-slate-500">{l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Data Sources ─────────────────────── */}
        <section className="bg-surface py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Where the data comes from
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-base text-slate-600">
              We ingest over 200,000 documents annually from four primary source categories — all publicly available.
            </p>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {dataSources.map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex gap-5 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Rating Process ───────────────────── */}
        <section className="bg-white py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Six steps from disclosure to rating
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-base text-slate-600">
              Every score follows the same reproducible pipeline — no shortcuts, no black boxes.
            </p>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {steps.map(({ n, icon: Icon, title, body }) => (
                <div key={n} className="relative rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                  <span className="absolute right-5 top-5 text-4xl font-black text-slate-100 select-none">{n}</span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-slate-900">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Scoring Dimensions ───────────────── */}
        <section className="bg-surface py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              What goes into each score
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-base text-slate-600">
              Each of the three pillars is broken into six sub-dimensions, weighted by sector-specific materiality maps derived from SASB and ISSB guidance.
            </p>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {dimensions.map(({ pillar, color, badge, items }) => (
                <div key={pillar} className={`rounded-2xl border p-6 ${color}`}>
                  <h3 className="text-xl font-bold text-slate-900">{pillar}</h3>
                  <ul className="mt-5 space-y-2">
                    {items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${badge}`}>
                          {item.split(" ")[0]}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-slate-500">
              Sector weights are recalibrated annually. Composite score = weighted average of E, S, and G pillars (0–100 scale).
            </p>
          </div>
        </section>

        {/* ── Greenwashing Detection ───────────── */}
        <section className="relative overflow-hidden bg-dark py-14 sm:py-20">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-accent">Greenwashing Detection</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  We flag what others miss
                </h2>
                <p className="mt-4 text-base leading-relaxed text-emerald-100/75">
                  Vague aspirational claims, unverified certifications, scope exclusions, and narrative contradictions are systematically identified before they inflate a rating.
                </p>
                <div className="mt-8 space-y-4">
                  {[
                    { t: "Claim Verification",     b: "Every material ESG claim is cross-referenced against disclosed metrics, third-party audits, and regulatory filings." },
                    { t: "Scope Gap Analysis",      b: "We detect companies that report Scope 1 emissions but omit Scope 3, or disclose targets without a transition plan." },
                    { t: "Controversy Overlay",     b: "Adverse media signals — fines, incidents, litigation — are weighted against self-reported performance to compute a credibility adjustment." },
                    { t: "Temporal Consistency",    b: "Year-on-year metric movements are checked for implausible jumps that often indicate restatements or methodology changes." },
                  ].map(({ t, b }) => (
                    <div key={t} className="flex gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                      <div>
                        <p className="text-sm font-semibold text-white">{t}</p>
                        <p className="mt-1 text-sm text-emerald-100/65">{b}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-emerald-100/60">Red-Flag Categories</p>
                  <ul className="mt-4 space-y-2">
                    {[
                      "Absolute targets without interim milestones",
                      "Net-zero claims with no Scope 3 disclosure",
                      "'Carbon neutral' via offsets only",
                      "Supply-chain certifications that cannot be traced",
                      "Social KPIs that change definition year-on-year",
                      "Board diversity claims not reconciled with proxy filings",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-emerald-100/75">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Update Frequency ─────────────────── */}
        <section className="bg-white py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Ratings that stay current
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-base text-slate-600">
              ESG performance changes continuously. Our three-layer update cycle ensures scores reflect the latest available evidence.
            </p>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {updateTypes.map(({ icon: Icon, title, body }) => (
                <div key={title} className="rounded-2xl border border-slate-100 bg-surface p-7 text-center shadow-sm">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-slate-900">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Frameworks ───────────────────────── */}
        <Frameworks />

        {/* ── CTA ──────────────────────────────── */}
        <section className="bg-dark py-14 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              See our methodology in action
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-emerald-100/70">
              Book a walkthrough and we'll walk you through a live rating — source documents, score breakdown, and greenwashing flags included.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <button type="button" className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-accent/90">
                Request a Demo
              </button>
              <button type="button" className="rounded-full border-2 border-white/80 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                Download Methodology PDF
              </button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
