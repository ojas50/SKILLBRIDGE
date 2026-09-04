"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import SihDemoModal from "@/components/SihDemoModal";
import { useAuth } from "@/lib/AuthContext";

const NAV_ITEMS = [
  { name: "Overview", href: "/" },
  { name: "My Readiness", href: "/career-readiness" },
  { name: "Skill Matrix", href: "/skill-matrix" },
  { name: "Courses", href: "/courses" },
  { name: "Pathways", href: "/career-pathways" },
  { name: "Employers", href: "/employers" },
];

const ADMIN_NAV_ITEMS = [
  { name: "Cockpit", href: "/dashboard" },
  { name: "Policy", href: "/policy-decisions" },
  { name: "Simulator", href: "/skill-gaps" },
  { name: "Districts", href: "/district-plans" },
  { name: "AI Advisor", href: "/curriculum-advisor" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#090d16]/95 backdrop-blur-md border-b border-slate-800/80">
        {/* Top Status Banner */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border-b border-blue-900/40 text-[11px] px-4 sm:px-6 py-1 text-slate-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-bold text-white">SkillBridge AI</span>
            <span className="hidden md:inline text-slate-500">•</span>
            <span className="hidden md:inline text-blue-300 font-medium">
              Labour-Market Intelligence &amp; Curriculum Alignment
            </span>
            <span className="hidden lg:inline text-slate-500">•</span>
            <span className="hidden lg:inline text-xs font-mono font-bold px-2 py-0.2 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
              SIH 2026
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="bg-blue-600/30 hover:bg-blue-600/50 border border-blue-400/50 text-blue-200 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold flex items-center gap-1 transition-all"
            >
              <span>🚀 Demo Mode</span>
            </button>
            <span className="hidden sm:inline text-slate-400 font-mono">Syntax Squad</span>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-600 to-cyan-400 p-[1px] shadow-lg shadow-blue-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-base font-black tracking-tight text-white group-hover:text-blue-400 transition-colors">
                    Skill<span className="text-blue-500">Bridge</span>
                  </span>
                  <span className="text-[9px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded font-mono font-semibold">AI</span>
                </div>
                <p className="text-[9px] text-slate-400 leading-none">SIH Final-Round Prototype</p>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden xl:flex items-center gap-0.5">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-blue-600/25 text-blue-400 border border-blue-500/30 shadow-sm"
                        : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <span className="w-px h-4 bg-slate-800 mx-1"></span>
              {ADMIN_NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-blue-600/25 text-blue-400 border border-blue-500/30 shadow-sm"
                        : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden sm:flex items-center gap-2.5">
              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="btn-glow text-xs py-2 px-3.5 flex items-center gap-1.5 shadow-lg shadow-blue-500/20"
              >
                <span>🚀 Demo</span>
              </button>

              {user ? (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="w-6 h-6 rounded-full bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-[10px] font-bold text-blue-300">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-xs font-medium text-slate-300 max-w-[100px] truncate">{user.name}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="text-xs text-slate-500 hover:text-rose-400 transition-colors px-2 py-1.5"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="btn-secondary text-xs py-2 px-3 flex items-center gap-1"
                >
                  <span>Sign In</span>
                </Link>
              )}
            </div>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 text-slate-400 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu drawer */}
        {isMobileMenuOpen && (
          <div className="xl:hidden border-t border-slate-800 bg-slate-950/95 px-4 pt-2 pb-6 space-y-1">
            <div className="grid grid-cols-2 gap-1 mb-3">
              {[...NAV_ITEMS, ...ADMIN_NAV_ITEMS].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-xs font-medium ${
                    pathname === item.href
                      ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                      : "text-slate-300 hover:bg-slate-900"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsDemoModalOpen(true);
                }}
                className="btn-glow w-full justify-center text-xs py-2.5"
              >
                🚀 Launch Demo Mode
              </button>

              {user ? (
                <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-xs font-bold text-blue-300">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-xs font-medium text-slate-300">{user.name}</span>
                  </div>
                  <button
                    onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                    className="text-xs text-rose-400 hover:text-rose-300"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-secondary w-full justify-center text-xs py-2"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* SIH Demo Mode Modal */}
      <SihDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
    </>
  );
}
