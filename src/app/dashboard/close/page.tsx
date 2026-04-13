"use client";

const finalists = [
  {
    name: "Priya Sharma",
    conviction: { client: "High", candidate: "High" },
    competitive: "No active processes",
    counterofferRisk: "Low",
    concerns: "Relocation timeline (2 months)",
    stage: "Offer strategy",
  },
  {
    name: "Sarah Chen",
    conviction: { client: "High", candidate: "Moderate" },
    competitive: "Late-stage at one other company",
    counterofferRisk: "Medium",
    concerns: "Equity expectations above range",
    stage: "References",
  },
];

export default function ClosePage() {
  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-black">Offers & Close</h1>
          <p className="text-sm text-slate-500 mt-0.5">Finalist management, references, and offer strategy</p>
        </div>
        <button className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition font-medium">
          Draft Offer Strategy
        </button>
      </div>

      <div className="space-y-4">
        {finalists.map((f) => (
          <div key={f.name} className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[11px] font-medium text-slate-500">
                  {f.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <span className="text-sm font-semibold text-slate-800 block">{f.name}</span>
                  <span className="text-[11px] text-slate-400">{f.stage}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:border-slate-300 transition">View Close Tracker</button>
                <button className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:border-slate-300 transition">References</button>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <span className="text-[11px] text-slate-400 block mb-1">Client conviction</span>
                <span className="text-sm text-slate-700">{f.conviction.client}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block mb-1">Candidate conviction</span>
                <span className="text-sm text-slate-700">{f.conviction.candidate}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block mb-1">Competitive process</span>
                <span className="text-sm text-slate-700">{f.competitive}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block mb-1">Counteroffer risk</span>
                <span className="text-sm text-slate-700">{f.counterofferRisk}</span>
              </div>
            </div>

            {f.concerns && (
              <div className="mt-4 px-3 py-2.5 rounded-lg bg-slate-50">
                <span className="text-[11px] text-slate-400 block mb-0.5">Open concern</span>
                <span className="text-[13px] text-slate-700">{f.concerns}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
