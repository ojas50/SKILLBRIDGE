"use client";

import React, { useState } from "react";
import Link from "next/link";
import SihDemoModal from "@/components/SihDemoModal";

export default function Home() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [showLoop, setShowLoop] = useState(false);

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Hero */}
      <section className="relative text-center py-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-[11px] font-semibold text-emerald-400 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          Live Intelligence Active
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white max-w-3xl mx-auto leading-[1.1] mb-3">
          Know Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">
            Career Readiness
          </span>
        </h1>

        <p className="text-sm text-slate-400 max-w-xl mx-auto mb-5">
          See how your skills match real employer demand — and exactly what to learn next.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <Link href="/career-readiness" className="btn-glow text-sm py-2.5 px-5">
            Check My Readiness
          </Link>
          <button onClick={() => setIsDemoModalOpen(true)} className="btn-secondary text-sm py-2.5 px-4">
            🚀 Watch Demo
          </button>
        </div>
      </section>

      {/* Stats + Hot Skills inline */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {[
          { icon: "📚", value: "1,247", label: "Courses", color: "text-blue-400" },
          { icon: "⚡", value: "389", label: "Skill Gaps", color: "text-rose-400" },
          { icon: "🎯", value: "67.4%", label: "Placement", color: "text-emerald-400" },
          { icon: "🏢", value: "856", label: "Partners", color: "text-purple-400" },
        ].map((s) => (
          <div key={s.label} className="glass-card px-3 py-3 flex items-center gap-3">
            <span className="text-lg">{s.icon}</span>
            <div>
              <span className={`text-lg font-black ${s.color} block leading-tight`}>{s.value}</span>
              <span className="text-[10px] text-slate-500">{s.label}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Hot Skills */}
      <section className="glass-card p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
          <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Hot Skills</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { name: "GenAI & LLMs", growth: "+42%", hot: true },
            { name: "Cloud & DevOps", growth: "+34%", hot: true },
            { name: "Cybersecurity", growth: "+29%", hot: false },
            { name: "Full-Stack Dev", growth: "+22%", hot: false },
            { name: "Data Analysis", growth: "+18%", hot: false },
            { name: "IoT & Embedded", growth: "+15%", hot: false },
          ].map((s) => (
            <span key={s.name} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium border ${
              s.hot ? "bg-rose-500/10 text-rose-300 border-rose-500/20" : "bg-slate-900/50 text-slate-300 border-slate-800"
            }`}>
              {s.name}
              <span className={`font-mono ${s.hot ? "text-rose-400" : "text-slate-500"}`}>{s.growth}</span>
            </span>
          ))}
        </div>
      </section>

      {/* Student Modules */}
      <section>
        <h2 className="text-base font-bold text-white mb-3 flex items-center gap-2">
          <span>🎓</span> For Students
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {[
            { name: "My Readiness", desc: "Check readiness for your dream job", href: "/career-readiness", icon: "🎯", hot: true },
            { name: "My Dashboard", desc: "Track your progress", href: "/my-dashboard", icon: "📊" },
            { name: "Wishlist", desc: "Saved courses", href: "/wishlist", icon: "⭐" },
            { name: "Career Paths", desc: "Learning roadmaps", href: "/career-pathways", icon: "🗺️" },
          ].map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className={`glass-card glass-card-interactive p-3.5 block group ${
                m.hot ? "border-blue-500/30 bg-blue-950/20" : ""
              }`}
            >
              <span className="text-lg block mb-1">{m.icon}</span>
              <h3 className={`text-xs font-bold ${m.hot ? "text-blue-300" : "text-white group-hover:text-blue-400"} transition-colors`}>{m.name}</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">{m.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Admin Modules */}
      <section>
        <h2 className="text-base font-bold text-white mb-3 flex items-center gap-2">
          <span>🏛️</span> For Administrators
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {[
            { name: "Cockpit", href: "/dashboard", icon: "📊" },
            { name: "AI Advisor", href: "/curriculum-advisor", icon: "🤖" },
            { name: "Policy", href: "/policy-decisions", icon: "🏛️" },
            { name: "Simulator", href: "/skill-gaps", icon: "⚡" },
            { name: "Districts", href: "/district-plans", icon: "📍" },
            { name: "Placement", href: "/placement-analytics", icon: "📈" },
          ].map((m) => (
            <Link key={m.href} href={m.href} className="glass-card glass-card-interactive p-3 text-center group">
              <span className="text-lg block">{m.icon}</span>
              <span className="text-[11px] font-bold text-slate-300 group-hover:text-blue-400 transition-colors">{m.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="glass-card overflow-hidden">
        <button
          onClick={() => setShowLoop(!showLoop)}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-900/30 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span>🔄</span>
            <div>
              <span className="text-sm font-bold text-white">How SkillBridge Works</span>
              <span className="text-[11px] text-slate-500 block">12-stage intelligence loop</span>
            </div>
          </div>
          <svg className={`w-4 h-4 text-slate-500 transition-transform ${showLoop ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {showLoop && (
          <div className="border-t border-slate-800 p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {[
                { n: "01", t: "Demand Detection", i: "📡" },
                { n: "02", t: "Skill Extraction", i: "🔬" },
                { n: "03", t: "Gap Analysis", i: "⚖️" },
                { n: "04", t: "Course Mapping", i: "🗺️" },
                { n: "05", t: "AI Recommendations", i: "🤖" },
                { n: "06", t: "Continuous Updates", i: "🔄" },
              ].map((s) => (
                <div key={s.n} className="p-3 rounded-lg bg-slate-900/50 border border-slate-800 text-center">
                  <span className="text-lg block">{s.i}</span>
                  <span className="text-[10px] font-mono text-blue-400">{s.n}</span>
                  <p className="text-[11px] font-bold text-white mt-0.5">{s.t}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <SihDemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </main>
  );
}
