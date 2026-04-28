"use client";

import { useMemo, useState } from "react";
import { useDashboard } from "@/lib/store";
import { Modal, Field, inputCls, textareaCls } from "@/components/dashboard/Modal";

type Question = {
  id: string;
  text: string;
  category: string;
  mapped: string;
  answer?: string;
};

const seedQuestions: Question[] = [
  { id: "q1", text: "What business problem does this hire solve in the next 12 months?", category: "Outcomes", mapped: "Success markers" },
  { id: "q2", text: "What does the team look like today and what is missing?", category: "Context", mapped: "Team structure" },
  { id: "q3", text: "What is the realistic compensation range including equity?", category: "Comp", mapped: "Comp parameters" },
  { id: "q4", text: "Who else is interviewing and what is the decision timeline?", category: "Process", mapped: "Timeline" },
  { id: "q5", text: "What would make you pass on an otherwise strong candidate?", category: "Tradeoffs", mapped: "Anti-signals" },
  { id: "q6", text: "If you had to choose between depth in X or breadth in Y, which wins?", category: "Tradeoffs", mapped: "Must-haves" },
];

export default function IntakePage() {
  const { activeSearch, addArtifact, logActivity } = useDashboard();
  const [questions, setQuestions] = useState<Question[]>(seedQuestions);
  const [uploadName, setUploadName] = useState<string | null>(null);
  const [generated, setGenerated] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [editing, setEditing] = useState<Question | null>(null);
  const [editArtifact, setEditArtifact] = useState<string | null>(null);

  const totalQuestions = questions.length;
  const filledIn = useMemo(() => questions.filter((q) => q.answer && q.answer.trim()).length, [questions]);

  const artifacts = useMemo(
    () => [
      { name: "Intake Question Set", status: filledIn === totalQuestions ? "Complete" : filledIn > 0 ? "In progress" : "Draft", questions: totalQuestions },
      { name: "Intake Call Agenda", status: generated ? "Generated" : "Draft", questions: null },
      { name: "Intake Prep Brief", status: generated ? "Generated" : "Draft", questions: null },
    ],
    [filledIn, totalQuestions, generated]
  );

  return (
    <div className="p-6 lg:p-8 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-black">Intake</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Preparation for the intake call with {activeSearch.client}
          </p>
        </div>
        <button
          onClick={() => {
            addArtifact({ name: "Intake Prep Pack", type: "Intake" });
            logActivity("Intake prep pack generated");
            setGenerated(true);
          }}
          className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition font-medium"
        >
          Generate Prep Pack
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        {/* Artifacts */}
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-800">Prep Artifacts</h2>
          </div>
          <div className="divide-y divide-slate-50">
            {artifacts.map((a) => (
              <div key={a.name} className="flex items-center justify-between px-5 py-3.5">
                <div className="min-w-0">
                  <span className="text-sm font-medium text-slate-800 block truncate">{a.name}</span>
                  {a.questions !== null && <span className="text-xs text-slate-400">{a.questions} questions</span>}
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-slate-400">{a.status}</span>
                  <button
                    onClick={() => setEditArtifact(a.name)}
                    className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:border-slate-300 transition"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Questions */}
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div className="min-w-0">
              <h2 className="text-sm font-semibold text-slate-800">Question Set</h2>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {filledIn} of {totalQuestions} answered{uploadName ? " · auto-fill from notes" : ""}
              </p>
            </div>
            <button
              onClick={() => setAddOpen(true)}
              className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:border-slate-300 transition shrink-0"
            >
              Add
            </button>
          </div>
          <div className="divide-y divide-slate-50">
            {questions.map((q) => (
              <button
                key={q.id}
                onClick={() => setEditing(q)}
                className="w-full text-left px-5 py-3.5 hover:bg-slate-50/50 transition"
              >
                <p className="text-sm text-slate-800">{q.text}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-[11px] text-slate-400">{q.category}</span>
                  <span className="text-[11px] text-slate-400">Maps to: {q.mapped}</span>
                  {q.answer ? (
                    <span className="text-[11px] text-slate-700 font-medium">Answered</span>
                  ) : (
                    <span className="text-[11px] text-slate-400">Awaiting answer</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Meeting Notes Upload */}
        <section className="bg-white rounded-xl border border-slate-200">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-slate-800">Meeting Notes</h2>
            <span className="text-[11px] px-2 py-1 rounded-md bg-slate-100 text-slate-600 font-medium shrink-0">
              Mandate + Answers
            </span>
          </div>
          <div className="p-5">
            <label className="block rounded-lg border border-dashed border-slate-300 px-4 py-8 text-center hover:border-slate-400 transition cursor-pointer">
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt,.md"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  setUploadName(f.name);
                  // simulate auto-fill: populate empty answers
                  setQuestions((prev) =>
                    prev.map((q) =>
                      q.answer
                        ? q
                        : {
                            ...q,
                            answer: `Drafted from notes (${f.name}). Review and refine.`,
                          }
                    )
                  );
                  logActivity(`Meeting notes uploaded: ${f.name} — answers auto-filled`);
                }}
              />
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-slate-400">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <div className="text-[13px] font-medium text-slate-700 mt-2">
                {uploadName ?? "Upload meeting notes"}
              </div>
              <div className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                {uploadName
                  ? "Reupload to refresh draft answers"
                  : "Drop a transcript or paste notes — we'll draft the mandate and auto-fill answers"}
              </div>
              <div className="text-[11px] text-slate-400 mt-1.5">PDF, DOCX, TXT, MD · Max 10 MB</div>
            </label>
            <ul className="mt-4 space-y-1.5">
              {[
                "Drafts mandate structure",
                `Auto-fills all ${totalQuestions} question answers`,
                "Flags gaps for follow-up",
              ].map((line) => (
                <li key={line} className="flex items-center gap-2 text-[11px] text-slate-500">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 shrink-0">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      {/* Add question */}
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add Question">
        <AddQuestionForm
          onAdd={(q) => {
            setQuestions((prev) => [...prev, { id: "q_" + Math.random().toString(36).slice(2, 8), ...q }]);
            setAddOpen(false);
          }}
          onCancel={() => setAddOpen(false)}
        />
      </Modal>

      {/* Edit question */}
      <Modal open={!!editing} onClose={() => setEditing(null)} title="Edit Question" width="max-w-lg">
        {editing && (
          <EditQuestionForm
            question={editing}
            onSave={(patch) => {
              setQuestions((prev) => prev.map((q) => (q.id === editing.id ? { ...q, ...patch } : q)));
              setEditing(null);
            }}
            onCancel={() => setEditing(null)}
          />
        )}
      </Modal>

      <Modal open={!!editArtifact} onClose={() => setEditArtifact(null)} title={editArtifact ?? ""}>
        <div className="space-y-3 text-[13px] text-slate-600">
          <div className="px-3 py-2.5 rounded-lg bg-slate-50">
            Artifact editing is content-managed elsewhere. Use{" "}
            <span className="font-medium">Generate Prep Pack</span> to refresh from current question answers.
          </div>
        </div>
      </Modal>
    </div>
  );
}

function AddQuestionForm({
  onAdd,
  onCancel,
}: {
  onAdd: (q: Omit<Question, "id">) => void;
  onCancel: () => void;
}) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [mapped, setMapped] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!text.trim()) return;
        onAdd({ text: text.trim(), category: category.trim() || "—", mapped: mapped.trim() || "—" });
      }}
      className="space-y-3"
    >
      <Field label="Question">
        <textarea autoFocus value={text} onChange={(e) => setText(e.target.value)} className={textareaCls} />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Category">
          <input value={category} onChange={(e) => setCategory(e.target.value)} className={inputCls} />
        </Field>
        <Field label="Maps to">
          <input value={mapped} onChange={(e) => setMapped(e.target.value)} className={inputCls} />
        </Field>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onCancel} className="text-sm px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:border-slate-300 transition font-medium">
          Cancel
        </button>
        <button type="submit" className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition font-medium">
          Add
        </button>
      </div>
    </form>
  );
}

function EditQuestionForm({
  question,
  onSave,
  onCancel,
}: {
  question: Question;
  onSave: (patch: Partial<Question>) => void;
  onCancel: () => void;
}) {
  const [text, setText] = useState(question.text);
  const [answer, setAnswer] = useState(question.answer ?? "");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave({ text, answer });
      }}
      className="space-y-3"
    >
      <Field label="Question">
        <textarea value={text} onChange={(e) => setText(e.target.value)} className={textareaCls} />
      </Field>
      <Field label="Answer" hint="Captured during or after the intake call">
        <textarea autoFocus value={answer} onChange={(e) => setAnswer(e.target.value)} className={textareaCls + " min-h-[120px]"} />
      </Field>
      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onCancel} className="text-sm px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:border-slate-300 transition font-medium">
          Cancel
        </button>
        <button type="submit" className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition font-medium">
          Save
        </button>
      </div>
    </form>
  );
}
