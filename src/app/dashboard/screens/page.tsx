"use client";

const screens = [
  { candidate: "Sarah Chen", date: "Apr 8", duration: "45 min", canThey: "Strong", willThey: "Strong", canClose: "Moderate", disposition: "Advance" },
  { candidate: "Marcus Rivera", date: "Apr 9", duration: "40 min", canThey: "Strong", willThey: "Moderate", canClose: "Unknown", disposition: "Advance" },
  { candidate: "Jordan Hayes", date: "Apr 10", duration: "35 min", canThey: "Moderate", willThey: "Strong", canClose: "Strong", disposition: "Hold" },
  { candidate: "Lisa Wang", date: "Apr 11", duration: "50 min", canThey: "Strong", willThey: "Strong", canClose: "Moderate", disposition: "Advance" },
];

export default function ScreensPage() {
  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-black">Screens</h1>
          <p className="text-sm text-slate-500 mt-0.5">Candidate screening — three-question framework</p>
        </div>
        <button className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition font-medium">
          Log Screen
        </button>
      </div>

      {/* Three questions legend */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { q: "Can they do it?", desc: "Scope, experience, and operating capability against the mandate" },
          { q: "Will they do it?", desc: "Motivation, timing, appetite for change, and role-specific interest" },
          { q: "Can we close them?", desc: "Comp alignment, competitive process, relocation, and deal-breakers" },
        ].map((item) => (
          <div key={item.q} className="bg-white rounded-xl border border-slate-200 p-4">
            <span className="text-sm font-semibold text-slate-800 block">{item.q}</span>
            <span className="text-[11px] text-slate-400 leading-4 block mt-1">{item.desc}</span>
          </div>
        ))}
      </div>

      {/* Screens table */}
      <div className="bg-white rounded-xl border border-slate-200">
        <div className="grid grid-cols-[1fr_65px_55px_70px_70px_70px_70px] gap-2 px-5 py-2.5 border-b border-slate-50 text-[11px] text-slate-400 font-medium uppercase tracking-wider">
          <span>Candidate</span>
          <span>Date</span>
          <span>Length</span>
          <span>Can they?</span>
          <span>Will they?</span>
          <span>Close?</span>
          <span className="text-right">Disposition</span>
        </div>

        <div className="divide-y divide-slate-50">
          {screens.map((s) => (
            <a key={s.candidate} href="#" className="grid grid-cols-[1fr_65px_55px_70px_70px_70px_70px] gap-2 px-5 py-3 items-center hover:bg-slate-50/50 transition">
              <span className="text-sm font-medium text-slate-800 truncate">{s.candidate}</span>
              <span className="text-[11px] text-slate-400">{s.date}</span>
              <span className="text-[11px] text-slate-400">{s.duration}</span>
              <span className="text-[11px] text-slate-600">{s.canThey}</span>
              <span className="text-[11px] text-slate-600">{s.willThey}</span>
              <span className="text-[11px] text-slate-600">{s.canClose}</span>
              <span className="text-[11px] text-slate-500 text-right">{s.disposition}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
