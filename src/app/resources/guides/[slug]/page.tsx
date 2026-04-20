import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, User, ArrowRight, CheckCircle2, AlertTriangle, Lightbulb, Info, BookOpen } from "lucide-react";
import { guides } from "@/src/lib/resources/guides-data";
import type { Block } from "@/src/lib/resources/guides-data";
import { Navbar } from "@/src/components/Navbar";
import { Footer } from "@/src/components/Footer";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) return {};
  return {
    title: `${guide.title} — OpenESG Resources`,
    description: guide.description,
  };
}

const CALLOUT_STYLES = {
  key:     { bg: "bg-primary/5 border-primary/30",  icon: BookOpen,      iconCls: "text-primary",     titleCls: "text-primary" },
  info:    { bg: "bg-sky-50 border-sky-200",         icon: Info,          iconCls: "text-sky-500",     titleCls: "text-sky-700" },
  warning: { bg: "bg-amber-50 border-amber-200",     icon: AlertTriangle, iconCls: "text-amber-500",   titleCls: "text-amber-700" },
  tip:     { bg: "bg-emerald-50 border-emerald-200", icon: Lightbulb,     iconCls: "text-emerald-500", titleCls: "text-emerald-700" },
};

function RenderBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return <h2 className="mt-10 mb-4 text-xl font-bold text-slate-900 sm:text-2xl border-b border-slate-100 pb-3">{block.text}</h2>;
    case "h3":
      return <h3 className="mt-7 mb-3 text-base font-bold text-slate-800 sm:text-lg">{block.text}</h3>;
    case "p":
      return <p className="mb-4 leading-relaxed text-slate-600">{block.text}</p>;
    case "ul":
      return (
        <ul className="mb-5 space-y-2 pl-1">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-slate-600">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mb-5 space-y-3 pl-1">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-sm text-slate-600">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
                {i + 1}
              </span>
              <span className="pt-0.5">{item}</span>
            </li>
          ))}
        </ol>
      );
    case "callout": {
      const style = CALLOUT_STYLES[block.variant];
      const Icon = style.icon;
      return (
        <div className={`my-6 rounded-xl border px-5 py-4 ${style.bg}`}>
          <div className="flex items-start gap-3">
            <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${style.iconCls}`} />
            <div>
              <p className={`mb-1 text-sm font-bold ${style.titleCls}`}>{block.title}</p>
              <p className="text-sm leading-relaxed text-slate-600">{block.text}</p>
            </div>
          </div>
        </div>
      );
    }
    case "checklist":
      return (
        <div className="my-5 rounded-xl border border-slate-100 bg-slate-50 p-5">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">{block.title}</p>
          <ul className="space-y-2">
            {block.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    case "table":
      return (
        <div className="my-5 overflow-x-auto rounded-xl border border-slate-100 shadow-sm">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-100 bg-slate-50">
              <tr>
                {block.headers.map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 bg-white">
              {block.rows.map((row, ri) => (
                <tr key={ri} className="hover:bg-slate-50">
                  {row.map((cell, ci) => (
                    <td key={ci} className={`px-4 py-3 text-sm leading-relaxed ${ci === 0 ? "font-semibold text-slate-800" : "text-slate-600"}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "code":
      return (
        <div className="my-5 overflow-x-auto rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">{block.lang}</p>
          <pre className="text-sm leading-relaxed text-emerald-300">
            <code>{block.code}</code>
          </pre>
        </div>
      );
    case "divider":
      return <hr className="my-8 border-slate-100" />;
    default:
      return null;
  }
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) notFound();

  const related = guides.filter((g) => guide.relatedSlugs.includes(g.slug));

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      {/* Top accent */}
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
        <div className="bg-surface px-4 pb-10 pt-10 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <span className={`inline-block rounded-full px-3 py-1 text-[11px] font-bold ${guide.tagColor}`}>{guide.tag}</span>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">{guide.title}</h1>
            <p className="mt-3 text-base leading-relaxed text-slate-600">{guide.description}</p>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-[12px] text-slate-400">
              <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{guide.readTime}</span>
              <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" />{guide.author} · {guide.authorRole}</span>
              <span>Updated {guide.lastUpdated}</span>
            </div>
          </div>
        </div>

        {/* Article body */}
        <article className="px-4 py-10 sm:px-6">
          <div className="mx-auto max-w-3xl text-base">
            {guide.blocks.map((block, i) => (
              <RenderBlock key={i} block={block} />
            ))}
          </div>
        </article>

        {/* Related guides */}
        {related.length > 0 && (
          <section className="border-t border-slate-100 bg-surface px-4 py-10 sm:px-6">
            <div className="mx-auto max-w-3xl">
              <p className="mb-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">Related Guides</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {related.map((r) => (
                  <Link key={r.slug} href={`/resources/guides/${r.slug}`}
                    className="group flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                    <div className="flex-1">
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${r.tagColor}`}>{r.tag}</span>
                      <p className="mt-2 text-sm font-semibold text-slate-800 group-hover:text-primary">{r.title}</p>
                      <p className="mt-1 text-[11px] text-slate-500">{r.readTime}</p>
                    </div>
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-slate-300 group-hover:text-primary" />
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
