"use client";

import { useState } from "react";
import { useDashboard, type Screen } from "@/lib/store";
import { Modal, Field, inputCls, selectCls } from "@/components/dashboard/Modal";

const ratings: Screen["canThey"][] = ["Strong", "Moderate", "Weak", "Unknown"];
const dispositions: Screen["disposition"][] = ["Advance", "Hold", "Pass"];

export default function ScreensPage() {
  const { candidatesInActiveSearch, screensInActiveSearch, candidateById, addScreen } = useDashboard();
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-black">Screens</h1>
          <p className="text-sm text-slate-500 mt-0.5">Candidate screening — three-question framework</p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition font-medium"
        >
          Log Screen
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { q: "Can they do it?", desc: "Scope, experience, and operating capability against the mandate" },
          { q: "Will they do it?", desc: "Motivation, timing, appetite for change, and role-specific interest" },
          { q: "Can we close them?", desc: "Comp alignment, competitive process, relocation, and deal-breakers" },
        ].map((item) => (
          <div key={item.q} className="bg-white rounded-xl border border-slate-200 p-4">
            <span className="text-sm font-semibold text-slate-800 block">{item.q}</span>
            <span className="text-[11px] text-slate-400 leading-4 block mt-1">{item.desc}</span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200">
        <div className="grid grid-cols-[1fr_65px_55px_70px_70px_70px_70px] gap-2 px-5 py-2.5 border-b border-slate-50 text-[11px] text-slate-400 font-medium uppercase tracking-wider">
          <span>Candidate</span>
          <span>Date</span>
          <span>Length</span>
          <span>Can they?</span>
          <span>Will they?</span>
          <span>Close?</span>
          <span className="text-right">Disposition</span>
        </div>

        {screensInActiveSearch.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm text-slate-400">No screens recorded yet.</div>
        ) : (
          <div className="divide-y divide-slate-50">
            {screensInActiveSearch.map((s) => {
              const cand = candidateById(s.candidateId);
              return (
                <div key={s.id} className="grid grid-cols-[1fr_65px_55px_70px_70px_70px_70px] gap-2 px-5 py-3 items-center hover:bg-slate-50/50 transition">
                  <span className="text-sm font-medium text-slate-800 truncate">{cand?.name ?? "—"}</span>
                  <span className="text-[11px] text-slate-400">{s.date}</span>
                  <span className="text-[11px] text-slate-400">{s.duration}</span>
                  <span className="text-[11px] text-slate-600">{s.canThey}</span>
                  <span className="text-[11px] text-slate-600">{s.willThey}</span>
                  <span className="text-[11px] text-slate-600">{s.canClose}</span>
                  <span className="text-[11px] text-slate-500 text-right">{s.disposition}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <LogScreenModal
        open={open}
        onClose={() => setOpen(false)}
        candidates={candidatesInActiveSearch}
        onAdd={addScreen}
      />
    </div>
  );
}

function LogScreenModal({
  open,
  onClose,
  candidates,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  candidates: ReturnType<typeof useDashboard>["candidatesInActiveSearch"];
  onAdd: (s: Omit<Screen, "id">) => void;
}) {
  const [candidateId, setCandidateId] = useState("");
  const [duration, setDuration] = useState("30 min");
  const [canThey, setCanThey] = useState<Screen["canThey"]>("Strong");
  const [willThey, setWillThey] = useState<Screen["willThey"]>("Strong");
  const [canClose, setCanClose] = useState<Screen["canClose"]>("Unknown");
  const [disposition, setDisposition] = useState<Screen["disposition"]>("Advance");

  return (
    <Modal open={open} onClose={onClose} title="Log Screen" width="max-w-lg">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!candidateId) return;
          const date = new Date().toLocaleString("en-US", { month: "short", day: "numeric" });
          onAdd({ candidateId, date, duration, canThey, willThey, canClose, disposition });
          setCandidateId("");
          onClose();
        }}
        className="space-y-3"
      >
        <Field label="Candidate">
          <select autoFocus value={candidateId} onChange={(e) => setCandidateId(e.target.value)} className={selectCls}>
            <option value="">Select candidate…</option>
            {candidates.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </Field>
        <Field label="Duration">
          <input value={duration} onChange={(e) => setDuration(e.target.value)} className={inputCls} />
        </Field>
        <div className="grid grid-cols-3 gap-3">
          <Field label="Can they?">
            <select value={canThey} onChange={(e) => setCanThey(e.target.value as Screen["canThey"])} className={selectCls}>
              {ratings.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </Field>
          <Field label="Will they?">
            <select value={willThey} onChange={(e) => setWillThey(e.target.value as Screen["willThey"])} className={selectCls}>
              {ratings.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </Field>
          <Field label="Close?">
            <select value={canClose} onChange={(e) => setCanClose(e.target.value as Screen["canClose"])} className={selectCls}>
              {ratings.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </Field>
        </div>
        <Field label="Disposition">
          <select value={disposition} onChange={(e) => setDisposition(e.target.value as Screen["disposition"])} className={selectCls}>
            {dispositions.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </Field>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="text-sm px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:border-slate-300 transition font-medium">
            Cancel
          </button>
          <button type="submit" className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition font-medium">
            Log Screen
          </button>
        </div>
      </form>
    </Modal>
  );
}
