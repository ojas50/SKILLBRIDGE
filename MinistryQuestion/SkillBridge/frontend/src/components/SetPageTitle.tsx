"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const PAGE_META: Record<string, { title: string; description: string }> = {
  "/": {
    title: "SkillBridge — Know Your Career Readiness",
    description:
      "See how your skills match real employer demand, and exactly what to learn next.",
  },
  "/dashboard": {
    title: "Cockpit — SkillBridge",
    description:
      "Executive labour-market dashboard with live demand, supply, and placement intelligence.",
  },
  "/my-dashboard": {
    title: "My Dashboard — SkillBridge",
    description:
      "Track your readiness, saved skills, and learning progress in one place.",
  },
  "/career-readiness": {
    title: "My Readiness — SkillBridge",
    description:
      "Check your readiness for your dream job against real employer demand.",
  },
  "/courses": {
    title: "Courses — SkillBridge",
    description:
      "Browse course modernization scores and find aligned, oversupplied, and emerging courses.",
  },
  "/skill-matrix": {
    title: "Skill Intelligence Matrix — SkillBridge",
    description:
      "Explore the skill intelligence matrix across districts, sectors, and time periods.",
  },
  "/skill-gaps": {
    title: "What-If Policy Simulator — SkillBridge",
    description:
      "Simulate policy levers and see before-and-after impact on skill gaps.",
  },
  "/career-pathways": {
    title: "Career Pathways — SkillBridge",
    description:
      "Structured learning paths mapping job roles to skills and courses.",
  },
  "/curriculum-advisor": {
    title: "AI Curriculum Advisor — SkillBridge",
    description:
      "Four-stage audit of your curriculum against real industry requirements.",
  },
  "/district-plans": {
    title: "District Training Plans — SkillBridge",
    description:
      "Capacity and training plans across all districts, aligned to demand.",
  },
  "/employers": {
    title: "Employer Intelligence — SkillBridge",
    description:
      "Employer validation network and competency request workflow.",
  },
  "/capacity-planner": {
    title: "Capacity Planner — SkillBridge",
    description:
      "Plan instructors, lab sandboxes, and capex for training capacity.",
  },
  "/placement-analytics": {
    title: "Placement Analytics — SkillBridge",
    description:
      "Hiring conversion and wage premium insights that close the feedback loop.",
  },
  "/policy-decisions": {
    title: "Policy Decision Center — SkillBridge",
    description:
      "One-click ministerial action authorizations with an evidence chain.",
  },
  "/wishlist": {
    title: "My Wishlist — SkillBridge",
    description: "Your saved courses, ready to pick up where you left off.",
  },
  "/login": {
    title: "Sign In — SkillBridge",
    description: "Sign in to your SkillBridge account.",
  },
  "/register": {
    title: "Create Account — SkillBridge",
    description: "Create a free SkillBridge account to track your readiness.",
  },
  "/forgot-password": {
    title: "Reset Password — SkillBridge",
    description: "Reset your SkillBridge account password.",
  },
};

const FALLBACK_DESCRIPTION =
  "SkillBridge — labour-market intelligence and curriculum alignment.";

export function SetPageTitle() {
  const pathname = usePathname();

  useEffect(() => {
    const meta = PAGE_META[pathname];
    if (!meta) return;

    document.title = meta.title;

    let tag = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", "description");
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", meta.description || FALLBACK_DESCRIPTION);
  }, [pathname]);

  return null;
}