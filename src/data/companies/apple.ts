import type { CompanyData } from "./types";

const apple: CompanyData = {
  name: "Apple Inc.",
  ticker: "AAPL",
  sector: "Technology",
  country: "USA",
  score: 74,
  e: 68,
  s: 79,
  g: 81,
  csr: "B+",
  frameworks: ["GRI", "TCFD", "SASB", "UNSDG", "UNGC", "EPEAT"],
  frameworkRatings: { GRI: "B+", TCFD: "B", SASB: "B+", UNSDG: "B+", UNGC: "B", EPEAT: "A-" },
  hq: "Cupertino, USA",
  employees: "164,000",
  revenue: "$391.0B",
  tags: ["Consumer Electronics", "iOS", "Services", "Recycled Materials"],
  badge: { label: "Carbon Neutral Products", icon: "🍃", color: "from-slate-600 to-emerald-500" },
  about:
    "Apple designs iPhone, Mac, iPad, and services used by 2 billion people worldwide. The company's 2030 goal targets fully carbon neutral products across the entire supply chain and product lifecycle — one of the largest commitments in consumer technology.",
  extended: {
    emissions: { value: "14.5M tCO₂e", trend: "−60% vs 2015", trendDir: "down", goal: "Carbon Neutral by 2030", goalDetail: "75% reduction + carbon removals" },
    progressMetrics: [
      { label: "Emissions Reduction (vs 2015)",   pct: 60,  detail: "Progress: >60% reduction since 2015 · Target: 75% + carbon removal" },
      { label: "Renewable Energy (Facilities)",   pct: 100, detail: "All Apple facilities powered by renewable energy since 2018" },
      { label: "Supplier Clean Energy Enabled",   pct: 71,  detail: "17.8 GW of 25 GW supplier clean energy capacity enabled" },
    ],
    emissionsBreakdown: [
      { label: "Manufacturing",            pct: 70, value: "10.2M tCO₂e", color: "#10b981" },
      { label: "Product Use",              pct: 20, value: "2.9M tCO₂e",  color: "#34d399" },
      { label: "Transport & Distribution", pct: 5,  value: "0.7M tCO₂e",  color: "#6ee7b7" },
      { label: "Corporate Operations",     pct: 5,  value: "0.7M tCO₂e",  color: "#a7f3d0" },
    ],
    highlights: [
      { value: "41M t", label: "Emissions avoided since 2015",      icon: "🍃" },
      { value: "100%",  label: "Renewable energy for operations",    icon: "⚡" },
      { value: "24%",   label: "Total materials recycled in 2024",   icon: "♻️" },
      { value: "99%",   label: "Rare earth elements recycled",       icon: "🔬" },
      { value: "2030",  label: "Carbon neutral products target",     icon: "🎯" },
    ],
    risks: [
      { label: "High Scope 3 Dependency",     detail: "Supply chain and product use are the largest emission sources — both hard to control.", dot: "bg-red-400" },
      { label: "Supply Chain Concentration",  detail: "Complex global manufacturing network increases operational and ESG risk.",               dot: "bg-amber-400" },
      { label: "No Major Governance Controversies", detail: "Strong governance, transparent reporting, and no significant ESG controversies.", dot: "bg-emerald-400" },
    ],
  },
};

export default apple;
