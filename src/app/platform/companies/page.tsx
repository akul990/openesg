"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Navbar } from "@/src/components/Navbar";
import { Footer } from "@/src/components/Footer";
import { Search, MapPin, TrendingUp, TrendingDown, Minus, ChevronLeft, X, Building2, Users, DollarSign, ChevronDown, Check, Download, FileText, BarChart2 } from "lucide-react";

/* ── Animated dropdown ──────────────────────────────────────────── */
function Dropdown({ value, onChange, options, placeholder }: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative flex-1">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full items-center justify-between gap-2 rounded-xl border bg-white px-3 py-2 text-xs font-medium transition-colors ${
          open ? "border-primary text-slate-800 shadow-sm" : "border-slate-200 text-slate-600 hover:border-slate-300"
        }`}
      >
        <span className="truncate">{selected?.label ?? placeholder}</span>
        <ChevronDown className={`h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Animated dropdown panel */}
      <div
        className={`absolute left-0 right-0 top-[calc(100%+6px)] z-50 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg transition-all duration-200 origin-top ${
          open ? "opacity-100 scale-y-100 translate-y-0" : "opacity-0 scale-y-95 -translate-y-1 pointer-events-none"
        }`}
      >
        <ul className="max-h-56 overflow-y-auto py-1">
          {options.map((opt) => (
            <li key={opt.value}>
              <button
                type="button"
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={`flex w-full items-center justify-between px-3 py-2 text-xs transition-colors ${
                  opt.value === value
                    ? "bg-emerald-50 font-semibold text-primary"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {opt.label}
                {opt.value === value && <Check className="h-3 w-3 text-primary" />}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ── 15 companies ───────────────────────────────────────────────── */
const companies = [
  { name: "Ørsted A/S",               ticker: "ORSTED",   sector: "Renewable Energy",   country: "Denmark",     score: 93, e: 96, s: 91, g: 92, csr: "A+",  frameworks: ["GRI","TCFD","CDP","CSRD"], frameworkRatings: { GRI: "A",  TCFD: "A",  CDP: "A",  CSRD: "A"  }, hq: "Fredericia, Denmark",    employees: "7,600",   revenue: "$10.5B", tags: ["Offshore Wind","Clean Energy","Net Zero","Sustainability Leader"],    badge: { label: "Global #1 in Sustainability", icon: "🌍", color: "from-emerald-500 to-teal-500" }, about: "Ørsted is the world's most sustainable energy company, having transformed from fossil fuels into a global leader in offshore wind. Its mission is to create a world that runs entirely on green energy." },
  { name: "Vestas Wind Systems",       ticker: "VWS",      sector: "Renewable Energy",   country: "Denmark",     score: 91, e: 95, s: 89, g: 90, csr: "A+",  frameworks: ["GRI","TCFD","ISSB"],        frameworkRatings: { GRI: "A",  TCFD: "A",  ISSB: "A"  },             hq: "Aarhus, Denmark",         employees: "29,000",  revenue: "$15.4B", tags: ["Wind Turbines","Renewable Energy","Global OEM","Carbon Neutral"],     badge: { label: "Wind Energy Pioneer",          icon: "💨", color: "from-sky-500 to-emerald-500" }, about: "Vestas is the world's largest wind turbine manufacturer, with 170+ GW of installed capacity across 88 countries. The company has been carbon neutral since 2023 and aims to be carbon neutral across its full value chain by 2030." },
  { name: "Schneider Electric SE",     ticker: "SU",       sector: "Industrials",        country: "France",      score: 88, e: 90, s: 86, g: 88, csr: "A",   frameworks: ["GRI","TCFD","CSRD"],        frameworkRatings: { GRI: "A",  TCFD: "A",  CSRD: "A-" },             hq: "Rueil-Malmaison, France", employees: "135,000", revenue: "$37.4B", tags: ["Energy Management","Smart Grid","Digital Automation","Decarbonisation"],badge: { label: "Energy Efficiency Leader",      icon: "⚡", color: "from-green-500 to-emerald-600" }, about: "Schneider Electric is a global specialist in energy management and automation. Its EcoStruxure platform helps organisations digitise and decarbonise operations — making it one of the most purpose-driven industrial companies worldwide." },
  { name: "Iberdrola S.A.",            ticker: "IBE",      sector: "Utilities",          country: "Spain",       score: 87, e: 91, s: 84, g: 86, csr: "A",   frameworks: ["GRI","TCFD"],               frameworkRatings: { GRI: "A-", TCFD: "A"  },                         hq: "Bilbao, Spain",           employees: "41,000",  revenue: "$46.4B", tags: ["Green Power","Wind & Solar","Global Utilities","Low Carbon"],          badge: { label: "Green Utility Champion",        icon: "🌿", color: "from-teal-500 to-green-600" },  about: "Iberdrola is one of the world's largest electric utilities, producing over 80% of its energy from renewable sources. A pioneer of the global energy transition, the company invests more in renewables than any other utility." },
  { name: "SAP SE",                    ticker: "SAP",      sector: "Technology",         country: "Germany",     score: 85, e: 83, s: 87, g: 86, csr: "A",   frameworks: ["GRI","CSRD","ISSB"],        frameworkRatings: { GRI: "A",  CSRD: "A",  ISSB: "A-" },             hq: "Walldorf, Germany",       employees: "105,000", revenue: "$35.4B", tags: ["Enterprise Software","Cloud ERP","Sustainability Tech","AI"],           badge: { label: "Carbon Neutral Since 2023",     icon: "♻️", color: "from-emerald-600 to-cyan-500" },  about: "SAP is the market leader in enterprise application software, powering 99 of the 100 largest companies globally. SAP's sustainability solutions help customers measure and reduce their own environmental footprint at scale." },
  { name: "Unilever plc",              ticker: "ULVR",     sector: "Consumer Staples",   country: "UK",          score: 84, e: 88, s: 82, g: 79, csr: "A–",  frameworks: ["GRI","TCFD","CDP"],         frameworkRatings: { GRI: "A",  TCFD: "A-", CDP: "A-"  },             hq: "London, UK",              employees: "128,000", revenue: "$62.2B", tags: ["FMCG","Sustainable Brands","Consumer Goods","Plastic Reduction"],       badge: { label: "Sustainable Living Brand",      icon: "🌱", color: "from-green-500 to-teal-400" },   about: "Unilever owns 400+ consumer brands including Dove, Ben & Jerry's, and Hellmann's. Its Compass strategy commits to halving environmental footprint while improving health and wellbeing for 1 billion people by 2030." },
  { name: "Salesforce Inc.",           ticker: "CRM",      sector: "Technology",         country: "USA",         score: 83, e: 80, s: 85, g: 84, csr: "A",   frameworks: ["GRI","TCFD","SASB"],        frameworkRatings: { GRI: "A-", TCFD: "A",  SASB: "A-" },             hq: "San Francisco, USA",      employees: "72,000",  revenue: "$34.9B", tags: ["CRM","Cloud Software","ESG Tools","Net Zero Cloud"],                   badge: { label: "Net Zero Cloud Leader",         icon: "☁️", color: "from-cyan-500 to-teal-500" },    about: "Salesforce is the world's leading CRM platform, trusted by 150,000+ companies. It achieved net-zero residual emissions in 2021 and operates on 100% renewable energy, while offering its customers dedicated ESG reporting tools." },
  { name: "Enel SpA",                  ticker: "ENEL",     sector: "Utilities",          country: "Italy",       score: 83, e: 86, s: 81, g: 82, csr: "A",   frameworks: ["GRI","TCFD"],               frameworkRatings: { GRI: "A",  TCFD: "A-" },                         hq: "Rome, Italy",             employees: "65,000",  revenue: "$99.9B", tags: ["Renewable Utilities","Solar","Wind Power","Just Transition"],           badge: { label: "Renewable Energy Leader",       icon: "☀️", color: "from-amber-500 to-emerald-500" }, about: "Enel is Europe's largest utility and a global renewable energy leader with 60+ GW of renewable capacity across 30 countries. The company's Open Power strategy drives the just transition to a sustainable energy model." },
  { name: "Roche Holding AG",          ticker: "ROG",      sector: "Healthcare",         country: "Switzerland", score: 82, e: 80, s: 84, g: 83, csr: "A",   frameworks: ["GRI","SASB","TCFD"],        frameworkRatings: { GRI: "A",  SASB: "A",  TCFD: "B+"  },            hq: "Basel, Switzerland",      employees: "103,000", revenue: "$58.7B", tags: ["Pharmaceuticals","Diagnostics","Biotech","Access to Medicine"],         badge: { label: "Sustainable Healthcare",        icon: "🧬", color: "from-blue-500 to-emerald-500" },  about: "Roche is a global pioneer in pharmaceuticals and diagnostics, committed to improving lives while minimising its environmental impact. The company has been carbon neutral since 2021 and sets science-based targets across its value chain." },
  { name: "Adobe Inc.",                ticker: "ADBE",     sector: "Technology",         country: "USA",         score: 82, e: 79, s: 84, g: 83, csr: "A",   frameworks: ["GRI","SASB"],               frameworkRatings: { GRI: "A-", SASB: "A-" },                         hq: "San Jose, USA",           employees: "29,000",  revenue: "$21.5B", tags: ["Creative Software","Digital Media","Cloud","AI Content"],               badge: { label: "100% Renewable Operations",     icon: "💡", color: "from-purple-500 to-emerald-500" },about: "Adobe empowers creativity for billions of people through its Creative Cloud, Document Cloud, and Experience Cloud platforms. The company has run on 100% renewable electricity since 2019 and publicly reports its full supply chain emissions." },
  { name: "Microsoft Corporation",     ticker: "MSFT",     sector: "Technology",         country: "USA",         score: 81, e: 78, s: 83, g: 85, csr: "A–",  frameworks: ["GRI","TCFD","ISSB"],        frameworkRatings: { GRI: "A",  TCFD: "A",  ISSB: "B+"  },            hq: "Redmond, USA",            employees: "221,000", revenue: "$245.1B",tags: ["Cloud Computing","AI","Enterprise Software","Carbon Negative"],         badge: { label: "Carbon Negative by 2030",       icon: "🔋", color: "from-blue-600 to-teal-500" },    about: "Microsoft is a global technology leader in cloud, AI, and productivity software. It has pledged to be carbon negative by 2030 and to remove all its historical carbon emissions by 2050 — among the most ambitious corporate climate commitments globally." },
  { name: "Mastercard Inc.",           ticker: "MA",       sector: "Financial Services", country: "USA",         score: 80, e: 76, s: 82, g: 83, csr: "A–",  frameworks: ["GRI","TCFD"],               frameworkRatings: { GRI: "B+", TCFD: "B+"  },                        hq: "Purchase, USA",           employees: "33,000",  revenue: "$25.1B", tags: ["Payments","Fintech","Digital Commerce","Financial Inclusion"],          badge: { label: "Financial Inclusion Leader",    icon: "🤝", color: "from-orange-500 to-emerald-500" },about: "Mastercard connects billions of people and businesses through its global payments network. Its Priceless Planet Coalition has committed to restoring 100 million trees, and its Centre for Inclusive Growth reaches underserved communities worldwide." },
  { name: "Apple Inc.",                ticker: "AAPL",     sector: "Technology",         country: "USA",         score: 74, e: 68, s: 79, g: 81, csr: "B+",  frameworks: ["GRI","TCFD","SASB"],        frameworkRatings: { GRI: "B+", TCFD: "B",  SASB: "B+"  },            hq: "Cupertino, USA",          employees: "164,000", revenue: "$391.0B",tags: ["Consumer Electronics","iOS","Services","Recycled Materials"],           badge: { label: "Carbon Neutral Products",       icon: "🍃", color: "from-slate-600 to-emerald-500" }, about: "Apple designs iPhone, Mac, iPad, and services used by 2 billion people worldwide. The company's 2030 goal targets fully carbon neutral products across the entire supply chain and product lifecycle — one of the largest commitments in consumer technology." },
  { name: "Tesla Inc.",                ticker: "TSLA",     sector: "Automobiles",        country: "USA",         score: 58, e: 72, s: 48, g: 52, csr: "C+",  frameworks: ["TCFD","SASB"],              frameworkRatings: { TCFD: "C+", SASB: "B-"  },                       hq: "Austin, USA",             employees: "140,000", revenue: "$97.7B", tags: ["Electric Vehicles","Battery Storage","Solar","Autonomous"],             badge: { label: "EV Transition Pioneer",         icon: "⚡", color: "from-red-500 to-slate-600" },     about: "Tesla accelerates the world's transition to sustainable energy through electric vehicles, solar panels, and battery storage. Despite its clean energy mission, the company's social governance and supply chain disclosures remain limited relative to industry leaders." },
  { name: "ExxonMobil Corporation",    ticker: "XOM",      sector: "Energy",             country: "USA",         score: 41, e: 29, s: 48, g: 54, csr: "C",   frameworks: ["TCFD"],                     frameworkRatings: { TCFD: "C"  },                                    hq: "Spring, Texas, USA",      employees: "62,000",  revenue: "$398.7B",tags: ["Oil & Gas","Petrochemicals","Refining","Carbon Capture"],               badge: { label: "Under Climate Scrutiny",        icon: "⚠️", color: "from-red-600 to-orange-500" },    about: "ExxonMobil is one of the world's largest publicly traded oil and gas companies. The company faces significant investor and regulatory pressure over its climate transition plan, which critics argue lacks credible Scope 3 targets and near-term capital reallocation." },
];

type Company = typeof companies[0];

const ALL_SECTORS   = ["all", ...new Set(companies.map((c) => c.sector))].sort((a,b)=>a==="all"?-1:b==="all"?1:a.localeCompare(b));
const ALL_COUNTRIES = ["all", ...new Set(companies.map((c) => c.country))].sort((a,b)=>a==="all"?-1:b==="all"?1:a.localeCompare(b));

/* ── Helpers ────────────────────────────────────────────────────── */
function scoreRing(n: number)  { return n >= 75 ? "text-emerald-500" : n >= 55 ? "text-amber-500" : "text-red-500"; }
function scorePill(n: number)  {
  return n >= 75
    ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
    : n >= 55
    ? "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
    : "bg-red-50 text-red-700 ring-1 ring-red-200";
}
function scoreTrend(n: number) {
  return n >= 75 ? <TrendingUp  className="h-3 w-3" />
       : n >= 55 ? <Minus        className="h-3 w-3" />
       :           <TrendingDown className="h-3 w-3" />;
}

function generateNotes(co: Company) {
  return [
    co.e >= 80
      ? { tone: "bg-emerald-500", text: `Environmental score of ${co.e}/100 leads sector peers. Renewable energy transition plan independently verified with published interim milestones.` }
      : co.e >= 60
      ? { tone: "bg-amber-400",  text: `Environmental score of ${co.e}/100 reflects partial progress. Scope 3 emissions disclosure remains incomplete versus ISSB IFRS S2 requirements.` }
      : { tone: "bg-red-400",    text: `Environmental score of ${co.e}/100 is materially below sector median. Climate transition plan lacks credible, independently verified milestones.` },

    co.s >= 80
      ? { tone: "bg-emerald-500", text: `Social score of ${co.s}/100. Living wage commitment extends to tier-2 suppliers across high-risk sourcing markets with annual third-party audit.` }
      : co.s >= 60
      ? { tone: "bg-amber-400",  text: `Social score of ${co.s}/100 meets minimum disclosure standards. Board diversity below sector median per latest proxy statement.` }
      : { tone: "bg-red-400",    text: `Social score of ${co.s}/100 signals material gaps in human rights due diligence and supply chain transparency reporting.` },

    co.g >= 80
      ? { tone: "bg-emerald-500", text: `Governance score of ${co.g}/100. Strong board independence, external audit quality, and executive pay explicitly linked to ESG targets.` }
      : co.g >= 60
      ? { tone: "bg-amber-400",  text: `Governance score of ${co.g}/100. Executive compensation partially tied to ESG metrics but weighting is below 15% of total incentive structure.` }
      : { tone: "bg-red-400",    text: `Governance score of ${co.g}/100. Insufficient board independence and no published framework linking executive pay to sustainability outcomes.` },

    co.frameworks.length >= 3
      ? { tone: "bg-emerald-500", text: `Comprehensive multi-framework reporting across ${co.frameworks.join(", ")} — highest alignment coverage in the peer cohort.` }
      : co.score >= 55
      ? { tone: "bg-amber-400",  text: `Framework coverage limited to ${co.frameworks.join(", ")}. CSRD readiness assessment not yet published; gap analysis recommended.` }
      : { tone: "bg-red-400",    text: `Minimal disclosure framework adoption (${co.frameworks.join(", ")}). No voluntary commitments beyond current legal minimums observed.` },
  ];
}

/* ── Framework reference data ───────────────────────────────────── */
const FRAMEWORK_INFO: Record<string, { full: string; body: string; link: string }> = {
  GRI:   { full: "Global Reporting Initiative", link: "https://www.globalreporting.org", body: "The world's most widely used sustainability reporting framework. GRI Standards enable organisations to publicly disclose their most significant impacts on the economy, environment, and people — providing a common language for stakeholders." },
  TCFD:  { full: "Task Force on Climate-related Financial Disclosures", link: "https://www.fsb-tcfd.org", body: "Developed by the Financial Stability Board, TCFD provides a framework for companies to disclose climate-related financial risks and opportunities across four pillars: Governance, Strategy, Risk Management, and Metrics & Targets." },
  CDP:   { full: "Carbon Disclosure Project", link: "https://www.cdp.net", body: "CDP runs the world's largest environmental disclosure platform. Companies receive a score from A to D- based on the completeness and quality of their climate, water, and forest disclosures. The 'A List' represents best-in-class performance." },
  CSRD:  { full: "Corporate Sustainability Reporting Directive", link: "https://finance.ec.europa.eu", body: "The EU's CSRD (effective 2024) requires large companies to report detailed sustainability information under the European Sustainability Reporting Standards (ESRS). It significantly expands the scope of mandatory disclosure for companies operating in the EU." },
  ISSB:  { full: "International Sustainability Standards Board", link: "https://www.ifrs.org/groups/international-sustainability-standards-board", body: "The ISSB (under IFRS Foundation) issued its first two standards — IFRS S1 (general sustainability disclosures) and IFRS S2 (climate-related disclosures) — in 2023. These provide a global baseline for investor-focused sustainability reporting." },
  SASB:  { full: "Sustainability Accounting Standards Board", link: "https://sasb.ifrs.org", body: "SASB Standards identify the subset of environmental, social, and governance issues most relevant to financial performance across 77 industries. Now integrated under the IFRS Foundation alongside ISSB standards." },
};

/* ── Detail panel ───────────────────────────────────────────────── */
function DetailPanel({ co, onClose }: { co: Company; onClose?: () => void }) {
  const [ready, setReady] = useState(false);
  const [activeFramework, setActiveFramework] = useState<string | null>(null);
  const circumference = 2 * Math.PI * 52;
  const notes = generateNotes(co);

  useEffect(() => { setActiveFramework(null); }, [co.ticker]);

  useEffect(() => {
    setReady(false);
    const t = setTimeout(() => setReady(true), 60);
    return () => clearTimeout(t);
  }, [co.ticker]);

  return (
    <div className="h-full overflow-y-auto rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white shadow-sm">
      <div className="p-6 sm:p-8">

        {/* Mobile back */}
        {onClose && (
          <button type="button" onClick={onClose}
            className="mb-5 flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-900 lg:hidden">
            <ChevronLeft className="h-4 w-4" /> Back to list
          </button>
        )}

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          {/* Left: name, meta, badge */}
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-tight text-slate-900">{co.name}</h2>
            <p className="mt-1 text-sm text-slate-500">
              {co.sector} — {co.country}
              <span className="ml-2 font-mono text-[11px] font-semibold text-primary">{co.ticker}</span>
            </p>
            <span className={`mt-2 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${co.badge.color} px-3 py-1 text-[11px] font-bold text-white shadow-sm`}>
              <span>{co.badge.icon}</span>
              {co.badge.label}
            </span>
          </div>

          {/* Right: Score dial */}
          <div className="relative flex h-24 w-24 shrink-0 items-center justify-center">
            <svg className={`absolute inset-0 h-24 w-24 -rotate-90 ${scoreRing(co.score)}`} viewBox="0 0 120 120" aria-hidden>
              <circle cx="60" cy="60" r="52" className="fill-none stroke-slate-200" strokeWidth="9" />
              <circle cx="60" cy="60" r="52" className="fill-none stroke-current transition-all duration-700"
                strokeWidth="9" strokeLinecap="round"
                strokeDasharray={`${ready ? (co.score/100)*circumference : 0} ${circumference}`} />
            </svg>
            <div className="relative text-center">
              <p className="text-2xl font-black text-slate-900">{co.score}</p>
              <p className="text-[10px] font-semibold text-slate-400">/100</p>
            </div>
          </div>
        </div>

        {/* About — full width below header */}
        <p className="mt-4 text-sm leading-relaxed text-slate-600">{co.about}</p>

        {/* Company info row */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { icon: <Building2 className="h-3.5 w-3.5" />, label: "Headquarters", val: co.hq },
            { icon: <Users     className="h-3.5 w-3.5" />, label: "Employees",    val: co.employees },
            { icon: <DollarSign className="h-3.5 w-3.5"/>, label: "Revenue",      val: co.revenue },
          ].map(({ icon, label, val }) => (
            <div key={label} className="rounded-xl border border-emerald-100 bg-white px-3 py-2.5 shadow-sm">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                {icon}{label}
              </div>
              <p className="mt-1 text-sm font-bold text-slate-800 leading-tight">{val}</p>
            </div>
          ))}
        </div>

        {/* Topic tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {co.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-800">
              {tag}
            </span>
          ))}
        </div>

        <div className="my-5 border-t border-emerald-100" />

        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Overall ESG Score</p>

        {/* Bars */}
        <div className="mt-4 space-y-3.5">
          {[
            { label: "Environment", val: co.e, cls: "bg-emerald-500", delay: "0ms" },
            { label: "Social",      val: co.s, cls: "bg-teal-400",    delay: "120ms" },
            { label: "Governance",  val: co.g, cls: "bg-sky-500",     delay: "240ms" },
          ].map(({ label, val, cls, delay }) => (
            <div key={label}>
              <div className="mb-1.5 flex justify-between text-xs font-semibold text-slate-700">
                <span>{label}</span><span>{val}</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200/70">
                <div className={`h-full rounded-full ${cls}`}
                  style={{ width: ready ? `${val}%` : "0%", transition: `width 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}` }} />
              </div>
            </div>
          ))}
        </div>

        {/* CSR + Framework tags */}
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white">
            CSR: {co.csr}
          </span>
          {co.frameworks.map((f) => {
            const isActive = activeFramework === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setActiveFramework(isActive ? null : f)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "border-emerald-500 bg-emerald-500 text-white shadow-sm"
                    : "border-emerald-200 bg-emerald-50 text-emerald-700 hover:border-emerald-400 hover:bg-emerald-100"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* Framework info card */}
        {activeFramework && FRAMEWORK_INFO[activeFramework] && (
          <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 transition-all">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">{activeFramework}</p>
                <p className="mt-0.5 text-sm font-semibold text-slate-800">{FRAMEWORK_INFO[activeFramework].full}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{FRAMEWORK_INFO[activeFramework].body}</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveFramework(null)}
                className="mt-0.5 shrink-0 rounded-lg p-1 text-slate-400 hover:bg-emerald-100 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="my-6 border-t border-emerald-100" />

        {/* AI notes */}
        <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">AI-Generated Diligence Notes</p>
        <div className="space-y-3">
          {notes.map((note, i) => (
            <div key={i} className="flex gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
              <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${note.tone}`} />
              <p className="text-sm leading-relaxed text-slate-700">{note.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Download Reports</p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => alert(`ESG Report for ${co.name} — coming soon`)}
              className="group flex items-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-2.5 text-sm font-semibold text-emerald-700 shadow-sm transition-all hover:border-emerald-400 hover:bg-emerald-50 hover:shadow-md"
            >
              <BarChart2 className="h-4 w-4 text-emerald-500 transition-transform group-hover:scale-110" />
              ESG Report
              <Download className="h-3.5 w-3.5 text-emerald-400" />
            </button>
            <button
              type="button"
              onClick={() => alert(`CSR Report for ${co.name} — coming soon`)}
              className="group flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-slate-400 hover:bg-slate-100 hover:shadow-md"
            >
              <FileText className="h-4 w-4 text-slate-500 transition-transform group-hover:scale-110" />
              CSR Report
              <Download className="h-3.5 w-3.5 text-slate-400" />
            </button>
          </div>
          <p className="text-[11px] text-slate-400">Ratings based on publicly disclosed information only.</p>
        </div>
      </div>
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────────────── */
export default function CompaniesPage() {
  const [query,    setQuery]    = useState("");
  const [sector,   setSector]   = useState("all");
  const [country,  setCountry]  = useState("all");
  const [tier,     setTier]     = useState<"all"|"high"|"mid"|"low">("all");
  const [selected, setSelected] = useState<Company>(companies[0]);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ticker = params.get("ticker");
    if (ticker) {
      const match = companies.find((c) => c.ticker.toLowerCase() === ticker.toLowerCase());
      if (match) { setSelected(match); setShowDetail(true); }
    }
  }, []);

  const filtered = useMemo(() => {
    let list = [...companies];
    if (query)         list = list.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()) || c.ticker.toLowerCase().includes(query.toLowerCase()));
    if (sector  !== "all") list = list.filter((c) => c.sector  === sector);
    if (country !== "all") list = list.filter((c) => c.country === country);
    if (tier === "high") list = list.filter((c) => c.score >= 75);
    if (tier === "mid")  list = list.filter((c) => c.score >= 55 && c.score < 75);
    if (tier === "low")  list = list.filter((c) => c.score < 55);
    return list.sort((a, b) => b.score - a.score);
  }, [query, sector, country, tier]);

  return (
    <div className="flex min-h-full flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1">

        {/* Header */}
        <div className="border-b border-slate-200 bg-white px-4 py-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">Platform / Companies</p>
              <h1 className="mt-1 text-2xl font-bold text-slate-900">Company ESG Ratings</h1>
              <p className="mt-0.5 text-sm text-slate-500">{companies.length} companies · {ALL_COUNTRIES.length - 1} countries · updated daily</p>
            </div>
            <div className="flex gap-3">
              {[
                { label: "Total",     val: companies.length },
                { label: "High ≥75",  val: companies.filter(c=>c.score>=75).length },
                { label: "Avg Score", val: Math.round(companies.reduce((s,c)=>s+c.score,0)/companies.length) },
              ].map(({ label, val }) => (
                <div key={label} className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-2 text-center min-w-[72px]">
                  <p className="text-lg font-bold text-slate-900">{val}</p>
                  <p className="text-[11px] text-slate-400">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Split layout */}
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex gap-6 lg:items-start">

            {/* List panel */}
            <div className={`w-full flex-shrink-0 lg:w-[360px] lg:sticky lg:self-start ${showDetail ? "hidden lg:block" : ""}`} style={{ top: "72px" }}>
              {/* Filters */}
              <div className="mb-3 space-y-2">
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
                  <Search className="h-4 w-4 shrink-0 text-slate-400" />
                  <input value={query} onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search company or ticker…"
                    className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none" />
                  {query && <button type="button" onClick={() => setQuery("")}><X className="h-3.5 w-3.5 text-slate-400 hover:text-slate-600"/></button>}
                </div>
                <div className="flex gap-2">
                  <Dropdown
                    value={sector}
                    onChange={setSector}
                    options={ALL_SECTORS.map((s) => ({ value: s, label: s === "all" ? "All Sectors" : s }))}
                    placeholder="All Sectors"
                  />
                  <Dropdown
                    value={country}
                    onChange={setCountry}
                    options={ALL_COUNTRIES.map((c) => ({ value: c, label: c === "all" ? "All Countries" : c }))}
                    placeholder="All Countries"
                  />
                </div>
                <div className="flex gap-1.5">
                  {(["all","high","mid","low"] as const).map((t) => (
                    <button key={t} type="button" onClick={() => setTier(t)}
                      className={`flex-1 rounded-full py-1.5 text-[11px] font-semibold transition ${
                        tier === t
                          ? t==="high" ? "bg-emerald-500 text-white"
                            : t==="mid" ? "bg-amber-500 text-white"
                            : t==="low" ? "bg-red-500 text-white"
                            : "bg-primary text-white"
                          : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50"
                      }`}>
                      {t==="all"?"All":t==="high"?"≥75":t==="mid"?"55–74":"<55"}
                    </button>
                  ))}
                </div>
                <p className="px-0.5 text-[11px] text-slate-400">{filtered.length} companies</p>
              </div>

              {/* List */}
              <div className="overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-sm"
                style={{ maxHeight: "calc(100vh - 310px)" }}>
                {filtered.length === 0 && (
                  <p className="py-12 text-center text-sm text-slate-400">No companies match your filters.</p>
                )}
                {filtered.map((co, i) => (
                  <button key={co.ticker} type="button" onClick={() => { setSelected(co); setShowDetail(true); }}
                    className={`flex w-full items-center gap-3 px-4 py-3.5 text-left transition
                      ${i < filtered.length - 1 ? "border-b border-slate-50" : ""}
                      ${selected.ticker === co.ticker ? "bg-emerald-50/70" : "hover:bg-slate-50"}`}>
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold
                      ${co.score >= 75 ? "bg-emerald-100 text-emerald-700"
                        : co.score >= 55 ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-700"}`}>
                      {co.ticker.slice(0,2)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`truncate text-sm font-semibold ${selected.ticker === co.ticker ? "text-primary" : "text-slate-900"}`}>
                        {co.name}
                      </p>
                      <p className="truncate text-[11px] text-slate-400">{co.sector} · {co.country}</p>
                    </div>
                    <span className={`flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${scorePill(co.score)}`}>
                      {scoreTrend(co.score)}{co.score}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Detail panel */}
            <div className={`flex-1 ${!showDetail ? "hidden lg:block" : ""}`}>
              <DetailPanel co={selected} onClose={() => setShowDetail(false)} />
            </div>

          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
