"use client";

import { useMemo, useState } from "react";
import { useDashboard, type Stage } from "@/lib/store";
import { Modal, Field, inputCls, selectCls } from "@/components/dashboard/Modal";
import { CandidateDrawer } from "@/components/dashboard/CandidateDrawer";

const STAGES: Stage[] = [
  "Identified",
  "Contacted",
  "Screened",
  "Evaluated",
  "Slated",
  "Interviewing",
  "Offer",
  "Hired",
  "Passed",
];

type SortKey = "score" | "name" | "stage";

export default function CandidatesPage() {
  const { candidatesInActiveSearch, signalsInActiveSearch, addCandidate } = useDashboard();

  const [query, setQuery] = useState("");
  const [stageFilter, setStageFilter] = useState<Stage | "all">("all");
  const [sortKey, setSortKey] = useState<SortKey>("score");
  const [addOpen, setAddOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [drawerId, setDrawerId] = useState<string | null>(null);

  const drawerCandidate = useMemo(
    () => candidatesInActiveSearch.find((c) => c.id === drawerId) ?? null,
    [candidatesInActiveSearch, drawerId]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return candidatesInActiveSearch
      .filter((c) => {
        if (stageFilter !== "all" && c.stage !== stageFilter) return false;
        if (q && !c.name.toLowerCase().includes(q) && !c.role.toLowerCase().includes(q)) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortKey === "score") return (b.score ?? 0) - (a.score ?? 0);
        if (sortKey === "name") return a.name.localeCompare(b.name);
        return STAGES.indexOf(a.stage) - STAGES.indexOf(b.stage);
      });
  }, [candidatesInActiveSearch, query, stageFilter, sortKey]);

  return (
    <div className="p-6 lg:p-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-black">Candidates</h1>
          <p className="text-sm text-slate-500 mt-0.5">All candidates in this search</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setImportOpen(true)}
            className="text-sm px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:border-slate-300 transition font-medium"
          >
            Import
          </button>
          <button
            onClick={() => setAddOpen(true)}
            className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition font-medium"
          >
            Add Candidate
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-slate-100">
          <span className="text-xs text-slate-400">
            {filtered.length} of {candidatesInActiveSearch.length} candidates
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name or role"
              className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 focus:outline-none focus:border-slate-400 transition w-56"
            />
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value as Stage | "all")}
              className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 focus:outline-none focus:border-slate-400 transition"
            >
              <option value="all">All stages</option>
              {STAGES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 focus:outline-none focus:border-slate-400 transition"
            >
              <option value="score">Sort: score</option>
              <option value="name">Sort: name</option>
              <option value="stage">Sort: stage</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_90px_50px_50px_50px] gap-3 px-5 py-2.5 border-b border-slate-50 text-[11px] text-slate-400 font-medium uppercase tracking-wider">
          <span>Candidate</span>
          <span>Stage</span>
          <span className="text-right">Score</span>
          <span className="text-right">Signals</span>
          <span className="text-right">Fit</span>
        </div>

        {filtered.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm text-slate-400">No candidates match your filter.</div>
        ) : (
          <div className="divide-y divide-slate-50">
            {filtered.map((c) => {
              const sigCount = signalsInActiveSearch.filter((s) => s.candidateId === c.id).length;
              return (
                <button
                  key={c.id}
                  onClick={() => setDrawerId(c.id)}
                  className="grid grid-cols-[1fr_90px_50px_50px_50px] gap-3 px-5 py-3 items-center hover:bg-slate-50/50 transition w-full text-left"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-medium text-slate-500 shrink-0">
                      {c.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="min-w-0">
                      <span className="text-sm font-medium text-slate-800 block truncate">{c.name}</span>
                      <span className="text-[11px] text-slate-400 block truncate">{c.role}</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-500">{c.stage}</span>
                  <span className="text-sm font-medium text-slate-700 text-right">{c.score?.toFixed(1) ?? "—"}</span>
                  <span className="text-sm text-slate-500 text-right">{sigCount}</span>
                  <span className="text-sm text-slate-500 text-right">{c.coverage !== null ? `${c.coverage}%` : "—"}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <AddModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={(c) => addCandidate(c)}
      />
      <ImportModal
        open={importOpen}
        onClose={() => setImportOpen(false)}
        onImport={(rows) => {
          for (const r of rows) addCandidate(r);
        }}
      />
      <CandidateDrawer candidate={drawerCandidate} onClose={() => setDrawerId(null)} />
    </div>
  );
}

function AddModal({
  open,
  onClose,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (c: { name: string; role: string; stage: Stage }) => void;
}) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [stage, setStage] = useState<Stage>("Identified");
  return (
    <Modal open={open} onClose={onClose} title="Add Candidate">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!name.trim() || !role.trim()) return;
          onAdd({ name: name.trim(), role: role.trim(), stage });
          setName("");
          setRole("");
          setStage("Identified");
          onClose();
        }}
        className="space-y-3"
      >
        <Field label="Name">
          <input autoFocus value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
        </Field>
        <Field label="Current role">
          <input value={role} onChange={(e) => setRole(e.target.value)} className={inputCls} />
        </Field>
        <Field label="Stage">
          <select value={stage} onChange={(e) => setStage(e.target.value as Stage)} className={selectCls}>
            {STAGES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
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

function ImportModal({
  open,
  onClose,
  onImport,
}: {
  open: boolean;
  onClose: () => void;
  onImport: (rows: { name: string; role: string }[]) => void;
}) {
  const [bulk, setBulk] = useState("");

  return (
    <Modal open={open} onClose={onClose} title="Import Candidates">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const rows = bulk
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean)
            .map((line) => {
              const [name, ...rest] = line.split(",").map((p) => p.trim());
              return { name, role: rest.join(", ") || "—" };
            })
            .filter((r) => r.name);
          if (rows.length === 0) return;
          onImport(rows);
          setBulk("");
          onClose();
        }}
        className="space-y-3"
      >
        <Field label="Paste candidates" hint="One per line, comma-separated: Name, Role">
          <textarea
            autoFocus
            value={bulk}
            onChange={(e) => setBulk(e.target.value)}
            className={inputCls + " min-h-[120px] resize-y font-mono text-[12px]"}
            placeholder={"Sarah Chen, VP Eng\nMarcus Rivera, CTO"}
          />
        </Field>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="text-sm px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:border-slate-300 transition font-medium">
            Cancel
          </button>
          <button type="submit" className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition font-medium">
            Import
          </button>
        </div>
      </form>
    </Modal>
  );
}
