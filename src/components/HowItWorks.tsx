import { Fragment } from "react";
import { FileText, Cpu, BarChart3, BadgeCheck } from "lucide-react";
import { Leaf } from "@/src/components/NatureDecor";

const steps = [
  {
    icon: FileText,
    title: "Upload your data in minutes",
    description:
      "Connect your existing reports, financials, or raw CSR data — no consultants, no custom templates, no IT project required.",
  },
  {
    icon: Cpu,
    title: "AI builds your compliance picture",
    description:
      "Our engine automatically extracts metrics, flags gaps, and structures your disclosures against each framework's requirements.",
  },
  {
    icon: BarChart3,
    title: "Gaps surfaced before regulators find them",
    description:
      "Every missing or weak disclosure is highlighted with a plain-English fix — so your team knows exactly what to address next.",
  },
  {
    icon: BadgeCheck,
    title: "Audit-ready report, instantly",
    description:
      "Export investor-grade ESG reports and compliance evidence packs mapped to CSRD, GRI, TCFD, SASB, and ISSB in one click.",
  },
];

export function HowItWorks() {
  return (
    <section id="methodology" className="relative overflow-hidden bg-white py-12 sm:py-20">
      {/* Botanical watermark — bottom-right */}
      <div className="pointer-events-none absolute -bottom-24 -right-24 text-primary opacity-[0.05]" aria-hidden>
        <Leaf size={380} rotate={20} />
      </div>
      {/* Small accent leaf — top-left */}
      <div className="pointer-events-none absolute -left-10 top-10 text-primary opacity-[0.04]" aria-hidden>
        <Leaf size={160} rotate={-140} />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          ESG compliance in four steps — no consultant required
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
