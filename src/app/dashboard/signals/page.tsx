"use client";

import { useMemo, useState } from "react";
import { useDashboard, type Signal } from "@/lib/store";
import { Modal, Field, inputCls, selectCls } from "@/components/dashboard/Modal";

const confidences: Signal["confidence"][] = ["High", "Medium", "Low"];

export default function SignalsPage() {
  const {
    candidatesInActiveSearch,
    signalsInActiveSearch,
    candidateById,
    addSignal,
    toggleSignalVerified,
  } = useDashboard();

  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"all" | "queue" | "byCandidate">("all");
  const [candidateFilter, setCandidateFilter] = useState<string>("");

  const filtered = useMemo(() => {
    let list = signalsInActiveSearch;
    if (view === "queue") list = list.filter((s) => s.status === "Unverified");
    if (view === "byCandidate" && candidateFilter) list = list.filter((s) => s.candidateId === candidateFilter);
    return list;
  }, [signalsInActiveSearch, view, candidateFilter]);

  return (
    <div className="p-6 lg:p-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-black">Signals</h1>
          <p className="text-sm text-slate-500 mt-0.5">Evidence extracted from interactions</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView(view === "queue" ? "all" : "queue")}
            className={`text-sm px-4 py-2 rounded-lg border transition font-medium ${
              view === "queue"
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 text-slate-700 hover:border-slate-300"
            }`}
          >
            Verification Queue
          </button>
          <button
            onClick={() => setOpen(true)}
            className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition font-medium"
          >
            Add Signal
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-4 border-b border-slate-100">
          <span className="text-xs text-slate-400">{filtered.length} signals</span>
          <div className="flex items-center gap-2">
            <select
              value={view === "byCandidate" ? candidateFilter : ""}
              onChange={(e) => {
                if (e.target.value) {
                  setView("byCandidate");
                  setCandidateFilter(e.target.value);
                } else {
                  setView("all");
                  setCandidateFilter("");
                }
              }}
              className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 focus:outline-none focus:border-slate-400 transition"
            >
              <option value="">All candidates</option>
              {candidatesInActiveSearch.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <button
              onClick={() => {
                setView("all");
                setCandidateFilter("");
              }}
              className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:border-slate-300 transition"
            >
              Reset
            </button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm text-slate-400">No signals match this view.</div>
        ) : (
          <div className="divide-y divide-slate-50">
            {filtered.map((s) => {
              const cand = candidateById(s.candidateId);
              return (
                <div key={s.id} className="px-5 py-3.5 hover:bg-slate-50/50 transition">
                  <div className="flex justify-between items-start gap-3">
                    <p className="text-sm text-slate-800">{s.text}</p>
                    <button
                      onClick={() => toggleSignalVerified(s.id)}
                      className={`text-[10px] px-2 py-1 rounded-md font-medium shrink-0 transition ${
                        s.status === "Verified"
                          ? "bg-slate-900 text-white"
                          : "border border-slate-200 text-slate-500 hover:border-slate-400"
                      }`}
                    >
                      {s.status}
                    </button>
                  </div>
                  <div className="flex items-center gap-4 mt-1.5 flex-wrap">
                    <span className="text-[11px] text-slate-500">{cand?.name ?? "—"}</span>
                    <span className="text-[11px] text-slate-400">{s.source}</span>
                    <span className="text-[11px] text-slate-400">Req: {s.requirement}</span>
                    <span className="text-[11px] text-slate-400">{s.confidence} confidence</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <AddSignalModal
        open={open}
        onClose={() => setOpen(false)}
        candidates={candidatesInActiveSearch}
        onAdd={addSignal}
      />
    </div>
  );
}

function AddSignalModal({
  open,
  onClose,
  candidates,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  candidates: ReturnType<typeof useDashboard>["candidatesInActiveSearch"];
  onAdd: (s: Omit<Signal, "id" | "status">) => void;
}) {
  const [text, setText] = useState("");
  const [candidateId, setCandidateId] = useState("");
  const [requirement, setRequirement] = useState("");
  const [confidence, setConfidence] = useState<Signal["confidence"]>("Medium");

  return (
    <Modal open={open} onClose={onClose} title="Add Signal" width="max-w-lg">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!text.trim() || !candidateId) return;
          const source = `Manual — ${new Date().toLocaleString("en-US", { month: "short", day: "numeric" })}`;
          onAdd({ candidateId, text: text.trim(), source, requirement: requirement.trim() || "—", confidence });
          setText("");
          setCandidateId("");
          setRequirement("");
          onClose();
        }}
        className="space-y-3"
      >
        <Field label="Candidate">
          <select autoFocus value={candidateId} onChange={(e) => setCandidateId(e.target.value)} className={selectCls}>
            <option value="">Select candidate…</option>
            {candidates.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </Field>
        <Field label="Signal">
          <textarea value={text} onChange={(e) => setText(e.target.value)} className={inputCls + " min-h-[80px] resize-y"} placeholder="e.g. Led 200→600 eng team over 3 years" />
        </Field>
        <Field label="Maps to requirement">
          <input value={requirement} onChange={(e) => setRequirement(e.target.value)} className={inputCls} placeholder="500+ eng org leadership" />
        </Field>
        <Field label="Confidence">
          <select value={confidence} onChange={(e) => setConfidence(e.target.value as Signal["confidence"])} className={selectCls}>
            {confidences.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="text-sm px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:border-slate-300 transition font-medium">
            Cancel
          </button>
          <button type="submit" className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition font-medium">
            Add
          </button>
        </div>
      </form>
    </Modal>
  );
}
