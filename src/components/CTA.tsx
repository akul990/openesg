import { Check } from "lucide-react";

const badges = [
  "Free to get started",
  "Setup in under an hour",
  "CSRD ready",
];

export function CTA() {
  return (
    <section className="bg-dark py-12 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Get ESG-compliant without the consultant fees.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-base text-white/70 sm:text-lg">
          Join companies that automated their ESG compliance in hours, not quarters — no sustainability team, no Big 4 retainer, no six-figure reporting project.
        </p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-primary shadow-lg transition-all duration-200 hover:bg-accent/90 hover:shadow-xl"
          >
            Start Free Today
          </button>
          <button
            type="button"
            className="rounded-full border-2 border-white/80 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-white hover:bg-white/10"
          >
            See a Sample Report
          </button>
        </div>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap sm:gap-8">
          {badges.map((label) => (
            <div
              key={label}
              className="flex items-center gap-2 text-sm font-medium text-white/85"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-accent ring-1 ring-white/10">
                <Check className="h-4 w-4" aria-hidden />
              </span>
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
