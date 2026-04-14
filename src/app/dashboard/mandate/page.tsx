"use client";

import { useState } from "react";

const requirements = [
  { text: "10+ years engineering leadership at scale (500+ eng org)", bucket: "Must-have", weight: "Gate" },
  { text: "Experience building and shipping developer platforms", bucket: "Must-have", weight: "Gate" },
  { text: "Track record of M&A technical integration", bucket: "Must-have", weight: "Gate" },
  { text: "Public company board and investor communication", bucket: "Must-have", weight: "Gate" },
  { text: "Deep infrastructure and reliability background", bucket: "Core", weight: "High" },
  { text: "Experience with AI/ML team building", bucket: "Core", weight: "High" },
  { text: "Prior role at a company with $500M+ revenue", bucket: "Core", weight: "Medium" },
  { text: "International team management", bucket: "Core", weight: "Medium" },
  { text: "Enterprise sales engineering partnership", bucket: "Core", weight: "Medium" },
  { text: "YC or top-tier startup background", bucket: "Contextual", weight: "Low" },
  { text: "Specific vertical expertise (fintech, healthtech)", bucket: "Contextual", weight: "Low" },
  { text: "Micromanager or individual contributor mindset", bucket: "Anti-signal", weight: "Flag" },
  { text: "No experience beyond Series A scale", bucket: "Anti-signal", weight: "Flag" },
];

const tabs = ["Requirements", "Scoring", "Comp & Timeline", "Stakeholders"];

export default function MandatePage() {
  const [activeTab, setActiveTab] = useState("Requirements");

  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-black">Mandate</h1>
          <div className="flex items-center gap-3 mt-0.5">
            <p className="text-sm text-slate-500">VP Engineering — Acme Corp</p>
            <span className="text-xs text-slate-400">v2</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-sm px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:border-slate-300 transition font-medium">
            View History
          </button>
          <button className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition font-medium">
            Lock Mandate
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
          {/* Tile 1: RunRetained structure (selected) */}
          <div className="rounded-lg border border-slate-900 bg-slate-50/60 ring-1 ring-slate-900/5 p-4">
            <div className="flex items-center gap-2.5">
              <span className="w-3.5 h-3.5 rounded-full border border-slate-900 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
              </span>
              <span className="text-sm font-medium text-slate-900">Use RunRetained structure</span>
            </div>
            <p className="text-[12px] text-slate-500 mt-1.5 leading-relaxed">
              Standard framework with Requirements, Scoring, Comp &amp; Timeline, and Stakeholders.
            </p>
            <p className="text-[11px] text-slate-400 mt-2">Recommended — proven across 200+ searches.</p>
          </div>

          {/* Tile 2: Upload reference document */}
          <div className="rounded-lg border border-slate-200 hover:border-slate-300 transition p-4">
            <div className="flex items-center gap-2.5">
              <span className="w-3.5 h-3.5 rounded-full border border-slate-300" />
              <span className="text-sm font-medium text-slate-900">Upload reference document</span>
            </div>
            <p className="text-[12px] text-slate-500 mt-1.5 leading-relaxed">
              Use your own spec or client template as a formatting reference.
            </p>
            <div className="mt-3 rounded-md border border-dashed border-slate-300 px-3 py-4 text-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto text-slate-400"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <div className="text-[12px] text-slate-600 mt-1.5">
                Click to upload PDF / DOC / DOCX
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">Max 10 MB</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium transition border-b-2 -mb-px ${
              activeTab === tab
                ? "border-black text-black"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Requirements list */}
      <div className="bg-white rounded-xl border border-slate-200">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-800">Requirements</h2>
          <button className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:border-slate-300 transition">
            Add Requirement
          </button>
        </div>

        <div className="grid grid-cols-[1fr_100px_60px] gap-3 px-5 py-2.5 border-b border-slate-50 text-[11px] text-slate-400 font-medium uppercase tracking-wider">
          <span>Requirement</span>
          <span>Bucket</span>
          <span className="text-right">Weight</span>
        </div>

        <div className="divide-y divide-slate-50">
          {requirements.map((r) => (
            <div key={r.text} className="grid grid-cols-[1fr_100px_60px] gap-3 px-5 py-3 items-center hover:bg-slate-50/50 transition">
              <span className="text-sm text-slate-700">{r.text}</span>
              <span className="text-[11px] text-slate-500">{r.bucket}</span>
              <span className="text-[11px] text-slate-400 text-right">{r.weight}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
