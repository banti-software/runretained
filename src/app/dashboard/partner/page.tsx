"use client";

const searchHealth = [
  { search: "VP Engineering — Acme Corp", phase: "Assess", candidates: 58, presented: 2, blockers: 3, staleDays: 0 },
  { search: "CFO — Beacon Health", phase: "Source", candidates: 12, presented: 0, blockers: 1, staleDays: 5 },
  { search: "Head of Product — Nova Labs", phase: "Define", candidates: 0, presented: 0, blockers: 0, staleDays: 14 },
  { search: "CTO — Ridge Financial", phase: "Define", candidates: 0, presented: 0, blockers: 0, staleDays: 0 },
];

const pendingApprovals = [
  { item: "Defense Brief — Sarah Chen", search: "VP Engineering", type: "Artifact approval" },
  { item: "Mandate v1 lock", search: "CFO — Beacon Health", type: "Mandate approval" },
  { item: "Scope change — expanded geo", search: "Head of Product", type: "Scope change" },
];

const alerts = [
  "Head of Product search has had no activity for 14 days",
  "CFO search has 1 candidate stale for 5+ days",
  "3 signals pending verification across VP Engineering search",
];

export default function PartnerPage() {
  return (
    <div className="p-6 lg:p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-xl font-semibold tracking-tight text-black">Partner View</h1>
        <p className="text-sm text-slate-500 mt-0.5">Read-only oversight across all active searches</p>
      </div>

      {/* Alerts */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6">
        <h2 className="text-sm font-semibold text-slate-800 mb-3">Attention</h2>
        <div className="space-y-2">
          {alerts.map((a) => (
            <div key={a} className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg bg-slate-50">
              <div className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
              <span className="text-[13px] text-slate-600 leading-5">{a}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Search health */}
      <div className="bg-white rounded-xl border border-slate-200 mb-6">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-800">Search Health</h2>
        </div>
        <div className="grid grid-cols-[1fr_70px_70px_70px_70px_60px] gap-3 px-5 py-2.5 border-b border-slate-50 text-[11px] text-slate-400 font-medium uppercase tracking-wider">
          <span>Search</span>
          <span>Phase</span>
          <span className="text-right">Pipeline</span>
          <span className="text-right">Presented</span>
          <span className="text-right">Blockers</span>
          <span className="text-right">Stale</span>
        </div>
        <div className="divide-y divide-slate-50">
          {searchHealth.map((s) => (
            <div key={s.search} className="grid grid-cols-[1fr_70px_70px_70px_70px_60px] gap-3 px-5 py-3 items-center hover:bg-slate-50/50 transition">
              <span className="text-sm font-medium text-slate-800 truncate">{s.search}</span>
              <span className="text-[11px] text-slate-500">{s.phase}</span>
              <span className="text-sm text-slate-500 text-right">{s.candidates}</span>
              <span className="text-sm text-slate-500 text-right">{s.presented}</span>
              <span className="text-sm text-slate-500 text-right">{s.blockers}</span>
              <span className={`text-sm text-right ${s.staleDays > 7 ? "text-black font-medium" : "text-slate-500"}`}>{s.staleDays}d</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pending approvals */}
      <div className="bg-white rounded-xl border border-slate-200">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-800">Pending Approvals</h2>
        </div>
        <div className="divide-y divide-slate-50">
          {pendingApprovals.map((p) => (
            <div key={p.item} className="flex items-center justify-between px-5 py-3.5">
              <div>
                <span className="text-sm font-medium text-slate-800 block">{p.item}</span>
                <span className="text-[11px] text-slate-400">{p.search} · {p.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:border-slate-300 transition">Review</button>
                <button className="text-xs px-3 py-1.5 rounded-lg bg-black text-white font-medium">Approve</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
