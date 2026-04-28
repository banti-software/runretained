"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/* ─────────────── Types ─────────────── */

export type Phase = "Define" | "Source" | "Assess" | "Present" | "Close";
export type Stage =
  | "Identified"
  | "Contacted"
  | "Screened"
  | "Evaluated"
  | "Slated"
  | "Interviewing"
  | "Offer"
  | "Hired"
  | "Passed";

export type Search = {
  id: string;
  title: string;
  client: string;
  phase: Phase;
  mandateLocked: boolean;
  mandateVersion: number;
  presentedCount: number;
};

export type Candidate = {
  id: string;
  searchId: string;
  name: string;
  role: string;
  stage: Stage;
  score: number | null;
  coverage: number | null;
};

export type Requirement = {
  id: string;
  searchId: string;
  text: string;
  bucket: "Must-have" | "Core" | "Contextual" | "Anti-signal";
  weight: "Gate" | "High" | "Medium" | "Low" | "Flag";
};

export type Signal = {
  id: string;
  candidateId: string;
  text: string;
  source: string;
  requirement: string;
  confidence: "High" | "Medium" | "Low";
  status: "Verified" | "Unverified";
};

export type Screen = {
  id: string;
  candidateId: string;
  date: string;
  duration: string;
  canThey: "Strong" | "Moderate" | "Weak" | "Unknown";
  willThey: "Strong" | "Moderate" | "Weak" | "Unknown";
  canClose: "Strong" | "Moderate" | "Weak" | "Unknown";
  disposition: "Advance" | "Hold" | "Pass";
};

export type OutreachStep = {
  id: string;
  candidateId: string;
  channel: "Email" | "LinkedIn" | "Referral" | "Phone";
  step: string;
  sent: string;
  status: "Pending" | "Responded" | "Declined";
};

export type Company = {
  id: string;
  searchId: string;
  name: string;
  status: "Active" | "Paused";
};

export type Exclusion = {
  id: string;
  searchId: string;
  name: string;
  reason: string;
};

export type Archetype = {
  id: string;
  searchId: string;
  label: string;
  description: string;
};

export type Artifact = {
  id: string;
  searchId: string;
  name: string;
  type: string;
  status: "Draft" | "In review" | "Approved" | "Locked" | "Active" | "Current" | "Complete";
  date: string;
};

export type Interview = {
  id: string;
  candidateId: string;
  round: string;
  with: string;
  date: string;
  time: string;
  status: "Scheduled" | "Complete" | "Cancelled";
  feedbackCaptured: boolean;
};

export type Finalist = {
  candidateId: string;
  conviction: { client: "High" | "Moderate" | "Low"; candidate: "High" | "Moderate" | "Low" };
  competitive: string;
  counterofferRisk: "Low" | "Medium" | "High";
  concerns: string;
  stage: string;
};

export type Approval = {
  id: string;
  item: string;
  search: string;
  type: string;
};

export type CalibrationItem = { id: string; searchId: string; label: string; done: boolean };
export type DriftCheck = { id: string; searchId: string; check: string; status: "Aligned" | "Drifted" };

export type TeamMember = { id: string; name: string; email: string; role: "Partner" | "Recruiter" | "Coordinator" };
export type Firm = { name: string; email: string };

export type Activity = { id: string; searchId: string | null; text: string; at: number };

/* ─────────────── Store shape ─────────────── */

type State = {
  firm: Firm;
  team: TeamMember[];
  searches: Search[];
  activeSearchId: string;
  candidates: Candidate[];
  requirements: Requirement[];
  signals: Signal[];
  screens: Screen[];
  outreach: OutreachStep[];
  companies: Company[];
  exclusions: Exclusion[];
  archetypes: Archetype[];
  artifacts: Artifact[];
  interviews: Interview[];
  finalists: Finalist[];
  approvals: Approval[];
  calibration: CalibrationItem[];
  drift: DriftCheck[];
  activity: Activity[];
};

const STORAGE_KEY = "rr-dashboard-v1";

const uid = () => Math.random().toString(36).slice(2, 10);

/* ─────────────── Seed data ─────────────── */

const SEARCH_VPE = "s_vpe";
const SEARCH_CFO = "s_cfo";
const SEARCH_HOP = "s_hop";
const SEARCH_CTO = "s_cto";

const seed: State = {
  firm: { name: "Demo Firm", email: "ops@demofirm.com" },
  team: [
    { id: "t1", name: "Jason Datta", email: "jason@demofirm.com", role: "Partner" },
    { id: "t2", name: "Sarah Lin", email: "sarah@demofirm.com", role: "Recruiter" },
    { id: "t3", name: "Michael Torres", email: "michael@demofirm.com", role: "Recruiter" },
  ],
  searches: [
    { id: SEARCH_VPE, title: "VP Engineering", client: "Acme Corp", phase: "Assess", mandateLocked: true, mandateVersion: 2, presentedCount: 2 },
    { id: SEARCH_CFO, title: "CFO", client: "Beacon Health", phase: "Source", mandateLocked: false, mandateVersion: 1, presentedCount: 0 },
    { id: SEARCH_HOP, title: "Head of Product", client: "Nova Labs", phase: "Define", mandateLocked: false, mandateVersion: 1, presentedCount: 0 },
    { id: SEARCH_CTO, title: "CTO", client: "Ridge Financial", phase: "Define", mandateLocked: false, mandateVersion: 1, presentedCount: 0 },
  ],
  activeSearchId: SEARCH_VPE,
  candidates: [
    { id: "c_priya", searchId: SEARCH_VPE, name: "Priya Sharma", role: "SVP Eng, Public Co", stage: "Evaluated", score: 4.5, coverage: 92 },
    { id: "c_sarah", searchId: SEARCH_VPE, name: "Sarah Chen", role: "VP Eng, Series D Fintech", stage: "Evaluated", score: 4.2, coverage: 87 },
    { id: "c_marcus", searchId: SEARCH_VPE, name: "Marcus Rivera", role: "CTO, Growth-stage SaaS", stage: "Screened", score: 3.8, coverage: 61 },
    { id: "c_alex", searchId: SEARCH_VPE, name: "Alex Kim", role: "VP Eng, E-commerce", stage: "Contacted", score: null, coverage: null },
    { id: "c_jordan", searchId: SEARCH_VPE, name: "Jordan Hayes", role: "Dir Eng, Infra", stage: "Screened", score: 3.5, coverage: 48 },
    { id: "c_nina", searchId: SEARCH_VPE, name: "Nina Patel", role: "VP Platform, Fintech", stage: "Contacted", score: null, coverage: null },
    { id: "c_david", searchId: SEARCH_VPE, name: "David Park", role: "CTO, Series C", stage: "Identified", score: null, coverage: null },
    { id: "c_lisa", searchId: SEARCH_VPE, name: "Lisa Wang", role: "SVP Eng, Public Infra Co", stage: "Screened", score: 3.9, coverage: 65 },
  ],
  requirements: [
    { id: uid(), searchId: SEARCH_VPE, text: "10+ years engineering leadership at scale (500+ eng org)", bucket: "Must-have", weight: "Gate" },
    { id: uid(), searchId: SEARCH_VPE, text: "Experience building and shipping developer platforms", bucket: "Must-have", weight: "Gate" },
    { id: uid(), searchId: SEARCH_VPE, text: "Track record of M&A technical integration", bucket: "Must-have", weight: "Gate" },
    { id: uid(), searchId: SEARCH_VPE, text: "Public company board and investor communication", bucket: "Must-have", weight: "Gate" },
    { id: uid(), searchId: SEARCH_VPE, text: "Deep infrastructure and reliability background", bucket: "Core", weight: "High" },
    { id: uid(), searchId: SEARCH_VPE, text: "Experience with AI/ML team building", bucket: "Core", weight: "High" },
    { id: uid(), searchId: SEARCH_VPE, text: "Prior role at a company with $500M+ revenue", bucket: "Core", weight: "Medium" },
    { id: uid(), searchId: SEARCH_VPE, text: "International team management", bucket: "Core", weight: "Medium" },
    { id: uid(), searchId: SEARCH_VPE, text: "Enterprise sales engineering partnership", bucket: "Core", weight: "Medium" },
    { id: uid(), searchId: SEARCH_VPE, text: "YC or top-tier startup background", bucket: "Contextual", weight: "Low" },
    { id: uid(), searchId: SEARCH_VPE, text: "Specific vertical expertise (fintech, healthtech)", bucket: "Contextual", weight: "Low" },
    { id: uid(), searchId: SEARCH_VPE, text: "Micromanager or individual contributor mindset", bucket: "Anti-signal", weight: "Flag" },
    { id: uid(), searchId: SEARCH_VPE, text: "No experience beyond Series A scale", bucket: "Anti-signal", weight: "Flag" },
  ],
  signals: [
    { id: uid(), candidateId: "c_sarah", text: "Led engineering org from 200 to 600 engineers over 3 years", source: "Screen — Apr 8", requirement: "500+ eng org leadership", confidence: "High", status: "Verified" },
    { id: uid(), candidateId: "c_sarah", text: "Built internal developer platform used by 400+ engineers", source: "Screen — Apr 8", requirement: "Developer platform experience", confidence: "High", status: "Verified" },
    { id: uid(), candidateId: "c_sarah", text: "Managed 3 post-acquisition integrations", source: "Reference — Apr 10", requirement: "M&A integration", confidence: "High", status: "Verified" },
    { id: uid(), candidateId: "c_sarah", text: "Compensation expectation $450-500K base", source: "Screen — Apr 8", requirement: "Comp parameters", confidence: "Medium", status: "Unverified" },
    { id: uid(), candidateId: "c_marcus", text: "Prefers hands-on IC work over delegation", source: "Screen — Apr 9", requirement: "Anti-signal: IC mindset", confidence: "Medium", status: "Unverified" },
    { id: uid(), candidateId: "c_marcus", text: "No public company experience beyond advisory", source: "Screen — Apr 9", requirement: "Board communication", confidence: "High", status: "Verified" },
    { id: uid(), candidateId: "c_jordan", text: "Currently in late-stage process with competitor", source: "Screen — Apr 10", requirement: "Competitive process", confidence: "Medium", status: "Unverified" },
  ],
  screens: [
    { id: uid(), candidateId: "c_sarah", date: "Apr 8", duration: "45 min", canThey: "Strong", willThey: "Strong", canClose: "Moderate", disposition: "Advance" },
    { id: uid(), candidateId: "c_marcus", date: "Apr 9", duration: "40 min", canThey: "Strong", willThey: "Moderate", canClose: "Unknown", disposition: "Advance" },
    { id: uid(), candidateId: "c_jordan", date: "Apr 10", duration: "35 min", canThey: "Moderate", willThey: "Strong", canClose: "Strong", disposition: "Hold" },
    { id: uid(), candidateId: "c_lisa", date: "Apr 11", duration: "50 min", canThey: "Strong", willThey: "Strong", canClose: "Moderate", disposition: "Advance" },
  ],
  outreach: [
    { id: uid(), candidateId: "c_sarah", channel: "Email", step: "Initial", sent: "Apr 7", status: "Responded" },
    { id: uid(), candidateId: "c_marcus", channel: "LinkedIn", step: "Follow-up 1", sent: "Apr 10", status: "Responded" },
    { id: uid(), candidateId: "c_alex", channel: "Email", step: "Initial", sent: "Apr 11", status: "Pending" },
    { id: uid(), candidateId: "c_jordan", channel: "Email", step: "Follow-up 2", sent: "Apr 9", status: "Responded" },
    { id: uid(), candidateId: "c_nina", channel: "LinkedIn", step: "Initial", sent: "Apr 12", status: "Pending" },
    { id: uid(), candidateId: "c_david", channel: "Referral", step: "Intro", sent: "Apr 11", status: "Pending" },
  ],
  companies: [
    { id: uid(), searchId: SEARCH_VPE, name: "Stripe", status: "Active" },
    { id: uid(), searchId: SEARCH_VPE, name: "Datadog", status: "Active" },
    { id: uid(), searchId: SEARCH_VPE, name: "Snowflake", status: "Active" },
    { id: uid(), searchId: SEARCH_VPE, name: "Cloudflare", status: "Active" },
    { id: uid(), searchId: SEARCH_VPE, name: "HashiCorp", status: "Active" },
  ],
  exclusions: [
    { id: uid(), searchId: SEARCH_VPE, name: "Acme Corp", reason: "Client company" },
    { id: uid(), searchId: SEARCH_VPE, name: "Veritas Systems", reason: "Off-limits (existing relationship)" },
    { id: uid(), searchId: SEARCH_VPE, name: "Pinnacle Tech", reason: "Recent placement — 12-month no-recruit" },
  ],
  archetypes: [
    { id: uid(), searchId: SEARCH_VPE, label: "Scale operator", description: "Led 500+ eng org through hyper-growth, shipping at speed with reliability" },
    { id: uid(), searchId: SEARCH_VPE, label: "Platform builder", description: "Built internal developer platforms that accelerated team output" },
    { id: uid(), searchId: SEARCH_VPE, label: "M&A integrator", description: "Successfully merged engineering orgs post-acquisition" },
  ],
  artifacts: [
    { id: uid(), searchId: SEARCH_VPE, name: "Search Mandate v2", type: "Mandate", status: "Locked", date: "Apr 5" },
    { id: uid(), searchId: SEARCH_VPE, name: "Candidate Opportunity Brief", type: "Role brief", status: "Approved", date: "Apr 6" },
    { id: uid(), searchId: SEARCH_VPE, name: "Intake Question Set", type: "Intake", status: "Complete", date: "Apr 3" },
    { id: uid(), searchId: SEARCH_VPE, name: "Defense Brief — Priya Sharma", type: "Defense brief", status: "Approved", date: "Apr 11" },
    { id: uid(), searchId: SEARCH_VPE, name: "Defense Brief — Sarah Chen", type: "Defense brief", status: "In review", date: "Apr 12" },
    { id: uid(), searchId: SEARCH_VPE, name: "Outreach Sequence — Wave 1", type: "Outreach", status: "Active", date: "Apr 7" },
    { id: uid(), searchId: SEARCH_VPE, name: "Market Map v1", type: "Market map", status: "Current", date: "Apr 6" },
    { id: uid(), searchId: SEARCH_VPE, name: "Assessment Rubric", type: "Scorecard", status: "Locked", date: "Apr 5" },
  ],
  interviews: [
    { id: uid(), candidateId: "c_priya", round: "Final", with: "CEO, VP Product", date: "Apr 15", time: "2:00 PM", status: "Scheduled", feedbackCaptured: false },
    { id: uid(), candidateId: "c_sarah", round: "Round 2", with: "CTO, VP Infra", date: "Apr 14", time: "10:00 AM", status: "Scheduled", feedbackCaptured: false },
    { id: uid(), candidateId: "c_marcus", round: "Round 1", with: "VP Product", date: "Apr 12", time: "3:00 PM", status: "Complete", feedbackCaptured: true },
    { id: uid(), candidateId: "c_lisa", round: "Round 1", with: "CTO", date: "Apr 11", time: "11:00 AM", status: "Complete", feedbackCaptured: false },
  ],
  finalists: [
    {
      candidateId: "c_priya",
      conviction: { client: "High", candidate: "High" },
      competitive: "No active processes",
      counterofferRisk: "Low",
      concerns: "Relocation timeline (2 months)",
      stage: "Offer strategy",
    },
    {
      candidateId: "c_sarah",
      conviction: { client: "High", candidate: "Moderate" },
      competitive: "Late-stage at one other company",
      counterofferRisk: "Medium",
      concerns: "Equity expectations above range",
      stage: "References",
    },
  ],
  approvals: [
    { id: uid(), item: "Defense Brief — Sarah Chen", search: "VP Engineering", type: "Artifact approval" },
    { id: uid(), item: "Mandate v1 lock", search: "CFO — Beacon Health", type: "Mandate approval" },
    { id: uid(), item: "Scope change — expanded geo", search: "Head of Product", type: "Scope change" },
  ],
  calibration: [
    { id: uid(), searchId: SEARCH_VPE, label: "Search thesis reviewed", done: true },
    { id: uid(), searchId: SEARCH_VPE, label: "Target company map approved", done: true },
    { id: uid(), searchId: SEARCH_VPE, label: "Compensation positioning confirmed", done: true },
    { id: uid(), searchId: SEARCH_VPE, label: "Screening criteria locked", done: false },
    { id: uid(), searchId: SEARCH_VPE, label: "Outreach narrative approved", done: false },
  ],
  drift: [
    { id: uid(), searchId: SEARCH_VPE, check: "Must-have requirements match original calibration", status: "Aligned" },
    { id: uid(), searchId: SEARCH_VPE, check: "Compensation range unchanged from approval", status: "Aligned" },
    { id: uid(), searchId: SEARCH_VPE, check: "Target company list matches approved map", status: "Aligned" },
    { id: uid(), searchId: SEARCH_VPE, check: "Timeline expectations consistent", status: "Drifted" },
  ],
  activity: [
    { id: uid(), searchId: SEARCH_VPE, text: "Defense brief generated for Sarah Chen", at: Date.now() - 2 * 60 * 1000 },
    { id: uid(), searchId: SEARCH_VPE, text: "Screen logged for Jordan Hayes", at: Date.now() - 60 * 60 * 1000 },
    { id: uid(), searchId: SEARCH_VPE, text: "Outreach sent to 3 candidates", at: Date.now() - 3 * 60 * 60 * 1000 },
    { id: uid(), searchId: SEARCH_VPE, text: "Mandate v2 locked by Jason Datta", at: Date.now() - 24 * 60 * 60 * 1000 },
    { id: uid(), searchId: SEARCH_VPE, text: "Signal extracted from Priya Sharma debrief", at: Date.now() - 25 * 60 * 60 * 1000 },
  ],
};

/* ─────────────── Context ─────────────── */

type Ctx = {
  state: State;
  activeSearch: Search;
  setActiveSearch: (id: string) => void;

  addSearch: (s: { title: string; client: string }) => void;

  addCandidate: (c: { name: string; role: string; stage?: Stage }) => Candidate;
  updateCandidate: (id: string, patch: Partial<Omit<Candidate, "id" | "searchId">>) => void;
  removeCandidate: (id: string) => void;

  addRequirement: (r: Omit<Requirement, "id" | "searchId">) => void;
  removeRequirement: (id: string) => void;
  lockMandate: () => void;

  addSignal: (s: Omit<Signal, "id" | "status">) => void;
  toggleSignalVerified: (id: string) => void;

  addScreen: (s: Omit<Screen, "id">) => void;

  addOutreach: (o: Omit<OutreachStep, "id" | "status">) => void;
  setOutreachStatus: (id: string, status: OutreachStep["status"]) => void;

  addCompany: (name: string) => void;
  addExclusion: (name: string, reason: string) => void;

  addArtifact: (a: Omit<Artifact, "id" | "searchId" | "date" | "status">) => void;

  addInterview: (i: Omit<Interview, "id" | "status" | "feedbackCaptured">) => void;
  rescheduleInterview: (id: string, date: string, time: string) => void;
  captureFeedback: (id: string) => void;

  toggleCalibration: (id: string) => void;
  approveItem: (id: string) => void;
  dismissApproval: (id: string) => void;

  saveFirm: (firm: Firm) => void;
  inviteMember: (m: Omit<TeamMember, "id">) => void;
  updateMember: (id: string, patch: Partial<TeamMember>) => void;

  logActivity: (text: string) => void;

  candidatesInActiveSearch: Candidate[];
  requirementsInActiveSearch: Requirement[];
  artifactsInActiveSearch: Artifact[];
  companiesInActiveSearch: Company[];
  exclusionsInActiveSearch: Exclusion[];
  archetypesInActiveSearch: Archetype[];
  calibrationInActiveSearch: CalibrationItem[];
  driftInActiveSearch: DriftCheck[];
  activityInActiveSearch: Activity[];
  signalsInActiveSearch: Signal[];
  screensInActiveSearch: Screen[];
  outreachInActiveSearch: OutreachStep[];
  interviewsInActiveSearch: Interview[];

  candidateById: (id: string) => Candidate | undefined;
};

const StoreContext = createContext<Ctx | null>(null);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>(seed);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let parsed: State | null = null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) parsed = JSON.parse(raw) as State;
    } catch {
      // ignore corrupted storage
    }
    if (parsed) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState(parsed);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore quota errors
    }
  }, [state, hydrated]);

  const activeSearch = useMemo(
    () => state.searches.find((s) => s.id === state.activeSearchId) ?? state.searches[0],
    [state.searches, state.activeSearchId]
  );

  const logActivity = useCallback((text: string) => {
    setState((prev) => ({
      ...prev,
      activity: [
        { id: uid(), searchId: prev.activeSearchId, text, at: Date.now() },
        ...prev.activity,
      ].slice(0, 50),
    }));
  }, []);

  const setActiveSearch = useCallback((id: string) => {
    setState((prev) => ({ ...prev, activeSearchId: id }));
  }, []);

  const addSearch: Ctx["addSearch"] = useCallback((s) => {
    const id = uid();
    setState((prev) => ({
      ...prev,
      searches: [
        ...prev.searches,
        { id, title: s.title, client: s.client, phase: "Define", mandateLocked: false, mandateVersion: 1, presentedCount: 0 },
      ],
      activeSearchId: id,
      activity: [
        { id: uid(), searchId: id, text: `New search created: ${s.title} — ${s.client}`, at: Date.now() },
        ...prev.activity,
      ],
    }));
  }, []);

  const addCandidate: Ctx["addCandidate"] = useCallback((c) => {
    const cand: Candidate = {
      id: "c_" + uid(),
      searchId: state.activeSearchId,
      name: c.name,
      role: c.role,
      stage: c.stage ?? "Identified",
      score: null,
      coverage: null,
    };
    setState((prev) => ({
      ...prev,
      candidates: [cand, ...prev.candidates],
      activity: [
        { id: uid(), searchId: prev.activeSearchId, text: `Candidate added: ${c.name}`, at: Date.now() },
        ...prev.activity,
      ],
    }));
    return cand;
  }, [state.activeSearchId]);

  const updateCandidate: Ctx["updateCandidate"] = useCallback((id, patch) => {
    setState((prev) => ({
      ...prev,
      candidates: prev.candidates.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    }));
  }, []);

  const removeCandidate: Ctx["removeCandidate"] = useCallback((id) => {
    setState((prev) => {
      const cand = prev.candidates.find((c) => c.id === id);
      return {
        ...prev,
        candidates: prev.candidates.filter((c) => c.id !== id),
        signals: prev.signals.filter((s) => s.candidateId !== id),
        screens: prev.screens.filter((s) => s.candidateId !== id),
        outreach: prev.outreach.filter((o) => o.candidateId !== id),
        interviews: prev.interviews.filter((i) => i.candidateId !== id),
        activity: cand
          ? [{ id: uid(), searchId: prev.activeSearchId, text: `Removed candidate: ${cand.name}`, at: Date.now() }, ...prev.activity]
          : prev.activity,
      };
    });
  }, []);

  const addRequirement: Ctx["addRequirement"] = useCallback((r) => {
    setState((prev) => ({
      ...prev,
      requirements: [...prev.requirements, { id: uid(), searchId: prev.activeSearchId, ...r }],
      activity: [
        { id: uid(), searchId: prev.activeSearchId, text: `Requirement added: ${r.text.slice(0, 60)}`, at: Date.now() },
        ...prev.activity,
      ],
    }));
  }, []);

  const removeRequirement: Ctx["removeRequirement"] = useCallback((id) => {
    setState((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((r) => r.id !== id),
    }));
  }, []);

  const lockMandate: Ctx["lockMandate"] = useCallback(() => {
    setState((prev) => ({
      ...prev,
      searches: prev.searches.map((s) =>
        s.id === prev.activeSearchId
          ? { ...s, mandateLocked: true, mandateVersion: s.mandateVersion + (s.mandateLocked ? 1 : 0) }
          : s
      ),
      activity: [
        { id: uid(), searchId: prev.activeSearchId, text: `Mandate locked`, at: Date.now() },
        ...prev.activity,
      ],
    }));
  }, []);

  const addSignal: Ctx["addSignal"] = useCallback((s) => {
    setState((prev) => ({
      ...prev,
      signals: [{ id: uid(), status: "Unverified", ...s }, ...prev.signals],
      activity: [
        { id: uid(), searchId: prev.activeSearchId, text: `Signal added: ${s.text.slice(0, 60)}`, at: Date.now() },
        ...prev.activity,
      ],
    }));
  }, []);

  const toggleSignalVerified: Ctx["toggleSignalVerified"] = useCallback((id) => {
    setState((prev) => ({
      ...prev,
      signals: prev.signals.map((s) =>
        s.id === id ? { ...s, status: s.status === "Verified" ? "Unverified" : "Verified" } : s
      ),
    }));
  }, []);

  const addScreen: Ctx["addScreen"] = useCallback((s) => {
    setState((prev) => {
      const cand = prev.candidates.find((c) => c.id === s.candidateId);
      return {
        ...prev,
        screens: [{ id: uid(), ...s }, ...prev.screens],
        candidates: prev.candidates.map((c) =>
          c.id === s.candidateId && c.stage === "Contacted"
            ? { ...c, stage: "Screened" }
            : c
        ),
        activity: [
          {
            id: uid(),
            searchId: prev.activeSearchId,
            text: `Screen logged for ${cand?.name ?? "candidate"}`,
            at: Date.now(),
          },
          ...prev.activity,
        ],
      };
    });
  }, []);

  const addOutreach: Ctx["addOutreach"] = useCallback((o) => {
    setState((prev) => {
      const cand = prev.candidates.find((c) => c.id === o.candidateId);
      return {
        ...prev,
        outreach: [{ id: uid(), status: "Pending", ...o }, ...prev.outreach],
        candidates: prev.candidates.map((c) =>
          c.id === o.candidateId && c.stage === "Identified"
            ? { ...c, stage: "Contacted" }
            : c
        ),
        activity: [
          {
            id: uid(),
            searchId: prev.activeSearchId,
            text: `Outreach sent to ${cand?.name ?? "candidate"} (${o.channel})`,
            at: Date.now(),
          },
          ...prev.activity,
        ],
      };
    });
  }, []);

  const setOutreachStatus: Ctx["setOutreachStatus"] = useCallback((id, status) => {
    setState((prev) => ({
      ...prev,
      outreach: prev.outreach.map((o) => (o.id === id ? { ...o, status } : o)),
    }));
  }, []);

  const addCompany: Ctx["addCompany"] = useCallback((name) => {
    setState((prev) => ({
      ...prev,
      companies: [...prev.companies, { id: uid(), searchId: prev.activeSearchId, name, status: "Active" }],
      activity: [
        { id: uid(), searchId: prev.activeSearchId, text: `Target company added: ${name}`, at: Date.now() },
        ...prev.activity,
      ],
    }));
  }, []);

  const addExclusion: Ctx["addExclusion"] = useCallback((name, reason) => {
    setState((prev) => ({
      ...prev,
      exclusions: [
        ...prev.exclusions,
        { id: uid(), searchId: prev.activeSearchId, name, reason },
      ],
    }));
  }, []);

  const addArtifact: Ctx["addArtifact"] = useCallback((a) => {
    const date = new Date().toLocaleString("en-US", { month: "short", day: "numeric" });
    setState((prev) => ({
      ...prev,
      artifacts: [
        { id: uid(), searchId: prev.activeSearchId, ...a, status: "Draft", date },
        ...prev.artifacts,
      ],
      activity: [
        { id: uid(), searchId: prev.activeSearchId, text: `Artifact generated: ${a.name}`, at: Date.now() },
        ...prev.activity,
      ],
    }));
  }, []);

  const addInterview: Ctx["addInterview"] = useCallback((i) => {
    setState((prev) => {
      const cand = prev.candidates.find((c) => c.id === i.candidateId);
      return {
        ...prev,
        interviews: [...prev.interviews, { id: uid(), status: "Scheduled", feedbackCaptured: false, ...i }],
        candidates: prev.candidates.map((c) =>
          c.id === i.candidateId && c.stage !== "Interviewing" && c.stage !== "Offer" && c.stage !== "Hired"
            ? { ...c, stage: "Interviewing" }
            : c
        ),
        activity: [
          {
            id: uid(),
            searchId: prev.activeSearchId,
            text: `Interview scheduled: ${cand?.name ?? "candidate"} — ${i.round}`,
            at: Date.now(),
          },
          ...prev.activity,
        ],
      };
    });
  }, []);

  const rescheduleInterview: Ctx["rescheduleInterview"] = useCallback((id, date, time) => {
    setState((prev) => ({
      ...prev,
      interviews: prev.interviews.map((iv) => (iv.id === id ? { ...iv, date, time } : iv)),
    }));
  }, []);

  const captureFeedback: Ctx["captureFeedback"] = useCallback((id) => {
    setState((prev) => {
      const iv = prev.interviews.find((i) => i.id === id);
      const cand = iv ? prev.candidates.find((c) => c.id === iv.candidateId) : null;
      return {
        ...prev,
        interviews: prev.interviews.map((i) =>
          i.id === id ? { ...i, feedbackCaptured: true, status: "Complete" } : i
        ),
        activity: [
          {
            id: uid(),
            searchId: prev.activeSearchId,
            text: `Feedback captured: ${cand?.name ?? "candidate"} — ${iv?.round ?? ""}`,
            at: Date.now(),
          },
          ...prev.activity,
        ],
      };
    });
  }, []);

  const toggleCalibration: Ctx["toggleCalibration"] = useCallback((id) => {
    setState((prev) => ({
      ...prev,
      calibration: prev.calibration.map((c) => (c.id === id ? { ...c, done: !c.done } : c)),
    }));
  }, []);

  const approveItem: Ctx["approveItem"] = useCallback((id) => {
    setState((prev) => {
      const item = prev.approvals.find((a) => a.id === id);
      return {
        ...prev,
        approvals: prev.approvals.filter((a) => a.id !== id),
        activity: item
          ? [{ id: uid(), searchId: prev.activeSearchId, text: `Approved: ${item.item}`, at: Date.now() }, ...prev.activity]
          : prev.activity,
      };
    });
  }, []);

  const dismissApproval: Ctx["dismissApproval"] = useCallback((id) => {
    setState((prev) => ({ ...prev, approvals: prev.approvals.filter((a) => a.id !== id) }));
  }, []);

  const saveFirm: Ctx["saveFirm"] = useCallback((firm) => {
    setState((prev) => ({ ...prev, firm }));
  }, []);

  const inviteMember: Ctx["inviteMember"] = useCallback((m) => {
    setState((prev) => ({ ...prev, team: [...prev.team, { id: uid(), ...m }] }));
  }, []);

  const updateMember: Ctx["updateMember"] = useCallback((id, patch) => {
    setState((prev) => ({
      ...prev,
      team: prev.team.map((t) => (t.id === id ? { ...t, ...patch } : t)),
    }));
  }, []);

  /* ─── Derived for active search ─── */
  const candidatesInActiveSearch = useMemo(
    () => state.candidates.filter((c) => c.searchId === state.activeSearchId),
    [state.candidates, state.activeSearchId]
  );
  const requirementsInActiveSearch = useMemo(
    () => state.requirements.filter((r) => r.searchId === state.activeSearchId),
    [state.requirements, state.activeSearchId]
  );
  const artifactsInActiveSearch = useMemo(
    () => state.artifacts.filter((a) => a.searchId === state.activeSearchId),
    [state.artifacts, state.activeSearchId]
  );
  const companiesInActiveSearch = useMemo(
    () => state.companies.filter((c) => c.searchId === state.activeSearchId),
    [state.companies, state.activeSearchId]
  );
  const exclusionsInActiveSearch = useMemo(
    () => state.exclusions.filter((e) => e.searchId === state.activeSearchId),
    [state.exclusions, state.activeSearchId]
  );
  const archetypesInActiveSearch = useMemo(
    () => state.archetypes.filter((a) => a.searchId === state.activeSearchId),
    [state.archetypes, state.activeSearchId]
  );
  const calibrationInActiveSearch = useMemo(
    () => state.calibration.filter((c) => c.searchId === state.activeSearchId),
    [state.calibration, state.activeSearchId]
  );
  const driftInActiveSearch = useMemo(
    () => state.drift.filter((d) => d.searchId === state.activeSearchId),
    [state.drift, state.activeSearchId]
  );
  const activityInActiveSearch = useMemo(
    () => state.activity.filter((a) => !a.searchId || a.searchId === state.activeSearchId),
    [state.activity, state.activeSearchId]
  );
  const candIds = useMemo(
    () => new Set(candidatesInActiveSearch.map((c) => c.id)),
    [candidatesInActiveSearch]
  );
  const signalsInActiveSearch = useMemo(
    () => state.signals.filter((s) => candIds.has(s.candidateId)),
    [state.signals, candIds]
  );
  const screensInActiveSearch = useMemo(
    () => state.screens.filter((s) => candIds.has(s.candidateId)),
    [state.screens, candIds]
  );
  const outreachInActiveSearch = useMemo(
    () => state.outreach.filter((o) => candIds.has(o.candidateId)),
    [state.outreach, candIds]
  );
  const interviewsInActiveSearch = useMemo(
    () => state.interviews.filter((i) => candIds.has(i.candidateId)),
    [state.interviews, candIds]
  );

  const candidateById = useCallback(
    (id: string) => state.candidates.find((c) => c.id === id),
    [state.candidates]
  );

  const value: Ctx = {
    state,
    activeSearch,
    setActiveSearch,
    addSearch,
    addCandidate,
    updateCandidate,
    removeCandidate,
    addRequirement,
    removeRequirement,
    lockMandate,
    addSignal,
    toggleSignalVerified,
    addScreen,
    addOutreach,
    setOutreachStatus,
    addCompany,
    addExclusion,
    addArtifact,
    addInterview,
    rescheduleInterview,
    captureFeedback,
    toggleCalibration,
    approveItem,
    dismissApproval,
    saveFirm,
    inviteMember,
    updateMember,
    logActivity,
    candidatesInActiveSearch,
    requirementsInActiveSearch,
    artifactsInActiveSearch,
    companiesInActiveSearch,
    exclusionsInActiveSearch,
    archetypesInActiveSearch,
    calibrationInActiveSearch,
    driftInActiveSearch,
    activityInActiveSearch,
    signalsInActiveSearch,
    screensInActiveSearch,
    outreachInActiveSearch,
    interviewsInActiveSearch,
    candidateById,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useDashboard() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useDashboard must be used inside DashboardProvider");
  return ctx;
}

export function formatRelative(ts: number) {
  const diff = Date.now() - ts;
  const s = Math.floor(diff / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}
