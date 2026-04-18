import { Check, X, HelpCircle } from "lucide-react";
import bgImage from "@/src/assets/bg-4.webp";
import { Navbar } from "@/src/components/Navbar";
import { Footer } from "@/src/components/Footer";
import { PageHero } from "@/src/components/PageHero";

export const metadata = {
  title: "Pricing — openESG",
  description: "Transparent, flexible pricing for independent analysts, asset managers, and global institutions.",
};

const tiers = [
  {
    name: "Starter",
    price: "$299",
    period: "/mo",
    tagline: "For independent analysts and boutique research teams",
    cta: "Start Free Trial",
    ctaStyle: "border border-slate-200 bg-white text-slate-800 hover:border-primary/40 hover:text-primary",
    highlight: false,
    features: [
      "500 company profiles",
      "Core E, S, G headline scores",
      "Weekly score refresh",
      "CSV export",
      "5 framework views (GRI, SASB, TCFD, CSRD, ISSB)",
      "Email support (2-day SLA)",
      "Single user seat",
    ],
  },
  {
    name: "Professional",
    price: "$999",
    period: "/mo",
    tagline: "For asset managers running systematic and fundamental ESG sleeves",
    cta: "Talk to Sales",
    ctaStyle: "bg-accent text-white hover:bg-accent/90",
    badge: "Most Popular",
    highlight: true,
    features: [
      "5,000 companies with full pillar & metric scores",
      "Daily score refresh",
      "API access (10,000 calls/mo)",
      "Peer benchmarking & controversy overlays",
      "Greenwashing flag reports",
      "All 15+ framework views",
      "PDF & Excel report generation",
      "3 user seats",
      "Priority Slack support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    tagline: "For global institutions with data licensing and deployment needs",
    cta: "Contact Enterprise",
    ctaStyle: "bg-primary text-white hover:bg-primary/90",
    highlight: false,
    features: [
      "Unlimited companies + full history",
      "Real-time score refresh",
      "Bulk API & nightly data feeds",
      "White-label portals",
      "Custom framework mapping",
      "Dedicated analyst workshops",
      "Unlimited user seats",
      "Contractual SLA + audit logs",
      "Regional data hosting options",
    ],
  },
];

type CheckValue = boolean | "partial";

const comparisonRows: { feature: string; starter: CheckValue; pro: CheckValue; enterprise: CheckValue }[] = [
  { feature: "Company profiles",              starter: true,      pro: true,      enterprise: true      },
  { feature: "ESG headline score",            starter: true,      pro: true,      enterprise: true      },
  { feature: "Metric-level sub-scores",       starter: false,     pro: true,      enterprise: true      },
  { feature: "Greenwashing flags",            starter: false,     pro: true,      enterprise: true      },
  { feature: "Controversy overlay",           starter: false,     pro: true,      enterprise: true      },
  { feature: "Peer benchmarking",             starter: false,     pro: true,      enterprise: true      },
  { feature: "All 15+ frameworks",            starter: "partial", pro: true,      enterprise: true      },
  { feature: "API access",                    starter: false,     pro: true,      enterprise: true      },
  { feature: "Bulk data feeds",               starter: false,     pro: false,     enterprise: true      },
  { feature: "White-label reports",           starter: false,     pro: false,     enterprise: true      },
  { feature: "Custom framework mapping",      starter: false,     pro: false,     enterprise: true      },
  { feature: "Dedicated CSM & workshops",     starter: false,     pro: false,     enterprise: true      },
];

const faqs = [
  {
    q: "What counts as a 'company profile'?",
    a: "Any company you actively query or export within a billing period. Watching a company's score alerts without pulling the full profile does not count against your limit.",
  },
  {
    q: "Can I change plans mid-cycle?",
    a: "Yes. Upgrades take effect immediately and are prorated. Downgrades take effect at the start of the next billing cycle.",
  },
  {
    q: "Do you offer discounts for academic institutions or NGOs?",
    a: "Yes — we offer 50% discounts for verified universities and non-profit organisations engaged in ESG research. Contact us with your institutional email.",
  },
  {
    q: "What data does the API return?",
    a: "Every API endpoint returns composite scores, pillar scores, metric-level scores (Pro/Enterprise), greenwashing flags, source document references, and last-updated timestamps.",
  },
  {
    q: "Is there a free trial?",
    a: "Starter comes with a 14-day free trial — no credit card required. Professional and Enterprise trials are available by arrangement.",
  },
  {
    q: "How is Enterprise pricing determined?",
    a: "Enterprise pricing is based on company coverage, API volume, number of user seats, white-label requirements, and data hosting preferences. We'll scope it in a single call.",
  },
];

function CellIcon({ value }: { value: CheckValue }) {
  if (value === true)      return <Check className="mx-auto h-5 w-5 text-primary" />;
  if (value === false)     return <X     className="mx-auto h-5 w-5 text-slate-300" />;
  return <span className="mx-auto block h-1.5 w-5 rounded-full bg-primary/30" title="Partial" />;
}

export default function PricingPage() {
  return (
    <div className="flex min-h-full flex-col bg-white">
      <Navbar />
      <main className="flex-1">

        {/* ── Hero ─────────────────────────────── */}
        <PageHero src={bgImage}>
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Simple, transparent pricing
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
              No hidden fees. No lock-in. Cancel or change plans any time.
            </p>
            <div className="mt-5 flex justify-center gap-6 text-sm text-white/65">
              {["SOC 2 compliant", "Data updated daily", "14-day free trial"].map((b) => (
                <span key={b} className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-accent" />{b}
                </span>
              ))}
            </div>
          </div>
        </PageHero>

        {/* ── Tiers ────────────────────────────── */}
        <section className="bg-white py-4 sm:py-8">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-3 lg:items-stretch">
              {tiers.map((tier) => (
                <article
                  key={tier.name}
                  className={`relative flex flex-col rounded-2xl p-7 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                    tier.highlight
                      ? "border border-primary/30 bg-primary text-white lg:scale-[1.02] lg:py-9"
                      : "border border-slate-200 bg-white"
                  }`}
                >
                  {tier.badge && (
                    <span className="absolute -top-3.5 left-1/2 w-max -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary">
                      {tier.badge}
                    </span>
                  )}
                  <p className={`text-xs font-bold uppercase tracking-widest ${tier.highlight ? "text-white/80" : "text-slate-500"}`}>
                    {tier.name}
                  </p>
                  <p className={`mt-3 text-5xl font-black ${tier.highlight ? "text-white" : "text-slate-900"}`}>
                    {tier.price}<span className={`text-lg font-semibold ${tier.highlight ? "text-white/80" : "text-slate-400"}`}>{tier.period}</span>
                  </p>
                  <p className={`mt-2 text-sm ${tier.highlight ? "text-white/75" : "text-slate-500"}`}>{tier.tagline}</p>
                  <ul className={`mt-7 flex-1 space-y-2.5 text-sm ${tier.highlight ? "text-white/85" : "text-slate-600"}`}>
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${tier.highlight ? "bg-accent" : "bg-primary"}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button type="button" className={`mt-8 w-full rounded-full py-3 text-sm font-semibold transition ${tier.ctaStyle}`}>
                    {tier.cta}
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Comparison Table ─────────────────── */}
        <section className="bg-surface py-14 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Full feature comparison
            </h2>
            <div className="mt-10 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="py-4 pl-6 text-left font-semibold text-slate-700">Feature</th>
                    {["Starter", "Professional", "Enterprise"].map((h) => (
                      <th key={h} className={`px-4 py-4 text-center font-semibold ${h === "Professional" ? "text-primary" : "text-slate-700"}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map(({ feature, starter, pro, enterprise }, i) => (
                    <tr key={feature} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/60"}>
                      <td className="py-3 pl-6 text-slate-700">{feature}</td>
                      <td className="px-4 py-3"><CellIcon value={starter} /></td>
                      <td className="px-4 py-3"><CellIcon value={pro} /></td>
                      <td className="px-4 py-3"><CellIcon value={enterprise} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-center text-xs text-slate-400">
              <span className="inline-flex items-center gap-1"><span className="inline-block h-1.5 w-4 rounded-full bg-primary/30" /> Partial coverage</span>
            </p>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────── */}
        <section className="bg-white py-14 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-2 mb-8">
              <HelpCircle className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Frequently asked questions</h2>
            </div>
            <div className="space-y-5">
              {faqs.map(({ q, a }) => (
                <div key={q} className="rounded-xl border border-slate-100 bg-surface p-6">
                  <p className="font-semibold text-slate-900">{q}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────── */}
        <section className="bg-dark py-14 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Not sure which plan is right for you?
            </h2>
            <p className="mt-4 text-base text-white/65">
              Our team will help you scope the right plan in a 20-minute call — no hard sell, no obligation.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <button type="button" className="rounded-full bg-accent px-7 py-3 text-sm font-semibold text-white shadow transition hover:bg-accent/90">
                Talk to Us
              </button>
              <button type="button" className="rounded-full border-2 border-white/80 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                Start Free Trial
              </button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
