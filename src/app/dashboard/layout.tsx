import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardProvider } from "@/lib/store";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider>
      <div className="flex h-screen overflow-hidden bg-white">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-slate-50">{children}</main>
      </div>
    </DashboardProvider>
  );
}
