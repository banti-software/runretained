export const company = {
  name: "Run Retained",
  legalName: "Banti Software Inc.",
  url: "https://runretained.com",
};

export const seo = {
  title: "Run Retained — AI-Powered Executive Search Platform",
  description:
    "The operating system for retained executive search. AI-powered intake, mandate drafting, candidate evaluation, and artifact generation — all inside a governed workflow.",
  ogDescription:
    "AI-powered execution for retained executive search. Structure every search from intake to close.",
};

export const aiCapabilities = [
  {
    id: "intake-prep",
    title: "Intake Prep Generation",
    description:
      "Opens a search request and instantly produces a tailored question set, call agenda, and prep brief — differentiated by level and function, with every question mapped to a downstream mandate field.",
  },
  {
    id: "mandate-drafting",
    title: "Mandate Drafting",
    description:
      "Captures structured intake answers and pre-populates a full mandate draft — requirements, scoring framework, comp parameters, timeline, and stakeholder map — ready for recruiter refinement.",
  },
  {
    id: "outreach-generation",
    title: "Outreach Generation",
    description:
      "Drafts personalized candidate outreach grounded in the mandate and candidate context. Every message is reviewable and editable before delivery.",
  },
  {
    id: "signal-extraction",
    title: "Signal Extraction",
    description:
      "Parses screens, debriefs, and interactions to surface structured signals — typed, confidence-scored, and linked to specific mandate requirements. Contradictions are flagged automatically.",
  },
  {
    id: "defense-briefs",
    title: "Defense Brief Generation",
    description:
      "Assembles evidence-backed candidate presentations when scoring thresholds, signal verification, and mandate coverage requirements are met. Every claim traces to a source.",
  },
  {
    id: "scoring-analysis",
    title: "Coverage & Fit Analysis",
    description:
      "Computes mandate fit, critical coverage, unknown burden, and gate failures across every candidate in the pipeline. Surfaces verification priorities and decision band recommendations.",
  },
];

export const workflowFeatures = [
  {
    title: "Governed lifecycle states",
    description:
      "Every search, mandate, candidate, signal, and artifact follows a defined state machine with server-enforced gates. No shortcuts, no skipped steps.",
  },
  {
    title: "Append-only audit trail",
    description:
      "Every transition across every object is logged immutably. Full replay from intake to close. Nothing is deleted or overwritten.",
  },
  {
    title: "Versioned mandates",
    description:
      "The mandate is the source of truth. Revisions create new versions, freeze prior ones, and flag existing scores for re-evaluation automatically.",
  },
  {
    title: "Evidence-linked scoring",
    description:
      "Every candidate score requires linked supporting signals. No unsupported judgments. Scoring is human-driven but evidence-backed.",
  },
];

export const howItWorks = [
  {
    step: "01",
    title: "Open a search",
    description:
      "Create a search request. AI generates an intake prep pack — question set, call agenda, and prep brief — tailored to the role level and function.",
  },
  {
    step: "02",
    title: "Lock the mandate",
    description:
      "Capture intake answers in structured form. AI pre-populates the mandate draft. Refine requirements, lock it, and the scoring framework is derived automatically.",
  },
  {
    step: "03",
    title: "Run the pipeline",
    description:
      "Add candidates, generate outreach, capture responses, log screens and debriefs. AI extracts signals from every interaction and links them to mandate requirements.",
  },
  {
    step: "04",
    title: "Evaluate and present",
    description:
      "Score candidates against the mandate with evidence-linked assessments. When prerequisites are met, AI generates defense briefs. Present the slate with full provenance.",
  },
  {
    step: "05",
    title: "Close with a record",
    description:
      "Capture client feedback, advance through interviews and offers, close the search. Every transition and artifact is tracked — replayable history from day one.",
  },
];

export const faq = [
  {
    q: "What kind of search firms is this built for?",
    a: "Run Retained is designed for retained executive search firms that run structured, high-touch engagements. If your searches follow a defined process from intake through close, and you care about evidence quality and auditability, this is built for you.",
  },
  {
    q: "Does AI replace recruiter judgment?",
    a: "No. AI handles drafting, extraction, and analysis. Recruiters make every decision — locking mandates, scoring candidates, approving artifacts, advancing the pipeline. The system enforces that human judgment is supported by evidence, not replaced by automation.",
  },
  {
    q: "How does the mandate work?",
    a: "The mandate defines what 'good' looks like for a search. It captures requirements across four categories — must-have, core, contextual, and anti-signals — each with typed signal linkage and scoring anchors. It is versioned and locked before candidates enter the pipeline.",
  },
  {
    q: "What are signals?",
    a: "Signals are atomic units of intelligence extracted from interactions — calls, emails, debriefs, reference checks. Each signal has a type, confidence score, provenance, freshness, and verification state. They are the evidence layer that supports every candidate score.",
  },
  {
    q: "Can multiple people work on the same search?",
    a: "Yes. Searches support team assignments with role-based access. Partners have oversight and approval authority. Recruiters run execution. Every action is attributed and logged.",
  },
  {
    q: "Is candidate data isolated between clients?",
    a: "The system is multi-tenant from the ground up. Every record is scoped to a tenant. There is no cross-tenant visibility. Candidate identity records are global within a tenant, but performance data is always scoped to a specific search.",
  },
  {
    q: "What happens when a mandate changes mid-search?",
    a: "Mandate revision creates a new version and freezes the prior one. When the new version locks, existing candidate scores are automatically flagged for re-evaluation against the updated requirements. Nothing is lost.",
  },
  {
    q: "Are AI-generated artifacts sent directly to clients?",
    a: "Never. Every artifact — defense briefs, outreach, reports — goes through a review and approval flow before delivery. Input snapshots are immutable. Regeneration creates a new artifact, not a mutation.",
  },
];
