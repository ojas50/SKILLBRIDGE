# SKILL BRIDGE
<div align="center">

# ⚡ SkillBridge AI

### Labour-Market Intelligence & Continuous Curriculum-Alignment Platform

**Smart India Hackathon 2026 — Final Round Prototype**

[![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-000?logo=vercel&logoColor=white)](https://skillbridge-navy-five.vercel.app)
[![Built with Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178c6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06b6d4?logo=tailwindcss)](https://tailwindcss.com)

[Live Demo](https://skillbridge-navy-five.vercel.app) · [SIH Presentation](https://docs.google.com/presentation/d/1u3WVe8R6FG2uT6ujol8MPf-qo5jN4YU5UMiEbkskSgI/edit?usp=sharing)

</div>

---

## What Is SkillBridge?

SkillBridge is an AI-powered decision-support suite built for **state vocational training directors** to close the gap between what industry demands and what polytechnic curricula teach — in near real-time.

Traditional syllabus revision cycles take **3–5 years**. By the time updates ship, the market has moved on. SkillBridge replaces that lag with a **continuous 12-stage intelligence loop** that ingests live employer signals, detects skill deficits, generates course modernization plans, allocates district training quotas, and verifies graduate placement outcomes — all within a single dashboard.

---

## Key Features

| Module | What It Does |
|---|---|
| **Executive Labour Cockpit** | Bird's-eye state skill health with live alerts, regional placement radar, and key deficit KPIs |
| **Skill Intelligence Matrix** | Demand vs supply differential heatmap across 320+ competencies with severity bands |
| **AI Curriculum Advisor** | Upload any course syllabus → instant 4-stage module upgrade plan (Keep / Modify / Remove / Add) with lab hour estimates |
| **Course Modernization Tracker** | Alignment scores (0–100) for every active course with automated decision triggers |
| **What-If Policy Simulator** | Model outcomes of seat adjustments, trainer hiring, and capex investments mathematically |
| **Policy Decision Center** | Government cockpit to authorize syllabus updates, seat changes, and lab grants |
| **Employer Validation Network** | 48-partner recruiter survey consensus on graduate readiness and hiring pipelines |
| **Career Pathways & Roadmaps** | Job Role → Skill → Course mapping with 8-stage structured learning paths |
| **District Training Plans** | Decentralized seat allocations calibrated to local industrial corridors (8 clusters) |
| **Trainer & Equipment Planner** | Instructor deficit calculation, virtual lab sandbox specs, and Capex budgets |
| **Placement Outcome Analytics** | Feedback loop tracking employment conversion, starting salaries, and time-to-hire |
| **SIH Demo Mode** | Guided 10-step walkthrough of the full pipeline for live evaluation (2–3 min) |

---

## The 12-Stage Intelligence Loop

SkillBridge operates as a closed-loop system:

1. **Industry Demand** — Aggregates macro hiring growth & sector investment signals
2. **Job & Employer Signals** — Scrapes 14,800+ live recruiter postings, surveys 48+ partners
3. **Skill Extraction** — NLP extracts 320+ competencies from unstructured job descriptions
4. **Demand-Supply Analysis** — Cross-references demand against 12,400 enrolled trainees
5. **Skill Gap Detection** — Classifies deficits into Critical / High / Moderate / Oversupplied
6. **Course Mapping** — Links every deficit to active courses, computes alignment scores
7. **AI Curriculum Recommendation** — Generates module-by-module upgrade plans
8. **Capacity & Trainer Planning** — Calculates instructor shortages & lab Capex
9. **District Training Plan** — Decentralizes seat allocations to 8 industrial clusters
10. **Placement Tracking** — Verifies graduate employment & salary outcomes
11. **Employer Feedback** — Surveys hiring managers on readiness & missing skills
12. **Continuous Update** — Feeds results back to Stage 01 (quarterly cycle)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5.4 |
| Styling | Tailwind CSS 3.4 + custom CSS variables |
| Deployment | Vercel (ISR, 7-day revalidation) |
| Data Source | Remotive API + curated static intelligence catalog |
| UI | Glassmorphism dark theme, fully responsive |

---

## Getting Started

```bash
git clone https://github.com/ojas50/SKILLBRIDGE.git
cd "Skill Bridge/MinistryQuestion/SkillBridge/frontend"
npm install
npm run dev
frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Landing page
│   │   ├── dashboard/          # Executive Labour Cockpit
│   │   ├── skill-matrix/       # Demand vs Supply heatmap
│   │   ├── courses/            # Course Modernization Scores
│   │   ├── curriculum-advisor/ # AI Syllabus Auditor
│   │   ├── skill-gaps/         # What-If Policy Simulator
│   │   ├── policy-decisions/   # Government Decision Center
│   │   ├── employers/          # Employer Validation Network
│   │   ├── career-pathways/    # Career Roadmaps
│   │   ├── district-plans/     # District Training Plans
│   │   ├── capacity-planner/   # Trainer & Equipment Planner
│   │   ├── placement-analytics/# Placement Outcome Analytics
│   │   └── api/                # ISR route handlers (5 endpoints)
│   ├── components/             # 12 reusable UI components
│   └── lib/
│       ├── intelligenceData.ts # 1705-line typed static catalog
│       ├── live-data.ts        # Remotive-powered live engine
│       ├── use-hydrate.ts      # Shared hydration hook
│       └── use-live-data.ts    # Live data hook
├── public/
└── package.json
Team
Syntax Squad — Smart India Hackathon 2026

## Architecture
