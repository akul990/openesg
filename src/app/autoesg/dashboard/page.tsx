"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  PieChart, Pie, Cell, Tooltip as ReTooltip, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts";
import {
  Leaf, Download, TrendingUp, TrendingDown, Minus,
  AlertTriangle, CheckCircle2, Info, ArrowLeft,
  BarChart2, FileText, RefreshCw,
} from "lucide-react";
import { loadStore } from "@/src/lib/autoesg/store";
import { buildSummary } from "@/src/lib/autoesg/aggregator";
import { EMISSION_FACTORS } from "@/src/lib/autoesg/carbon-engine";
import type { ESGSummary, AutoESGStore, NormalizedCategory } from "@/src/lib/autoesg/types";
import { useAuth } from "@/src/lib/auth/context";

/* ── Colors aligned to brand palette ───────────────────────────── */
// primary=#1a7a4a  accent=#2dd4a0  dark=#0d1f17  surface=#f4f9f6
const CAT_COLORS: Record<string, string> = {
  transport: "#f87171",   // rose
  energy:    "#fbbf24",   // amber
  food:      "#4ade80",   // green
  services:  "#38bdf8",   // sky
  other:     "#94a3b8",   // slate
};
const CAT_LABELS: Record<string, string> = {
  transport: "Transport & Travel",
  energy:    "Energy & Utilities",
  food:      "Food & Catering",
  services:  "Services & Software",
  other:     "Other",
};
const INSIGHT_STYLE = {
  warning:  { Icon: AlertTriangle,  cls: "border-amber-200 bg-amber-50 text-amber-700",   dot: "bg-amber-400" },
  positive: { Icon: CheckCircle2,   cls: "border-primary/20 bg-primary/5 text-primary",   dot: "bg-primary"   },
  info:     { Icon: Info,           cls: "border-sky-200 bg-sky-50 text-sky-700",          dot: "bg-sky-400"   },
};

const PRINT_STYLES = `
@media print {
  body { background: white !important; color: #0f172a !important; font-family: Inter, sans-serif; }
  .no-print { display: none !important; }
}`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function PieLabel(props: any) {
  const { cx, cy, midAngle, outerRadius, payload, percent } = props;
  const RADIAN = Math.PI / 180;
  const radius = (outerRadius as number) + 28;
  const x = (cx as number) + radius * Math.cos(-(midAngle as number) * RADIAN);
  const y = (cy as number) + radius * Math.sin(-(midAngle as number) * RADIAN);
  const pct = Math.round((percent as number) * 100);
  if (pct < 6) return null;
  const name = CAT_LABELS[payload?.category as string] ?? (payload?.category as string) ?? "";
  return (
    <text x={x} y={y} fill="#64748b" textAnchor={x > (cx as number) ? "start" : "end"} dominantBaseline="central" fontSize={10} fontWeight={600}>
      {name.split(" ")[0]} {pct}%
    </text>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [store, setStore] = useState<AutoESGStore | null>(null);
  const [summary, setSummary] = useState<ESGSummary | null>(null);

  useEffect(() => {
    if (!isLoading && !user) { router.push("/autoesg"); return; }
    const s = loadStore();
    if (!s) { router.push("/autoesg/upload"); return; }
    setStore(s);
    setSummary(buildSummary(s.transactions, s.emissions));
  }, [user, isLoading, router]);

  function handlePrint() {
    const style = document.createElement("style");
    style.textContent = PRINT_STYLES;
    document.head.appendChild(style);
    window.print();
    setTimeout(() => document.head.removeChild(style), 1000);
  }

  if (!summary || !store) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  const tCO2 = (summary.totalCO2 / 1000).toFixed(3);
  const topCat = summary.byCategory[0];
  const lastTwo = summary.monthly.slice(-2);
  const mom = lastTwo.length === 2 && lastTwo[0].co2 > 0
    ? ((lastTwo[1].co2 - lastTwo[0].co2) / lastTwo[0].co2) * 100
    : null;

  return (
    <div className="min-h-screen bg-surface">
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-primary" />

      {/* Navbar */}
      <header className="no-print sticky top-0 z-50 flex items-center justify-between border-b border-slate-100 bg-white/95 px-4 py-3 backdrop-blur sm:px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-sm">
            <Leaf className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-black text-primary">AutoESG</span>
          <span className="hidden text-[11px] text-slate-400 sm:block">· {store.companyName}</span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/autoesg/upload"
            className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-600 shadow-sm transition-all hover:border-primary/30 hover:text-primary"
          >
            <RefreshCw className="h-3 w-3" /> Re-upload
          </Link>
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-[11px] font-bold text-white shadow-md transition-all hover:bg-primary/90"
          >
            <Download className="h-3.5 w-3.5" /> Download Report
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">

        {/* ── Report header ─────────────────────────────── */}
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                CSRD-Lite Carbon Report
              </span>
              <span className="text-[10px] text-slate-400">
                Generated {new Date(summary.generatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 sm:text-3xl">{store.companyName}</h1>
            <p className="mt-1 text-sm text-slate-500">
              {store.transactions.length} transactions · €{summary.totalAmount.toLocaleString()} total spend ·{" "}
              {summary.monthly[0]?.label} – {summary.monthly[summary.monthly.length - 1]?.label}
            </p>
          </div>
          {/* Hero CO₂ badge */}
          <div className="rounded-2xl border border-primary/20 bg-white px-7 py-5 text-center shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Total CO₂e</p>
            <p className="mt-1 text-4xl font-black text-slate-900">{tCO2}</p>
            <p className="text-sm font-semibold text-slate-400">tonnes CO₂e</p>
          </div>
        </div>

        {/* ── KPI row ───────────────────────────────────── */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            {
              label: "Total Emissions",
              value: `${summary.totalCO2.toFixed(1)} kg`,
              sub: `${tCO2} tCO₂e`,
              Icon: BarChart2,
              accent: "text-primary",
              bg: "bg-primary/8",
            },
            {
              label: "Top Category",
              value: CAT_LABELS[topCat?.category ?? "other"]?.split(" ")[0] ?? "—",
              sub: `${topCat?.pct ?? 0}% of total`,
              Icon: TrendingUp,
              accent: "text-rose-500",
              bg: "bg-rose-50",
            },
            {
              label: "MoM Change",
              value: mom !== null ? `${mom >= 0 ? "+" : ""}${mom.toFixed(1)}%` : "—",
              sub: `vs ${lastTwo[0]?.label ?? "prior month"}`,
              Icon: mom !== null && mom > 0 ? TrendingUp : mom !== null && mom < 0 ? TrendingDown : Minus,
              accent: mom !== null && mom > 5 ? "text-rose-500" : mom !== null && mom < -5 ? "text-primary" : "text-slate-400",
              bg: mom !== null && mom > 5 ? "bg-rose-50" : mom !== null && mom < -5 ? "bg-primary/8" : "bg-slate-50",
            },
            {
              label: "Transactions",
              value: store.transactions.length.toString(),
              sub: `${summary.byCategory.length} categories`,
              Icon: FileText,
              accent: "text-sky-500",
              bg: "bg-sky-50",
            },
          ].map(({ label, value, sub, Icon, accent, bg }) => (
            <div key={label} className={`rounded-xl border border-slate-100 bg-white p-4 shadow-sm`}>
              <div className={`mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg ${bg}`}>
                <Icon className={`h-4 w-4 ${accent}`} />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
              <p className={`mt-1 text-xl font-black ${accent}`}>{value}</p>
              <p className="text-[10px] text-slate-400">{sub}</p>
            </div>
          ))}
        </div>

        {/* ── Charts ────────────────────────────────────── */}
        <div className="mb-6 grid gap-5 lg:grid-cols-2">

          {/* Pie chart */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Emissions by Category</p>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={summary.byCategory}
                    dataKey="co2"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={85}
                    innerRadius={40}
                    label={PieLabel}
                    labelLine={false}
                  >
                    {summary.byCategory.map((entry) => (
                      <Cell key={entry.category} fill={CAT_COLORS[entry.category] ?? "#94a3b8"} />
                    ))}
                  </Pie>
                  <ReTooltip
                    formatter={(v, name) => [`${Number(v).toFixed(2)} kg CO₂e`, CAT_LABELS[String(name)] ?? String(name)]}
                    contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, fontSize: 12, color: "#0f172a", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-1.5">
              {summary.byCategory.map((c) => (
                <div key={c.category} className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: CAT_COLORS[c.category] ?? "#94a3b8" }} />
                  <span className="truncate text-[10px] text-slate-500">{CAT_LABELS[c.category]}</span>
                  <span className="ml-auto text-[10px] font-bold text-slate-700">{c.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Line chart */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Monthly Trend (kg CO₂e)</p>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={summary.monthly} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="label" tick={{ fill: "#94a3b8", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    formatter={(v) => [`${Number(v).toFixed(2)} kg CO₂e`, "Emissions"]}
                    contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, fontSize: 12, color: "#0f172a", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
                  />
                  <Legend formatter={(v) => <span style={{ fontSize: 10, color: "#94a3b8" }}>{v}</span>} />
                  <Line
                    type="monotone"
                    dataKey="co2"
                    name="CO₂e (kg)"
                    stroke="#1a7a4a"
                    strokeWidth={2.5}
                    dot={{ fill: "#1a7a4a", r: 4, strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: "#2dd4a0", stroke: "#1a7a4a", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ── Category breakdown bars ────────────────────── */}
        <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Category Breakdown</p>
          <div className="space-y-4">
            {summary.byCategory.map((c) => (
              <div key={c.category}>
                <div className="mb-1.5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: CAT_COLORS[c.category] }} />
                    <span className="font-semibold text-slate-700">{CAT_LABELS[c.category]}</span>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] text-slate-500">
                      {c.count} transactions · €{c.amount.toFixed(0)} · {EMISSION_FACTORS[c.category as NormalizedCategory] ?? 0.08} kg CO₂e/€
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-700">{c.co2.toFixed(1)} kg · {c.pct}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${c.pct}%`, background: CAT_COLORS[c.category] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Insights ──────────────────────────────────── */}
        <div className="mb-6">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">AI-Generated Insights</p>
          <div className="space-y-2.5">
            {summary.insights.map((ins, i) => {
              const { Icon, cls } = INSIGHT_STYLE[ins.type];
              return (
                <div key={i} className={`flex items-start gap-3 rounded-xl border px-4 py-3.5 ${cls}`}>
                  <Icon className="mt-0.5 h-4 w-4 shrink-0" />
                  <p className="text-sm leading-relaxed">{ins.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Methodology — dark brand section ──────────── */}
        <div className="mb-6 overflow-hidden rounded-2xl bg-dark">
          <div className="px-5 py-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-accent">Methodology &amp; Emission Factors</p>
            <p className="mt-2 text-[12px] leading-relaxed text-white/60">
              Emissions calculated using spend-based emission factors from DEFRA 2024 and EXIOBASE, aligned with GHG Protocol Scope 3 Category 1. Each transaction is mapped to a category using keyword rules, then multiplied by the corresponding factor.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-px bg-white/5 sm:grid-cols-5">
            {Object.entries(EMISSION_FACTORS).map(([cat, factor]) => (
              <div key={cat} className="bg-dark px-4 py-4 text-center">
                <p className="text-[9px] font-bold uppercase tracking-wider text-white/40">{CAT_LABELS[cat]}</p>
                <p className="mt-2 font-mono text-xl font-black text-accent">{factor}</p>
                <p className="mt-0.5 text-[9px] text-white/30">kg CO₂e / €</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Report footer ─────────────────────────────── */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5 text-[10px] text-slate-400">
          <span>Generated by AutoESG · openESG Platform · {new Date().getFullYear()}</span>
          <span>DEFRA 2024 · GHG Protocol Scope 3 · Spend-based methodology</span>
          <span className="font-mono">ID: {Math.random().toString(36).slice(2, 10).toUpperCase()}</span>
        </div>

        {/* ── Action row ────────────────────────────────── */}
        <div className="no-print flex flex-wrap gap-3 pb-10">
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-md shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-lg"
          >
            <Download className="h-4 w-4" /> Download PDF Report
          </button>
          <Link
            href="/autoesg/upload"
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-600 shadow-sm transition-all hover:border-primary/30 hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> New Upload
          </Link>
          <Link
            href="/automate"
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-600 shadow-sm transition-all hover:border-primary/30 hover:text-primary"
          >
            ← AutoESG Overview
          </Link>
        </div>
      </main>
    </div>
  );
}
