"use client";

import { useDashboard } from "@/lib/store";

export default function CalibrationPage() {
  const { calibrationInActiveSearch, driftInActiveSearch, toggleCalibration, logActivity } =
    useDashboard();

  const allDone = calibrationInActiveSearch.every((c) => c.done);
  const driftedCount = driftInActiveSearch.filter((d) => d.status === "Drifted").length;

  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-black">Calibration</h1>
          <p className="text-sm text-slate-500 mt-0.5">Client alignment and drift control</p>
        </div>
        <button
          onClick={() => {
            logActivity(allDone ? "Calibration approval requested" : "Approval blocked — checklist incomplete");
            alert(allDone ? "Approval requested. Partner will review." : "Complete the checklist before requesting approval.");
          }}
          disabled={!allDone}
          className={`text-sm px-4 py-2 rounded-lg transition font-medium ${
            allDone
              ? "bg-black text-white hover:bg-slate-800"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
          }`}
        >
          Request Approval
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Approval checklist */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="text-sm font-semibold text-slate-800 mb-4">Launch Approval</h2>
          <div className="space-y-2">
            {calibrationInActiveSearch.length === 0 && (
              <div className="px-3 py-4 rounded-lg bg-slate-50 text-[12px] text-slate-400 text-center">
                No checklist items for this search yet.
              </div>
            )}
            {calibrationInActiveSearch.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleCalibration(item.id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 transition text-left"
              >
                {item.done ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-black shrink-0"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-300 shrink-0" />
                )}
                <span className={`text-[13px] ${item.done ? "text-slate-400 line-through" : "text-slate-700"}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Drift */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-800">Drift Detection</h2>
            {driftedCount > 0 && (
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-900 text-white font-medium">
                {driftedCount} drifted
              </span>
            )}
          </div>
          <div className="space-y-2">
            {driftInActiveSearch.map((d) => (
              <div key={d.id} className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-slate-50">
                <span className="text-[13px] text-slate-700">{d.check}</span>
                <span className={`text-[11px] font-medium ${d.status === "Aligned" ? "text-slate-400" : "text-black"}`}>
                  {d.status}
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={() => logActivity("Calibration snapshot reviewed")}
            className="mt-4 text-xs text-slate-500 hover:text-black font-medium transition"
          >
            View calibration snapshot
          </button>
        </div>
      </div>
    </div>
  );
}
