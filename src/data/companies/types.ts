export type ExtData = {
  emissions: { value: string; trend: string; trendDir: "down" | "up"; goal: string; goalDetail: string };
  progressMetrics: { label: string; pct: number; detail: string }[];
  emissionsBreakdown: { label: string; pct: number; value: string; color: string }[];
  highlights: { value: string; label: string; icon: string }[];
  risks: { label: string; detail: string; dot: string }[];
};

export type CompanyData = {
  name: string;
  ticker: string;
  sector: string;
  country: string;
  score: number;
  e: number;
  s: number;
  g: number;
  csr: string;
  frameworks: string[];
  frameworkRatings: Record<string, string>;
  hq: string;
  employees: string;
  revenue: string;
  tags: string[];
  badge: { label: string; icon: string; color: string };
  about: string;
  extended: ExtData;
};
