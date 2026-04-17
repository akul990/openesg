import { Fragment } from "react";
import { FileText, Cpu, BarChart3, BadgeCheck } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "We collect public ESG and CSR reports",
    description:
      "Annual reports, sustainability disclosures, CDP responses, and other filings are ingested in structured form.",
  },
  {
    icon: Cpu,
    title: "AI extracts and structures the data",
    description:
      "Natural language models normalize metrics, targets, and narrative claims for consistent comparison.",
  },
  {
    icon: BarChart3,
    title: "Scored against 15+ global frameworks",
    description:
      "Each disclosure is mapped to GRI, SASB, TCFD, CSRD, ISSB, and other widely used standards.",
  },
  {
    icon: BadgeCheck,
    title: "Independent rating published",
    description:
      "Investors receive an objective score, peer context, and audit-ready evidence trails for diligence.",
  },
];

export function HowItWorks() {
  return (
    <section id="methodology" className="bg-white py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Independent. Transparent. Global.
        </h2>

        <div className="mt-14 md:hidden">
          <div className="flex flex-col gap-0">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="flex gap-4">
                  <div className="flex w-12 flex-col items-center">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
                      <Icon className="h-6 w-6" aria-hidden />
                    </div>
                    <span className="mt-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-md">
                      {index + 1}
                    </span>
                    {index < steps.length - 1 ? (
                      <div
                        className="mt-2 min-h-8 flex-1 border-l-2 border-dashed border-slate-200"
                        aria-hidden
                      />
                    ) : null}
                  </div>
                  <div className="pb-10 pt-0.5">
                    <h3 className="text-base font-semibold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-14 hidden md:flex md:items-stretch md:justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Fragment key={step.title}>
                {index > 0 ? (
                  <div
                    className="mx-2 w-8 shrink-0 self-center border-t-2 border-dashed border-slate-200 lg:mx-4 lg:w-12"
                    aria-hidden
                  />
                ) : null}
                <div className="flex min-w-0 flex-1 flex-col items-center px-1 text-center lg:px-2">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15 transition-transform duration-200 hover:scale-105">
                    <Icon className="h-7 w-7" aria-hidden />
                  </div>
                  <span className="mt-4 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-white shadow-md">
                    {index + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
