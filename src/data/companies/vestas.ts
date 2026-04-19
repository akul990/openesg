import type { CompanyData } from "./types";

const vestas: CompanyData = {
  name: "Vestas Wind Systems",
  ticker: "VWS",
  sector: "Renewable Energy",
  country: "Denmark",
  score: 91,
  e: 95,
  s: 89,
  g: 90,
  csr: "A+",
  frameworks: ["GRI", "TCFD", "ISSB", "UNSDG", "UNGC", "ISO"],
  frameworkRatings: { GRI: "A", TCFD: "A", ISSB: "A", UNSDG: "A", UNGC: "A", ISO: "A" },
  hq: "Aarhus, Denmark",
  employees: "29,000",
  revenue: "$15.4B",
  tags: ["Wind Turbines", "Renewable Energy", "Global OEM", "Carbon Neutral"],
  badge: { label: "Wind Energy Pioneer", icon: "💨", color: "from-sky-500 to-emerald-500" },
  about:
    "Vestas is the world's largest wind turbine manufacturer, with 170+ GW of installed capacity across 88 countries. The company has been carbon neutral since 2023 and aims to be carbon neutral across its full value chain by 2030.",
  extended: {
    emissions: { value: "0 tCO₂e", trend: "Carbon Neutral since 2023", trendDir: "down", goal: "Net Zero by 2030", goalDetail: "Full value-chain net zero" },
    progressMetrics: [
      { label: "Carbon Neutral Operations",      pct: 100, detail: "100% offset across own operations since 2023" },
      { label: "Renewable Electricity (Facilities)", pct: 100, detail: "All owned facilities on 100% renewable contracts" },
      { label: "Value Chain Emissions Reduction", pct: 55,  detail: "55% progress toward 2030 net-zero goal" },
    ],
    emissionsBreakdown: [
      { label: "Manufacturing",    pct: 58, value: "Major",   color: "#3b82f6" },
      { label: "Transport",        pct: 22, value: "Medium",  color: "#93c5fd" },
      { label: "Blade Production", pct: 14, value: "Minor",   color: "#bfdbfe" },
      { label: "Operations",       pct: 6,  value: "Minimal", color: "#dbeafe" },
    ],
    highlights: [
      { value: "170+ GW", label: "Cumulative installed capacity",      icon: "💨" },
      { value: "88",      label: "Countries with installations",       icon: "🌍" },
      { value: "100%",    label: "Renewable electricity (facilities)", icon: "⚡" },
      { value: "29,000",  label: "Employees worldwide",               icon: "👥" },
      { value: "2030",    label: "Full value-chain net-zero target",   icon: "🎯" },
    ],
    risks: [
      { label: "Raw Material Supply Risk",   detail: "Rare earth and steel price volatility could compress margins.",                          dot: "bg-amber-400" },
      { label: "Chinese OEM Competition",    detail: "Increasing competition from Chinese manufacturers puts pricing pressure globally.",       dot: "bg-amber-400" },
      { label: "Strong Safety Record",       detail: "Industry-leading safety performance and no major product incidents.",                    dot: "bg-emerald-400" },
    ],
  },
};

export default vestas;
