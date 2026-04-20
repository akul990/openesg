import {
  Brain,
  ShieldAlert,
  BarChart2,
  Layers,
  RefreshCw,
  Plug,
} from "lucide-react";
import { Leaf } from "@/src/components/NatureDecor";

const cards = [
  {
    icon: Brain,
    title: "Automated Compliance Scanning",
    description:
      "Upload any report and our AI instantly identifies which regulatory obligations you meet, which you miss, and exactly what's needed to close the gap.",
    circle: "bg-emerald-100 text-emerald-700 ring-emerald-200",
  },
  {
    icon: ShieldAlert,
    title: "Gap Analysis in Plain English",
    description:
      "No jargon. Every missing disclosure is explained in simple language with a specific, actionable fix — designed for teams without a compliance background.",
    circle: "bg-amber-100 text-amber-700 ring-amber-200",
  },
  {
    icon: BarChart2,
    title: "Benchmarking Against Your Peers",
    description:
      "See how your ESG performance compares to sector peers of similar size — so you know whether you're ahead or behind, and where to focus first.",
    circle: "bg-sky-100 text-sky-700 ring-sky-200",
  },
  {
    icon: Layers,
    title: "15+ Frameworks, One Platform",
    description:
      "CSRD, GRI, TCFD, SASB, ISSB — mapped simultaneously from a single data input so you never reconcile the same numbers across five spreadsheets again.",
    circle: "bg-teal-100 text-teal-700 ring-teal-200",
  },
  {
    icon: RefreshCw,
    title: "Regulation Alerts, Always On",
    description:
      "New disclosure rules land constantly. OpenESG monitors every major regulatory update and flags when your compliance posture needs a refresh.",
    circle: "bg-indigo-100 text-indigo-700 ring-indigo-200",
  },
  {
    icon: Plug,
    title: "Affordable for Any Company Size",
    description:
      "Flat-rate plans built for SMBs and growth-stage companies — not enterprise contracts priced at a percentage of AUM. Start for free, scale as you grow.",
    circle: "bg-slate-100 text-slate-700 ring-slate-200",
  },
];

export function Features() {
  return (
    <section id="platform" className="relative overflow-hidden bg-surface py-12 sm:py-20">
      {/* Botanical watermark — top-right corner */}
      <div className="pointer-events-none absolute -right-20 -top-20 text-primary opacity-[0.05]" aria-hidden>
        <Leaf size={340} rotate={-25} />
      </div>
      {/* Botanical watermark — bottom-left corner */}
      <div className="pointer-events-none absolute -bottom-16 -left-16 text-primary opacity-[0.04]" aria-hidden>
        <Leaf size={240} rotate={140} />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="mx-auto max-w-3xl text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Everything a Growing Company Needs for ESG Compliance &amp; Sustainability Reporting
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-full ring-2 ${card.circle}`}
                >
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {card.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
