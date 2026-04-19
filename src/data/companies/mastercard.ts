import type { CompanyData } from "./types";

const mastercard: CompanyData = {
  name: "Mastercard Inc.",
  ticker: "MA",
  sector: "Financial Services",
  country: "USA",
  score: 80,
  e: 76,
  s: 82,
  g: 83,
  csr: "A–",
  frameworks: ["GRI", "TCFD", "UNSDG", "UNGC"],
  frameworkRatings: { GRI: "B+", TCFD: "B+", UNSDG: "B+", UNGC: "B+" },
  hq: "Purchase, USA",
  employees: "33,000",
  revenue: "$25.1B",
  tags: ["Payments", "Fintech", "Digital Commerce", "Financial Inclusion"],
  badge: { label: "Financial Inclusion Leader", icon: "🤝", color: "from-orange-500 to-emerald-500" },
  about:
    "Mastercard connects billions of people and businesses through its global payments network. Its Priceless Planet Coalition has committed to restoring 100 million trees, and its Centre for Inclusive Growth reaches underserved communities worldwide.",
  extended: {
    emissions: { value: "0.55M tCO₂e", trend: "Carbon Neutral since 2014", trendDir: "down", goal: "Net Zero by 2040", goalDetail: "Full Scope 1, 2 & 3 value chain" },
    progressMetrics: [
      { label: "Carbon Neutral Operations", pct: 100, detail: "Carbon neutral since 2014 across all Mastercard facilities" },
      { label: "Renewable Electricity",     pct: 100, detail: "100% renewable electricity for global operations since 2023" },
      { label: "Tree Planting Target",      pct: 43,  detail: "43M of 100M tree commitment delivered by end-2024" },
    ],
    emissionsBreakdown: [
      { label: "Business Travel",    pct: 45, value: "Largest Scope 3", color: "#f97316" },
      { label: "Supply Chain (Tech)",pct: 30, value: "Major Scope 3",   color: "#fb923c" },
      { label: "Data Centers",       pct: 18, value: "Scope 2",         color: "#fdba74" },
      { label: "Facilities",         pct: 7,  value: "Scope 1",         color: "#fed7aa" },
    ],
    highlights: [
      { value: "2014", label: "Year carbon neutrality achieved",   icon: "🤝" },
      { value: "100%", label: "Renewable electricity (2023)",      icon: "⚡" },
      { value: "43M",  label: "Trees planted toward 100M goal",    icon: "🌳" },
      { value: "3B+",  label: "Cardholders reached globally",      icon: "💳" },
      { value: "2040", label: "Net zero value chain target",       icon: "🎯" },
    ],
    risks: [
      { label: "Scope 3 Merchant Ecosystem", detail: "Downstream merchant and cardholder emissions are significant but hard to quantify.",      dot: "bg-amber-400" },
      { label: "Framework Coverage Gaps",    detail: "GRI and TCFD only; ISSB and SASB alignment pending versus fintech peers.",               dot: "bg-amber-400" },
      { label: "Financial Inclusion Progress", detail: "Priceless Planet Coalition and Inclusive Growth reach 500M+ underserved people.",      dot: "bg-emerald-400" },
    ],
  },
};

export default mastercard;
