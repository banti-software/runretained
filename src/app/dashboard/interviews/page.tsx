"use client";

import { useMemo, useState } from "react";
import { useDashboard, type Interview } from "@/lib/store";
import { Modal, Field, inputCls, selectCls, textareaCls } from "@/components/dashboard/Modal";

export default function InterviewsPage() {
  const {
    candidatesInActiveSearch,
    interviewsInActiveSearch,
    candidateById,
    addInterview,
    rescheduleInterview,
    captureFeedback,
    addSignal,
  } = useDashboard();

  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [feedback, setFeedback] = useState<{ id: string; text: string } | null>(null);
  const [reschedule, setReschedule] = useState<Interview | null>(null);
  const [prepCandidateId, setPrepCandidateId] = useState<string | null>(null);

  const upcoming = useMemo(
    () => interviewsInActiveSearch.filter((i) => i.status === "Scheduled"),
    [interviewsInActiveSearch]
  );
  const pending = useMemo(
    () => interviewsInActiveSearch.filter((i) => i.status === "Complete" && !i.feedbackCaptured),
    [interviewsInActiveSearch]
  );

  const prepCandidate = prepCandidateId ? candidateById(prepCandidateId) : null;

  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-black">Interviews</h1>
          <p className="text-sm text-slate-500 mt-0.5">Interview coordination and feedback capture</p>
        </div>
        <button
          onClick={() => setScheduleOpen(true)}
          className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition font-medium"
        >
          Schedule Interview
        </button>
      </div>

      {/* Upcoming */}
      <div className="bg-white rounded-xl border border-slate-200 mb-6">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-800">Upcoming</h2>
        </div>
        {upcoming.length === 0 ? (
          <div className="px-5 py-8 text-center text-sm text-slate-400">No upcoming interviews.</div>
        ) : (
          <div className="divide-y divide-slate-50">
            {upcoming.map((i) => {
              const cand = candidateById(i.candidateId);
              return (
                <div key={i.id} className="flex items-center justify-between px-5 py-3.5">
                  <div>
                    <span className="text-sm font-medium text-slate-800 block">{cand?.name ?? "—"} — {i.round}</span>
                    <span className="text-[11px] text-slate-400">With {i.with} · {i.date} at {i.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPrepCandidateId(i.candidateId)}
                      className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:border-slate-300 transition"
                    >
                      Prep Candidate
                    </button>
                    <button
                      onClick={() => setReschedule(i)}
                      className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:border-slate-300 transition"
                    >
                      Reschedule
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Feedback pending */}
      <div className="bg-white rounded-xl border border-slate-200">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-800">Feedback Pending</h2>
        </div>
        {pending.length === 0 ? (
          <div className="px-5 py-8 text-center text-sm text-slate-400">All feedback captured.</div>
        ) : (
          <div className="divide-y divide-slate-50">
            {pending.map((i) => {
              const cand = candidateById(i.candidateId);
              return (
                <div key={i.id} className="flex items-center justify-between px-5 py-3.5">
                  <div>
                    <span className="text-sm font-medium text-slate-800 block">{cand?.name ?? "—"} — {i.round}</span>
                    <span className="text-[11px] text-slate-400">Interviewer: {i.with}</span>
                  </div>
                  <button
                    onClick={() => setFeedback({ id: i.id, text: "" })}
                    className="text-xs px-3 py-1.5 rounded-lg bg-black text-white font-medium hover:bg-slate-800 transition"
                  >
                    Capture Feedback
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <ScheduleModal
        open={scheduleOpen}
        onClose={() => setScheduleOpen(false)}
        candidates={candidatesInActiveSearch}
        onAdd={addInterview}
      />

      <RescheduleModal
        interview={reschedule}
        onClose={() => setReschedule(null)}
        onSave={(date, time) => {
          if (reschedule) rescheduleInterview(reschedule.id, date, time);
          setReschedule(null);
        }}
      />

      <Modal
        open={!!feedback}
        onClose={() => setFeedback(null)}
        title="Capture Feedback"
        width="max-w-lg"
      >
        {feedback && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!feedback.text.trim()) return;
              const iv = interviewsInActiveSearch.find((i) => i.id === feedback.id);
              if (iv) {
                addSignal({
                  candidateId: iv.candidateId,
                  text: feedback.text.trim(),
                  source: `${iv.round} debrief — ${iv.date}`,
                  requirement: "Interview signal",
                  confidence: "Medium",
                });
              }
              captureFeedback(feedback.id);
              setFeedback(null);
            }}
            className="space-y-3"
          >
            <Field label="Interviewer notes" hint="Captured as an unverified signal on the candidate's record">
              <textarea
                autoFocus
                value={feedback.text}
                onChange={(e) => setFeedback({ ...feedback, text: e.target.value })}
                className={textareaCls + " min-h-[120px]"}
                placeholder="Strong on platform thinking. Concerns about board exposure."
              />
            </Field>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setFeedback(null)} className="text-sm px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:border-slate-300 transition font-medium">
                Cancel
              </button>
              <button type="submit" className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition font-medium">
                Save
              </button>
            </div>
          </form>
        )}
      </Modal>

      <Modal open={!!prepCandidate} onClose={() => setPrepCandidateId(null)} title={`Candidate Prep — ${prepCandidate?.name ?? ""}`} width="max-w-lg">
        {prepCandidate && (
          <div className="space-y-3">
            <div className="px-3 py-2.5 rounded-lg bg-slate-50">
              <span className="text-[12px] text-slate-500 leading-relaxed">
                Briefing pack with company context, interviewer profiles, and likely questions. The candidate will receive this 24h before the interview.
              </span>
            </div>
            <ul className="space-y-1.5 text-[12px] text-slate-600">
              <li>· Company narrative + stage</li>
              <li>· Interviewer LinkedIn + recent talks</li>
              <li>· 5 likely deep-dive questions tailored to {prepCandidate.role}</li>
              <li>· Comp range and process timeline</li>
            </ul>
          </div>
        )}
      </Modal>
    </div>
  );
}

function ScheduleModal({
  open,
  onClose,
  candidates,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  candidates: ReturnType<typeof useDashboard>["candidatesInActiveSearch"];
  onAdd: (i: Omit<Interview, "id" | "status" | "feedbackCaptured">) => void;
}) {
  const [candidateId, setCandidateId] = useState("");
  const [round, setRound] = useState("Round 1");
  const [withWho, setWithWho] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  return (
    <Modal open={open} onClose={onClose} title="Schedule Interview">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!candidateId || !date || !time) return;
          onAdd({ candidateId, round, with: withWho || "—", date, time });
          setCandidateId("");
          setRound("Round 1");
          setWithWho("");
          setDate("");
          setTime("");
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
        <div className="grid grid-cols-2 gap-3">
          <Field label="Round">
            <input value={round} onChange={(e) => setRound(e.target.value)} className={inputCls} />
          </Field>
          <Field label="With">
            <input value={withWho} onChange={(e) => setWithWho(e.target.value)} className={inputCls} placeholder="CEO, CTO" />
          </Field>
          <Field label="Date">
            <input value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} placeholder="Apr 18" />
          </Field>
          <Field label="Time">
            <input value={time} onChange={(e) => setTime(e.target.value)} className={inputCls} placeholder="2:00 PM" />
          </Field>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="text-sm px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:border-slate-300 transition font-medium">
            Cancel
          </button>
          <button type="submit" className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition font-medium">
            Schedule
          </button>
        </div>
      </form>
    </Modal>
  );
}

function RescheduleModal({
  interview,
  onClose,
  onSave,
}: {
  interview: Interview | null;
  onClose: () => void;
  onSave: (date: string, time: string) => void;
}) {
  const [date, setDate] = useState(interview?.date ?? "");
  const [time, setTime] = useState(interview?.time ?? "");

  return (
    <Modal open={!!interview} onClose={onClose} title="Reschedule">
      {interview && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!date || !time) return;
            onSave(date, time);
          }}
          className="space-y-3"
        >
          <div className="grid grid-cols-2 gap-3">
            <Field label="Date">
              <input autoFocus value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} />
            </Field>
            <Field label="Time">
              <input value={time} onChange={(e) => setTime(e.target.value)} className={inputCls} />
            </Field>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="text-sm px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:border-slate-300 transition font-medium">
              Cancel
            </button>
            <button type="submit" className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition font-medium">
              Save
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
