import type { CompanyData } from "./types";

const adobe: CompanyData = {
  name: "Adobe Inc.",
  ticker: "ADBE",
  sector: "Technology",
  country: "USA",
  score: 82,
  e: 79,
  s: 84,
  g: 83,
  csr: "A",
  frameworks: ["GRI", "SASB", "UNSDG", "UNGC"],
  frameworkRatings: { GRI: "A-", SASB: "A-", UNSDG: "A-", UNGC: "A-" },
  hq: "San Jose, USA",
  employees: "29,000",
  revenue: "$21.5B",
  tags: ["Creative Software", "Digital Media", "Cloud", "AI Content"],
  badge: { label: "100% Renewable Operations", icon: "💡", color: "from-purple-500 to-emerald-500" },
  about:
    "Adobe empowers creativity for billions of people through its Creative Cloud, Document Cloud, and Experience Cloud platforms. The company has run on 100% renewable electricity since 2019 and publicly reports its full supply chain emissions.",
  extended: {
    emissions: { value: "0 tCO₂e net", trend: "Carbon Neutral since 2016", trendDir: "down", goal: "Net Zero by 2035", goalDetail: "Full Scope 1, 2 & 3 value chain" },
    progressMetrics: [
      { label: "Renewable Electricity",         pct: 100, detail: "100% renewable electricity across all Adobe facilities since 2019" },
      { label: "Net Zero Scope 1+2",            pct: 100, detail: "Net zero GHG for Scope 1 & 2 emissions since 2016" },
      { label: "Scope 3 Value Chain Reduction", pct: 38,  detail: "38% progress on full Scope 3 toward 2035 target" },
    ],
    emissionsBreakdown: [
      { label: "Cloud & Data Centers", pct: 52, value: "Largest Scope 3", color: "#8b5cf6" },
      { label: "Business Travel",      pct: 28, value: "Major Scope 3",   color: "#a78bfa" },
      { label: "Commuting",            pct: 12, value: "Scope 3",         color: "#c4b5fd" },
      { label: "Facilities",           pct: 8,  value: "Scope 1+2",       color: "#ddd6fe" },
    ],
    highlights: [
      { value: "100%",  label: "Renewable electricity since 2019",     icon: "💡" },
      { value: "2016",  label: "Year net zero Scope 1+2 achieved",     icon: "♻️" },
      { value: "−64%",  label: "Scope 1+2 emissions vs 2012",          icon: "📉" },
      { value: "5M+",   label: "Creative professionals upskilled",     icon: "🎨" },
      { value: "2035",  label: "Full value chain net zero target",      icon: "🎯" },
    ],
    risks: [
      { label: "Scope 3 Cloud Infrastructure", detail: "Third-party cloud is the fastest-growing Scope 3 source as AI adoption rises.",        dot: "bg-amber-400" },
      { label: "AI-Generated Content Ethics",  detail: "Generative AI products carry IP and bias risk that could drive regulatory action.",    dot: "bg-amber-400" },
      { label: "No Major ESG Controversies",   detail: "Clean track record with strong data privacy practices and board independence.",         dot: "bg-emerald-400" },
    ],
  },
};

export default adobe;
