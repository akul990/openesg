import type { CompanyData } from "./types";

const unilever: CompanyData = {
  name: "Unilever plc",
  ticker: "ULVR",
  sector: "Consumer Staples",
  country: "UK",
  score: 84,
  e: 88,
  s: 82,
  g: 79,
  csr: "A–",
  frameworks: ["GRI", "TCFD", "CDP", "UNSDG", "UNGC", "ISO"],
  frameworkRatings: { GRI: "A", TCFD: "A-", CDP: "A-", UNSDG: "A", UNGC: "A", ISO: "A-" },
  hq: "London, UK",
  employees: "128,000",
  revenue: "$62.2B",
  tags: ["FMCG", "Sustainable Brands", "Consumer Goods", "Plastic Reduction"],
  badge: { label: "Sustainable Living Brand", icon: "🌱", color: "from-green-500 to-teal-400" },
  about:
    "Unilever owns 400+ consumer brands including Dove, Ben & Jerry's, and Hellmann's. Its Compass strategy commits to halving environmental footprint while improving health and wellbeing for 1 billion people by 2030.",
  extended: {
    emissions: { value: "3.6M tCO₂e", trend: "−57% vs 2015", trendDir: "down", goal: "Net Zero by 2039", goalDetail: "Full Scope 1, 2 & 3" },
    progressMetrics: [
      { label: "Manufacturing Emissions Reduction", pct: 57,  detail: "57% absolute reduction in manufacturing GHG since 2015" },
      { label: "Renewable Electricity (Mfg.)",      pct: 100, detail: "All manufacturing sites on 100% renewable electricity" },
      { label: "Sustainable Living Brands Share",   pct: 61,  detail: "61% of portfolio brands meet Sustainable Living criteria" },
    ],
    emissionsBreakdown: [
      { label: "Consumer Use",  pct: 60, value: "2.2M tCO₂e",  color: "#f59e0b" },
      { label: "Supply Chain",  pct: 25, value: "0.9M tCO₂e",  color: "#fcd34d" },
      { label: "Manufacturing", pct: 10, value: "0.36M tCO₂e", color: "#10b981" },
      { label: "Logistics",     pct: 5,  value: "0.18M tCO₂e", color: "#6ee7b7" },
    ],
    highlights: [
      { value: "100%",  label: "Renewable electricity in manufacturing", icon: "⚡" },
      { value: "−57%",  label: "Manufacturing GHG vs 2015",              icon: "📉" },
      { value: "400+",  label: "Consumer brands globally",               icon: "🛒" },
      { value: "€1B",   label: "Climate & nature fund",                  icon: "🌿" },
      { value: "2039",  label: "Full net zero target year",              icon: "🎯" },
    ],
    risks: [
      { label: "Plastic Packaging Lagging",   detail: "Plastic reduction targets lag 2022 voluntary pledges; investor scrutiny increasing.",           dot: "bg-red-400" },
      { label: "Scope 3 Consumer Emissions",  detail: "Consumer use-phase is 60%+ of footprint and difficult to influence directly.",                  dot: "bg-amber-400" },
      { label: "Strong Social Performance",   detail: "Living wage extended to tier-2 suppliers across 12 high-risk sourcing markets.",               dot: "bg-emerald-400" },
    ],
  },
};

export default unilever;
