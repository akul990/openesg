function Ring({
  label,
  value,
  colorClass,
}: {
  label: string;
  value: number;
  colorClass: string;
}) {
  const r = 36;
  const c = 2 * Math.PI * r;
  const dash = (value / 100) * c;
  return (
    <div className="flex flex-col items-center gap-1">
      <svg
        className="h-20 w-20 -rotate-90"
        viewBox="0 0 88 88"
        aria-hidden
      >
        <circle
          cx="44"
          cy="44"
          r={r}
          className="fill-none stroke-white/15"
          strokeWidth="8"
        />
        <circle
          cx="44"
          cy="44"
          r={r}
          className={`fill-none ${colorClass}`}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c}`}
        />
      </svg>
      <span className="text-[10px] font-semibold uppercase tracking-wide text-white/60">
        {label}
      </span>
      <span className="text-sm font-bold text-white">{value}</span>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-dark py-12 sm:py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
      >
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-primary/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            The World&apos;s Most Trusted Independent ESG &amp; CSR Rating
            Platform
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-emerald-100/80 sm:text-lg">
            We evaluate 10,000+ companies across 60 countries using AI-powered
            analysis mapped to GRI, SASB, TCFD, CSRD, and ISSB frameworks.
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-primary shadow-lg transition-all duration-200 hover:bg-accent/90 hover:shadow-xl"
            >
              Search a Company
            </button>
            <button
              type="button"
              className="rounded-full border-2 border-white/80 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-white hover:bg-white/10"
            >
              See How We Rate
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {[
            "10,000+ Companies Rated",
            "60+ Countries",
            "15+ Frameworks",
          ].map((label) => (
            <span
              key={label}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-emerald-50/90 backdrop-blur transition-colors hover:border-accent/40 hover:bg-white/10 sm:text-sm"
            >
              {label}
            </span>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md transition-transform duration-300 hover:-translate-y-0.5 sm:mt-16">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-white">
                Acme Corp — Consumer Goods
              </p>
              <p className="mt-1 text-xs text-emerald-100/70">
                Overall ESG score (public disclosures)
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-white">
                74<span className="text-base font-semibold text-accent">/100</span>
              </p>
            </div>
          </div>
          <div className="mt-6 flex items-end justify-between gap-4">
            <Ring label="E" value={68} colorClass="stroke-emerald-400" />
            <Ring label="S" value={79} colorClass="stroke-accent" />
            <Ring label="G" value={82} colorClass="stroke-sky-400" />
          </div>
        </div>
      </div>
    </section>
  );
}
