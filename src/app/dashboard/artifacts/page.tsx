"use client";

const artifacts = [
  { name: "Search Mandate v2", type: "Mandate", status: "Locked", date: "Apr 5" },
  { name: "Candidate Opportunity Brief", type: "Role brief", status: "Approved", date: "Apr 6" },
  { name: "Intake Question Set", type: "Intake", status: "Complete", date: "Apr 3" },
  { name: "Defense Brief — Priya Sharma", type: "Defense brief", status: "Approved", date: "Apr 11" },
  { name: "Defense Brief — Sarah Chen", type: "Defense brief", status: "In review", date: "Apr 12" },
  { name: "Outreach Sequence — Wave 1", type: "Outreach", status: "Active", date: "Apr 7" },
  { name: "Market Map v1", type: "Market map", status: "Current", date: "Apr 6" },
  { name: "Assessment Rubric", type: "Scorecard", status: "Locked", date: "Apr 5" },
];

export default function ArtifactsPage() {
  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-black">Artifacts</h1>
          <p className="text-sm text-slate-500 mt-0.5">Governed work products for this search</p>
        </div>
        <button className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition font-medium">
          Generate Artifact
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <span className="text-xs text-slate-400">{artifacts.length} artifacts</span>
          <button className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:border-slate-300 transition">Filter by type</button>
        </div>

        <div className="grid grid-cols-[1fr_100px_80px_70px_60px] gap-3 px-5 py-2.5 border-b border-slate-50 text-[11px] text-slate-400 font-medium uppercase tracking-wider">
          <span>Artifact</span>
          <span>Type</span>
          <span>Status</span>
          <span>Date</span>
          <span className="text-right">Action</span>
        </div>

        <div className="divide-y divide-slate-50">
          {artifacts.map((a) => (
            <div key={a.name} className="grid grid-cols-[1fr_100px_80px_70px_60px] gap-3 px-5 py-3 items-center hover:bg-slate-50/50 transition">
              <span className="text-sm font-medium text-slate-800 truncate">{a.name}</span>
              <span className="text-[11px] text-slate-500">{a.type}</span>
              <span className="text-[11px] text-slate-500">{a.status}</span>
              <span className="text-[11px] text-slate-400">{a.date}</span>
              <div className="text-right">
                <button className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:border-slate-300 transition">View</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
