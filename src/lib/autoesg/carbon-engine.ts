import type { NormalizedCategory, Transaction, EmissionRecord } from "./types";

// Spend-based emission factors (kg CO₂e per EUR spent)
// Source: DEFRA 2024 / EXIOBASE spend-based approximations
export const EMISSION_FACTORS: Record<NormalizedCategory, number> = {
  transport: 0.21,   // fuel, flights, taxis
  energy:    0.35,   // electricity, gas, utilities
  food:      0.15,   // restaurants, catering, groceries
  services:  0.05,   // software, consulting, professional services
  other:     0.08,   // catch-all
};

export const FACTOR_LABELS: Record<NormalizedCategory, string> = {
  transport: "0.21 kg CO₂e / €",
  energy:    "0.35 kg CO₂e / €",
  food:      "0.15 kg CO₂e / €",
  services:  "0.05 kg CO₂e / €",
  other:     "0.08 kg CO₂e / €",
};

export function calculateEmissions(tx: Transaction): EmissionRecord {
  const factor = EMISSION_FACTORS[tx.category] ?? EMISSION_FACTORS.other;
  const co2 = parseFloat((Math.abs(tx.amount) * factor).toFixed(3));
  return {
    transaction_id: tx.id,
    co2,
    category: tx.category,
    date: tx.date,
  };
}

export function calculateBatch(transactions: Transaction[]): EmissionRecord[] {
  return transactions.map(calculateEmissions);
}
