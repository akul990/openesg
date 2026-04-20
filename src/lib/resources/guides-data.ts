export type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; variant: "info" | "warning" | "tip" | "key"; title: string; text: string }
  | { type: "checklist"; title: string; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "code"; lang: string; code: string }
  | { type: "divider" };

export interface Guide {
  slug: string;
  tag: string;
  tagColor: string;
  title: string;
  description: string;
  readTime: string;
  lastUpdated: string;
  author: string;
  authorRole: string;
  blocks: Block[];
  relatedSlugs: string[];
}

export const guides: Guide[] = [
  {
    slug: "getting-started-esg-investing",
    tag: "Beginner Guide",
    tagColor: "bg-emerald-100 text-emerald-700",
    title: "Getting Started with ESG Investing",
    description: "A primer on what ESG scores measure, why they differ across providers, and how institutional investors integrate them into allocation decisions.",
    readTime: "12 min read",
    lastUpdated: "March 2026",
    author: "OpenESG Research Team",
    authorRole: "ESG Analysis",
    blocks: [
      { type: "h2", text: "What ESG actually measures" },
      { type: "p", text: "Environmental, Social, and Governance (ESG) is a framework for evaluating corporate behaviour across three non-financial dimensions. It is not a single number — it is a structured lens for analysing risks and opportunities that traditional financial analysis does not capture well." },
      { type: "p", text: "When an analyst says a company has a 'high ESG score,' they typically mean the company scores well on a composite index assembled from dozens of underlying metrics. The challenge — and the source of much confusion — is that every major rating provider assembles those metrics differently." },
      { type: "callout", variant: "key", title: "The most important thing to understand", text: "ESG scores are opinions, not facts. Two equally rigorous analysts looking at the same company can produce scores that diverge by 40 points. Knowing why this happens is the first skill an ESG investor needs." },
      { type: "h2", text: "The three pillars explained" },
      { type: "h3", text: "Environmental (E)" },
      { type: "p", text: "The E pillar covers a company's relationship with the natural world. This includes greenhouse gas emissions (Scopes 1, 2, and 3), energy consumption and mix, water withdrawal and efficiency, biodiversity impact, waste generation, and climate transition risk. For heavy industry, energy, and materials companies, the E score is typically the most material pillar." },
      { type: "ul", items: [
        "Scope 1: Direct emissions from owned or controlled sources (e.g., company vehicles, on-site boilers)",
        "Scope 2: Indirect emissions from purchased electricity and heat",
        "Scope 3: All other indirect emissions across the value chain — typically 70–90% of total footprint",
        "Physical risk: Exposure to floods, heat stress, drought, sea-level rise",
        "Transition risk: Stranded assets, carbon pricing, regulatory compliance cost",
      ]},
      { type: "h3", text: "Social (S)" },
      { type: "p", text: "The S pillar covers a company's relationship with people — employees, suppliers, customers, and communities. Metrics include workforce diversity and inclusion, health and safety, labour practices, supply chain human rights, data privacy, and community impact. The S pillar has historically been the hardest to measure because much of the relevant data is qualitative, jurisdiction-specific, and self-reported." },
      { type: "h3", text: "Governance (G)" },
      { type: "p", text: "The G pillar covers how a company is run. Board independence, executive compensation structure, audit quality, anti-corruption controls, shareholder rights, and transparency of disclosure are all governance factors. Strong governance is often the precondition for meaningful E and S performance — companies with poor oversight rarely sustain environmental or social commitments over time." },
      { type: "h2", text: "Why ratings diverge across providers" },
      { type: "p", text: "A 2019 study by Florian Berg, Julian Kölbel, and Roberto Rigobon found the correlation between major ESG raters is approximately 0.54 — far lower than the 0.99 correlation between credit rating agencies. This divergence has three causes." },
      { type: "table", headers: ["Source of Divergence", "What it means", "Example"], rows: [
        ["Scope", "Different providers measure different attributes", "One rater includes political lobbying, another does not"],
        ["Measurement", "Different metrics for the same attribute", "Carbon intensity per revenue vs. per employee vs. absolute"],
        ["Weights", "Different importance assigned to each factor", "One rater weights G at 40%; another weights it at 15%"],
      ]},
      { type: "p", text: "A fourth cause — which is often overlooked — is data sourcing. Some raters rely entirely on company self-disclosure. Others use satellite imagery, news monitoring, regulatory filings, and NGO reports to supplement or challenge self-reported data. The raters who challenge self-disclosure produce more meaningful but also more variable scores." },
      { type: "callout", variant: "warning", title: "The gaming problem", text: "Companies have learned which metrics move ratings. If a provider heavily weights carbon disclosure completeness (rather than actual carbon performance), a company can improve its score simply by publishing more data — without reducing a single tonne of emissions. Good ESG analysis distinguishes between disclosure quality and performance quality." },
      { type: "h2", text: "How institutional investors use ESG" },
      { type: "p", text: "There is no single way institutions use ESG data. The approach depends heavily on mandate, regulatory obligation, and investment philosophy. The main strategies are:" },
      { type: "ol", items: [
        "Negative screening: Excluding sectors (weapons, tobacco, coal) or companies below a score threshold",
        "Positive screening / Best-in-class: Overweighting top ESG performers within each sector",
        "ESG integration: Explicitly adjusting financial models based on ESG risk factors",
        "Thematic investing: Targeting companies in specific sustainability themes (clean energy, sustainable agriculture)",
        "Impact investing: Requiring measurable, additional real-world outcomes as an investment condition",
        "Stewardship: Using shareholder rights to push for ESG improvements via voting and engagement",
      ]},
      { type: "h2", text: "The data challenge" },
      { type: "p", text: "The majority of ESG data is still self-reported by companies. Until CSRD (EU) and ISSB (global) create universal mandatory frameworks, data coverage, comparability, and reliability will remain uneven. As an ESG analyst, you must understand the data quality of the source you are using." },
      { type: "checklist", title: "Before trusting an ESG score, ask:", items: [
        "Is this based on company self-disclosure, third-party data, or both?",
        "What year is the data? ESG reports often lag 12–18 months.",
        "Are the Scope 3 emissions included, or just Scopes 1 and 2?",
        "Has any of the data been externally assured by an auditor?",
        "How does this score change if I use a different provider?",
        "Does the score reflect the company's direction of travel or a point in time?",
      ]},
      { type: "h2", text: "Common beginner mistakes" },
      { type: "ul", items: [
        "Treating a high ESG score as a guarantee of ethical behaviour — it is a risk signal, not a moral certificate",
        "Conflating ESG with impact investing — most ESG integration does not require real-world outcomes",
        "Using ESG scores without understanding the methodology behind them",
        "Comparing scores across providers as if they are measuring the same thing",
        "Ignoring the controversy record — a company can score 80/100 with unresolved controversies if the score model is disclosure-heavy",
        "Applying the same weights to every sector — governance matters more for financials; environmental matters more for energy",
      ]},
      { type: "h2", text: "How to get started with OpenESG" },
      { type: "p", text: "OpenESG provides composite ESG scores across 15 major companies with full breakdown by Environmental, Social, and Governance pillar. Each company profile includes a greenwashing risk meter, weekly ESG watch with verdict classifications, and framework alignment across GRI, TCFD, CSRD, ISSB, SASB, and more." },
      { type: "callout", variant: "tip", title: "Start here", text: "Go to Platform → Company Ratings and select any company. Click on a framework tab to see what data is disclosed, partial, or missing. Use the AI Intelligence Refresh to get a real-time analysis and news-based update to the score." },
    ],
    relatedSlugs: ["identifying-greenwashing", "gri-vs-sasb-vs-issb"],
  },

  {
    slug: "navigating-csrd",
    tag: "Regulatory",
    tagColor: "bg-sky-100 text-sky-700",
    title: "Navigating CSRD: A Practical Handbook",
    description: "Step-by-step guidance on the Corporate Sustainability Reporting Directive — who is in scope, what ESRS topics must be covered, and how to prepare.",
    readTime: "18 min read",
    lastUpdated: "April 2026",
    author: "OpenESG Research Team",
    authorRole: "Regulatory Analysis",
    blocks: [
      { type: "h2", text: "What is CSRD and why does it matter?" },
      { type: "p", text: "The Corporate Sustainability Reporting Directive (CSRD) is an EU regulation that replaced the Non-Financial Reporting Directive (NFRD) from 2024 onwards. It is the most significant expansion of corporate sustainability disclosure requirements in history — moving from a roughly 400-word narrative in an annual report to a structured, digitally tagged, auditable sustainability statement of potentially hundreds of pages." },
      { type: "callout", variant: "key", title: "The scale shift", text: "NFRD applied to approximately 11,000 large EU companies. CSRD expands this to approximately 50,000 companies — including all large EU companies, listed SMEs, and certain non-EU companies with significant EU operations." },
      { type: "h2", text: "Who is in scope — and when?" },
      { type: "table", headers: ["Company Type", "First Reporting Year", "First Publication"], rows: [
        ["Large listed EU companies already under NFRD", "FY 2024", "2025"],
        ["Other large EU companies (250+ employees OR €40M+ revenue OR €20M+ assets)", "FY 2025", "2026"],
        ["Listed EU SMEs and small non-complex institutions", "FY 2026 (opt-out until 2028)", "2027"],
        ["Non-EU companies with €150M+ EU revenue + EU subsidiary or branch", "FY 2028", "2029"],
      ]},
      { type: "callout", variant: "warning", title: "SME opt-out", text: "Listed SMEs may voluntarily opt out until FY 2028, but they will increasingly face pressure from large companies in their supply chains who need supplier ESG data to comply with their own CSRD obligations. The opt-out does not insulate SMEs from the data requests." },
      { type: "h2", text: "The European Sustainability Reporting Standards (ESRS)" },
      { type: "p", text: "CSRD requires reporting against the European Sustainability Reporting Standards (ESRS), developed by EFRAG. There are two cross-cutting standards and ten topical standards across environment, social, and governance." },
      { type: "h3", text: "Cross-cutting standards" },
      { type: "ul", items: [
        "ESRS 1 — General Requirements: The overarching principles, reporting boundary, value chain coverage, and data quality requirements",
        "ESRS 2 — General Disclosures: Governance, strategy, business model, double materiality process, stakeholder engagement",
      ]},
      { type: "h3", text: "Environmental standards (ESRS E1–E5)" },
      { type: "ul", items: [
        "ESRS E1 — Climate Change: GHG emissions (Scopes 1, 2, 3), transition plans, physical and transition risk exposure",
        "ESRS E2 — Pollution: Air, water, soil pollution, substances of concern, microplastics",
        "ESRS E3 — Water and Marine Resources: Water consumption, water intensity, impact on marine ecosystems",
        "ESRS E4 — Biodiversity and Ecosystems: Impact on species, habitats, land use, ecosystem services",
        "ESRS E5 — Resource Use and Circular Economy: Material inputs, waste, product end-of-life, circular design",
      ]},
      { type: "h3", text: "Social standards (ESRS S1–S4)" },
      { type: "ul", items: [
        "ESRS S1 — Own Workforce: Working conditions, living wages, health & safety, diversity, non-discrimination",
        "ESRS S2 — Workers in the Value Chain: Supplier labour standards, human rights due diligence, ILO conventions",
        "ESRS S3 — Affected Communities: Community engagement, indigenous peoples' rights, access to resources",
        "ESRS S4 — Consumers and End-Users: Data privacy, product safety, responsible marketing, consumer access",
      ]},
      { type: "h3", text: "Governance standard (ESRS G1)" },
      { type: "ul", items: [
        "ESRS G1 — Business Conduct: Anti-corruption and anti-bribery, lobbying, whistleblower protection, supplier payment practices",
      ]},
      { type: "h2", text: "Double materiality — the defining concept" },
      { type: "p", text: "The most important conceptual shift in CSRD is the requirement for double materiality assessment. Unlike traditional financial materiality (which asks: 'does this affect the company's finances?'), double materiality has two lenses:" },
      { type: "ul", items: [
        "Financial materiality (Outside-In): How do sustainability issues affect the company's financial performance, position, and cash flows?",
        "Impact materiality (Inside-Out): How does the company's operations and value chain affect people and the environment?",
      ]},
      { type: "p", text: "A topic is material under CSRD if it is material from EITHER perspective. This means companies may need to disclose significant impacts they are causing even if those impacts do not affect their own financial results — a fundamental departure from traditional investor-centric disclosure philosophy." },
      { type: "callout", variant: "info", title: "Practical implication", text: "A food company may have an immaterial financial exposure to water stress — but a very material impact on local watershed ecosystems. Under CSRD, they must disclose the water impact even if it does not affect their balance sheet. This is the double materiality test in action." },
      { type: "h2", text: "What is new compared to NFRD?" },
      { type: "table", headers: ["Dimension", "NFRD (old)", "CSRD (new)"], rows: [
        ["Format", "Narrative, unstructured", "Machine-readable, XBRL-tagged"],
        ["Assurance", "Not required", "Limited assurance initially; reasonable assurance later"],
        ["Scope coverage", "Own operations mainly", "Full value chain (upstream + downstream)"],
        ["Materiality", "Financial only", "Double materiality (financial + impact)"],
        ["Standards", "No mandated standard", "Mandatory ESRS compliance"],
        ["Data points", "~40 optional indicators", "1,000+ structured data points"],
        ["Integration", "Separate non-financial report", "Embedded in management report"],
      ]},
      { type: "h2", text: "Practical steps to prepare" },
      { type: "ol", items: [
        "Conduct a double materiality assessment: Identify all potentially material ESG topics using stakeholder engagement, peer analysis, and value chain mapping. This is the foundation — every disclosure decision flows from it.",
        "Map your current data architecture: Inventory what ESG data you already collect, in what systems, with what quality. Most companies have significant data in HR, procurement, facilities, and EHS systems that needs to be unlocked.",
        "Identify data gaps: Compare your current data against the ESRS disclosure requirements for your material topics. Prioritise Scope 3 emissions, social supply chain, and biodiversity — these are typically the largest gaps.",
        "Assess your assurance readiness: Choose a third-party assurance provider early. Limited assurance requires the same documentation discipline as financial audit. Starting this conversation 18 months before your first report date is not too early.",
        "Build governance structures: ESRS G1 and ESRS 2 require demonstrating board-level oversight of sustainability. Sustainability committees, board training, and executive ESG accountability frameworks need to be in place — not just documented.",
        "Draft your first materiality statement: Publish a condensed version of your materiality assessment even before your first full CSRD report. This signals readiness to investors and the supply chain.",
      ]},
      { type: "checklist", title: "CSRD readiness checklist for first-time reporters", items: [
        "Double materiality assessment completed with documented stakeholder inputs",
        "All ESRS E1 data points mapped — especially Scope 3 categories",
        "ESRS S1 workforce data (diversity, pay equity, safety) centralised in HR systems",
        "ESRS G1 anti-corruption training completion rates tracked by entity",
        "Board ESG oversight structure formally documented",
        "Third-party assurance provider selected and engaged",
        "Sustainability reporting software or XBRL tagging process identified",
        "Value chain mapping completed (at minimum, Tier 1 suppliers)",
        "Internal audit process for sustainability data established",
        "Legal entity scoping finalised with finance and legal teams",
      ]},
    ],
    relatedSlugs: ["gri-vs-sasb-vs-issb", "sfdr-pai-reporting"],
  },

  {
    slug: "gri-vs-sasb-vs-issb",
    tag: "Framework Comparison",
    tagColor: "bg-violet-100 text-violet-700",
    title: "GRI vs SASB vs ISSB: Choosing the Right Standard",
    description: "A decision framework that helps teams select, combine, or reconcile the three most widely used ESG reporting standards — with a sector-by-sector matrix.",
    readTime: "15 min read",
    lastUpdated: "February 2026",
    author: "OpenESG Research Team",
    authorRole: "Framework Analysis",
    blocks: [
      { type: "h2", text: "Why three standards?" },
      { type: "p", text: "GRI, SASB, and ISSB were not designed to compete — they were designed for different audiences with different needs. GRI was built for accountability to society. SASB was built for financial investors who needed comparable, industry-specific data. ISSB was built as a global investor-focused baseline that could become the foundation for mandatory disclosure regimes worldwide. Understanding the audience of each standard is the key to using them correctly." },
      { type: "h2", text: "GRI: The comprehensive impact reporter" },
      { type: "p", text: "The Global Reporting Initiative (GRI) Standards are the world's most widely used sustainability reporting framework. First published in 1997, GRI is built on a stakeholder-centric model: the primary audience is the full range of stakeholders — investors, employees, communities, NGOs, regulators, and the public." },
      { type: "callout", variant: "info", title: "GRI's core philosophy", text: "A company using GRI should report on all material impacts, regardless of whether those impacts affect the company financially. GRI measures what the company does to the world — not just what the world does to the company's balance sheet." },
      { type: "ul", items: [
        "Framework: Universal Standards + Sector Standards + Topic Standards",
        "Coverage: Economy, environment, human rights, labour, anti-corruption, social",
        "Audience: Multi-stakeholder (investors, NGOs, communities, regulators, public)",
        "Materiality: Impact materiality — what matters to affected stakeholders",
        "Comparable: Moderate — sector standards improve comparability but many topics allow flexible metrics",
        "Mandatory: Not legally required in most jurisdictions, but ESRS (CSRD) is interoperable with GRI",
      ]},
      { type: "h2", text: "SASB: The financially material, industry-specific standard" },
      { type: "p", text: "The Sustainability Accounting Standards Board (SASB) Standards — now integrated under the IFRS Foundation — cover 77 industries across 11 sectors. SASB's approach is explicit: only disclose ESG information that is reasonably likely to constitute material information for investors. This financial materiality lens makes SASB the most comparable and analyst-friendly of the three." },
      { type: "callout", variant: "key", title: "SASB's unique value", text: "Because SASB metrics are industry-specific, they are actually comparable across companies in the same industry. A software company's material SASB topics (data privacy, employee diversity) are completely different from an oil company's (GHG emissions, water management, spill prevention). This makes SASB the most useful tool for sector-level ESG peer analysis." },
      { type: "ul", items: [
        "Framework: 77 industry-specific standards organised by 11 sectors",
        "Coverage: Only financially material ESG topics per industry",
        "Audience: Financial investors seeking comparable, decision-useful data",
        "Materiality: Financial materiality — what affects enterprise value",
        "Comparable: High — metrics are standardised within each industry",
        "Mandatory: Not legally required; increasingly referenced in SEC disclosure guidance",
      ]},
      { type: "h2", text: "ISSB: The global investor-focused baseline" },
      { type: "p", text: "The International Sustainability Standards Board (ISSB), established under the IFRS Foundation in 2021, published IFRS S1 (General Requirements) and IFRS S2 (Climate-related Disclosures) in June 2023. ISSB represents the most significant attempt to create a globally consistent, investor-grade sustainability reporting baseline that can be adopted or referenced by national regulators worldwide." },
      { type: "ul", items: [
        "IFRS S1: General sustainability-related financial disclosures (modelled on TCFD)",
        "IFRS S2: Climate-related disclosures (aligned with and superseding TCFD)",
        "Audience: Capital markets investors and regulators",
        "Materiality: Financial materiality — information useful to investors",
        "Comparable: High by design — cross-jurisdictional comparability is the core goal",
        "Mandatory: Adopted or referenced in UK, Australia, Japan, Singapore, Canada; under consideration in EU as CSRD building block",
      ]},
      { type: "callout", variant: "info", title: "ISSB and TCFD", text: "ISSB effectively absorbed and superseded the TCFD framework. TCFD was disbanded in 2023 after confirming that ISSB's IFRS S2 fully incorporated its recommendations. Companies reporting under IFRS S2 satisfy TCFD requirements." },
      { type: "h2", text: "Side-by-side comparison" },
      { type: "table", headers: ["Dimension", "GRI", "SASB", "ISSB"], rows: [
        ["Primary audience", "All stakeholders", "Financial investors", "Capital markets / regulators"],
        ["Materiality concept", "Impact materiality", "Financial materiality", "Financial materiality"],
        ["Industry-specific?", "Yes (Sector Standards)", "Yes (core design)", "No (principles-based)"],
        ["Comparable metrics?", "Moderate", "High", "High"],
        ["Narrative + data?", "Both", "Mostly data", "Both"],
        ["Climate focus", "One topic among many", "Per-industry climate topics", "Dedicated S2 standard"],
        ["Adoption scale", "~14,000 reporters", "~7,000 reporters", "Growing rapidly post-2023"],
        ["CSRD compatible?", "Highly (ESRS based on GRI)", "Referenced in ESRS", "Building block for ESRS"],
      ]},
      { type: "h2", text: "Choosing the right combination" },
      { type: "p", text: "Most large companies use more than one standard. The practical question is which to prioritise and how to reconcile overlapping requirements." },
      { type: "h3", text: "Decision framework by use case" },
      { type: "table", headers: ["Use case", "Recommended approach"], rows: [
        ["EU large company, CSRD-mandated", "Lead with ESRS — use GRI interoperability table to satisfy GRI users simultaneously. Add SASB for investor-specific comparability."],
        ["US public company, SEC climate rule", "Lead with IFRS S2 / ISSB — satisfies SEC climate disclosure and TCFD simultaneously. Add SASB for your sector metrics."],
        ["Global listed company, multiple regulators", "Use ISSB as baseline + SASB for sector metrics + GRI Topic Standards for specific stakeholder audiences. Map all three in an index."],
        ["SME not yet mandated", "Start with GRI Essentials level + relevant SASB industry standard. Focus on 10–15 most material metrics rather than comprehensive coverage."],
        ["Impact investor / ESG fund", "Require SASB for comparability + GRI for supply chain and social impact + SFDR PAI indicators for ESRS S1/S2 coverage."],
        ["Startup / B Corp aspirant", "GRI Essentials provides a credible starting point. Add SASB industry standard for investor readiness."],
      ]},
      { type: "h2", text: "How they interact with each other" },
      { type: "p", text: "GRI and ISSB both incorporate financial materiality concepts but weigh them differently. EFRAG has published a detailed interoperability mapping between ESRS (CSRD) and GRI Standards, confirming that companies can use a single report to satisfy both. SASB has been integrated under IFRS Foundation, and ISSB has confirmed it will consider incorporating sector-specific metrics from SASB into future versions of IFRS S1/S2." },
      { type: "callout", variant: "tip", title: "The practical approach", text: "For most companies, the pragmatic path is: (1) Do your double materiality assessment first — this identifies which topics are material under any framework. (2) Use GRI topic standards for comprehensive impact coverage. (3) Use SASB to identify the specific metrics your investors care about. (4) Use ISSB/IFRS S2 to ensure your climate disclosures are investor-grade. Report once, map to all three in an index table." },
    ],
    relatedSlugs: ["navigating-csrd", "getting-started-esg-investing"],
  },

  {
    slug: "identifying-greenwashing",
    tag: "Due Diligence",
    tagColor: "bg-amber-100 text-amber-700",
    title: "Identifying Greenwashing: A Due Diligence Checklist",
    description: "Twenty questions analysts should ask before accepting an ESG self-disclosure at face value — with real-world examples and red-flag patterns.",
    readTime: "10 min read",
    lastUpdated: "April 2026",
    author: "OpenESG Research Team",
    authorRole: "Risk Analysis",
    blocks: [
      { type: "h2", text: "Why greenwashing is endemic" },
      { type: "p", text: "Greenwashing is not always deliberate. It exists on a spectrum from honest overstatement (using imprecise language) to strategic deception (publishing misleading claims backed by cherry-picked data). The structural incentives are powerful: ESG-positive framing attracts capital, reduces regulatory scrutiny, and builds brand value — all with limited verification cost." },
      { type: "p", text: "The verification gap is the root cause. Until mandatory, standardised, audited sustainability reporting is universal, companies can self-describe their environmental and social performance with minimal accountability. Even where frameworks like CSRD or ISSB create mandatory disclosure, the underlying data quality and assurance standards continue to evolve." },
      { type: "callout", variant: "key", title: "The OpenESG classification system", text: "We classify every news item and disclosure against three verdicts: Genuine (independently verified, material, credible), Questionable (plausible but unverified or selective), and Greenwashing (contradicted by evidence, misleading, or backed by offset accounting that masks real emissions). A company can have a high ESG score alongside greenwashing flags if the score model is disclosure-heavy." },
      { type: "h2", text: "The 20 due diligence questions" },
      { type: "h3", text: "Group 1: Data quality and verification" },
      { type: "checklist", title: "Questions 1–5", items: [
        "Is the environmental data externally assured by a credible third party (e.g., Deloitte, PwC, Bureau Veritas, DNV)?",
        "Does the assurance cover Scope 3 emissions, or only Scopes 1 and 2?",
        "Is the data from the same year as the report, or is it 12–18 months old?",
        "Are the measurement methodologies (e.g., GHG Protocol) clearly cited and consistently applied year-over-year?",
        "Does the company use a consistent baseline year, or has it been reset to make progress look better?",
      ]},
      { type: "h3", text: "Group 2: Claims vs. performance" },
      { type: "checklist", title: "Questions 6–10", items: [
        "Does the company's climate marketing claim match its actual absolute emissions trend (i.e., are emissions going down, not just intensity)?",
        "When the company claims '100% renewable energy,' does this apply to all operations globally, or just selected sites?",
        "Are carbon offset claims based on high-quality, independently verified offsets (e.g., Gold Standard, Verra VCS) — or are they cheap, low-integrity credits?",
        "Does the company claim a net-zero target but lack a credible interim pathway (e.g., SBTi validation) to get there?",
        "Are the highlighted achievements (e.g., 'reduced emissions by 30%') based on absolute reductions, or relative intensity reductions while the business grows?",
      ]},
      { type: "h3", text: "Group 3: Consistency and contradictions" },
      { type: "checklist", title: "Questions 11–15", items: [
        "Does the company's sustainability marketing contradict its lobbying positions (e.g., claiming climate leadership while lobbying against carbon pricing legislation)?",
        "Does the company's ESG report cherry-pick good years or geographies while omitting underperforming regions?",
        "Is there a significant controversy in the news (labour violations, environmental spills, regulatory fines) that is absent from the ESG report?",
        "Does the company report 'record investment in sustainability' while absolute environmental performance stagnates or worsens?",
        "Are the company's sustainability goals binding and tied to executive compensation — or merely aspirational?",
      ]},
      { type: "h3", text: "Group 4: Supply chain and Scope 3" },
      { type: "checklist", title: "Questions 16–20", items: [
        "Does the company report Scope 3 emissions, or only Scopes 1 and 2? (Scope 3 avoidance is a major red flag in many sectors.)",
        "If Scope 3 is reported, does it include downstream product use emissions — not just upstream supply chain?",
        "Is the supply chain labour standard claim (e.g., 'no child labour in our supply chain') backed by audit data, or is it a policy statement with no verification?",
        "Does the company's sustainable sourcing claim apply to >80% of procurement, or is it limited to a showcase programme covering <5%?",
        "Has the company's supply chain sustainability performance improved year-over-year, or has it stagnated while the marketing has intensified?",
      ]},
      { type: "h2", text: "Red-flag patterns" },
      { type: "ul", items: [
        "Vague claims without data: 'We are committed to the environment' — no metric, no timeline, no baseline",
        "Relative improvement framing: '40% reduction in carbon intensity' — while absolute emissions grew due to business expansion",
        "Scope 3 avoidance: Claiming leadership in emissions reduction while excluding the 80%+ of the footprint in the value chain",
        "Offset dependency for net-zero: A net-zero claim achieved via offsets rather than real emission cuts, especially for low-quality offsets",
        "Misleading renewables claims: '100% renewable' covering only headquarter electricity, not manufacturing or logistics",
        "Headline-to-data mismatch: Press releases claiming ambitious goals, but annual reports showing stalled progress",
        "Baseline gaming: Resetting the emissions baseline after an acquisition to make subsequent reductions look larger",
        "Certification theatre: Displaying sustainability certifications prominently for products covering <1% of revenue",
      ]},
      { type: "h2", text: "Real-world examples" },
      { type: "callout", variant: "warning", title: "Case: Fossil fuel company claims carbon neutral product", text: "A major oil and gas company labelled a natural gas product as 'carbon neutral' based on offset credits. Investigation found the offsets were purchased from a poorly verified reforestation project with high permanence risk. The actual product emissions were unabated. Regulatory action followed in multiple jurisdictions." },
      { type: "callout", variant: "warning", title: "Case: Fashion brand's '100% sustainable cotton' claim", text: "A fast fashion brand claimed 100% sustainable cotton across its clothing range. Audit found that 'sustainable' was self-defined and included cotton from suppliers certified only to the lowest tier of a third-party scheme. Only 8% of cotton met the higher tier the brand implied." },
      { type: "callout", variant: "info", title: "How OpenESG flags greenwashing", text: "Our AI intelligence engine cross-references company self-disclosures with news monitoring, regulatory filings, NGO reports, and ESG API data. We classify claims as Genuine, Questionable, or Greenwashing based on evidence strength and apply this to the greenwashing risk score visible on every company detail page." },
    ],
    relatedSlugs: ["getting-started-esg-investing", "gri-vs-sasb-vs-issb"],
  },

  {
    slug: "sfdr-pai-reporting",
    tag: "Portfolio",
    tagColor: "bg-teal-100 text-teal-700",
    title: "Building a SFDR PAI-Compliant Reporting Process",
    description: "How to collect, aggregate, and disclose the 18 mandatory Principal Adverse Impact indicators required under SFDR Article 8 and Article 9 funds.",
    readTime: "20 min read",
    lastUpdated: "March 2026",
    author: "OpenESG Research Team",
    authorRole: "Regulatory Analysis",
    blocks: [
      { type: "h2", text: "SFDR fundamentals" },
      { type: "p", text: "The EU Sustainable Finance Disclosure Regulation (SFDR) applies to financial market participants — including fund managers, insurance companies, and investment advisers operating in or marketing to EU investors. Its core purpose is standardising how sustainability risks and impacts are disclosed to investors, preventing greenwashing in financial products." },
      { type: "table", headers: ["Article", "Classification", "What it requires"], rows: [
        ["Article 6", "No sustainability claim", "Disclose how sustainability risks are integrated into investment decisions (even if not promoted)"],
        ["Article 8", "Promotes ESG characteristics", "Disclose the E/S characteristics promoted, how they are met, which indices used if applicable, and PAI statement if considered"],
        ["Article 9", "Sustainable investment objective", "Full PAI disclosure mandatory. Demonstrate the investment objective is sustainable. No significant harm to other objectives. Good governance."],
      ]},
      { type: "callout", variant: "warning", title: "Article 8 misclassification", text: "Many funds are classified as Article 8 when their ESG integration is minimal. European regulators (ESMA, national NCAs) have increased scrutiny of Article 8 funds and are requiring evidence that the promoted ESG characteristics materially influence investment selection. Cosmetic ESG screening is no longer sufficient." },
      { type: "h2", text: "What are Principal Adverse Impacts (PAIs)?" },
      { type: "p", text: "PAIs are negative impacts on sustainability factors caused by investee companies. SFDR requires Article 9 funds (and Article 8 funds choosing to consider PAIs) to disclose 18 mandatory PAIs across four categories, measured at the portfolio level as a weighted average of investee company data." },
      { type: "h3", text: "Mandatory PAI indicators" },
      { type: "table", headers: ["#", "Indicator", "Category", "Unit"], rows: [
        ["1",  "Scope 1 GHG emissions", "Climate & Environment", "tCO₂e"],
        ["2",  "Scope 2 GHG emissions", "Climate & Environment", "tCO₂e"],
        ["3",  "Scope 3 GHG emissions", "Climate & Environment", "tCO₂e"],
        ["4",  "Total GHG emissions", "Climate & Environment", "tCO₂e"],
        ["5",  "Carbon footprint (emissions per €M invested)", "Climate & Environment", "tCO₂e / €M"],
        ["6",  "GHG intensity of investee companies", "Climate & Environment", "tCO₂e / €M revenue"],
        ["7",  "Exposure to fossil fuel sector", "Climate & Environment", "% of fund"],
        ["8",  "Non-renewable energy consumption & production", "Climate & Environment", "% of total"],
        ["9",  "Energy consumption intensity per high-impact climate sector", "Climate & Environment", "MWh / €M revenue"],
        ["10", "Biodiversity-sensitive areas", "Climate & Environment", "Yes/No"],
        ["11", "Emissions to water", "Climate & Environment", "tonnes"],
        ["12", "Hazardous waste proportion", "Climate & Environment", "%"],
        ["13", "UNGC violations / OECD MNE guidelines", "Social & Employee", "% of holdings"],
        ["14", "Lack of UNGC compliance processes", "Social & Employee", "% of holdings"],
        ["15", "Gender pay gap", "Social & Employee", "% gap"],
        ["16", "Board gender diversity", "Governance", "% female"],
        ["17", "Exposure to controversial weapons", "Governance", "% of fund"],
        ["18", "GHG intensity of real estate assets", "Real Estate", "kgCO₂/m²"],
      ]},
      { type: "h2", text: "The data collection challenge" },
      { type: "p", text: "The fundamental challenge with PAI reporting is data availability. Not all investee companies publish the metrics SFDR requires. As of 2025, estimated data availability for mandatory PAI indicators ranges from ~90% for listed large caps (Scopes 1&2 emissions) to ~35% for listed SMEs (Scope 3, biodiversity, water emissions)." },
      { type: "ul", items: [
        "Scope 3 emissions are the most commonly missing — many companies still only disclose Scopes 1 and 2",
        "Biodiversity-sensitive area exposure requires site-level data that most companies do not publish",
        "Gender pay gap data is only mandated in certain jurisdictions (EU pay transparency directive from 2026 helps)",
        "Hazardous waste data requires environmental management system data that smaller companies rarely publish",
      ]},
      { type: "callout", variant: "tip", title: "Handling missing data", text: "SFDR does not require 100% data coverage. It requires funds to disclose the proportion of investee data that is estimated vs. reported, and to explain their estimation methodology. Using sector-average proxies from verified ESG databases for missing data points is acceptable — but must be disclosed." },
      { type: "h2", text: "Building the PAI reporting process: Six steps" },
      { type: "ol", items: [
        "Define your fund scope: Confirm which funds are Article 8 (considering PAIs) or Article 9 (full PAI statement). Establish reporting reference date (typically 31 December) and publish date (30 June following year).",
        "Map investee holdings to ESG data sources: For each holding, identify which ESG data provider covers that company and what PAI data is available. Use OpenESG API or equivalent for standardised data ingestion.",
        "Collect investee-level PAI data: Pull available reported data for all 18 mandatory indicators per holding. Document source, date, and any adjustments made. Flag missing data.",
        "Apply estimation methodology for gaps: For holdings without reported data, use sector-average estimates from EXIOBASE or equivalent supply-use tables, or provider-estimated ESG scores. Document methodology clearly.",
        "Calculate portfolio-level weighted averages: Weight each investee's PAI metric by their share of the fund's total AUM. Sum across all holdings. Verify against prior year for consistency.",
        "Prepare the PAI statement: Draft the mandatory SFDR PAI statement covering all 18 indicators, the narrative on actions taken and planned, and engagement policy summary. Review against ESMA's Q&A guidance before publication.",
      ]},
      { type: "h2", text: "Common errors in PAI reporting" },
      { type: "ul", items: [
        "Using enterprise value including cash (EVIC) inconsistently across data sources",
        "Double-counting Scope 3 when it overlaps with Scope 1 of other portfolio companies",
        "Failing to include sovereign bond holdings in the PAI calculation where required",
        "Estimating instead of sourcing reported data when it is available",
        "Not documenting the proportion of estimated vs. reported data in the PAI statement",
        "Missing the engagement actions requirement — PAI statement must include actions taken to reduce PAIs",
      ]},
    ],
    relatedSlugs: ["navigating-csrd", "gri-vs-sasb-vs-issb"],
  },

  {
    slug: "esg-data-quant-models",
    tag: "Data & API",
    tagColor: "bg-teal-100 text-teal-700",
    title: "Integrating ESG Data into Quant Models",
    description: "Practical patterns for ingesting ESG scores alongside financial data — handling missing values, normalising across sectors, and avoiding look-ahead bias.",
    readTime: "14 min read",
    lastUpdated: "January 2026",
    author: "OpenESG Research Team",
    authorRole: "Data & Quantitative Analysis",
    blocks: [
      { type: "h2", text: "The ESG data landscape for quant teams" },
      { type: "p", text: "Integrating ESG data into quantitative models is more complex than integrating financial data. ESG data has lower coverage, higher latency, inconsistent periodicity, multiple competing providers, and significant missing data rates — especially for smaller companies and emerging markets. Before ingesting ESG data, quant teams need to understand its structural characteristics." },
      { type: "table", headers: ["Characteristic", "Financial Data", "ESG Data"], rows: [
        ["Update frequency", "Daily / real-time", "Annual (with 12–18 month lag)"],
        ["Coverage", "~100% for listed companies", "~80% large caps; ~40% small caps"],
        ["Comparability", "High (IFRS/GAAP)", "Low (multiple standards, self-reported)"],
        ["Audited?", "Yes (financial statements)", "Rarely (ESG assurance growing but not universal)"],
        ["Provider correlation", "~0.99", "~0.54 across major ESG raters"],
        ["Missing data rate", "<1% for key metrics", "10–60% depending on metric"],
      ]},
      { type: "h2", text: "Choosing ESG data providers" },
      { type: "p", text: "The choice of provider significantly affects model results. Given the low correlation between providers (~0.54), using a single provider introduces substantial provider-specific bias. Best practice for institutional quant strategies is to either aggregate multiple providers or understand clearly why one provider's methodology is superior for the specific use case." },
      { type: "ul", items: [
        "MSCI ESG Ratings: Industry-standard for institutional use; strong governance and social coverage; annual scores with controversy overlays",
        "Sustainalytics (Morningstar): Risk-score framework (Unmanaged ESG Risk); strong controversy monitoring; widely used for exclusion screening",
        "Refinitiv (LSEG): Large universe coverage; good for emerging markets; raw data available at disclosure level",
        "S&P Global CSA: Based on annual corporate sustainability assessment; sector-adjusted; strong for DJSI-tracking strategies",
        "OpenESG API: Real-time scores with AI controversy monitoring; framework-level breakdown; suited for ESG factor research",
        "CDP Scores: Best-in-class for climate and water data specifically; A–F scale; annually updated; used for climate transition risk models",
      ]},
      { type: "h2", text: "Data ingestion patterns" },
      { type: "h3", text: "Point-in-time data construction" },
      { type: "p", text: "The most critical technical requirement for backtesting is using point-in-time (PIT) data — the score as it existed at a specific historical date, not the score as restated or revised. ESG providers periodically revise historical scores. Using revised data in a backtest is a form of look-ahead bias." },
      { type: "callout", variant: "warning", title: "Look-ahead bias in ESG backtests", text: "ESG scores are often updated retroactively when a company revises its reporting. If your backtest uses today's data for historical periods, you are introducing significant look-ahead bias. Always request point-in-time data from your ESG provider, or clearly document the assumption that revised data is used." },
      { type: "code", lang: "python", code: `import pandas as pd
import openesg

client = openesg.Client(api_key="sk-...")

# Fetch point-in-time ESG scores for a universe
# as_of parameter requests data as it existed at that date
scores = client.scores.history(
    tickers=["AAPL", "MSFT", "GOOGL", "TSLA"],
    fields=["composite_score", "e_score", "s_score", "g_score"],
    start="2020-01-01",
    end="2025-12-31",
    frequency="quarterly",
    as_of="point_in_time"  # avoid look-ahead bias
)

df = pd.DataFrame(scores)
print(df.head())` },
      { type: "h3", text: "Handling the publication lag" },
      { type: "p", text: "ESG reports typically describe the prior year and are published 3–6 months after year-end. An ESG score updated in April 2026 based on 2025 data should only be used in models starting from the April 2026 publication date. Assuming the score was available on January 1 2026 introduces a 3–4 month look-ahead bias." },
      { type: "h2", text: "Normalisation across sectors" },
      { type: "p", text: "Raw ESG scores should not be compared directly across sectors because material ESG risks vary dramatically by industry. A technology company with a 70 environmental score and an oil company with a 70 environmental score are not environmentally equivalent — the oil company's score reflects much higher absolute emissions in a carbon-intensive sector." },
      { type: "h3", text: "Within-sector normalisation" },
      { type: "p", text: "The standard approach for cross-sectional ESG factor construction is sector-neutral normalisation: convert raw scores to z-scores within each GICS sector, then use the normalised score in portfolio construction." },
      { type: "code", lang: "python", code: `import numpy as np

def sector_neutral_zscore(df, score_col="esg_score", sector_col="gics_sector"):
    """Convert ESG scores to within-sector z-scores."""
    df = df.copy()
    df["esg_z"] = df.groupby(sector_col)[score_col].transform(
        lambda x: (x - x.mean()) / x.std()
    )
    # Winsorise at ±3σ to limit outlier influence
    df["esg_z"] = df["esg_z"].clip(-3, 3)
    return df

# Apply to your holdings universe
scored = sector_neutral_zscore(holdings_df)` },
      { type: "h2", text: "Missing data strategies" },
      { type: "p", text: "Missing data is the norm in ESG, not the exception. Your treatment of missing data should be explicit, documented, and consistent. The main approaches are:" },
      { type: "table", headers: ["Strategy", "When to use", "Risk"], rows: [
        ["Mean/median imputation by sector", "General use for minor gaps (<20%)", "Artificially compresses variance; may introduce sector bias"],
        ["Multiple imputation", "Random missing data, high coverage universe", "Computationally expensive; adds complexity"],
        ["Explicit missing category", "Systematic non-disclosure (ESG controversy)", "Requires interpretation — is missing = bad, or missing = unknown?"],
        ["Provider ensemble average", "Disagreement between providers", "May dilute signal if providers have systematic biases"],
        ["Exclude from universe", "High missing rate (>50%) or critical metric", "Survivorship bias if exclusion correlates with ESG performance"],
      ]},
      { type: "callout", variant: "tip", title: "Missing = signal", text: "For some ESG factors, missing data is itself a negative signal. Companies that fail to disclose Scope 3 emissions are more likely to have high emissions they do not want to publicise. Treating missing Scope 3 as 'unknown' rather than 'probably bad' may understate the ESG risk of the portfolio." },
      { type: "h2", text: "Backtesting ESG factors" },
      { type: "p", text: "ESG factor backtests have historically shown mixed results, which is expected — ESG is not a single factor but a multi-dimensional risk overlay. The strongest documented ESG effects are in controversy monitoring (negative news predicts short-term negative returns) and governance quality (strong governance predicts long-term valuation multiples)." },
      { type: "ul", items: [
        "Use long formation periods (quarterly rebalancing is standard for annual ESG data)",
        "Test on a value-weighted portfolio, not equal-weighted, to match realistic execution",
        "Decompose returns into E, S, and G components separately — the composite often masks different directional signals",
        "Test the turnover and transaction costs — ESG strategies tend to have low turnover but high rebalancing costs at threshold crossings",
        "Be explicit about whether the strategy is long-short (factor) or long-only with ESG tilt",
      ]},
    ],
    relatedSlugs: ["getting-started-esg-investing", "identifying-greenwashing"],
  },
];
