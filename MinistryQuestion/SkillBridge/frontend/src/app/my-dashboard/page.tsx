"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import AuthGate from "@/components/AuthGate";
import { useAuth } from "@/lib/AuthContext";
import { COURSES_CATALOG, SKILL_INTELLIGENCE_DATA } from "@/lib/intelligenceData";

interface SavedProfile {
  skills: string[];
  region: string | null;
  targetCompanies: string[];
  readinessHistory: { date: string; percent: number }[];
}

function DashboardContent() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<SavedProfile | null>(null);

  useEffect(() => {
    if (!user) return;
    try {
      const raw = localStorage.getItem(`skillbridge_profile_${user.email}`);
      if (raw) setProfile(JSON.parse(raw));
    } catch { /* ignore */ }
  }, [user]);

  const skillCount = profile?.skills?.length || 0;
  const lastReadiness = profile?.readinessHistory?.length
    ? profile.readinessHistory[profile.readinessHistory.length - 1].percent
    : null;

  const missingSkills = SKILL_INTELLIGENCE_DATA
    .filter((s) => !profile?.skills?.includes(s.skill))
    .slice(0, 5);

  const recommendedCourses = COURSES_CATALOG
    .filter((c) => c.alignmentScore >= 75)
    .sort((a, b) => b.alignmentScore - a.alignmentScore)
    .slice(0, 4);

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">My Dashboard</h1>
          <p className="text-sm text-slate-400">Welcome back, {user?.name}</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
          <div className="w-7 h-7 rounded-full bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-xs font-bold text-blue-300">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <span className="text-xs text-slate-400">{user?.email}</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="glass-card p-4">
          <span className="text-xs text-slate-500 uppercase tracking-wider">Skills Added</span>
          <p className="text-2xl font-black text-blue-400 mt-1">{skillCount}</p>
        </div>
        <div className="glass-card p-4">
          <span className="text-xs text-slate-500 uppercase tracking-wider">Readiness</span>
          <p className={`text-2xl font-black mt-1 ${lastReadiness !== null ? (lastReadiness >= 70 ? "text-emerald-400" : lastReadiness >= 40 ? "text-amber-400" : "text-rose-400") : "text-slate-500"}`}>
            {lastReadiness !== null ? `${lastReadiness}%` : "—"}
          </p>
        </div>
        <div className="glass-card p-4">
          <span className="text-xs text-slate-500 uppercase tracking-wider">Region</span>
          <p className="text-2xl font-black text-purple-400 mt-1 capitalize">{profile?.region || "—"}</p>
        </div>
        <div className="glass-card p-4">
          <span className="text-xs text-slate-500 uppercase tracking-wider">Target Companies</span>
          <p className="text-2xl font-black text-emerald-400 mt-1">{profile?.targetCompanies?.length || 0}</p>
        </div>
      </div>

      {/* Readiness History */}
      {profile?.readinessHistory && profile.readinessHistory.length > 0 && (
        <div className="glass-card p-5">
          <h3 className="text-sm font-bold text-white mb-3">Readiness Over Time</h3>
          <div className="flex items-end gap-2 h-24">
            {profile.readinessHistory.slice(-8).map((entry, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-mono text-slate-400">{entry.percent}%</span>
                <div
                  className="w-full rounded-t-md transition-all"
                  style={{
                    height: `${entry.percent}%`,
                    backgroundColor: entry.percent >= 70 ? "#10b981" : entry.percent >= 40 ? "#f59e0b" : "#f43f5e",
                  }}
                />
                <span className="text-[9px] text-slate-600">{entry.date.split(" ")[0]}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Skills to Learn */}
        <div className="glass-card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Top Skills to Learn</h3>
            <Link href="/skill-matrix" className="text-[11px] text-blue-400 hover:text-blue-300">View all</Link>
          </div>
          {missingSkills.length > 0 ? (
            <div className="space-y-2">
              {missingSkills.map((s) => (
                <div key={s.skill} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/50 border border-slate-800">
                  <div>
                    <span className="text-xs font-semibold text-white">{s.skill}</span>
                    <span className="text-[10px] text-slate-500 block">{s.sector}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    s.gap >= 30 ? "bg-rose-500/15 text-rose-300 border-rose-500/30"
                      : s.gap >= 15 ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                      : "bg-blue-500/15 text-blue-300 border-blue-500/30"
                  }`}>Gap +{s.gap}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 py-4 text-center">Add skills on the My Readiness page to see recommendations</p>
          )}
        </div>

        {/* Recommended Courses */}
        <div className="glass-card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Recommended Courses</h3>
            <Link href="/courses" className="text-[11px] text-blue-400 hover:text-blue-300">View all</Link>
          </div>
          <div className="space-y-2">
            {recommendedCourses.map((c) => (
              <div key={c.code} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/50 border border-slate-800">
                <div className="min-w-0">
                  <span className="text-xs font-semibold text-white block truncate">{c.name}</span>
                  <span className="text-[10px] text-slate-500">{c.code} · {c.duration}</span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-xs font-bold text-emerald-400`}>{c.alignmentScore}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Link href="/career-readiness" className="glass-card glass-card-interactive p-4 text-center group">
          <span className="text-xl block mb-1">🎯</span>
          <span className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">Check Readiness</span>
          <p className="text-[11px] text-slate-500 mt-0.5">See how ready you are</p>
        </Link>
        <Link href="/wishlist" className="glass-card glass-card-interactive p-4 text-center group">
          <span className="text-xl block mb-1">📚</span>
          <span className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">My Wishlist</span>
          <p className="text-[11px] text-slate-500 mt-0.5">{profile?.targetCompanies?.length || 0} saved</p>
        </Link>
        <Link href="/career-pathways" className="glass-card glass-card-interactive p-4 text-center group">
          <span className="text-xl block mb-1">🗺️</span>
          <span className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">Career Paths</span>
          <p className="text-[11px] text-slate-500 mt-0.5">Explore learning roadmaps</p>
        </Link>
      </div>
    </main>
  );
}

export default function MyDashboardPage() {
  return (
    <AuthGate>
      <DashboardContent />
    </AuthGate>
  );
}
