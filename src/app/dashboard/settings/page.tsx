"use client";

const teamMembers = [
  { name: "Jason Datta", email: "jason@demofirm.com", role: "Partner" },
  { name: "Sarah Lin", email: "sarah@demofirm.com", role: "Recruiter" },
  { name: "Michael Torres", email: "michael@demofirm.com", role: "Recruiter" },
];

export default function SettingsPage() {
  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-xl font-semibold tracking-tight text-black">Settings</h1>
        <p className="text-sm text-slate-500 mt-0.5">Firm and account configuration</p>
      </div>

      {/* Firm info */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6">
        <h2 className="text-sm font-semibold text-slate-800 mb-4">Firm</h2>
        <div className="space-y-4">
          <div>
            <label className="text-[11px] text-slate-400 uppercase tracking-wider block mb-1">Firm name</label>
            <input type="text" defaultValue="Demo Firm" className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 text-slate-800 focus:outline-none focus:border-slate-400 transition" />
          </div>
          <div>
            <label className="text-[11px] text-slate-400 uppercase tracking-wider block mb-1">Contact email</label>
            <input type="email" defaultValue="ops@demofirm.com" className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 text-slate-800 focus:outline-none focus:border-slate-400 transition" />
          </div>
        </div>
        <button className="mt-4 text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition font-medium">
          Save Changes
        </button>
      </div>

      {/* Team */}
      <div className="bg-white rounded-xl border border-slate-200">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-800">Team</h2>
          <button className="text-xs px-3 py-1.5 rounded-lg bg-black text-white font-medium">Invite Member</button>
        </div>
        <div className="divide-y divide-slate-50">
          {teamMembers.map((m) => (
            <div key={m.email} className="flex items-center justify-between px-5 py-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-medium text-slate-500">
                  {m.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <span className="text-sm font-medium text-slate-800 block">{m.name}</span>
                  <span className="text-[11px] text-slate-400">{m.email}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-slate-400">{m.role}</span>
                <button className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:border-slate-300 transition">Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
