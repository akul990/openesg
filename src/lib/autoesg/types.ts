export type NormalizedCategory =
  | "transport"
  | "energy"
  | "food"
  | "services"
  | "other";

export interface RawTransaction {
  date: string;
  description: string;
  amount: string | number;
  category?: string;
}

export interface Transaction {
  id: string;
  date: string;        // ISO yyyy-mm-dd
  description: string;
  amount: number;      // EUR
  category_raw: string;
  category: NormalizedCategory;
}

export interface EmissionRecord {
  transaction_id: string;
  co2: number;         // kg CO₂e
  category: NormalizedCategory;
  date: string;
}

export interface CategorySummary {
  category: NormalizedCategory;
  co2: number;
  amount: number;
  count: number;
  pct: number;
}

export interface MonthlyTrend {
  month: string;       // "YYYY-MM"
  label: string;       // "Jan '25"
  co2: number;
  amount: number;
}

export interface Insight {
  type: "warning" | "positive" | "info";
  text: string;
}

export interface ESGSummary {
  totalCO2: number;
  totalAmount: number;
  transactionCount: number;
  byCategory: CategorySummary[];
  monthly: MonthlyTrend[];
  insights: Insight[];
  generatedAt: string;
}

export interface AutoESGStore {
  companyName: string;
  transactions: Transaction[];
  emissions: EmissionRecord[];
  uploadedAt: string;
}
