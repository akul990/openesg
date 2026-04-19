import type { CompanyData } from "./types";

const roche: CompanyData = {
  name: "Roche Holding AG",
  ticker: "ROG",
  sector: "Healthcare",
  country: "Switzerland",
  score: 82,
  e: 80,
  s: 84,
  g: 83,
  csr: "A",
  frameworks: ["GRI", "SASB", "TCFD", "UNSDG", "UNGC", "ISO"],
  frameworkRatings: { GRI: "A", SASB: "A", TCFD: "B+", UNSDG: "A", UNGC: "A", ISO: "A" },
  hq: "Basel, Switzerland",
  employees: "103,000",
  revenue: "$58.7B",
  tags: ["Pharmaceuticals", "Diagnostics", "Biotech", "Access to Medicine"],
  badge: { label: "Sustainable Healthcare", icon: "🧬", color: "from-blue-500 to-emerald-500" },
  about:
    "Roche is a global pioneer in pharmaceuticals and diagnostics, committed to improving lives while minimising its environmental impact. The company has been carbon neutral since 2021 and sets science-based targets across its value chain.",
  extended: {
    emissions: { value: "1.5M tCO₂e", trend: "Carbon Neutral since 2021", trendDir: "down", goal: "Net Zero by 2045", goalDetail: "Full value chain Scope 1, 2 & 3" },
    progressMetrics: [
      { label: "Carbon Neutral Operations", pct: 100, detail: "100% carbon neutral Scope 1 & 2 since 2021" },
      { label: "Renewable Electricity",     pct: 90,  detail: "90% of electricity from renewable sources" },
      { label: "Water Efficiency",          pct: 64,  detail: "64% reduction in water consumption per unit vs 2004" },
    ],
    emissionsBreakdown: [
      { label: "Clinical Waste", pct: 38, value: "0.57M tCO₂e", color: "#3b82f6" },
      { label: "Supply Chain",   pct: 35, value: "0.52M tCO₂e", color: "#93c5fd" },
      { label: "Manufacturing",  pct: 18, value: "0.27M tCO₂e", color: "#bfdbfe" },
      { label: "Transport",      pct: 9,  value: "0.14M tCO₂e", color: "#dbeafe" },
    ],
    highlights: [
      { value: "2021",   label: "Year carbon neutrality achieved",     icon: "🧬" },
      { value: "90%",    label: "Renewable electricity share",         icon: "⚡" },
      { value: "−80%",   label: "Emissions reduction vs 2004",         icon: "📉" },
      { value: "1,000+", label: "Products for neglected diseases",     icon: "💊" },
      { value: "2045",   label: "Net zero value chain target",         icon: "🎯" },
    ],
    risks: [
      { label: "Tier-2 Supply Chain Gaps", detail: "Beyond tier-1, supply chain human-rights due diligence remains incomplete.",                      dot: "bg-amber-400" },
      { label: "Drug Pricing Pressure",    detail: "Access-to-medicine obligations and pricing reviews pose financial and reputational risk.",         dot: "bg-amber-400" },
      { label: "Strong Safety & Quality",  detail: "No major product safety incidents; robust quality management systems company-wide.",               dot: "bg-emerald-400" },
    ],
  },
};

export default roche;
