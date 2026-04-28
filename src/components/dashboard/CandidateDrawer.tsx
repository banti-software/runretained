"use client";

import { Drawer } from "./Modal";
import { useDashboard, type Candidate, type Stage } from "@/lib/store";

const stages: Stage[] = [
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

export function CandidateDrawer({
  candidate,
  onClose,
}: {
  candidate: Candidate | null;
  onClose: () => void;
}) {
  const { state, updateCandidate, removeCandidate } = useDashboard();

  if (!candidate) {
    return null;
  }

  const signals = state.signals.filter((s) => s.candidateId === candidate.id);
  const screens = state.screens.filter((s) => s.candidateId === candidate.id);
  const outreach = state.outreach.filter((o) => o.candidateId === candidate.id);
  const interviews = state.interviews.filter((i) => i.candidateId === candidate.id);

  return (
    <Drawer open onClose={onClose} title="Candidate">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[12px] font-medium text-slate-500 shrink-0">
            {candidate.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div className="min-w-0">
            <span className="text-base font-semibold text-slate-900 block">{candidate.name}</span>
            <span className="text-[12px] text-slate-500 block">{candidate.role}</span>
          </div>
        </div>

        {/* Editable fields */}
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block mb-1">Stage</span>
            <select
              value={candidate.stage}
              onChange={(e) => updateCandidate(candidate.id, { stage: e.target.value as Stage })}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-slate-400 transition"
            >
              {stages.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block mb-1">Score</span>
            <input
              type="number"
              step="0.1"
              min={0}
              max={5}
              value={candidate.score ?? ""}
              onChange={(e) =>
                updateCandidate(candidate.id, {
                  score: e.target.value === "" ? null : Number(e.target.value),
                })
              }
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 text-slate-800 focus:outline-none focus:border-slate-400 transition"
            />
          </label>
          <label className="block col-span-2">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block mb-1">Coverage %</span>
            <input
              type="number"
              min={0}
              max={100}
              value={candidate.coverage ?? ""}
              onChange={(e) =>
                updateCandidate(candidate.id, {
                  coverage: e.target.value === "" ? null : Number(e.target.value),
                })
              }
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 text-slate-800 focus:outline-none focus:border-slate-400 transition"
            />
          </label>
        </div>

        {/* Signals */}
        <Section title={`Signals (${signals.length})`}>
          {signals.length === 0 ? (
            <Empty text="No signals yet" />
          ) : (
            <ul className="space-y-2">
              {signals.map((s) => (
                <li key={s.id} className="px-3 py-2.5 rounded-lg bg-slate-50">
                  <p className="text-[13px] text-slate-700">{s.text}</p>
                  <div className="flex gap-3 mt-1">
                    <span className="text-[10px] text-slate-400">{s.source}</span>
                    <span className="text-[10px] text-slate-400">{s.confidence} conf</span>
                    <span className="text-[10px] text-slate-500">{s.status}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Section>

        {/* Screens */}
        <Section title={`Screens (${screens.length})`}>
          {screens.length === 0 ? (
            <Empty text="No screens recorded" />
          ) : (
            <ul className="space-y-2">
              {screens.map((s) => (
                <li key={s.id} className="px-3 py-2.5 rounded-lg bg-slate-50 text-[12px] text-slate-600">
                  <div className="flex justify-between">
                    <span>{s.date} · {s.duration}</span>
                    <span className="text-slate-500">{s.disposition}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Can: {s.canThey} · Will: {s.willThey} · Close: {s.canClose}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Section>

        {/* Outreach */}
        <Section title={`Outreach (${outreach.length})`}>
          {outreach.length === 0 ? (
            <Empty text="No outreach yet" />
          ) : (
            <ul className="space-y-2">
              {outreach.map((o) => (
                <li key={o.id} className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 text-[12px] text-slate-600">
                  <span>{o.channel} · {o.step} · {o.sent}</span>
                  <span className="text-slate-500">{o.status}</span>
                </li>
              ))}
            </ul>
          )}
        </Section>

        {/* Interviews */}
        <Section title={`Interviews (${interviews.length})`}>
          {interviews.length === 0 ? (
            <Empty text="No interviews scheduled" />
          ) : (
            <ul className="space-y-2">
              {interviews.map((i) => (
                <li key={i.id} className="px-3 py-2 rounded-lg bg-slate-50 text-[12px] text-slate-600">
                  <div className="flex justify-between">
                    <span>{i.round} — {i.with}</span>
                    <span className="text-slate-500">{i.status}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{i.date} · {i.time}</div>
                </li>
              ))}
            </ul>
          )}
        </Section>

        <div className="pt-3 border-t border-slate-100">
          <button
            onClick={() => {
              if (confirm(`Remove ${candidate.name} from this search?`)) {
                removeCandidate(candidate.id);
                onClose();
              }
            }}
            className="text-xs text-red-500 hover:text-red-700 font-medium transition"
          >
            Remove candidate
          </button>
        </div>
      </div>
    </Drawer>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-[11px] uppercase tracking-wider text-slate-400 font-medium mb-2">{title}</h4>
      {children}
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return <div className="px-3 py-4 rounded-lg bg-slate-50 text-[12px] text-slate-400 text-center">{text}</div>;
}
