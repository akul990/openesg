const insights = [
  {
    tone: "bg-emerald-400",
    text: "Strong Scope 1 and 2 disclosure with third-party assurance referenced in the sustainability report.",
  },
  {
    tone: "bg-amber-400",
    text: "Greenwashing flag: Scope 3 targets described without baseline year, boundary, or verification detail.",
  },
  {
    tone: "bg-amber-400",
    text: "Board diversity below sector median based on latest proxy statement and committee composition.",
  },
  {
    tone: "bg-emerald-400",
    text: "Community investment up 34% year over year with project-level outcomes disclosed in the CSR annex.",
  },
];

export function RatingDemo() {
  return (
    <section className="bg-dark py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-sm transition-transform duration-200 hover:-translate-y-0.5 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-lg font-semibold text-white">
                  Acme Corporation
                </p>
                <p className="mt-1 text-sm text-emerald-100/75">
                  Consumer Goods — NYSE: ACM
                </p>
              </div>
              <div className="relative flex h-28 w-28 items-center justify-center">
                <svg
                  className="absolute inset-0 h-28 w-28 -rotate-90 text-accent"
                  viewBox="0 0 120 120"
                  aria-hidden
                >
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    className="fill-none stroke-white/10"
                    strokeWidth="10"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    className="fill-none stroke-current"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${0.74 * (2 * Math.PI * 52)} ${2 * Math.PI * 52}`}
                  />
                </svg>
                <div className="relative text-center">
                  <p className="text-3xl font-bold text-white">74</p>
                  <p className="text-xs font-semibold text-emerald-100/80">
                    /100
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-2 text-xs font-medium uppercase tracking-wide text-emerald-100/70">
              Overall ESG score
            </p>

            <div className="mt-8 space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-emerald-50/90">
                  <span>Environment</span>
                  <span>68</span>
                </div>
                <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="h-full max-w-full w-[68%] rounded-full bg-emerald-500 transition-all duration-500" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-emerald-50/90">
                  <span>Social</span>
                  <span>79</span>
                </div>
                <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="h-full max-w-full w-[79%] rounded-full bg-accent transition-all duration-500" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-emerald-50/90">
                  <span>Governance</span>
                  <span>81</span>
                </div>
                <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="h-full max-w-full w-[81%] rounded-full bg-sky-500 transition-all duration-500" />
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                CSR Rating: B+
              </span>
              {["GRI Aligned", "TCFD Compliant", "SBTi Committed"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-emerald-50/85"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-100/80">
              AI-generated diligence notes
            </h3>
            <div className="grid gap-3">
              {insights.map((item) => (
                <div
                  key={item.text}
                  className="flex gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition-colors duration-200 hover:border-accent/40 hover:bg-white/10"
                >
                  <span
                    className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${item.tone}`}
                    aria-hidden
                  />
                  <p className="text-sm leading-relaxed text-emerald-50/90">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs leading-relaxed text-emerald-100/60">
              Ratings based on publicly disclosed information only.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
