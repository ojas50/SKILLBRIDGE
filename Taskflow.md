# Taskflow.md — Hackathon Roadmap

## Status

| Site  | Problem Statement | Frontend | Backend | Status    |
|-------|-------------------|----------|---------|-----------|
| Site-A | LearnPilot (Student Innovation) | Complete | Complete | Complete |
| Site-B | SkillBridge (SIH 26134 - Ministry) | Complete | Complete | Complete |

---

## Site-B — SkillBridge (Ministry Problem Statement SIH 26134)

### Phase 1: Scaffold (DONE)
- [x] Create folder structure
- [x] Frontend boilerplate (Next.js 14+, Tailwind, TypeScript)
- [x] Backend boilerplate (FastAPI, Pydantic, SQLite)
- [x] README with run instructions

### Phase 2: Core Features (DONE)
- [x] Define data models and DB schema (`storage.py`, `models.py`)
- [x] Backend API endpoints (Dashboard, Courses, Skill Gaps, Capacity Simulator, Employers, Districts, AI Curriculum Auditor)
- [x] Frontend pages and routing (`/`, `/dashboard`, `/courses`, `/skill-gaps`, `/employers`, `/district-plans`, `/curriculum-advisor`)
- [x] Interactive UI components (Navbar, Footer, StatCard, SkillGapBar, CourseModal, CurriculumSimulator, EmployerModal)
- [x] Frontend ↔ Backend integration with live failover fallback

### Phase 3: Polish (DONE)
- [x] UI/UX refinement (Dark glassmorphism, responsive charts, glowing badges, animations)
- [x] Error handling, search queries, and real-time state mutations
- [x] Automated testing and compilation checks
- [x] Documentation & run instructions

### GREAT UI MAKEOVER — Pre-Work Plan (added 2026-09-08)

> Goal: kill the "vibecoded" look (every page restyle-able in ONE pass, consistent tokens, no Tailwind hacks).
> BLOCKED until ojas50 provides the change list / design direction.

#### Phase 0 — Baseline & Decisions (do FIRST, do NOT touch paint yet)
- [ ] Wait for ojas50's change list + lock ONE design direction/reference before any restyle
- [ ] Clear the quick functional bugs so we don't restyle broken UX (BUG-016, BUG-017, BUG-020, BUG-022 are small wins; decide scope on BUG-014/015/018/019/021)
- [ ] Baseline snapshot: `npm run build` green, screenshot ALL 18 routes in dark AND light, log console errors
- [ ] Create `ui-makeover` git branch off main so main stays deployable

#### Phase 1 — Design Tokens (the actual anti-vibecode foundation)
- [ ] Single tokens file: CSS custom properties for brand/neutral/accent/success/warning/danger + semantic `--surface-*`, `--text-*`, `--border-*` + spacing / radius / shadow / typography scales
- [ ] Delete the light-mode Tailwind-remap hack in globals.css → both themes flow through the same variables
- [ ] Migrate arbitrary hardcoded colors (`bg-blue-950/40`, `text-cyan-400`, `#0b1120`, `--navbar`) in shared components to semantic tokens

#### Phase 2 — Component Library (kill the repetition)
- [ ] Inventory repeated atoms across pages (cards, buttons, chips, stat tiles, modals, inputs, switches, tabs, section headers) with usage counts
- [ ] Extract shared primitives: Button, Card, Badge/Chip, StatTile, Modal, Field/Select/Switch, TabBar, SectionHeading — migrate pages progressively
- [ ] Icon strategy: replace random emojis (📊🎯⚡🏛️…) with one consistent icon set (lucide-react or inline SVG components) — no icon lib installed today
- [ ] Typography: define scale (display/heading/body/caption/mono) and map the current `text-xl/3xl …` mishmash

#### Phase 3 — Quality Gates (before the paint job)
- [ ] Responsive audit baseline: nav, tables, modals on mobile/desktop in both themes
- [ ] Screenshot key pages for After-vs-Before comparison
- [ ] Write a Style Guide page (tokens + component rules) so future changes stay consistent
- [ ] Document a smoke-check routine (build + key flows) to run after every makeover step

#### Phase 4 — The Makeover (BLOCKED: waiting on change list)
- [ ] Apply ojas50's change list once provided
- [ ] Restyle in ONE pass using tokens + shared components (pages after Phase 2 are thin shells)
- [ ] QA: dark + light, all routes, mobile, build green → merge to main + redeploy

---

## Site-A — LearnPilot (SIH Student Innovation)

### Phase 1: Scaffold (DONE)
- [x] Create folder structure
- [x] Frontend boilerplate (Next.js 14+, Tailwind, TypeScript)
- [x] Backend boilerplate (FastAPI, Pydantic, SQLite)
- [x] README with run instructions

### Phase 2: Core Features (DONE)
- [x] Define data models and DB schema (Topics, Questions, Mastery progress)
- [x] Backend API endpoints (`/api/dashboard`, `/api/questions`, `/api/submit-test`)
- [x] Frontend pages and routing
- [x] Diagnostic assessment & mastery tracking

### Phase 3: Polish (DONE)
- [x] UI/UX refinement & consistent theme
- [x] Testing & validation

---

## Fixed so far

- Fixed missing SQLite tables in `storage.py` and populated seed data for all 36 Maharashtra districts, MSDSVE courses, and employer partners.
- Upgraded Next.js frontend with dark mode glassmorphism, dynamic capacity simulation calculations, and instant curriculum audit engine.
- Configured and validated production build (`npm run build`) for both Site-A and Site-B; both apps are 100% Vercel-ready with zero errors.
- Launched local frontend on `http://localhost:3000` connected with FastAPI SQLite backend on `http://localhost:8000`.
- Deployed Site-B production build to Vercel live at `https://frontend-tau-weld-11.vercel.app`.
- Purged all Hackathon and SIH Problem Statement #26134 text across headers, metadata, footers, copyable reports, and challenge modules; verified live production redeployment.
- Removed all Maharashtra Skill Development Department (MSDSVE) branding, region tags, and the state policy document from the footer; successfully redeployed to Vercel.
- Integrated interactive Dashboard Precision Calibration Suite on `/dashboard` allowing users to enter custom Region, Industry Sector, Trainee Cohort Size, Placement Target, and Focus Competencies with instant dynamic recalculation of all KPIs, skill deficit charts, syllabus alignment, and strategic alerts; redeployed to Vercel.
- Built Centralized Intelligence Dataset (`src/lib/intelligenceData.ts`) establishing a single source of truth across all 10 dashboards and modules with 100% numerical consistency.
- Built interactive 12-stage Central Intelligence Loop (`IntelligenceLoop.tsx`) mapping the complete pipeline from Industry Demand to Continuous Curriculum Updates.
- Created Skill Intelligence Matrix page (`/skill-matrix`) with multi-dimensional filtering (District, Sector, Skill, Proficiency, Priority, Time Period), salary indicators, opening counts, and heatmaps.
- Upgraded AI Curriculum Advisor (`/curriculum-advisor`) with comprehensive 4-stage audit (Current Baseline, Industry Requirements, Detected Gaps with hours/severity, AI Upgrade Plan with Keep/Modify/Remove/Add, Lab & Trainer requirements, Confidence Scores with explainability).
- Created explainable Course Modernization Score component (`ScoreExplainerModal.tsx`) with 6-factor weighted breakdown and Course Decision Engine classifications on `/courses`.
- Upgraded What-If Policy Simulator (`CurriculumSimulator.tsx`) with 9 policy levers and real-time Before vs After analytics.
- Added Employer Validation System on `/employers` with recruiter survey consensus breakdown and "Request Skill / Submit Validation" workflow.
- Built Career Pathways page (`/career-pathways`) mapping Job Role ➔ Skill ➔ Course with structured 8-stage learning paths.
- Built Training Capacity Planner (`/capacity-planner`) tracking instructor shortages, virtual lab sandboxes, and Capex requirements.
- Built Placement Outcome Analytics (`/placement-analytics`) closing the feedback loop with verified hiring conversion and wage premiums.
- Built Policy Decision Center (`/policy-decisions`) with one-click ministerial action authorizations and visual evidence chain inspection (`EvidenceReasoningModal.tsx`).
- Created 🚀 SIH Demo Mode (`SihDemoModal.tsx`) with a 10-step guided tour walking judges through the realistic Pune IT/Cloud scenario in 2–3 minutes.
- Added Data Sources & Methodology modal (`DataSourcesModal.tsx`) and verified production build passing (`npm run build`).
- Fixed BUG-011: `persistProfile` on `/career-readiness` now appends today's readiness % to `readinessHistory` (replaces today's entry on repeat saves instead of duplicating) — My Dashboard "Readiness Over Time" chart and last-score readout now populate. Fix also moved the callback after the `readiness` memo (was referenced in deps before declaration).
- Fixed BUG-012: unguarded `JSON.parse` in `persistProfile` is now try/catch-wrapped and shape-validated with `Array.isArray` — malformed stored profile JSON no longer crashes the page on Save.
- Fixed BUG-013: clicking "Simulate" on a deficit radar card in `/skill-gaps` now pre-selects that skill in the What-If Policy Simulator (`simulateSkillId` passed through as `defaultSkillId`); simulator mounts fresh per radar→simulator switch so it honors the clicked skill.
