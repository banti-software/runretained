"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  aiCapabilities,
  workflowFeatures,
  howItWorks,
  partnerInsights,
  faq,
  company,
} from "@/lib/content";

/* ── Inline SVG icons keyed by capability id ── */
const icons: Record<string, React.ReactNode> = {
  clipboard: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="M12 11h4" /><path d="M12 16h4" /><path d="M8 11h.01" /><path d="M8 16h.01" />
    </svg>
  ),
  "file-text": (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" />
    </svg>
  ),
  send: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />
    </svg>
  ),
  zap: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
  ),
  shield: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" />
    </svg>
  ),
  "bar-chart": (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" x2="12" y1="20" y2="10" /><line x1="18" x2="18" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  ),
};

export default function Home() {
  return (
    <>
      <Navbar />

      {/* ── HERO ── */}
      <section className="pt-16 sm:pt-20 pb-0 text-center">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl lg:text-[52px] tracking-[-0.03em] text-black leading-[1.1]">
            Your executive search, on AI
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-500 max-w-md mx-auto leading-7">
            Turn intake calls, candidate screens, and reference checks into structured intelligence and governed artifacts — automatically.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <a
              href={`mailto:${company.contactEmail}`}
              className="px-7 py-3 bg-black hover:bg-slate-800 transition text-white rounded-full text-sm"
            >
              Get in touch
            </a>
          </div>
        </div>

        {/* Full-width product preview */}
        <div className="mt-12 px-6 sm:px-10 lg:px-16 max-w-6xl mx-auto">
          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50">
            <div className="p-4 sm:p-6 lg:p-8">
              {/* Top bar */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-xs font-medium text-slate-800">VP Engineering Search — Acme Corp</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400">Mandate v2 - Locked</span>
                  <button className="text-[10px] px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-600 hover:border-slate-300 transition">View Mandate</button>
                </div>
              </div>

              {/* Pipeline stages */}
              <div className="grid grid-cols-5 gap-2 mb-6">
                {[
                  { label: "Identified", count: 24, color: "bg-slate-200" },
                  { label: "Contacted", count: 18, color: "bg-blue-200" },
                  { label: "Screened", count: 9, color: "bg-indigo-200" },
                  { label: "Evaluated", count: 5, color: "bg-violet-200" },
                  { label: "Presented", count: 2, color: "bg-emerald-200" },
                ].map((stage) => (
                  <div key={stage.label} className="text-center">
                    <div className={`h-1.5 rounded-full ${stage.color} mb-2`} />
                    <span className="text-[10px] text-slate-500 block">{stage.label}</span>
                    <span className="text-xs font-semibold text-slate-700">{stage.count}</span>
                  </div>
                ))}
              </div>

              {/* Candidate rows */}
              <div className="space-y-1.5">
                {[
                  { name: "Sarah Chen", role: "VP Eng, Series D Fintech", stage: "Evaluated", score: "4.2", signals: 12, status: "Defense brief generating...", action: "View Brief", actionStyle: "bg-accent text-white" },
                  { name: "Marcus Rivera", role: "CTO, Growth-stage SaaS", stage: "Screened", score: "3.8", signals: 7, status: "3 signals pending", action: "Verify", actionStyle: "bg-amber-50 text-amber-700 border-amber-200" },
                  { name: "Priya Sharma", role: "SVP Eng, Public Co", stage: "Evaluated", score: "4.5", signals: 15, status: "Ready to present", action: "Present", actionStyle: "bg-emerald-50 text-emerald-700 border-emerald-200" },
                ].map((c) => (
                  <div key={c.name} className="flex items-center justify-between px-3 py-2.5 bg-white rounded-lg border border-slate-100">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-medium text-slate-500 shrink-0">
                        {c.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-medium text-slate-800 block truncate">{c.name}</span>
                        <span className="text-[10px] text-slate-400 block truncate">{c.role}</span>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-3 shrink-0">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-50 text-slate-500 border border-slate-100">{c.stage}</span>
                      <span className="text-[10px] text-slate-400">{c.signals} signals</span>
                      <span className="text-xs font-medium text-slate-700 w-7 text-right">{c.score}</span>
                      <span className="text-[10px] text-slate-400 w-[120px] truncate">{c.status}</span>
                      <button className={`text-[10px] px-2.5 py-1 rounded-full border font-medium ${c.actionStyle}`}>
                        {c.action}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom actions bar */}
              <div className="mt-4 flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <button className="text-[10px] px-3 py-1.5 rounded-full bg-black text-white font-medium">Add Candidate</button>
                  <button className="text-[10px] px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 font-medium">Generate Outreach</button>
                  <button className="text-[10px] px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 font-medium">Log Interaction</button>
                </div>
                <span className="text-[10px] text-slate-400">58 candidates total</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AI CAPABILITIES ── */}
      <section id="capabilities" className="py-20 sm:py-28 border-t border-slate-100">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
            <div className="max-w-xl">
              <span className="inline-block px-3 py-1 bg-blue-50 text-accent text-xs font-medium rounded-full mb-4">
                AI-Powered
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-[-0.03em] text-black leading-[1.08]">
                Intelligence at every stage
              </h2>
              <p className="mt-4 text-base text-slate-500 leading-7">
                AI handles the drafting, extraction, and analysis so your team can focus on relationships and judgment.
              </p>
            </div>
            <a
              href={`mailto:${company.contactEmail}`}
              className="hidden sm:inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-hover transition font-medium shrink-0"
            >
              Learn more
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-100 rounded-2xl overflow-hidden border border-slate-100">
            {aiCapabilities.map((cap) => (
              <div key={cap.id} className="p-7 sm:p-8 bg-white group hover:bg-slate-50/50 transition">
                <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 mb-4 group-hover:border-slate-200 transition">
                  {icons[cap.icon]}
                </div>
                <h3 className="text-sm font-semibold text-black mb-2">{cap.title}</h3>
                <p className="text-sm text-slate-500 leading-6">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-20 sm:py-28 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-[-0.03em] text-black leading-[1.08]">
              From intake to close, one system
            </h2>
            <p className="mt-5 text-base text-slate-500 max-w-2xl mx-auto leading-7">
              No more running searches across email, docs, and spreadsheets. Every step is structured, every artifact is governed, every transition is tracked.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {howItWorks.map((item, i) => (
              <div key={item.step} className="flex gap-5 sm:gap-6">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-8 h-8 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-xs font-semibold text-slate-400">
                    {item.step}
                  </div>
                  {i < howItWorks.length - 1 && (
                    <div className="w-px flex-1 bg-slate-200 my-1" />
                  )}
                </div>
                <div className={`pb-10 ${i === howItWorks.length - 1 ? "pb-0" : ""}`}>
                  <h3 className="text-base font-semibold text-black">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-slate-500 leading-6">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <a
              href={`mailto:${company.contactEmail}`}
              className="inline-flex items-center gap-2 px-7 py-3 bg-black hover:bg-slate-800 transition text-white rounded-full text-sm font-medium"
            >
              See it in action
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── WORKFLOW & STRUCTURE ── */}
      <section className="py-20 sm:py-28 border-t border-slate-100">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full mb-4">
              Workflow Engine
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-[-0.03em] text-black leading-[1.08]">
              Process integrity, built in
            </h2>
            <p className="mt-4 text-base text-slate-500 max-w-2xl mx-auto leading-7">
              The system enforces the process so your team can focus on the search. Every transition is governed, every decision is traceable.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {workflowFeatures.map((feat) => (
              <div key={feat.title} className="p-6 sm:p-7 rounded-xl border border-slate-100 bg-white hover:border-slate-200 transition">
                <h3 className="text-sm font-semibold text-black">{feat.title}</h3>
                <p className="mt-2 text-sm text-slate-500 leading-6">{feat.description}</p>
              </div>
            ))}
          </div>

          {/* Blocked action example */}
          <div className="mt-10 max-w-lg mx-auto">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-800">Advance to Presented</span>
                <button className="text-[11px] px-3 py-1.5 rounded-full bg-slate-100 text-slate-400 font-medium cursor-not-allowed" disabled>
                  Blocked
                </button>
              </div>
              <p className="text-[11px] text-slate-400 mb-3">Resolve these prerequisites to advance Sarah Chen:</p>
              <div className="space-y-1.5">
                {[
                  { label: "Complete scorecard", done: true },
                  { label: "Verify critical signals (2 remaining)", done: false, action: "Verify" },
                  { label: "Approve defense brief", done: false, action: "Review" },
                ].map((req) => (
                  <div key={req.label} className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-2">
                      {req.done ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><path d="M20 6 9 17l-5-5"/></svg>
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-300" />
                      )}
                      <span className={`text-[11px] ${req.done ? "text-slate-400 line-through" : "text-slate-600"}`}>{req.label}</span>
                    </div>
                    {!req.done && req.action && (
                      <button className="text-[10px] px-2 py-0.5 rounded-full bg-accent text-white font-medium">
                        {req.action}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-slate-400">Blocked actions show what is needed and how to resolve it</p>
          </div>
        </div>
      </section>

      {/* ── PARTNER VIEW ── */}
      <section className="py-20 sm:py-28 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-white text-slate-600 text-xs font-medium rounded-full border border-slate-200 mb-4">
                Partner View
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-black leading-[1.08]">
                Oversight without the overhead
              </h2>
              <p className="mt-4 text-base text-slate-500 leading-7">
                Partners see search health, blockers, and risks in real time — all derived from live workflow state. No manual reporting. No separate dashboards to maintain.
              </p>
              <a
                href={`mailto:${company.contactEmail}`}
                className="inline-flex items-center gap-1.5 mt-6 text-sm text-accent hover:text-accent-hover transition font-medium"
              >
                Request a demo
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </a>
            </div>
            <div className="space-y-2">
              {partnerInsights.map((insight) => (
                <div
                  key={insight}
                  className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg border border-slate-100 hover:border-slate-200 transition cursor-default"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent shrink-0">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                  <span className="text-sm text-slate-600">{insight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 sm:py-28 border-t border-slate-100">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            <div className="lg:sticky lg:top-24">
              <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-[-0.03em] text-black leading-[1.05]">
                Common
                <br />
                questions
              </h2>
              <p className="mt-4 text-base text-slate-500 leading-7 max-w-sm">
                Have a question that is not answered here?
              </p>
              <a
                href={`mailto:${company.contactEmail}`}
                className="inline-flex items-center gap-1.5 mt-4 px-5 py-2.5 border border-slate-200 hover:border-slate-300 transition text-slate-700 rounded-full text-sm font-medium"
              >
                Reach out
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </a>
            </div>

            <div className="divide-y divide-slate-100">
              {faq.map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                    <span className="text-sm font-medium text-black">{item.q}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="flex-shrink-0 text-slate-400 group-open:rotate-180 transition-transform mt-0.5"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </summary>
                  <p className="mt-3 text-sm text-slate-500 leading-6">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section className="py-20 sm:py-32 border-t border-slate-100 text-center hero-gradient">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-[-0.03em] text-black leading-[1.12]">
            The operating system retained
            <br className="hidden sm:block" />
            search has been missing
          </h2>
          <p className="mt-5 text-base text-slate-500 max-w-md mx-auto leading-7">
            Structure every search. Back every decision with evidence. Close with a complete record.
          </p>
          <div className="mt-10 flex items-center justify-center gap-3">
            <a
              href={`mailto:${company.contactEmail}`}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent hover:bg-accent-hover transition text-white rounded-full text-sm font-medium"
            >
              Get in touch
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
            <a
              href="#capabilities"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("capabilities")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center px-6 py-3.5 border border-slate-200 hover:border-slate-300 transition text-slate-700 rounded-full text-sm font-medium"
            >
              Explore features
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
