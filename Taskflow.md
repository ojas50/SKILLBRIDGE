# Taskflow.md — Hackathon Roadmap

## Status

| Site  | Problem Statement | Frontend | Backend | Status    |
|-------|-------------------|----------|---------|-----------|
| SkillBridge | SIH 26134 - Ministry | Complete | Complete | Complete |

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
> DIRECTION LOCKED 2026-09-10 (ojas50) → Naukri-inspired + custom palette (sun-yellow/neon-orange/platinum/deep-red/charcoal/cyan). See `Makeover_Spec.md`.

#### Phase 0 — Baseline & Decisions (do FIRST, do NOT touch paint yet)
- [ ] Lock ONE design direction/reference before any restyle (DONE — Makeover_Spec.md v1, Naukri-insp. + custom palette)
- [x] Clear the quick functional bugs so we don't restyle broken UX (BUG-016, BUG-017, BUG-020, BUG-022 are small wins; decide scope on BUG-014/015/018/019/021)
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

#### Phase 4 — The Makeover
- [ ] Apply ojas50's change list (DOES NOT BLOCK — direction locked in Makeover_Spec.md)
- [ ] Restyle in ONE pass using tokens + shared components (pages after Phase 2 are thin shells)
- [ ] QA: dark + light, all routes, mobile, build green → merge to main + redeploy

---

## Fixed so far

- Fixed missing SQLite tables in `storage.py` and populated seed data for all 36 Maharashtra districts, MSDSVE courses, and employer partners.
- Upgraded Next.js frontend with dark mode glassmorphism, dynamic capacity simulation calculations, and instant curriculum audit engine.
- Configured and validated production build (`npm run build`); the SkillBridge app is 100% Vercel-ready with zero errors.
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
- Fixed BUG-016: Inspect modal on `/courses` no longer mislabels Emerging courses as Oversupplied — all 4 decisionStatus values map to real statuses and CourseModal got an "Emerging" purple badge branch.
- Fixed BUG-017: `/courses` search no longer assumes every row has skill arrays — `(c.activeSkills ?? [])` / `(c.missingSkills ?? [])` guards prevent a TypeError on malformed API data.
- Fixed BUG-020: `/district-plans` copy-report now try/catches the clipboard call and falls back to a hidden-textarea `execCommand("copy")` — no unhandled rejection on non-secure contexts, and "Copied" only shows on success.
- Fixed BUG-022: `/employers` newly registered pipelines get a unique id (`max(existing)+1` via functional update, no stale-closure dupes) and the modal payload is typed `NewEmployerInput` instead of `any`.
- Fixed BUG-023: My Dashboard "Readiness Over Time" now renders with a single saved assessment (`length > 0`) instead of requiring 2+ history entries; light-mode contrast half of that bug is folded into BUG-021.
- Fixed BUG-015: What-If Policy Simulator now runs on the live `/api/skill-gaps` dataset via a typed `skillGaps` prop (fallback to static catalog when empty) — radar and simulator can no longer disagree.
- Fixed BUG-014: all 9 simulator levers now affect outputs — district corridor gets `DISTRICT_FACTORS` (seat efficiency + placement delta) and Program Duration gained a 6/9/12-month control with supply boost + 12-month placement penalty.
- Fixed BUG-018: `router.push()` moved out of render into `useEffect` on `/login` and `/register` (Next 14 side-effect-during-render anti-pattern gone); all auth awaits (login, register, Google, forgot-password) wrapped in try/catch/finally so a rejected promise shows an error instead of leaving the button stuck on "loading".
- Fixed BUG-019: `getStoredUsers()` now validates `JSON.parse` output is an array of well-shaped users (malformed/legacy stored data returns `[]` instead of crashing `.find`); the restored-session `JSON.parse` is shape-checked (invalid sessions are dropped); `forgotPassword` no longer reveals whether an account exists (always returns success, communicated to the user via the existing "If an account exists…" copy) — hash algorithm stays demo-grade but is now documented as such.
- Fixed BUG-021: light-theme contrast systemic pass via new globals.css remaps (scoped to `html[data-theme="light"]`) — accent 300/400/500 text and `fit-*` text flip to 700-level shades, colored `bg-*-950/900` chips become light tinted panels, `.badge-*` labels darken, `.text-fit-gradient` gets a darker palette, and the always-dark navbar/footer re-assert their bright accents. No JSX edits: 472+ touchpoints handled in one CSS block.
