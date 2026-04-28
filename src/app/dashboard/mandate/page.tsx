"use client";

import { useState } from "react";
import { useDashboard, type Requirement } from "@/lib/store";
import { Modal, Field, inputCls, selectCls } from "@/components/dashboard/Modal";

const tabs = ["Requirements", "Scoring", "Comp & Timeline", "Stakeholders"] as const;
type Tab = (typeof tabs)[number];

const buckets: Requirement["bucket"][] = ["Must-have", "Core", "Contextual", "Anti-signal"];
const weights: Requirement["weight"][] = ["Gate", "High", "Medium", "Low", "Flag"];

export default function MandatePage() {
  const {
    activeSearch,
    requirementsInActiveSearch,
    addRequirement,
    removeRequirement,
    lockMandate,
    logActivity,
  } = useDashboard();

  const [activeTab, setActiveTab] = useState<Tab>("Requirements");
  const [structure, setStructure] = useState<"runretained" | "upload">("runretained");
  const [addOpen, setAddOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [uploadName, setUploadName] = useState<string | null>(null);

  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-black">Mandate</h1>
          <div className="flex items-center gap-3 mt-0.5">
            <p className="text-sm text-slate-500">
              {activeSearch.title} — {activeSearch.client}
            </p>
            <span className="text-xs text-slate-400">v{activeSearch.mandateVersion}</span>
            {activeSearch.mandateLocked && (
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-900 text-white font-medium">
                Locked
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setHistoryOpen(true)}
            className="text-sm px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:border-slate-300 transition font-medium"
          >
            View History
          </button>
          <button
            onClick={() => {
              if (activeSearch.mandateLocked) {
                logActivity("Mandate unlocked for revision");
              }
              lockMandate();
            }}
            className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition font-medium"
          >
            {activeSearch.mandateLocked ? "Re-lock Mandate" : "Lock Mandate"}
          </button>
        </div>
      </div>

      {/* Mandate Structure */}
      <section className="bg-white rounded-xl border border-slate-200 mb-6">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-800">Mandate Structure</h2>
          <span className="text-[11px] text-slate-400">Choose how this mandate is formatted</span>
        </div>
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setStructure("runretained")}
            className={`text-left rounded-lg p-4 transition ${
              structure === "runretained"
                ? "border border-slate-900 bg-slate-50/60 ring-1 ring-slate-900/5"
                : "border border-slate-200 hover:border-slate-300"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className={`w-3.5 h-3.5 rounded-full border ${structure === "runretained" ? "border-slate-900" : "border-slate-300"} flex items-center justify-center`}>
                {structure === "runretained" && <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />}
              </span>
              <span className="text-sm font-medium text-slate-900">Use RunRetained structure</span>
            </div>
            <p className="text-[12px] text-slate-500 mt-1.5 leading-relaxed">
              Standard framework with Requirements, Scoring, Comp &amp; Timeline, and Stakeholders.
            </p>
            <p className="text-[11px] text-slate-400 mt-2">Recommended — proven across 200+ searches.</p>
          </button>

          <button
            type="button"
            onClick={() => setStructure("upload")}
            className={`text-left rounded-lg p-4 transition ${
              structure === "upload"
                ? "border border-slate-900 bg-slate-50/60 ring-1 ring-slate-900/5"
                : "border border-slate-200 hover:border-slate-300"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className={`w-3.5 h-3.5 rounded-full border ${structure === "upload" ? "border-slate-900" : "border-slate-300"} flex items-center justify-center`}>
                {structure === "upload" && <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />}
              </span>
              <span className="text-sm font-medium text-slate-900">Upload reference document</span>
            </div>
            <p className="text-[12px] text-slate-500 mt-1.5 leading-relaxed">
              Use your own spec or client template as a formatting reference.
            </p>
            <label className="mt-3 block rounded-md border border-dashed border-slate-300 px-3 py-4 text-center cursor-pointer hover:border-slate-400 transition">
              <input
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.txt,.md"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) {
                    setUploadName(f.name);
                    setStructure("upload");
                    logActivity(`Mandate reference uploaded: ${f.name}`);
                  }
                }}
              />
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-slate-400">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <div className="text-[12px] text-slate-600 mt-1.5">
                {uploadName ?? "Click to upload PDF / DOC / DOCX"}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">Max 10 MB</div>
            </label>
          </button>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium transition border-b-2 -mb-px ${
              activeTab === tab ? "border-black text-black" : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Requirements" && (
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-800">Requirements</h2>
            <button
              onClick={() => setAddOpen(true)}
              className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:border-slate-300 transition"
            >
              Add Requirement
            </button>
          </div>

          <div className="grid grid-cols-[1fr_100px_60px_30px] gap-3 px-5 py-2.5 border-b border-slate-50 text-[11px] text-slate-400 font-medium uppercase tracking-wider">
            <span>Requirement</span>
            <span>Bucket</span>
            <span className="text-right">Weight</span>
            <span />
          </div>

          {requirementsInActiveSearch.length === 0 ? (
            <div className="px-5 py-10 text-center text-sm text-slate-400">No requirements yet.</div>
          ) : (
            <div className="divide-y divide-slate-50">
              {requirementsInActiveSearch.map((r) => (
                <div key={r.id} className="grid grid-cols-[1fr_100px_60px_30px] gap-3 px-5 py-3 items-center hover:bg-slate-50/50 transition">
                  <span className="text-sm text-slate-700">{r.text}</span>
                  <span className="text-[11px] text-slate-500">{r.bucket}</span>
                  <span className="text-[11px] text-slate-400 text-right">{r.weight}</span>
                  <button
                    onClick={() => removeRequirement(r.id)}
                    aria-label="Remove"
                    className="text-slate-300 hover:text-red-500 transition justify-self-end"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "Scoring" && <Placeholder title="Scoring" body="Auto-generated from requirement weights once mandate is locked." />}
      {activeTab === "Comp & Timeline" && <Placeholder title="Comp & Timeline" body="Captured during intake and refined through calibration." />}
      {activeTab === "Stakeholders" && <Placeholder title="Stakeholders" body="Pulled from intake call attendance and approver lists." />}

      <AddRequirementModal open={addOpen} onClose={() => setAddOpen(false)} onAdd={addRequirement} />

      <Modal open={historyOpen} onClose={() => setHistoryOpen(false)} title="Mandate History">
        <div className="space-y-3">
          <div className="px-3 py-2.5 rounded-lg bg-slate-50">
            <span className="text-[13px] font-medium text-slate-800 block">v{activeSearch.mandateVersion} — current</span>
            <span className="text-[11px] text-slate-400">
              {activeSearch.mandateLocked ? "Locked" : "Draft"} · {requirementsInActiveSearch.length} requirements
            </span>
          </div>
          {Array.from({ length: activeSearch.mandateVersion - 1 }).map((_, i) => (
            <div key={i} className="px-3 py-2.5 rounded-lg bg-slate-50">
              <span className="text-[13px] font-medium text-slate-700 block">v{activeSearch.mandateVersion - 1 - i}</span>
              <span className="text-[11px] text-slate-400">Archived</span>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}

function Placeholder({ title, body }: { title: string; body: string }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
      <h3 className="text-sm font-semibold text-slate-800 mb-1">{title}</h3>
      <p className="text-[13px] text-slate-500 max-w-md mx-auto">{body}</p>
    </div>
  );
}

function AddRequirementModal({
  open,
  onClose,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (r: Omit<Requirement, "id" | "searchId">) => void;
}) {
  const [text, setText] = useState("");
  const [bucket, setBucket] = useState<Requirement["bucket"]>("Core");
  const [weight, setWeight] = useState<Requirement["weight"]>("Medium");

  return (
    <Modal open={open} onClose={onClose} title="Add Requirement">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!text.trim()) return;
          onAdd({ text: text.trim(), bucket, weight });
          setText("");
          setBucket("Core");
          setWeight("Medium");
          onClose();
        }}
        className="space-y-3"
      >
        <Field label="Requirement">
          <textarea autoFocus value={text} onChange={(e) => setText(e.target.value)} className={inputCls + " min-h-[80px] resize-y"} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Bucket">
            <select value={bucket} onChange={(e) => setBucket(e.target.value as Requirement["bucket"])} className={selectCls}>
              {buckets.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </Field>
          <Field label="Weight">
            <select value={weight} onChange={(e) => setWeight(e.target.value as Requirement["weight"])} className={selectCls}>
              {weights.map((w) => <option key={w} value={w}>{w}</option>)}
            </select>
          </Field>
        </div>
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
