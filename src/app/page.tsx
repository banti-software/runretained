"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { aiCapabilities, workflowFeatures, howItWorks, faq } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* ── HERO ── */}
      <section className="pt-20 sm:pt-28 pb-16 sm:pb-24 text-center">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-[-0.03em] text-black leading-[1.08]">
            AI-powered execution for
            <br />
            retained search
          </h1>
          <p className="mt-6 text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-7">
            The operating system that structures every search from intake to close.
            AI drafts the artifacts. Workflows enforce the process.
            Recruiters make the decisions.
          </p>
        </div>
      </section>

      {/* ── AI CAPABILITIES ── */}
      <section id="capabilities" className="py-16 sm:py-24 border-t border-slate-100">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="max-w-xl mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-black leading-[1.05]">
              AI that does the work
            </h2>
            <p className="mt-5 text-base text-slate-500 leading-7">
              Every search generates structured intelligence. AI handles drafting, extraction, and analysis — recruiters stay in control.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-100">
            {aiCapabilities.map((cap) => (
              <div key={cap.id} className="p-8 bg-white">
                <h3 className="text-sm font-medium text-black mb-3">{cap.title}</h3>
                <p className="text-sm text-slate-500 leading-6">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORKFLOW & STRUCTURE ── */}
      <section className="py-16 sm:py-24 border-t border-slate-100">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-black leading-[1.08]">
              Structure that holds
            </h2>
            <p className="mt-5 text-base text-slate-500 max-w-2xl mx-auto leading-7">
              Every transition is governed. Every decision is evidence-backed. Every artifact has provenance. The system enforces the process so recruiters can focus on the search.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-100">
            {workflowFeatures.map((feat) => (
              <div key={feat.title} className="p-8 bg-white">
                <h3 className="text-sm font-medium text-black">{feat.title}</h3>
                <p className="mt-2 text-sm text-slate-500 leading-6">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-16 sm:py-28 lg:py-40 border-t border-slate-100">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-black leading-[1.08]">
              From intake to close, inside one system
            </h2>
            <p className="mt-6 text-base text-slate-500 max-w-2xl mx-auto leading-7">
              No more running searches across email, Word, and spreadsheets.
              Every step is structured, every artifact is generated, every transition is tracked.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-0">
            {howItWorks.map((item, i) => (
              <div
                key={item.step}
                className={`flex gap-6 sm:gap-8 py-8 ${
                  i < howItWorks.length - 1 ? "border-b border-slate-100" : ""
                }`}
              >
                <span className="text-sm font-medium text-slate-300 pt-0.5 shrink-0">
                  {item.step}
                </span>
                <div>
                  <h3 className="text-base font-medium text-black">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-500 leading-6">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNER VIEW TEASER ── */}
      <section className="py-16 sm:py-24 border-t border-slate-100">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded-full mb-6">
              Partner Oversight
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-black leading-[1.08]">
              Real-time oversight without manual reporting
            </h2>
            <p className="mt-6 text-base text-slate-500 max-w-2xl mx-auto leading-7">
              Partners see search health, blocked candidates, stale outreach, coverage gaps, and contradictions — all derived from live workflow state. No dashboards to maintain. No reports to build.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-16 sm:py-24 border-t border-slate-100">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div className="lg:sticky lg:top-24">
              <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.03em] text-black leading-[1.05]">
                Common
                <br />
                questions
              </h2>
            </div>

            <div className="divide-y divide-slate-100">
              {faq.map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                    <span className="text-sm text-black">{item.q}</span>
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

      {/* ── CLOSING ── */}
      <section className="py-16 sm:py-28 lg:py-40 border-t border-slate-100 text-center">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-[-0.03em] text-black leading-[1.15]">
            Every search. Structured. Evidence-backed. Replayable.
          </h2>
          <p className="mt-6 text-base text-slate-500 max-w-lg mx-auto leading-7">
            Run Retained is the operating system retained search has been missing.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
