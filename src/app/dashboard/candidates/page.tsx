"use client";

const candidates = [
  { name: "Sarah Chen", role: "VP Eng, Series D Fintech", stage: "Evaluated", score: "4.2", signals: 12, coverage: "87%" },
  { name: "Priya Sharma", role: "SVP Eng, Public Co", stage: "Evaluated", score: "4.5", signals: 15, coverage: "92%" },
  { name: "Marcus Rivera", role: "CTO, Growth-stage SaaS", stage: "Screened", score: "3.8", signals: 7, coverage: "61%" },
  { name: "Alex Kim", role: "VP Eng, E-commerce", stage: "Contacted", score: "—", signals: 0, coverage: "—" },
  { name: "Jordan Hayes", role: "Dir Eng, Infra", stage: "Screened", score: "3.5", signals: 4, coverage: "48%" },
  { name: "Nina Patel", role: "VP Platform, Fintech", stage: "Contacted", score: "—", signals: 0, coverage: "—" },
  { name: "David Park", role: "CTO, Series C", stage: "Identified", score: "—", signals: 0, coverage: "—" },
  { name: "Lisa Wang", role: "SVP Eng, Public Infra Co", stage: "Screened", score: "3.9", signals: 6, coverage: "65%" },
];

export default function CandidatesPage() {
  return (
    <div className="p-6 lg:p-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-black">Candidates</h1>
          <p className="text-sm text-slate-500 mt-0.5">All candidates in this search</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-sm px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:border-slate-300 transition font-medium">
            Import
          </button>
          <button className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition font-medium">
            Add Candidate
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <span className="text-xs text-slate-400">{candidates.length} candidates</span>
          <div className="flex items-center gap-2">
            <button className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:border-slate-300 transition">Filter</button>
            <button className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:border-slate-300 transition">Sort</button>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_90px_50px_50px_50px] gap-3 px-5 py-2.5 border-b border-slate-50 text-[11px] text-slate-400 font-medium uppercase tracking-wider">
          <span>Candidate</span>
          <span>Stage</span>
          <span className="text-right">Score</span>
          <span className="text-right">Signals</span>
          <span className="text-right">Fit</span>
        </div>

        <div className="divide-y divide-slate-50">
          {candidates.map((c) => (
            <a key={c.name} href="#" className="grid grid-cols-[1fr_90px_50px_50px_50px] gap-3 px-5 py-3 items-center hover:bg-slate-50/50 transition">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-medium text-slate-500 shrink-0">
                  {c.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="min-w-0">
                  <span className="text-sm font-medium text-slate-800 block truncate">{c.name}</span>
                  <span className="text-[11px] text-slate-400 block truncate">{c.role}</span>
                </div>
              </div>
              <span className="text-[11px] text-slate-500">{c.stage}</span>
              <span className="text-sm font-medium text-slate-700 text-right">{c.score}</span>
              <span className="text-sm text-slate-500 text-right">{c.signals}</span>
              <span className="text-sm text-slate-500 text-right">{c.coverage}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
