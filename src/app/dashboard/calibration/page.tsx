"use client";

const calibrationItems = [
  { label: "Search thesis reviewed", done: true },
  { label: "Target company map approved", done: true },
  { label: "Compensation positioning confirmed", done: true },
  { label: "Screening criteria locked", done: false },
  { label: "Outreach narrative approved", done: false },
];

const driftChecks = [
  { check: "Must-have requirements match original calibration", status: "Aligned" },
  { check: "Compensation range unchanged from approval", status: "Aligned" },
  { check: "Target company list matches approved map", status: "Aligned" },
  { check: "Timeline expectations consistent", status: "Drifted" },
];

export default function CalibrationPage() {
  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-black">Calibration</h1>
          <p className="text-sm text-slate-500 mt-0.5">Client alignment and drift control</p>
        </div>
        <button className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition font-medium">
          Request Approval
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Approval checklist */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="text-sm font-semibold text-slate-800 mb-4">Launch Approval</h2>
          <div className="space-y-2">
            {calibrationItems.map((item) => (
              <div key={item.label} className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-slate-50">
                {item.done ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-black shrink-0"><path d="M20 6 9 17l-5-5"/></svg>
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-300 shrink-0" />
                )}
                <span className={`text-[13px] ${item.done ? "text-slate-400" : "text-slate-700"}`}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Drift detection */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="text-sm font-semibold text-slate-800 mb-4">Drift Detection</h2>
          <div className="space-y-2">
            {driftChecks.map((d) => (
              <div key={d.check} className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-slate-50">
                <span className="text-[13px] text-slate-700">{d.check}</span>
                <span className={`text-[11px] font-medium ${d.status === "Aligned" ? "text-slate-400" : "text-black"}`}>{d.status}</span>
              </div>
            ))}
          </div>
          <button className="mt-4 text-xs text-slate-500 hover:text-black font-medium transition">
            View calibration snapshot
          </button>
        </div>
      </div>
    </div>
  );
}
