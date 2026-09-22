"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import SihDemoModal from "@/components/SihDemoModal";
import { useAuth } from "@/lib/AuthContext";
import { useTheme } from "@/lib/ThemeContext";

const NAV_ITEMS = [
  { name: "Overview", href: "/" },
  { name: "My Dashboard", href: "/my-dashboard" },
  { name: "My Readiness", href: "/career-readiness" },
  { name: "Wishlist", href: "/wishlist" },
  { name: "Courses", href: "/courses" },
];

const EXPLORE_ITEMS = [
  { name: "Skill Matrix", href: "/skill-matrix" },
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

function AdminDropdown({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const active = ADMIN_NAV_ITEMS.some((i) => i.href === pathname);
  return (
    <div
      className="relative"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-1 ${
          active
            ? "bg-sun text-charcoal shadow-sm"
            : "text-ink-muted hover:text-ink hover:bg-line"
        }`}
      >
        Admin
        <svg
          className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 w-44 py-1.5 rounded-xl bg-raised border border-line shadow-xl shadow-black/40 z-50">
          {ADMIN_NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`block px-3 py-2 text-xs font-semibold transition-colors ${
                pathname === item.href
                  ? "text-charcoal bg-sun"
                  : "text-ink-muted hover:text-ink hover:bg-line"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-[var(--navbar)] backdrop-blur-md border-b border-line">
        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0" aria-label="SkillBridge home">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sun to-neon p-[1px] shadow-lg shadow-black/20">
                <div className="w-full h-full bg-canvas rounded-[10px] flex items-center justify-center">
                  <svg className="w-4 h-4 text-charcoal group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div>
                <span className="text-base font-black tracking-tight text-ink group-hover:text-neon transition-colors">
                  Skill<span className="text-neon">Bridge</span>
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-sun text-charcoal shadow-sm"
                        : "text-ink-muted hover:text-ink hover:bg-line"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <span className="w-px h-4 bg-line mx-1"></span>
              <AdminDropdown pathname={pathname} />
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden sm:flex items-center gap-2.5">
              <button
                onClick={toggleTheme}
                aria-label="Toggle light or dark theme"
                className="p-2 rounded-xl bg-transparent border border-line text-ink-muted hover:text-ink hover:border-platinum/40 transition-colors"
                title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <circle cx="12" cy="12" r="4" />
                    <path strokeLinecap="round" d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.8A8.9 8.9 0 1111.2 3a7 7 0 009.8 9.8z" />
                  </svg>
                )}
              </button>

              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="btn-glow text-xs py-2 px-3.5 flex items-center gap-1.5 shadow-lg shadow-black/20"
              >
                <span>🚀 Demo</span>
              </button>

              {user ? (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-raised border border-line">
                    <div className="w-6 h-6 rounded-full bg-sun border border-platinum/30 flex items-center justify-center text-[10px] font-bold text-charcoal">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-xs font-medium text-ink max-w-[100px] truncate">{user.name}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="text-xs text-crimson hover:opacity-80 transition-opacity px-2 py-1.5"
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
              className="lg:hidden p-2 text-ink-muted hover:text-ink focus:outline-none"
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
          <div className="lg:hidden border-t border-line bg-canvas px-4 pt-2 pb-6">
            <div className="space-y-3 pb-4 mb-2 border-b border-line">
              {[
                { label: "Main", items: NAV_ITEMS },
                { label: "Explore", items: EXPLORE_ITEMS },
                { label: "Admin", items: ADMIN_NAV_ITEMS },
              ].map((group) => (
                <div key={group.label}>
                  <p className="text-[10px] font-mono font-semibold uppercase tracking-wider text-ink-faint px-1 mb-1">
                    {group.label}
                  </p>
                  <div className="grid grid-cols-2 gap-1">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center min-h-[44px] px-3 py-2 rounded-md text-xs font-medium ${
                          pathname === item.href
                            ? "bg-sun text-charcoal"
                            : "text-ink-muted hover:bg-line"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsDemoModalOpen(true);
                }}
                className="btn-glow w-full justify-center text-xs min-h-[44px]"
              >
                🚀 Launch Demo Mode
              </button>

              <button
                onClick={toggleTheme}
                className="btn-secondary w-full justify-center text-xs min-h-[44px]"
              >
                {theme === "dark" ? "☀️ Switch to Light Mode" : "🌙 Switch to Dark Mode"}
              </button>

              {user ? (
                <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-raised border border-line min-h-[44px]">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-sun border border-platinum/30 flex items-center justify-center text-xs font-bold text-charcoal">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-xs font-medium text-ink">{user.name}</span>
                  </div>
                  <button
                    onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                    className="text-xs text-crimson hover:opacity-80"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-secondary w-full justify-center text-xs min-h-[44px]"
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