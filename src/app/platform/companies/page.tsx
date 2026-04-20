"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Navbar } from "@/src/components/Navbar";
import { Footer } from "@/src/components/Footer";
import { Search, TrendingUp, TrendingDown, Minus, ChevronLeft, X, Building2, Users, DollarSign, ChevronDown, Check, Download, FileText, BarChart2, Sparkles, RefreshCw, AlertTriangle } from "lucide-react";
import { companies, EXTENDED, type CompanyData, type ExtData } from "@/src/data/companies";
import type { ESGEngineOutput } from "@/src/lib/esg-engine/types";

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

type Company = CompanyData;

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

/* ── Framework constants ────────────────────────────────────────── */
const FRAMEWORK_INFO: Record<string, { full: string; body: string }> = {
  GRI:   { full: "Global Reporting Initiative",                        body: "The world's most widely used sustainability reporting framework enabling organisations to disclose material impacts on economy, environment, and people." },
  TCFD:  { full: "Task Force on Climate-related Financial Disclosures", body: "Provides a four-pillar framework — Governance, Strategy, Risk Management, Metrics & Targets — for disclosing climate-related financial risks." },
  CDP:   { full: "Carbon Disclosure Project",                          body: "Runs the world's largest environmental disclosure platform, scoring companies A–D on climate, water, and forest disclosures. A-List = best in class." },
  CSRD:  { full: "Corporate Sustainability Reporting Directive",       body: "EU directive (effective 2024) requiring large companies to report under ESRS standards, significantly expanding mandatory sustainability disclosure scope." },
  ISSB:  { full: "International Sustainability Standards Board",       body: "Issued IFRS S1 and S2 in 2023, providing a global investor-focused baseline for sustainability and climate-related financial disclosures." },
  SASB:  { full: "Sustainability Accounting Standards Board",          body: "Identifies ESG issues most relevant to financial performance across 77 industries. Now integrated under the IFRS Foundation alongside ISSB." },
  UNSDG: { full: "UN Sustainable Development Goals",                  body: "The 17 SDGs set by the United Nations in 2015 provide a shared blueprint for peace and prosperity for people and the planet by 2030. Companies align their strategies with relevant goals." },
  UNGC:  { full: "UN Global Compact",                                  body: "The world's largest corporate sustainability initiative with 15,000+ companies. Participants commit to 10 principles across human rights, labour, environment, and anti-corruption." },
  ISO:   { full: "ISO 14001 Environmental Management System",         body: "An internationally recognised standard specifying requirements for an environmental management system. Certification demonstrates commitment to systematic environmental improvement." },
  EPEAT: { full: "EPEAT Sustainability Standard",                     body: "A global registry for greener electronics. Products are assessed across sustainability criteria including energy efficiency, design for end-of-life, corporate performance, and packaging." },
};
const FRAMEWORK_DISCLOSURES: Record<string, string[]> = {
  GRI:   ["Emissions (Scopes 1, 2 & 3)", "Energy & Renewable Energy", "Water Management & Stewardship", "Waste & Circular Materials", "Supplier Environmental Programs"],
  TCFD:  ["Climate Governance & Oversight", "Scenario Analysis & Strategy", "Risk Management Processes", "Metrics & Targets"],
  CDP:   ["Climate Change: Detailed", "Risk & Opportunities: Disclosed", "Emissions Methodology: Clear", "Third-party Assurance: Yes"],
  CSRD:  ["ESRS E1 Climate Change", "ESRS S1 Own Workforce", "ESRS G1 Business Conduct", "Double Materiality Assessment"],
  ISSB:  ["Sustainability-related Risks", "Climate-related Financial Impacts", "Governance & Strategy Alignment", "Emissions & Transition Planning"],
  SASB:  ["Industry-specific ESG Metrics", "Product Lifecycle Impacts", "Supply Chain Management", "Data Privacy & Competitive Ethics"],
  UNSDG: ["SDG 7 Affordable & Clean Energy", "SDG 12 Responsible Consumption & Production", "SDG 13 Climate Action", "SDG 15 Life on Land", "SDG 17 Partnerships for the Goals"],
  UNGC:  ["Human Rights Principles", "Labour Standards", "Environmental Responsibility", "Anti-Corruption Commitment", "Communication on Progress"],
  ISO:   ["Environmental Policy & Objectives", "Legal & Regulatory Compliance", "Environmental Aspects & Impacts Assessment", "Emergency Preparedness & Response", "Continual Improvement System"],
  EPEAT: ["Design for Environment", "Product Durability & Repairability", "Energy Efficiency Certification", "End-of-Life Management Program", "Corporate Sustainability Reporting"],
};
const FW_STYLE: Record<string, string> = {
  GRI:   "bg-emerald-800", TCFD:  "bg-slate-900",  CDP:   "bg-orange-800",
  CSRD:  "bg-teal-900",    ISSB:  "bg-blue-900",   SASB:  "bg-indigo-900",
  UNSDG: "bg-blue-700",    UNGC:  "bg-cyan-900",   ISO:   "bg-stone-700",   EPEAT: "bg-yellow-700",
};


/* ── Grade helpers ──────────────────────────────────────────────── */
function gradeToScore(g: string): number {
  return ({ A:91, "A-":86, "B+":82, B:77, "B-":72, "C+":67, C:58 } as Record<string,number>)[g] ?? 70;
}
function scoreLabel(n: number) {
  if (n >= 90) return { text:"Leader",      cls:"bg-emerald-100 text-emerald-700" };
  if (n >= 85) return { text:"Strong",      cls:"bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200" };
  if (n >= 80) return { text:"Good",        cls:"bg-teal-50 text-teal-700 ring-1 ring-teal-200" };
  if (n >= 75) return { text:"Aligned",     cls:"bg-sky-50 text-sky-700 ring-1 ring-sky-200" };
  if (n >= 70) return { text:"Transparent", cls:"bg-blue-50 text-blue-700 ring-1 ring-blue-200" };
  if (n >= 65) return { text:"Partial",     cls:"bg-amber-50 text-amber-700 ring-1 ring-amber-200" };
  return           { text:"Limited",     cls:"bg-red-50 text-red-700 ring-1 ring-red-200" };
}

/* ── Disclosure ratings per framework score ────────────────────── */
function disclosureRatings(fwScore: number, count: number): { label: string; cls: string }[] {
  const T = [
    { label: "Disclosed",     cls: "bg-emerald-100 text-emerald-700" },
    { label: "Partial",       cls: "bg-amber-100 text-amber-700" },
    { label: "Referenced",    cls: "bg-sky-100 text-sky-700" },
    { label: "Not Disclosed", cls: "bg-red-50 text-red-500" },
  ];
  let d = 0, p = 0, r = 0, n = 0;
  if      (fwScore >= 90) { d = count; }
  else if (fwScore >= 85) { d = count - 1; p = 1; }
  else if (fwScore >= 80) { d = Math.ceil(count * 0.6); p = count - d; }
  else if (fwScore >= 75) { d = Math.floor(count * 0.4); p = Math.ceil(count * 0.4); r = count - d - p; }
  else if (fwScore >= 65) { p = Math.ceil(count * 0.5); r = Math.ceil(count * 0.3); n = count - p - r; }
  else                    { p = Math.floor(count * 0.3); r = Math.ceil(count * 0.4); n = count - p - r; }
  return [
    ...Array(d).fill(T[0]),
    ...Array(p).fill(T[1]),
    ...Array(r).fill(T[2]),
    ...Array(Math.max(0,n)).fill(T[3]),
  ].slice(0, count);
}

/* ── Per-disclosure metric detail ──────────────────────────────── */
function getDisclosureDetail(co: Company, ext: ExtData | undefined, fw: string, idx: number): string {
  if (!ext) return "Data not available.";
  const renewable = ext.progressMetrics.find(m => m.label.toLowerCase().includes("renewable"));
  const supplier  = ext.progressMetrics.find(m => m.label.toLowerCase().includes("supplier"));
  const recycled  = ext.highlights.find(h => h.label.toLowerCase().includes("recycl"));
  if (fw === "GRI") return [
    `${ext.emissions.value} total GHG · ${ext.emissions.trend} · Scope boundary: Scopes 1, 2 & 3`,
    `${renewable?.pct ?? "—"}% renewable electricity · ${renewable?.detail ?? "Renewable energy usage reported annually"}`,
    `Water withdrawal and stewardship metrics reported in annual sustainability disclosure`,
    `${recycled?.value ?? "—"} ${recycled?.label ?? "materials recycled"} · Waste diversion and circular economy metrics disclosed`,
    `${supplier?.pct ?? co.score >= 75 ? "60%+" : "40%+"} of key suppliers assessed for environmental performance · Commitments tracked annually`,
  ][idx] ?? "Reported in annual GRI disclosure.";
  if (fw === "TCFD") return [
    `Board ESG committee with ${co.g >= 80 ? "quarterly" : "annual"} reporting cadence · ${co.g >= 80 ? "Terms of reference published" : "Governance policy disclosed"}`,
    `${co.score >= 80 ? "1.5°C and 2°C scenarios modelled" : "Baseline scenario modelled"} · Strategic response: ${ext.emissions.goalDetail}`,
    `Climate risk integrated into ${co.score >= 75 ? "enterprise risk framework with quarterly review" : "corporate risk register with annual review"}`,
    `Target: ${ext.emissions.goal} · ${ext.emissions.goalDetail} · Progress: ${ext.emissions.trend}`,
  ][idx] ?? "Reported in TCFD disclosure.";
  if (fw === "CDP") return [
    `CDP Climate Score: ${(co.frameworkRatings as unknown as Record<string,string>)["CDP"] ?? "B"} · Full climate questionnaire submitted · ${ext.emissions.value} total reported`,
    `Physical and transition risks disclosed · ${co.score >= 80 ? "Scenario analysis included" : "Risk mapping completed"}`,
    `${ext.emissions.trend} · ${co.score >= 80 ? "Third-party verified" : "Self-reported"} · Boundary: ${co.score >= 75 ? "Scopes 1, 2 & 3" : "Scopes 1 & 2"}`,
    `${co.score >= 80 ? "External assurance engaged" : "Internal review process"} · GHG Protocol methodology applied`,
  ][idx] ?? "Reported in CDP questionnaire.";
  if (fw === "CSRD") return [
    `Climate transition plan disclosed · Net zero target: ${ext.emissions.goal} · Total emissions: ${ext.emissions.value}`,
    `${co.employees} employees in scope · ${co.s >= 75 ? "Living wage policy published" : "Workforce rights policy disclosed"}`,
    `Anti-corruption training: ${co.g >= 80 ? "100%" : "85%+"} employees covered · ${co.g >= 80 ? "Whistleblower hotline active" : "Ethics policy published"}`,
    `Double materiality assessment completed · ${co.frameworks.length} frameworks aligned · Impacts, risks and opportunities disclosed`,
  ][idx] ?? "Reported under ESRS standards.";
  if (fw === "ISSB") return [
    `Sustainability risks disclosed in annual report · ${co.score >= 80 ? "IFRS S1 full alignment" : "IFRS S1 partial alignment"} · Material topics identified`,
    `${ext.emissions.value} total · ${ext.emissions.trend} · Transition risk assessed as ${co.score >= 75 ? "low-medium" : "high"}`,
    `Board ESG oversight confirmed · ${co.g >= 80 ? "Executive ESG incentives published" : "ESG policy board-approved"}`,
    `Target: ${ext.emissions.goal} · ${ext.emissions.goalDetail} · IFRS S2 climate metrics disclosed`,
  ][idx] ?? "Reported under IFRS S1/S2 standards.";
  if (fw === "SASB") return [
    `Industry: ${co.sector} · SASB standard applied · Metrics published in annual integrated report`,
    `${co.e >= 75 ? "Full lifecycle assessment conducted" : "Partial lifecycle data reported"} · Product environmental footprint assessed`,
    `${co.score >= 75 ? "Tier-1 suppliers audited annually" : "Key supplier assessment completed"} · ${co.score >= 80 ? "Tier-2 assessment in progress" : "Tier-1 coverage maintained"}`,
    `Privacy policy current · ${co.g >= 80 ? "GDPR and CCPA compliant · No major breaches reported" : "Incident response plan active"}`,
  ][idx] ?? "Reported under SASB industry standards.";
  if (fw === "UNSDG") return [
    `SDG 7 alignment: ${ext.progressMetrics.find(m => m.label.toLowerCase().includes("renewable"))?.detail ?? `${co.e >= 75 ? "Strong" : "Partial"} renewable energy transition underway`}`,
    `SDG 12 alignment: ${ext.emissionsBreakdown[0]?.label ?? "Manufacturing"} is primary footprint · Circular economy initiatives ${co.e >= 75 ? "published with targets" : "in development"}`,
    `SDG 13 alignment: Target — ${ext.emissions.goal} · Progress — ${ext.emissions.trend} · Emissions: ${ext.emissions.value}`,
    `SDG 15 alignment: Biodiversity policy ${co.score >= 75 ? "published with nature-positive commitments and land-use targets" : "referenced in sustainability report without quantitative targets"}`,
    `SDG 17 alignment: ${co.frameworks.length >= 5 ? "Multi-framework reporting and stakeholder partnerships demonstrate broad SDG 17 commitment" : "Stakeholder engagement and industry partnerships support SDG 17 goals"}`,
  ][idx] ?? "Reported under UN SDG framework.";
  if (fw === "UNGC") return [
    `Human Rights: ${co.s >= 80 ? "Comprehensive human rights due diligence published · Tier-1 and Tier-2 supplier assessments completed" : "Human rights policy active · Tier-1 supplier assessments conducted annually"}`,
    `Labour Standards: ${co.employees} employees · ${co.s >= 75 ? "Living wage policy in effect · Freedom of association formally supported" : "Minimum wage policy meets local requirements · Labour standards policy published"}`,
    `Environmental Responsibility: ${ext.emissions.value} total emissions · ${ext.emissions.trend} · Target: ${ext.emissions.goal}`,
    `Anti-Corruption: ${co.g >= 80 ? "100% of employees trained annually · Zero-tolerance policy with whistleblower hotline active and published" : "Anti-corruption training covers 85%+ of workforce · Ethics code formally adopted"}`,
    `Communication on Progress: Annual CoP ${co.score >= 75 ? "submitted at GC Active or GC Advanced level · Publicly available on UNGC portal" : "submitted at GC Learner level · Improvement roadmap included"}`,
  ][idx] ?? "Reported under UN Global Compact framework.";
  if (fw === "ISO") return [
    `ISO 14001 certification: ${co.score >= 80 ? "Certified across all major operational sites · Third-party audit completed annually" : "Certification active at primary facilities · Expansion to remaining sites in progress"}`,
    `Legal compliance: ${co.g >= 80 ? "Zero significant regulatory penalties reported · Proactive monitoring system in place" : "Compliance register maintained · No material violations reported in reporting period"}`,
    `Environmental aspects assessment: ${ext.emissionsBreakdown[0]?.label ?? "Primary operations"} identified as highest-impact aspect · Control measures documented and reviewed`,
    `Emergency preparedness: ${co.score >= 75 ? "Response plans tested annually · Incident near-miss reporting system active" : "Emergency response procedures documented · Annual drills conducted"}`,
    `Continual improvement: ${ext.progressMetrics[0]?.detail ?? "Key environmental objectives reviewed quarterly and updated annually with measurable targets"}`,
  ][idx] ?? "Reported under ISO 14001 standard.";
  if (fw === "EPEAT") return [
    `Design for environment: ${co.score >= 80 ? "Eco-design principles embedded in product development process · Hazardous substances minimised" : "Environmental design criteria applied · Restricted substances list maintained"}`,
    `Durability & repairability: ${co.score >= 75 ? "Modular design and repair guides publicly available · Spare parts availability guaranteed for 5+ years" : "Repairability score disclosed · Repair documentation provided to authorised service providers"}`,
    `Energy efficiency: ${ext.progressMetrics.find(m => m.label.toLowerCase().includes("renewable"))?.detail ?? "ENERGY STAR certification maintained across applicable product lines"}`,
    `End-of-life management: ${co.score >= 75 ? "Take-back programme operational globally · Certified recycling partners for all major materials streams" : "Product recycling programme available in primary markets · End-of-life policy published"}`,
    `Corporate sustainability reporting: Aligned with ${co.frameworks.filter(f => ["GRI","SASB","TCFD"].includes(f)).join(", ") || "sustainability reporting standards"} · EPEAT registry publicly accessible`,
  ][idx] ?? "Reported under EPEAT sustainability standard.";
  return "Reported in annual sustainability disclosure.";
}

/* ── Donut chart ────────────────────────────────────────────────── */
function DonutChart({ segs }: { segs: { pct: number; color: string }[] }) {
  const cx = 60, cy = 60, R = 50, r = 30;
  const paths: { d: string; color: string }[] = [];
  let a = -Math.PI / 2;
  for (const s of segs) {
    const sweep = (s.pct / 100) * 2 * Math.PI;
    const ea = a + sweep;
    const lg = sweep > Math.PI ? 1 : 0;
    const f = (v: number) => v.toFixed(3);
    paths.push({ color: s.color, d:
      `M${f(cx+R*Math.cos(a))},${f(cy+R*Math.sin(a))}` +
      `A${R},${R},0,${lg},1,${f(cx+R*Math.cos(ea))},${f(cy+R*Math.sin(ea))}` +
      `L${f(cx+r*Math.cos(ea))},${f(cy+r*Math.sin(ea))}` +
      `A${r},${r},0,${lg},0,${f(cx+r*Math.cos(a))},${f(cy+r*Math.sin(a))}Z`
    });
    a = ea;
  }
  return (
    <svg viewBox="0 0 120 120" className="w-28 h-28">
      {paths.map((p,i) => <path key={i} d={p.d} fill={p.color} />)}
      <circle cx="60" cy="60" r="30" fill="white" />
    </svg>
  );
}

/* ── Greenwashing Risk Meter ────────────────────────────────────── */
function GreenwashingRiskMeter({ co, ext }: { co: Company; ext: ExtData | undefined }) {
  if (!ext?.weeklyWatch?.items?.length) return null;

  const items = ext.weeklyWatch.items;
  const counts = { greenwashing: 0, questionable: 0, genuine: 0 };
  items.forEach(it => { counts[it.verdict as keyof typeof counts]++; });

  // 0–100 composite score
  const raw = counts.greenwashing * 30 + counts.questionable * 15 + counts.genuine * -5;
  const score = Math.max(0, Math.min(100, raw));

  const level =
    score >= 70 ? { label: "High Risk",      short: "High",      color: "text-red-600",     bg: "bg-red-50",     border: "border-red-200",    bar: "bg-red-500",    ring: "ring-red-200"    } :
    score >= 40 ? { label: "Moderate Risk",   short: "Moderate",  color: "text-amber-600",   bg: "bg-amber-50",   border: "border-amber-200",  bar: "bg-amber-400",  ring: "ring-amber-200"  } :
                  { label: "Low Risk",         short: "Low",       color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200",bar: "bg-emerald-500",ring: "ring-emerald-200" };

  const drivers: { label: string; cls: string; count: number }[] = [
    { label: "Greenwashing", cls: "bg-red-100 text-red-700 border-red-200",       count: counts.greenwashing },
    { label: "Questionable", cls: "bg-amber-100 text-amber-700 border-amber-200", count: counts.questionable },
    { label: "Genuine",      cls: "bg-emerald-100 text-emerald-700 border-emerald-200", count: counts.genuine },
  ];

  const topDriver = items
    .filter(it => it.verdict === "greenwashing")
    .concat(items.filter(it => it.verdict === "questionable"))[0] ?? null;

  return (
    <div className={`rounded-xl border ${level.border} p-4 shadow-sm`} style={{ background: "white" }}>
      {/* Header row */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Greenwashing Risk Score</p>
          <p className="mt-0.5 text-[10px] text-slate-400">Week of {ext.weeklyWatch.weekOf} · {items.length} disclosures analysed</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-bold ring-1 ${level.color} ${level.bg} ${level.ring}`}>
          {level.label}
        </span>
      </div>

      {/* Score + gauge row */}
      <div className="flex items-center gap-4">
        {/* Big score */}
        <div className={`flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl ring-2 ${level.bg} ${level.ring}`}>
          <span className={`text-2xl font-black leading-none ${level.color}`}>{score}</span>
          <span className="text-[9px] font-semibold text-slate-400">/100</span>
        </div>

        {/* Gauge + zone labels */}
        <div className="flex-1">
          <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-100">
            {/* Zone ticks */}
            <div className="absolute inset-y-0 left-[40%] w-px bg-slate-300/60" />
            <div className="absolute inset-y-0 left-[70%] w-px bg-slate-300/60" />
            {/* Fill */}
            <div
              className={`h-full rounded-full transition-all duration-700 ${level.bar}`}
              style={{ width: `${score}%` }}
            />
          </div>
          <div className="mt-1 flex justify-between text-[9px] font-semibold text-slate-300">
            <span>Low</span>
            <span className="ml-[30%]">Moderate</span>
            <span>High</span>
          </div>
        </div>
      </div>

      {/* Verdict breakdown pills */}
      <div className="mt-3 flex flex-wrap gap-2">
        {drivers.map(d => (
          <span key={d.label} className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold ${d.cls}`}>
            <span className="tabular-nums font-black">{d.count}</span>
            {d.label}
          </span>
        ))}
      </div>

      {/* Top risk driver */}
      {topDriver && (
        <div className={`mt-3 rounded-lg border ${level.border} ${level.bg} px-3 py-2`}>
          <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Top Risk Driver</p>
          <p className="mt-0.5 text-[11px] font-semibold leading-snug text-slate-700">{topDriver.headline}</p>
        </div>
      )}
    </div>
  );
}

/* ── ESG Rating Impact Chart ────────────────────────────────────── */
function ESGRatingChart({ ext }: { ext: ExtData | undefined }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [clicked, setClicked] = useState<number | null>(null);
  const ww = ext?.weeklyWatch;
  if (!ww?.priorHistory?.length || !ww?.weeklyDeltas?.length) return null;

  const M = { top: 24, right: 36, bottom: 36, left: 38 };
  const VW = 600, VH = 190;
  const pw = VW - M.left - M.right;
  const ph = VH - M.top - M.bottom;

  const baseScore = ww.priorHistory[ww.priorHistory.length - 1].score;
  let running = baseScore;
  const weeklyPts = ww.items.map((item, i) => {
    running = parseFloat((running + ww.weeklyDeltas[i]).toFixed(1));
    return { label: item.date.replace(/,.*/, ""), score: running, verdict: item.verdict };
  });

  type Pt = { label: string; score: number; verdict: string };
  const allData: Pt[] = [
    ...ww.priorHistory.map(h => ({ ...h, verdict: "history" })),
    ...weeklyPts,
  ];
  const hl = ww.priorHistory.length;

  const scores = allData.map(d => d.score);
  const minS = Math.floor(Math.min(...scores)) - 1;
  const maxS = Math.ceil(Math.max(...scores)) + 1;
  const xOf = (i: number) => M.left + (i / (allData.length - 1)) * pw;
  const yOf = (s: number) => M.top + ph - ((s - minS) / (maxS - minS)) * ph;

  const pts = allData.map((d, i) => ({ ...d, x: xOf(i), y: yOf(d.score) }));
  const mkPath = (sl: typeof pts) => sl.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const area = mkPath(pts) + ` L${pts[pts.length - 1].x},${M.top + ph} L${pts[0].x},${M.top + ph}Z`;
  const divX = (pts[hl - 1].x + pts[hl].x) / 2;

  const dot: Record<string, string> = {
    history: "#6ee7b7",
    genuine: "#10b981",
    greenwashing: "#ef4444",
    questionable: "#f59e0b",
  };

  const verdictStyle: Record<string, { badge: string; border: string; bg: string; label: string }> = {
    genuine:      { badge: "bg-emerald-100 text-emerald-700", border: "border-emerald-200", bg: "bg-emerald-50",  label: "Genuine" },
    greenwashing: { badge: "bg-red-100 text-red-700",         border: "border-red-200",     bg: "bg-red-50",      label: "Greenwashing" },
    questionable: { badge: "bg-amber-100 text-amber-700",     border: "border-amber-200",   bg: "bg-amber-50",    label: "Questionable" },
  };

  const tr = (s: string, n: number) => s.length > n ? s.slice(0, n) + "…" : s;

  const yTicks: number[] = [];
  for (let t = Math.ceil(minS); t <= Math.floor(maxS); t++) yTicks.push(t);

  const clickedItem = clicked !== null && clicked >= hl ? ww.items[clicked - hl] : null;
  const clickedDelta = clicked !== null && clicked >= hl ? ww.weeklyDeltas[clicked - hl] : null;
  const clickedScore = clicked !== null && clicked >= hl ? pts[clicked].score : null;

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">ESG Rating Impact — Weekly Watch</p>
        <div className="flex flex-wrap items-center gap-3">
          {([["#10b981","Genuine"],["#ef4444","Greenwashing"],["#f59e0b","Questionable"]] as [string,string][]).map(([c, l]) => (
            <span key={l} className="flex items-center gap-1 text-[10px] text-slate-500">
              <span className="inline-block h-2 w-2 rounded-full" style={{ background: c }} />{l}
            </span>
          ))}
        </div>
      </div>

      <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" style={{ height: "auto", overflow: "visible" }}>
        <defs>
          <linearGradient id="esgGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
        </defs>

        {yTicks.map(t => (
          <g key={t}>
            <line x1={M.left} y1={yOf(t)} x2={M.left + pw} y2={yOf(t)} stroke="#f1f5f9" strokeWidth="1" />
            <text x={M.left - 6} y={yOf(t)} textAnchor="end" dominantBaseline="middle" fontSize="9" fill="#94a3b8">{t}</text>
          </g>
        ))}
        <line x1={M.left} y1={yOf(baseScore)} x2={M.left + pw} y2={yOf(baseScore)} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 3" />
        <line x1={divX} y1={M.top - 10} x2={divX} y2={M.top + ph} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />
        <text x={divX + 5} y={M.top - 2} fontSize="8" fill="#94a3b8" fontStyle="italic">This week</text>

        <path d={area} fill="url(#esgGrad)" />
        <path d={mkPath(pts.slice(0, hl))} fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d={mkPath(pts.slice(hl - 1))} fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 3" />

        {pts.map((p, i) => {
          const isW = i >= hl;
          const isClicked = clicked === i;
          const r = isW ? (hovered === i || isClicked ? 7 : 5) : 3.5;
          return (
            <g key={i} style={{ cursor: isW ? "pointer" : "default" }}
              onMouseEnter={() => isW && setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => isW && setClicked(isClicked ? null : i)}>
              {isClicked && <circle cx={p.x} cy={p.y} r={r + 5} fill={dot[p.verdict] ?? "#94a3b8"} opacity="0.18" />}
              <circle cx={p.x} cy={p.y} r={r + 6} fill="transparent" />
              <circle cx={p.x} cy={p.y} r={r} fill={dot[p.verdict] ?? "#94a3b8"} stroke="white" strokeWidth={isClicked ? 2.5 : 1.5} />
            </g>
          );
        })}

        {/* Hover tooltip — only when not clicked */}
        {hovered !== null && hovered >= hl && hovered !== clicked && (() => {
          const p = pts[hovered];
          const item = ww.items[hovered - hl];
          const delta = ww.weeklyDeltas[hovered - hl];
          const ttW = 200;
          const ttX = Math.min(Math.max(p.x - ttW / 2, M.left), M.left + pw - ttW);
          const ttY = p.y - 72;
          return (
            <g style={{ pointerEvents: "none" }}>
              <rect x={ttX} y={ttY} width={ttW} height={65} rx="7" fill="white" stroke="#e2e8f0" strokeWidth="1" filter="drop-shadow(0 2px 8px rgba(0,0,0,0.10))" />
              {/* source · date */}
              <text x={ttX + 10} y={ttY + 14} fontSize="8" fill="#94a3b8">{item.source} · {p.label}</text>
              {/* score + delta */}
              <text x={ttX + 10} y={ttY + 30} fontSize="14" fontWeight="bold" fill="#0f172a">{p.score}</text>
              <text x={ttX + 40} y={ttY + 30} dominantBaseline="auto" fontSize="9" fill={delta >= 0 ? "#10b981" : "#ef4444"}>  {delta >= 0 ? `+${delta}` : String(delta)} pts</text>
              {/* headline snippet — single line */}
              <text x={ttX + 10} y={ttY + 47} fontSize="8.5" fill="#475569">{tr(item.headline, 36)}</text>
              {/* click hint */}
              <text x={ttX + ttW / 2} y={ttY + 62} textAnchor="middle" fontSize="7.5" fill="#94a3b8" fontStyle="italic">click for full details</text>
            </g>
          );
        })()}

        {pts.map((p, i) => {
          const step = Math.max(1, Math.floor(allData.length / 6));
          if (i % step !== 0 && i !== allData.length - 1 && i !== hl - 1) return null;
          return <text key={i} x={p.x} y={VH - 2} textAnchor="middle" fontSize="8" fill="#94a3b8">{p.label}</text>;
        })}

        <text x={pts[pts.length - 1].x + 8} y={pts[pts.length - 1].y} dominantBaseline="middle" fontSize="10" fontWeight="bold" fill="#334155">{pts[pts.length - 1].score}</text>
      </svg>

      {/* Expanded detail card — shown on click */}
      {clickedItem && clickedDelta !== null && clickedScore !== null && (() => {
        const vs = verdictStyle[clickedItem.verdict];
        return (
          <div className={`mt-3 rounded-xl border ${vs.border} ${vs.bg} p-4 animate-content-fade`}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${vs.badge}`}>{vs.label}</span>
                <span className="text-[10px] text-slate-400">{clickedItem.date} · {clickedItem.source}</span>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="text-xs font-black text-slate-800">{clickedScore} <span className={`text-[11px] font-semibold ${clickedDelta >= 0 ? "text-emerald-600" : "text-red-500"}`}>{clickedDelta >= 0 ? `+${clickedDelta}` : String(clickedDelta)} pts</span></span>
                <button type="button" onClick={() => setClicked(null)} className="rounded-md p-1 text-slate-400 hover:bg-white hover:text-slate-600"><X className="h-3.5 w-3.5" /></button>
              </div>
            </div>
            <p className="mt-2.5 text-sm font-semibold leading-snug text-slate-800">{clickedItem.headline}</p>
            <div className="mt-2 flex items-center gap-1.5">
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">vs goal</span>
              <span className="rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-semibold text-slate-600">{clickedItem.relatedGoal}</span>
            </div>
            <p className="mt-2.5 text-[11px] leading-relaxed text-slate-600">{clickedItem.analysis}</p>
          </div>
        );
      })()}
    </div>
  );
}

/* ── AI Intelligence Panel ──────────────────────────────────────── */
const CAT_CLS: Record<string, string> = {
  E: "bg-emerald-100 text-emerald-700",
  S: "bg-sky-100 text-sky-700",
  G: "bg-violet-100 text-violet-700",
};
const SEV_CLS: Record<string, string> = {
  Low:    "bg-slate-100 text-slate-600",
  Medium: "bg-amber-100 text-amber-700",
  High:   "bg-red-100 text-red-700",
};
const CONF_CLS: Record<string, string> = {
  Low:    "bg-slate-100 text-slate-600",
  Medium: "bg-amber-100 text-amber-700",
  High:   "bg-red-100 text-red-700",
};

function AIIntelligencePanel({
  co,
  aiData,
  aiLoading,
  aiError,
  onRefresh,
}: {
  co: Company;
  aiData: ESGEngineOutput | null;
  aiLoading: boolean;
  aiError: string | null;
  onRefresh: () => void;
}) {
  if (aiLoading) {
    return (
      <div className="flex items-center justify-center gap-3 rounded-xl border border-primary/20 bg-primary/5 px-5 py-4">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="text-[12px] font-semibold text-primary">AI intelligence engine running for {co.name}…</p>
      </div>
    );
  }

  if (aiError) {
    return (
      <div className="flex items-center justify-between rounded-xl border border-red-200 bg-red-50 px-4 py-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-red-500" />
          <p className="text-[12px] font-semibold text-red-700">{aiError}</p>
        </div>
        <button type="button" onClick={onRefresh} className="text-[11px] font-semibold text-red-600 underline hover:text-red-800">Retry</button>
      </div>
    );
  }

  if (!aiData) {
    return (
      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-[12px] font-bold text-slate-800">AI Intelligence Refresh</p>
            <p className="text-[11px] text-slate-400">Live ESG analysis · news monitoring · greenwashing detection</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onRefresh}
          className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-[11px] font-bold text-white shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
        >
          <Sparkles className="h-3 w-3" /> Run Analysis
        </button>
      </div>
    );
  }

  const confBorder =
    aiData.confidence_score >= 70 ? "border-emerald-200 bg-emerald-50"
    : aiData.confidence_score >= 40 ? "border-amber-200 bg-amber-50"
    : "border-red-200 bg-red-50";
  const confText =
    aiData.confidence_score >= 70 ? "text-emerald-700"
    : aiData.confidence_score >= 40 ? "text-amber-700"
    : "text-red-600";

  return (
    <div className="space-y-4 rounded-xl border border-primary/20 bg-white p-4 shadow-sm">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <p className="text-[11px] font-bold uppercase tracking-widest text-primary">AI Intelligence</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${confBorder} ${confText}`}>
            Confidence {aiData.confidence_score}%
          </span>
          <button
            type="button"
            onClick={onRefresh}
            title="Re-run analysis"
            className="rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-primary"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Updated scores */}
      <div>
        <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">Updated ESG Scores</p>
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "Overall", val: aiData.esg_scores.overall_score,       base: co.score },
            { label: "E",       val: aiData.esg_scores.environmental_score,  base: co.e },
            { label: "S",       val: aiData.esg_scores.social_score,         base: co.s },
            { label: "G",       val: aiData.esg_scores.governance_score,     base: co.g },
          ].map(({ label, val, base }) => {
            const delta = val - base;
            return (
              <div key={label} className="rounded-lg bg-slate-50 px-2 py-2.5 text-center">
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
                <p className="mt-0.5 text-sm font-black text-slate-900">{val}</p>
                {delta !== 0 && (
                  <p className={`text-[10px] font-semibold ${delta > 0 ? "text-emerald-600" : "text-red-500"}`}>
                    {delta > 0 ? `+${delta}` : delta}
                  </p>
                )}
              </div>
            );
          })}
        </div>
        <p className="mt-2 text-[11px] leading-relaxed text-slate-500">{aiData.esg_scores.score_rationale}</p>
      </div>

      {/* News events */}
      {aiData.news_events.length > 0 && (
        <div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">News Events Detected</p>
          <div className="space-y-2">
            {aiData.news_events.map((ev, i) => (
              <div key={i} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${CAT_CLS[ev.category] ?? "bg-slate-100 text-slate-600"}`}>{ev.category}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${SEV_CLS[ev.severity] ?? "bg-slate-100 text-slate-600"}`}>{ev.severity}</span>
                  {ev.impact_score !== null && <span className="text-[10px] text-slate-400">Impact {ev.impact_score}/100</span>}
                  {ev.date && <span className="ml-auto text-[10px] text-slate-400">{ev.date}</span>}
                </div>
                <p className="mt-1.5 text-[11px] font-semibold leading-snug text-slate-700">{ev.title}</p>
                {ev.source && <p className="mt-0.5 text-[10px] text-slate-400">{ev.source}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Greenwashing flags */}
      {aiData.greenwashing_flags.length > 0 && (
        <div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">Greenwashing Flags</p>
          <div className="space-y-2">
            {aiData.greenwashing_flags.map((flag, i) => (
              <div key={i} className="rounded-lg border border-amber-200 bg-amber-50/60 p-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-amber-600" />
                  <p className="text-[11px] font-semibold text-amber-900">{flag.issue}</p>
                  <span className={`ml-auto rounded-full px-2 py-0.5 text-[9px] font-bold ${CONF_CLS[flag.confidence] ?? ""}`}>{flag.confidence}</span>
                </div>
                <p className="mt-1 pl-5 text-[11px] leading-relaxed text-amber-800">{flag.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Changes detected */}
      {aiData.changes_detected.length > 0 && (
        <div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">Changes Detected</p>
          <div className="space-y-1">
            {aiData.changes_detected.map((ch, i) => (
              <div key={i} className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-[11px]">
                <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                  ch.change_type === "increase" ? "bg-emerald-500"
                  : ch.change_type === "decrease" ? "bg-red-400"
                  : ch.change_type === "new" ? "bg-sky-400"
                  : "bg-slate-300"
                }`} />
                <span className="font-semibold text-slate-700">{ch.field}</span>
                <span className="text-slate-400">{String(ch.old_value ?? "—")}</span>
                <span className="text-slate-300">→</span>
                <span className={`font-semibold ${
                  ch.change_type === "increase" ? "text-emerald-700"
                  : ch.change_type === "decrease" ? "text-red-600"
                  : "text-slate-700"
                }`}>{String(ch.new_value ?? "—")}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Metadata */}
      <p className="text-[10px] text-slate-400">
        Sources: {aiData.metadata.sources.slice(0, 4).join(" · ")}
        {aiData.metadata.sources.length > 4 && ` +${aiData.metadata.sources.length - 4} more`}
        {" · "}Updated {aiData.metadata.last_updated}
      </p>
    </div>
  );
}

/* ── Detail panel ───────────────────────────────────────────────── */
function DetailPanel({ co, onClose }: { co: Company; onClose?: () => void }) {
  const [ready, setReady] = useState(false);
  const [activeFW, setActiveFW] = useState<string | null>(null);
  const [activeDisc, setActiveDisc] = useState<number | null>(null);
  const [aiData, setAiData] = useState<ESGEngineOutput | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const circumference = 2 * Math.PI * 52;
  const notes = generateNotes(co);
  const ext = EXTENDED[co.ticker];

  useEffect(() => {
    setActiveFW(co.frameworks.includes("GRI") ? "GRI" : co.frameworks[0] ?? null);
    setActiveDisc(null);
    setReady(false);
    const t = setTimeout(() => setReady(true), 60);
    return () => clearTimeout(t);
  }, [co.ticker]);

  useEffect(() => { setAiData(null); setAiError(null); }, [co.ticker]);
  useEffect(() => { setActiveDisc(null); }, [activeFW]);

  async function handleAIRefresh() {
    setAiLoading(true);
    setAiError(null);
    try {
      const res = await fetch("/api/esg-engine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company_name: co.name,
          ticker: co.ticker,
          existing_data: { ...co, extended: EXTENDED[co.ticker] },
        }),
      });
      if (!res.ok) {
        const payload = await res.json().catch(() => ({})) as { error?: string };
        throw new Error(payload.error ?? `Server error ${res.status}`);
      }
      setAiData(await res.json() as ESGEngineOutput);
    } catch (e) {
      setAiError(e instanceof Error ? e.message : "Analysis failed. Please try again.");
    } finally {
      setAiLoading(false);
    }
  }

  const sentimentLabel = co.score >= 75 ? { text: "↑ Improving", cls: "bg-emerald-100 text-emerald-700" } : co.score >= 55 ? { text: "→ Stable", cls: "bg-amber-100 text-amber-700" } : { text: "↓ Under Review", cls: "bg-red-100 text-red-700" };

  return (
    <div className="h-full overflow-x-hidden overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="p-4 sm:p-7 space-y-6">

        {/* Mobile back */}
        {onClose && <button type="button" onClick={onClose} className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-900 lg:hidden"><ChevronLeft className="h-4 w-4" /> Back to list</button>}

        {/* ── 1. Header ─────────────────────────────── */}
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{co.name}</h2>
            <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">{co.sector} <span className="mx-1">•</span> {co.country} <span className="mx-1">•</span> <span className="font-mono font-semibold text-primary">{co.ticker}</span></p>
            <span className={`mt-2 inline-flex items-center gap-1 rounded-full bg-gradient-to-r ${co.badge.color} px-2.5 py-1 text-[11px] font-bold text-white shadow-sm`}>{co.badge.icon} {co.badge.label}</span>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{co.about}</p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {co.tags.map(t => <span key={t} className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800">{t}</span>)}
            </div>
          </div>
          <div className="shrink-0 text-center">
            <div className="relative flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24">
              <svg className={`absolute inset-0 h-20 w-20 -rotate-90 sm:h-24 sm:w-24 ${scoreRing(co.score)}`} viewBox="0 0 120 120" aria-hidden>
                <circle cx="60" cy="60" r="52" className="fill-none stroke-slate-100" strokeWidth="9" />
                <circle cx="60" cy="60" r="52" className="fill-none stroke-current transition-all duration-700" strokeWidth="9" strokeLinecap="round" strokeDasharray={`${ready?(co.score/100)*circumference:0} ${circumference}`} />
              </svg>
              <div className="relative text-center"><p className="text-xl font-black text-slate-900 sm:text-2xl">{co.score}</p><p className="text-[9px] font-semibold text-slate-400">/100</p></div>
            </div>
            <p className="mt-1 text-[9px] font-bold uppercase tracking-widest text-slate-400">ESG Score</p>
            <span className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${sentimentLabel.cls}`}>{sentimentLabel.text}</span>
          </div>
        </div>

        {/* ── 2. Info bar (5 cols) ───────────────────── */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {[
            { icon: <Building2 className="h-3.5 w-3.5"/>, label:"Headquarters",    val: co.hq },
            { icon: <Users className="h-3.5 w-3.5"/>,     label:"Employees",       val: co.employees },
            { icon: <DollarSign className="h-3.5 w-3.5"/>,label:"Revenue",         val: co.revenue },
            { icon: ext?.emissions.trendDir === "down" ? <TrendingDown className="h-3.5 w-3.5"/> : <TrendingUp className="h-3.5 w-3.5"/>, label:"Net Emissions", val: ext?.emissions.value ?? "—" },
            { icon: <Minus className="h-3.5 w-3.5"/>,     label:"Climate Goal",    val: ext?.emissions.goal ?? "—" },
          ].map(({icon,label,val}, i) => (
            <div key={label} className={`rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5 ${i === 4 ? "col-span-2 sm:col-span-1" : ""}`}>
              <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-slate-400">{icon}{label}</div>
              <p className="mt-1 text-xs font-bold leading-tight text-slate-800">{val}</p>
            </div>
          ))}
        </div>

        {/* ── AI Intelligence ───────────────────────── */}
        <AIIntelligencePanel
          co={co}
          aiData={aiData}
          aiLoading={aiLoading}
          aiError={aiError}
          onRefresh={handleAIRefresh}
        />

        {/* ── 3. Greenwashing Risk Meter ────────────── */}
        <GreenwashingRiskMeter co={co} ext={ext} />

        {/* ── 4. ESG Rating Impact Chart ────────────── */}
        <ESGRatingChart ext={ext} />

        {/* ── 5. Three-column section ────────────────── */}
        <div className="grid gap-4 lg:grid-cols-3">

          {/* ESG Score Breakdown */}
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">ESG Score Breakdown</p>
            <div className="space-y-3">
              {[
                { label:"Environment", val:co.e, cls:"bg-emerald-500", delay:"0ms" },
                { label:"Social",      val:co.s, cls:"bg-teal-400",    delay:"120ms" },
                { label:"Governance",  val:co.g, cls:"bg-sky-500",     delay:"240ms" },
              ].map(({label,val,cls,delay}) => (
                <div key={label}>
                  <div className="mb-1 flex justify-between text-xs font-semibold text-slate-700"><span>{label}</span><span>{val} / 100</span></div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                    <div className={`h-full rounded-full ${cls}`} style={{ width: ready?`${val}%`:"0%", transition:`width 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Metrics */}
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">Progress Metrics</p>
            <div className="space-y-4">
              {ext?.progressMetrics.map(m => (
                <div key={m.label}>
                  <div className="mb-1 flex justify-between text-xs font-semibold text-slate-700"><span className="truncate pr-2">{m.label}</span><span className="shrink-0 font-bold text-primary">{m.pct}%</span></div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full rounded-full bg-emerald-500" style={{ width: ready?`${m.pct}%`:"0%", transition:"width 0.9s cubic-bezier(0.22,1,0.36,1) 200ms" }} />
                  </div>
                  <p className="mt-1 text-[10px] leading-snug text-slate-400">{m.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Emissions Breakdown */}
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">Emissions Breakdown</p>
            {ext && (
              <>
                <div className="flex justify-center">
                  <DonutChart segs={ext.emissionsBreakdown} />
                </div>
                <div className="mt-3 space-y-1.5">
                  {ext.emissionsBreakdown.map(s => (
                    <div key={s.label} className="flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{background:s.color}} /><span className="text-slate-600">{s.label}</span></div>
                      <span className="font-semibold text-slate-700">{s.pct}% · {s.value}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-[10px] text-slate-400">Trend: <span className={ext.emissions.trendDir==="down"?"text-emerald-600 font-semibold":"text-red-500 font-semibold"}>{ext.emissions.trend}</span></p>
              </>
            )}
          </div>
        </div>

        {/* ── 5. CSR Rating & Framework Tabs ───────── */}
        <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">CSR Rating &amp; Reporting Frameworks</p>
          <div className="no-scrollbar flex items-center gap-2 overflow-x-auto">
            <span className="shrink-0 rounded-full bg-slate-900 px-3 py-1.5 text-xs font-bold text-white">CSR: {co.csr}</span>
            {co.frameworks.map(f => {
              const on = activeFW === f;
              return (
                <button key={f} type="button" onClick={() => setActiveFW(on ? null : f)}
                  className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${on ? "border-emerald-500 bg-emerald-500 text-white shadow-sm" : "border-emerald-200 bg-white text-emerald-700 hover:border-emerald-400 hover:bg-emerald-50"}`}>
                  {f}
                </button>
              );
            })}
          </div>

          {activeFW && (() => {
            const grade = (co.frameworkRatings as unknown as Record<string,string>)[activeFW] ?? "B";
            const fwScore = gradeToScore(grade);
            const lbl = scoreLabel(fwScore);
            const disclosures = FRAMEWORK_DISCLOSURES[activeFW] ?? [];
            return (
              <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xs font-black text-white ${FW_STYLE[activeFW] ?? "bg-slate-700"}`}>{activeFW}</div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{FRAMEWORK_INFO[activeFW]?.full}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-xl font-black text-slate-900">{fwScore}</span>
                        <span className="text-xs text-slate-400">/ 100</span>
                        <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${lbl.cls}`}>{lbl.text}</span>
                      </div>
                    </div>
                  </div>
                  <button type="button" onClick={() => setActiveFW(null)} className="shrink-0 rounded-lg p-1.5 text-slate-400 hover:bg-white hover:text-slate-600"><X className="h-4 w-4"/></button>
                </div>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white">
                  <div className="h-full rounded-full bg-emerald-500 transition-all duration-700" style={{ width:`${fwScore}%` }} />
                </div>
                <div className="mt-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Key Disclosures</p>
                  {(() => {
                    const ratings = disclosureRatings(fwScore, disclosures.length);
                    return (
                      <ul className="mt-2 divide-y divide-slate-100 rounded-xl border border-slate-100 bg-white overflow-hidden">
                        {disclosures.map((d, i) => {
                          const rating = ratings[i];
                          const open = activeDisc === i;
                          return (
                            <li key={d}>
                              <button
                                type="button"
                                onClick={() => setActiveDisc(open ? null : i)}
                                className="flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left transition-colors hover:bg-slate-50"
                              >
                                <span className={`text-xs font-medium ${open ? "text-primary" : "text-slate-700"}`}>{d}</span>
                                <div className="flex shrink-0 items-center gap-2">
                                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${rating.cls}`}>{rating.label}</span>
                                  <ChevronDown className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
                                </div>
                              </button>
                              {open && (
                                <div className="border-t border-slate-50 bg-emerald-50/40 px-4 py-3">
                                  <p className="text-[11px] leading-relaxed text-slate-600">{getDisclosureDetail(co, ext, activeFW!, i)}</p>
                                </div>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    );
                  })()}
                </div>
                <p className="mt-3 text-[11px] leading-relaxed text-slate-400">{FRAMEWORK_INFO[activeFW]?.body}</p>
              </div>
            );
          })()}
        </div>

        {/* ── 5. Key Highlights ─────────────────────── */}
        {ext && (
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">Key Environmental &amp; Social Highlights</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
              {ext.highlights.map((h, i) => (
                <div key={h.label} className={`rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-3 text-center ${i === 4 ? "col-span-2 sm:col-span-1" : ""}`}>
                  <p className="text-xl">{h.icon}</p>
                  <p className="mt-1 text-sm font-black text-slate-900 leading-tight">{h.value}</p>
                  <p className="mt-0.5 text-[10px] leading-snug text-slate-500">{h.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}


        {/* ── 6. AI Notes + Key Risks ───────────────── */}
        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">✦ AI-Generated Diligence Notes</p>
            <div className="space-y-2">
              {notes.map((n,i) => (
                <div key={i} className="flex gap-3 rounded-xl border border-slate-100 bg-white p-3.5 shadow-sm">
                  <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${n.tone}`} />
                  <p className="text-xs leading-relaxed text-slate-700">{n.text}</p>
                </div>
              ))}
            </div>
          </div>
          {ext && (
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">⚠ Key Risks &amp; Considerations</p>
              <div className="space-y-2">
                {ext.risks.map(r => (
                  <div key={r.label} className="rounded-xl border border-slate-100 bg-white p-3.5 shadow-sm">
                    <div className="flex items-center gap-2"><span className={`h-2.5 w-2.5 shrink-0 rounded-full ${r.dot}`} /><p className="text-xs font-semibold text-slate-800">{r.label}</p></div>
                    <p className="mt-1 pl-4 text-[11px] leading-relaxed text-slate-500">{r.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── 7. Weekly ESG Watch ──────────────────── */}
        {ext?.weeklyWatch && (() => {
          const { weekOf, items } = ext.weeklyWatch!;
          const verdictStyle = {
            genuine:      { badge: "bg-emerald-100 text-emerald-700 border-emerald-200", dot: "bg-emerald-500", bar: "border-emerald-200 bg-emerald-50/40", label: "Genuine" },
            greenwashing: { badge: "bg-red-100 text-red-700 border-red-200",             dot: "bg-red-500",     bar: "border-red-200 bg-red-50/40",         label: "Greenwashing" },
            questionable: { badge: "bg-amber-100 text-amber-700 border-amber-200",       dot: "bg-amber-400",   bar: "border-amber-200 bg-amber-50/40",     label: "Questionable" },
          };
          const counts = { genuine: 0, greenwashing: 0, questionable: 0 };
          items.forEach(it => counts[it.verdict]++);
          return (
            <div>
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">📰 Weekly ESG Watch</p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400">Week of {weekOf}</span>
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">{counts.genuine} genuine</span>
                  <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700">{counts.questionable} questionable</span>
                  {counts.greenwashing > 0 && <span className="rounded-full border border-red-200 bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-700">{counts.greenwashing} greenwashing</span>}
                </div>
              </div>
              <div className="space-y-3">
                {items.map((item, i) => {
                  const s = verdictStyle[item.verdict];
                  return (
                    <div key={i} className={`rounded-xl border p-4 ${s.bar}`}>
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className={`h-2 w-2 shrink-0 rounded-full ${s.dot}`} />
                          <span className="text-[10px] font-semibold text-slate-400">{item.date} · {item.source}</span>
                        </div>
                        <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${s.badge}`}>{s.label}</span>
                      </div>
                      <p className="mt-2 text-xs font-semibold leading-snug text-slate-800">{item.headline}</p>
                      <div className="mt-2 flex items-center gap-1.5">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">vs goal</span>
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">{item.relatedGoal}</span>
                      </div>
                      <p className="mt-2 text-[11px] leading-relaxed text-slate-500">{item.analysis}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* ── 8. Download Reports ───────────────────── */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">Download Reports</p>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={() => alert(`ESG Report for ${co.name} — coming soon`)} className="group flex items-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-2.5 text-sm font-semibold text-emerald-700 shadow-sm transition-all hover:border-emerald-400 hover:bg-emerald-50 hover:shadow-md">
              <BarChart2 className="h-4 w-4 text-emerald-500 group-hover:scale-110 transition-transform" /> ESG Report <Download className="h-3.5 w-3.5 text-emerald-400" />
            </button>
            <button type="button" onClick={() => alert(`CSR Report for ${co.name} — coming soon`)} className="group flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:shadow-md">
              <FileText className="h-4 w-4 text-slate-500 group-hover:scale-110 transition-transform" /> CSR Report <Download className="h-3.5 w-3.5 text-slate-400" />
            </button>
          </div>
          <p className="mt-3 text-[11px] text-slate-400">Ratings based on publicly disclosed information only.</p>
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
    <div className="flex min-h-screen flex-col bg-slate-50" style={{ overflowX: "clip" }}>
      <Navbar />

      {/* Subheader — scrolls with the page */}
      <div className="border-b border-slate-200 bg-white px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">Platform / Companies</p>
              <h1 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">Company ESG Ratings</h1>
              <p className="mt-0.5 text-sm text-slate-500">{companies.length} companies · {ALL_COUNTRIES.length - 1} countries · updated daily</p>
            </div>
            <div className="flex gap-2 sm:gap-3">
              {[
                { label: "Total",     val: companies.length },
                { label: "High ≥75",  val: companies.filter(c=>c.score>=75).length },
                { label: "Avg Score", val: Math.round(companies.reduce((s,c)=>s+c.score,0)/companies.length) },
              ].map(({ label, val }) => (
                <div key={label} className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-center sm:px-4">
                  <p className="text-base font-bold text-slate-900 sm:text-lg">{val}</p>
                  <p className="text-[10px] text-slate-400 sm:text-[11px]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Split layout */}
      <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex gap-6 lg:items-start">

          {/* Left panel — sticky below navbar on desktop */}
          <div className={`w-full shrink-0 lg:w-[360px] lg:sticky lg:top-16 lg:self-start ${showDetail ? "hidden lg:block" : ""}`}>
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
            <div className="max-h-[calc(100vh-220px)] overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
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
          <div className={`min-w-0 flex-1 ${!showDetail ? "hidden lg:block" : ""}`}>
            <DetailPanel co={selected} onClose={() => setShowDetail(false)} />
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
