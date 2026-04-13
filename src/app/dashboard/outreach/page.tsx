"use client";

const sequences = [
  { candidate: "Sarah Chen", channel: "Email", step: "Initial", sent: "Apr 7", status: "Responded" },
  { candidate: "Marcus Rivera", channel: "LinkedIn", step: "Follow-up 1", sent: "Apr 10", status: "Responded" },
  { candidate: "Alex Kim", channel: "Email", step: "Initial", sent: "Apr 11", status: "Pending" },
  { candidate: "Jordan Hayes", channel: "Email", step: "Follow-up 2", sent: "Apr 9", status: "Responded" },
  { candidate: "Nina Patel", channel: "LinkedIn", step: "Initial", sent: "Apr 12", status: "Pending" },
  { candidate: "David Park", channel: "Referral", step: "Intro", sent: "Apr 11", status: "Pending" },
];

const stats = [
  { label: "Sent", value: "42" },
  { label: "Responded", value: "18" },
  { label: "Response rate", value: "43%" },
  { label: "Pending", value: "8" },
];

export default function OutreachPage() {
  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-black">Outreach</h1>
          <p className="text-sm text-slate-500 mt-0.5">Multi-channel candidate engagement</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-sm px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:border-slate-300 transition font-medium">
            View Templates
          </button>
          <button className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition font-medium">
            New Outreach
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-4">
            <span className="text-[11px] text-slate-400 block">{s.label}</span>
            <span className="text-xl font-semibold text-slate-800">{s.value}</span>
          </div>
        ))}
      </div>

      {/* Outreach table */}
      <div className="bg-white rounded-xl border border-slate-200">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-800">Recent Outreach</h2>
          <button className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:border-slate-300 transition">Filter</button>
        </div>

        <div className="grid grid-cols-[1fr_80px_90px_70px_80px] gap-3 px-5 py-2.5 border-b border-slate-50 text-[11px] text-slate-400 font-medium uppercase tracking-wider">
          <span>Candidate</span>
          <span>Channel</span>
          <span>Step</span>
          <span>Sent</span>
          <span className="text-right">Status</span>
        </div>

        <div className="divide-y divide-slate-50">
          {sequences.map((s) => (
            <a key={`${s.candidate}-${s.step}`} href="#" className="grid grid-cols-[1fr_80px_90px_70px_80px] gap-3 px-5 py-3 items-center hover:bg-slate-50/50 transition">
              <span className="text-sm font-medium text-slate-800 truncate">{s.candidate}</span>
              <span className="text-[11px] text-slate-500">{s.channel}</span>
              <span className="text-[11px] text-slate-500">{s.step}</span>
              <span className="text-[11px] text-slate-400">{s.sent}</span>
              <span className="text-[11px] text-slate-500 text-right">{s.status}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
