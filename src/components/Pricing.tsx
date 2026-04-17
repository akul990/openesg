export function Pricing() {
  return (
    <section id="pricing" className="bg-slate-50 py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Simple, transparent pricing
        </h2>
        <div className="mt-12 grid gap-6 pb-2 lg:grid-cols-3 lg:items-stretch lg:pb-4">
          <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Starter
            </p>
            <p className="mt-3 text-4xl font-bold text-slate-900">$299/mo</p>
            <p className="mt-2 text-sm font-medium text-slate-600">
              For independent analysts and boutique research teams
            </p>
            <ul className="mt-6 flex-1 space-y-3 text-sm text-slate-600">
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                500 company profiles with core ESG headline scores
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                Basic E, S, and G sub-scores refreshed weekly
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                CSV export for models and client memos
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                Email support with two-business-day response
              </li>
            </ul>
            <button
              type="button"
              className="mt-8 w-full rounded-full border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-800 transition-all duration-200 hover:border-primary/40 hover:text-primary"
            >
              Start Starter Plan
            </button>
          </article>

          <article className="relative flex flex-col rounded-2xl border border-primary/30 bg-primary p-6 text-white shadow-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xl sm:p-8 lg:scale-[1.02] lg:py-10">
            <span className="absolute -top-3 left-1/2 w-max -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary">
              Most Popular
            </span>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-100">
              Professional
            </p>
            <p className="mt-3 text-4xl font-bold">$999/mo</p>
            <p className="mt-2 text-sm font-medium text-emerald-50/90">
              For asset managers running systematic and fundamental ESG sleeves
            </p>
            <ul className="mt-6 flex-1 space-y-3 text-sm text-emerald-50/95">
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                5,000 companies with full pillar, theme, and metric-level scores
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                API access for up to 10,000 calls per month
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                Peer benchmarking, greenwashing flags, and controversy overlays
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                Priority support with shared Slack channel
              </li>
            </ul>
            <button
              type="button"
              className="mt-8 w-full rounded-full bg-accent py-3 text-sm font-semibold text-primary transition-all duration-200 hover:bg-accent/90"
            >
              Talk to Sales
            </button>
          </article>

          <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Enterprise
            </p>
            <p className="mt-3 text-4xl font-bold text-slate-900">Custom</p>
            <p className="mt-2 text-sm font-medium text-slate-600">
              For global institutions with data licensing and deployment needs
            </p>
            <ul className="mt-6 flex-1 space-y-3 text-sm text-slate-600">
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                Full historical database with cross-border coverage
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                White-label portals and bulk API for internal platforms
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                Dedicated analyst workshops and methodology deep dives
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                Contractual SLAs, audit logs, and regional hosting options
              </li>
            </ul>
            <button
              type="button"
              className="mt-8 w-full rounded-full bg-primary py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-primary/90"
            >
              Contact Enterprise
            </button>
          </article>
        </div>
      </div>
    </section>
  );
}
