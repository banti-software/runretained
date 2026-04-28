"use client";

import { useEffect, useState } from "react";
import { useDashboard, type TeamMember } from "@/lib/store";
import { Modal, Field, inputCls, selectCls } from "@/components/dashboard/Modal";

const roles: TeamMember["role"][] = ["Partner", "Recruiter", "Coordinator"];

export default function SettingsPage() {
  const { state, saveFirm, inviteMember, updateMember } = useDashboard();
  const [name, setName] = useState(state.firm.name);
  const [email, setEmail] = useState(state.firm.email);
  const [showSaved, setShowSaved] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [editing, setEditing] = useState<TeamMember | null>(null);

  useEffect(() => {
    if (!showSaved) return;
    const t = setTimeout(() => setShowSaved(false), 2500);
    return () => clearTimeout(t);
  }, [showSaved]);

  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-xl font-semibold tracking-tight text-black">Settings</h1>
        <p className="text-sm text-slate-500 mt-0.5">Firm and account configuration</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6">
        <h2 className="text-sm font-semibold text-slate-800 mb-4">Firm</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveFirm({ name, email });
            setShowSaved(true);
          }}
          className="space-y-4"
        >
          <Field label="Firm name">
            <input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
          </Field>
          <Field label="Contact email">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
          </Field>
          <div className="flex items-center gap-3">
            <button type="submit" className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition font-medium">
              Save Changes
            </button>
            {showSaved && <span className="text-[12px] text-slate-400">Saved</span>}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl border border-slate-200">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-800">Team</h2>
          <button
            onClick={() => setInviteOpen(true)}
            className="text-xs px-3 py-1.5 rounded-lg bg-black text-white font-medium hover:bg-slate-800 transition"
          >
            Invite Member
          </button>
        </div>
        <div className="divide-y divide-slate-50">
          {state.team.map((m) => (
            <div key={m.id} className="flex items-center justify-between px-5 py-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-medium text-slate-500">
                  {m.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <span className="text-sm font-medium text-slate-800 block">{m.name}</span>
                  <span className="text-[11px] text-slate-400">{m.email}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-slate-400">{m.role}</span>
                <button
                  onClick={() => setEditing(m)}
                  className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:border-slate-300 transition"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <InviteModal open={inviteOpen} onClose={() => setInviteOpen(false)} onAdd={inviteMember} />
      <EditModal
        member={editing}
        onClose={() => setEditing(null)}
        onSave={(patch) => {
          if (editing) updateMember(editing.id, patch);
          setEditing(null);
        }}
      />
    </div>
  );
}

function InviteModal({
  open,
  onClose,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (m: Omit<TeamMember, "id">) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<TeamMember["role"]>("Recruiter");
  return (
    <Modal open={open} onClose={onClose} title="Invite Team Member">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!name.trim() || !email.trim()) return;
          onAdd({ name: name.trim(), email: email.trim(), role });
          setName("");
          setEmail("");
          setRole("Recruiter");
          onClose();
        }}
        className="space-y-3"
      >
        <Field label="Name">
          <input autoFocus value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
        </Field>
        <Field label="Email">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
        </Field>
        <Field label="Role">
          <select value={role} onChange={(e) => setRole(e.target.value as TeamMember["role"])} className={selectCls}>
            {roles.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </Field>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="text-sm px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:border-slate-300 transition font-medium">
            Cancel
          </button>
          <button type="submit" className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition font-medium">
            Invite
          </button>
        </div>
      </form>
    </Modal>
  );
}

function EditModal({
  member,
  onClose,
  onSave,
}: {
  member: TeamMember | null;
  onClose: () => void;
  onSave: (patch: Partial<TeamMember>) => void;
}) {
  const [name, setName] = useState(member?.name ?? "");
  const [email, setEmail] = useState(member?.email ?? "");
  const [role, setRole] = useState<TeamMember["role"]>(member?.role ?? "Recruiter");

  return (
    <Modal open={!!member} onClose={onClose} title={`Edit — ${member?.name ?? ""}`}>
      {member && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave({ name, email, role });
          }}
          className="space-y-3"
        >
          <Field label="Name">
            <input autoFocus value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
          </Field>
          <Field label="Email">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
          </Field>
          <Field label="Role">
            <select value={role} onChange={(e) => setRole(e.target.value as TeamMember["role"])} className={selectCls}>
              {roles.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </Field>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="text-sm px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:border-slate-300 transition font-medium">
              Cancel
            </button>
            <button type="submit" className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition font-medium">
              Save
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
