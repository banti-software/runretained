"use client";

const signals = [
  { text: "Led engineering org from 200 to 600 engineers over 3 years", candidate: "Sarah Chen", source: "Screen — Apr 8", requirement: "500+ eng org leadership", confidence: "High", status: "Verified" },
  { text: "Built internal developer platform used by 400+ engineers", candidate: "Sarah Chen", source: "Screen — Apr 8", requirement: "Developer platform experience", confidence: "High", status: "Verified" },
  { text: "Managed 3 post-acquisition integrations", candidate: "Sarah Chen", source: "Reference — Apr 10", requirement: "M&A integration", confidence: "High", status: "Verified" },
  { text: "Compensation expectation $450-500K base", candidate: "Sarah Chen", source: "Screen — Apr 8", requirement: "Comp parameters", confidence: "Medium", status: "Unverified" },
  { text: "Prefers hands-on IC work over delegation", candidate: "Marcus Rivera", source: "Screen — Apr 9", requirement: "Anti-signal: IC mindset", confidence: "Medium", status: "Unverified" },
  { text: "No public company experience beyond advisory", candidate: "Marcus Rivera", source: "Screen — Apr 9", requirement: "Board communication", confidence: "High", status: "Verified" },
  { text: "Currently in late-stage process with competitor", candidate: "Jordan Hayes", source: "Screen — Apr 10", requirement: "Competitive process", confidence: "Medium", status: "Unverified" },
];

export default function SignalsPage() {
  return (
    <div className="p-6 lg:p-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-black">Signals</h1>
          <p className="text-sm text-slate-500 mt-0.5">Evidence extracted from interactions</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-sm px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:border-slate-300 transition font-medium">
            Verification Queue
          </button>
          <button className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition font-medium">
            Add Signal
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <span className="text-xs text-slate-400">{signals.length} signals</span>
          <div className="flex items-center gap-2">
            <button className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:border-slate-300 transition">Filter</button>
            <button className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:border-slate-300 transition">By candidate</button>
          </div>
        </div>

        <div className="divide-y divide-slate-50">
          {signals.map((s, i) => (
            <a key={i} href="#" className="block px-5 py-3.5 hover:bg-slate-50/50 transition">
              <p className="text-sm text-slate-800">{s.text}</p>
              <div className="flex items-center gap-4 mt-1.5 flex-wrap">
                <span className="text-[11px] text-slate-500">{s.candidate}</span>
                <span className="text-[11px] text-slate-400">{s.source}</span>
                <span className="text-[11px] text-slate-400">Req: {s.requirement}</span>
                <span className="text-[11px] text-slate-400">{s.confidence} confidence</span>
                <span className="text-[11px] text-slate-500">{s.status}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
