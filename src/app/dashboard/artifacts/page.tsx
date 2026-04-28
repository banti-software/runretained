"use client";

import { useMemo, useState } from "react";
import { useDashboard, type Artifact } from "@/lib/store";
import { Modal, Field, inputCls, selectCls } from "@/components/dashboard/Modal";

const types = [
  "Mandate",
  "Role brief",
  "Intake",
  "Defense brief",
  "Outreach",
  "Market map",
  "Scorecard",
  "Slate deck",
];

export default function ArtifactsPage() {
  const { artifactsInActiveSearch, addArtifact } = useDashboard();
  const [open, setOpen] = useState(false);
  const [viewArtifact, setViewArtifact] = useState<Artifact | null>(null);
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filtered = useMemo(
    () => (typeFilter === "all" ? artifactsInActiveSearch : artifactsInActiveSearch.filter((a) => a.type === typeFilter)),
    [artifactsInActiveSearch, typeFilter]
  );

  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-black">Artifacts</h1>
          <p className="text-sm text-slate-500 mt-0.5">Governed work products for this search</p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition font-medium"
        >
          Generate Artifact
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <span className="text-xs text-slate-400">{filtered.length} artifacts</span>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 focus:outline-none focus:border-slate-400 transition"
          >
            <option value="all">All types</option>
            {types.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-[1fr_100px_80px_70px_60px] gap-3 px-5 py-2.5 border-b border-slate-50 text-[11px] text-slate-400 font-medium uppercase tracking-wider">
          <span>Artifact</span>
          <span>Type</span>
          <span>Status</span>
          <span>Date</span>
          <span className="text-right">Action</span>
        </div>

        {filtered.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm text-slate-400">No artifacts yet.</div>
        ) : (
          <div className="divide-y divide-slate-50">
            {filtered.map((a) => (
              <div key={a.id} className="grid grid-cols-[1fr_100px_80px_70px_60px] gap-3 px-5 py-3 items-center hover:bg-slate-50/50 transition">
                <span className="text-sm font-medium text-slate-800 truncate">{a.name}</span>
                <span className="text-[11px] text-slate-500">{a.type}</span>
                <span className="text-[11px] text-slate-500">{a.status}</span>
                <span className="text-[11px] text-slate-400">{a.date}</span>
                <div className="text-right">
                  <button
                    onClick={() => setViewArtifact(a)}
                    className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:border-slate-300 transition"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <NewArtifactModal open={open} onClose={() => setOpen(false)} onAdd={addArtifact} />

      <Modal open={!!viewArtifact} onClose={() => setViewArtifact(null)} title={viewArtifact?.name ?? ""} width="max-w-lg">
        {viewArtifact && (
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-3 text-[12px]">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Type</span>
                <span className="text-slate-700">{viewArtifact.type}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Status</span>
                <span className="text-slate-700">{viewArtifact.status}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Date</span>
                <span className="text-slate-700">{viewArtifact.date}</span>
              </div>
            </div>
            <div className="px-3 py-3 rounded-lg bg-slate-50 text-[12px] text-slate-500 leading-relaxed">
              Generated artifact preview. Open the document to view full content, evidence sources, and audit trail.
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

function NewArtifactModal({
  open,
  onClose,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (a: Omit<Artifact, "id" | "searchId" | "date" | "status">) => void;
}) {
  const [name, setName] = useState("");
  const [type, setType] = useState(types[0]);
  return (
    <Modal open={open} onClose={onClose} title="Generate Artifact">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!name.trim()) return;
          onAdd({ name: name.trim(), type });
          setName("");
          setType(types[0]);
          onClose();
        }}
        className="space-y-3"
      >
        <Field label="Name">
          <input autoFocus value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
        </Field>
        <Field label="Type">
          <select value={type} onChange={(e) => setType(e.target.value)} className={selectCls}>
            {types.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="text-sm px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:border-slate-300 transition font-medium">
            Cancel
          </button>
          <button type="submit" className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition font-medium">
            Generate
          </button>
        </div>
      </form>
    </Modal>
  );
}
