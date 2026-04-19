import Papa from "papaparse";
import type { RawTransaction, Transaction } from "./types";
import { normalizeCategory } from "./normalizer";

let idCounter = 0;
function nextId(): string {
  return `tx_${Date.now()}_${++idCounter}`;
}

function cleanAmount(v: string | number): number {
  if (typeof v === "number") return v;
  return parseFloat(String(v).replace(/[^0-9.-]/g, "")) || 0;
}

function cleanDate(v: string): string {
  // Accept dd/mm/yyyy, mm/dd/yyyy, yyyy-mm-dd, ISO strings
  const s = v.trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(s)) {
    const [d, m, y] = s.split("/");
    return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
  }
  if (/^\d{2}-\d{2}-\d{4}$/.test(s)) {
    const [d, m, y] = s.split("-");
    return `${y}-${m}-${d}`;
  }
  const parsed = new Date(s);
  return isNaN(parsed.getTime()) ? new Date().toISOString().slice(0, 10) : parsed.toISOString().slice(0, 10);
}

export function parseCSV(csvText: string): Transaction[] {
  const { data, errors } = Papa.parse<Record<string, string>>(csvText.trim(), {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.toLowerCase().trim(),
  });

  if (errors.length > 0) {
    console.warn("CSV parse warnings:", errors.slice(0, 3));
  }

  const transactions: Transaction[] = [];

  for (const row of data) {
    const raw = row as Record<string, string>;
    const amount = cleanAmount(raw["amount"] ?? raw["Amount"] ?? "0");
    if (!amount || amount <= 0) continue; // skip zero/negative rows

    const description = String(raw["description"] ?? raw["Description"] ?? raw["name"] ?? "").trim();
    const dateRaw = String(raw["date"] ?? raw["Date"] ?? raw["DATE"] ?? "");
    const categoryRaw = String(raw["category"] ?? raw["Category"] ?? description);

    transactions.push({
      id: nextId(),
      date: cleanDate(dateRaw),
      description,
      amount,
      category_raw: categoryRaw,
      category: normalizeCategory(categoryRaw || description),
    });
  }

  return transactions;
}
