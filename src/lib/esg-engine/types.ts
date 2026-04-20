export interface ESGEngineInput {
  company_name: string;
  company_website?: string | null;
  ticker: string;
  existing_data?: Record<string, unknown> | null;
  news_articles?: NewsInputArticle[] | null;
  api_data?: Record<string, unknown> | null;
}

export interface NewsInputArticle {
  title: string;
  content?: string;
  date: string;
  source: string;
}

export type ESGPillar = "E" | "S" | "G";
export type Severity = "Low" | "Medium" | "High";
export type DataQuality = "verified" | "disclosed" | "estimated" | "unavailable";

export interface NewsEvent {
  title: string;
  category: ESGPillar;
  severity: Severity;
  impact_score: number | null;
  date: string | null;
  source: string | null;
}

export interface ChangeDetected {
  field: string;
  old_value: string | number | null;
  new_value: string | number | null;
  change_type: "increase" | "decrease" | "new" | "removed";
}

export interface GreenwashingFlag {
  issue: string;
  reason: string;
  confidence: "Low" | "Medium" | "High";
}

export interface ESGEngineOutput {
  company: {
    name: string;
    ticker: string;
    sector: string | null;
    country: string | null;
    website: string | null;
  };
  environmental: {
    total_emissions: string | null;
    emissions_trend: string | null;
    renewable_energy_pct: number | null;
    net_zero_target: string | null;
    key_initiatives: string[];
    data_quality: DataQuality;
  };
  social: {
    employees: string | null;
    diversity_initiatives: string[];
    labor_controversies: string[];
    community_impact: string | null;
    data_quality: DataQuality;
  };
  governance: {
    board_independence: string | null;
    audit_quality: string | null;
    transparency_score: number | null;
    controversies: string[];
    data_quality: DataQuality;
  };
  esg_scores: {
    environmental_score: number;
    social_score: number;
    governance_score: number;
    overall_score: number;
    score_rationale: string;
    last_updated: string;
  };
  news_events: NewsEvent[];
  changes_detected: ChangeDetected[];
  greenwashing_flags: GreenwashingFlag[];
  confidence_score: number;
  metadata: {
    sources: string[];
    last_updated: string;
    processing_notes: string[];
  };
}
