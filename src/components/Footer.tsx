import { company } from "@/lib/content";

export function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-slate-200">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-sm text-slate-400">
          &copy; {new Date().getFullYear()} {company.legalName}. All rights reserved.
        </span>
        <div className="flex items-center gap-6 text-sm text-slate-400">
          <a href="/" className="hover:text-slate-600 transition-colors">
            Home
          </a>
          <a href="/privacy" className="hover:text-slate-600 transition-colors">
            Privacy
          </a>
          <a href="/terms" className="hover:text-slate-600 transition-colors">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}
