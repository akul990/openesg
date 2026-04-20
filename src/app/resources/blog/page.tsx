import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { blogPosts } from "@/src/lib/resources/blog-data";
import { Navbar } from "@/src/components/Navbar";
import { Footer } from "@/src/components/Footer";

export const metadata = {
  title: "ESG & Sustainability Blog — Research, Analysis & Regulatory Updates",
  description:
    "Expert research on ESG ratings methodology, CSRD compliance, greenwashing detection, carbon markets, TNFD nature risk, and sustainable investing. Written by the OpenESG research team.",
};

export default function BlogIndexPage() {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-primary" />

      {/* Breadcrumb */}
      <div className="border-b border-slate-100 bg-surface px-4 py-3 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <Link href="/resources" className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-500 hover:text-primary">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Resources
          </Link>
        </div>
      </div>

      <main className="flex-1 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">ESG &amp; Sustainability Blog</h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-600">
              Expert research on ESG ratings divergence, CSRD compliance, greenwashing detection, carbon credit integrity, TNFD nature risk, and ESG investing — written by the OpenESG research team.
            </p>
          </div>

          {/* Featured post */}
          <Link href={`/resources/blog/${featured.slug}`}
            className={`group mb-12 flex flex-col overflow-hidden rounded-2xl bg-gradient-to-br ${featured.coverGradient} shadow-md transition hover:shadow-xl sm:flex-row`}>
            <div className="flex flex-1 flex-col justify-end p-8 sm:p-10">
              <span className={`self-start rounded-full px-3 py-1 text-[11px] font-bold ${featured.categoryColor}`}>
                {featured.category}
              </span>
              <h2 className="mt-4 text-2xl font-bold leading-tight text-white sm:text-3xl group-hover:underline">
                {featured.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/75 sm:max-w-xl">{featured.excerpt}</p>
              <div className="mt-5 flex flex-wrap items-center gap-4 text-[12px] text-white/60">
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{featured.readTime}</span>
                <span>{featured.author}</span>
                <span>{featured.publishedDate}</span>
              </div>
              <span className="mt-5 flex items-center gap-1.5 text-sm font-bold text-white transition group-hover:gap-2.5">
                Read article <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>

          {/* All other posts */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Link key={post.slug} href={`/resources/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-slate-100 bg-surface p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${post.categoryColor}`}>
                    {post.category}
                  </span>
                  <span className="text-[10px] text-slate-400">{post.publishedDate}</span>
                </div>
                <h3 className="mt-4 flex-1 text-base font-bold leading-snug text-slate-900 group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500 line-clamp-3">{post.excerpt}</p>
                <div className="mt-5 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Clock className="h-3 w-3" /> {post.readTime}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-primary transition group-hover:gap-2">
                    Read <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
