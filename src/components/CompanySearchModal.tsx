"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Building2, MapPin, TrendingUp, TrendingDown, Minus, ArrowUpRight } from "lucide-react";

const companies = [
  { name: "Apple Inc.",                  ticker: "AAPL",  sector: "Technology",          country: "USA",         score: 74 },
  { name: "Microsoft Corporation",       ticker: "MSFT",  sector: "Technology",          country: "USA",         score: 81 },
  { name: "Alphabet Inc.",               ticker: "GOOGL", sector: "Technology",          country: "USA",         score: 69 },
  { name: "Amazon.com Inc.",             ticker: "AMZN",  sector: "Consumer Discretionary", country: "USA",      score: 63 },
  { name: "Tesla Inc.",                  ticker: "TSLA",  sector: "Automobiles",         country: "USA",         score: 58 },
  { name: "NVIDIA Corporation",          ticker: "NVDA",  sector: "Semiconductors",      country: "USA",         score: 72 },
  { name: "Meta Platforms Inc.",         ticker: "META",  sector: "Technology",          country: "USA",         score: 55 },
  { name: "JPMorgan Chase & Co.",        ticker: "JPM",   sector: "Financial Services",  country: "USA",         score: 67 },
  { name: "Johnson & Johnson",           ticker: "JNJ",   sector: "Healthcare",          country: "USA",         score: 78 },
  { name: "ExxonMobil Corporation",      ticker: "XOM",   sector: "Energy",              country: "USA",         score: 41 },
  { name: "Chevron Corporation",         ticker: "CVX",   sector: "Energy",              country: "USA",         score: 44 },
  { name: "Procter & Gamble Co.",        ticker: "PG",    sector: "Consumer Staples",    country: "USA",         score: 76 },
  { name: "Walmart Inc.",                ticker: "WMT",   sector: "Retail",              country: "USA",         score: 71 },
  { name: "Mastercard Inc.",             ticker: "MA",    sector: "Financial Services",  country: "USA",         score: 80 },
  { name: "Visa Inc.",                   ticker: "V",     sector: "Financial Services",  country: "USA",         score: 79 },
  { name: "UnitedHealth Group",          ticker: "UNH",   sector: "Healthcare",          country: "USA",         score: 66 },
  { name: "Home Depot Inc.",             ticker: "HD",    sector: "Retail",              country: "USA",         score: 68 },
  { name: "Pfizer Inc.",                 ticker: "PFE",   sector: "Pharmaceuticals",     country: "USA",         score: 73 },
  { name: "AbbVie Inc.",                 ticker: "ABBV",  sector: "Pharmaceuticals",     country: "USA",         score: 70 },
  { name: "Bank of America Corp.",       ticker: "BAC",   sector: "Financial Services",  country: "USA",         score: 65 },
  { name: "Netflix Inc.",                ticker: "NFLX",  sector: "Media",               country: "USA",         score: 60 },
  { name: "Salesforce Inc.",             ticker: "CRM",   sector: "Technology",          country: "USA",         score: 83 },
  { name: "Adobe Inc.",                  ticker: "ADBE",  sector: "Technology",          country: "USA",         score: 82 },
  { name: "Intel Corporation",           ticker: "INTC",  sector: "Semiconductors",      country: "USA",         score: 75 },
  { name: "Coca-Cola Company",           ticker: "KO",    sector: "Beverages",           country: "USA",         score: 72 },
  { name: "PepsiCo Inc.",                ticker: "PEP",   sector: "Beverages",           country: "USA",         score: 74 },
  { name: "McDonald's Corporation",      ticker: "MCD",   sector: "Restaurants",         country: "USA",         score: 61 },
  { name: "Boeing Company",              ticker: "BA",    sector: "Aerospace & Defense", country: "USA",         score: 48 },
  { name: "3M Company",                  ticker: "MMM",   sector: "Industrials",         country: "USA",         score: 52 },
  { name: "Goldman Sachs Group",         ticker: "GS",    sector: "Financial Services",  country: "USA",         score: 62 },
  { name: "Shell plc",                   ticker: "SHEL",  sector: "Energy",              country: "UK",          score: 46 },
  { name: "BP plc",                      ticker: "BP",    sector: "Energy",              country: "UK",          score: 49 },
  { name: "HSBC Holdings plc",           ticker: "HSBA",  sector: "Financial Services",  country: "UK",          score: 69 },
  { name: "Unilever plc",                ticker: "ULVR",  sector: "Consumer Staples",    country: "UK",          score: 84 },
  { name: "AstraZeneca plc",             ticker: "AZN",   sector: "Pharmaceuticals",     country: "UK",          score: 77 },
  { name: "LVMH Moët Hennessy",          ticker: "MC",    sector: "Luxury Goods",        country: "France",      score: 71 },
  { name: "TotalEnergies SE",            ticker: "TTE",   sector: "Energy",              country: "France",      score: 50 },
  { name: "Airbus SE",                   ticker: "AIR",   sector: "Aerospace & Defense", country: "France",      score: 65 },
  { name: "BNP Paribas SA",             ticker: "BNP",   sector: "Financial Services",  country: "France",      score: 68 },
  { name: "SAP SE",                      ticker: "SAP",   sector: "Technology",          country: "Germany",     score: 85 },
  { name: "Volkswagen AG",               ticker: "VOW3",  sector: "Automobiles",         country: "Germany",     score: 54 },
  { name: "BMW AG",                      ticker: "BMW",   sector: "Automobiles",         country: "Germany",     score: 67 },
  { name: "Siemens AG",                  ticker: "SIE",   sector: "Industrials",         country: "Germany",     score: 79 },
  { name: "Allianz SE",                  ticker: "ALV",   sector: "Insurance",           country: "Germany",     score: 76 },
  { name: "Nestlé S.A.",                 ticker: "NESN",  sector: "Food & Beverages",    country: "Switzerland", score: 73 },
  { name: "Novartis AG",                 ticker: "NOVN",  sector: "Pharmaceuticals",     country: "Switzerland", score: 80 },
  { name: "Roche Holding AG",            ticker: "ROG",   sector: "Healthcare",          country: "Switzerland", score: 82 },
  { name: "UBS Group AG",                ticker: "UBSG",  sector: "Financial Services",  country: "Switzerland", score: 71 },
  { name: "Toyota Motor Corporation",    ticker: "7203",  sector: "Automobiles",         country: "Japan",       score: 72 },
  { name: "Sony Group Corporation",      ticker: "6758",  sector: "Technology",          country: "Japan",       score: 70 },
  { name: "Samsung Electronics",         ticker: "005930",sector: "Technology",          country: "South Korea", score: 66 },
  { name: "Hyundai Motor Company",       ticker: "005380",sector: "Automobiles",         country: "South Korea", score: 62 },
  { name: "HDFC Bank Ltd.",              ticker: "HDFCBANK", sector: "Financial Services", country: "India",     score: 64 },
  { name: "Infosys Limited",             ticker: "INFY",  sector: "Technology",          country: "India",       score: 78 },
  { name: "Tata Consultancy Services",   ticker: "TCS",   sector: "Technology",          country: "India",       score: 76 },
  { name: "Reliance Industries Ltd.",    ticker: "RELIANCE", sector: "Conglomerate",     country: "India",       score: 55 },
  { name: "Alibaba Group Holding",       ticker: "9988",  sector: "Technology",          country: "China",       score: 43 },
  { name: "Tencent Holdings Ltd.",       ticker: "700",   sector: "Technology",          country: "China",       score: 45 },
  { name: "BYD Company Ltd.",            ticker: "1211",  sector: "Automobiles",         country: "China",       score: 61 },
  { name: "Vale S.A.",                   ticker: "VALE",  sector: "Mining",              country: "Brazil",      score: 38 },
  { name: "Petrobras",                   ticker: "PETR4", sector: "Energy",              country: "Brazil",      score: 40 },
  { name: "Saudi Aramco",                ticker: "2222",  sector: "Energy",              country: "Saudi Arabia",score: 35 },
  { name: "Vestas Wind Systems",         ticker: "VWS",   sector: "Renewable Energy",    country: "Denmark",     score: 91 },
  { name: "Ørsted A/S",                  ticker: "ORSTED",sector: "Renewable Energy",    country: "Denmark",     score: 93 },
  { name: "Schneider Electric SE",       ticker: "SU",    sector: "Industrials",         country: "France",      score: 88 },
  { name: "Iberdrola S.A.",              ticker: "IBE",   sector: "Utilities",           country: "Spain",       score: 87 },
  { name: "Enel SpA",                    ticker: "ENEL",  sector: "Utilities",           country: "Italy",       score: 83 },
  { name: "Rio Tinto Group",             ticker: "RIO",   sector: "Mining",              country: "UK",          score: 47 },
  { name: "BHP Group Limited",           ticker: "BHP",   sector: "Mining",              country: "Australia",   score: 50 },
  { name: "Commonwealth Bank",           ticker: "CBA",   sector: "Financial Services",  country: "Australia",   score: 70 },
];

function scoreColor(score: number) {
  if (score >= 75) return "text-emerald-600 bg-emerald-50";
  if (score >= 55) return "text-amber-600 bg-amber-50";
  return "text-red-600 bg-red-50";
}

function scoreTrend(score: number) {
  if (score >= 75) return <TrendingUp className="h-3 w-3 text-emerald-500" />;
  if (score >= 55) return <Minus className="h-3 w-3 text-amber-500" />;
  return <TrendingDown className="h-3 w-3 text-red-500" />;
}

interface Props {
  onClose: () => void;
}

export function CompanySearchModal({ onClose }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function openCompany(ticker: string) {
    onClose();
    router.push(`/platform/companies?ticker=${ticker}`);
  }

  const filtered = query.trim().length === 0
    ? companies.slice(0, 12)
    : companies.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.ticker.toLowerCase().includes(query.toLowerCase()) ||
        c.sector.toLowerCase().includes(query.toLowerCase()) ||
        c.country.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 12);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 pt-[10vh] backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white shadow-2xl">
        {/* Search bar */}
        <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3">
          <Search className="h-5 w-5 shrink-0 text-slate-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by company name, ticker, or sector…"
            className="flex-1 bg-transparent text-sm text-slate-900 placeholder-slate-400 outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results */}
        <ul className="max-h-[60vh] overflow-y-auto divide-y divide-slate-50 py-1">
          {filtered.length === 0 && (
            <li className="px-5 py-8 text-center text-sm text-slate-400">
              No companies found for &ldquo;{query}&rdquo;
            </li>
          )}
          {filtered.map((company) => (
            <li key={company.ticker}>
              <button
                type="button"
                onClick={() => openCompany(company.ticker)}
                className="group flex w-full items-center gap-4 px-4 py-3 text-left transition hover:bg-slate-50"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary">
                  <Building2 className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-semibold text-slate-900">{company.name}</span>
                    <span className="shrink-0 rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] text-slate-500">{company.ticker}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-slate-300 opacity-0 transition group-hover:opacity-100 group-hover:text-primary" />
                  </div>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-400">
                    <span>{company.sector}</span>
                    <span>·</span>
                    <span className="flex items-center gap-0.5">
                      <MapPin className="h-2.5 w-2.5" />{company.country}
                    </span>
                  </div>
                </div>
                <div className={`flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${scoreColor(company.score)}`}>
                  {scoreTrend(company.score)}
                  {company.score}
                </div>
              </button>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="border-t border-slate-100 px-4 py-2.5 flex items-center justify-between">
          <p className="text-xs text-slate-400">
            {query.trim() ? `${filtered.length} result${filtered.length !== 1 ? "s" : ""}` : "Showing top companies · type to search"}
          </p>
          <span className="rounded border border-slate-200 px-1.5 py-0.5 text-[10px] font-medium text-slate-400">ESC to close</span>
        </div>
      </div>
    </div>
  );
}
