"use client";

import { useEffect, useMemo, useState } from "react";
import { useDashboard } from "@/lib/store";

export default function PartnerPage() {
  const { state, approveItem, dismissApproval } = useDashboard();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(Date.now());
  }, []);

  const searchHealth = useMemo(() => {
    return state.searches.map((s) => {
      const cands = state.candidates.filter((c) => c.searchId === s.id);
      const sigs = state.signals.filter((sig) => cands.some((c) => c.id === sig.candidateId));
      const lastActivity = state.activity
        .filter((a) => a.searchId === s.id)
        .sort((a, b) => b.at - a.at)[0];
      const staleDays = lastActivity && now
        ? Math.max(0, Math.floor((now - lastActivity.at) / (24 * 60 * 60 * 1000)))
        : 0;
      const blockers = sigs.filter((sg) => sg.status === "Unverified").length + (s.mandateLocked ? 0 : 1);
      return {
        id: s.id,
        search: `${s.title} — ${s.client}`,
        phase: s.phase,
        candidates: cands.length,
        presented: s.presentedCount,
        blockers,
        staleDays,
      };
    });
  }, [state.searches, state.candidates, state.signals, state.activity, now]);

  const alerts = useMemo(() => {
    const out: string[] = [];
    for (const s of searchHealth) {
      if (s.staleDays >= 7) {
        out.push(`${s.search} has had no activity for ${s.staleDays} days`);
      }
      if (s.blockers >= 3) {
        out.push(`${s.search} has ${s.blockers} blockers requiring partner attention`);
      }
    }
    return out;
  }, [searchHealth]);

  return (
    <div className="p-6 lg:p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-xl font-semibold tracking-tight text-black">Partner View</h1>
        <p className="text-sm text-slate-500 mt-0.5">Read-only oversight across all active searches</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6">
        <h2 className="text-sm font-semibold text-slate-800 mb-3">Attention</h2>
        {alerts.length === 0 ? (
          <div className="px-3 py-3 rounded-lg bg-slate-50 text-[12px] text-slate-400 text-center">
            All searches are running clean.
          </div>
        ) : (
          <div className="space-y-2">
            {alerts.map((a) => (
              <div key={a} className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg bg-slate-50">
                <div className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                <span className="text-[13px] text-slate-600 leading-5">{a}</span>
              </div>
            ))}
          </div>
        )}
      </div>

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
            <div key={s.id} className="grid grid-cols-[1fr_70px_70px_70px_70px_60px] gap-3 px-5 py-3 items-center hover:bg-slate-50/50 transition">
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

      <div className="bg-white rounded-xl border border-slate-200">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-800">Pending Approvals</h2>
        </div>
        {state.approvals.length === 0 ? (
          <div className="px-5 py-8 text-center text-sm text-slate-400">No approvals pending.</div>
        ) : (
          <div className="divide-y divide-slate-50">
            {state.approvals.map((p) => (
              <div key={p.id} className="flex items-center justify-between px-5 py-3.5">
                <div>
                  <span className="text-sm font-medium text-slate-800 block">{p.item}</span>
                  <span className="text-[11px] text-slate-400">{p.search} · {p.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => dismissApproval(p.id)}
                    className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:border-slate-300 transition"
                  >
                    Dismiss
                  </button>
                  <button
                    onClick={() => approveItem(p.id)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-black text-white font-medium hover:bg-slate-800 transition"
                  >
                    Approve
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
