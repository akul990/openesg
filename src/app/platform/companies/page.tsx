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
  { name: "Ørsted A/S",               ticker: "ORSTED",   sector: "Renewable Energy",   country: "Denmark",     score: 93, e: 96, s: 91, g: 92, csr: "A+",  frameworks: ["GRI","TCFD","CDP","CSRD","UNSDG","UNGC","ISO"], frameworkRatings: { GRI: "A",  TCFD: "A",  CDP: "A",  CSRD: "A", UNSDG: "A", UNGC: "A", ISO: "A"  }, hq: "Fredericia, Denmark",    employees: "7,600",   revenue: "$10.5B", tags: ["Offshore Wind","Clean Energy","Net Zero","Sustainability Leader"],    badge: { label: "Global #1 in Sustainability", icon: "🌍", color: "from-emerald-500 to-teal-500" }, about: "Ørsted is the world's most sustainable energy company, having transformed from fossil fuels into a global leader in offshore wind. Its mission is to create a world that runs entirely on green energy." },
  { name: "Vestas Wind Systems",       ticker: "VWS",      sector: "Renewable Energy",   country: "Denmark",     score: 91, e: 95, s: 89, g: 90, csr: "A+",  frameworks: ["GRI","TCFD","ISSB","UNSDG","UNGC","ISO"], frameworkRatings: { GRI: "A",  TCFD: "A",  ISSB: "A", UNSDG: "A", UNGC: "A", ISO: "A"  },             hq: "Aarhus, Denmark",         employees: "29,000",  revenue: "$15.4B", tags: ["Wind Turbines","Renewable Energy","Global OEM","Carbon Neutral"],     badge: { label: "Wind Energy Pioneer",          icon: "💨", color: "from-sky-500 to-emerald-500" }, about: "Vestas is the world's largest wind turbine manufacturer, with 170+ GW of installed capacity across 88 countries. The company has been carbon neutral since 2023 and aims to be carbon neutral across its full value chain by 2030." },
  { name: "Schneider Electric SE",     ticker: "SU",       sector: "Industrials",        country: "France",      score: 88, e: 90, s: 86, g: 88, csr: "A",   frameworks: ["GRI","TCFD","CSRD","UNSDG","UNGC","ISO"], frameworkRatings: { GRI: "A",  TCFD: "A",  CSRD: "A-", UNSDG: "A", UNGC: "A", ISO: "A"  },             hq: "Rueil-Malmaison, France", employees: "135,000", revenue: "$37.4B", tags: ["Energy Management","Smart Grid","Digital Automation","Decarbonisation"],badge: { label: "Energy Efficiency Leader",      icon: "⚡", color: "from-green-500 to-emerald-600" }, about: "Schneider Electric is a global specialist in energy management and automation. Its EcoStruxure platform helps organisations digitise and decarbonise operations — making it one of the most purpose-driven industrial companies worldwide." },
  { name: "Iberdrola S.A.",            ticker: "IBE",      sector: "Utilities",          country: "Spain",       score: 87, e: 91, s: 84, g: 86, csr: "A",   frameworks: ["GRI","TCFD","UNSDG","UNGC","ISO"], frameworkRatings: { GRI: "A-", TCFD: "A", UNSDG: "A", UNGC: "A", ISO: "A-"  },                         hq: "Bilbao, Spain",           employees: "41,000",  revenue: "$46.4B", tags: ["Green Power","Wind & Solar","Global Utilities","Low Carbon"],          badge: { label: "Green Utility Champion",        icon: "🌿", color: "from-teal-500 to-green-600" },  about: "Iberdrola is one of the world's largest electric utilities, producing over 80% of its energy from renewable sources. A pioneer of the global energy transition, the company invests more in renewables than any other utility." },
  { name: "SAP SE",                    ticker: "SAP",      sector: "Technology",         country: "Germany",     score: 85, e: 83, s: 87, g: 86, csr: "A",   frameworks: ["GRI","CSRD","ISSB","UNSDG","UNGC"], frameworkRatings: { GRI: "A",  CSRD: "A",  ISSB: "A-", UNSDG: "A", UNGC: "A"  },             hq: "Walldorf, Germany",       employees: "105,000", revenue: "$35.4B", tags: ["Enterprise Software","Cloud ERP","Sustainability Tech","AI"],           badge: { label: "Carbon Neutral Since 2023",     icon: "♻️", color: "from-emerald-600 to-cyan-500" },  about: "SAP is the market leader in enterprise application software, powering 99 of the 100 largest companies globally. SAP's sustainability solutions help customers measure and reduce their own environmental footprint at scale." },
  { name: "Unilever plc",              ticker: "ULVR",     sector: "Consumer Staples",   country: "UK",          score: 84, e: 88, s: 82, g: 79, csr: "A–",  frameworks: ["GRI","TCFD","CDP","UNSDG","UNGC","ISO"], frameworkRatings: { GRI: "A",  TCFD: "A-", CDP: "A-", UNSDG: "A", UNGC: "A", ISO: "A-"  },             hq: "London, UK",              employees: "128,000", revenue: "$62.2B", tags: ["FMCG","Sustainable Brands","Consumer Goods","Plastic Reduction"],       badge: { label: "Sustainable Living Brand",      icon: "🌱", color: "from-green-500 to-teal-400" },   about: "Unilever owns 400+ consumer brands including Dove, Ben & Jerry's, and Hellmann's. Its Compass strategy commits to halving environmental footprint while improving health and wellbeing for 1 billion people by 2030." },
  { name: "Salesforce Inc.",           ticker: "CRM",      sector: "Technology",         country: "USA",         score: 83, e: 80, s: 85, g: 84, csr: "A",   frameworks: ["GRI","TCFD","SASB","UNSDG","UNGC"], frameworkRatings: { GRI: "A-", TCFD: "A",  SASB: "A-", UNSDG: "A", UNGC: "A-"  },             hq: "San Francisco, USA",      employees: "72,000",  revenue: "$34.9B", tags: ["CRM","Cloud Software","ESG Tools","Net Zero Cloud"],                   badge: { label: "Net Zero Cloud Leader",         icon: "☁️", color: "from-cyan-500 to-teal-500" },    about: "Salesforce is the world's leading CRM platform, trusted by 150,000+ companies. It achieved net-zero residual emissions in 2021 and operates on 100% renewable energy, while offering its customers dedicated ESG reporting tools." },
  { name: "Enel SpA",                  ticker: "ENEL",     sector: "Utilities",          country: "Italy",       score: 83, e: 86, s: 81, g: 82, csr: "A",   frameworks: ["GRI","TCFD","UNSDG","UNGC","ISO"], frameworkRatings: { GRI: "A",  TCFD: "A-", UNSDG: "A", UNGC: "A-", ISO: "A-"  },                         hq: "Rome, Italy",             employees: "65,000",  revenue: "$99.9B", tags: ["Renewable Utilities","Solar","Wind Power","Just Transition"],           badge: { label: "Renewable Energy Leader",       icon: "☀️", color: "from-amber-500 to-emerald-500" }, about: "Enel is Europe's largest utility and a global renewable energy leader with 60+ GW of renewable capacity across 30 countries. The company's Open Power strategy drives the just transition to a sustainable energy model." },
  { name: "Roche Holding AG",          ticker: "ROG",      sector: "Healthcare",         country: "Switzerland", score: 82, e: 80, s: 84, g: 83, csr: "A",   frameworks: ["GRI","SASB","TCFD","UNSDG","UNGC","ISO"], frameworkRatings: { GRI: "A",  SASB: "A",  TCFD: "B+", UNSDG: "A", UNGC: "A", ISO: "A"  },            hq: "Basel, Switzerland",      employees: "103,000", revenue: "$58.7B", tags: ["Pharmaceuticals","Diagnostics","Biotech","Access to Medicine"],         badge: { label: "Sustainable Healthcare",        icon: "🧬", color: "from-blue-500 to-emerald-500" },  about: "Roche is a global pioneer in pharmaceuticals and diagnostics, committed to improving lives while minimising its environmental impact. The company has been carbon neutral since 2021 and sets science-based targets across its value chain." },
  { name: "Adobe Inc.",                ticker: "ADBE",     sector: "Technology",         country: "USA",         score: 82, e: 79, s: 84, g: 83, csr: "A",   frameworks: ["GRI","SASB","UNSDG","UNGC"], frameworkRatings: { GRI: "A-", SASB: "A-", UNSDG: "A-", UNGC: "A-"  },                         hq: "San Jose, USA",           employees: "29,000",  revenue: "$21.5B", tags: ["Creative Software","Digital Media","Cloud","AI Content"],               badge: { label: "100% Renewable Operations",     icon: "💡", color: "from-purple-500 to-emerald-500" },about: "Adobe empowers creativity for billions of people through its Creative Cloud, Document Cloud, and Experience Cloud platforms. The company has run on 100% renewable electricity since 2019 and publicly reports its full supply chain emissions." },
  { name: "Microsoft Corporation",     ticker: "MSFT",     sector: "Technology",         country: "USA",         score: 81, e: 78, s: 83, g: 85, csr: "A–",  frameworks: ["GRI","TCFD","ISSB","UNSDG","UNGC","EPEAT"], frameworkRatings: { GRI: "A",  TCFD: "A",  ISSB: "B+", UNSDG: "A-", UNGC: "A-", EPEAT: "A-"  },            hq: "Redmond, USA",            employees: "221,000", revenue: "$245.1B",tags: ["Cloud Computing","AI","Enterprise Software","Carbon Negative"],         badge: { label: "Carbon Negative by 2030",       icon: "🔋", color: "from-blue-600 to-teal-500" },    about: "Microsoft is a global technology leader in cloud, AI, and productivity software. It has pledged to be carbon negative by 2030 and to remove all its historical carbon emissions by 2050 — among the most ambitious corporate climate commitments globally." },
  { name: "Mastercard Inc.",           ticker: "MA",       sector: "Financial Services", country: "USA",         score: 80, e: 76, s: 82, g: 83, csr: "A–",  frameworks: ["GRI","TCFD","UNSDG","UNGC"], frameworkRatings: { GRI: "B+", TCFD: "B+", UNSDG: "B+", UNGC: "B+"  },                        hq: "Purchase, USA",           employees: "33,000",  revenue: "$25.1B", tags: ["Payments","Fintech","Digital Commerce","Financial Inclusion"],          badge: { label: "Financial Inclusion Leader",    icon: "🤝", color: "from-orange-500 to-emerald-500" },about: "Mastercard connects billions of people and businesses through its global payments network. Its Priceless Planet Coalition has committed to restoring 100 million trees, and its Centre for Inclusive Growth reaches underserved communities worldwide." },
  { name: "Apple Inc.",                ticker: "AAPL",     sector: "Technology",         country: "USA",         score: 74, e: 68, s: 79, g: 81, csr: "B+",  frameworks: ["GRI","TCFD","SASB","UNSDG","UNGC","EPEAT"], frameworkRatings: { GRI: "B+", TCFD: "B",  SASB: "B+", UNSDG: "B+", UNGC: "B", EPEAT: "A-"  },            hq: "Cupertino, USA",          employees: "164,000", revenue: "$391.0B",tags: ["Consumer Electronics","iOS","Services","Recycled Materials"],           badge: { label: "Carbon Neutral Products",       icon: "🍃", color: "from-slate-600 to-emerald-500" }, about: "Apple designs iPhone, Mac, iPad, and services used by 2 billion people worldwide. The company's 2030 goal targets fully carbon neutral products across the entire supply chain and product lifecycle — one of the largest commitments in consumer technology." },
  { name: "Tesla Inc.",                ticker: "TSLA",     sector: "Automobiles",        country: "USA",         score: 58, e: 72, s: 48, g: 52, csr: "C+",  frameworks: ["TCFD","SASB","UNSDG","UNGC"], frameworkRatings: { TCFD: "C+", SASB: "B-", UNSDG: "C+", UNGC: "C+"  },                       hq: "Austin, USA",             employees: "140,000", revenue: "$97.7B", tags: ["Electric Vehicles","Battery Storage","Solar","Autonomous"],             badge: { label: "EV Transition Pioneer",         icon: "⚡", color: "from-red-500 to-slate-600" },     about: "Tesla accelerates the world's transition to sustainable energy through electric vehicles, solar panels, and battery storage. Despite its clean energy mission, the company's social governance and supply chain disclosures remain limited relative to industry leaders." },
  { name: "ExxonMobil Corporation",    ticker: "XOM",      sector: "Energy",             country: "USA",         score: 41, e: 29, s: 48, g: 54, csr: "C",   frameworks: ["TCFD","UNSDG","UNGC"], frameworkRatings: { TCFD: "C", UNSDG: "C", UNGC: "C"  },                                    hq: "Spring, Texas, USA",      employees: "62,000",  revenue: "$398.7B",tags: ["Oil & Gas","Petrochemicals","Refining","Carbon Capture"],               badge: { label: "Under Climate Scrutiny",        icon: "⚠️", color: "from-red-600 to-orange-500" },    about: "ExxonMobil is one of the world's largest publicly traded oil and gas companies. The company faces significant investor and regulatory pressure over its climate transition plan, which critics argue lacks credible Scope 3 targets and near-term capital reallocation." },
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

/* ── Extended dashboard data ────────────────────────────────────── */
type ExtData = {
  emissions: { value: string; trend: string; trendDir: "down"|"up"; goal: string; goalDetail: string };
  progressMetrics: { label: string; pct: number; detail: string }[];
  emissionsBreakdown: { label: string; pct: number; value: string; color: string }[];
  highlights: { value: string; label: string; icon: string }[];
  risks: { label: string; detail: string; dot: string }[];
};
const EXTENDED: Record<string, ExtData> = {
  ORSTED: { emissions: { value:"3.1M tCO₂e", trend:"−72% since 2006", trendDir:"down", goal:"Carbon Neutral by 2025", goalDetail:"Full value-chain net zero" }, progressMetrics: [{ label:"Renewable Generation Share", pct:99, detail:"99% of all electricity from offshore wind assets" },{ label:"Carbon Neutral Operations", pct:100, detail:"100% renewable electricity across all facilities" },{ label:"2030 Capacity Target", pct:88, detail:"16.2 GW installed of 18 GW 2030 target" }], emissionsBreakdown: [{ label:"Supply Chain", pct:68, value:"2.1M tCO₂e", color:"#6ee7b7" },{ label:"Operations", pct:12, value:"0.4M tCO₂e", color:"#10b981" },{ label:"Logistics", pct:12, value:"0.4M tCO₂e", color:"#34d399" },{ label:"Other", pct:8, value:"0.2M tCO₂e", color:"#a7f3d0" }], highlights: [{ value:"99%", label:"Renewable generation share", icon:"🌊" },{ value:"−72%", label:"Emissions vs 2006", icon:"📉" },{ value:"16.2 GW", label:"Offshore wind capacity", icon:"💨" },{ value:"#1", label:"World's most sustainable company", icon:"🌍" },{ value:"2025", label:"Carbon neutrality target", icon:"🎯" }], risks: [{ label:"Supply Chain Constraints", detail:"Offshore wind supply chain bottlenecks may delay project timelines and increase CapEx.", dot:"bg-amber-400" },{ label:"Grid Connection Delays", detail:"Permitting and grid capacity limitations in key markets could affect deployment speed.", dot:"bg-amber-400" },{ label:"No Major ESG Controversies", detail:"Strong governance and no significant ESG controversies reported.", dot:"bg-emerald-400" }] },
  VWS: { emissions: { value:"0 tCO₂e", trend:"Carbon Neutral since 2023", trendDir:"down", goal:"Net Zero by 2030", goalDetail:"Full value-chain net zero" }, progressMetrics: [{ label:"Carbon Neutral Operations", pct:100, detail:"100% offset across own operations since 2023" },{ label:"Renewable Electricity (Facilities)", pct:100, detail:"All owned facilities on 100% renewable contracts" },{ label:"Value Chain Emissions Reduction", pct:55, detail:"55% progress toward 2030 net-zero goal" }], emissionsBreakdown: [{ label:"Manufacturing", pct:58, value:"Major", color:"#3b82f6" },{ label:"Transport", pct:22, value:"Medium", color:"#93c5fd" },{ label:"Blade Production", pct:14, value:"Minor", color:"#bfdbfe" },{ label:"Operations", pct:6, value:"Minimal", color:"#dbeafe" }], highlights: [{ value:"170+ GW", label:"Cumulative installed capacity", icon:"💨" },{ value:"88", label:"Countries with installations", icon:"🌍" },{ value:"100%", label:"Renewable electricity (facilities)", icon:"⚡" },{ value:"29,000", label:"Employees worldwide", icon:"👥" },{ value:"2030", label:"Full value-chain net-zero target", icon:"🎯" }], risks: [{ label:"Raw Material Supply Risk", detail:"Rare earth and steel price volatility could compress margins.", dot:"bg-amber-400" },{ label:"Chinese OEM Competition", detail:"Increasing competition from Chinese manufacturers puts pricing pressure globally.", dot:"bg-amber-400" },{ label:"Strong Safety Record", detail:"Industry-leading safety performance and no major product incidents.", dot:"bg-emerald-400" }] },
  SU: { emissions: { value:"1.2M tCO₂e", trend:"−47% since 2017", trendDir:"down", goal:"Carbon Neutral by 2025", goalDetail:"Operations; full value chain by 2040" }, progressMetrics: [{ label:"Renewable Electricity", pct:74, detail:"74% of own electricity from renewable sources" },{ label:"Carbon Neutral Roadmap", pct:85, detail:"85% progress toward 2025 operations target" },{ label:"Supplier Decarbonisation", pct:68, detail:"68% of top 1,000 suppliers have set SBTs" }], emissionsBreakdown: [{ label:"Manufacturing", pct:42, value:"0.5M tCO₂e", color:"#10b981" },{ label:"Supply Chain", pct:38, value:"0.46M tCO₂e", color:"#34d399" },{ label:"Logistics", pct:13, value:"0.16M tCO₂e", color:"#6ee7b7" },{ label:"Facilities", pct:7, value:"0.08M tCO₂e", color:"#a7f3d0" }], highlights: [{ value:"74%", label:"Renewable electricity share", icon:"⚡" },{ value:"−47%", label:"Emissions reduction vs 2017", icon:"📉" },{ value:"370M+", label:"Customers served globally", icon:"🌍" },{ value:"135,000", label:"Employees in 100+ countries", icon:"👥" },{ value:"2025", label:"Carbon neutral operations target", icon:"🎯" }], risks: [{ label:"Scope 3 Value Chain", detail:"Scope 3 represents 80%+ of total footprint and remains the largest challenge.", dot:"bg-amber-400" },{ label:"Cybersecurity Exposure", detail:"Smart grid and industrial IoT products carry elevated cybersecurity risk.", dot:"bg-amber-400" },{ label:"DJSI Top-10 for 14 Years", detail:"Consistent Dow Jones Sustainability Index top-10 ranking.", dot:"bg-emerald-400" }] },
  IBE: { emissions: { value:"45.7M tCO₂e", trend:"−77% per MWh vs 2007", trendDir:"down", goal:"Net Zero by 2040", goalDetail:"Zero net emissions, all operations" }, progressMetrics: [{ label:"Renewable Energy Share", pct:80, detail:"80% of installed capacity from zero-emission sources" },{ label:"Net Zero Roadmap Progress", pct:62, detail:"62% of 2040 pathway milestones on track" },{ label:"Green CapEx Allocation", pct:91, detail:"91% of CapEx directed to renewables" }], emissionsBreakdown: [{ label:"Gas Generation", pct:55, value:"25.1M tCO₂e", color:"#f59e0b" },{ label:"Transmission Losses", pct:25, value:"11.4M tCO₂e", color:"#fcd34d" },{ label:"Renewables Residual", pct:12, value:"5.5M tCO₂e", color:"#6ee7b7" },{ label:"Other", pct:8, value:"3.7M tCO₂e", color:"#a7f3d0" }], highlights: [{ value:"80%", label:"Capacity from renewables", icon:"🌿" },{ value:"40 GW", label:"Renewable capacity installed", icon:"⚡" },{ value:"−77%", label:"Emissions intensity vs 2007", icon:"📉" },{ value:"€17B+", label:"Green investment 2020–2025", icon:"💰" },{ value:"2040", label:"Net zero target year", icon:"🎯" }], risks: [{ label:"Spanish Regulatory Risk", detail:"Energy price controls and windfall taxes create revenue uncertainty.", dot:"bg-red-400" },{ label:"Currency & Country Risk", detail:"Exposure to Brazil, Mexico, and USA introduces FX and political risk.", dot:"bg-amber-400" },{ label:"Green Bond Pioneer", detail:"€40B+ raised for renewable energy — pioneer in sustainable finance.", dot:"bg-emerald-400" }] },
  SAP: { emissions: { value:"0 tCO₂e net", trend:"Carbon Neutral since 2023", trendDir:"down", goal:"Net Zero by 2030", goalDetail:"Full Scope 1, 2 & 3" }, progressMetrics: [{ label:"Carbon Neutral Operations", pct:100, detail:"100% carbon neutral across all SAP facilities since 2023" },{ label:"Renewable Electricity", pct:100, detail:"All SAP data centers and offices on renewable contracts" },{ label:"Net Zero Value Chain", pct:45, detail:"45% progress on Scope 3 reduction toward 2030" }], emissionsBreakdown: [{ label:"Business Travel", pct:55, value:"Major Scope 3", color:"#3b82f6" },{ label:"Supply Chain IT", pct:25, value:"Scope 3", color:"#93c5fd" },{ label:"Commuting", pct:12, value:"Scope 3", color:"#bfdbfe" },{ label:"Facilities", pct:8, value:"Scope 1+2", color:"#dbeafe" }], highlights: [{ value:"100%", label:"Renewable electricity since 2014", icon:"⚡" },{ value:"2023", label:"Year carbon neutrality achieved", icon:"♻️" },{ value:"99/100", label:"Largest companies using SAP", icon:"🏢" },{ value:"105,000", label:"Employees in 180 countries", icon:"👥" },{ value:"2030", label:"Net Zero full value chain target", icon:"🎯" }], risks: [{ label:"Scope 3 Business Travel", detail:"Business travel remains the dominant Scope 3 source; post-COVID rebound slowed progress.", dot:"bg-amber-400" },{ label:"Data Privacy & AI Ethics", detail:"Expanding AI products introduce material governance and data-privacy risk.", dot:"bg-amber-400" },{ label:"Industry-Leading Disclosure", detail:"Highest DACH region governance score; 45% female board representation.", dot:"bg-emerald-400" }] },
  ULVR: { emissions: { value:"3.6M tCO₂e", trend:"−57% vs 2015", trendDir:"down", goal:"Net Zero by 2039", goalDetail:"Full Scope 1, 2 & 3" }, progressMetrics: [{ label:"Manufacturing Emissions Reduction", pct:57, detail:"57% absolute reduction in manufacturing GHG since 2015" },{ label:"Renewable Electricity (Mfg.)", pct:100, detail:"All manufacturing sites on 100% renewable electricity" },{ label:"Sustainable Living Brands Share", pct:61, detail:"61% of portfolio brands meet Sustainable Living criteria" }], emissionsBreakdown: [{ label:"Consumer Use", pct:60, value:"2.2M tCO₂e", color:"#f59e0b" },{ label:"Supply Chain", pct:25, value:"0.9M tCO₂e", color:"#fcd34d" },{ label:"Manufacturing", pct:10, value:"0.36M tCO₂e", color:"#10b981" },{ label:"Logistics", pct:5, value:"0.18M tCO₂e", color:"#6ee7b7" }], highlights: [{ value:"100%", label:"Renewable electricity in manufacturing", icon:"⚡" },{ value:"−57%", label:"Manufacturing GHG vs 2015", icon:"📉" },{ value:"400+", label:"Consumer brands globally", icon:"🛒" },{ value:"€1B", label:"Climate & nature fund", icon:"🌿" },{ value:"2039", label:"Full net zero target year", icon:"🎯" }], risks: [{ label:"Plastic Packaging Lagging", detail:"Plastic reduction targets lag 2022 voluntary pledges; investor scrutiny increasing.", dot:"bg-red-400" },{ label:"Scope 3 Consumer Emissions", detail:"Consumer use-phase is 60%+ of footprint and difficult to influence directly.", dot:"bg-amber-400" },{ label:"Strong Social Performance", detail:"Living wage extended to tier-2 suppliers across 12 high-risk sourcing markets.", dot:"bg-emerald-400" }] },
  CRM: { emissions: { value:"0 tCO₂e net", trend:"Net Zero since 2021", trendDir:"down", goal:"Net Zero maintained", goalDetail:"100% renewables + carbon removal" }, progressMetrics: [{ label:"Renewable Energy", pct:100, detail:"100% renewable electricity across all Salesforce operations since 2022" },{ label:"Net Zero Achievement", pct:100, detail:"Net zero residual emissions achieved in fiscal year 2021" },{ label:"Trees Planted", pct:72, detail:"1.7M of 2.4M tree commitment delivered by end-2024" }], emissionsBreakdown: [{ label:"Cloud Infrastructure", pct:48, value:"Scope 3", color:"#06b6d4" },{ label:"Business Travel", pct:32, value:"Scope 3", color:"#67e8f9" },{ label:"Supply Chain", pct:14, value:"Scope 3", color:"#a5f3fc" },{ label:"Facilities", pct:6, value:"Scope 1+2", color:"#cffafe" }], highlights: [{ value:"100%", label:"Renewable electricity operations", icon:"☁️" },{ value:"2021", label:"Year net zero achieved", icon:"♻️" },{ value:"1.7M", label:"Trees planted toward 2.4M target", icon:"🌳" },{ value:"150K+", label:"Customers on Salesforce", icon:"🤝" },{ value:"$100M", label:"Sustainability Cloud investment", icon:"💡" }], risks: [{ label:"Cloud Vendor Scope 3", detail:"Hyperscaler cloud energy is the largest remaining Scope 3 source.", dot:"bg-amber-400" },{ label:"AI Energy Demand Growth", detail:"Rapid AI adoption may drive data center energy growth offsetting renewable progress.", dot:"bg-amber-400" },{ label:"No Major ESG Controversies", detail:"Clean track record with strong governance and transparent sustainability reporting.", dot:"bg-emerald-400" }] },
  ENEL: { emissions: { value:"80M tCO₂e", trend:"−25% vs 2017", trendDir:"down", goal:"Net Zero by 2040", goalDetail:"Full decarbonisation of generation mix" }, progressMetrics: [{ label:"Renewable Capacity Share", pct:62, detail:"62% of total generation capacity from renewables" },{ label:"Coal Phase-Out", pct:75, detail:"75% coal capacity retired; full exit planned by 2027" },{ label:"Green CapEx Share", pct:88, detail:"88% of CapEx allocated to green and digital transition" }], emissionsBreakdown: [{ label:"Gas Generation", pct:62, value:"49.6M tCO₂e", color:"#f97316" },{ label:"Coal (Residual)", pct:22, value:"17.6M tCO₂e", color:"#fb923c" },{ label:"Grid Losses", pct:10, value:"8.0M tCO₂e", color:"#fdba74" },{ label:"Other", pct:6, value:"4.8M tCO₂e", color:"#fed7aa" }], highlights: [{ value:"60 GW", label:"Renewable capacity installed", icon:"☀️" },{ value:"30", label:"Countries of operation", icon:"🌍" },{ value:"−25%", label:"GHG emissions vs 2017", icon:"📉" },{ value:"148 GW", label:"Renewable target by 2030", icon:"⚡" },{ value:"2040", label:"Net zero target year", icon:"🎯" }], risks: [{ label:"Coal Transition Pace", detail:"Residual coal assets may slow decarbonisation and attract divestment pressure.", dot:"bg-red-400" },{ label:"Emerging Market Exposure", detail:"Operations in Latin America expose the group to political and currency risk.", dot:"bg-amber-400" },{ label:"Just Transition Commitment", detail:"Enel's framework covers 11,000 workers in coal-affected communities.", dot:"bg-emerald-400" }] },
  ROG: { emissions: { value:"1.5M tCO₂e", trend:"Carbon Neutral since 2021", trendDir:"down", goal:"Net Zero by 2045", goalDetail:"Full value chain Scope 1, 2 & 3" }, progressMetrics: [{ label:"Carbon Neutral Operations", pct:100, detail:"100% carbon neutral Scope 1 & 2 since 2021" },{ label:"Renewable Electricity", pct:90, detail:"90% of electricity from renewable sources" },{ label:"Water Efficiency", pct:64, detail:"64% reduction in water consumption per unit vs 2004" }], emissionsBreakdown: [{ label:"Clinical Waste", pct:38, value:"0.57M tCO₂e", color:"#3b82f6" },{ label:"Supply Chain", pct:35, value:"0.52M tCO₂e", color:"#93c5fd" },{ label:"Manufacturing", pct:18, value:"0.27M tCO₂e", color:"#bfdbfe" },{ label:"Transport", pct:9, value:"0.14M tCO₂e", color:"#dbeafe" }], highlights: [{ value:"2021", label:"Year carbon neutrality achieved", icon:"🧬" },{ value:"90%", label:"Renewable electricity share", icon:"⚡" },{ value:"−80%", label:"Emissions reduction vs 2004", icon:"📉" },{ value:"1,000+", label:"Products for neglected diseases", icon:"💊" },{ value:"2045", label:"Net zero value chain target", icon:"🎯" }], risks: [{ label:"Tier-2 Supply Chain Gaps", detail:"Beyond tier-1, supply chain human-rights due diligence remains incomplete.", dot:"bg-amber-400" },{ label:"Drug Pricing Pressure", detail:"Access-to-medicine obligations and pricing reviews pose financial and reputational risk.", dot:"bg-amber-400" },{ label:"Strong Safety & Quality", detail:"No major product safety incidents; robust quality management systems company-wide.", dot:"bg-emerald-400" }] },
  ADBE: { emissions: { value:"0 tCO₂e net", trend:"Carbon Neutral since 2016", trendDir:"down", goal:"Net Zero by 2035", goalDetail:"Full Scope 1, 2 & 3 value chain" }, progressMetrics: [{ label:"Renewable Electricity", pct:100, detail:"100% renewable electricity across all Adobe facilities since 2019" },{ label:"Net Zero Scope 1+2", pct:100, detail:"Net zero GHG for Scope 1 & 2 emissions since 2016" },{ label:"Scope 3 Value Chain Reduction", pct:38, detail:"38% progress on full Scope 3 toward 2035 target" }], emissionsBreakdown: [{ label:"Cloud & Data Centers", pct:52, value:"Largest Scope 3", color:"#8b5cf6" },{ label:"Business Travel", pct:28, value:"Major Scope 3", color:"#a78bfa" },{ label:"Commuting", pct:12, value:"Scope 3", color:"#c4b5fd" },{ label:"Facilities", pct:8, value:"Scope 1+2", color:"#ddd6fe" }], highlights: [{ value:"100%", label:"Renewable electricity since 2019", icon:"💡" },{ value:"2016", label:"Year net zero Scope 1+2 achieved", icon:"♻️" },{ value:"−64%", label:"Scope 1+2 emissions vs 2012", icon:"📉" },{ value:"5M+", label:"Creative professionals upskilled", icon:"🎨" },{ value:"2035", label:"Full value chain net zero target", icon:"🎯" }], risks: [{ label:"Scope 3 Cloud Infrastructure", detail:"Third-party cloud is the fastest-growing Scope 3 source as AI adoption rises.", dot:"bg-amber-400" },{ label:"AI-Generated Content Ethics", detail:"Generative AI products carry IP and bias risk that could drive regulatory action.", dot:"bg-amber-400" },{ label:"No Major ESG Controversies", detail:"Clean track record with strong data privacy practices and board independence.", dot:"bg-emerald-400" }] },
  MSFT: { emissions: { value:"13.5M tCO₂e", trend:"+21% vs 2020", trendDir:"up", goal:"Carbon Negative by 2030", goalDetail:"Remove all historical CO₂ by 2050" }, progressMetrics: [{ label:"Renewable Electricity", pct:100, detail:"100% renewable electricity matched across all operations since 2014" },{ label:"Carbon Negative Pathway", pct:48, detail:"48% of 2030 carbon negative pathway milestones achieved" },{ label:"Water Positive Target", pct:65, detail:"65% progress toward 2030 water-positive commitment" }], emissionsBreakdown: [{ label:"Supply Chain (Scope 3)", pct:70, value:"9.5M tCO₂e", color:"#3b82f6" },{ label:"Data Center Energy", pct:18, value:"2.4M tCO₂e", color:"#60a5fa" },{ label:"Business Travel", pct:8, value:"1.1M tCO₂e", color:"#93c5fd" },{ label:"Other", pct:4, value:"0.5M tCO₂e", color:"#bfdbfe" }], highlights: [{ value:"100%", label:"Renewable electricity since 2014", icon:"🔋" },{ value:"$1B", label:"Climate Innovation Fund", icon:"💰" },{ value:"2030", label:"Carbon negative target year", icon:"🎯" },{ value:"2050", label:"Historical emissions removal target", icon:"🌍" },{ value:"221,000", label:"Employees globally", icon:"👥" }], risks: [{ label:"Data Center Energy Growth", detail:"AI-driven expansion is increasing absolute emissions, offsetting renewable progress.", dot:"bg-red-400" },{ label:"Scope 3 Supply Chain Scale", detail:"Hardware supply chain (devices, servers) is the dominant emissions source.", dot:"bg-amber-400" },{ label:"Carbon Negative Commitment", detail:"Among world's most ambitious pledges, backed by $1B Climate Innovation Fund.", dot:"bg-emerald-400" }] },
  MA: { emissions: { value:"0.55M tCO₂e", trend:"Carbon Neutral since 2014", trendDir:"down", goal:"Net Zero by 2040", goalDetail:"Full Scope 1, 2 & 3 value chain" }, progressMetrics: [{ label:"Carbon Neutral Operations", pct:100, detail:"Carbon neutral since 2014 across all Mastercard facilities" },{ label:"Renewable Electricity", pct:100, detail:"100% renewable electricity for global operations since 2023" },{ label:"Tree Planting Target", pct:43, detail:"43M of 100M tree commitment delivered by end-2024" }], emissionsBreakdown: [{ label:"Business Travel", pct:45, value:"Largest Scope 3", color:"#f97316" },{ label:"Supply Chain (Tech)", pct:30, value:"Major Scope 3", color:"#fb923c" },{ label:"Data Centers", pct:18, value:"Scope 2", color:"#fdba74" },{ label:"Facilities", pct:7, value:"Scope 1", color:"#fed7aa" }], highlights: [{ value:"2014", label:"Year carbon neutrality achieved", icon:"🤝" },{ value:"100%", label:"Renewable electricity (2023)", icon:"⚡" },{ value:"43M", label:"Trees planted toward 100M goal", icon:"🌳" },{ value:"3B+", label:"Cardholders reached globally", icon:"💳" },{ value:"2040", label:"Net zero value chain target", icon:"🎯" }], risks: [{ label:"Scope 3 Merchant Ecosystem", detail:"Downstream merchant and cardholder emissions are significant but hard to quantify.", dot:"bg-amber-400" },{ label:"Framework Coverage Gaps", detail:"GRI and TCFD only; ISSB and SASB alignment pending versus fintech peers.", dot:"bg-amber-400" },{ label:"Financial Inclusion Progress", detail:"Priceless Planet Coalition and Inclusive Growth reach 500M+ underserved people.", dot:"bg-emerald-400" }] },
  AAPL: { emissions: { value:"14.5M tCO₂e", trend:"−60% vs 2015", trendDir:"down", goal:"Carbon Neutral by 2030", goalDetail:"75% reduction + carbon removals" }, progressMetrics: [{ label:"Emissions Reduction (vs 2015)", pct:60, detail:"Progress: >60% reduction since 2015 · Target: 75% + carbon removal" },{ label:"Renewable Energy (Facilities)", pct:100, detail:"All Apple facilities powered by renewable energy since 2018" },{ label:"Supplier Clean Energy Enabled", pct:71, detail:"17.8 GW of 25 GW supplier clean energy capacity enabled" }], emissionsBreakdown: [{ label:"Manufacturing", pct:70, value:"10.2M tCO₂e", color:"#10b981" },{ label:"Product Use", pct:20, value:"2.9M tCO₂e", color:"#34d399" },{ label:"Transport & Distribution", pct:5, value:"0.7M tCO₂e", color:"#6ee7b7" },{ label:"Corporate Operations", pct:5, value:"0.7M tCO₂e", color:"#a7f3d0" }], highlights: [{ value:"41M t", label:"Emissions avoided since 2015", icon:"🍃" },{ value:"100%", label:"Renewable energy for operations", icon:"⚡" },{ value:"24%", label:"Total materials recycled in 2024", icon:"♻️" },{ value:"99%", label:"Rare earth elements recycled", icon:"🔬" },{ value:"2030", label:"Carbon neutral products target", icon:"🎯" }], risks: [{ label:"High Scope 3 Dependency", detail:"Supply chain and product use are the largest emission sources — both hard to control.", dot:"bg-red-400" },{ label:"Supply Chain Concentration", detail:"Complex global manufacturing network increases operational and ESG risk.", dot:"bg-amber-400" },{ label:"No Major Governance Controversies", detail:"Strong governance, transparent reporting, and no significant ESG controversies.", dot:"bg-emerald-400" }] },
  TSLA: { emissions: { value:"2.1M tCO₂e", trend:"+8% vs 2022", trendDir:"up", goal:"Net Zero Operations", goalDetail:"EV mission enables global GHG reduction" }, progressMetrics: [{ label:"EV Deliveries (2023)", pct:84, detail:"1.81M vehicles — 84% of revised annual target" },{ label:"Energy Storage Deployed", pct:55, detail:"14.7 GWh deployed; targeting 20 GWh by 2025" },{ label:"Renewable Energy (Facilities)", pct:62, detail:"62% of facility electricity from renewables in 2023" }], emissionsBreakdown: [{ label:"Manufacturing", pct:65, value:"1.4M tCO₂e", color:"#ef4444" },{ label:"Vehicle Logistics", pct:20, value:"0.42M tCO₂e", color:"#f87171" },{ label:"Supply Chain", pct:10, value:"0.21M tCO₂e", color:"#fca5a5" },{ label:"Facilities", pct:5, value:"0.11M tCO₂e", color:"#fecaca" }], highlights: [{ value:"1.81M", label:"EVs delivered in 2023", icon:"⚡" },{ value:"14.7 GWh", label:"Energy storage deployed", icon:"🔋" },{ value:"62%", label:"Renewable electricity (facilities)", icon:"☀️" },{ value:"1B+ mi", label:"Autopilot driven distance", icon:"🚗" },{ value:"2030", label:"Target 20M annual deliveries", icon:"🎯" }], risks: [{ label:"Social Governance Gaps", detail:"Social score 48/100 — human rights and worker conditions remain under-disclosed.", dot:"bg-red-400" },{ label:"Supply Chain Labor Risk", detail:"Cobalt and lithium sourcing face ongoing scrutiny from investors and NGOs.", dot:"bg-red-400" },{ label:"EV Mission Positive Impact", detail:"Tesla's fleet displaces an estimated 20M tCO₂e annually.", dot:"bg-emerald-400" }] },
  XOM: { emissions: { value:"112M tCO₂e", trend:"+4% vs 2021", trendDir:"up", goal:"Net Zero by 2050", goalDetail:"Scope 1 & 2 only; no Scope 3 target" }, progressMetrics: [{ label:"Methane Intensity Reduction", pct:40, detail:"40% reduction in methane intensity vs 2016 baseline" },{ label:"CCS Investment Progress", pct:28, detail:"$4.5B of $20B CCS commitment deployed through 2024" },{ label:"Low-Carbon CapEx Share", pct:12, detail:"Only 12% of CapEx directed to low-carbon — below sector median" }], emissionsBreakdown: [{ label:"Refining Operations", pct:45, value:"50.4M tCO₂e", color:"#dc2626" },{ label:"Upstream E&P", pct:35, value:"39.2M tCO₂e", color:"#ef4444" },{ label:"Chemical Operations", pct:12, value:"13.4M tCO₂e", color:"#f87171" },{ label:"Corporate & Other", pct:8, value:"9.0M tCO₂e", color:"#fca5a5" }], highlights: [{ value:"−40%", label:"Methane intensity vs 2016", icon:"⚠️" },{ value:"$20B", label:"CCS investment commitment", icon:"💰" },{ value:"112M t", label:"Total Scope 1+2 emissions", icon:"🏭" },{ value:"4%", label:"Low-carbon CapEx share", icon:"📊" },{ value:"2050", label:"Net zero (Scope 1+2 only)", icon:"🎯" }], risks: [{ label:"No Scope 3 Commitment", detail:"No net-zero target covering Scope 3 — representing 90%+ of total climate impact.", dot:"bg-red-400" },{ label:"Active Climate Litigation", detail:"Facing litigation in three jurisdictions regarding historical climate-risk disclosure.", dot:"bg-red-400" },{ label:"CCS Scale Potential", detail:"$20B CCS commitment is among the largest in the industry.", dot:"bg-amber-400" }] },
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

/* ── Detail panel ───────────────────────────────────────────────── */
function DetailPanel({ co, onClose }: { co: Company; onClose?: () => void }) {
  const [ready, setReady] = useState(false);
  const [activeFW, setActiveFW] = useState<string | null>(null);
  const [activeDisc, setActiveDisc] = useState<number | null>(null);
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

  useEffect(() => { setActiveDisc(null); }, [activeFW]);

  const sentimentLabel = co.score >= 75 ? { text: "↑ Improving", cls: "bg-emerald-100 text-emerald-700" } : co.score >= 55 ? { text: "→ Stable", cls: "bg-amber-100 text-amber-700" } : { text: "↓ Under Review", cls: "bg-red-100 text-red-700" };

  return (
    <div className="h-full overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="p-5 sm:p-7 space-y-6">

        {/* Mobile back */}
        {onClose && <button type="button" onClick={onClose} className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-900 lg:hidden"><ChevronLeft className="h-4 w-4" /> Back to list</button>}

        {/* ── 1. Header ─────────────────────────────── */}
        <div className="flex items-start gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold text-slate-900">{co.name}</h2>
            <p className="mt-0.5 text-sm text-slate-500">{co.sector} <span className="mx-1">•</span> {co.country} <span className="mx-1">•</span> <span className="font-mono font-semibold text-primary">{co.ticker}</span></p>
            <span className={`mt-2 inline-flex items-center gap-1 rounded-full bg-gradient-to-r ${co.badge.color} px-2.5 py-1 text-[11px] font-bold text-white shadow-sm`}>{co.badge.icon} {co.badge.label}</span>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{co.about}</p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {co.tags.map(t => <span key={t} className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800">{t}</span>)}
            </div>
          </div>
          <div className="shrink-0 text-center">
            <div className="relative flex h-24 w-24 items-center justify-center">
              <svg className={`absolute inset-0 h-24 w-24 -rotate-90 ${scoreRing(co.score)}`} viewBox="0 0 120 120" aria-hidden>
                <circle cx="60" cy="60" r="52" className="fill-none stroke-slate-100" strokeWidth="9" />
                <circle cx="60" cy="60" r="52" className="fill-none stroke-current transition-all duration-700" strokeWidth="9" strokeLinecap="round" strokeDasharray={`${ready?(co.score/100)*circumference:0} ${circumference}`} />
              </svg>
              <div className="relative text-center"><p className="text-2xl font-black text-slate-900">{co.score}</p><p className="text-[9px] font-semibold text-slate-400">/100</p></div>
            </div>
            <p className="mt-1 text-[9px] font-bold uppercase tracking-widest text-slate-400">Overall ESG Score</p>
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
          ].map(({icon,label,val}) => (
            <div key={label} className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5">
              <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-slate-400">{icon}{label}</div>
              <p className="mt-1 text-xs font-bold leading-tight text-slate-800">{val}</p>
            </div>
          ))}
        </div>

        {/* ── 3. Three-column section ────────────────── */}
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

        {/* ── 4. CSR Rating & Framework Tabs ───────── */}
        <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">CSR Rating &amp; Reporting Frameworks</p>
          <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
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
              {ext.highlights.map(h => (
                <div key={h.label} className="rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-3 text-center">
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

        {/* ── 7. Download Reports ───────────────────── */}
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
