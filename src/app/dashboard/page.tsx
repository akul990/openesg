"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard, Zap, BarChart2, FileText, ArrowRight,
  TrendingUp, Building2, Leaf, LogOut, Settings,
  Clock, Shield, Download,
} from "lucide-react";
import { useAuth } from "@/src/lib/auth/context";
import { loadStore } from "@/src/lib/autoesg/store";
import { buildSummary } from "@/src/lib/autoesg/aggregator";
import { Navbar } from "@/src/components/Navbar";
import { Footer } from "@/src/components/Footer";
import type { ESGSummary } from "@/src/lib/autoesg/types";

const PLAN_BADGE: Record<string, { label: string; cls: string }> = {
  free:         { label: "Free",         cls: "bg-slate-100 text-slate-600" },
  starter:      { label: "Starter",      cls: "bg-primary/10 text-primary" },
  professional: { label: "Professional", cls: "bg-accent/20 text-emerald-700" },
};

const QUICK_LINKS = [
  {
    href: "/autoesg/upload",
    icon: Zap,
    title: "AutoESG Tool",
    desc: "Upload transactions, calculate your carbon footprint, export CSRD-lite report.",
    badge: "Free",
    badgeCls: "bg-primary/10 text-primary",
    accent: "bg-primary",
  },
  {
    href: "/platform/companies",
    icon: Building2,
    title: "ESG Company Ratings",
    desc: "Browse ESG scores, greenwashing risk, and weekly ESG watch for 15 major companies.",
    badge: "Live",
    badgeCls: "bg-emerald-100 text-emerald-700",
    accent: "bg-emerald-500",
  },
  {
    href: "/automate",
    icon: BarChart2,
    title: "Automate Overview",
    desc: "Learn how the automated ESG compliance engine works — architecture, pipeline, and sprint plan.",
    badge: "Docs",
    badgeCls: "bg-sky-100 text-sky-700",
    accent: "bg-sky-500",
  },
  {
    href: "/methodology",
    icon: Shield,
    title: "Methodology",
    desc: "How we score companies across GRI, SASB, TCFD, CSRD, and ISSB frameworks.",
    badge: "Reference",
    badgeCls: "bg-slate-100 text-slate-600",
    accent: "bg-slate-400",
  },
];

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");
}

export default function DashboardPage() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const [esgSummary, setEsgSummary] = useState<ESGSummary | null>(null);
  const [hasReport, setHasReport]   = useState(false);

  useEffect(() => {
    if (!isLoading && !user) router.push("/");
  }, [user, isLoading, router]);

  useEffect(() => {
    const store = loadStore();
    if (store?.transactions?.length) {
      setHasReport(true);
      setEsgSummary(buildSummary(store.transactions, store.emissions));
    }
  }, []);

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  const plan = PLAN_BADGE[user.plan] ?? PLAN_BADGE.free;
  const joined = new Date(user.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <Navbar />

      {/* Top accent */}
      <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-primary" />

      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">

          {/* ── Welcome header ────────────────────────── */}
          <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-xl font-black text-white shadow-md">
                {initials(user.name)}
              </div>
              <div>
                <p className="text-sm text-slate-500">Welcome back</p>
                <h1 className="text-2xl font-black text-slate-900">{user.name}</h1>
                <div className="mt-1 flex items-center gap-2">
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${plan.cls}`}>
                    {plan.label} plan
                  </span>
                  {user.company && (
                    <span className="text-[11px] text-slate-400">· {user.company}</span>
                  )}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => { logout(); router.push("/"); }}
              className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-[12px] font-semibold text-slate-500 shadow-sm transition-all hover:border-red-200 hover:text-red-500"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign Out
            </button>
          </div>

          {/* ── Account summary strip ──────────────────── */}
          <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: LayoutDashboard, label: "Account Status",  value: "Active",           color: "text-primary",   bg: "bg-primary/8"  },
              { icon: Clock,           label: "Member Since",    value: joined,              color: "text-slate-700", bg: "bg-slate-100"  },
              { icon: FileText,        label: "AutoESG Reports", value: hasReport ? "1" : "0", color: "text-sky-600",bg: "bg-sky-50"     },
              { icon: Shield,          label: "Plan",            value: plan.label,          color: "text-primary",   bg: "bg-primary/8"  },
            ].map(({ icon: Icon, label, value, color, bg }) => (
              <div key={label} className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                <div className={`mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg ${bg}`}>
                  <Icon className={`h-4 w-4 ${color}`} />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
                <p className={`mt-1 text-sm font-bold ${color}`}>{value}</p>
              </div>
            ))}
          </div>

          {/* ── AutoESG report preview ────────────────── */}
          {esgSummary && (
            <div className="mb-8 overflow-hidden rounded-2xl border border-primary/20 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 bg-primary/5 px-5 py-3">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  <p className="text-sm font-bold text-primary">Latest AutoESG Report</p>
                </div>
                <Link
                  href="/autoesg/dashboard"
                  className="flex items-center gap-1.5 text-[11px] font-semibold text-primary hover:underline"
                >
                  View full report <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-px bg-slate-100 sm:grid-cols-4">
                {[
                  { label: "Total CO₂e",     value: `${(esgSummary.totalCO2 / 1000).toFixed(3)} t`,  color: "text-primary" },
                  { label: "Transactions",   value: esgSummary.transactionCount.toString(),           color: "text-slate-800" },
                  { label: "Top Category",   value: esgSummary.byCategory[0]?.category ?? "—",       color: "text-rose-600" },
                  { label: "Total Spend",    value: `€${esgSummary.totalAmount.toLocaleString()}`,    color: "text-slate-800" },
                ].map(({ label, value, color }) => (
                  <div key={label} className="bg-white px-5 py-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
                    <p className={`mt-1 text-lg font-black ${color}`}>{value}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 border-t border-slate-100 px-5 py-3">
                <Link href="/autoesg/dashboard" className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-[11px] font-bold text-white shadow-sm transition-all hover:bg-primary/90">
                  <BarChart2 className="h-3.5 w-3.5" /> View Dashboard
                </Link>
                <Link href="/autoesg/upload" className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[11px] font-semibold text-slate-600 shadow-sm transition-all hover:border-primary/30 hover:text-primary">
                  <Download className="h-3.5 w-3.5" /> New Report
                </Link>
              </div>
            </div>
          )}

          {/* ── Quick access cards ────────────────────── */}
          <div className="mb-8">
            <h2 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Quick Access</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {QUICK_LINKS.map(({ href, icon: Icon, title, desc, badge, badgeCls, accent }) => (
                <Link
                  key={href}
                  href={href}
                  className="group flex flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md"
                >
                  <div className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl text-white ${accent}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-primary">{title}</h3>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${badgeCls}`}>{badge}</span>
                  </div>
                  <p className="mt-1.5 flex-1 text-[11px] leading-relaxed text-slate-500">{desc}</p>
                  <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Open <ArrowRight className="h-3 w-3" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* ── No report CTA ─────────────────────────── */}
          {!hasReport && (
            <div className="mb-8 overflow-hidden rounded-2xl bg-dark">
              <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/20">
                    <Zap className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Generate your first carbon report</p>
                    <p className="text-sm text-white/50">Upload a CSV of transactions and get a CSRD-lite emissions report in under 5 minutes.</p>
                  </div>
                </div>
                <Link
                  href="/autoesg/upload"
                  className="flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-bold text-dark shadow-md transition-all hover:bg-accent/90"
                >
                  Start AutoESG <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          )}

          {/* ── Profile card ──────────────────────────── */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Profile</h2>
              <button type="button" className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-[11px] font-semibold text-slate-500 hover:border-primary/30 hover:text-primary">
                <Settings className="h-3.5 w-3.5" /> Edit
              </button>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Full Name",  value: user.name },
                { label: "Email",      value: user.email },
                { label: "Company",    value: user.company || "—" },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-xl bg-surface px-4 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
                  <p className="mt-1 truncate text-sm font-semibold text-slate-800">{value}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
