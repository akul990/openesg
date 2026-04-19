import type {
  Transaction,
  EmissionRecord,
  CategorySummary,
  MonthlyTrend,
  Insight,
  ESGSummary,
  NormalizedCategory,
} from "./types";

const CATEGORY_LABELS: Record<NormalizedCategory, string> = {
  transport: "Transport & Travel",
  energy:    "Energy & Utilities",
  food:      "Food & Catering",
  services:  "Services & Software",
  other:     "Other",
};

export function buildSummary(
  transactions: Transaction[],
  emissions: EmissionRecord[]
): ESGSummary {
  const totalCO2 = emissions.reduce((s, e) => s + e.co2, 0);
  const totalAmount = transactions.reduce((s, t) => s + Math.abs(t.amount), 0);

  // ── By-category breakdown ─────────────────────────────────────
  const catMap: Record<string, { co2: number; amount: number; count: number }> = {};
  for (const e of emissions) {
    if (!catMap[e.category]) catMap[e.category] = { co2: 0, amount: 0, count: 0 };
    catMap[e.category].co2 += e.co2;
    catMap[e.category].count += 1;
  }
  for (const t of transactions) {
    if (!catMap[t.category]) catMap[t.category] = { co2: 0, amount: 0, count: 0 };
    catMap[t.category].amount += Math.abs(t.amount);
  }

  const byCategory: CategorySummary[] = Object.entries(catMap)
    .map(([cat, v]) => ({
      category: cat as NormalizedCategory,
      label: CATEGORY_LABELS[cat as NormalizedCategory] ?? cat,
      co2: parseFloat(v.co2.toFixed(2)),
      amount: parseFloat(v.amount.toFixed(2)),
      count: v.count,
      pct: totalCO2 > 0 ? parseFloat(((v.co2 / totalCO2) * 100).toFixed(1)) : 0,
    }))
    .sort((a, b) => b.co2 - a.co2);

  // ── Monthly trend ─────────────────────────────────────────────
  const monthMap: Record<string, { co2: number; amount: number }> = {};
  for (const e of emissions) {
    const month = e.date.slice(0, 7);
    if (!monthMap[month]) monthMap[month] = { co2: 0, amount: 0 };
    monthMap[month].co2 += e.co2;
  }
  for (const t of transactions) {
    const month = t.date.slice(0, 7);
    if (!monthMap[month]) monthMap[month] = { co2: 0, amount: 0 };
    monthMap[month].amount += Math.abs(t.amount);
  }

  const monthly: MonthlyTrend[] = Object.entries(monthMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, v]) => ({
      month,
      label: formatMonthLabel(month),
      co2: parseFloat(v.co2.toFixed(2)),
      amount: parseFloat(v.amount.toFixed(2)),
    }));

  // ── Insights ──────────────────────────────────────────────────
  const insights: Insight[] = [];

  if (byCategory.length > 0) {
    const top = byCategory[0];
    insights.push({
      type: "warning",
      text: `${CATEGORY_LABELS[top.category]} is your largest emission source at ${top.pct}% (${top.co2.toFixed(1)} kg CO₂e).`,
    });
  }

  if (monthly.length >= 2) {
    const last  = monthly[monthly.length - 1];
    const prev  = monthly[monthly.length - 2];
    const delta = prev.co2 > 0 ? ((last.co2 - prev.co2) / prev.co2) * 100 : 0;
    insights.push({
      type: delta > 5 ? "warning" : delta < -5 ? "positive" : "info",
      text:
        delta > 5
          ? `Emissions rose ${delta.toFixed(1)}% in ${last.label} vs ${prev.label}. Review recent ${byCategory[0]?.category ?? "spend"} expenses.`
          : delta < -5
          ? `Emissions fell ${Math.abs(delta).toFixed(1)}% in ${last.label} vs ${prev.label} — good progress.`
          : `Emissions were stable in ${last.label} (${delta >= 0 ? "+" : ""}${delta.toFixed(1)}% vs ${prev.label}).`,
    });
  }

  const tCO2 = totalCO2 / 1000;
  if (tCO2 < 10) {
    insights.push({ type: "positive", text: `Total footprint of ${tCO2.toFixed(2)} tCO₂e is below the EU SME average for your size.` });
  } else if (tCO2 > 50) {
    insights.push({ type: "warning", text: `Footprint of ${tCO2.toFixed(2)} tCO₂e is above the EU SME benchmark. Consider a reduction plan.` });
  } else {
    insights.push({ type: "info", text: `Footprint of ${tCO2.toFixed(2)} tCO₂e is within the EU SME mid-range. Scope 3 accounting recommended next.` });
  }

  return {
    totalCO2: parseFloat(totalCO2.toFixed(2)),
    totalAmount: parseFloat(totalAmount.toFixed(2)),
    transactionCount: transactions.length,
    byCategory,
    monthly,
    insights,
    generatedAt: new Date().toISOString(),
  };
}

function formatMonthLabel(ym: string): string {
  const [y, m] = ym.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[parseInt(m, 10) - 1]} '${y.slice(2)}`;
}
