import type { CompanyData } from "./types";

const exxonmobil: CompanyData = {
  name: "ExxonMobil Corporation",
  ticker: "XOM",
  sector: "Energy",
  country: "USA",
  score: 41,
  e: 29,
  s: 48,
  g: 54,
  csr: "C",
  frameworks: ["TCFD", "UNSDG", "UNGC"],
  frameworkRatings: { TCFD: "C", UNSDG: "C", UNGC: "C" },
  hq: "Spring, Texas, USA",
  employees: "62,000",
  revenue: "$398.7B",
  tags: ["Oil & Gas", "Petrochemicals", "Refining", "Carbon Capture"],
  badge: { label: "Under Climate Scrutiny", icon: "⚠️", color: "from-red-600 to-orange-500" },
  about:
    "ExxonMobil is one of the world's largest publicly traded oil and gas companies. The company faces significant investor and regulatory pressure over its climate transition plan, which critics argue lacks credible Scope 3 targets and near-term capital reallocation.",
  extended: {
    emissions: { value: "112M tCO₂e", trend: "+4% vs 2021", trendDir: "up", goal: "Net Zero by 2050", goalDetail: "Scope 1 & 2 only; no Scope 3 target" },
    progressMetrics: [
      { label: "Methane Intensity Reduction", pct: 40, detail: "40% reduction in methane intensity vs 2016 baseline" },
      { label: "CCS Investment Progress",     pct: 28, detail: "$4.5B of $20B CCS commitment deployed through 2024" },
      { label: "Low-Carbon CapEx Share",      pct: 12, detail: "Only 12% of CapEx directed to low-carbon — below sector median" },
    ],
    emissionsBreakdown: [
      { label: "Refining Operations",  pct: 45, value: "50.4M tCO₂e", color: "#dc2626" },
      { label: "Upstream E&P",         pct: 35, value: "39.2M tCO₂e", color: "#ef4444" },
      { label: "Chemical Operations",  pct: 12, value: "13.4M tCO₂e", color: "#f87171" },
      { label: "Corporate & Other",    pct: 8,  value: "9.0M tCO₂e",  color: "#fca5a5" },
    ],
    highlights: [
      { value: "−40%",  label: "Methane intensity vs 2016",   icon: "⚠️" },
      { value: "$20B",  label: "CCS investment commitment",   icon: "💰" },
      { value: "112M t",label: "Total Scope 1+2 emissions",   icon: "🏭" },
      { value: "4%",    label: "Low-carbon CapEx share",      icon: "📊" },
      { value: "2050",  label: "Net zero (Scope 1+2 only)",   icon: "🎯" },
    ],
    risks: [
      { label: "No Scope 3 Commitment",   detail: "No net-zero target covering Scope 3 — representing 90%+ of total climate impact.",         dot: "bg-red-400" },
      { label: "Active Climate Litigation",detail: "Facing litigation in three jurisdictions regarding historical climate-risk disclosure.",    dot: "bg-red-400" },
      { label: "CCS Scale Potential",     detail: "$20B CCS commitment is among the largest in the industry.",                                dot: "bg-amber-400" },
    ],
  },
};

export default exxonmobil;
