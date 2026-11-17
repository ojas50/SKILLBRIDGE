"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { COURSES_CATALOG, CourseData } from "@/lib/intelligenceData";
import ScoreExplainerModal from "@/components/ScoreExplainerModal";
import CourseModal from "@/components/CourseModal";
import { Button } from "@/components/ui";
import { Search, AlertTriangle, Info, ArrowRight } from "lucide-react";

type Lens = "student" | "admin";

export default function CoursesPage() {
  const [courses, setCourses] = useState<CourseData[]>(COURSES_CATALOG);
  const [lens, setLens] = useState<Lens>("student");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [explainingCourse, setExplainingCourse] = useState<CourseData | null>(null);
  const [inspectingCourse, setInspectingCourse] = useState<CourseData | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/courses")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((json) => {
        if (!cancelled && Array.isArray(json?.courses)) setCourses(json.courses);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.activeSkills ?? []).some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (c.missingSkills ?? []).some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      selectedStatus === "All" ||
      (selectedStatus === "Aligned" && c.decisionStatus === "ALIGNED") ||
      (selectedStatus === "Update Needed" && c.decisionStatus === "UPDATE REQUIRED") ||
      (selectedStatus === "Oversupplied" && c.decisionStatus === "OBSOLETE / OVERSUPPLIED") ||
      (selectedStatus === "Emerging" && c.decisionStatus === "EMERGING / HIGH PRIORITY");

    return matchesSearch && matchesStatus;
  });

  const alignedCount = courses.filter((c) => c.decisionStatus === "ALIGNED").length;
  const updateCount = courses.filter((c) => c.decisionStatus === "UPDATE REQUIRED").length;
  const oversuppliedCount = courses.filter((c) => c.decisionStatus === "OBSOLETE / OVERSUPPLIED").length;
  const emergingCount = courses.filter((c) => c.decisionStatus === "EMERGING / HIGH PRIORITY").length;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-info-tint text-info border border-info">
              STATE VOCATIONAL CATALOG
            </span>
            <span className="text-xs text-ink-faint">•</span>
            <span className="text-xs text-ink-muted">{courses.length} Accredited Programs</span>
          </div>
          <h1 className="text-3xl font-black text-ink mt-1">
            {lens === "student" ? "Explore Courses" : "Course Modernization & Alignment Tracker"}
          </h1>
          <p className="text-xs sm:text-sm text-ink-muted mt-0.5">
            {lens === "student"
              ? "See what each course teaches, how long it runs, and how well its graduates get placed."
              : "Audit 6-factor Course Modernization Scores (0–100), inspect missing industry modules, and execute policy decisions."}
          </p>
        </div>

        <div className="flex flex-col items-start sm:items-end gap-2">
          {/* Lens Toggle: student vs admin view of the same catalog */}
          <div
            className="inline-flex p-1 rounded-xl bg-raised border border-line"
            role="tablist"
            aria-label="Catalog view"
          >
            {([
              { key: "student", label: "Student" },
              { key: "admin", label: "Administrator" },
            ] as const).map((opt) => (
              <button
                key={opt.key}
                role="tab"
                aria-selected={lens === opt.key}
                onClick={() => setLens(opt.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  lens === opt.key
                    ? "bg-cta text-charcoal shadow-sm"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Status Counters — admin lens only (policy vocabulary) */}
          {lens === "admin" && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="badge-aligned px-3 py-1 rounded-full text-xs font-bold">
                {alignedCount} Aligned
              </span>
              <span className="badge-update px-3 py-1 rounded-full text-xs font-bold">
                {updateCount} Update Needed
              </span>
              <span className="badge-critical px-3 py-1 rounded-full text-xs font-bold">
                {oversuppliedCount} Oversupplied
              </span>
              <span className="bg-info-tint text-info border border-info px-3 py-1 rounded-full text-xs font-bold">
                {emergingCount} Emerging
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="glass-card p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="w-full md:w-96">
          <label htmlFor="course-search" className="block text-[11px] font-semibold text-ink-muted uppercase tracking-wider mb-1.5">
            Search Courses
          </label>
          <div className="relative">
            <input
              id="course-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-canvas border border-line rounded-xl pl-9 pr-4 py-2.5 text-xs text-ink placeholder:text-ink-faint focus:outline-none focus:border-info"
            />
            <span className="absolute left-3 top-2.5 text-ink-faint"><Search className="w-3.5 h-3.5" /></span>
          </div>
        </div>

        {/* Status Filter Tabs — admin lens only (decision-status vocabulary) */}
        {lens === "admin" && (
          <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {["All", "Aligned", "Update Needed", "Oversupplied", "Emerging"].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedStatus === st
                    ? "bg-brand-500 text-brand-50 shadow-sm"
                    : "bg-canvas text-ink-muted border border-line hover:text-ink"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Courses List */}
      <div className="space-y-4">
        {filteredCourses.length === 0 ? (
          <div className="glass-card p-12 text-center text-ink-muted">
            <p className="text-lg font-bold text-ink mb-1">No matching courses found</p>
            <p className="text-xs">
              {lens === "student"
                ? "Try adjusting your search terms."
                : "Try adjusting your search terms or filter selection."}
            </p>
          </div>
        ) : (
          filteredCourses.map((c) => {
            const isAligned = c.decisionStatus === "ALIGNED";
            const isUpdateNeeded = c.decisionStatus === "UPDATE REQUIRED";
            const isOversupplied = c.decisionStatus === "OBSOLETE / OVERSUPPLIED";
            const isEmerging = c.decisionStatus === "EMERGING / HIGH PRIORITY";

            /* Student lens: Duration / Placement / Skills You'll Learn / readiness CTA.
               No alignment scores, missing-modules flags, or policy directives — those
               are administrator vocabulary (C3 lens split). */
            if (lens === "student") {
              return (
                <div key={c.id} className="glass-card p-5 space-y-4 transition-all hover:border-line">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2.5 flex-wrap mb-1.5">
                        <h3 className="text-base font-bold text-ink tracking-tight">{c.name}</h3>
                        <span className="text-[10px] text-ink-faint font-mono">
                          {c.code} • {c.duration}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-ink-muted">
                        <span>
                          Graduates placed:{" "}
                          <strong className="text-ink font-mono">
                            {c.placed}/{c.enrolled}
                          </strong>{" "}
                          <span className="text-ink-faint">({c.placementRate}%)</span>
                        </span>
                        <span>
                          Annual intake:{" "}
                          <strong className="text-ink font-mono">{c.annualIntake}</strong>{" "}
                          <span className="text-ink-faint">seats</span>
                        </span>
                      </div>

                      <div className="mt-3">
                        <span className="text-[10px] font-bold text-ink-faint uppercase tracking-wider">
                          Skills you&apos;ll learn
                        </span>
                        <div className="flex gap-1.5 flex-wrap items-center mt-1.5">
                          {c.activeSkills.map((skill) => (
                            <span
                              key={skill}
                              className="bg-raised text-ink-muted border border-line px-2 py-0.5 rounded text-[11px] font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-stretch gap-2 flex-shrink-0">
                      <div className="text-center sm:text-right">
                        <span className="text-2xl font-black text-cta block leading-none">
                          {c.placementRate}%
                        </span>
                        <span className="text-[10px] text-ink-faint">placement rate</span>
                      </div>
                      <Button variant="primary" size="sm" href="/career-readiness">
                        See if I&apos;m Ready
                      </Button>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={c.id}
                className={`glass-card p-5 transition-all border space-y-4 ${
                  isAligned
                    ? "hover:border-positive"
                    : isUpdateNeeded
                    ? "hover:border-warning"
                    : isOversupplied
                    ? "hover:border-critical"
                    : "hover:border-info"
                }`}
              >
                {/* Top Row: Details & Score */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left Column: Course Name & Metadata */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2.5 flex-wrap mb-1.5">
                      <h3 className="text-base font-bold text-ink tracking-tight">
                        {c.name}
                      </h3>

                      {/* Decision Status Badge */}
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                          isAligned
                            ? "badge-aligned"
                            : isUpdateNeeded
                            ? "badge-update"
                            : isEmerging
                            ? "bg-info-tint text-info border-info"
                            : "badge-critical"
                        }`}
                      >
                        {c.decisionStatus}
                      </span>

                      <span className="text-[10px] text-ink-faint font-mono">
                        {c.code} • {c.duration}
                      </span>
                    </div>

                    <p className="text-xs text-ink-muted mb-3">
                      Enrolled: <strong className="text-info font-mono">{c.enrolled}</strong> • Placed:{" "}
                      <strong className="text-positive font-mono">{c.placed}</strong> ({c.placementRate}% placement rate) • Annual Intake:{" "}
                      <span className="font-mono text-ink-muted">{c.annualIntake} seats</span>
                    </p>

                    {/* Active and Missing Skills */}
                    <div className="flex gap-1.5 flex-wrap items-center">
                      <span className="text-[10px] font-bold text-ink-faint uppercase">Syllabus:</span>
                      {c.activeSkills.slice(0, 5).map((skill) => (
                        <span
                          key={skill}
                          className="bg-canvas text-ink-muted border border-line px-2 py-0.5 rounded text-[11px] font-medium"
                        >
                          {skill}
                        </span>
                      ))}

                      {c.missingSkills && c.missingSkills.length > 0 && (
                        <span className="bg-critical-tint text-critical border border-critical px-2 py-0.5 rounded text-[11px] font-semibold">
                          <AlertTriangle className="w-3 h-3 inline-block mr-1 -mt-0.5" />Missing: {c.missingSkills.join(", ")}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Score & Action Controls */}
                  <div className="flex items-center justify-between md:justify-end gap-5 border-t md:border-t-0 border-line pt-3 md:pt-0 flex-shrink-0">
                    {/* Modernization Score Radial */}
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-1.5 text-xs text-ink-muted">
                        <span>Alignment Score:</span>
                        <strong
                          className={`font-mono font-black text-sm ${
                            c.alignmentScore >= 85
                              ? "text-positive"
                              : c.alignmentScore >= 60
                              ? "text-warning"
                              : "text-critical"
                          }`}
                        >
                          {c.alignmentScore} / 100
                        </strong>
                      </div>

                      <div className="w-32 bg-canvas rounded-full h-2 mt-1.5 p-[1px] border border-line">
                        <div
                          className={`h-full rounded-full ${
                            c.alignmentScore >= 85
                              ? "bg-positive"
                              : c.alignmentScore >= 60
                              ? "bg-warning"
                              : "bg-critical"
                          }`}
                          style={{ width: `${c.alignmentScore}%` }}
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => setExplainingCourse(c)}
                        className="text-[11px] text-info hover:text-ink font-semibold mt-1 inline-flex items-center gap-1"
                      >
                        <span>Explain Score</span>
                        <Info className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setInspectingCourse(c)}
                        className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-canvas hover:bg-raised text-ink border border-line transition-all"
                      >
                        Inspect
                      </button>

                      <Link
                        href="/curriculum-advisor"
                        className="px-3.5 py-2 text-xs font-bold rounded-xl bg-info-tint text-info hover:bg-brand-500 hover:text-brand-50 border border-info transition-all flex items-center gap-1"
                      >
                        <span>AI Upgrade</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Policy Decision Engine Bar */}
                <div className="p-3 rounded-xl bg-canvas border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold font-mono text-[11px] bg-raised px-2 py-0.5 rounded text-ink-muted border border-line">
                      ACTION: {c.recommendedAction}
                    </span>
                    <span className="text-ink-muted">{c.policyActionDetails}</span>
                  </div>
                  <span className="text-[10px] font-mono text-ink-faint whitespace-nowrap">
                    Last Reviewed: {c.lastReviewed}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Score Explainer Modal */}
      <ScoreExplainerModal
        course={explainingCourse}
        onClose={() => setExplainingCourse(null)}
      />

      {/* Course Detail Modal */}
      {inspectingCourse && (
        <CourseModal
          course={{
            id: inspectingCourse.id,
            name: inspectingCourse.name,
            provider: inspectingCourse.provider,
            duration: inspectingCourse.duration,
            enrolled: inspectingCourse.enrolled,
            placement: inspectingCourse.placementRate,
            alignment: inspectingCourse.alignmentScore,
            status: inspectingCourse.decisionStatus === "ALIGNED" ? "Aligned" : inspectingCourse.decisionStatus === "UPDATE REQUIRED" ? "Update Needed" : inspectingCourse.decisionStatus === "EMERGING / HIGH PRIORITY" ? "Emerging" : "Oversupplied",
            skills: inspectingCourse.activeSkills,
            curriculum_summary: inspectingCourse.curriculumSummary,
            missing_skills: inspectingCourse.missingSkills,
            last_reviewed: inspectingCourse.lastReviewed
          }}
          onClose={() => setInspectingCourse(null)}
          onCourseUpdated={(updated) => {
            setCourses((prev) =>
              prev.map((c) =>
                c.id === updated.id
                  ? {
                      ...c,
                      alignmentScore: updated.alignment,
                      placementRate: updated.placement,
                      activeSkills: updated.skills,
                      missingSkills: updated.missing_skills || [],
                      decisionStatus: "ALIGNED",
                      recommendedAction: "KEEP"
                    }
                  : c
              )
            );
          }}
        />
      )}
    </main>
  );
}
