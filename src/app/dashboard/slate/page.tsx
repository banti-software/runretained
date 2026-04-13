"use client";

const slateCandiates = [
  { name: "Priya Sharma", score: "4.5", coverage: "92%", criticals: "4/4", brief: "Approved", ready: true },
  { name: "Sarah Chen", score: "4.2", coverage: "87%", criticals: "4/4", brief: "In review", ready: false },
  { name: "Lisa Wang", score: "3.9", coverage: "65%", criticals: "3/4", brief: "Not started", ready: false },
];

export default function SlatePage() {
  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-black">Slate</h1>
          <p className="text-sm text-slate-500 mt-0.5">Candidates ready for client presentation</p>
        </div>
        <button className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition font-medium">
          Generate Slate Deck
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200">
        <div className="grid grid-cols-[1fr_50px_60px_60px_80px_80px] gap-3 px-5 py-2.5 border-b border-slate-50 text-[11px] text-slate-400 font-medium uppercase tracking-wider">
          <span>Candidate</span>
          <span className="text-right">Score</span>
          <span className="text-right">Fit</span>
          <span className="text-right">Criticals</span>
          <span>Brief</span>
          <span className="text-right">Action</span>
        </div>

        <div className="divide-y divide-slate-50">
          {slateCandiates.map((c) => (
            <div key={c.name} className="grid grid-cols-[1fr_50px_60px_60px_80px_80px] gap-3 px-5 py-3.5 items-center">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-medium text-slate-500 shrink-0">
                  {c.name.split(" ").map(n => n[0]).join("")}
                </div>
                <span className="text-sm font-medium text-slate-800">{c.name}</span>
              </div>
              <span className="text-sm font-medium text-slate-700 text-right">{c.score}</span>
              <span className="text-sm text-slate-500 text-right">{c.coverage}</span>
              <span className="text-sm text-slate-500 text-right">{c.criticals}</span>
              <span className="text-[11px] text-slate-500">{c.brief}</span>
              <div className="text-right">
                {c.ready ? (
                  <button className="text-xs px-3 py-1.5 rounded-lg bg-black text-white font-medium">Present</button>
                ) : (
                  <button className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 font-medium">View</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
