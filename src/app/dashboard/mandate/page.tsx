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
