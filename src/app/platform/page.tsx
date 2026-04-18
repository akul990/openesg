import {
  Brain, ShieldAlert, BarChart2, Layers, RefreshCw, Plug,
  Search, Bell, FileDown, Users, Lock, Server, Code2,
  CheckCircle2, TrendingUp, Building2, Briefcase,
} from "lucide-react";
import bgImage from "@/src/assets/bg 3.jpg";
import { Navbar } from "@/src/components/Navbar";
import { Footer } from "@/src/components/Footer";
import { PageHero } from "@/src/components/PageHero";

export const metadata = {
  title: "Platform — openESG",
  description:
    "Explore the openESG platform: AI-powered ratings, peer benchmarking, greenwashing detection, API access, and real-time ESG intelligence.",
};

const capabilities = [
  { icon: Search,    title: "Company Search",        body: "Instantly look up any of 10,000+ rated companies. View headline ESG score, pillar breakdown, framework coverage, and recent controversies." },
  { icon: BarChart2, title: "Portfolio Analysis",     body: "Aggregate ESG scores across a custom portfolio. Identify concentration risk, laggards, and improvement opportunities at a glance." },
  { icon: TrendingUp,title: "Peer Benchmarking",      body: "Compare any company against sector and regional peers on every metric — from carbon intensity to board diversity ratios." },
  { icon: Bell,      title: "Rating Change Alerts",   body: "Subscribe to push notifications or webhook events whenever a company's score changes, a new controversy is flagged, or a disclosure is published." },
  { icon: FileDown,  title: "Report Generation",      body: "Export client-ready PDF and Excel reports with customisable branding, framework mapping tables, and audit evidence references." },
  { icon: Plug,      title: "REST API & Data Feeds",  body: "Integrate openESG data into your own tools via a JSON REST API. Bulk feeds available for quant workflows and internal platforms." },
];

const features = [
  {
    icon: Brain,
    title: "AI-Powered Rating Engine",
    color: "bg-emerald-100 text-emerald-700 ring-emerald-200",
    body: "Our NLP pipeline reads, parses, and scores claims across hundreds of thousands of pages annually — far beyond human capacity. Human analysts review material edge cases and override where needed.",
  },
  {
    icon: ShieldAlert,
    title: "Greenwashing Detection",
    color: "bg-amber-100 text-amber-700 ring-amber-200",
    body: "Proprietary claim-verification logic cross-references corporate narratives against disclosed metrics, regulatory records, and third-party controversy databases to surface misleading sustainability claims.",
  },
  {
    icon: BarChart2,
    title: "Peer Benchmarking",
    color: "bg-sky-100 text-sky-700 ring-sky-200",
    body: "Companies are bucketed into 68 GICS-aligned sectors. Benchmark any score distribution — from headline composite to individual metric level — against industry-specific populations.",
  },
  {
    icon: Layers,
    title: "Multi-Framework Mapping",
    color: "bg-teal-100 text-teal-700 ring-teal-200",
    body: "A single disclosure is simultaneously scored against GRI, SASB, TCFD, CSRD, ISSB, and seven more standards — eliminating the manual reconciliation that consumes analyst time.",
  },
  {
    icon: RefreshCw,
    title: "Real-Time Updates",
    color: "bg-indigo-100 text-indigo-700 ring-indigo-200",
    body: "Scores refresh within 48 hours of a new filing or material event. Market-moving ESG news — environmental fines, labour incidents, governance failures — triggers an immediate re-evaluation.",
  },
  {
    icon: Plug,
    title: "API and Data Feeds",
    color: "bg-slate-100 text-slate-700 ring-slate-200",
    body: "RESTful endpoints for company lookup, portfolio aggregation, screening, and change monitoring. Bulk nightly feeds for data-warehouse ingestion. Rate limits scale with your plan.",
  },
];

const useCases = [
  {
    icon: Building2,
    role: "Portfolio Managers",
    headline: "Screen and monitor at scale",
    points: [
      "Run ESG screens across thousands of securities in seconds",
      "Monitor portfolio-level weighted ESG scores over time",
      "Identify companies approaching exclusion thresholds",
      "Generate SFDR PAI disclosure data automatically",
    ],
  },
  {
    icon: BarChart2,
    role: "ESG Analysts",
    headline: "Go beyond the headline score",
    points: [
      "Drill into individual metric evidence with source citations",
      "Compare across frameworks (GRI vs SASB vs ISSB) simultaneously",
      "Run what-if scenarios on greenwashing-adjusted ratings",
      "Export structured datasets for quantitative modelling",
    ],
  },
  {
    icon: Briefcase,
    role: "Corporate Affairs Teams",
    headline: "Understand how you're perceived",
    points: [
      "Benchmark your organisation against sector peers",
      "Identify disclosure gaps that suppress your ratings",
      "Track competitor ESG positioning in real time",
      "Prepare board-level ESG reporting with evidence packs",
    ],
  },
  {
    icon: Users,
    role: "Compliance & Risk Teams",
    headline: "Satisfy regulators with confidence",
    points: [
      "Map portfolio holdings to CSRD, SFDR, and TCFD requirements",
      "Flag holdings with active environmental or social controversies",
      "Generate audit-ready evidence trails for each rating",
      "Receive early warnings on emerging regulatory-risk sectors",
    ],
  },
];

const security = [
  { title: "SOC 2 Type II",           body: "Annual third-party audit of our security, availability, and confidentiality controls." },
  { title: "GDPR Compliant",          body: "Data processing agreements available. EU data residency option for enterprise clients." },
  { title: "TLS 1.3 Encryption",      body: "All data in transit and at rest is encrypted using industry-standard protocols." },
  { title: "Role-Based Access",       body: "Fine-grained permissions let admins control which team members can access or export data." },
  { title: "99.9% Uptime SLA",        body: "Contractual uptime commitment backed by multi-region redundancy and automated failover." },
  { title: "Penetration Tested",      body: "Annual external pen test with published remediation summary for enterprise clients." },
];

export default function PlatformPage() {
  return (
    <div className="flex min-h-full flex-col bg-white">
      <Navbar />
      <main className="flex-1">

        {/* ── Hero ─────────────────────────────── */}
        <PageHero src={bgImage}>
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <span className="inline-block rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white/75">
              Platform Overview
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              ESG intelligence built for serious investors
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-white/70">
              One platform to search, analyse, benchmark, and monitor ESG performance across 10,000+ companies — powered by AI and mapped to every major framework.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <button type="button" className="rounded-full bg-accent px-7 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-accent/90">
                Request a Demo
              </button>
              <button type="button" className="rounded-full border-2 border-white/80 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                Explore the API
              </button>
            </div>
          </div>
        </PageHero>

        {/* ── Core Capabilities ────────────────── */}
        <section className="bg-white py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Everything your team needs in one place
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-base text-slate-600">
              From a single company lookup to portfolio-level analytics and programmatic data access.
            </p>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {capabilities.map(({ icon: Icon, title, body }) => (
                <div key={title} className="rounded-2xl border border-slate-100 bg-surface p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-bold text-slate-900">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features Deep Dive ───────────────── */}
        <section className="bg-surface py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Under the hood
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-base text-slate-600">
              Six core engines that power every rating, alert, and benchmark on the platform.
            </p>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map(({ icon: Icon, title, color, body }) => (
                <article key={title} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-full ring-2 ${color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-slate-900">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Use Cases ────────────────────────── */}
        <section className="bg-white py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Built for every team in the firm
            </h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {useCases.map(({ icon: Icon, role, headline, points }) => (
                <div key={role} className="rounded-2xl border border-slate-100 bg-surface p-7 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest text-primary">{role}</p>
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-slate-900">{headline}</h3>
                  <ul className="mt-4 space-y-2.5">
                    {points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── API ──────────────────────────────── */}
        <section className="relative overflow-hidden bg-dark py-14 sm:py-20">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-accent">Developer-First</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Plug our data into your stack
                </h2>
                <p className="mt-4 text-base leading-relaxed text-white/70">
                  Our REST API is designed for portfolio systems, quant models, and internal reporting platforms. Every endpoint returns structured JSON with full audit metadata.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-white/70">
                  {[
                    "Company search & full score endpoint",
                    "Portfolio aggregation & screening",
                    "Bulk nightly JSONL data feeds",
                    "Webhook subscriptions for rating changes",
                    "OpenAPI 3.0 spec & Postman collection",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Code2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button type="button" className="mt-8 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent/90">
                  View API Docs
                </button>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 font-mono text-sm">
                <p className="text-emerald-400/70 text-xs mb-3"># GET /v1/companies/{"{ticker}"}/esg</p>
                <pre className="text-white/80 whitespace-pre-wrap leading-relaxed text-xs">{`{
  "ticker": "AAPL",
  "name": "Apple Inc.",
  "composite_score": 74,
  "pillars": {
    "environmental": 68,
    "social": 79,
    "governance": 82
  },
  "frameworks": ["GRI","SASB","TCFD"],
  "greenwashing_flags": 1,
  "last_updated": "2025-11-14",
  "source_documents": 3
}`}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* ── Security ─────────────────────────── */}
        <section className="bg-white py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 justify-center">
              <Lock className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Enterprise-grade security
              </h2>
            </div>
            <p className="mx-auto mt-4 max-w-xl text-center text-base text-slate-600">
              Your data and your clients' data are protected by controls built for institutional requirements.
            </p>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {security.map(({ title, body }) => (
                <div key={title} className="flex gap-4 rounded-xl border border-slate-100 bg-surface p-5">
                  <Server className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-semibold text-slate-900">{title}</p>
                    <p className="mt-1 text-sm text-slate-600">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────── */}
        <section className="bg-dark py-14 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Start with a live demo
            </h2>
            <p className="mt-4 text-base text-white/65">
              We'll walk you through a real portfolio screen, an API call, and a greenwashing case study — all in 30 minutes.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <button type="button" className="rounded-full bg-accent px-7 py-3 text-sm font-semibold text-white shadow transition hover:bg-accent/90">
                Book a Demo
              </button>
              <button type="button" className="rounded-full border-2 border-white/80 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                View Pricing
              </button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
