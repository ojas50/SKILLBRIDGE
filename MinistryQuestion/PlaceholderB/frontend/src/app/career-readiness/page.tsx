"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

interface Company {
  name: string;
  industry: string;
  skillsRequired: string[];
  openings: number;
  avgSalary: string;
  tier: "Top MNC" | "Mid-Tier" | "Startup";
}

interface Region {
  id: string;
  name: string;
  icon: string;
  companies: Company[];
}

const REGIONS: Region[] = [
  {
    id: "pune",
    name: "Pune",
    icon: "🏙️",
    companies: [
      { name: "TCS", industry: "IT Services", skillsRequired: ["Python", "Java", "AWS", "SQL", "Communication"], openings: 120, avgSalary: "₹4.5 LPA", tier: "Top MNC" },
      { name: "Infosys", industry: "IT Services", skillsRequired: ["Python", "React", "Node.js", "Git", "Agile"], openings: 95, avgSalary: "₹4.2 LPA", tier: "Top MNC" },
      { name: "Wipro", industry: "IT Services", skillsRequired: ["Java", "Spring Boot", "MySQL", "Docker", "REST APIs"], openings: 80, avgSalary: "₹4.0 LPA", tier: "Top MNC" },
      { name: "Persistent Systems", industry: "Product Engineering", skillsRequired: ["Python", "React", "TypeScript", "AWS", "CI/CD"], openings: 65, avgSalary: "₹6.5 LPA", tier: "Mid-Tier" },
      { name: "Cognizant", industry: "IT Services", skillsRequired: ["Java", "SQL", "Angular", "Azure", "Communication"], openings: 70, avgSalary: "₹4.3 LPA", tier: "Top MNC" },
      { name: "Cummins India", industry: "Manufacturing", skillsRequired: ["AutoCAD", "MATLAB", "Python", "Data Analysis", "IoT"], openings: 30, avgSalary: "₹5.0 LPA", tier: "Mid-Tier" },
    ],
  },
  {
    id: "mumbai",
    name: "Mumbai",
    icon: "🌊",
    companies: [
      { name: "TCS", industry: "IT Services", skillsRequired: ["Python", "Java", "AWS", "SQL", "Communication"], openings: 150, avgSalary: "₹4.8 LPA", tier: "Top MNC" },
      { name: "JP Morgan", industry: "BFSI / FinTech", skillsRequired: ["Python", "SQL", "Data Analysis", "Excel", "Risk Modeling"], openings: 40, avgSalary: "₹8.0 LPA", tier: "Top MNC" },
      { name: "L&T Infotech", industry: "IT Services", skillsRequired: ["Java", "React", "Microservices", "Docker", "Git"], openings: 85, avgSalary: "₹5.0 LPA", tier: "Top MNC" },
      { name: "Reliance Jio", industry: "Telecom / Tech", skillsRequired: ["Python", "ML", "Cloud", "5G", "Linux"], openings: 55, avgSalary: "₹6.0 LPA", tier: "Mid-Tier" },
      { name: "Bajaj Finserv", industry: "BFSI", skillsRequired: ["SQL", "Excel", "Python", "Tableau", "Communication"], openings: 35, avgSalary: "₹5.5 LPA", tier: "Mid-Tier" },
    ],
  },
  {
    id: "nagpur",
    name: "Nagpur",
    icon: "🍊",
    companies: [
      { name: "TCS", industry: "IT Services", skillsRequired: ["Python", "Java", "SQL", "Communication", "Git"], openings: 45, avgSalary: "₹3.8 LPA", tier: "Top MNC" },
      { name: "Infosys", industry: "IT Services", skillsRequired: ["Python", "React", "SQL", "Agile", "Communication"], openings: 40, avgSalary: "₹3.8 LPA", tier: "Top MNC" },
      { name: "Vayu Tech", industry: "Drone Tech", skillsRequired: ["Python", "C++", "IoT", "Embedded Systems", "MATLAB"], openings: 15, avgSalary: "₹5.5 LPA", tier: "Startup" },
    ],
  },
  {
    id: "nashik",
    name: "Nashik",
    icon: "🍇",
    companies: [
      { name: "Bosch India", industry: "Automotive / Manufacturing", skillsRequired: ["AutoCAD", "C++", "Embedded", "IoT", "Python"], openings: 30, avgSalary: "₹5.2 LPA", tier: "Mid-Tier" },
      { name: "TCS", industry: "IT Services", skillsRequired: ["Python", "Java", "SQL", "Communication", "Git"], openings: 35, avgSalary: "₹3.8 LPA", tier: "Top MNC" },
      { name: "ZS Associates", industry: "Analytics / Consulting", skillsRequired: ["SQL", "Excel", "Python", "Data Analysis", "Communication"], openings: 20, avgSalary: "₹7.0 LPA", tier: "Mid-Tier" },
    ],
  },
  {
    id: "aurangabad",
    name: "Aurangabad",
    icon: "🏭",
    companies: [
      { name: "Bajaj Auto", industry: "Automotive", skillsRequired: ["AutoCAD", "SolidWorks", "Python", "Quality Analysis", "SQL"], openings: 25, avgSalary: "₹4.5 LPA", tier: "Mid-Tier" },
      { name: "TCS", industry: "IT Services", skillsRequired: ["Python", "Java", "SQL", "Communication", "Git"], openings: 20, avgSalary: "₹3.8 LPA", tier: "Top MNC" },
    ],
  },
  {
    id: "solapur",
    name: "Solapur",
    icon: "🧵",
    companies: [
      { name: "TCS", industry: "IT Services", skillsRequired: ["Python", "Java", "SQL", "Communication", "Git"], openings: 15, avgSalary: "₹3.8 LPA", tier: "Top MNC" },
      { name: "TextileTech Solutions", industry: "Textile / IoT", skillsRequired: ["IoT", "Python", "Embedded", "Data Analysis", "Excel"], openings: 10, avgSalary: "₹3.5 LPA", tier: "Startup" },
    ],
  },
];

const ALL_SKILLS = [
  "Python", "Java", "JavaScript", "TypeScript", "React", "Node.js", "Angular",
  "SQL", "MySQL", "MongoDB", "AWS", "Azure", "Docker", "Kubernetes", "Git",
  "REST APIs", "Spring Boot", "Django", "Flask", "HTML/CSS",
  "Excel", "Tableau", "Data Analysis", "Machine Learning", "AI",
  "AutoCAD", "SolidWorks", "MATLAB", "C++", "C",
  "Linux", "CI/CD", "Microservices", "Agile",
  "Communication", "Problem Solving", "Teamwork",
  "IoT", "Embedded Systems", "5G",
];

function ReadinessRing({ percent }: { percent: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  const color = percent >= 70 ? "#10b981" : percent >= 40 ? "#f59e0b" : "#f43f5e";

  return (
    <div className="relative w-36 h-36">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#1e293b" strokeWidth="10" />
        <circle
          cx="60" cy="60" r={radius} fill="none"
          stroke={color} strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-black" style={{ color }}>{percent}%</span>
        <span className="text-[10px] text-slate-500 uppercase tracking-wider">Ready</span>
      </div>
    </div>
  );
}

export default function CareerReadinessPage() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedCompanies, setSelectedCompanies] = useState<Set<string>>(new Set());
  const [mySkills, setMySkills] = useState<Set<string>>(new Set());
  const [skillSearch, setSkillSearch] = useState("");

  const region = REGIONS.find((r) => r.id === selectedRegion);

  const filteredCompanies = useMemo(() => {
    if (!region) return [];
    if (selectedCompanies.size === 0) return region.companies;
    return region.companies.filter((c) => selectedCompanies.has(c.name));
  }, [region, selectedCompanies]);

  const requiredSkills = useMemo(() => {
    const map = new Map<string, { count: number; companies: string[] }>();
    filteredCompanies.forEach((c) => {
      c.skillsRequired.forEach((s) => {
        const existing = map.get(s) || { count: 0, companies: [] };
        existing.count++;
        existing.companies.push(c.name);
        map.set(s, existing);
      });
    });
    return map;
  }, [filteredCompanies]);

  const matchedSkills = useMemo(() => {
    const matched: string[] = [];
    const missing: string[] = [];
    requiredSkills.forEach((info, skill) => {
      if (mySkills.has(skill)) matched.push(skill);
      else missing.push(skill);
    });
    return { matched, missing };
  }, [requiredSkills, mySkills]);

  const readiness = useMemo(() => {
    if (requiredSkills.size === 0) return 0;
    return Math.round((matchedSkills.matched.length / requiredSkills.size) * 100);
  }, [requiredSkills, matchedSkills]);

  const suggestedCourses = useMemo(() => {
    const courseMap: Record<string, string> = {
      "Python": "Full-Stack Web Development with Python",
      "Java": "Enterprise Java & Spring Boot",
      "JavaScript": "Frontend Development Masterclass",
      "TypeScript": "Advanced TypeScript & React",
      "React": "React.js — Build Real Projects",
      "Node.js": "Backend APIs with Node.js & Express",
      "SQL": "Database Management & SQL",
      "AWS": "Cloud Computing with AWS",
      "Docker": "Docker & Kubernetes Fundamentals",
      "Machine Learning": "Machine Learning Foundations",
      "AutoCAD": "AutoCAD for Mechanical Engineering",
      "IoT": "Internet of Things — Hands-On",
      "Communication": "Professional Communication Skills",
    };
    return matchedSkills.missing.slice(0, 5).map((s) => ({
      skill: s,
      course: courseMap[s] || `Learn ${s} — Beginner to Advanced`,
    }));
  }, [matchedSkills]);

  const filteredSkillList = ALL_SKILLS.filter(
    (s) => s.toLowerCase().includes(skillSearch.toLowerCase()) && !mySkills.has(s)
  ).slice(0, 12);

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 uppercase tracking-widest">
          Student Dashboard
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          How Ready Are You?
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl mx-auto">
          Pick your target region, choose companies you want to join, select skills you already have — and see your real-time job readiness score.
        </p>
      </div>

      {/* Step 1: Region */}
      <section className="glass-card p-6 space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-sm font-bold text-blue-400">1</span>
          <div>
            <h2 className="text-lg font-bold text-white">Choose Your Region</h2>
            <p className="text-xs text-slate-400">Where do you want to work?</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {REGIONS.map((r) => (
            <button
              key={r.id}
              onClick={() => { setSelectedRegion(r.id); setSelectedCompanies(new Set()); }}
              className={`p-4 rounded-xl border text-center transition-all ${
                selectedRegion === r.id
                  ? "bg-blue-600/20 border-blue-500/50 shadow-lg shadow-blue-500/10"
                  : "bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50"
              }`}
            >
              <span className="text-2xl block mb-1">{r.icon}</span>
              <span className={`text-sm font-bold ${selectedRegion === r.id ? "text-blue-300" : "text-white"}`}>{r.name}</span>
              <span className="block text-[10px] text-slate-500 mt-0.5">{r.companies.length} companies</span>
            </button>
          ))}
        </div>
      </section>

      {/* Step 2: Companies */}
      {region && (
        <section className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-sm font-bold text-purple-400">2</span>
            <div>
              <h2 className="text-lg font-bold text-white">Pick Companies in {region.name}</h2>
              <p className="text-xs text-slate-400">Select the companies you&apos;re targeting (or skip to see all)</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {region.companies.map((c) => {
              const isSelected = selectedCompanies.has(c.name);
              return (
                <button
                  key={c.name}
                  onClick={() => {
                    const next = new Set(selectedCompanies);
                    if (isSelected) next.delete(c.name);
                    else next.add(c.name);
                    setSelectedCompanies(next);
                  }}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    isSelected
                      ? "bg-purple-600/15 border-purple-500/40 shadow-lg shadow-purple-500/10"
                      : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className={`text-sm font-bold ${isSelected ? "text-purple-200" : "text-white"}`}>{c.name}</h3>
                      <p className="text-[11px] text-slate-500">{c.industry}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      c.tier === "Top MNC" ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                        : c.tier === "Mid-Tier" ? "bg-blue-500/15 text-blue-300 border-blue-500/30"
                        : "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                    }`}>{c.tier}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span>{c.openings} openings</span>
                    <span>•</span>
                    <span>{c.avgSalary}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {c.skillsRequired.slice(0, 3).map((s) => (
                      <span key={s} className={`text-[10px] px-1.5 py-0.5 rounded border ${
                        mySkills.has(s)
                          ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                          : "bg-slate-800 text-slate-400 border-slate-700"
                      }`}>{s}</span>
                    ))}
                    {c.skillsRequired.length > 3 && (
                      <span className="text-[10px] text-slate-600">+{c.skillsRequired.length - 3}</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Step 3: Skills */}
      {region && (
        <section className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-sm font-bold text-emerald-400">3</span>
            <div>
              <h2 className="text-lg font-bold text-white">What Skills Do You Have?</h2>
              <p className="text-xs text-slate-400">Tap to add skills you&apos;re confident in</p>
            </div>
          </div>

          {mySkills.size > 0 && (
            <div className="flex flex-wrap gap-2 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              {Array.from(mySkills).map((s) => (
                <button
                  key={s}
                  onClick={() => { const next = new Set(mySkills); next.delete(s); setMySkills(next); }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-medium hover:bg-emerald-500/25 transition-colors"
                >
                  {s}
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              ))}
            </div>
          )}

          <div className="relative">
            <input
              type="text"
              value={skillSearch}
              onChange={(e) => setSkillSearch(e.target.value)}
              placeholder="Search skills (e.g. Python, React, AWS...)"
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {(skillSearch ? filteredSkillList : ALL_SKILLS.filter((s) => !mySkills.has(s)).slice(0, 16)).map((s) => (
              <button
                key={s}
                onClick={() => { const next = new Set(mySkills); next.add(s); setMySkills(next); setSkillSearch(""); }}
                className="px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-800 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-700 transition-all text-left"
              >
                + {s}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Results */}
      {region && filteredCompanies.length > 0 && (
        <section className="glass-card p-6 sm:p-8 space-y-6 border-blue-500/20">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-white">Your Readiness Score</h2>
            <p className="text-xs text-slate-400">
              Based on {filteredCompanies.length} target {filteredCompanies.length === 1 ? "company" : "companies"} in {region.name}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <ReadinessRing percent={readiness} />
            <div className="text-center sm:text-left space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-2xl font-black text-emerald-400">{matchedSkills.matched.length}</span>
                  <p className="text-[10px] text-slate-500 uppercase">Skills Matched</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-2xl font-black text-rose-400">{matchedSkills.missing.length}</span>
                  <p className="text-[10px] text-slate-500 uppercase">Skills Missing</p>
                </div>
              </div>
              <div className="text-center p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-lg font-black text-blue-400">{filteredCompanies.reduce((a, c) => a + c.openings, 0)}</span>
                <p className="text-[10px] text-slate-500 uppercase">Total Openings Across Targets</p>
              </div>
            </div>
          </div>

          {/* Matched Skills */}
          {matchedSkills.matched.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Skills You Have
              </h3>
              <div className="flex flex-wrap gap-2">
                {matchedSkills.matched.map((s) => (
                  <span key={s} className="px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Missing Skills */}
          {matchedSkills.missing.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                Skills to Learn
              </h3>
              <div className="flex flex-wrap gap-2">
                {matchedSkills.missing.map((s) => (
                  <span key={s} className="px-3 py-1.5 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Suggested Courses */}
          {suggestedCourses.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-blue-400 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                Recommended Courses to Close the Gap
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {suggestedCourses.map(({ skill, course }) => (
                  <div key={skill} className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-xs font-bold text-blue-400 flex-shrink-0">
                      {skill.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-white truncate">{course}</p>
                      <p className="text-[10px] text-slate-500">Covers: {skill}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-center pt-4">
            <Link href="/courses" className="btn-glow text-sm py-3 px-8">
              Browse All Courses
            </Link>
          </div>
        </section>
      )}

      {/* Empty state */}
      {!region && (
        <div className="text-center py-16 space-y-3">
          <span className="text-5xl">👆</span>
          <p className="text-sm text-slate-400">Select a region above to get started</p>
        </div>
      )}
    </main>
  );
}
