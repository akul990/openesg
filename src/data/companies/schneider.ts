import type { CompanyData } from "./types";

const schneider: CompanyData = {
  name: "Schneider Electric SE",
  ticker: "SU",
  sector: "Industrials",
  country: "France",
  score: 88,
  e: 90,
  s: 86,
  g: 88,
  csr: "A",
  frameworks: ["GRI", "TCFD", "CSRD", "UNSDG", "UNGC", "ISO"],
  frameworkRatings: { GRI: "A", TCFD: "A", CSRD: "A-", UNSDG: "A", UNGC: "A", ISO: "A" },
  hq: "Rueil-Malmaison, France",
  employees: "135,000",
  revenue: "$37.4B",
  tags: ["Energy Management", "Smart Grid", "Digital Automation", "Decarbonisation"],
  badge: { label: "Energy Efficiency Leader", icon: "⚡", color: "from-green-500 to-emerald-600" },
  about:
    "Schneider Electric is a global specialist in energy management and automation. Its EcoStruxure platform helps organisations digitise and decarbonise operations — making it one of the most purpose-driven industrial companies worldwide.",
  extended: {
    emissions: { value: "1.2M tCO₂e", trend: "−47% since 2017", trendDir: "down", goal: "Carbon Neutral by 2025", goalDetail: "Operations; full value chain by 2040" },
    progressMetrics: [
      { label: "Renewable Electricity",    pct: 74, detail: "74% of own electricity from renewable sources" },
      { label: "Carbon Neutral Roadmap",   pct: 85, detail: "85% progress toward 2025 operations target" },
      { label: "Supplier Decarbonisation", pct: 68, detail: "68% of top 1,000 suppliers have set SBTs" },
    ],
    emissionsBreakdown: [
      { label: "Manufacturing", pct: 42, value: "0.5M tCO₂e",  color: "#10b981" },
      { label: "Supply Chain",  pct: 38, value: "0.46M tCO₂e", color: "#34d399" },
      { label: "Logistics",     pct: 13, value: "0.16M tCO₂e", color: "#6ee7b7" },
      { label: "Facilities",    pct: 7,  value: "0.08M tCO₂e", color: "#a7f3d0" },
    ],
    highlights: [
      { value: "74%",    label: "Renewable electricity share",        icon: "⚡" },
      { value: "−47%",   label: "Emissions reduction vs 2017",        icon: "📉" },
      { value: "370M+",  label: "Customers served globally",          icon: "🌍" },
      { value: "135,000",label: "Employees in 100+ countries",        icon: "👥" },
      { value: "2025",   label: "Carbon neutral operations target",   icon: "🎯" },
    ],
    risks: [
      { label: "Scope 3 Value Chain",  detail: "Scope 3 represents 80%+ of total footprint and remains the largest challenge.",   dot: "bg-amber-400" },
      { label: "Cybersecurity Exposure", detail: "Smart grid and industrial IoT products carry elevated cybersecurity risk.",      dot: "bg-amber-400" },
      { label: "DJSI Top-10 for 14 Years", detail: "Consistent Dow Jones Sustainability Index top-10 ranking.",                   dot: "bg-emerald-400" },
    ],
  },
};

export default schneider;
