"use client";

const artifacts = [
  { name: "Intake Question Set", status: "Draft", questions: 32 },
  { name: "Intake Call Agenda", status: "Draft", questions: null },
  { name: "Intake Prep Brief", status: "Draft", questions: null },
];

const questions = [
  { text: "What business problem does this hire solve in the next 12 months?", category: "Outcomes", mapped: "Success markers" },
  { text: "What does the team look like today and what is missing?", category: "Context", mapped: "Team structure" },
  { text: "What is the realistic compensation range including equity?", category: "Comp", mapped: "Comp parameters" },
  { text: "Who else is interviewing and what is the decision timeline?", category: "Process", mapped: "Timeline" },
  { text: "What would make you pass on an otherwise strong candidate?", category: "Tradeoffs", mapped: "Anti-signals" },
  { text: "If you had to choose between depth in X or breadth in Y, which wins?", category: "Tradeoffs", mapped: "Must-haves" },
];

export default function IntakePrepPage() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-black">Intake</h1>
          <p className="text-sm text-slate-500 mt-0.5">Preparation for the intake call with Acme Corp</p>
        </div>
        <button className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition font-medium">
          Generate Prep Pack
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        {/* Artifacts */}
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-800">Prep Artifacts</h2>
          </div>
          <div className="divide-y divide-slate-50">
            {artifacts.map((a) => (
              <div key={a.name} className="flex items-center justify-between px-5 py-3.5">
                <div className="min-w-0">
                  <span className="text-sm font-medium text-slate-800 block truncate">{a.name}</span>
                  {a.questions && <span className="text-xs text-slate-400">{a.questions} questions</span>}
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-slate-400">{a.status}</span>
                  <button className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:border-slate-300 transition">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Questions preview */}
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div className="min-w-0">
              <h2 className="text-sm font-semibold text-slate-800">Question Set Preview</h2>
              <p className="text-[11px] text-slate-400 mt-0.5">Answers auto-fill from uploaded notes</p>
            </div>
            <button className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:border-slate-300 transition shrink-0">
              Add
            </button>
          </div>
          <div className="divide-y divide-slate-50">
            {questions.map((q) => (
              <div key={q.text} className="px-5 py-3.5 hover:bg-slate-50/50 transition">
                <p className="text-sm text-slate-800">{q.text}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-[11px] text-slate-400">{q.category}</span>
                  <span className="text-[11px] text-slate-400">Maps to: {q.mapped}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 py-3 border-t border-slate-100">
            <span className="text-xs text-slate-400">Showing 6 of 32 questions</span>
          </div>
        </div>

        {/* Meeting Notes Upload */}
        <section className="bg-white rounded-xl border border-slate-200">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-slate-800">Meeting Notes</h2>
            <span className="text-[11px] px-2 py-1 rounded-md bg-slate-100 text-slate-600 font-medium shrink-0">Mandate + Answers</span>
          </div>
          <div className="p-5">
            <div className="rounded-lg border border-dashed border-slate-300 px-4 py-8 text-center hover:border-slate-400 transition">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto text-slate-400"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <div className="text-[13px] font-medium text-slate-700 mt-2">
                Upload meeting notes
              </div>
              <div className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                Drop a transcript or paste notes — we&apos;ll draft the mandate and auto-fill answers to the question set
              </div>
              <div className="text-[11px] text-slate-400 mt-1.5">PDF, DOCX, TXT, MD · Max 10 MB</div>
            </div>
            <ul className="mt-4 space-y-1.5">
              <li className="flex items-center gap-2 text-[11px] text-slate-500">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 shrink-0"><path d="M20 6 9 17l-5-5" /></svg>
                Drafts mandate structure
              </li>
              <li className="flex items-center gap-2 text-[11px] text-slate-500">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 shrink-0"><path d="M20 6 9 17l-5-5" /></svg>
                Auto-fills all 32 question answers
              </li>
              <li className="flex items-center gap-2 text-[11px] text-slate-500">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 shrink-0"><path d="M20 6 9 17l-5-5" /></svg>
                Flags gaps for follow-up
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
