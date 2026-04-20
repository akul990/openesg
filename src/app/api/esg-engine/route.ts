import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { buildPrompt } from "@/src/lib/esg-engine/prompt";
import { fetchAllESGSources } from "@/src/lib/esg-engine/fetchers";
import type { ESGEngineInput } from "@/src/lib/esg-engine/types";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY is not configured. Add it to .env.local." },
      { status: 503 }
    );
  }

  let body: ESGEngineInput;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.company_name || !body.ticker) {
    return NextResponse.json(
      { error: "company_name and ticker are required" },
      { status: 400 }
    );
  }

  try {
    // ── Step 1: Fetch real-time data from external APIs ───────────────
    const { news, apiData } = await fetchAllESGSources(body.company_name, body.ticker);

    // Merge fetched data with anything passed directly in the request body
    const enrichedInput: ESGEngineInput = {
      ...body,
      news_articles: body.news_articles?.length ? body.news_articles : (news.length ? news : null),
      api_data:      body.api_data ?? (apiData ?? null),
    };

    // ── Step 2: Build the prompt and call Claude ──────────────────────
    const prompt = buildPrompt(enrichedInput);

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      system:
        "You are an ESG intelligence engine. Respond ONLY with valid JSON matching the specified output structure. Do not include markdown code fences, explanations, or any text outside the JSON object.",
      messages: [{ role: "user", content: prompt }],
    });

    const block = message.content[0];
    if (block.type !== "text") {
      throw new Error("Unexpected content type in Claude response");
    }

    let raw = block.text.trim();
    if (raw.startsWith("```")) {
      raw = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
    }

    const result = JSON.parse(raw);

    // ── Step 3: Annotate which external data sources were live ────────
    const liveSources: string[] = [];
    if (news.length && process.env.NEWSAPI_KEY)      liveSources.push("NewsAPI");
    if (news.length && process.env.ALPHA_VANTAGE_KEY) liveSources.push("Alpha Vantage");
    if (news.length && process.env.GUARDIAN_API_KEY)  liveSources.push("The Guardian");
    if (apiData      && process.env.FMP_API_KEY)      liveSources.push("FMP ESG Scores");

    if (liveSources.length && Array.isArray(result?.metadata?.sources)) {
      result.metadata.sources = [...new Set([...liveSources, ...result.metadata.sources])];
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error("[esg-engine]", err);
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
