export interface FrameworkSection {
  heading: string;
  content: string;
  bullets?: string[];
}

export interface FrameworkRequirement {
  label: string;
  status: "required" | "recommended" | "optional";
  detail: string;
}

export interface FrameworkData {
  slug: string;
  acronym: string;
  full: string;
  tagline: string;
  color: string;
  accentText: string;
  launched: string;
  governedBy: string;
  mandatory: boolean;
  mandatoryScope: string;
  primaryAudience: string;
  reportingFormat: string;
  updateCycle: string;
  websiteLabel: string;
  websiteUrl: string;
  summary: string;
  whyItMatters: string;
  keyRequirements: FrameworkRequirement[];
  sections: FrameworkSection[];
  commonMisconceptions: string[];
  openESGNote: string;
  relatedSlugs: string[];
}

export const frameworks: FrameworkData[] = [
  {
    slug: "gri",
    acronym: "GRI",
    full: "Global Reporting Initiative",
    tagline: "The world's most widely used sustainability reporting framework",
    color: "bg-emerald-50 border-emerald-200",
    accentText: "text-emerald-800",
    launched: "1997",
    governedBy: "Global Reporting Initiative (Amsterdam, Netherlands)",
    mandatory: false,
    mandatoryScope: "Not legally mandatory, but referenced by CSRD/ESRS and required by many investors and supply chain partners",
    primaryAudience: "All stakeholders — investors, employees, NGOs, communities, regulators",
    reportingFormat: "GRI-referenced or In Accordance — detailed narrative + quantitative data",
    updateCycle: "Universal Standards updated 2021; Sector Standards published 2022–2024",
    websiteLabel: "globalreporting.org",
    websiteUrl: "https://www.globalreporting.org",
    summary: "The Global Reporting Initiative (GRI) Standards are the most comprehensive sustainability reporting framework in the world. With over 14,000 organisations globally using GRI to report, it is the de facto standard for multi-stakeholder sustainability communication. GRI covers the full scope of a company's economic, environmental, and social impacts — not just those that affect financial performance.",
    whyItMatters: "GRI is the reporting framework that regulators, NGOs, and socially conscious investors have used for two decades to evaluate corporate sustainability performance. It is the foundation for the EU's CSRD/ESRS standards, and organisations that already report under GRI have a significant head start on CSRD compliance. For companies in complex supply chains or facing NGO scrutiny, GRI is the language of accountability.",
    keyRequirements: [
      { label: "GRI 1 — Foundation", status: "required", detail: "Core principles, reporting process, and claim of use" },
      { label: "GRI 2 — General Disclosures", status: "required", detail: "Organisational profile, governance, strategy, stakeholder engagement, and reporting practices" },
      { label: "GRI 3 — Material Topics", status: "required", detail: "Process for determining material topics and their management approach" },
      { label: "Sector Standard", status: "recommended", detail: "Industry-specific GRI Sector Standards for Oil & Gas, Mining, Agriculture, Financial Services, etc." },
      { label: "Topic Standards", status: "recommended", detail: "GRI 200 (Economic), GRI 300 (Environmental), GRI 400 (Social) topic standards for each material topic" },
    ],
    sections: [
      {
        heading: "GRI's three-tier structure",
        content: "GRI reporting is built from three components. Universal Standards (GRI 1, 2, 3) apply to every reporting organisation and establish the foundation. Sector Standards provide sector-specific guidance on likely material topics and recommended disclosures for industries with common sustainability profiles. Topic Standards provide detailed disclosure requirements for specific topics (e.g., GRI 305 for emissions, GRI 401 for employment, GRI 413 for local communities).",
        bullets: [
          "Universal Standards: Apply to all organisations regardless of sector or size",
          "Sector Standards: Published for 40 sectors including Oil & Gas, Coal, Agriculture, Financial Services, Food & Beverage, Mining",
          "Topic Standards: 34 topic-specific standards covering economic, environmental, and social impacts",
        ],
      },
      {
        heading: "The materiality process",
        content: "GRI requires a structured materiality process to identify which topics require disclosure. This involves identifying impacts (positive and negative, actual and potential), assessing their significance through stakeholder engagement and peer analysis, and prioritising topics for disclosure based on significance. GRI's materiality concept is impact materiality — the topics that matter to affected stakeholders — which is broader than financial materiality.",
      },
      {
        heading: "CSRD interoperability",
        content: "EFRAG has published a detailed mapping between ESRS (the reporting standard for CSRD) and GRI Standards. This confirms that organisations reporting In Accordance with GRI can meet most CSRD/ESRS requirements with limited additional work. The primary addition required for CSRD is financial materiality analysis — CSRD's double materiality requires both impact and financial materiality assessment, while GRI requires only impact materiality.",
      },
      {
        heading: "How OpenESG scores against GRI",
        content: "OpenESG evaluates companies against GRI's Universal and Sector Standards to assess disclosure quality and completeness. We assess five core GRI disclosure areas: emissions (GRI 305), energy (GRI 302), water (GRI 303), waste (GRI 306), and worker rights (GRI 401–408). Each area is rated as Disclosed, Partial, Referenced, or Not Disclosed based on the most recent available sustainability report.",
      },
    ],
    commonMisconceptions: [
      "GRI is not a ratings system — it is a reporting framework. A GRI-referenced report does not mean a company performs well; it means it reports comprehensively.",
      "'In Accordance' and 'GRI-referenced' are not the same — In Accordance requires all Universal Standards disclosures; GRI-referenced is less comprehensive.",
      "GRI does not audit company data — it provides the structure for disclosure, not verification.",
    ],
    openESGNote: "OpenESG scores GRI framework alignment based on the latest published sustainability report. Ratings reflect disclosure completeness (what is reported) rather than underlying performance (what the numbers show).",
    relatedSlugs: ["sasb", "issb", "csrd"],
  },

  {
    slug: "sasb",
    acronym: "SASB",
    full: "Sustainability Accounting Standards Board",
    tagline: "Industry-specific ESG metrics for financial decision-making",
    color: "bg-sky-50 border-sky-200",
    accentText: "text-sky-800",
    launched: "2011",
    governedBy: "IFRS Foundation (following 2022 consolidation with ISSB)",
    mandatory: false,
    mandatoryScope: "Not legally mandatory; referenced by SEC disclosure guidance, CSRD, and many institutional investor RFPs",
    primaryAudience: "Financial investors, securities analysts, corporate investor relations",
    reportingFormat: "Standardised quantitative metrics aligned to industry-specific standards",
    updateCycle: "77 industry standards published; now being integrated into ISSB sector guidance",
    websiteLabel: "sasb.org",
    websiteUrl: "https://sasb.org",
    summary: "SASB Standards identify the subset of ESG issues most likely to be financially material for companies in 77 specific industries across 11 sectors. Unlike GRI's comprehensive impact coverage, SASB is deliberately narrow — it focuses only on topics with evidence of investor relevance, and it quantifies those topics in industry-specific, comparable metrics.",
    whyItMatters: "SASB is the ESG data standard most valued by equity analysts and portfolio managers because it produces directly comparable, industry-specific metrics. A SASB disclosure allows investors to benchmark a company's data privacy practices against every other internet media company, or compare an oil company's spill rates against its upstream peers. This comparability makes SASB-aligned data the most useful for ESG factor construction in quant strategies.",
    keyRequirements: [
      { label: "Industry identification", status: "required", detail: "Select the correct SASB industry standard from 77 options across 11 sectors" },
      { label: "Activity metric disclosure", status: "required", detail: "Report the activity metrics (e.g., revenue, production volume) that contextualise ESG metrics" },
      { label: "Accounting metrics", status: "required", detail: "Report the quantitative ESG metrics specified for the industry (typically 10–20 metrics)" },
      { label: "Technical protocol", status: "recommended", detail: "Follow the calculation methodology in the industry Technical Protocol for each metric" },
      { label: "Assurance", status: "optional", detail: "External assurance increases credibility but is not required by the standard" },
    ],
    sections: [
      {
        heading: "The 11-sector, 77-industry structure",
        content: "SASB organises industries into 11 sectors: Technology & Communications, Health Care, Financials, Consumer Discretionary, Consumer Staples, Food & Beverage, Resource Transformation, Extractives & Minerals Processing, Infrastructure, Transportation, and Services. Within each sector, SASB identifies industry-specific standards. For example, the Software & IT Services standard focuses on data privacy and security, whereas the Electric Utilities standard focuses on greenhouse gas emissions and grid reliability.",
      },
      {
        heading: "Financially material vs. comprehensive",
        content: "SASB's intentional narrowness is both its strength and its limitation. Because SASB only covers financially material topics per industry, a SASB report for a consumer products company will not cover community engagement, indigenous rights, or biodiversity — even if those topics are significant for affected stakeholders. Companies using SASB alone cannot claim comprehensive ESG disclosure. The combination of SASB (for financial materiality) and GRI (for impact materiality) is the dominant approach for large listed companies.",
        bullets: [
          "Average SASB standard covers 13 industry-specific metrics",
          "Most metrics are quantitative (not narrative), enabling year-on-year comparison",
          "SASB metrics are aligned to the concepts in IFRS S2 climate disclosures",
        ],
      },
      {
        heading: "Integration with ISSB",
        content: "Since the consolidation of SASB under the IFRS Foundation in 2022, SASB Standards are being progressively integrated into ISSB's work programme. IFRS S1 explicitly states that companies can use SASB Standards to identify what sustainability information is relevant to their industry. Future ISSB sector-specific guidance is expected to draw heavily from SASB methodology.",
      },
      {
        heading: "How OpenESG scores against SASB",
        content: "For each company, OpenESG identifies the most relevant SASB industry standard and evaluates disclosure against the required accounting metrics. We assess whether each metric is fully disclosed, partially disclosed, referenced but not quantified, or not disclosed. The SASB alignment score reflects the proportion of industry-relevant metrics for which investable-quality data is publicly available.",
      },
    ],
    commonMisconceptions: [
      "SASB does not set environmental targets — it sets disclosure requirements. A company can score well on SASB by disclosing high emissions clearly.",
      "SASB is not the same as ESG performance — it measures disclosure of financially material ESG information, not the underlying sustainability performance.",
      "SASB standards are not comparable across industries by design — a 70/100 SASB score in software is measuring completely different things than a 70/100 score in oil & gas.",
    ],
    openESGNote: "OpenESG maps each of the 21 companies in our universe to their primary SASB industry standard and evaluates disclosure completeness against the required accounting metrics. Industry-specific ratings reflect what proportion of financially material ESG data is publicly accessible for each company.",
    relatedSlugs: ["gri", "issb", "csrd"],
  },

  {
    slug: "tcfd",
    acronym: "TCFD",
    full: "Task Force on Climate-related Financial Disclosures",
    tagline: "The four-pillar framework for climate risk disclosure — now superseded by ISSB",
    color: "bg-sky-50 border-sky-200",
    accentText: "text-sky-800",
    launched: "2017",
    governedBy: "Financial Stability Board (FSB) — disbanded October 2023 after ISSB assumption of mandate",
    mandatory: false,
    mandatoryScope: "TCFD was adopted as mandatory in UK (listed companies), NZ, Japan, and others. Now superseded by IFRS S2 which satisfies all TCFD requirements.",
    primaryAudience: "Institutional investors, financial regulators, capital markets",
    reportingFormat: "Four-pillar narrative + quantitative disclosure in annual reports or standalone climate reports",
    updateCycle: "Final version 2021; disbanded 2023; content integrated into IFRS S2",
    websiteLabel: "fsb-tcfd.org (archived)",
    websiteUrl: "https://www.fsb-tcfd.org",
    summary: "The Task Force on Climate-related Financial Disclosures (TCFD) was established by the Financial Stability Board in 2015 and published its recommendations in 2017. It became the de facto global standard for climate risk disclosure and is the direct predecessor to IFRS S2. Companies reporting under IFRS S2 fully satisfy TCFD requirements. The TCFD framework is built around four interdependent pillars: Governance, Strategy, Risk Management, and Metrics & Targets.",
    whyItMatters: "TCFD transformed how investors and regulators think about climate risk. Before TCFD, climate risk was treated as a long-term, low-probability issue. TCFD reframed it as a near-term financial risk requiring board-level governance, scenario analysis, and quantified disclosure. Every major climate reporting requirement — CSRD, ISSB, SEC climate rule, UK TCFD mandate — is built on TCFD's architecture.",
    keyRequirements: [
      { label: "Governance — Board oversight", status: "required", detail: "Disclose the board's oversight of climate-related risks and opportunities" },
      { label: "Governance — Management role", status: "required", detail: "Disclose management's role in assessing and managing climate-related risks" },
      { label: "Strategy — Risks and opportunities", status: "required", detail: "Disclose climate-related risks and opportunities over short, medium, and long term" },
      { label: "Strategy — Scenario analysis", status: "recommended", detail: "Describe resilience of strategy under different climate scenarios including 2°C or lower" },
      { label: "Risk Management — Processes", status: "required", detail: "Disclose processes for identifying, assessing, and managing climate-related risks" },
      { label: "Metrics & Targets — GHG emissions", status: "required", detail: "Disclose Scope 1, Scope 2, and where appropriate Scope 3 GHG emissions" },
    ],
    sections: [
      {
        heading: "The four TCFD pillars",
        content: "TCFD organises climate disclosure across four interconnected areas. Governance covers how the board and senior management oversee climate risk. Strategy covers how climate risks and opportunities affect the business model, strategy, and financial planning. Risk Management covers the processes used to identify, assess, and manage climate risk. Metrics and Targets covers the quantitative data — emissions, energy consumption, and climate-related financial impacts.",
      },
      {
        heading: "Physical vs. transition risk",
        content: "TCFD distinguishes two fundamental types of climate risk. Physical risk is the direct impact of climate change on operations — floods, heat stress, droughts, sea-level rise damaging assets or disrupting supply chains. Transition risk is the financial impact of the low-carbon transition — stranded fossil fuel assets, carbon pricing, changing consumer demand, litigation, and regulatory shifts. The balance of these risks differs dramatically by sector: energy companies face high transition risk; real estate and agriculture face high physical risk.",
        bullets: [
          "Acute physical risk: Extreme weather events (hurricanes, floods, wildfires)",
          "Chronic physical risk: Gradual shifts in climate patterns (sea-level rise, increased heat stress)",
          "Policy and legal transition risk: Carbon taxes, cap-and-trade, climate litigation",
          "Technology transition risk: Stranded fossil fuel assets as renewables scale",
          "Market transition risk: Changing investor, consumer, and supply chain preferences",
        ],
      },
      {
        heading: "Scenario analysis requirement",
        content: "TCFD's most demanding requirement is scenario analysis — assessing how the company's strategy performs under plausible climate futures, including at least one scenario consistent with a 2°C or lower temperature pathway. Most large companies use IPCC scenarios (SSP1-1.9, SSP2-4.5, SSP5-8.5) or IEA scenarios (Net Zero 2050, Stated Policies). Scenario analysis requires cross-functional collaboration between sustainability, risk, and finance teams and is the most resource-intensive TCFD element.",
      },
      {
        heading: "TCFD vs. IFRS S2",
        content: "IFRS S2 superseded TCFD in 2023. All TCFD disclosures are fully incorporated into IFRS S2, with some enhancements. IFRS S2 requires disclosure of physical and transition risks with greater specificity, adds cross-industry climate metrics as mandatory (not recommended), and explicitly requires disclosure of the 'current and anticipated financial effects' of climate-related risks. Companies reporting under IFRS S2 meet TCFD requirements and should reference IFRS S2 in future reports.",
      },
    ],
    commonMisconceptions: [
      "TCFD is not a rating or a score — it is a voluntary disclosure framework.",
      "Companies that 'align with TCFD' do not necessarily have low climate risk — they disclose climate risk according to the framework.",
      "TCFD has been disbanded — reporting companies should now reference IFRS S2 (ISSB), not TCFD.",
    ],
    openESGNote: "OpenESG scores TCFD alignment based on disclosure quality across the four pillars. For companies that have migrated to IFRS S2 reporting, we score both frameworks as aligned. Scenario analysis presence is a key positive signal in the TCFD score.",
    relatedSlugs: ["issb", "csrd", "gri"],
  },

  {
    slug: "csrd",
    acronym: "CSRD",
    full: "Corporate Sustainability Reporting Directive",
    tagline: "The EU's mandatory sustainability reporting law — the most comprehensive in the world",
    color: "bg-violet-50 border-violet-200",
    accentText: "text-violet-800",
    launched: "2024 (first reports due 2025)",
    governedBy: "European Commission — standards written by EFRAG (European Financial Reporting Advisory Group)",
    mandatory: true,
    mandatoryScope: "All large EU companies and listed SMEs; non-EU companies with €150M+ EU revenue",
    primaryAudience: "All stakeholders via mandatory, publicly available, audited sustainability statements",
    reportingFormat: "Structured, machine-readable (XBRL-tagged), limited-assured sustainability statement embedded in management report",
    updateCycle: "Phase-in 2025–2029; sector-specific ESRS under development",
    websiteLabel: "efrag.org/esrs",
    websiteUrl: "https://www.efrag.org/Activities/2205191406363055/ESRS-Standards",
    summary: "The Corporate Sustainability Reporting Directive (CSRD) is EU legislation that mandates comprehensive sustainability reporting for approximately 50,000 companies. It replaced the Non-Financial Reporting Directive (NFRD) and requires reporting against European Sustainability Reporting Standards (ESRS) — 12 detailed standards covering climate, pollution, biodiversity, water, workforce, supply chain, consumers, and governance. CSRD is the most demanding and comprehensive mandatory sustainability reporting framework in the world.",
    whyItMatters: "CSRD changes the calculus for every large company with EU market exposure. It is not voluntary — it is law. The reporting scope (1,000+ data points), the double materiality requirement, the mandatory assurance, and the machine-readable format create a step-change in the quantity and quality of sustainability data available about EU-exposed companies. For investors and analysts, CSRD will be the most valuable source of comparable, assured sustainability data when fully implemented.",
    keyRequirements: [
      { label: "ESRS 1 — General Requirements", status: "required", detail: "Reporting principles, boundary, value chain, data quality" },
      { label: "ESRS 2 — General Disclosures", status: "required", detail: "Governance, strategy, double materiality assessment" },
      { label: "ESRS E1 — Climate Change", status: "required", detail: "GHG emissions (Scopes 1–3), transition plan, physical and transition risk" },
      { label: "ESRS E2–E5 (Pollution, Water, Biodiversity, Resources)", status: "recommended", detail: "Required if material under double materiality assessment" },
      { label: "ESRS S1 — Own Workforce", status: "required", detail: "Working conditions, wages, health & safety, diversity" },
      { label: "ESRS G1 — Business Conduct", status: "required", detail: "Anti-corruption, lobbying, whistleblowing, payment practices" },
      { label: "Limited assurance", status: "required", detail: "Third-party limited assurance required from first reporting year" },
    ],
    sections: [
      {
        heading: "Double materiality: The defining concept",
        content: "CSRD requires companies to apply double materiality — assessing both financial materiality (how ESG risks affect the company) and impact materiality (how the company affects the world). A topic is material under CSRD if it is material from either perspective. This means companies must disclose environmental and social impacts they cause even when those impacts do not directly affect their financial performance — a fundamental departure from investor-centric financial reporting.",
        bullets: [
          "Financial materiality (Outside-In): ESG risks that affect assets, liabilities, revenues, or cash flows",
          "Impact materiality (Inside-Out): Company impacts on people and planet, regardless of financial effect",
          "Both: Topics that are both financially and impact-material (most climate topics fall here)",
        ],
      },
      {
        heading: "Reporting scope: Your value chain is in scope",
        content: "CSRD's boundary extends beyond the company itself into the value chain — upstream suppliers and downstream customers and users. This means a manufacturing company must report not only its own emissions but also the emissions of its key suppliers and the product-use emissions of its customers. The value chain scope is one of the most significant data challenges in CSRD implementation.",
      },
      {
        heading: "XBRL digital tagging",
        content: "CSRD requires sustainability statements to be digitally tagged in XBRL (Extensible Business Reporting Language) — the same format used for financial statements under ESEF. This digital tagging makes sustainability data machine-readable, comparable, and accessible to regulators, data vendors, and investors without manual extraction. It is also one of the most technically demanding aspects of first-time CSRD compliance.",
      },
      {
        heading: "Phase-in timeline",
        content: "CSRD applies in waves: FY2024 data (first reports 2025) for companies already under NFRD; FY2025 for other large EU companies; FY2026 (opt-out until 2028) for listed SMEs; FY2028 for non-EU companies with €150M+ EU revenue and EU subsidiary. The phase-in gives later entrants time to learn from early reporters, but supply chain data requests are already reaching smaller companies years ahead of their own reporting obligation.",
      },
    ],
    commonMisconceptions: [
      "CSRD does not set environmental targets — it mandates disclosure of targets, plans, and performance against them.",
      "A CSRD-compliant report is not a pass/fail — it is a structured disclosure, not a sustainability certification.",
      "Non-EU companies with significant EU business are not automatically exempt — the €150M EU revenue threshold applies from FY2028.",
    ],
    openESGNote: "OpenESG evaluates CSRD/ESRS alignment across the four mandatory disclosure areas (E1, S1, G1, plus ESRS 2) and assesses double materiality coverage in available sustainability reports. The CSRD rating reflects current report quality against the ESRS framework, not a prediction of regulatory compliance.",
    relatedSlugs: ["gri", "issb", "tcfd"],
  },

  {
    slug: "issb",
    acronym: "ISSB",
    full: "International Sustainability Standards Board",
    tagline: "The global investor-focused baseline — IFRS S1 and S2 for capital markets",
    color: "bg-sky-50 border-sky-200",
    accentText: "text-sky-800",
    launched: "2023 (IFRS S1 and S2 published June 2023)",
    governedBy: "IFRS Foundation (Basel, Switzerland)",
    mandatory: false,
    mandatoryScope: "Adopted/referenced as mandatory in UK, Australia, Japan, Singapore, Canada, New Zealand; under consideration in EU",
    primaryAudience: "Capital markets investors, financial regulators, standard setters",
    reportingFormat: "Integrated into general-purpose financial reports; aligned with financial statement structure",
    updateCycle: "IFRS S1 (general), IFRS S2 (climate) published 2023; sector-specific standards under development",
    websiteLabel: "ifrs.org/groups/issb",
    websiteUrl: "https://www.ifrs.org/groups/international-sustainability-standards-board/",
    summary: "The International Sustainability Standards Board (ISSB), established under the IFRS Foundation in 2021, published IFRS S1 and IFRS S2 in June 2023. These standards provide the first globally consistent, investor-focused baseline for sustainability disclosure. ISSB was built by consolidating TCFD (climate), SASB (industry metrics), IIRC (integrated reporting), CDSB, and VRF under a single governance structure. Regulators in over 20 jurisdictions are adopting or referencing ISSB as the foundation for mandatory reporting.",
    whyItMatters: "ISSB represents the most significant development in the history of sustainability reporting: the possibility of a global, mandatory, audited, investor-grade baseline that works across jurisdictions. When adopted, ISSB creates the same comparability for sustainability information that IFRS created for financial information. For investors, analysts, and companies operating in multiple jurisdictions, ISSB is the most important framework to understand.",
    keyRequirements: [
      { label: "IFRS S1 — Sustainability-related financial disclosures", status: "required", detail: "Governance, strategy, risk management, metrics for all material sustainability topics" },
      { label: "IFRS S2 — Climate-related disclosures", status: "required", detail: "Physical and transition risk, Scope 1/2/3 emissions, climate targets, scenario analysis" },
      { label: "Industry-specific metrics", status: "recommended", detail: "Use SASB Standards to identify material industry metrics pending ISSB sector standards" },
      { label: "Connectivity with financial statements", status: "required", detail: "Disclose how sustainability risks affect financial position and performance" },
      { label: "Cross-industry climate metrics", status: "required", detail: "Absolute GHG emissions (Scopes 1, 2, 3), GHG intensity, internal carbon price, climate targets" },
    ],
    sections: [
      {
        heading: "IFRS S1: The general standard",
        content: "IFRS S1 sets the overarching requirements for sustainability-related financial disclosures. It applies the TCFD's four-pillar structure (Governance, Strategy, Risk Management, Metrics & Targets) to all sustainability topics — not just climate. Under IFRS S1, companies must disclose information about sustainability-related risks and opportunities that could reasonably be expected to affect a company's cash flows, access to finance, or cost of capital.",
      },
      {
        heading: "IFRS S2: The climate standard",
        content: "IFRS S2 provides specific requirements for climate-related disclosures, incorporating and extending all TCFD recommendations. It requires disclosure of physical and transition risks and opportunities, scenario analysis (at least one aligned with 1.5°C), all Scope 1 and 2 GHG emissions (Scope 3 if material), and climate-related targets. IFRS S2 also includes eight cross-industry climate metrics as mandatory disclosures.",
        bullets: [
          "Absolute gross GHG emissions (Scopes 1, 2, 3)",
          "GHG intensity per unit of revenue",
          "Internal carbon price (if used in decision-making)",
          "Percentage of renewable energy consumption",
          "Climate-related physical risk exposure (by asset class)",
          "Climate-related transition risk exposure",
          "Climate-related executive remuneration",
          "Climate-related capital expenditure and financing",
        ],
      },
      {
        heading: "The global interoperability roadmap",
        content: "ISSB has committed to global interoperability — ensuring companies can use IFRS S1/S2 as a baseline and satisfy additional jurisdictional requirements with targeted additions rather than starting over. The EU EFRAG has mapped ISSB to ESRS to identify where CSRD requirements go further. The UK FCA has mapped ISSB to its TCFD regime. IOSCO (the global securities regulator body) has endorsed ISSB, accelerating adoption.",
      },
    ],
    commonMisconceptions: [
      "ISSB is not mandatory globally — adoption is at each jurisdiction's discretion. Check your specific regulatory environment.",
      "ISSB is financially materiality-focused — like SASB, it does not require disclosure of all impacts (only those financially material). This is fundamentally different from GRI's impact materiality approach.",
      "Reporting under ISSB does not automatically satisfy CSRD — CSRD (via ESRS) goes significantly further on double materiality and breadth of topics.",
    ],
    openESGNote: "OpenESG evaluates ISSB/IFRS S1&S2 alignment by assessing the four disclosure pillars plus cross-industry climate metrics. For companies that previously reported under TCFD, we automatically apply ISSB alignment credit where the TCFD disclosure satisfies equivalent ISSB requirements.",
    relatedSlugs: ["tcfd", "csrd", "sasb"],
  },

  {
    slug: "cdp",
    acronym: "CDP",
    full: "Carbon Disclosure Project",
    tagline: "Investor-grade climate, forests, and water questionnaires — A-List to D",
    color: "bg-emerald-50 border-emerald-200",
    accentText: "text-emerald-800",
    launched: "2000",
    governedBy: "CDP Worldwide (London, United Kingdom)",
    mandatory: false,
    mandatoryScope: "Voluntary; but requested by 740+ institutional investors (€136T AUM) and 230+ major purchasing companies",
    primaryAudience: "Institutional investors, purchasing companies, supply chain managers, policymakers",
    reportingFormat: "Annual questionnaire response — rated A, A-, B, B-, C, D, D-, or F (non-disclosure)",
    updateCycle: "Annual; questionnaires updated each year; scores published December",
    websiteLabel: "cdp.net",
    websiteUrl: "https://www.cdp.net",
    summary: "CDP (Carbon Disclosure Project) runs the world's largest environmental disclosure platform. Over 23,000 companies disclose through CDP annually, responding to detailed questionnaires on climate change, water security, and forests. CDP scores companies on an A–D scale based on disclosure quality and performance. The A-List is the global benchmark for best-in-class environmental transparency.",
    whyItMatters: "CDP is the primary platform through which institutional investors with €136T in AUM formally request environmental data from companies. A CDP non-disclosure or a low score is a direct red flag for ESG-focused investors. CDP's questionnaires are the most detailed and rigorous publicly available climate data collection mechanism — far more granular than most voluntary sustainability reports.",
    keyRequirements: [
      { label: "Climate Change questionnaire", status: "recommended", detail: "Governance, strategy, risks, opportunities, emissions (Scopes 1–3), targets, scenario analysis" },
      { label: "Water Security questionnaire", status: "recommended", detail: "Water risks, water withdrawal, water quality impacts, targets" },
      { label: "Forests questionnaire", status: "recommended", detail: "Deforestation risk in commodity supply chains (soy, palm oil, cattle, timber, cocoa, rubber)" },
      { label: "Supply Chain programme", status: "recommended", detail: "Responding to buyer requests via CDP's supply chain module" },
    ],
    sections: [
      {
        heading: "The A–F scoring system",
        content: "CDP scores are based on four dimensions: Disclosure (what is reported), Awareness (understanding of risks and opportunities), Management (actions taken to manage environmental issues), and Leadership (best practices, verified data, ambitious targets). The A-List represents less than 2% of respondents — companies that demonstrate awareness of environmental risks, manage them in robust and comprehensive ways, and take leadership through transparent data, credible targets, and supply chain influence.",
        bullets: [
          "A / A-: Leadership — industry-leading practices, verified data, ambitious targets",
          "B / B-: Management — taking coordinated action on climate/water/forests",
          "C / C-: Awareness — understanding impacts but limited management",
          "D / D-: Disclosure — participating but with limited ambition",
          "F: Non-disclosure — did not respond to investor request",
        ],
      },
      {
        heading: "Data quality and investor use",
        content: "CDP data is the highest-quality publicly available environmental dataset because it is collected through a standardised questionnaire with built-in validation, reviewed by CDP analysts, and used by institutional investors for active stewardship. Many ESG scoring providers use CDP data as a primary input. Companies on the CDP A-List typically receive better ESG scores from MSCI, Sustainalytics, and other major providers.",
      },
      {
        heading: "CDP and CSRD",
        content: "The European Commission has confirmed that CDP disclosure substantially supports CSRD/ESRS compliance, particularly for ESRS E1 (Climate Change) and ESRS E3 (Water). Companies that fully respond to CDP's climate questionnaire have answered most of the quantitative data points required by ESRS E1. CDP is building a joint CDP-ESRS reporting pathway to reduce double-reporting burden.",
      },
    ],
    commonMisconceptions: [
      "A high CDP score does not mean low emissions — a company can score A by disclosing its emissions transparently and having a credible reduction plan, even with very high absolute emissions.",
      "CDP is not a regulatory requirement — but non-disclosure to investor requests is treated by ESG-focused investors as a negative governance signal.",
      "CDP scores change annually — a company's score can improve or deteriorate year-on-year based on questionnaire responses and performance.",
    ],
    openESGNote: "OpenESG maps CDP scores for companies in our universe where data is publicly available. CDP scores are used as a strong positive signal for environmental data quality — a CDP A or B rating increases our confidence in the company's emissions data and environmental management practices.",
    relatedSlugs: ["tcfd", "issb", "gri"],
  },

  {
    slug: "un-sdgs",
    acronym: "UN SDGs",
    full: "UN Sustainable Development Goals",
    tagline: "The 17 global goals — mapping corporate action to planetary outcomes",
    color: "bg-teal-50 border-teal-200",
    accentText: "text-teal-800",
    launched: "2015",
    governedBy: "United Nations (New York, USA) — 193 member states",
    mandatory: false,
    mandatoryScope: "Not mandatory for companies; however, ESRS requires companies to consider SDG alignment in CSRD reporting",
    primaryAudience: "Companies, investors, governments, NGOs, impact measurement practitioners",
    reportingFormat: "SDG alignment mapping — companies select relevant SDGs and link them to business activities, products, and impacts",
    updateCycle: "SDGs set for 2015–2030; halftime review completed 2023; tracking shows most goals off-track",
    websiteLabel: "sdgs.un.org",
    websiteUrl: "https://sdgs.un.org/goals",
    summary: "The UN's 17 Sustainable Development Goals, adopted by 193 countries in 2015, set the global development agenda through 2030. Each SDG has specific targets (169 total) and indicators (232 unique). For companies, the SDGs provide a common language for communicating how their business activities contribute to — or detract from — global development priorities. Companies increasingly map their sustainability programmes to the SDGs to demonstrate alignment with international development priorities.",
    whyItMatters: "The SDGs are the most universal framework for talking about sustainable development at a societal level. For investors pursuing impact or sustainable investment strategies, the SDGs provide the outcome framework against which portfolio company activities can be evaluated. The SDG Impact Standards for enterprises and investors (UNDP) provide specific criteria for companies claiming SDG-aligned business models.",
    keyRequirements: [
      { label: "Identify material SDGs", status: "recommended", detail: "Select SDGs most relevant to the company's business model and operations" },
      { label: "Map activities to targets", status: "recommended", detail: "Link specific business activities and products to SDG targets (not just goals)" },
      { label: "Set quantified contributions", status: "optional", detail: "Set measurable targets for SDG contributions (e.g., number of people served, tonnes of waste avoided)" },
      { label: "Report progress annually", status: "recommended", detail: "Disclose progress against stated SDG commitments in annual reporting" },
    ],
    sections: [
      {
        heading: "The 17 goals and their relevance to companies",
        content: "The SDGs range from SDG 1 (No Poverty) and SDG 2 (Zero Hunger) — most relevant for food, agriculture, and financial inclusion companies — to SDG 7 (Clean Energy), SDG 13 (Climate Action), and SDG 15 (Life on Land) — most relevant for energy, industrial, and land-use intensive businesses. Governance-heavy companies focus on SDG 16 (Peace, Justice, and Strong Institutions). Technology companies often focus on SDG 9 (Industry, Innovation, and Infrastructure) and SDG 4 (Quality Education).",
        bullets: [
          "SDG 7: Clean energy — renewable power, energy access, efficiency",
          "SDG 12: Responsible consumption — circular economy, sustainable supply chains, waste reduction",
          "SDG 13: Climate action — GHG reduction, climate resilience",
          "SDG 17: Partnerships — cross-sector collaboration, finance for development",
        ],
      },
      {
        heading: "SDG alignment vs. SDG washing",
        content: "The SDGs are vulnerable to 'SDG washing' — companies claiming alignment based on peripheral or minor activities while their core business model creates negative impacts inconsistent with the goals. A tobacco company claiming SDG 3 (Good Health) alignment, or a fast fashion company claiming SDG 12 (Responsible Consumption) alignment, are examples of this pattern. Credible SDG alignment requires the company's dominant revenue-generating activities to be net-positive for the relevant goal.",
      },
      {
        heading: "SDG Impact Standards",
        content: "UNDP's SDG Impact Standards for enterprises (2021) provide a more rigorous framework for companies claiming SDG alignment. They require companies to demonstrate: (1) an intent to contribute to SDGs, (2) a contribution model showing how business activities create outcomes, (3) management practices that maximise positive impacts and minimise negative ones, (4) transparency through public reporting of impact performance.",
      },
    ],
    commonMisconceptions: [
      "Claiming alignment with multiple SDGs does not mean a company is sustainable — shallow SDG mapping is widespread.",
      "The SDGs are government targets, not company standards. Companies cannot 'achieve' an SDG — they can contribute to its achievement.",
      "SDG 13 (Climate Action) is not the same as Paris Agreement alignment — SDG 13 tracks climate governance and action broadly, not specifically a 1.5°C pathway.",
    ],
    openESGNote: "OpenESG maps disclosed SDG alignments for each company and cross-checks claimed alignments against actual business model activities. We flag SDG washing where a company claims alignment with goals that its primary revenue-generating activities are inconsistent with.",
    relatedSlugs: ["gri", "un-gc", "sbti"],
  },

  {
    slug: "sbti",
    acronym: "SBTi",
    full: "Science Based Targets initiative",
    tagline: "1.5°C-aligned decarbonisation pathway validation for corporate targets",
    color: "bg-emerald-50 border-emerald-200",
    accentText: "text-emerald-800",
    launched: "2015",
    governedBy: "Partnership: CDP, UNGC, WRI, WWF, and We Mean Business Coalition",
    mandatory: false,
    mandatoryScope: "Voluntary; increasingly required by investors, procurement programmes, and B Corp certification",
    primaryAudience: "Companies setting and validating science-aligned climate targets; investors monitoring net-zero commitments",
    reportingFormat: "Validated targets submitted to SBTi; commitment and progress publicly disclosed on SBTi website",
    updateCycle: "SBTi Corporate Standard updated 2023; Net-Zero Standard published 2021; Sector Pathways updated periodically",
    websiteLabel: "sciencebasedtargets.org",
    websiteUrl: "https://sciencebasedtargets.org",
    summary: "The Science Based Targets initiative (SBTi) provides companies with a clearly defined pathway to reduce greenhouse gas emissions in line with the Paris Agreement's 1.5°C goal. SBTi validates that a company's emissions reduction targets are 'science-based' — meaning they align with the GHG reductions required to limit global warming to 1.5°C. Over 7,000 companies have committed to SBTi, and more than 4,000 have had targets validated.",
    whyItMatters: "SBTi validation is the gold standard for distinguishing credible climate commitments from marketing claims. A company with SBTi-validated targets has demonstrated to an independent third party that its decarbonisation pathway is consistent with limiting global warming to 1.5°C. Without SBTi or equivalent validation, any net-zero or climate target claim is effectively unverified.",
    keyRequirements: [
      { label: "Net-Zero commitment letter", status: "required", detail: "Formal commitment to set science-based targets; 24 months to have targets validated" },
      { label: "Near-term targets (5–10 years)", status: "required", detail: "Emissions reduction targets for Scopes 1 and 2 by 2030; Scope 3 if >40% of total footprint" },
      { label: "Long-term targets (2050)", status: "required", detail: "Net-zero by 2050 or sooner across all Scopes, with ≥90% absolute reduction" },
      { label: "Residual emissions neutralisation", status: "required", detail: "Remaining ≤10% of emissions neutralised through permanent carbon removal (not offset credits)" },
      { label: "Annual progress reporting", status: "required", detail: "Annual disclosure of Scope 1, 2, and 3 emissions against validated targets" },
    ],
    sections: [
      {
        heading: "What 'science-based' means",
        content: "A science-based target is one that aligns with the level of decarbonisation required to meet Paris Agreement temperature goals. SBTi uses the Sectoral Decarbonisation Approach (SDA) and the Absolute Contraction Approach (ACA) to determine the required emission reduction rate for each sector and apply it to individual companies. The key distinction from a non-validated target is that science-based targets specify the rate of reduction (not just a direction) and are independently checked for methodology and ambition.",
      },
      {
        heading: "SBTi Corporate Net-Zero Standard",
        content: "SBTi's Net-Zero Standard (2021) defines corporate net-zero as: a 90–95% absolute reduction in Scope 1, 2, and 3 emissions by 2050 at the latest, with the residual 5–10% neutralised via permanent carbon removal (not offsets). This definition is significantly more demanding than most corporate 'net-zero' claims, which often involve large volumes of low-quality offset credits covering emissions that have not been reduced.",
        bullets: [
          "Scope 1 and 2: 90%+ absolute reduction by 2050 at latest",
          "Scope 3: 90%+ absolute reduction across full value chain",
          "Residual emissions: Only permanent removal (not offset credits) counts",
          "Near-term milestone: ≥50% reduction in Scope 1 and 2 by 2030 is typical requirement",
        ],
      },
      {
        heading: "SBTi flag and the offset controversy",
        content: "In 2024, SBTi published a policy clarification allowing voluntary use of environmental attribute certificates for Scope 3 emission reductions — a controversial move that many climate scientists interpreted as weakening the rigour of the standard. The policy was later partially revised. Investors should check whether a company's SBTi-validated target relies primarily on offsets for Scope 3 reduction or on genuine supply chain decarbonisation.",
      },
    ],
    commonMisconceptions: [
      "An SBTi commitment is not the same as SBTi validation — companies have 24 months after committing to get their targets validated. Check the SBTi website for validation status.",
      "SBTi validation does not mean a company has achieved anything — it means its target is credibly set. Progress towards the target is disclosed annually and varies widely.",
      "Net-zero by 2050 without SBTi validation is unverified — any company can self-declare net-zero targets without independent review.",
    ],
    openESGNote: "OpenESG checks SBTi commitment and validation status for all companies in our universe against the live SBTi database. We flag companies that have committed but not yet validated, and we distinguish between near-term and long-term target status in our environmental score.",
    relatedSlugs: ["tcfd", "issb", "cdp"],
  },

  {
    slug: "pri",
    acronym: "PRI",
    full: "Principles for Responsible Investment",
    tagline: "ESG integration and stewardship expectations for institutional investors",
    color: "bg-sky-50 border-sky-200",
    accentText: "text-sky-800",
    launched: "2006",
    governedBy: "PRI Association (London, United Kingdom); supported by UN Environment Programme and UN Global Compact",
    mandatory: false,
    mandatoryScope: "Voluntary for asset owners and managers; 5,000+ signatories managing $120T+ AUM",
    primaryAudience: "Institutional investors — asset owners, investment managers, service providers",
    reportingFormat: "Annual Reporting Framework — signatories report against the six PRI principles; scores published publicly",
    updateCycle: "PRI Reporting Framework updated annually; last major revision: PRI reporting update 2023",
    websiteLabel: "unpri.org",
    websiteUrl: "https://www.unpri.org",
    summary: "The UN-supported Principles for Responsible Investment (PRI) is a voluntary initiative for investors that have committed to incorporating ESG factors into their investment and ownership decisions. With over 5,000 signatories representing $120T+ in assets under management, PRI is the dominant global framework for responsible investment. PRI signatories commit to six principles covering ESG integration, active ownership, disclosure, industry promotion, regulatory engagement, and reporting.",
    whyItMatters: "For companies seeking investment, understanding what PRI signatories require helps them prioritise their ESG disclosure. PRI signatories are obligated to engage with portfolio companies on ESG issues and to exercise voting rights in alignment with long-term value creation. A company with weak ESG disclosure is at greater risk of ESG-motivated divestment or shareholder resolutions by PRI-signatory investors.",
    keyRequirements: [
      { label: "Principle 1 — ESG integration", status: "required", detail: "Incorporate ESG issues into investment analysis and decision-making processes" },
      { label: "Principle 2 — Active ownership", status: "required", detail: "Exercise ownership rights and practices that reflect ESG considerations" },
      { label: "Principle 3 — Disclosure by investees", status: "required", detail: "Seek appropriate disclosure on ESG issues from investee entities" },
      { label: "Principle 4 — Industry promotion", status: "required", detail: "Promote acceptance and implementation of PRI principles in the investment industry" },
      { label: "Principle 5 — Effectiveness", status: "required", detail: "Work together to enhance effectiveness in implementing PRI principles" },
      { label: "Principle 6 — Reporting", status: "required", detail: "Report on activities and progress towards implementing PRI principles" },
    ],
    sections: [
      {
        heading: "PRI's role in ESG stewardship",
        content: "PRI is primarily an investor framework — not a company reporting standard. Its importance for companies is indirect: PRI signatories are required to conduct active ownership (engagement and voting) on ESG issues. This means a PRI-signatory investor managing €10B in shares has a formal obligation to engage with portfolio companies on ESG matters and to vote shares in alignment with long-term sustainable value creation. ESG-weak companies face increasing stewardship pressure from PRI signatories.",
      },
      {
        heading: "The annual reporting assessment",
        content: "PRI signatories must complete an annual reporting assessment across modules covering investment strategy, governance, policy, and practice for each asset class. Signatories are scored from 1–5 on each module, and scores are publicly available. Poor performance over two consecutive years can result in PRI de-listing — a significant reputational and potentially regulatory consequence for investment firms.",
      },
      {
        heading: "Impact on company ESG strategy",
        content: "The growth of PRI signatories has created a powerful feedback loop: investors with $120T+ AUM require ESG data from companies, which creates incentives for companies to improve ESG disclosure. PRI signatories use direct engagement letters, proxy voting, and collaborative engagement programmes (such as Climate Action 100+) to push for board-level climate risk oversight, Scope 3 disclosure, and executive pay linkage to ESG targets.",
      },
    ],
    commonMisconceptions: [
      "PRI is for investors, not companies. Companies are not PRI signatories — their investors may be.",
      "PRI signatory status does not mean an investment firm is a sustainable investor — it means they have committed to a process, not to a specific ESG outcome.",
      "PRI scores are self-assessed and reported — they are not independently audited in the same way as financial accounts.",
    ],
    openESGNote: "OpenESG tracks which major institutional shareholders of each company are PRI signatories. Companies with a high proportion of PRI-signatory shareholders face greater stewardship pressure for ESG improvement and are more likely to receive climate-related shareholder resolutions.",
    relatedSlugs: ["un-gc", "sbti", "tcfd"],
  },

  {
    slug: "un-gc",
    acronym: "UN GC",
    full: "UN Global Compact",
    tagline: "Ten principles on human rights, labour, environment, and anti-corruption",
    color: "bg-teal-50 border-teal-200",
    accentText: "text-teal-800",
    launched: "2000",
    governedBy: "United Nations Global Compact Office (New York, USA)",
    mandatory: false,
    mandatoryScope: "Voluntary; but violation of UNGC principles is a mandatory PAI indicator under SFDR and a disclosure item under CSRD",
    primaryAudience: "All types of companies — SMEs to multinationals; available to any business",
    reportingFormat: "Annual Communication on Progress (COP) — self-reported against ten principles; due 12 months after joining",
    updateCycle: "Ten Principles established 2000; SDG commitment added 2015; COP Digital platform updated 2023",
    websiteLabel: "unglobalcompact.org",
    websiteUrl: "https://www.unglobalcompact.org",
    summary: "The UN Global Compact (UNGC) is the world's largest corporate sustainability initiative with over 21,000 participating companies across 160+ countries. Companies join voluntarily and commit to aligning their operations and strategies with ten principles derived from the Universal Declaration of Human Rights, ILO Core Conventions, Rio Declaration, and UN Convention Against Corruption. Participation requires an annual Communication on Progress (COP).",
    whyItMatters: "UNGC provides the minimum baseline for human rights, labour, environmental, and anti-corruption commitment that investors and regulators consider a prerequisite for corporate responsibility. Violation of UNGC principles is a mandatory disclosure under SFDR (PAI 13: proportion of portfolio companies violating UNGC norms). Non-participation or lapsed participation is a negative ESG signal — particularly on the G and S pillars.",
    keyRequirements: [
      { label: "Human Rights — Principle 1", status: "required", detail: "Support and respect the protection of internationally proclaimed human rights" },
      { label: "Human Rights — Principle 2", status: "required", detail: "Not be complicit in human rights abuses" },
      { label: "Labour — Principles 3–6", status: "required", detail: "Freedom of association, elimination of forced labour, abolition of child labour, elimination of discrimination" },
      { label: "Environment — Principles 7–9", status: "required", detail: "Precautionary approach to environmental challenges, promote environmental responsibility, encourage eco-friendly technologies" },
      { label: "Anti-Corruption — Principle 10", status: "required", detail: "Work against corruption in all its forms, including extortion and bribery" },
      { label: "Annual Communication on Progress", status: "required", detail: "Publish an annual COP describing actions taken to implement the ten principles; failure results in expulsion" },
    ],
    sections: [
      {
        heading: "The ten principles",
        content: "The UNGC's ten principles are grouped across four categories. Human rights (Principles 1–2) require companies to support human rights and avoid complicity in abuses. Labour (Principles 3–6) are based on ILO fundamental conventions — freedom of association, no forced labour, no child labour, and non-discrimination. Environment (Principles 7–9) require precautionary approaches, environmental responsibility, and adoption of clean technologies. Anti-Corruption (Principle 10) requires companies to work against corruption in all forms.",
      },
      {
        heading: "Communication on Progress",
        content: "Every UNGC participant must publish an annual COP within 12 months of joining and every year thereafter. The COP must describe actions taken to implement the ten principles and requires the CEO to sign a statement of commitment. Failure to submit a COP within two years results in 'non-communicating' status; continued failure results in expulsion from the UNGC and public listing as a non-communicating company.",
      },
      {
        heading: "UNGC and SFDR",
        content: "SFDR requires Article 8 and 9 funds to disclose the proportion of portfolio companies that are involved in violations of UNGC principles (PAI 13) and the proportion without UNGC-aligned compliance processes (PAI 14). This makes UNGC membership and clean COP status a direct financial signal for institutional investors — companies in violation of UNGC norms are a mandatory adverse impact disclosure item for regulated European funds.",
      },
    ],
    commonMisconceptions: [
      "UNGC membership does not mean a company has achieved its principles — it means it has committed to work towards them and reports progress annually.",
      "The COP process is self-reported — UNGC does not independently audit compliance with the ten principles.",
      "A company can be UNGC-listed but still involved in supply chain human rights violations — the principles apply to a company's own operations and those they can reasonably influence.",
    ],
    openESGNote: "OpenESG tracks UNGC participation status and COP submission history for all companies in our universe. We flag any company with 'non-communicating' status or documented UNGC principle violations — both are direct inputs to our Social and Governance scores.",
    relatedSlugs: ["gri", "un-sdgs", "pri"],
  },
];

export function getFramework(slug: string): FrameworkData | undefined {
  return frameworks.find((f) => f.slug === slug);
}
