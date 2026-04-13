export const company = {
  name: "Run Retained",
  legalName: "Banti Software Inc.",
  url: "https://runretained.com",
  contactEmail: "hello@runretained.com",
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
    title: "Intake prep in minutes",
    description:
      "Open a search and get a tailored question set, call agenda, and prep brief — adapted by role level and function. Every question maps to a downstream mandate field so nothing gets lost between the call and the spec.",
    icon: "clipboard",
  },
  {
    id: "mandate-drafting",
    title: "Mandates that write themselves",
    description:
      "Capture intake answers and watch the mandate draft populate — requirements, scoring criteria, comp parameters, timeline, and stakeholder map. Review, refine, and lock. The scoring framework derives automatically.",
    icon: "file-text",
  },
  {
    id: "outreach-generation",
    title: "Personalized outreach at scale",
    description:
      "Generate candidate-specific outreach grounded in the mandate and the candidate's background. Every message is editable before it goes out. Follow-ups adapt based on response context.",
    icon: "send",
  },
  {
    id: "signal-extraction",
    title: "Signals from every conversation",
    description:
      "Screens, debriefs, and reference checks are parsed into structured signals — typed, confidence-scored, and linked to mandate requirements. Contradictions surface automatically so nothing hides in notes.",
    icon: "zap",
  },
  {
    id: "defense-briefs",
    title: "Defense briefs that build themselves",
    description:
      "When a candidate clears scoring thresholds and signal verification, the system assembles an evidence-backed presentation. Every claim traces to a source. Review, approve, and deliver from one place.",
    icon: "shield",
  },
  {
    id: "scoring-analysis",
    title: "Know where every candidate stands",
    description:
      "Mandate fit, critical coverage, unknown gaps, and deal-breakers — computed across the entire pipeline. See who needs verification, who is ready to present, and who is blocked.",
    icon: "bar-chart",
  },
];

export const workflowFeatures = [
  {
    title: "Nothing skips a step",
    description:
      "Every candidate moves through a defined lifecycle. The system enforces prerequisites — a candidate cannot be presented without a complete scorecard, verified critical signals, and an approved defense brief.",
  },
  {
    title: "Full audit trail",
    description:
      "Every transition, every decision, every artifact — logged with attribution and timestamp. Replay any search from intake to close. Nothing is deleted or overwritten.",
  },
  {
    title: "Mandates that version cleanly",
    description:
      "When requirements change, the system creates a new mandate version and flags existing scores for re-evaluation. Prior versions are preserved. You always know what the spec was when a decision was made.",
  },
  {
    title: "Scores require evidence",
    description:
      "Every candidate score links to supporting signals. No more unsupported gut calls. Recruiter judgment stays authoritative — it just has to show its work.",
  },
];

export const howItWorks = [
  {
    step: "01",
    title: "Open a search",
    description:
      "Create a search request and get an AI-generated intake prep pack — question set, call agenda, and role brief — ready before the client conversation.",
  },
  {
    step: "02",
    title: "Lock the mandate",
    description:
      "Capture intake answers in structured form. The mandate draft populates automatically. Refine it, get partner sign-off, and lock. The scoring framework follows.",
  },
  {
    step: "03",
    title: "Run the search",
    description:
      "Add candidates, generate outreach, capture responses, log screens and debriefs. Every interaction feeds the intelligence layer. Signals surface and link to requirements automatically.",
  },
  {
    step: "04",
    title: "Evaluate and present",
    description:
      "Score candidates against the mandate with evidence-linked assessments. Defense briefs generate when prerequisites are met. Present the slate with full provenance behind every recommendation.",
  },
  {
    step: "05",
    title: "Close with a complete record",
    description:
      "Client feedback loops back in. Interviews, offers, and outcomes are tracked. When the search closes, you have a replayable history — not a folder of emails.",
  },
];

export const partnerInsights = [
  "Which searches have stale candidates",
  "Where outreach has gone cold",
  "Which mandates have coverage gaps",
  "What is blocked and why",
  "Which artifacts are waiting on approval",
  "Candidate pipeline velocity by stage",
];

export const faq = [
  {
    q: "Who is this built for?",
    a: "Retained executive search firms that run structured, high-touch engagements. If you care about process integrity, evidence quality, and being able to defend every recommendation to a client, this is built for you.",
  },
  {
    q: "Does AI replace the recruiter?",
    a: "No. AI drafts, extracts, and analyzes. Recruiters lock mandates, score candidates, approve artifacts, and advance the pipeline. The system ensures every judgment is supported by evidence — it does not make decisions for you.",
  },
  {
    q: "What is a mandate?",
    a: "The mandate is the specification for a search — it defines what 'good' looks like. Requirements are structured into must-haves, core competencies, contextual factors, and anti-signals. It is versioned, locked before candidates enter the pipeline, and seeds the scoring framework automatically.",
  },
  {
    q: "How are candidates scored?",
    a: "Recruiters score each candidate on a 1-5 scale per requirement axis, with every score linked to supporting signals. The system also computes coverage metrics — mandate fit, critical coverage, gaps, and deal-breakers — to surface who is ready and who needs work.",
  },
  {
    q: "Can multiple team members work on the same search?",
    a: "Yes. Searches support team assignments with role-based access. Partners approve mandates and client-facing artifacts. Recruiters run execution. Every action is attributed.",
  },
  {
    q: "Is client data isolated?",
    a: "The system is multi-tenant from the ground up. Every record is scoped to your firm. There is no cross-tenant visibility. Candidate profiles are shared within your firm, but performance data is always scoped to a specific search.",
  },
  {
    q: "What happens when requirements change mid-search?",
    a: "The system creates a new mandate version, freezes the prior one, and flags existing scores for re-evaluation against the updated requirements. Nothing is lost — you can see exactly what changed and when.",
  },
  {
    q: "Are AI-generated documents sent directly to clients?",
    a: "Never. Every artifact goes through a review and approval flow before delivery. The inputs that generated it are captured as an immutable snapshot. If you regenerate, it creates a new version — the old one is preserved.",
  },
];
