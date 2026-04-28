"use client";

import { useMemo, useState } from "react";
import { useDashboard } from "@/lib/store";
import { Modal } from "@/components/dashboard/Modal";
import { CandidateDrawer } from "@/components/dashboard/CandidateDrawer";

export default function SlatePage() {
  const { candidatesInActiveSearch, artifactsInActiveSearch, addArtifact, logActivity } = useDashboard();
  const [drawerId, setDrawerId] = useState<string | null>(null);
  const [deckOpen, setDeckOpen] = useState(false);

  const slate = useMemo(
    () =>
      [...candidatesInActiveSearch]
        .filter((c) => c.score !== null && c.score >= 3.5)
        .sort((a, b) => (b.score ?? 0) - (a.score ?? 0)),
    [candidatesInActiveSearch]
  );

  const drawerCandidate = useMemo(
    () => candidatesInActiveSearch.find((c) => c.id === drawerId) ?? null,
    [candidatesInActiveSearch, drawerId]
  );

  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-black">Slate</h1>
          <p className="text-sm text-slate-500 mt-0.5">Candidates ready for client presentation</p>
        </div>
        <button
          onClick={() => {
            addArtifact({ name: `Slate Deck — ${new Date().toLocaleString("en-US", { month: "short", day: "numeric" })}`, type: "Slate deck" });
            setDeckOpen(true);
          }}
          className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition font-medium"
        >
          Generate Slate Deck
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200">
        <div className="grid grid-cols-[1fr_50px_60px_60px_90px_80px] gap-3 px-5 py-2.5 border-b border-slate-50 text-[11px] text-slate-400 font-medium uppercase tracking-wider">
          <span>Candidate</span>
          <span className="text-right">Score</span>
          <span className="text-right">Fit</span>
          <span className="text-right">Stage</span>
          <span>Brief</span>
          <span className="text-right">Action</span>
        </div>

        {slate.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm text-slate-400">
            No candidates above 3.5 score yet — log screens to qualify candidates for slate.
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {slate.map((c) => {
              const brief = artifactsInActiveSearch.find(
                (a) => a.type === "Defense brief" && a.name.includes(c.name)
              );
              const briefStatus = brief?.status ?? "Not started";
              const ready = brief?.status === "Approved";
              return (
                <div key={c.id} className="grid grid-cols-[1fr_50px_60px_60px_90px_80px] gap-3 px-5 py-3.5 items-center">
                  <button
                    onClick={() => setDrawerId(c.id)}
                    className="flex items-center gap-2.5 text-left hover:opacity-80 transition"
                  >
                    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-medium text-slate-500 shrink-0">
                      {c.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <span className="text-sm font-medium text-slate-800">{c.name}</span>
                  </button>
                  <span className="text-sm font-medium text-slate-700 text-right">{c.score?.toFixed(1)}</span>
                  <span className="text-sm text-slate-500 text-right">{c.coverage !== null ? `${c.coverage}%` : "—"}</span>
                  <span className="text-[11px] text-slate-500 text-right">{c.stage}</span>
                  <span className="text-[11px] text-slate-500">{briefStatus}</span>
                  <div className="text-right">
                    {ready ? (
                      <button
                        onClick={() => logActivity(`Presented ${c.name} to client`)}
                        className="text-xs px-3 py-1.5 rounded-lg bg-black text-white font-medium hover:bg-slate-800 transition"
                      >
                        Present
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          addArtifact({ name: `Defense Brief — ${c.name}`, type: "Defense brief" });
                          logActivity(`Defense brief drafted: ${c.name}`);
                        }}
                        className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:border-slate-300 transition"
                      >
                        Draft Brief
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <CandidateDrawer candidate={drawerCandidate} onClose={() => setDrawerId(null)} />

      <Modal open={deckOpen} onClose={() => setDeckOpen(false)} title="Slate Deck Generated">
        <div className="space-y-3">
          <p className="text-[13px] text-slate-700 leading-relaxed">
            A new slate deck artifact was added. Find it under{" "}
            <span className="font-medium">Artifacts</span>.
          </p>
          <div className="px-3 py-2.5 rounded-lg bg-slate-50">
            <span className="text-[12px] text-slate-500 leading-relaxed block">
              Includes: {slate.length} qualified candidates, scoring rubric, evidence summary,
              and stakeholder Q&amp;A prep.
            </span>
          </div>
          <div className="flex justify-end pt-1">
            <button
              onClick={() => setDeckOpen(false)}
              className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
