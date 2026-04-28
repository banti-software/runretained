"use client";

import { useMemo, useState } from "react";
import { useDashboard, type OutreachStep } from "@/lib/store";
import { Modal, Field, inputCls, selectCls } from "@/components/dashboard/Modal";

const channels: OutreachStep["channel"][] = ["Email", "LinkedIn", "Referral", "Phone"];
const statuses: OutreachStep["status"][] = ["Pending", "Responded", "Declined"];

export default function OutreachPage() {
  const {
    candidatesInActiveSearch,
    outreachInActiveSearch,
    candidateById,
    addOutreach,
    setOutreachStatus,
  } = useDashboard();

  const [open, setOpen] = useState(false);
  const [templatesOpen, setTemplatesOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | OutreachStep["status"]>("all");

  const filtered = useMemo(
    () => (filter === "all" ? outreachInActiveSearch : outreachInActiveSearch.filter((o) => o.status === filter)),
    [outreachInActiveSearch, filter]
  );

  const stats = useMemo(() => {
    const total = outreachInActiveSearch.length;
    const responded = outreachInActiveSearch.filter((o) => o.status === "Responded").length;
    const pending = outreachInActiveSearch.filter((o) => o.status === "Pending").length;
    const rate = total > 0 ? Math.round((responded / total) * 100) : 0;
    return [
      { label: "Sent", value: String(total) },
      { label: "Responded", value: String(responded) },
      { label: "Response rate", value: `${rate}%` },
      { label: "Pending", value: String(pending) },
    ];
  }, [outreachInActiveSearch]);

  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-black">Outreach</h1>
          <p className="text-sm text-slate-500 mt-0.5">Multi-channel candidate engagement</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTemplatesOpen(true)}
            className="text-sm px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:border-slate-300 transition font-medium"
          >
            View Templates
          </button>
          <button
            onClick={() => setOpen(true)}
            className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition font-medium"
          >
            New Outreach
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-4">
            <span className="text-[11px] text-slate-400 block">{s.label}</span>
            <span className="text-xl font-semibold text-slate-800">{s.value}</span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-800">Recent Outreach</h2>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 focus:outline-none focus:border-slate-400 transition"
          >
            <option value="all">All</option>
            {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-[1fr_80px_90px_70px_120px] gap-3 px-5 py-2.5 border-b border-slate-50 text-[11px] text-slate-400 font-medium uppercase tracking-wider">
          <span>Candidate</span>
          <span>Channel</span>
          <span>Step</span>
          <span>Sent</span>
          <span className="text-right">Status</span>
        </div>

        {filtered.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm text-slate-400">No outreach matches this filter.</div>
        ) : (
          <div className="divide-y divide-slate-50">
            {filtered.map((s) => {
              const cand = candidateById(s.candidateId);
              return (
                <div key={s.id} className="grid grid-cols-[1fr_80px_90px_70px_120px] gap-3 px-5 py-3 items-center hover:bg-slate-50/50 transition">
                  <span className="text-sm font-medium text-slate-800 truncate">{cand?.name ?? "—"}</span>
                  <span className="text-[11px] text-slate-500">{s.channel}</span>
                  <span className="text-[11px] text-slate-500">{s.step}</span>
                  <span className="text-[11px] text-slate-400">{s.sent}</span>
                  <select
                    value={s.status}
                    onChange={(e) => setOutreachStatus(s.id, e.target.value as OutreachStep["status"])}
                    className="text-[11px] px-2 py-1 rounded border border-slate-200 bg-white text-slate-600 focus:outline-none focus:border-slate-400 transition justify-self-end"
                  >
                    {statuses.map((st) => <option key={st} value={st}>{st}</option>)}
                  </select>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <NewOutreachModal
        open={open}
        onClose={() => setOpen(false)}
        candidates={candidatesInActiveSearch}
        onAdd={addOutreach}
      />

      <Modal open={templatesOpen} onClose={() => setTemplatesOpen(false)} title="Outreach Templates" width="max-w-lg">
        <div className="space-y-3">
          {[
            { name: "Initial — VPE", body: "Hi {{name}} — I'm running a confidential VP Engineering search for…" },
            { name: "Follow-up 1", body: "Following up on my note from last week — would love 20 min to share more." },
            { name: "Referral intro", body: "{{referrer}} suggested I reach out…" },
          ].map((t) => (
            <div key={t.name} className="px-3 py-2.5 rounded-lg bg-slate-50">
              <span className="text-[13px] font-medium text-slate-800 block">{t.name}</span>
              <span className="text-[11px] text-slate-500 block mt-0.5 leading-relaxed">{t.body}</span>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}

function NewOutreachModal({
  open,
  onClose,
  candidates,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  candidates: ReturnType<typeof useDashboard>["candidatesInActiveSearch"];
  onAdd: (o: Omit<OutreachStep, "id" | "status">) => void;
}) {
  const [candidateId, setCandidateId] = useState("");
  const [channel, setChannel] = useState<OutreachStep["channel"]>("Email");
  const [step, setStep] = useState("Initial");

  return (
    <Modal open={open} onClose={onClose} title="New Outreach">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!candidateId) return;
          const sent = new Date().toLocaleString("en-US", { month: "short", day: "numeric" });
          onAdd({ candidateId, channel, step, sent });
          setCandidateId("");
          setStep("Initial");
          onClose();
        }}
        className="space-y-3"
      >
        <Field label="Candidate">
          <select
            autoFocus
            value={candidateId}
            onChange={(e) => setCandidateId(e.target.value)}
            className={selectCls}
          >
            <option value="">Select candidate…</option>
            {candidates.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Channel">
            <select value={channel} onChange={(e) => setChannel(e.target.value as OutreachStep["channel"])} className={selectCls}>
              {channels.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Step">
            <input value={step} onChange={(e) => setStep(e.target.value)} className={inputCls} />
          </Field>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="text-sm px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:border-slate-300 transition font-medium">
            Cancel
          </button>
          <button type="submit" className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition font-medium">
            Send
          </button>
        </div>
      </form>
    </Modal>
  );
}
