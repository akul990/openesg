import type { CompanyData } from "./types";

const orsted: CompanyData = {
  name: "Ørsted A/S",
  ticker: "ORSTED",
  sector: "Renewable Energy",
  country: "Denmark",
  score: 93,
  e: 96,
  s: 91,
  g: 92,
  csr: "A+",
  frameworks: ["GRI", "TCFD", "CDP", "CSRD", "UNSDG", "UNGC", "ISO"],
  frameworkRatings: { GRI: "A", TCFD: "A", CDP: "A", CSRD: "A", UNSDG: "A", UNGC: "A", ISO: "A" },
  hq: "Fredericia, Denmark",
  employees: "7,600",
  revenue: "$10.5B",
  tags: ["Offshore Wind", "Clean Energy", "Net Zero", "Sustainability Leader"],
  badge: { label: "Global #1 in Sustainability", icon: "🌍", color: "from-emerald-500 to-teal-500" },
  about:
    "Ørsted is the world's most sustainable energy company, having transformed from fossil fuels into a global leader in offshore wind. Its mission is to create a world that runs entirely on green energy.",
  extended: {
    emissions: { value: "3.1M tCO₂e", trend: "−72% since 2006", trendDir: "down", goal: "Carbon Neutral by 2025", goalDetail: "Full value-chain net zero" },
    progressMetrics: [
      { label: "Renewable Generation Share", pct: 99, detail: "99% of all electricity from offshore wind assets" },
      { label: "Carbon Neutral Operations", pct: 100, detail: "100% renewable electricity across all facilities" },
      { label: "2030 Capacity Target", pct: 88, detail: "16.2 GW installed of 18 GW 2030 target" },
    ],
    emissionsBreakdown: [
      { label: "Supply Chain", pct: 68, value: "2.1M tCO₂e", color: "#6ee7b7" },
      { label: "Operations",   pct: 12, value: "0.4M tCO₂e", color: "#10b981" },
      { label: "Logistics",    pct: 12, value: "0.4M tCO₂e", color: "#34d399" },
      { label: "Other",        pct: 8,  value: "0.2M tCO₂e", color: "#a7f3d0" },
    ],
    highlights: [
      { value: "99%",    label: "Renewable generation share",        icon: "🌊" },
      { value: "−72%",   label: "Emissions vs 2006",                 icon: "📉" },
      { value: "16.2 GW",label: "Offshore wind capacity",            icon: "💨" },
      { value: "#1",     label: "World's most sustainable company",  icon: "🌍" },
      { value: "2025",   label: "Carbon neutrality target",          icon: "🎯" },
    ],
    risks: [
      { label: "Supply Chain Constraints", detail: "Offshore wind supply chain bottlenecks may delay project timelines and increase CapEx.", dot: "bg-amber-400" },
      { label: "Grid Connection Delays",   detail: "Permitting and grid capacity limitations in key markets could affect deployment speed.",  dot: "bg-amber-400" },
      { label: "No Major ESG Controversies", detail: "Strong governance and no significant ESG controversies reported.",                       dot: "bg-emerald-400" },
    ],
  },
};

export default orsted;
