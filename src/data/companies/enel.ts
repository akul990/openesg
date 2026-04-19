import type { CompanyData } from "./types";

const enel: CompanyData = {
  name: "Enel SpA",
  ticker: "ENEL",
  sector: "Utilities",
  country: "Italy",
  score: 83,
  e: 86,
  s: 81,
  g: 82,
  csr: "A",
  frameworks: ["GRI", "TCFD", "UNSDG", "UNGC", "ISO"],
  frameworkRatings: { GRI: "A", TCFD: "A-", UNSDG: "A", UNGC: "A-", ISO: "A-" },
  hq: "Rome, Italy",
  employees: "65,000",
  revenue: "$99.9B",
  tags: ["Renewable Utilities", "Solar", "Wind Power", "Just Transition"],
  badge: { label: "Renewable Energy Leader", icon: "☀️", color: "from-amber-500 to-emerald-500" },
  about:
    "Enel is Europe's largest utility and a global renewable energy leader with 60+ GW of renewable capacity across 30 countries. The company's Open Power strategy drives the just transition to a sustainable energy model.",
  extended: {
    emissions: { value: "80M tCO₂e", trend: "−25% vs 2017", trendDir: "down", goal: "Net Zero by 2040", goalDetail: "Full decarbonisation of generation mix" },
    progressMetrics: [
      { label: "Renewable Capacity Share", pct: 62, detail: "62% of total generation capacity from renewables" },
      { label: "Coal Phase-Out",           pct: 75, detail: "75% coal capacity retired; full exit planned by 2027" },
      { label: "Green CapEx Share",        pct: 88, detail: "88% of CapEx allocated to green and digital transition" },
    ],
    emissionsBreakdown: [
      { label: "Gas Generation",   pct: 62, value: "49.6M tCO₂e", color: "#f97316" },
      { label: "Coal (Residual)",  pct: 22, value: "17.6M tCO₂e", color: "#fb923c" },
      { label: "Grid Losses",      pct: 10, value: "8.0M tCO₂e",  color: "#fdba74" },
      { label: "Other",            pct: 6,  value: "4.8M tCO₂e",  color: "#fed7aa" },
    ],
    highlights: [
      { value: "60 GW",  label: "Renewable capacity installed",  icon: "☀️" },
      { value: "30",     label: "Countries of operation",        icon: "🌍" },
      { value: "−25%",   label: "GHG emissions vs 2017",         icon: "📉" },
      { value: "148 GW", label: "Renewable target by 2030",      icon: "⚡" },
      { value: "2040",   label: "Net zero target year",          icon: "🎯" },
    ],
    risks: [
      { label: "Coal Transition Pace",       detail: "Residual coal assets may slow decarbonisation and attract divestment pressure.",          dot: "bg-red-400" },
      { label: "Emerging Market Exposure",   detail: "Operations in Latin America expose the group to political and currency risk.",            dot: "bg-amber-400" },
      { label: "Just Transition Commitment", detail: "Enel's framework covers 11,000 workers in coal-affected communities.",                    dot: "bg-emerald-400" },
    ],
  },
};

export default enel;
