import type { CompanyData } from "./types";

const salesforce: CompanyData = {
  name: "Salesforce Inc.",
  ticker: "CRM",
  sector: "Technology",
  country: "USA",
  score: 83,
  e: 80,
  s: 85,
  g: 84,
  csr: "A",
  frameworks: ["GRI", "TCFD", "SASB", "UNSDG", "UNGC"],
  frameworkRatings: { GRI: "A-", TCFD: "A", SASB: "A-", UNSDG: "A", UNGC: "A-" },
  hq: "San Francisco, USA",
  employees: "72,000",
  revenue: "$34.9B",
  tags: ["CRM", "Cloud Software", "ESG Tools", "Net Zero Cloud"],
  badge: { label: "Net Zero Cloud Leader", icon: "☁️", color: "from-cyan-500 to-teal-500" },
  about:
    "Salesforce is the world's leading CRM platform, trusted by 150,000+ companies. It achieved net-zero residual emissions in 2021 and operates on 100% renewable energy, while offering its customers dedicated ESG reporting tools.",
  extended: {
    emissions: { value: "0 tCO₂e net", trend: "Net Zero since 2021", trendDir: "down", goal: "Net Zero maintained", goalDetail: "100% renewables + carbon removal" },
    progressMetrics: [
      { label: "Renewable Energy",    pct: 100, detail: "100% renewable electricity across all Salesforce operations since 2022" },
      { label: "Net Zero Achievement",pct: 100, detail: "Net zero residual emissions achieved in fiscal year 2021" },
      { label: "Trees Planted",       pct: 72,  detail: "1.7M of 2.4M tree commitment delivered by end-2024" },
    ],
    emissionsBreakdown: [
      { label: "Cloud Infrastructure", pct: 48, value: "Scope 3",   color: "#06b6d4" },
      { label: "Business Travel",      pct: 32, value: "Scope 3",   color: "#67e8f9" },
      { label: "Supply Chain",         pct: 14, value: "Scope 3",   color: "#a5f3fc" },
      { label: "Facilities",           pct: 6,  value: "Scope 1+2", color: "#cffafe" },
    ],
    highlights: [
      { value: "100%",  label: "Renewable electricity operations",   icon: "☁️" },
      { value: "2021",  label: "Year net zero achieved",             icon: "♻️" },
      { value: "1.7M",  label: "Trees planted toward 2.4M target",  icon: "🌳" },
      { value: "150K+", label: "Customers on Salesforce",           icon: "🤝" },
      { value: "$100M", label: "Sustainability Cloud investment",    icon: "💡" },
    ],
    risks: [
      { label: "Cloud Vendor Scope 3",    detail: "Hyperscaler cloud energy is the largest remaining Scope 3 source.",                          dot: "bg-amber-400" },
      { label: "AI Energy Demand Growth", detail: "Rapid AI adoption may drive data center energy growth offsetting renewable progress.",       dot: "bg-amber-400" },
      { label: "No Major ESG Controversies", detail: "Clean track record with strong governance and transparent sustainability reporting.",     dot: "bg-emerald-400" },
    ],
  },
};

export default salesforce;
