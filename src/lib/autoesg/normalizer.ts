import type { NormalizedCategory } from "./types";

// Keyword → category mapping (lowercase match)
const RULES: Array<{ keywords: string[]; category: NormalizedCategory }> = [
  {
    category: "transport",
    keywords: [
      "fuel", "petrol", "diesel", "gasoline", "uber", "taxi", "cab", "lyft",
      "flight", "airline", "rail", "train", "bus", "car hire", "car rental",
      "parking", "toll", "ferry", "van", "truck", "freight", "shipping",
      "courier", "delivery", "dhl", "fedex", "ups", "hertz", "avis",
    ],
  },
  {
    category: "energy",
    keywords: [
      "electricity", "electric", "gas", "utility", "utilities", "power",
      "energy", "water", "sewage", "heating", "cooling", "edf", "e.on",
      "vattenfall", "engie", "npower", "british gas", "octopus",
    ],
  },
  {
    category: "food",
    keywords: [
      "restaurant", "cafe", "coffee", "food", "meal", "lunch", "dinner",
      "breakfast", "catering", "canteen", "supermarket", "grocery",
      "tesco", "lidl", "aldi", "waitrose", "carrefour", "rewe", "edeka",
      "mcdonald", "starbucks", "costa", "subway", "pizza",
    ],
  },
  {
    category: "services",
    keywords: [
      "software", "saas", "subscription", "consulting", "professional",
      "legal", "accounting", "audit", "advisory", "agency", "marketing",
      "aws", "azure", "google cloud", "microsoft", "salesforce", "slack",
      "zoom", "stripe", "hubspot", "notion", "figma", "adobe", "jira",
      "insurance", "bank", "finance", "interest", "fee",
    ],
  },
];

export function normalizeCategory(raw: string): NormalizedCategory {
  const lower = raw.toLowerCase().trim();

  for (const rule of RULES) {
    for (const kw of rule.keywords) {
      if (lower.includes(kw)) return rule.category;
    }
  }

  // Fallback — could be replaced with AI classification
  return "other";
}
