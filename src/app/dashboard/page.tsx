"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useDashboard, formatRelative, type Phase, type Stage } from "@/lib/store";
import { Modal, Field, inputCls, selectCls, textareaCls } from "@/components/dashboard/Modal";
import { CandidateDrawer } from "@/components/dashboard/CandidateDrawer";

const PHASES: Phase[] = ["Define", "Source", "Assess", "Present", "Close"];

const VERIFIED_STAGES: Stage[] = [
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

export default function DashboardPage() {
  const {
    activeSearch,
    candidatesInActiveSearch,
    requirementsInActiveSearch,
    activityInActiveSearch,
    signalsInActiveSearch,
    addCandidate,
    logActivity,
  } = useDashboard();

  const [addOpen, setAddOpen] = useState(false);
  const [logOpen, setLogOpen] = useState(false);
  const [drawerCandidateId, setDrawerCandidateId] = useState<string | null>(null);

  const drawerCandidate = useMemo(
    () => candidatesInActiveSearch.find((c) => c.id === drawerCandidateId) ?? null,
    [candidatesInActiveSearch, drawerCandidateId]
  );

  const phaseStatuses = useMemo(() => {
    const idx = PHASES.indexOf(activeSearch.phase);
    return PHASES.map((p, i) => ({
      label: p,
      status: i < idx ? "complete" : i === idx ? "active" : "upcoming",
    }));
  }, [activeSearch.phase]);

  const mandateBuckets = useMemo(() => {
    const counts = { "Must-have": 0, "Core": 0, "Contextual": 0, "Anti-signal": 0 };
    for (const r of requirementsInActiveSearch) counts[r.bucket]++;
    return counts;
  }, [requirementsInActiveSearch]);

  const needsAttention = useMemo(() => {
    const out: { text: string; area: string; href: string }[] = [];
    const unverified = signalsInActiveSearch.filter((s) => s.status === "Unverified").length;
    if (unverified > 0) {
      out.push({ text: `${unverified} signals pending verification`, area: "Assess", href: "/dashboard/signals" });
    }
    const stale = candidatesInActiveSearch.filter((c) => c.stage === "Contacted" && c.score === null).length;
    if (stale > 0) {
      out.push({ text: `${stale} candidates without screen activity`, area: "Source", href: "/dashboard/candidates" });
    }
    if (!activeSearch.mandateLocked) {
      out.push({ text: "Mandate not yet locked", area: "Define", href: "/dashboard/mandate" });
    }
    return out.slice(0, 4);
  }, [signalsInActiveSearch, candidatesInActiveSearch, activeSearch.mandateLocked]);

  const pipeline = useMemo(
    () =>
      [...candidatesInActiveSearch]
        .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
        .slice(0, 5),
    [candidatesInActiveSearch]
  );

  return (
    <div className="p-6 lg:p-8 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-black">Command Center</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {activeSearch.title} Search — {activeSearch.client}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLogOpen(true)}
            className="text-sm px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:border-slate-300 transition font-medium"
          >
            Log Interaction
          </button>
          <button
            onClick={() => setAddOpen(true)}
            className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition font-medium"
          >
            Add Candidate
          </button>
        </div>
      </div>

      {/* Phase progress */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-slate-800">Search Progress</h2>
          <span className="text-xs text-slate-400">
            {activeSearch.mandateLocked
              ? `Mandate v${activeSearch.mandateVersion} locked`
              : "Mandate in progress"}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {phaseStatuses.map((phase, i) => (
            <div key={phase.label} className="flex-1 flex items-center gap-1">
              <div className="flex-1">
                <div
                  className={`h-1.5 rounded-full ${
                    phase.status === "complete"
                      ? "bg-black"
                      : phase.status === "active"
                      ? "bg-slate-400"
                      : "bg-slate-200"
                  }`}
                />
                <span className={`text-[11px] block mt-1.5 ${phase.status === "upcoming" ? "text-slate-300" : "text-slate-500"}`}>
                  {phase.label}
                </span>
              </div>
              {i < phaseStatuses.length - 1 && <div className="w-1" />}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-800">Pipeline</h2>
            <Link
              href="/dashboard/candidates"
              className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:border-slate-300 transition"
            >
              All
            </Link>
          </div>

          <div className="grid grid-cols-[1fr_80px_50px_50px_50px] gap-3 px-5 py-2.5 border-b border-slate-50 text-[11px] text-slate-400 font-medium uppercase tracking-wider">
            <span>Candidate</span>
            <span>Stage</span>
            <span className="text-right">Score</span>
            <span className="text-right">Signals</span>
            <span className="text-right">Fit</span>
          </div>

          {pipeline.length === 0 ? (
            <div className="px-5 py-10 text-center text-sm text-slate-400">
              No candidates yet. Click <span className="text-slate-700 font-medium">Add Candidate</span> to start.
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {pipeline.map((c) => {
                const sigCount = signalsInActiveSearch.filter((s) => s.candidateId === c.id).length;
                return (
                  <button
                    key={c.id}
                    onClick={() => setDrawerCandidateId(c.id)}
                    className="grid grid-cols-[1fr_80px_50px_50px_50px] gap-3 px-5 py-3 items-center hover:bg-slate-50/50 transition text-left w-full"
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
                    <span className="text-[11px] text-slate-500 truncate">{c.stage}</span>
                    <span className="text-sm font-medium text-slate-700 text-right">
                      {c.score?.toFixed(1) ?? "—"}
                    </span>
                    <span className="text-sm text-slate-500 text-right">{sigCount}</span>
                    <span className="text-sm text-slate-500 text-right">
                      {c.coverage !== null ? `${c.coverage}%` : "—"}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Showing {pipeline.length} of {candidatesInActiveSearch.length}
            </span>
            <Link href="/dashboard/candidates" className="text-xs text-slate-500 hover:text-black font-medium transition">
              View all
            </Link>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Needs attention */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="text-sm font-semibold text-slate-800 mb-3">Needs Attention</h2>
            {needsAttention.length === 0 ? (
              <div className="px-3 py-4 rounded-lg bg-slate-50 text-[12px] text-slate-400 text-center">
                Nothing pressing right now
              </div>
            ) : (
              <div className="space-y-2">
                {needsAttention.map((item) => (
                  <Link
                    key={item.text}
                    href={item.href}
                    className="flex items-start justify-between gap-3 px-3 py-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 transition"
                  >
                    <span className="text-[13px] text-slate-600 leading-5">{item.text}</span>
                    <span className="text-[10px] text-slate-400 shrink-0 mt-0.5">{item.area}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mandate */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-slate-800">Mandate</h2>
              <span className="text-[11px] text-slate-400">v{activeSearch.mandateVersion}</span>
            </div>
            <div className="space-y-2 text-[13px]">
              <div className="flex justify-between"><span className="text-slate-500">Must-haves</span><span className="text-slate-800 font-medium">{mandateBuckets["Must-have"]}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Core</span><span className="text-slate-800 font-medium">{mandateBuckets["Core"]}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Contextual</span><span className="text-slate-800 font-medium">{mandateBuckets["Contextual"]}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Anti-signals</span><span className="text-slate-800 font-medium">{mandateBuckets["Anti-signal"]}</span></div>
            </div>
            <Link
              href="/dashboard/mandate"
              className="mt-4 w-full block text-center text-xs px-3 py-2 rounded-lg border border-slate-200 text-slate-600 hover:border-slate-300 transition font-medium"
            >
              View Mandate
            </Link>
          </div>

          {/* Activity */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="text-sm font-semibold text-slate-800 mb-3">Activity</h2>
            {activityInActiveSearch.length === 0 ? (
              <div className="px-3 py-4 rounded-lg bg-slate-50 text-[12px] text-slate-400 text-center">
                No activity yet
              </div>
            ) : (
              <div className="space-y-3">
                {activityInActiveSearch.slice(0, 6).map((a) => (
                  <div key={a.id} className="flex items-start gap-2.5">
                    <div className="w-1 h-1 rounded-full bg-slate-300 mt-2 shrink-0" />
                    <div>
                      <span className="text-[13px] text-slate-600 leading-5 block">{a.text}</span>
                      <span className="text-[11px] text-slate-400">{formatRelative(a.at)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <AddCandidateModal open={addOpen} onClose={() => setAddOpen(false)} onAdd={addCandidate} />
      <LogInteractionModal open={logOpen} onClose={() => setLogOpen(false)} onLog={logActivity} />
      <CandidateDrawer candidate={drawerCandidate} onClose={() => setDrawerCandidateId(null)} />
    </div>
  );
}

function AddCandidateModal({
  open,
  onClose,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (c: { name: string; role: string; stage?: Stage }) => void;
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
          <input autoFocus value={name} onChange={(e) => setName(e.target.value)} className={inputCls} placeholder="Sarah Chen" />
        </Field>
        <Field label="Current role">
          <input value={role} onChange={(e) => setRole(e.target.value)} className={inputCls} placeholder="VP Eng, Series D Fintech" />
        </Field>
        <Field label="Stage">
          <select value={stage} onChange={(e) => setStage(e.target.value as Stage)} className={selectCls}>
            {VERIFIED_STAGES.map((s) => (
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

function LogInteractionModal({
  open,
  onClose,
  onLog,
}: {
  open: boolean;
  onClose: () => void;
  onLog: (text: string) => void;
}) {
  const [text, setText] = useState("");
  return (
    <Modal open={open} onClose={onClose} title="Log Interaction">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!text.trim()) return;
          onLog(text.trim());
          setText("");
          onClose();
        }}
        className="space-y-3"
      >
        <Field label="What happened">
          <textarea
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Spoke with Priya about timing — she's open to Q3"
            className={textareaCls}
          />
        </Field>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="text-sm px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:border-slate-300 transition font-medium">
            Cancel
          </button>
          <button type="submit" className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition font-medium">
            Log
          </button>
        </div>
      </form>
    </Modal>
  );
}
