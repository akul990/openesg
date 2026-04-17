import {
  Brain,
  ShieldAlert,
  BarChart2,
  Layers,
  RefreshCw,
  Plug,
} from "lucide-react";

const cards = [
  {
    icon: Brain,
    title: "AI-Powered Rating Engine",
    description:
      "NLP extracts and scores claims across thousands of reports automatically, with human oversight on material issues.",
    circle: "bg-emerald-100 text-emerald-700 ring-emerald-200",
  },
  {
    icon: ShieldAlert,
    title: "Greenwashing Detection",
    description:
      "Flags vague, unverified, or contradictory sustainability claims before they skew portfolio-level analytics.",
    circle: "bg-amber-100 text-amber-700 ring-amber-200",
  },
  {
    icon: BarChart2,
    title: "Peer Benchmarking",
    description:
      "Compare any company against sector and regional peers instantly, including distribution of disclosure quality.",
    circle: "bg-sky-100 text-sky-700 ring-sky-200",
  },
  {
    icon: Layers,
    title: "Multi-Framework Mapping",
    description:
      "Scores mapped to GRI, SASB, TCFD, CSRD, ISSB simultaneously so teams stop reconciling spreadsheets by hand.",
    circle: "bg-teal-100 text-teal-700 ring-teal-200",
  },
  {
    icon: RefreshCw,
    title: "Real-Time Updates",
    description:
      "Ratings refresh as new disclosures drop, not once a year—critical when markets react to climate and human rights news.",
    circle: "bg-indigo-100 text-indigo-700 ring-indigo-200",
  },
  {
    icon: Plug,
    title: "API and Data Feeds",
    description:
      "Integrate our ratings into your own tools via REST API for screening, monitoring, and client reporting workflows.",
    circle: "bg-slate-100 text-slate-700 ring-slate-200",
  },
];

export function Features() {
  return (
    <section id="platform" className="bg-surface py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="mx-auto max-w-3xl text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Everything investors need to evaluate ESG performance
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
