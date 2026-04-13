"use client";

const interviews = [
  { candidate: "Priya Sharma", round: "Final", with: "CEO, VP Product", date: "Apr 15", time: "2:00 PM", status: "Scheduled" },
  { candidate: "Sarah Chen", round: "Round 2", with: "CTO, VP Infra", date: "Apr 14", time: "10:00 AM", status: "Scheduled" },
  { candidate: "Marcus Rivera", round: "Round 1", with: "VP Product", date: "Apr 12", time: "3:00 PM", status: "Complete" },
  { candidate: "Lisa Wang", round: "Round 1", with: "CTO", date: "Apr 11", time: "11:00 AM", status: "Complete" },
];

const debriefs = [
  { candidate: "Marcus Rivera", round: "Round 1", interviewer: "VP Product", captured: true },
  { candidate: "Lisa Wang", round: "Round 1", interviewer: "CTO", captured: false },
];

export default function InterviewsPage() {
  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-black">Interviews</h1>
          <p className="text-sm text-slate-500 mt-0.5">Interview coordination and feedback capture</p>
        </div>
        <button className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition font-medium">
          Schedule Interview
        </button>
      </div>

      {/* Upcoming */}
      <div className="bg-white rounded-xl border border-slate-200 mb-6">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-800">Upcoming</h2>
        </div>
        <div className="divide-y divide-slate-50">
          {interviews.filter(i => i.status === "Scheduled").map((i) => (
            <div key={`${i.candidate}-${i.round}`} className="flex items-center justify-between px-5 py-3.5">
              <div>
                <span className="text-sm font-medium text-slate-800 block">{i.candidate} — {i.round}</span>
                <span className="text-[11px] text-slate-400">With {i.with} · {i.date} at {i.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:border-slate-300 transition">Prep Candidate</button>
                <button className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:border-slate-300 transition">Reschedule</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback pending */}
      <div className="bg-white rounded-xl border border-slate-200">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-800">Feedback Pending</h2>
        </div>
        <div className="divide-y divide-slate-50">
          {debriefs.map((d) => (
            <div key={`${d.candidate}-${d.interviewer}`} className="flex items-center justify-between px-5 py-3.5">
              <div>
                <span className="text-sm font-medium text-slate-800 block">{d.candidate} — {d.round}</span>
                <span className="text-[11px] text-slate-400">Interviewer: {d.interviewer}</span>
              </div>
              <button className="text-xs px-3 py-1.5 rounded-lg bg-black text-white font-medium">
                Capture Feedback
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
