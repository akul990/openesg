"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Upload, FileText, CheckCircle2, AlertCircle, Download,
  Leaf, ArrowRight, X, Database, Table,
} from "lucide-react";
import { parseCSV } from "@/src/lib/autoesg/csv-parser";
import { calculateBatch } from "@/src/lib/autoesg/carbon-engine";
import { saveStore } from "@/src/lib/autoesg/store";
import { SAMPLE_CSV } from "@/src/lib/autoesg/sample-data";
import type { Transaction } from "@/src/lib/autoesg/types";
import { useAuth } from "@/src/lib/auth/context";

type UploadState = "idle" | "parsing" | "success" | "error";

const CATEGORY_STYLE: Record<string, string> = {
  transport: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
  energy:    "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  food:      "bg-lime-50 text-lime-700 ring-1 ring-lime-200",
  services:  "bg-sky-50 text-sky-700 ring-1 ring-sky-200",
  other:     "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
};

export default function UploadPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const fileRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<UploadState>("idle");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [companyName, setCompanyName] = useState("My Company");
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) router.push("/autoesg");
    else if (user) setCompanyName(user.company || user.name || "My Company");
  }, [user, isLoading, router]);

  function processText(text: string) {
    setState("parsing");
    setErrorMsg("");
    try {
      const txs = parseCSV(text);
      if (txs.length === 0) throw new Error("No valid transactions found. Check your CSV format.");
      setTransactions(txs);
      setState("success");
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "Failed to parse file.");
      setState("error");
    }
  }

  function handleFile(file: File) {
    if (!file.name.endsWith(".csv") && file.type !== "text/csv") {
      setErrorMsg("Only CSV files are supported.");
      setState("error");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => processText(e.target?.result as string);
    reader.readAsText(file);
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function loadSample() { processText(SAMPLE_CSV); }

  function downloadSample() {
    const blob = new Blob([SAMPLE_CSV], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "autoesg_sample.csv"; a.click();
    URL.revokeObjectURL(url);
  }

  function handleAnalyse() {
    const emissions = calculateBatch(transactions);
    saveStore({ companyName, transactions, emissions, uploadedAt: new Date().toISOString() });
    router.push("/autoesg/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-primary" />

      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-100 bg-white/95 px-4 py-3 backdrop-blur sm:px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-sm">
            <Leaf className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-black text-primary">AutoESG</span>
        </div>

        {/* Progress steps */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-black text-white">1</span>
            <span className="hidden text-[11px] font-semibold text-primary sm:block">Upload</span>
          </div>
          <div className="h-px w-6 bg-slate-200" />
          <div className="flex items-center gap-1.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-500">2</span>
            <span className="hidden text-[11px] text-slate-400 sm:block">Dashboard</span>
          </div>
        </div>

        <Link href="/autoesg" className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-slate-600">
          <X className="h-3.5 w-3.5" /> Exit
        </Link>
      </header>

      <main className="flex-1 px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-3xl">

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Upload your transaction data</h1>
            <p className="mt-2 text-sm text-slate-500">
              Upload a CSV export from your accounting software. We&apos;ll calculate your carbon footprint in seconds.
            </p>
          </div>

          {/* Company name */}
          <div className="mb-6">
            <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-500">Company Name</label>
            <input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full max-w-xs rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          {/* Drop zone */}
          {state !== "success" && (
            <div
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              className={`flex cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed px-8 py-14 transition-all ${
                dragging
                  ? "border-primary bg-primary/5"
                  : state === "error"
                  ? "border-red-300 bg-red-50"
                  : "border-slate-200 bg-white hover:border-primary/40 hover:bg-primary/3"
              }`}
            >
              {state === "parsing" ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  <p className="text-sm text-slate-500">Parsing transactions…</p>
                </div>
              ) : state === "error" ? (
                <div className="flex flex-col items-center gap-3">
                  <AlertCircle className="h-10 w-10 text-red-500" />
                  <p className="text-sm font-semibold text-red-600">{errorMsg}</p>
                  <p className="text-[11px] text-slate-400">Click to try again</p>
                </div>
              ) : (
                <>
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Upload className="h-8 w-8" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-slate-800">Drop your CSV here or click to browse</p>
                    <p className="mt-1 text-[11px] text-slate-400">columns: date, description, amount, category (optional)</p>
                  </div>
                  <span className="rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-[11px] font-semibold text-primary">
                    Browse files
                  </span>
                </>
              )}
            </div>
          )}

          <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={onFileChange} />

          {/* Helper actions */}
          {state !== "success" && (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={loadSample}
                className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-[11px] font-semibold text-slate-600 shadow-sm transition-all hover:border-primary/30 hover:text-primary"
              >
                <Database className="h-3.5 w-3.5" /> Load sample data (50 transactions)
              </button>
              <button
                type="button"
                onClick={downloadSample}
                className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-[11px] font-semibold text-slate-600 shadow-sm transition-all hover:border-primary/30 hover:text-primary"
              >
                <Download className="h-3.5 w-3.5" /> Download sample CSV
              </button>
            </div>
          )}

          {/* Format hint */}
          {state === "idle" && (
            <div className="mt-6 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">Expected CSV Format</p>
              <pre className="overflow-x-auto rounded-lg bg-slate-50 p-3 text-[11px] text-slate-600">{`date,description,amount,category
2025-01-05,British Gas electricity,420.00,energy
2025-01-08,Shell petrol station,85.00,transport
2025-01-10,Team lunch catering,230.00,food`}</pre>
            </div>
          )}

          {/* Success state */}
          {state === "success" && (
            <div className="animate-content-fade">
              {/* Success banner */}
              <div className="mb-4 flex items-center justify-between rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <p className="text-sm font-semibold text-primary">{transactions.length} transactions parsed successfully</p>
                </div>
                <button
                  type="button"
                  onClick={() => { setState("idle"); setTransactions([]); }}
                  className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-slate-600"
                >
                  <X className="h-3.5 w-3.5" /> Replace
                </button>
              </div>

              {/* Category summary pills */}
              <div className="mb-4 flex flex-wrap gap-2">
                {Object.entries(
                  transactions.reduce<Record<string, number>>((acc, t) => {
                    acc[t.category] = (acc[t.category] ?? 0) + 1;
                    return acc;
                  }, {})
                ).map(([cat, count]) => (
                  <span key={cat} className={`rounded-full px-3 py-1 text-[10px] font-bold ${CATEGORY_STYLE[cat] ?? CATEGORY_STYLE.other}`}>
                    {count} × {cat}
                  </span>
                ))}
              </div>

              {/* Preview table */}
              <div className="max-h-72 overflow-y-auto rounded-xl border border-slate-100 bg-white shadow-sm">
                <table className="w-full text-[11px]">
                  <thead className="sticky top-0 border-b border-slate-100 bg-surface">
                    <tr>
                      {["Date", "Description", "Amount (€)", "Category"].map(h => (
                        <th key={h} className="px-3 py-2.5 text-left text-[9px] font-bold uppercase tracking-wider text-slate-400">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {transactions.slice(0, 20).map((t) => (
                      <tr key={t.id} className="hover:bg-surface">
                        <td className="px-3 py-2 text-slate-500">{t.date}</td>
                        <td className="max-w-[200px] truncate px-3 py-2 text-slate-700">{t.description}</td>
                        <td className="px-3 py-2 font-mono font-semibold text-slate-800">{t.amount.toFixed(2)}</td>
                        <td className="px-3 py-2">
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${CATEGORY_STYLE[t.category] ?? CATEGORY_STYLE.other}`}>
                            {t.category}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {transactions.length > 20 && (
                  <p className="border-t border-slate-50 px-4 py-2 text-[10px] text-slate-400">
                    <Table className="mr-1 inline h-3 w-3" />
                    Showing 20 of {transactions.length} rows
                  </p>
                )}
              </div>

              {/* CTA */}
              <button
                type="button"
                onClick={handleAnalyse}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-white shadow-md shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-lg"
              >
                <FileText className="h-4 w-4" />
                Calculate Emissions &amp; Generate Report
                <ArrowRight className="h-4 w-4" />
              </button>

              <p className="mt-3 text-center text-[11px] text-slate-400">
                Emissions calculated using DEFRA 2024 spend-based factors · GHG Protocol Scope 3
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
