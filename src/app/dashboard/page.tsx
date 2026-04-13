"use client";

const phases = [
  { label: "Define", status: "complete" },
  { label: "Source", status: "active" },
  { label: "Assess", status: "active" },
  { label: "Present", status: "upcoming" },
  { label: "Close", status: "upcoming" },
];

const candidates = [
  { name: "Sarah Chen", role: "VP Eng, Series D Fintech", stage: "Evaluated", score: "4.2", signals: 12, coverage: "87%" },
  { name: "Priya Sharma", role: "SVP Eng, Public Co", stage: "Evaluated", score: "4.5", signals: 15, coverage: "92%" },
  { name: "Marcus Rivera", role: "CTO, Growth-stage SaaS", stage: "Screened", score: "3.8", signals: 7, coverage: "61%" },
  { name: "Alex Kim", role: "VP Eng, E-commerce", stage: "Contacted", score: "—", signals: 0, coverage: "—" },
  { name: "Jordan Hayes", role: "Dir Eng, Infra", stage: "Screened", score: "3.5", signals: 4, coverage: "48%" },
];

const needsAttention = [
  { text: "3 signals pending verification", area: "Assess" },
  { text: "Defense brief awaiting approval", area: "Present" },
  { text: "2 candidates with no activity for 7+ days", area: "Source" },
  { text: "Calibration review overdue", area: "Define" },
];

const recentActivity = [
  { text: "Defense brief generated for Sarah Chen", time: "2m ago" },
  { text: "Screen logged for Jordan Hayes", time: "1h ago" },
  { text: "Outreach sent to 3 candidates", time: "3h ago" },
  { text: "Mandate v2 locked by Jason Datta", time: "1d ago" },
  { text: "Signal extracted from Priya Sharma debrief", time: "1d ago" },
];

export default function DashboardPage() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-black">Command Center</h1>
          <p className="text-sm text-slate-500 mt-0.5">VP Engineering Search — Acme Corp</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-sm px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:border-slate-300 transition font-medium">
            Log Interaction
          </button>
          <button className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition font-medium">
            Add Candidate
          </button>
        </div>
      </div>

      {/* Phase progress */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-slate-800">Search Progress</h2>
          <span className="text-xs text-slate-400">Mandate v2 locked</span>
        </div>
        <div className="flex items-center gap-1">
          {phases.map((phase, i) => (
            <div key={phase.label} className="flex-1 flex items-center gap-1">
              <div className="flex-1">
                <div className={`h-1.5 rounded-full ${
                  phase.status === "complete" ? "bg-black" :
                  phase.status === "active" ? "bg-slate-400" :
                  "bg-slate-200"
                }`} />
                <span className={`text-[11px] block mt-1.5 ${
                  phase.status === "upcoming" ? "text-slate-300" : "text-slate-500"
                }`}>{phase.label}</span>
              </div>
              {i < phases.length - 1 && <div className="w-1" />}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Candidates table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-800">Pipeline</h2>
            <button className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:border-slate-300 transition">
              Filter
            </button>
          </div>

          <div className="grid grid-cols-[1fr_80px_50px_50px_50px] gap-3 px-5 py-2.5 border-b border-slate-50 text-[11px] text-slate-400 font-medium uppercase tracking-wider">
            <span>Candidate</span>
            <span>Stage</span>
            <span className="text-right">Score</span>
            <span className="text-right">Signals</span>
            <span className="text-right">Fit</span>
          </div>

          <div className="divide-y divide-slate-50">
            {candidates.map((c) => (
              <a key={c.name} href="#" className="grid grid-cols-[1fr_80px_50px_50px_50px] gap-3 px-5 py-3 items-center hover:bg-slate-50/50 transition">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-medium text-slate-500 shrink-0">
                    {c.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="min-w-0">
                    <span className="text-sm font-medium text-slate-800 block truncate">{c.name}</span>
                    <span className="text-[11px] text-slate-400 block truncate">{c.role}</span>
                  </div>
                </div>
                <span className="text-[11px] text-slate-500 truncate">{c.stage}</span>
                <span className="text-sm font-medium text-slate-700 text-right">{c.score}</span>
                <span className="text-sm text-slate-500 text-right">{c.signals}</span>
                <span className="text-sm text-slate-500 text-right">{c.coverage}</span>
              </a>
            ))}
          </div>

          <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-400">Showing 5 of 58</span>
            <button className="text-xs text-slate-500 hover:text-black font-medium transition">View all</button>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Needs attention */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="text-sm font-semibold text-slate-800 mb-3">Needs Attention</h2>
            <div className="space-y-2">
              {needsAttention.map((item) => (
                <a key={item.text} href="#" className="flex items-start justify-between gap-3 px-3 py-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 transition">
                  <span className="text-[13px] text-slate-600 leading-5">{item.text}</span>
                  <span className="text-[10px] text-slate-400 shrink-0 mt-0.5">{item.area}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Mandate */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-slate-800">Mandate</h2>
              <span className="text-[11px] text-slate-400">v2</span>
            </div>
            <div className="space-y-2 text-[13px]">
              <div className="flex justify-between"><span className="text-slate-500">Must-haves</span><span className="text-slate-800 font-medium">4</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Core</span><span className="text-slate-800 font-medium">6</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Contextual</span><span className="text-slate-800 font-medium">3</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Anti-signals</span><span className="text-slate-800 font-medium">2</span></div>
            </div>
            <button className="mt-4 w-full text-xs px-3 py-2 rounded-lg border border-slate-200 text-slate-600 hover:border-slate-300 transition font-medium">
              View Mandate
            </button>
          </div>

          {/* Recent activity */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="text-sm font-semibold text-slate-800 mb-3">Activity</h2>
            <div className="space-y-3">
              {recentActivity.map((a) => (
                <div key={a.text} className="flex items-start gap-2.5">
                  <div className="w-1 h-1 rounded-full bg-slate-300 mt-2 shrink-0" />
                  <div>
                    <span className="text-[13px] text-slate-600 leading-5 block">{a.text}</span>
                    <span className="text-[11px] text-slate-400">{a.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
