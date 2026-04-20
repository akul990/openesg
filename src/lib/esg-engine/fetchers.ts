import type { NewsInputArticle } from "./types";

/* ─────────────────────────────────────────────────────────────────────
 * NewsAPI — newsapi.org
 * Free tier: 100 requests/day · Developer: $449/month
 * Get key: https://newsapi.org/register
 * ────────────────────────────────────────────────────────────────── */
export async function fetchNewsAPI(
  companyName: string,
  days = 7
): Promise<NewsInputArticle[]> {
  const key = process.env.NEWSAPI_KEY;
  if (!key) return [];

  const from = new Date(Date.now() - days * 86_400_000).toISOString().split("T")[0];
  const q    = encodeURIComponent(`"${companyName}" ESG OR sustainability OR emissions OR climate`);
  const url  = `https://newsapi.org/v2/everything?q=${q}&from=${from}&sortBy=relevancy&pageSize=10&language=en&apiKey=${key}`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json() as { articles?: Array<{ title: string; description: string; publishedAt: string; source: { name: string } }> };
    return (data.articles ?? []).map((a) => ({
      title:   a.title,
      content: a.description ?? "",
      date:    a.publishedAt.split("T")[0],
      source:  a.source.name,
    }));
  } catch {
    return [];
  }
}

/* ─────────────────────────────────────────────────────────────────────
 * Financial Modeling Prep (FMP) — financialmodelingprep.com
 * Free tier: 250 requests/day · Paid: $19/month
 * Get key: https://financialmodelingprep.com/developer/docs
 * ESG endpoint: /api/v4/esg-environmental-social-governance/{ticker}
 * ────────────────────────────────────────────────────────────────── */
export async function fetchFMPEsgScore(
  ticker: string
): Promise<Record<string, unknown> | null> {
  const key = process.env.FMP_API_KEY;
  if (!key) return null;

  const url = `https://financialmodelingprep.com/api/v4/esg-environmental-social-governance/${ticker}?apikey=${key}`;

  try {
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) return null;
    const data = await res.json() as unknown[];
    if (!Array.isArray(data) || data.length === 0) return null;
    return data[0] as Record<string, unknown>;
  } catch {
    return null;
  }
}

/* ─────────────────────────────────────────────────────────────────────
 * Alpha Vantage — alphavantage.co
 * Free tier: 25 requests/day, 5/min · Premium: $50/month
 * Get key: https://www.alphavantage.co/support/#api-key
 * News sentiment endpoint: NEWS_SENTIMENT&tickers={ticker}
 * ────────────────────────────────────────────────────────────────── */
export async function fetchAlphaVantageNews(
  ticker: string
): Promise<NewsInputArticle[]> {
  const key = process.env.ALPHA_VANTAGE_KEY;
  if (!key) return [];

  const url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${ticker}&sort=RELEVANCE&limit=10&apikey=${key}`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json() as {
      feed?: Array<{
        title: string;
        summary: string;
        time_published: string;
        source: string;
        overall_sentiment_label: string;
      }>;
    };
    return (data.feed ?? []).map((a) => ({
      title:   `[${a.overall_sentiment_label ?? "Neutral"}] ${a.title}`,
      content: a.summary ?? "",
      date:    `${a.time_published.slice(0, 4)}-${a.time_published.slice(4, 6)}-${a.time_published.slice(6, 8)}`,
      source:  a.source,
    }));
  } catch {
    return [];
  }
}

/* ─────────────────────────────────────────────────────────────────────
 * Guardian API — open-platform.theguardian.com
 * 100% FREE — no credit card required
 * Get key: https://open-platform.theguardian.com/access/
 * ────────────────────────────────────────────────────────────────── */
export async function fetchGuardianNews(
  companyName: string,
  days = 7
): Promise<NewsInputArticle[]> {
  const key = process.env.GUARDIAN_API_KEY;
  if (!key) return [];

  const from = new Date(Date.now() - days * 86_400_000).toISOString().split("T")[0];
  const q    = encodeURIComponent(`${companyName} AND (ESG OR climate OR sustainability OR emissions)`);
  const url  = `https://content.guardianapis.com/search?q=${q}&from-date=${from}&order-by=relevance&page-size=10&api-key=${key}`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json() as {
      response?: {
        results?: Array<{ webTitle: string; webPublicationDate: string; sectionName: string }>;
      };
    };
    return (data.response?.results ?? []).map((r) => ({
      title:   r.webTitle,
      content: "",
      date:    r.webPublicationDate.split("T")[0],
      source:  `The Guardian / ${r.sectionName}`,
    }));
  } catch {
    return [];
  }
}

/* ─────────────────────────────────────────────────────────────────────
 * Aggregate all available sources for a given company
 * Returns merged news list (deduped by title) + API ESG data
 * ────────────────────────────────────────────────────────────────── */
export async function fetchAllESGSources(
  companyName: string,
  ticker: string
): Promise<{ news: NewsInputArticle[]; apiData: Record<string, unknown> | null }> {
  const [newsApiResults, avNews, guardianNews, fmpData] = await Promise.allSettled([
    fetchNewsAPI(companyName),
    fetchAlphaVantageNews(ticker),
    fetchGuardianNews(companyName),
    fetchFMPEsgScore(ticker),
  ]);

  const allNews: NewsInputArticle[] = [
    ...(newsApiResults.status === "fulfilled" ? newsApiResults.value : []),
    ...(avNews.status === "fulfilled" ? avNews.value : []),
    ...(guardianNews.status === "fulfilled" ? guardianNews.value : []),
  ];

  // Deduplicate by title (case-insensitive first 60 chars)
  const seen = new Set<string>();
  const news = allNews.filter((a) => {
    const key = a.title.slice(0, 60).toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const apiData = fmpData.status === "fulfilled" ? fmpData.value : null;

  return { news, apiData };
}
