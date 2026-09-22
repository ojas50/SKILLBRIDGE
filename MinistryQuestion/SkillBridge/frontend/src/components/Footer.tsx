"use client";

import React, { useState } from "react";
import Link from "next/link";
import DataSourcesModal from "@/components/DataSourcesModal";
import { PROTOTYPE_DISCLAIMER_TEXT } from "@/lib/intelligenceData";

export default function Footer() {
  const [isSourcesModalOpen, setIsSourcesModalOpen] = useState(false);

  return (
    <>
      <footer className="bg-canvas border-t border-line text-ink-muted text-xs mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Main 4-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Col 1: Brand & Status */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-sun to-neon flex items-center justify-center text-charcoal font-bold text-xs">
                  SB
                </div>
                <span className="text-sm font-bold text-ink tracking-wide">
                  SkillBridge AI Suite
                </span>
              </div>
              <p className="text-ink-muted text-xs leading-relaxed">
                Automated labour-market intelligence, real-time curriculum alignment, and district capacity planning platform for SIH.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-ink-faint font-mono">
                <span>Status: Prototype Intelligence Engine Active</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-accent"></span>
              </div>
              <div className="pt-1 space-y-1.5 text-[11px]">
                <a
                  href="tel:+918530951108"
                  className="block font-mono text-ink-muted hover:text-neon transition-colors"
                >
                  +91 85309 51108
                </a>
                <a
                  href="mailto:ojaskhodaskar2026@gmail.com"
                  className="block font-mono text-ink-muted hover:text-neon transition-colors break-all"
                >
                  ojaskhodaskar2026@gmail.com
                </a>
              </div>
            </div>

            {/* Col 2: Intelligence & Gaps */}
            <div>
              <h4 className="text-ink font-semibold mb-3 text-xs tracking-wider uppercase">
                Intelligence Modules
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/dashboard" className="hover:text-neon transition-colors">
                    Executive Labour Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/skill-matrix" className="hover:text-neon transition-colors">
                    Skill Intelligence Matrix
                  </Link>
                </li>
                <li>
                  <Link href="/courses" className="hover:text-neon transition-colors">
                    Course Modernization Scores
                  </Link>
                </li>
                <li>
                  <Link href="/curriculum-advisor" className="hover:text-neon transition-colors">
                    AI Curriculum Advisor
                  </Link>
                </li>
                <li>
                  <Link href="/skill-gaps" className="hover:text-neon transition-colors">
                    What-If Policy Simulator
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Planning & Outcomes */}
            <div>
              <h4 className="text-ink font-semibold mb-3 text-xs tracking-wider uppercase">
                Planning & Outcomes
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/policy-decisions" className="hover:text-neon transition-colors">
                    Policy Decision Center
                  </Link>
                </li>
                <li>
                  <Link href="/employers" className="hover:text-neon transition-colors">
                    Employer Validation Network
                  </Link>
                </li>
                <li>
                  <Link href="/career-pathways" className="hover:text-neon transition-colors">
                    Career Pathways & Learning Paths
                  </Link>
                </li>
                <li>
                  <Link href="/district-plans" className="hover:text-neon transition-colors">
                    District Training Plans
                  </Link>
                </li>
                <li>
                  <Link href="/capacity-planner" className="hover:text-neon transition-colors">
                    Trainer & Equipment Planner
                  </Link>
                </li>
                <li>
                  <Link href="/placement-analytics" className="hover:text-neon transition-colors">
                    Placement Outcome Analytics
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Authority & Methodology */}
            <div>
              <h4 className="text-ink font-semibold mb-3 text-xs tracking-wider uppercase">
                Transparency & Governance
              </h4>
              <div className="bg-raised border border-line rounded-xl p-3.5 space-y-2">
                <p className="text-ink font-semibold text-xs">SkillBridge Decision Support Cell</p>
                <p className="text-[11px] text-neon font-mono">SIH 2026 Prototype Engine</p>
                <button
                  type="button"
                  onClick={() => setIsSourcesModalOpen(true)}
                  className="w-full text-left text-[11px] text-ink-muted hover:text-ink bg-line px-2.5 py-1.5 rounded-lg border border-line flex items-center justify-between transition-colors"
                >
                  <span>Data Sources & Methodology</span>
                  <span>➔</span>
                </button>
              </div>
            </div>
          </div>

          {/* Mandatory SIH Prototype Disclaimer */}
          <div className="p-4 rounded-2xl border border-line text-center text-xs text-ink-muted leading-relaxed mb-6">
            <p className="italic">
              "{PROTOTYPE_DISCLAIMER_TEXT}"
            </p>
          </div>

          {/* Copyright Row */}
          <div className="border-t border-line pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-ink-faint">
            <p>© {new Date().getFullYear()} SkillBridge AI • Smart India Hackathon Prototype • Originally an SIH 2026 submission</p>
            <div className="flex items-center gap-4">
              <span>Security Compliant Architecture</span>
              <span>•</span>
              <button
                onClick={() => setIsSourcesModalOpen(true)}
                className="hover:text-ink underline"
              >
                Methodology Telemetry
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Data Sources Modal */}
      <DataSourcesModal
        isOpen={isSourcesModalOpen}
        onClose={() => setIsSourcesModalOpen(false)}
      />
    </>
  );
}