"use client";

const targetCompanies = [
  { name: "Stripe", candidates: 4, status: "Active" },
  { name: "Datadog", candidates: 3, status: "Active" },
  { name: "Snowflake", candidates: 2, status: "Active" },
  { name: "Cloudflare", candidates: 3, status: "Active" },
  { name: "HashiCorp", candidates: 1, status: "Active" },
];

const exclusions = [
  { name: "Acme Corp", reason: "Client company" },
  { name: "Veritas Systems", reason: "Off-limits (existing relationship)" },
  { name: "Pinnacle Tech", reason: "Recent placement — 12-month no-recruit" },
];

const archetypes = [
  { label: "Scale operator", description: "Led 500+ eng org through hyper-growth, shipping at speed with reliability" },
  { label: "Platform builder", description: "Built internal developer platforms that accelerated team output" },
  { label: "M&A integrator", description: "Successfully merged engineering orgs post-acquisition" },
];

export default function MarketMapPage() {
  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-black">Market Map</h1>
          <p className="text-sm text-slate-500 mt-0.5">Target companies, exclusions, and candidate archetypes</p>
        </div>
        <button className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition font-medium">
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
          <div className="divide-y divide-slate-50">
            {targetCompanies.map((c) => (
              <a key={c.name} href="#" className="grid grid-cols-[1fr_80px_60px] gap-3 px-5 py-3 items-center hover:bg-slate-50/50 transition">
                <span className="text-sm font-medium text-slate-800">{c.name}</span>
                <span className="text-sm text-slate-500 text-right">{c.candidates}</span>
                <span className="text-[11px] text-slate-400 text-right">{c.status}</span>
              </a>
            ))}
          </div>
          <div className="px-5 py-3 border-t border-slate-100">
            <button className="text-xs text-slate-500 hover:text-black font-medium transition">View all 18 companies</button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Exclusions */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="text-sm font-semibold text-slate-800 mb-3">Exclusions</h2>
            <div className="space-y-2">
              {exclusions.map((e) => (
                <div key={e.name} className="px-3 py-2.5 rounded-lg bg-slate-50">
                  <span className="text-[13px] font-medium text-slate-700 block">{e.name}</span>
                  <span className="text-[11px] text-slate-400">{e.reason}</span>
                </div>
              ))}
            </div>
            <button className="mt-3 text-xs text-slate-500 hover:text-black font-medium transition">Add exclusion</button>
          </div>

          {/* Archetypes */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="text-sm font-semibold text-slate-800 mb-3">Candidate Archetypes</h2>
            <div className="space-y-2">
              {archetypes.map((a) => (
                <div key={a.label} className="px-3 py-2.5 rounded-lg bg-slate-50">
                  <span className="text-[13px] font-medium text-slate-700 block">{a.label}</span>
                  <span className="text-[11px] text-slate-400 leading-4 block mt-0.5">{a.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
