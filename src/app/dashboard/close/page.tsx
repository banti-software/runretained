"use client";

import { useMemo, useState } from "react";
import { useDashboard } from "@/lib/store";
import { Modal, Field, textareaCls } from "@/components/dashboard/Modal";
import { CandidateDrawer } from "@/components/dashboard/CandidateDrawer";

export default function ClosePage() {
  const { state, candidatesInActiveSearch, candidateById, addArtifact, logActivity } = useDashboard();
  const [drawerId, setDrawerId] = useState<string | null>(null);
  const [strategy, setStrategy] = useState<{ open: boolean; text: string }>({ open: false, text: "" });
  const [refsOpen, setRefsOpen] = useState<string | null>(null);

  const finalists = useMemo(
    () =>
      state.finalists
        .map((f) => ({ ...f, candidate: candidateById(f.candidateId) }))
        .filter((f) => f.candidate),
    [state.finalists, candidateById]
  );

  const drawerCandidate = useMemo(
    () => candidatesInActiveSearch.find((c) => c.id === drawerId) ?? null,
    [candidatesInActiveSearch, drawerId]
  );

  const refsCandidate = refsOpen ? candidateById(refsOpen) : null;

  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-black">Offers & Close</h1>
          <p className="text-sm text-slate-500 mt-0.5">Finalist management, references, and offer strategy</p>
        </div>
        <button
          onClick={() => setStrategy({ open: true, text: "" })}
          className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition font-medium"
        >
          Draft Offer Strategy
        </button>
      </div>

      <div className="space-y-4">
        {finalists.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-sm text-slate-400">
            No finalists yet — promote candidates to slate and progress them through interviews.
          </div>
        ) : (
          finalists.map((f) => (
            <div key={f.candidateId} className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setDrawerId(f.candidateId)}
                  className="flex items-center gap-2.5 text-left hover:opacity-80 transition"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[11px] font-medium text-slate-500">
                    {f.candidate!.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-800 block">{f.candidate!.name}</span>
                    <span className="text-[11px] text-slate-400">{f.stage}</span>
                  </div>
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setDrawerId(f.candidateId)}
                    className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:border-slate-300 transition"
                  >
                    View Close Tracker
                  </button>
                  <button
                    onClick={() => setRefsOpen(f.candidateId)}
                    className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:border-slate-300 transition"
                  >
                    References
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Stat label="Client conviction" value={f.conviction.client} />
                <Stat label="Candidate conviction" value={f.conviction.candidate} />
                <Stat label="Competitive process" value={f.competitive} />
                <Stat label="Counteroffer risk" value={f.counterofferRisk} />
              </div>

              {f.concerns && (
                <div className="mt-4 px-3 py-2.5 rounded-lg bg-slate-50">
                  <span className="text-[11px] text-slate-400 block mb-0.5">Open concern</span>
                  <span className="text-[13px] text-slate-700">{f.concerns}</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <CandidateDrawer candidate={drawerCandidate} onClose={() => setDrawerId(null)} />

      <Modal open={strategy.open} onClose={() => setStrategy({ open: false, text: "" })} title="Draft Offer Strategy" width="max-w-lg">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!strategy.text.trim()) return;
            addArtifact({ name: `Offer Strategy — ${new Date().toLocaleString("en-US", { month: "short", day: "numeric" })}`, type: "Offer strategy" });
            logActivity("Offer strategy drafted");
            setStrategy({ open: false, text: "" });
          }}
          className="space-y-3"
        >
          <Field label="Notes" hint="Captured as an artifact under Artifacts">
            <textarea
              autoFocus
              value={strategy.text}
              onChange={(e) => setStrategy({ ...strategy, text: e.target.value })}
              className={textareaCls + " min-h-[140px]"}
              placeholder="Comp anchoring, equity mix, response timing, counteroffer playbook…"
            />
          </Field>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setStrategy({ open: false, text: "" })} className="text-sm px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:border-slate-300 transition font-medium">
              Cancel
            </button>
            <button type="submit" className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition font-medium">
              Save Strategy
            </button>
          </div>
        </form>
      </Modal>

      <Modal open={!!refsCandidate} onClose={() => setRefsOpen(null)} title={`References — ${refsCandidate?.name ?? ""}`}>
        {refsCandidate && (
          <div className="space-y-3">
            <div className="px-3 py-2.5 rounded-lg bg-slate-50 text-[12px] text-slate-500 leading-relaxed">
              Reference checks complete: 3 of 5. Add reference outcomes to candidate signals as they come in.
            </div>
            <ul className="space-y-2 text-[12px] text-slate-600">
              <li className="px-3 py-2 rounded-lg bg-slate-50">Former CEO at last company — Strong</li>
              <li className="px-3 py-2 rounded-lg bg-slate-50">Direct report at scale-up — Strong</li>
              <li className="px-3 py-2 rounded-lg bg-slate-50">Board member — Strong</li>
            </ul>
          </div>
        )}
      </Modal>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-[11px] text-slate-400 block mb-1">{label}</span>
      <span className="text-sm text-slate-700">{value}</span>
    </div>
  );
}
