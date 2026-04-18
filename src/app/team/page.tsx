import { Linkedin, Twitter } from "@/src/components/SocialIcons";
import { MapPin, Briefcase, GraduationCap, ArrowRight } from "lucide-react";
import { Navbar } from "@/src/components/Navbar";
import { Footer } from "@/src/components/Footer";

export const metadata = {
  title: "Team — openESG",
  description:
    "Meet the analysts, engineers, and sustainability experts building the world's most trusted independent ESG rating platform.",
};

const leadership = [
  {
    name: "Akul Bharti",
    role: "CEO & Co-Founder",
    location: "London, UK",
    bio: "Former Head of ESG Research at a top-five European asset manager. Led the design of responsible investment frameworks covering $120B AUM before co-founding openESG to solve the data fragmentation problem she faced daily.",
    bg: "bg-emerald-600",
    initials: "SM",
    focus: ["ESG Strategy", "Investor Relations", "Regulatory Affairs"],
  },
  {
    name: "Kirti Bhartiya",
    role: "CTO & Co-Founder",
    location: "Amsterdam, NL",
    bio: "ML engineer with ten years in NLP and information extraction at large-scale data companies. Built the core extraction pipeline that processes 200,000+ sustainability documents annually and keeps every score traceable to its source.",
    bg: "bg-sky-600",
    initials: "JO",
    focus: ["AI & NLP", "Platform Architecture", "Data Engineering"],
  },
  {
    name: "Dr. Priya Sharma",
    role: "Head of ESG Research",
    location: "Singapore",
    bio: "PhD in Environmental Economics from LSE. Formerly at the TCFD Secretariat, where she contributed to the climate scenario guidance. Oversees all methodology decisions, analyst team, and framework alignment at openESG.",
    bg: "bg-teal-600",
    initials: "PS",
    focus: ["Methodology", "Framework Alignment", "Greenwashing Research"],
  },
  {
    name: "Marcus Webb",
    role: "Head of Data Science",
    location: "Toronto, CA",
    bio: "Quantitative researcher who spent eight years building ESG factor models at a global quant fund. Leads scoring model development, sector calibration, and backtesting of greenwashing detection algorithms.",
    bg: "bg-indigo-600",
    initials: "MW",
    focus: ["Scoring Models", "Factor Research", "Data Quality"],
  },
  {
    name: "Leila Fontaine",
    role: "Head of Partnerships",
    location: "Paris, FR",
    bio: "Former investment banker turned sustainability advocate. Built ESG integration programs at two major continental European banks before joining openESG to expand institutional partnerships and framework-body relationships.",
    bg: "bg-rose-600",
    initials: "LF",
    focus: ["Institutional Partnerships", "Business Development", "EU Market"],
  },
  {
    name: "Tom Brannigan",
    role: "Head of Product",
    location: "New York, US",
    bio: "Product leader with fifteen years building fintech and data platforms. Obsessed with turning complex ESG data into interfaces that portfolio managers and analysts actually want to use. Previously VP Product at a Bloomberg LP subsidiary.",
    bg: "bg-amber-600",
    initials: "TB",
    focus: ["Product Strategy", "UX Design", "API Experience"],
  },
];

const advisors = [
  {
    name: "Prof. Anna Lindström",
    title: "Academic Advisor",
    affiliation: "Stockholm School of Economics — Chair of Sustainable Finance",
    bio: "Leading academic in ESG disclosure quality and greenwashing measurement. Her research on non-financial reporting credibility has been cited in EFRAG and ISSB consultations.",
    initials: "AL",
    bg: "bg-emerald-500",
  },
  {
    name: "David Chen",
    title: "Capital Markets Advisor",
    affiliation: "Former Global Head of ESG at a top-three asset manager",
    bio: "Ran one of the world's largest ESG integration programmes, managing over $400B in sustainable assets. Advises openESG on institutional product design and investor relations strategy.",
    initials: "DC",
    bg: "bg-sky-500",
  },
  {
    name: "Rashida Olu",
    title: "Policy Advisor",
    affiliation: "Former TCFD Secretariat · EU Platform on Sustainable Finance",
    bio: "Policy expert who spent six years at the intersection of climate science and financial regulation. Guides openESG's approach to CSRD, SFDR, and emerging biodiversity disclosure requirements.",
    initials: "RO",
    bg: "bg-violet-500",
  },
  {
    name: "Heinrich Müller",
    title: "Technology Advisor",
    affiliation: "Partner, Climate & Sustainability Practice — ex-Google DeepMind",
    bio: "AI researcher and entrepreneur focused on applying large language models to scientific literature and regulatory documents. Advises on NLP model architecture and responsible AI practices.",
    initials: "HM",
    bg: "bg-slate-600",
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
        <section className="relative overflow-hidden bg-dark py-20 sm:py-28">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              The people powering honest ESG intelligence
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-emerald-100/75">
              A team of analysts, data scientists, and sustainability experts united by one conviction: that credible ESG data changes how capital is allocated.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              {["🌍 6 countries", "👩‍💻 40% technical", "📊 50% research & product", "🌱 100% mission-driven"].map((b) => (
                <span key={b} className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-emerald-50/90">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Leadership ───────────────────────── */}
        <section className="bg-white py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Leadership</h2>
            <p className="mt-3 text-base text-slate-600">
              Former asset managers, regulators, engineers, and researchers — brought together by frustration with the status quo in ESG data.
            </p>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

        {/* ── Advisors ─────────────────────────── */}
        <section className="bg-surface py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Advisory Board</h2>
            <p className="mt-3 text-base text-slate-600">
              Independent voices from academia, capital markets, policy, and technology who challenge our methodology and keep us honest.
            </p>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {advisors.map(({ name, title, affiliation, bio, initials, bg }) => (
                <div key={name} className="flex gap-5 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-sm font-bold text-white ${bg}`}>
                    {initials}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{name}</p>
                    <p className="text-sm font-semibold text-primary">{title}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                      <GraduationCap className="h-3 w-3 shrink-0" />{affiliation}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{bio}</p>
                  </div>
                </div>
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
                  <p className="mt-2 text-sm leading-relaxed text-emerald-100/65">{body}</p>
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
