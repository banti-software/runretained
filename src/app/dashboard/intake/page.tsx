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
    <div className="p-6 lg:p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-black">Intake Prep</h1>
          <p className="text-sm text-slate-500 mt-0.5">Preparation for the intake call with Acme Corp</p>
        </div>
        <button className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition font-medium">
          Generate Prep Pack
        </button>
      </div>

      {/* Artifacts */}
      <div className="bg-white rounded-xl border border-slate-200 mb-6">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-800">Prep Artifacts</h2>
        </div>
        <div className="divide-y divide-slate-50">
          {artifacts.map((a) => (
            <div key={a.name} className="flex items-center justify-between px-5 py-3.5">
              <div>
                <span className="text-sm font-medium text-slate-800">{a.name}</span>
                {a.questions && <span className="text-xs text-slate-400 ml-2">{a.questions} questions</span>}
              </div>
              <div className="flex items-center gap-3">
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
          <h2 className="text-sm font-semibold text-slate-800">Question Set Preview</h2>
          <button className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:border-slate-300 transition">
            Add Question
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
    </div>
  );
}
