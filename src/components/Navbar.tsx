"use client";

import { useState, useEffect } from "react";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="h-20">
      <div
        className={`fixed z-[100] flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? "left-1/2 -translate-x-1/2 top-4 w-[calc(100%-2rem)] max-w-4xl px-6 py-3 bg-white/90 backdrop-blur-md border border-slate-200 rounded-full shadow-sm"
            : "left-0 right-0 top-0 px-6 md:px-16 lg:px-24 xl:px-32 py-5 bg-white/90 backdrop-blur-sm border-b border-slate-100"
        }`}
      >
        <a href="/" className="text-lg font-semibold tracking-tight text-black">
          Run Retained
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm text-slate-500">
          <a
            href="#capabilities"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("capabilities")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="hover:text-black transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="hover:text-black transition-colors"
          >
            How It Works
          </a>
          <a
            href="#faq"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="hover:text-black transition-colors"
          >
            FAQ
          </a>
        </div>

        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden text-slate-600 p-1"
          aria-label="Open menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 5h16" />
            <path d="M4 12h16" />
            <path d="M4 19h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 ${
          menuOpen ? "w-full" : "w-0"
        } overflow-hidden bg-white shadow-xl z-[200] text-sm transition-all`}
      >
        <div className="flex flex-col items-center justify-center h-full text-lg gap-6 p-4 text-slate-700">
          <a
            href="#capabilities"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              document.getElementById("capabilities")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Features
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            How It Works
          </a>
          <a
            href="#faq"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            FAQ
          </a>
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute right-6 top-6 text-slate-400 hover:text-slate-700"
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
