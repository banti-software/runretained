"use client";

import { useState, useEffect } from "react";
import { company } from "@/lib/content";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const smoothScroll = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="h-20">
      <div
        className={`fixed z-[100] flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? "left-1/2 -translate-x-1/2 top-4 w-[calc(100%-2rem)] max-w-3xl px-5 py-2.5 bg-white/95 backdrop-blur-md border border-slate-200 rounded-full shadow-sm"
            : "left-0 right-0 top-0 px-6 md:px-16 lg:px-24 xl:px-32 py-5 bg-white/90 backdrop-blur-sm border-b border-slate-100"
        }`}
      >
        {/* Left: Logo */}
        <a href="/" className="text-base font-semibold tracking-tight text-black shrink-0">
          Run Retained
        </a>

        {/* Center: Nav links */}
        <div className="hidden md:flex items-center gap-7 text-[13px] text-slate-500 absolute left-1/2 -translate-x-1/2">
          <a href="#capabilities" onClick={(e) => smoothScroll(e, "capabilities")} className="hover:text-black transition-colors">
            Features
          </a>
          <a href="#how-it-works" onClick={(e) => smoothScroll(e, "how-it-works")} className="hover:text-black transition-colors">
            How It Works
          </a>
          <a href="#faq" onClick={(e) => smoothScroll(e, "faq")} className="hover:text-black transition-colors">
            FAQ
          </a>
        </div>

        {/* Right: CTA */}
        <a
          href={`mailto:${company.contactEmail}`}
          className={`hidden md:inline-flex items-center text-[13px] font-medium transition shrink-0 ${
            scrolled
              ? "px-4 py-1.5 bg-black hover:bg-slate-800 text-white rounded-full"
              : "text-slate-500 hover:text-black"
          }`}
        >
          Get in touch
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden text-slate-600 p-1"
          aria-label="Open menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 5h16" /><path d="M4 12h16" /><path d="M4 19h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 ${
          menuOpen ? "w-full opacity-100" : "w-0 opacity-0"
        } overflow-hidden bg-white z-[200] transition-all duration-200`}
      >
        <div className="flex flex-col items-center justify-center h-full text-lg gap-8 p-4 text-slate-700">
          <a href="#capabilities" onClick={(e) => smoothScroll(e, "capabilities")}>Features</a>
          <a href="#how-it-works" onClick={(e) => smoothScroll(e, "how-it-works")}>How It Works</a>
          <a href="#faq" onClick={(e) => smoothScroll(e, "faq")}>FAQ</a>
          <a
            href={`mailto:${company.contactEmail}`}
            className="px-8 py-2.5 bg-black hover:bg-slate-800 transition text-white rounded-full text-base"
          >
            Get in touch
          </a>
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute right-6 top-6 text-slate-400 hover:text-slate-700"
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
