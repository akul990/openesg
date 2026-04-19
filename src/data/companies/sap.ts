import type { CompanyData } from "./types";

const sap: CompanyData = {
  name: "SAP SE",
  ticker: "SAP",
  sector: "Technology",
  country: "Germany",
  score: 85,
  e: 83,
  s: 87,
  g: 86,
  csr: "A",
  frameworks: ["GRI", "CSRD", "ISSB", "UNSDG", "UNGC"],
  frameworkRatings: { GRI: "A", CSRD: "A", ISSB: "A-", UNSDG: "A", UNGC: "A" },
  hq: "Walldorf, Germany",
  employees: "105,000",
  revenue: "$35.4B",
  tags: ["Enterprise Software", "Cloud ERP", "Sustainability Tech", "AI"],
  badge: { label: "Carbon Neutral Since 2023", icon: "♻️", color: "from-emerald-600 to-cyan-500" },
  about:
    "SAP is the market leader in enterprise application software, powering 99 of the 100 largest companies globally. SAP's sustainability solutions help customers measure and reduce their own environmental footprint at scale.",
  extended: {
    emissions: { value: "0 tCO₂e net", trend: "Carbon Neutral since 2023", trendDir: "down", goal: "Net Zero by 2030", goalDetail: "Full Scope 1, 2 & 3" },
    progressMetrics: [
      { label: "Carbon Neutral Operations", pct: 100, detail: "100% carbon neutral across all SAP facilities since 2023" },
      { label: "Renewable Electricity",     pct: 100, detail: "All SAP data centers and offices on renewable contracts" },
      { label: "Net Zero Value Chain",      pct: 45,  detail: "45% progress on Scope 3 reduction toward 2030" },
    ],
    emissionsBreakdown: [
      { label: "Business Travel",  pct: 55, value: "Major Scope 3", color: "#3b82f6" },
      { label: "Supply Chain IT",  pct: 25, value: "Scope 3",       color: "#93c5fd" },
      { label: "Commuting",        pct: 12, value: "Scope 3",       color: "#bfdbfe" },
      { label: "Facilities",       pct: 8,  value: "Scope 1+2",     color: "#dbeafe" },
    ],
    highlights: [
      { value: "100%",    label: "Renewable electricity since 2014",   icon: "⚡" },
      { value: "2023",    label: "Year carbon neutrality achieved",    icon: "♻️" },
      { value: "99/100",  label: "Largest companies using SAP",        icon: "🏢" },
      { value: "105,000", label: "Employees in 180 countries",         icon: "👥" },
      { value: "2030",    label: "Net Zero full value chain target",   icon: "🎯" },
    ],
    risks: [
      { label: "Scope 3 Business Travel", detail: "Business travel remains the dominant Scope 3 source; post-COVID rebound slowed progress.", dot: "bg-amber-400" },
      { label: "Data Privacy & AI Ethics",  detail: "Expanding AI products introduce material governance and data-privacy risk.",              dot: "bg-amber-400" },
      { label: "Industry-Leading Disclosure", detail: "Highest DACH region governance score; 45% female board representation.",              dot: "bg-emerald-400" },
    ],
  },
};

export default sap;
