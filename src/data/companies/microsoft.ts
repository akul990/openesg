import type { CompanyData } from "./types";

const microsoft: CompanyData = {
  name: "Microsoft Corporation",
  ticker: "MSFT",
  sector: "Technology",
  country: "USA",
  score: 81,
  e: 78,
  s: 83,
  g: 85,
  csr: "A–",
  frameworks: ["GRI", "TCFD", "ISSB", "UNSDG", "UNGC", "EPEAT"],
  frameworkRatings: { GRI: "A", TCFD: "A", ISSB: "B+", UNSDG: "A-", UNGC: "A-", EPEAT: "A-" },
  hq: "Redmond, USA",
  employees: "221,000",
  revenue: "$245.1B",
  tags: ["Cloud Computing", "AI", "Enterprise Software", "Carbon Negative"],
  badge: { label: "Carbon Negative by 2030", icon: "🔋", color: "from-blue-600 to-teal-500" },
  about:
    "Microsoft is a global technology leader in cloud, AI, and productivity software. It has pledged to be carbon negative by 2030 and to remove all its historical carbon emissions by 2050 — among the most ambitious corporate climate commitments globally.",
  extended: {
    emissions: { value: "13.5M tCO₂e", trend: "+21% vs 2020", trendDir: "up", goal: "Carbon Negative by 2030", goalDetail: "Remove all historical CO₂ by 2050" },
    progressMetrics: [
      { label: "Renewable Electricity",     pct: 100, detail: "100% renewable electricity matched across all operations since 2014" },
      { label: "Carbon Negative Pathway",   pct: 48,  detail: "48% of 2030 carbon negative pathway milestones achieved" },
      { label: "Water Positive Target",     pct: 65,  detail: "65% progress toward 2030 water-positive commitment" },
    ],
    emissionsBreakdown: [
      { label: "Supply Chain (Scope 3)", pct: 70, value: "9.5M tCO₂e", color: "#3b82f6" },
      { label: "Data Center Energy",     pct: 18, value: "2.4M tCO₂e", color: "#60a5fa" },
      { label: "Business Travel",        pct: 8,  value: "1.1M tCO₂e", color: "#93c5fd" },
      { label: "Other",                  pct: 4,  value: "0.5M tCO₂e", color: "#bfdbfe" },
    ],
    highlights: [
      { value: "100%",    label: "Renewable electricity since 2014",      icon: "🔋" },
      { value: "$1B",     label: "Climate Innovation Fund",               icon: "💰" },
      { value: "2030",    label: "Carbon negative target year",           icon: "🎯" },
      { value: "2050",    label: "Historical emissions removal target",   icon: "🌍" },
      { value: "221,000", label: "Employees globally",                    icon: "👥" },
    ],
    risks: [
      { label: "Data Center Energy Growth",  detail: "AI-driven expansion is increasing absolute emissions, offsetting renewable progress.",   dot: "bg-red-400" },
      { label: "Scope 3 Supply Chain Scale", detail: "Hardware supply chain (devices, servers) is the dominant emissions source.",            dot: "bg-amber-400" },
      { label: "Carbon Negative Commitment", detail: "Among world's most ambitious pledges, backed by $1B Climate Innovation Fund.",          dot: "bg-emerald-400" },
    ],
  },
};

export default microsoft;
