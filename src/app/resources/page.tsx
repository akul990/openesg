import {
  BookOpen, FileText, Video, Code2, Mail, ArrowRight,
  Globe, Layers, BarChart2, ShieldAlert,
} from "lucide-react";
import bgImage from "@/src/assets/bg-1.webp";
import { Navbar } from "@/src/components/Navbar";
import { Footer } from "@/src/components/Footer";
import { PageHero } from "@/src/components/PageHero";

export const metadata = {
  title: "Resources — openESG",
  description:
    "Guides, framework explainers, a glossary, webinars, and API docs — everything you need to master ESG analysis.",
};

const guides = [
  {
    tag: "Beginner Guide",
    tagColor: "bg-emerald-100 text-emerald-700",
    icon: BookOpen,
    title: "Getting Started with ESG Investing",
    description: "A primer on what ESG scores measure, why they differ across providers, and how institutional investors integrate them into allocation decisions.",
    readTime: "12 min read",
  },
  {
    tag: "Regulatory",
    tagColor: "bg-sky-100 text-sky-700",
    icon: FileText,
    title: "Navigating CSRD: A Practical Handbook",
    description: "Step-by-step guidance on the Corporate Sustainability Reporting Directive — who is in scope, what ESRS topics must be covered, and how to prepare.",
    readTime: "18 min read",
  },
  {
    tag: "Framework Comparison",
    tagColor: "bg-violet-100 text-violet-700",
    icon: Layers,
    title: "GRI vs SASB vs ISSB: Choosing the Right Standard",
    description: "A decision framework that helps teams select, combine, or reconcile the three most widely used ESG reporting standards — with a sector-by-sector matrix.",
    readTime: "15 min read",
  },
  {
    tag: "Due Diligence",
    tagColor: "bg-amber-100 text-amber-700",
    icon: ShieldAlert,
    title: "Identifying Greenwashing: A Due Diligence Checklist",
    description: "Twenty questions analysts should ask before accepting an ESG self-disclosure at face value — with real-world examples and red-flag patterns.",
    readTime: "10 min read",
  },
  {
    tag: "Portfolio",
    tagColor: "bg-teal-100 text-teal-700",
    icon: BarChart2,
    title: "Building a SFDR PAI-Compliant Reporting Process",
    description: "How to collect, aggregate, and disclose the 18 mandatory Principal Adverse Impact indicators required under SFDR Article 8 and Article 9 funds.",
    readTime: "20 min read",
  },
  {
    tag: "Data & API",
    tagColor: "bg-teal-100 text-teal-700",
    icon: Code2,
    title: "Integrating ESG Data into Quant Models",
    description: "Practical patterns for ingesting ESG scores alongside financial data — handling missing values, normalising across sectors, and avoiding look-ahead bias.",
    readTime: "14 min read",
  },
];

const frameworkCards = [
  { acronym: "GRI",           color: "bg-emerald-50 border-emerald-200 text-emerald-800", sub: "Global Reporting Initiative",                   scope: "Comprehensive impact disclosures for economy, environment & people" },
  { acronym: "SASB",          color: "bg-sky-50 border-sky-200 text-sky-800",             sub: "Sustainability Accounting Standards Board",       scope: "Industry-specific, financially material metrics" },
  { acronym: "TCFD",          color: "bg-sky-50 border-sky-200 text-sky-800",             sub: "Task Force on Climate-related Financial Disclosures", scope: "Governance, strategy & risk for climate risk" },
  { acronym: "CSRD",          color: "bg-violet-50 border-violet-200 text-violet-800",    sub: "Corporate Sustainability Reporting Directive",    scope: "EU double-materiality regulation aligned to ESRS" },
  { acronym: "ISSB",          color: "bg-sky-50 border-sky-200 text-sky-800",             sub: "International Sustainability Standards Board",    scope: "IFRS S1 & S2 baseline for capital markets" },
  { acronym: "CDP",           color: "bg-emerald-50 border-emerald-200 text-emerald-800", sub: "Carbon Disclosure Project",                       scope: "Investor-grade climate, forests & water questionnaires" },
  { acronym: "UN SDGs",       color: "bg-teal-50 border-teal-200 text-teal-800",          sub: "UN Sustainable Development Goals",                scope: "Mapping corporate programs to global outcome targets" },
  { acronym: "SBTi",          color: "bg-emerald-50 border-emerald-200 text-emerald-800", sub: "Science Based Targets initiative",                scope: "1.5°C-aligned decarbonisation pathway validation" },
  { acronym: "PRI",           color: "bg-sky-50 border-sky-200 text-sky-800",             sub: "Principles for Responsible Investment",           scope: "ESG integration, stewardship & transparency expectations" },
  { acronym: "UN GC",         color: "bg-teal-50 border-teal-200 text-teal-800",          sub: "UN Global Compact",                               scope: "Ten principles on human rights, labour & environment" },
];

const glossary = [
  { term: "Double Materiality",      def: "The principle that companies should assess both how sustainability issues affect the business (financial materiality) and how the business affects society and the environment (impact materiality). Required under CSRD/ESRS." },
  { term: "PAI — Principal Adverse Impacts", def: "Eighteen mandatory ESG indicators that SFDR Article 8 and 9 funds must disclose, covering GHG emissions, biodiversity, water, social, and governance dimensions." },
  { term: "ESG Integration",         def: "The systematic and explicit inclusion of ESG factors in investment analysis and portfolio construction, as distinct from exclusion screening or impact investing." },
  { term: "Scope 3 Emissions",       def: "Indirect greenhouse gas emissions that occur in a company's value chain — both upstream (suppliers) and downstream (product use, end-of-life). Often the largest share of a company's climate footprint." },
  { term: "Stewardship",             def: "The process by which investors exercise their rights as shareholders — voting, engagement, and escalation — to promote long-term sustainable value creation." },
  { term: "SFDR",                    def: "The EU Sustainable Finance Disclosure Regulation. Requires financial market participants to classify funds as Article 6 (no ESG claim), 8 (promoting ESG characteristics), or 9 (sustainable investment objective)." },
  { term: "Greenwashing",            def: "The practice of making misleading, unsubstantiated, or exaggerated claims about a company's environmental or social performance, whether intentional or through poor disclosure discipline." },
  { term: "Impact Investing",        def: "Investments made with the intention to generate positive, measurable social and environmental impact alongside a financial return, typically requiring evidence of additionality." },
];

const webinars = [
  {
    date: "28 Jan 2026",
    title: "CSRD Year One: Lessons from Early Reporters",
    description: "A panel of sustainability officers and analysts review what the first wave of CSRD-compliant reports reveals — and what gaps remain.",
    tag: "Regulatory",
  },
  {
    date: "12 Feb 2026",
    title: "Quant ESG: Building a Factor Model with openESG Data",
    description: "A live walkthrough of ingesting ESG scores via API, normalising across sectors, and back-testing a simple ESG tilt strategy.",
    tag: "Data & API",
  },
  {
    date: "5 Mar 2026",
    title: "Greenwashing Detection in Practice",
    description: "Our research team walks through five real-world greenwashing cases — how we spotted them, how the market reacted, and what investors missed.",
    tag: "Research",
  },
];

export default function ResourcesPage() {
  return (
    <div className="flex min-h-full flex-col bg-white">
      <Navbar />
      <main className="flex-1">

        {/* ── Hero ─────────────────────────────── */}
        <PageHero src={bgImage}>
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white/75">
              <BookOpen className="h-3.5 w-3.5" /> Knowledge Hub
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              Everything you need to master ESG
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">
              Guides, framework explainers, a practitioner glossary, webinar recordings, and full API documentation — all free.
            </p>
          </div>
        </PageHero>

        {/* ── Featured Guides ──────────────────── */}
        <section className="bg-surface py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Featured guides</h2>
            <p className="mt-3 text-base text-slate-600">Practical, no-hype analysis written by our research team.</p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {guides.map(({ tag, tagColor, icon: Icon, title, description, readTime }) => (
                <article key={title} className="group flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${tagColor}`}>{tag}</span>
                    <Icon className="h-5 w-5 text-slate-400" />
                  </div>
                  <h3 className="mt-4 flex-1 text-base font-bold text-slate-900">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
                  <div className="mt-5 flex items-center justify-between text-sm">
                    <span className="text-slate-400">{readTime}</span>
                    <span className="flex items-center gap-1 font-semibold text-primary transition group-hover:gap-2">
                      Read <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Framework Library ────────────────── */}
        <section className="bg-white py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <Globe className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">Framework library</h2>
            </div>
            <p className="mt-3 max-w-2xl text-base text-slate-600">
              Quick-reference cards for all 10 frameworks openESG scores against — with links to the official standard and our scoring methodology.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {frameworkCards.map(({ acronym, color, sub, scope }) => (
                <div key={acronym} className={`group cursor-pointer rounded-xl border p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${color}`}>
                  <p className="text-2xl font-black">{acronym}</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-slate-600/80">{sub}</p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-700">{scope}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-slate-500 transition group-hover:text-primary">
                    Learn more <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Glossary ─────────────────────────── */}
        <section className="bg-surface py-14 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">ESG Glossary</h2>
            <p className="mt-3 text-base text-slate-600">Plain-English definitions for the terms that matter most.</p>
            <div className="mt-10 space-y-4">
              {glossary.map(({ term, def }) => (
                <div key={term} className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
                  <p className="font-bold text-primary">{term}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{def}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Webinars ─────────────────────────── */}
        <section className="bg-white py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <Video className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">Upcoming webinars</h2>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {webinars.map(({ date, title, description, tag }) => (
                <div key={title} className="flex flex-col rounded-2xl border border-slate-100 bg-surface p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">{tag}</span>
                    <span className="text-xs text-slate-400">{date}</span>
                  </div>
                  <h3 className="mt-4 flex-1 font-bold text-slate-900">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
                  <button type="button" className="mt-5 w-full rounded-full border border-primary/30 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/5">
                    Register Free
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── API Docs CTA ─────────────────────── */}
        <section className="relative overflow-hidden bg-dark py-14 sm:py-20">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <Code2 className="h-10 w-10 text-accent" />
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  API Documentation
                </h2>
                <p className="mt-4 text-base text-white/70">
                  Full OpenAPI 3.0 reference, authentication guide, rate-limit details, example requests in cURL, Python, and JavaScript, and a Postman collection.
                </p>
                <div className="mt-6 flex gap-3">
                  <button type="button" className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent/90">
                    Read the Docs
                  </button>
                  <button type="button" className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                    Get API Key
                  </button>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 font-mono text-xs text-white/75">
                <p className="text-emerald-400/70 mb-2"># Python example</p>
                <pre className="whitespace-pre-wrap leading-relaxed">{`import openesg

client = openesg.Client(api_key="sk-...")

company = client.companies.get("TSLA")
print(company.composite_score)   # 61
print(company.pillars.environmental)  # 54
print(company.greenwashing_flags) # 2`}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* ── Newsletter ───────────────────────── */}
        <section className="bg-surface py-14 sm:py-20">
          <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
            <Mail className="mx-auto h-10 w-10 text-primary" />
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
              The ESG Analyst — our weekly briefing
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Rating changes, framework updates, regulatory moves, and research summaries — every Thursday morning.
            </p>
            <div className="mt-6 flex gap-2">
              <input
                type="email"
                placeholder="you@firm.com"
                className="flex-1 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              <button type="button" className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary/90">
                Subscribe
              </button>
            </div>
            <p className="mt-3 text-xs text-slate-400">No spam. Unsubscribe any time.</p>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
