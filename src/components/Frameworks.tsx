const frameworks: {
  acronym: string;
  name: string;
  description: string;
  tone: "green" | "blue" | "teal";
}[] = [
  {
    acronym: "GRI",
    name: "Global Reporting Initiative",
    description:
      "Comprehensive topic disclosures for impacts on economy, environment, and people.",
    tone: "green",
  },
  {
    acronym: "SASB",
    name: "Sustainability Accounting Standards Board",
    description:
      "Industry-specific metrics that tie sustainability performance to enterprise value.",
    tone: "blue",
  },
  {
    acronym: "TCFD",
    name: "Task Force on Climate-related Financial Disclosures",
    description:
      "Governance, strategy, risk management, and metrics for climate-related financial risk.",
    tone: "blue",
  },
  {
    acronym: "CDP",
    name: "Carbon Disclosure Project",
    description:
      "Investor-grade climate, forests, and water questionnaires used in stewardship programs.",
    tone: "green",
  },
  {
    acronym: "CSRD",
    name: "Corporate Sustainability Reporting Directive",
    description:
      "European double materiality reporting aligned with ESRS for listed and large private firms.",
    tone: "blue",
  },
  {
    acronym: "ISSB",
    name: "International Sustainability Standards Board",
    description:
      "IFRS S1 and S2 baseline for general sustainability and climate disclosures in capital markets.",
    tone: "blue",
  },
  {
    acronym: "UN SDGs",
    name: "UN Sustainable Development Goals",
    description:
      "Mapping corporate programs to globally recognized social and environmental outcome targets.",
    tone: "teal",
  },
  {
    acronym: "SBTi",
    name: "Science Based Targets initiative",
    description:
      "1.5°C-aligned decarbonization pathways reviewed against sector methodologies and timelines.",
    tone: "green",
  },
  {
    acronym: "PRI",
    name: "Principles for Responsible Investment",
    description:
      "Signatory expectations on ESG integration, stewardship, and transparency across asset classes.",
    tone: "blue",
  },
  {
    acronym: "UN Global Compact",
    name: "United Nations Global Compact",
    description:
      "Ten universal principles on human rights, labor, environment, and anti-corruption performance.",
    tone: "teal",
  },
];

const toneStyles = {
  green:
    "border-emerald-100 bg-emerald-50/60 text-emerald-900 ring-emerald-100/80",
  blue: "border-sky-100 bg-sky-50/70 text-sky-950 ring-sky-100/80",
  teal: "border-teal-100 bg-teal-50/70 text-teal-950 ring-teal-100/80",
} as const;

export function Frameworks() {
  return (
    <section className="bg-white py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="mx-auto max-w-3xl text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Built on the world&apos;s leading ESG standards
        </h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {frameworks.map((fw) => (
            <article
              key={fw.acronym}
              className={`rounded-xl border p-5 shadow-sm ring-1 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${toneStyles[fw.tone]}`}
            >
              <p className="text-2xl font-bold tracking-tight">{fw.acronym}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-600/90">
                {fw.name}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                {fw.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
