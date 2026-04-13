"use client";

const pipelineStages = [
  { label: "Identified", count: 24, color: "bg-slate-300" },
  { label: "Contacted", count: 18, color: "bg-blue-300" },
  { label: "Screened", count: 9, color: "bg-indigo-300" },
  { label: "Evaluated", count: 5, color: "bg-violet-300" },
  { label: "Presented", count: 2, color: "bg-emerald-300" },
];

const candidates = [
  { name: "Sarah Chen", role: "VP Eng, Series D Fintech", stage: "Evaluated", score: "4.2", signals: 12, coverage: "87%", action: "View Brief", actionColor: "bg-accent text-white" },
  { name: "Priya Sharma", role: "SVP Eng, Public Co", stage: "Evaluated", score: "4.5", signals: 15, coverage: "92%", action: "Present", actionColor: "bg-emerald-500 text-white" },
  { name: "Marcus Rivera", role: "CTO, Growth-stage SaaS", stage: "Screened", score: "3.8", signals: 7, coverage: "61%", action: "Verify Signals", actionColor: "bg-amber-500 text-white" },
  { name: "Alex Kim", role: "VP Eng, E-commerce", stage: "Contacted", score: "—", signals: 0, coverage: "—", action: "Awaiting Response", actionColor: "bg-slate-100 text-slate-500" },
  { name: "Jordan Hayes", role: "Dir Eng, Infra", stage: "Screened", score: "3.5", signals: 4, coverage: "48%", action: "Score", actionColor: "bg-indigo-500 text-white" },
];

const blockers = [
  { label: "3 signals pending verification", type: "warning" as const },
  { label: "Defense brief awaiting approval", type: "info" as const },
  { label: "2 candidates stale (no activity 7d+)", type: "warning" as const },
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
          <button className="text-sm px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-slate-300 transition font-medium">
            Log Interaction
          </button>
          <button className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition font-medium">
            Add Candidate
          </button>
        </div>
      </div>

      {/* Pipeline overview */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-slate-800">Pipeline</h2>
          <span className="text-xs text-slate-400">58 total candidates</span>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {pipelineStages.map((s) => (
            <button key={s.label} className="text-center group">
              <div className={`h-2 rounded-full ${s.color} mb-2 group-hover:opacity-80 transition`} />
              <span className="text-[11px] text-slate-500 block">{s.label}</span>
              <span className="text-lg font-semibold text-slate-800">{s.count}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Candidates table - spans 2 cols */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-800">Active Candidates</h2>
            <div className="flex items-center gap-2">
              <button className="text-xs px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:border-slate-300 transition">
                Filter
              </button>
              <button className="text-xs px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:border-slate-300 transition">
                Sort
              </button>
            </div>
          </div>

          {/* Table header */}
          <div className="grid grid-cols-[1fr_80px_60px_60px_60px_110px] gap-3 px-5 py-2.5 border-b border-slate-50 text-[11px] text-slate-400 font-medium uppercase tracking-wider">
            <span>Candidate</span>
            <span>Stage</span>
            <span className="text-right">Score</span>
            <span className="text-right">Signals</span>
            <span className="text-right">Fit</span>
            <span className="text-right">Action</span>
          </div>

          {/* Rows */}
          <div className="divide-y divide-slate-50">
            {candidates.map((c) => (
              <div key={c.name} className="grid grid-cols-[1fr_80px_60px_60px_60px_110px] gap-3 px-5 py-3 items-center hover:bg-slate-50/50 transition">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-medium text-slate-500 shrink-0">
                    {c.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="min-w-0">
                    <span className="text-sm font-medium text-slate-800 block truncate">{c.name}</span>
                    <span className="text-[11px] text-slate-400 block truncate">{c.role}</span>
                  </div>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-50 border border-slate-100 text-slate-600 text-center truncate">{c.stage}</span>
                <span className="text-sm font-medium text-slate-700 text-right">{c.score}</span>
                <span className="text-sm text-slate-500 text-right">{c.signals}</span>
                <span className="text-sm text-slate-500 text-right">{c.coverage}</span>
                <div className="text-right">
                  <button className={`text-[11px] px-3 py-1 rounded-full font-medium ${c.actionColor}`}>
                    {c.action}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-400">Showing 5 of 58</span>
            <button className="text-xs text-accent hover:text-accent-hover font-medium transition">View all candidates</button>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Blockers */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="text-sm font-semibold text-slate-800 mb-3">Blockers</h2>
            <div className="space-y-2">
              {blockers.map((b) => (
                <div key={b.label} className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  {b.type === "warning" ? (
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                  )}
                  <span className="text-[13px] text-slate-600 leading-5">{b.label}</span>
                </div>
              ))}
            </div>
            <button className="mt-3 text-xs text-accent hover:text-accent-hover font-medium transition">
              Resolve blockers
            </button>
          </div>

          {/* Mandate summary */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-slate-800">Mandate</h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 font-medium">Locked</span>
            </div>
            <div className="space-y-2 text-[13px]">
              <div className="flex justify-between">
                <span className="text-slate-500">Version</span>
                <span className="text-slate-800 font-medium">v2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Must-haves</span>
                <span className="text-slate-800 font-medium">4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Core</span>
                <span className="text-slate-800 font-medium">6</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Contextual</span>
                <span className="text-slate-800 font-medium">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Anti-signals</span>
                <span className="text-slate-800 font-medium">2</span>
              </div>
            </div>
            <button className="mt-4 w-full text-xs px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:border-slate-300 transition font-medium">
              View Full Mandate
            </button>
          </div>

          {/* Recent activity */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="text-sm font-semibold text-slate-800 mb-3">Recent Activity</h2>
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
            <button className="mt-3 text-xs text-accent hover:text-accent-hover font-medium transition">
              View full timeline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
