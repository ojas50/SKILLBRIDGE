"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import AuthGate from "@/components/AuthGate";
import { useAuth } from "@/lib/AuthContext";
import { COURSES_CATALOG, SKILL_INTELLIGENCE_DATA } from "@/lib/intelligenceData";
import { Target, BookOpen, Map } from "lucide-react";

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
          <h1 className="text-2xl font-black text-ink">My Dashboard</h1>
          <p className="text-sm text-ink-muted">Welcome back, {user?.name}</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-raised border border-line">
          <div className="w-7 h-7 rounded-full bg-info-tint border border-info flex items-center justify-center text-xs font-bold text-info">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <span className="text-xs text-ink-muted">{user?.email}</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="glass-card p-4">
          <span className="text-xs text-ink-faint uppercase tracking-wider">Skills Added</span>
          <p className="text-2xl font-black text-info mt-1">{skillCount}</p>
        </div>
        <div className="glass-card p-4">
          <span className="text-xs text-ink-faint uppercase tracking-wider">Readiness</span>
          <p className={`text-2xl font-black mt-1 ${lastReadiness !== null ? (lastReadiness >= 70 ? "text-positive" : lastReadiness >= 40 ? "text-warning" : "text-critical") : "text-ink-faint"}`}>
            {lastReadiness !== null ? `${lastReadiness}%` : "—"}
          </p>
        </div>
        <div className="glass-card p-4">
          <span className="text-xs text-ink-faint uppercase tracking-wider">Region</span>
          <p className="text-2xl font-black text-info mt-1 capitalize">{profile?.region || "—"}</p>
        </div>
        <div className="glass-card p-4">
          <span className="text-xs text-ink-faint uppercase tracking-wider">Target Companies</span>
          <p className="text-2xl font-black text-positive mt-1">{profile?.targetCompanies?.length || 0}</p>
        </div>
      </div>

      {/* Readiness History */}
      {profile?.readinessHistory && profile.readinessHistory.length > 0 && (
        <div className="glass-card p-5">
          <h3 className="text-sm font-bold text-ink mb-3">Readiness Over Time</h3>
          <div className="flex items-end gap-2 h-24">
            {profile.readinessHistory.slice(-8).map((entry, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-mono text-ink-muted">{entry.percent}%</span>
                <div
                  className="w-full rounded-t-md transition-all"
                  style={{
                    height: `${entry.percent}%`,
                    backgroundColor:
                      entry.percent >= 70
                        ? "var(--sb-positive)"
                        : entry.percent >= 40
                          ? "var(--sb-warning)"
                          : "var(--sb-critical)",
                  }}
                />
                <span className="text-[9px] text-ink-faint">{entry.date.split(" ")[0]}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Skills to Learn */}
        <div className="glass-card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-ink">Top Skills to Learn</h3>
            <Link href="/skill-matrix" className="text-[11px] text-info hover:opacity-70">View all</Link>
          </div>
          {missingSkills.length > 0 ? (
            <div className="space-y-2">
              {missingSkills.map((s) => (
                <div key={s.skill} className="flex items-center justify-between p-2.5 rounded-lg bg-canvas border border-line">
                  <div>
                    <span className="text-xs font-semibold text-ink">{s.skill}</span>
                    <span className="text-[10px] text-ink-faint block">{s.sector}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    s.gap >= 30 ? "bg-critical-tint text-critical border-critical"
                      : s.gap >= 15 ? "bg-warning-tint text-warning border-warning"
                      : "bg-info-tint text-info border-info"
                  }`}>Gap +{s.gap}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-ink-faint py-4 text-center">Add skills on the My Readiness page to see recommendations</p>
          )}
        </div>

        {/* Recommended Courses */}
        <div className="glass-card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-ink">Recommended Courses</h3>
            <Link href="/courses" className="text-[11px] text-info hover:opacity-70">View all</Link>
          </div>
          <div className="space-y-2">
            {recommendedCourses.map((c) => (
              <div key={c.code} className="flex items-center justify-between p-2.5 rounded-lg bg-canvas border border-line">
                <div className="min-w-0">
                  <span className="text-xs font-semibold text-ink block truncate">{c.name}</span>
                  <span className="text-[10px] text-ink-faint">{c.code} · {c.duration}</span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs font-bold text-positive">{c.alignmentScore}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Link href="/career-readiness" className="glass-card glass-card-interactive p-4 text-center group">
          <Target className="w-5 h-5 block mx-auto mb-1" />
          <span className="text-sm font-bold text-ink group-hover:text-info transition-colors">Check Readiness</span>
          <p className="text-[11px] text-ink-faint mt-0.5">See how ready you are</p>
        </Link>
        <Link href="/wishlist" className="glass-card glass-card-interactive p-4 text-center group">
          <BookOpen className="w-5 h-5 block mx-auto mb-1" />
          <span className="text-sm font-bold text-ink group-hover:text-info transition-colors">My Wishlist</span>
          <p className="text-[11px] text-ink-faint mt-0.5">{profile?.targetCompanies?.length || 0} saved</p>
        </Link>
        <Link href="/career-pathways" className="glass-card glass-card-interactive p-4 text-center group">
          <Map className="w-5 h-5 block mx-auto mb-1" />
          <span className="text-sm font-bold text-ink group-hover:text-info transition-colors">Career Paths</span>
          <p className="text-[11px] text-ink-faint mt-0.5">Explore learning roadmaps</p>
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
