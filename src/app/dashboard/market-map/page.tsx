"use client";

import { useMemo, useState } from "react";
import { useDashboard } from "@/lib/store";
import { Modal, Field, inputCls } from "@/components/dashboard/Modal";

export default function MarketMapPage() {
  const {
    companiesInActiveSearch,
    exclusionsInActiveSearch,
    archetypesInActiveSearch,
    candidatesInActiveSearch,
    addCompany,
    addExclusion,
  } = useDashboard();

  const [companyOpen, setCompanyOpen] = useState(false);
  const [exclusionOpen, setExclusionOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const visibleCompanies = useMemo(
    () => (showAll ? companiesInActiveSearch : companiesInActiveSearch.slice(0, 5)),
    [companiesInActiveSearch, showAll]
  );

  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-black">Market Map</h1>
          <p className="text-sm text-slate-500 mt-0.5">Target companies, exclusions, and candidate archetypes</p>
        </div>
        <button
          onClick={() => setCompanyOpen(true)}
          className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition font-medium"
        >
          Add Company
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Target companies */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-800">Target Companies</h2>
          </div>
          <div className="grid grid-cols-[1fr_80px_60px] gap-3 px-5 py-2.5 border-b border-slate-50 text-[11px] text-slate-400 font-medium uppercase tracking-wider">
            <span>Company</span>
            <span className="text-right">Candidates</span>
            <span className="text-right">Status</span>
          </div>
          {visibleCompanies.length === 0 ? (
            <div className="px-5 py-8 text-center text-sm text-slate-400">No target companies yet.</div>
          ) : (
            <div className="divide-y divide-slate-50">
              {visibleCompanies.map((c) => {
                const matched = candidatesInActiveSearch.filter((cand) =>
                  cand.role.toLowerCase().includes(c.name.toLowerCase())
                ).length;
                return (
                  <div key={c.id} className="grid grid-cols-[1fr_80px_60px] gap-3 px-5 py-3 items-center hover:bg-slate-50/50 transition">
                    <span className="text-sm font-medium text-slate-800">{c.name}</span>
                    <span className="text-sm text-slate-500 text-right">{matched}</span>
                    <span className="text-[11px] text-slate-400 text-right">{c.status}</span>
                  </div>
                );
              })}
            </div>
          )}
          {companiesInActiveSearch.length > 5 && (
            <div className="px-5 py-3 border-t border-slate-100">
              <button
                onClick={() => setShowAll((s) => !s)}
                className="text-xs text-slate-500 hover:text-black font-medium transition"
              >
                {showAll ? "Show top 5" : `View all ${companiesInActiveSearch.length} companies`}
              </button>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="text-sm font-semibold text-slate-800 mb-3">Exclusions</h2>
            <div className="space-y-2">
              {exclusionsInActiveSearch.length === 0 && (
                <div className="px-3 py-4 rounded-lg bg-slate-50 text-[12px] text-slate-400 text-center">
                  No exclusions
                </div>
              )}
              {exclusionsInActiveSearch.map((e) => (
                <div key={e.id} className="px-3 py-2.5 rounded-lg bg-slate-50">
                  <span className="text-[13px] font-medium text-slate-700 block">{e.name}</span>
                  <span className="text-[11px] text-slate-400">{e.reason}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setExclusionOpen(true)}
              className="mt-3 text-xs text-slate-500 hover:text-black font-medium transition"
            >
              Add exclusion
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="text-sm font-semibold text-slate-800 mb-3">Candidate Archetypes</h2>
            <div className="space-y-2">
              {archetypesInActiveSearch.length === 0 && (
                <div className="px-3 py-4 rounded-lg bg-slate-50 text-[12px] text-slate-400 text-center">
                  No archetypes defined
                </div>
              )}
              {archetypesInActiveSearch.map((a) => (
                <div key={a.id} className="px-3 py-2.5 rounded-lg bg-slate-50">
                  <span className="text-[13px] font-medium text-slate-700 block">{a.label}</span>
                  <span className="text-[11px] text-slate-400 leading-4 block mt-0.5">{a.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AddCompanyModal open={companyOpen} onClose={() => setCompanyOpen(false)} onAdd={addCompany} />
      <AddExclusionModal open={exclusionOpen} onClose={() => setExclusionOpen(false)} onAdd={addExclusion} />
    </div>
  );
}

function AddCompanyModal({
  open,
  onClose,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (name: string) => void;
}) {
  const [name, setName] = useState("");
  return (
    <Modal open={open} onClose={onClose} title="Add Target Company">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!name.trim()) return;
          onAdd(name.trim());
          setName("");
          onClose();
        }}
        className="space-y-3"
      >
        <Field label="Company name">
          <input autoFocus value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
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

function AddExclusionModal({
  open,
  onClose,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (name: string, reason: string) => void;
}) {
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");
  return (
    <Modal open={open} onClose={onClose} title="Add Exclusion">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!name.trim() || !reason.trim()) return;
          onAdd(name.trim(), reason.trim());
          setName("");
          setReason("");
          onClose();
        }}
        className="space-y-3"
      >
        <Field label="Company name">
          <input autoFocus value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
        </Field>
        <Field label="Reason">
          <input value={reason} onChange={(e) => setReason(e.target.value)} className={inputCls} placeholder="Off-limits, recent placement, etc." />
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
