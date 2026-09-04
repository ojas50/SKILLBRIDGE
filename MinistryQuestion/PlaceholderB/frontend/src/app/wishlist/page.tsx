"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import AuthGate from "@/components/AuthGate";
import { useAuth } from "@/lib/AuthContext";
import { COURSES_CATALOG } from "@/lib/intelligenceData";

function WishlistContent() {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (!user) return;
    try {
      const raw = localStorage.getItem(`skillbridge_wishlist_${user.email}`);
      if (raw) setWishlist(new Set(JSON.parse(raw)));
    } catch { /* ignore */ }
  }, [user]);

  const toggleWishlist = (code: string) => {
    const next = new Set(wishlist);
    if (next.has(code)) next.delete(code);
    else next.add(code);
    setWishlist(next);
    if (user) localStorage.setItem(`skillbridge_wishlist_${user.email}`, JSON.stringify(Array.from(next)));
  };

  const courses = COURSES_CATALOG.filter((c) => {
    if (filter === "saved") return wishlist.has(c.code);
    if (filter === "high") return c.alignmentScore >= 80;
    return true;
  });

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">My Wishlist</h1>
        <p className="text-sm text-slate-400">Courses you&apos;re interested in — {wishlist.size} saved</p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        {[
          { id: "all", label: "All Courses" },
          { id: "saved", label: `Saved (${wishlist.size})` },
          { id: "high", label: "High Alignment" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filter === f.id
                ? "bg-blue-600/25 text-blue-400 border border-blue-500/30"
                : "text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Course List */}
      <div className="space-y-2">
        {courses.map((c) => {
          const saved = wishlist.has(c.code);
          const score = c.alignmentScore;
          return (
            <div key={c.code} className="glass-card p-4 flex items-center gap-4">
              <button
                onClick={() => toggleWishlist(c.code)}
                className={`w-9 h-9 rounded-lg border flex items-center justify-center flex-shrink-0 transition-all ${
                  saved
                    ? "bg-blue-600/20 border-blue-500/40 text-blue-400"
                    : "bg-slate-900 border-slate-800 text-slate-600 hover:text-slate-400"
                }`}
              >
                {saved ? "★" : "☆"}
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white truncate">{c.name}</h3>
                  <span className="text-[10px] font-mono text-slate-500">{c.code}</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-0.5">
                  <span>{c.provider}</span>
                  <span>·</span>
                  <span>{c.duration}</span>
                  <span>·</span>
                  <span>{c.annualIntake} intake</span>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="text-right">
                  <span className={`text-lg font-black ${score >= 80 ? "text-emerald-400" : score >= 60 ? "text-amber-400" : "text-rose-400"}`}>
                    {score}
                  </span>
                  <p className="text-[9px] text-slate-500 uppercase">Alignment</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  c.recommendedAction === "MODERNIZE" ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                    : c.recommendedAction === "KEEP" ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                    : "bg-slate-500/15 text-slate-300 border-slate-500/30"
                }`}>{c.recommendedAction}</span>
              </div>
            </div>
          );
        })}
        {courses.length === 0 && (
          <div className="text-center py-12 space-y-2">
            <span className="text-3xl">📚</span>
            <p className="text-sm text-slate-400">
              {filter === "saved" ? "No courses saved yet. Browse and star courses to add them here." : "No courses match this filter."}
            </p>
            {filter === "saved" && (
              <Link href="/courses" className="text-xs text-blue-400 hover:text-blue-300">Browse all courses</Link>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default function WishlistPage() {
  return (
    <AuthGate>
      <WishlistContent />
    </AuthGate>
  );
}
