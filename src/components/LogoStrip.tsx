const institutions = [
  "BlackRock",
  "Vanguard",
  "Fidelity",
  "PIMCO",
  "Schroders",
  "Allianz",
  "AXA",
  "Goldman Sachs",
  "JP Morgan",
  "HSBC",
  "UBS",
  "Norges Bank",
];

function Pill({ name }: { name: string }) {
  return (
    <span className="mx-2 inline-flex shrink-0 rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm">
      {name}
    </span>
  );
}

export function LogoStrip() {
  const row = [...institutions, ...institutions];
  return (
    <section className="overflow-hidden border-y border-slate-200 bg-slate-100 py-10">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Trusted by leading investors worldwide
        </p>
      </div>
      <div className="relative mt-6 overflow-hidden">
        <div className="marquee-track pr-8">
          {row.map((name, idx) => (
            <Pill key={`${name}-${idx}`} name={name} />
          ))}
        </div>
      </div>
    </section>
  );
}
