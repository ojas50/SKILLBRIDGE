"use client";

import React, { useState } from "react";
import Link from "next/link";
import SihDemoModal from "@/components/SihDemoModal";

export default function Home() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [showLoop, setShowLoop] = useState(false);

  const quickStats = [
    { label: "Courses Tracked", value: "1,247", icon: "📚", color: "text-blue-400" },
    { label: "Skill Gaps Found", value: "389", icon: "⚡", color: "text-rose-400" },
    { label: "Placement Rate", value: "67.4%", icon: "🎯", color: "text-emerald-400" },
    { label: "Hiring Partners", value: "856", icon: "🏢", color: "text-purple-400" },
  ];

  const hotSkills = [
    { name: "Generative AI", growth: "+42%", status: "critical" as const },
    { name: "Cloud & DevOps", growth: "+34%", status: "high" as const },
    { name: "Cybersecurity", growth: "+29%", status: "high" as const },
    { name: "Full-Stack Dev", growth: "+22%", status: "moderate" as const },
  ];

  const studentModules = [
    { name: "My Readiness", desc: "Check how ready you are for your dream company", href: "/career-readiness", icon: "🎯", highlight: true },
    { name: "Career Pathways", desc: "See learning paths for your target role", href: "/career-pathways", icon: "🗺️" },
    { name: "Courses", desc: "Browse courses ranked by industry alignment", href: "/courses", icon: "🎓" },
    { name: "Skill Matrix", desc: "See which skills are in highest demand", href: "/skill-matrix", icon: "🔥" },
  ];

  const adminModules = [
    { name: "Executive Cockpit", desc: "State-wide skill health overview", href: "/dashboard", icon: "📊" },
    { name: "AI Curriculum Advisor", desc: "Upload syllabus for instant modernization plan", href: "/curriculum-advisor", icon: "🤖" },
    { name: "Policy Decisions", desc: "Authorize updates and resource allocation", href: "/policy-decisions", icon: "🏛️" },
    { name: "What-If Simulator", desc: "Model outcomes of policy changes", href: "/skill-gaps", icon: "⚡" },
    { name: "District Plans", desc: "Regional training roadmaps", href: "/district-plans", icon: "📍" },
    { name: "Placement Analytics", desc: "Track graduate employment outcomes", href: "/placement-analytics", icon: "📈" },
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Hero */}
      <section className="relative text-center py-8">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold text-emerald-400 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          Live Intelligence Active
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.1] mb-4">
          Know Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">
            Career Readiness
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed mb-6">
          SkillBridge matches your skills against real employer demand. See how ready you are for the job you want — and exactly what to learn next.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/career-readiness" className="btn-glow text-sm py-3 px-6 font-bold">
            Check My Readiness
          </Link>
          <button
            onClick={() => setIsDemoModalOpen(true)}
            className="btn-secondary text-sm py-3 px-5 flex items-center gap-2"
          >
            <span>🚀</span> Watch Demo
          </button>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {quickStats.map((s) => (
          <div key={s.label} className="glass-card p-4 text-center">
            <span className="text-xl mb-1 block">{s.icon}</span>
            <span className={`text-2xl font-black ${s.color}`}>{s.value}</span>
            <p className="text-[11px] text-slate-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </section>

      {/* Hot Skills Ticker */}
      <section className="glass-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
          <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">Hot Skills Right Now</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {hotSkills.map((s) => (
            <div key={s.name} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div>
                <span className="text-xs font-bold text-white block">{s.name}</span>
                <span className={`text-[10px] font-mono font-bold ${
                  s.status === "critical" ? "text-rose-400" : s.status === "high" ? "text-amber-400" : "text-blue-400"
                }`}>{s.growth} YoY</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                s.status === "critical" ? "bg-rose-500/15 text-rose-300 border border-rose-500/30"
                  : s.status === "high" ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                  : "bg-blue-500/15 text-blue-300 border border-blue-500/30"
              }`}>{s.status === "critical" ? "Critical" : s.status === "high" ? "High" : "Moderate"}</span>
            </div>
          ))}
        </div>
      </section>

      {/* For Students */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">🎓</span>
          <h2 className="text-xl font-bold text-white">For Students</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {studentModules.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className={`glass-card glass-card-interactive p-5 block group ${
                m.highlight ? "border-blue-500/40 bg-blue-950/20" : ""
              }`}
            >
              <span className="text-2xl block mb-2">{m.icon}</span>
              <h3 className={`text-sm font-bold mb-1 ${m.highlight ? "text-blue-300" : "text-white group-hover:text-blue-400"} transition-colors`}>
                {m.name}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">{m.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* For Administrators */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">🏛️</span>
          <h2 className="text-xl font-bold text-white">For Administrators</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {adminModules.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className="glass-card glass-card-interactive p-5 block group"
            >
              <span className="text-xl block mb-2">{m.icon}</span>
              <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors mb-1">{m.name}</h3>
              <p className="text-xs text-slate-400">{m.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works - Collapsible */}
      <section className="glass-card overflow-hidden">
        <button
          onClick={() => setShowLoop(!showLoop)}
          className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-900/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-lg">🔄</span>
            <div>
              <h2 className="text-lg font-bold text-white">How SkillBridge Works</h2>
              <p className="text-xs text-slate-400">12-stage intelligence loop — click to explore</p>
            </div>
          </div>
          <svg
            className={`w-5 h-5 text-slate-400 transition-transform ${showLoop ? "rotate-180" : ""}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {showLoop && (
          <div className="border-t border-slate-800 p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { num: "01", title: "Demand Detection", desc: "Aggregates 14,800+ live job postings from TCS, Infosys, Wipro, and 48+ hiring partners", icon: "📡" },
                { num: "02", title: "Skill Extraction", desc: "NLP extracts 320+ competencies from unstructured job descriptions", icon: "🔬" },
                { num: "03", title: "Gap Analysis", desc: "Maps demand vs trained supply across 12,400 students in 36 districts", icon: "⚖️" },
                { num: "04", title: "Course Mapping", desc: "Links every skill gap to active courses, scores alignment 0–100", icon: "🗺️" },
                { num: "05", title: "AI Recommendations", desc: "Generates module-by-module upgrade plans with lab hour estimates", icon: "🤖" },
                { num: "06", title: "Continuous Updates", desc: "Quarterly data-driven micro-updates replace 3–5 year revision cycles", icon: "🔄" },
              ].map((stage) => (
                <div key={stage.num} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-blue-400">{stage.num}</span>
                    <span className="text-lg">{stage.icon}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">{stage.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{stage.desc}</p>
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
