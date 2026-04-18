import { Linkedin, Twitter } from "@/src/components/SocialIcons";
import { MapPin, Briefcase, ArrowRight } from "lucide-react";
import bgImage from "@/src/assets/bg 2.jpg";
import { Navbar } from "@/src/components/Navbar";
import { Footer } from "@/src/components/Footer";
import { PageHero } from "@/src/components/PageHero";

export const metadata = {
  title: "Team — openESG",
  description:
    "Meet the analysts, engineers, and sustainability experts building the world's most trusted independent ESG rating platform.",
};

const leadership = [
  {
    name: "Akul Bharti",
    role: "CEO & Co-Founder",
    location: "India",
    bio: "Visionary leader driving openESG's mission to make ESG and CSR ratings transparent, independent, and accessible. Focused on building the platform's strategy, investor relationships, and regulatory alignment.",
    bg: "bg-emerald-600",
    initials: "AB",
    focus: ["ESG Strategy", "Investor Relations", "Regulatory Affairs"],
  },
  {
    name: "Kirti Bhartiya",
    role: "CTO & Co-Founder",
    location: "India",
    bio: "Technology architect behind openESG's AI-powered rating engine. Leads the NLP pipeline, data engineering infrastructure, and platform architecture — ensuring every score is traceable to its public source.",
    bg: "bg-sky-600",
    initials: "KB",
    focus: ["AI & NLP", "Platform Architecture", "Data Engineering"],
  },
];

const values = [
  {
    title: "Independence First",
    body: "We answer to investors and data, not the companies we rate. No issuer-paid ratings. Ever.",
    n: "01",
  },
  {
    title: "Radical Transparency",
    body: "Every score ships with its evidence trail. If you can't see the source, the score doesn't count.",
    n: "02",
  },
  {
    title: "Scientific Rigour",
    body: "We apply quantitative methods, sector-calibrated weights, and peer review to everything we publish.",
    n: "03",
  },
  {
    title: "Accessible Intelligence",
    body: "ESG shouldn't be locked behind prohibitive data costs. We're pricing for the whole market, not just the top five.",
    n: "04",
  },
];

const openRoles = [
  { title: "Senior ESG Analyst",    dept: "Research",    location: "London / Remote",  type: "Full-time" },
  { title: "ML Engineer — NLP",     dept: "Engineering", location: "Amsterdam / Remote", type: "Full-time" },
  { title: "Product Designer",      dept: "Product",     location: "Remote",            type: "Full-time" },
];

export default function TeamPage() {
  return (
    <div className="flex min-h-full flex-col bg-white">
      <Navbar />
      <main className="flex-1">

        {/* ── Hero ─────────────────────────────── */}
        <PageHero src={bgImage}>
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              The people powering honest ESG intelligence
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-white/70">
              A team of analysts, data scientists, and sustainability experts united by one conviction: that credible ESG data changes how capital is allocated.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              {["🌍 6 countries", "👩‍💻 40% technical", "📊 50% research & product", "🌱 100% mission-driven"].map((b) => (
                <span key={b} className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white/85">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </PageHero>

        {/* ── Leadership ───────────────────────── */}
        <section className="bg-white py-14 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Founders</h2>
            <p className="mt-3 text-base text-slate-600">
              Built from the ground up by two founders on a mission to make ESG data honest, transparent, and accessible to everyone.
            </p>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {leadership.map(({ name, role, location, bio, bg, initials, focus }) => (
                <article key={name} className="flex flex-col rounded-2xl border border-slate-100 bg-surface p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <div className="flex items-center gap-4">
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-bold text-white shadow-md ${bg}`}>
                      {initials}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{name}</p>
                      <p className="text-sm text-primary font-medium">{role}</p>
                      <p className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                        <MapPin className="h-3 w-3" />{location}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">{bio}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {focus.map((f) => (
                      <span key={f} className="rounded-full bg-primary/8 px-2.5 py-0.5 text-[11px] font-medium text-primary">
                        {f}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-3 text-slate-400">
                    <button type="button" aria-label="LinkedIn" className="transition hover:text-primary"><Linkedin className="h-4 w-4" /></button>
                    <button type="button" aria-label="Twitter"  className="transition hover:text-primary"><Twitter  className="h-4 w-4" /></button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Values ───────────────────────────── */}
        <section className="relative overflow-hidden bg-dark py-14 sm:py-20">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
              What we stand for
            </h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map(({ title, body, n }) => (
                <div key={title} className="relative rounded-2xl border border-white/10 bg-white/5 p-6">
                  <span className="absolute right-5 top-4 text-5xl font-black text-white/5 select-none">{n}</span>
                  <h3 className="text-lg font-bold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Careers ──────────────────────────── */}
        <section className="bg-white py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
              <div>
                <Briefcase className="h-8 w-8 text-primary" />
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Join the team
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  We're a remote-first team hiring researchers, engineers, and product thinkers who want to make ESG data more reliable, more transparent, and more accessible.
                </p>
                <p className="mt-3 text-base leading-relaxed text-slate-600">
                  We offer competitive salaries, meaningful equity, generous leave, and a mission you'll actually want to tell people about at dinner parties.
                </p>
              </div>
              <div className="space-y-4">
                {openRoles.map(({ title, dept, location, type }) => (
                  <div key={title} className="group flex items-center justify-between rounded-xl border border-slate-100 bg-surface p-5 shadow-sm transition hover:border-primary/30 hover:shadow-md">
                    <div>
                      <p className="font-bold text-slate-900">{title}</p>
                      <div className="mt-1 flex flex-wrap gap-3 text-xs text-slate-500">
                        <span>{dept}</span>
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{location}</span>
                        <span>{type}</span>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-primary" />
                  </div>
                ))}
                <p className="text-sm text-slate-500">
                  Don't see a perfect fit?{" "}
                  <button type="button" className="font-semibold text-primary underline underline-offset-2 hover:no-underline">
                    Send us a speculative application.
                  </button>
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
