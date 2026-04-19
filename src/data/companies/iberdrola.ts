import type { CompanyData } from "./types";

const iberdrola: CompanyData = {
  name: "Iberdrola S.A.",
  ticker: "IBE",
  sector: "Utilities",
  country: "Spain",
  score: 87,
  e: 91,
  s: 84,
  g: 86,
  csr: "A",
  frameworks: ["GRI", "TCFD", "UNSDG", "UNGC", "ISO"],
  frameworkRatings: { GRI: "A-", TCFD: "A", UNSDG: "A", UNGC: "A", ISO: "A-" },
  hq: "Bilbao, Spain",
  employees: "41,000",
  revenue: "$46.4B",
  tags: ["Green Power", "Wind & Solar", "Global Utilities", "Low Carbon"],
  badge: { label: "Green Utility Champion", icon: "🌿", color: "from-teal-500 to-green-600" },
  about:
    "Iberdrola is one of the world's largest electric utilities, producing over 80% of its energy from renewable sources. A pioneer of the global energy transition, the company invests more in renewables than any other utility.",
  extended: {
    emissions: { value: "45.7M tCO₂e", trend: "−77% per MWh vs 2007", trendDir: "down", goal: "Net Zero by 2040", goalDetail: "Zero net emissions, all operations" },
    progressMetrics: [
      { label: "Renewable Energy Share",    pct: 80, detail: "80% of installed capacity from zero-emission sources" },
      { label: "Net Zero Roadmap Progress", pct: 62, detail: "62% of 2040 pathway milestones on track" },
      { label: "Green CapEx Allocation",    pct: 91, detail: "91% of CapEx directed to renewables" },
    ],
    emissionsBreakdown: [
      { label: "Gas Generation",     pct: 55, value: "25.1M tCO₂e", color: "#f59e0b" },
      { label: "Transmission Losses",pct: 25, value: "11.4M tCO₂e", color: "#fcd34d" },
      { label: "Renewables Residual",pct: 12, value: "5.5M tCO₂e",  color: "#6ee7b7" },
      { label: "Other",              pct: 8,  value: "3.7M tCO₂e",  color: "#a7f3d0" },
    ],
    highlights: [
      { value: "80%",  label: "Capacity from renewables",      icon: "🌿" },
      { value: "40 GW",label: "Renewable capacity installed",  icon: "⚡" },
      { value: "−77%", label: "Emissions intensity vs 2007",   icon: "📉" },
      { value: "€17B+",label: "Green investment 2020–2025",    icon: "💰" },
      { value: "2040", label: "Net zero target year",          icon: "🎯" },
    ],
    risks: [
      { label: "Spanish Regulatory Risk", detail: "Energy price controls and windfall taxes create revenue uncertainty.",              dot: "bg-red-400" },
      { label: "Currency & Country Risk", detail: "Exposure to Brazil, Mexico, and USA introduces FX and political risk.",            dot: "bg-amber-400" },
      { label: "Green Bond Pioneer",      detail: "€40B+ raised for renewable energy — pioneer in sustainable finance.",             dot: "bg-emerald-400" },
    ],
  },
};

export default iberdrola;
