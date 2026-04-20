import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import { frameworks, getFramework } from "@/src/lib/resources/frameworks-data";
import { Navbar } from "@/src/components/Navbar";
import { Footer } from "@/src/components/Footer";

export function generateStaticParams() {
  return frameworks.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const fw = getFramework(slug);
  if (!fw) return {};
  return {
    title: `${fw.acronym} — ${fw.full} | OpenESG`,
    description: `${fw.tagline}. ${fw.summary.slice(0, 160)}`,
  };
}

const STATUS_STYLE = {
  required:    "bg-primary/10 text-primary",
  recommended: "bg-amber-100 text-amber-700",
  optional:    "bg-slate-100 text-slate-600",
};

export default async function FrameworkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const fw = getFramework(slug);
  if (!fw) notFound();

  const related = frameworks.filter((f) => fw.relatedSlugs.includes(f.slug));

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-primary" />

      {/* Breadcrumb */}
      <div className="border-b border-slate-100 bg-surface px-4 py-3 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <Link href="/resources" className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-500 hover:text-primary">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Resources
          </Link>
        </div>
      </div>

      <main className="flex-1">

        {/* Hero */}
        <div className={`border-b px-4 pb-10 pt-10 sm:px-6 ${fw.color}`}>
          <div className="mx-auto max-w-3xl">
            <div className="flex items-start gap-5">
              <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-xl font-black shadow-sm ${fw.color} ${fw.accentText} border`}>
                {fw.acronym}
              </div>
              <div className="flex-1">
                <p className={`text-[11px] font-bold uppercase tracking-widest ${fw.accentText} opacity-70`}>{fw.full}</p>
                <h1 className={`mt-1 text-2xl font-bold sm:text-3xl ${fw.accentText}`}>{fw.tagline}</h1>
              </div>
            </div>

            {/* Meta strip */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                { label: "Launched", value: fw.launched },
                { label: "Governed by", value: fw.governedBy },
                { label: "Audience", value: fw.primaryAudience },
                { label: "Mandatory", value: fw.mandatory ? "Yes" : "Voluntary" },
                { label: "Report Format", value: fw.reportingFormat },
                { label: "Update Cycle", value: fw.updateCycle },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-xl border border-white/60 bg-white/60 px-3 py-2.5 backdrop-blur">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
                  <p className="mt-0.5 text-[11px] font-semibold leading-snug text-slate-700">{value}</p>
                </div>
              ))}
            </div>

            {/* Mandatory scope callout */}
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-white/80 bg-white/70 px-4 py-3">
              <span className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${fw.mandatory ? "bg-primary" : "bg-amber-400"}`} />
              <p className="text-[12px] leading-relaxed text-slate-600">{fw.mandatoryScope}</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-4 py-10 sm:px-6">
          <div className="mx-auto max-w-3xl space-y-10">

            {/* Summary */}
            <section>
              <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">Overview</p>
              <p className="text-base leading-relaxed text-slate-700">{fw.summary}</p>
            </section>

            {/* Why it matters */}
            <section className="rounded-xl border border-primary/20 bg-primary/5 px-5 py-5">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-primary">Why It Matters for ESG Analysis</p>
              <p className="text-sm leading-relaxed text-slate-700">{fw.whyItMatters}</p>
            </section>

            {/* Key requirements */}
            <section>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Key Requirements</p>
              <div className="space-y-3">
                {fw.keyRequirements.map((req) => (
                  <div key={req.label} className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-slate-800">{req.label}</p>
                        <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${STATUS_STYLE[req.status]}`}>
                          {req.status}
                        </span>
                      </div>
                      <p className="mt-1 text-[12px] leading-relaxed text-slate-500">{req.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Detailed sections */}
            {fw.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="mb-3 border-b border-slate-100 pb-2 text-lg font-bold text-slate-900">{section.heading}</h2>
                <p className="mb-3 text-sm leading-relaxed text-slate-600">{section.content}</p>
                {section.bullets && (
                  <ul className="space-y-2 pl-1">
                    {section.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2 text-sm text-slate-600">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {/* Common misconceptions */}
            <section>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Common Misconceptions</p>
              <div className="space-y-3">
                {fw.commonMisconceptions.map((m, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-xl border border-amber-100 bg-amber-50/60 px-4 py-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber-400" />
                    <p className="text-sm leading-relaxed text-slate-700">{m}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* OpenESG note */}
            <section className="rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-5">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-emerald-700">How OpenESG Scores {fw.acronym}</p>
              <p className="text-sm leading-relaxed text-slate-700">{fw.openESGNote}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/platform/companies" className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-[12px] font-bold text-white shadow-sm transition-all hover:bg-primary/90">
                  View {fw.acronym} scores <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <a href={fw.websiteUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-[12px] font-semibold text-slate-600 shadow-sm transition-all hover:border-primary/30 hover:text-primary">
                  Official website <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </section>

          </div>
        </div>

        {/* Related frameworks */}
        {related.length > 0 && (
          <section className="border-t border-slate-100 bg-surface px-4 py-10 sm:px-6">
            <div className="mx-auto max-w-3xl">
              <p className="mb-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">Related Frameworks</p>
              <div className="grid gap-4 sm:grid-cols-3">
                {related.map((r) => (
                  <Link key={r.slug} href={`/resources/frameworks/${r.slug}`}
                    className={`group flex flex-col rounded-xl border p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${r.color}`}>
                    <p className={`text-2xl font-black ${r.accentText}`}>{r.acronym}</p>
                    <p className={`mt-1 text-[10px] font-semibold ${r.accentText} opacity-70`}>{r.full}</p>
                    <p className="mt-2 flex-1 text-[11px] leading-snug text-slate-600">{r.tagline}</p>
                    <span className={`mt-3 flex items-center gap-1 text-[11px] font-semibold opacity-0 transition-opacity group-hover:opacity-100 ${r.accentText}`}>
                      Learn more <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link href="/resources" className="text-sm font-semibold text-primary hover:underline">
                  ← All Resources
                </Link>
              </div>
            </div>
          </section>
        )}

      </main>
      <Footer />
    </div>
  );
}
