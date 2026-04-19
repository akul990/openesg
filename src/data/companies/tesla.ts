import type { CompanyData } from "./types";

const tesla: CompanyData = {
  name: "Tesla Inc.",
  ticker: "TSLA",
  sector: "Automobiles",
  country: "USA",
  score: 58,
  e: 72,
  s: 48,
  g: 52,
  csr: "C+",
  frameworks: ["TCFD", "SASB", "UNSDG", "UNGC"],
  frameworkRatings: { TCFD: "C+", SASB: "B-", UNSDG: "C+", UNGC: "C+" },
  hq: "Austin, USA",
  employees: "140,000",
  revenue: "$97.7B",
  tags: ["Electric Vehicles", "Battery Storage", "Solar", "Autonomous"],
  badge: { label: "EV Transition Pioneer", icon: "⚡", color: "from-red-500 to-slate-600" },
  about:
    "Tesla accelerates the world's transition to sustainable energy through electric vehicles, solar panels, and battery storage. Despite its clean energy mission, the company's social governance and supply chain disclosures remain limited relative to industry leaders.",
  extended: {
    emissions: { value: "2.1M tCO₂e", trend: "+8% vs 2022", trendDir: "up", goal: "Net Zero Operations", goalDetail: "EV mission enables global GHG reduction" },
    progressMetrics: [
      { label: "EV Deliveries (2023)",         pct: 84, detail: "1.81M vehicles — 84% of revised annual target" },
      { label: "Energy Storage Deployed",      pct: 55, detail: "14.7 GWh deployed; targeting 20 GWh by 2025" },
      { label: "Renewable Energy (Facilities)",pct: 62, detail: "62% of facility electricity from renewables in 2023" },
    ],
    emissionsBreakdown: [
      { label: "Manufacturing",    pct: 65, value: "1.4M tCO₂e",  color: "#ef4444" },
      { label: "Vehicle Logistics",pct: 20, value: "0.42M tCO₂e", color: "#f87171" },
      { label: "Supply Chain",     pct: 10, value: "0.21M tCO₂e", color: "#fca5a5" },
      { label: "Facilities",       pct: 5,  value: "0.11M tCO₂e", color: "#fecaca" },
    ],
    highlights: [
      { value: "1.81M",    label: "EVs delivered in 2023",          icon: "⚡" },
      { value: "14.7 GWh", label: "Energy storage deployed",        icon: "🔋" },
      { value: "62%",      label: "Renewable electricity (facilities)", icon: "☀️" },
      { value: "1B+ mi",   label: "Autopilot driven distance",      icon: "🚗" },
      { value: "2030",     label: "Target 20M annual deliveries",   icon: "🎯" },
    ],
    risks: [
      { label: "Social Governance Gaps",  detail: "Social score 48/100 — human rights and worker conditions remain under-disclosed.",           dot: "bg-red-400" },
      { label: "Supply Chain Labor Risk", detail: "Cobalt and lithium sourcing face ongoing scrutiny from investors and NGOs.",                  dot: "bg-red-400" },
      { label: "EV Mission Positive Impact", detail: "Tesla's fleet displaces an estimated 20M tCO₂e annually.",                               dot: "bg-emerald-400" },
    ],
  },
};

export default tesla;
