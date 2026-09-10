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

### GREAT UI MAKEOVER — Implementation Plan v1 (added 2026-09-08, detailed 2026-09-10)

> Goal: kill the "vibecoded" look (every page restyle-able in ONE pass, consistent tokens, no Tailwind hacks).
> DIRECTION LOCKED 2026-09-10 (ojas50) → Naukri-inspired + custom palette (sun-yellow/neon-orange/platinum/deep-red/charcoal/cyan). See `Makeover_Spec.md`.

#### Compass — "Simple & Professional" (check every change against these)
1. **Clarity over decoration** — cards carry one primary message; one primary action per screen (neon-orange).
2. **Whitespace is design** — consistent 24px gutter, 16-px radii, generous padding; no cramped panels.
3. **Type hierarchy does the talking** — display > title > section > body > caption; keep sentence-case copy.
4. **Data is scannable** — tables: 1px platinum hairlines, 12–14px line height, aligned numerals, no zebra stripes.
5. **Calm interactions** — hover = lift + border tint (sun-yellow/40); no bouncy/glow animations.
6. **No gradients-as-color** — flat fills only; the single allowed gradient is the SkillBridge brand mark square.
7. **Every screen reads in BOTH themes** before a page is "done" (light is the showcase default).

#### Naukri-alignment checkpoints (evidence per page — checklist to tick in commits)
- [ ] Clean top nav: white/charcoal bar, brand mark left, nav links center, avatar/CTA right (login/register CTA = neon-orange).
- [ ] Hero/entry: big title + one search-or-focused action on the landing + dashboard — whitespace-first.
- [ ] Metric rows: white Card + MetricTile (label caption / big mono number / delta chip) — nothing glassy.
- [ ] Status words: tinted StatusBadge (cyan=healthy, sun-yellow=warning, deep-red=critical, platinum=neutral).
- [ ] Tables/lists: platinum hairlines, no emojis, row hover tint, aligned numbers, sortable headers look.
- [ ] Modals: centered, scrim rgba(20,20,20,0.5), 16px radius, focus trap + Esc (keep current behavior).
- [ ] Mobile: nav collapses to a single bar with hamburger; cards go full-width; tables scroll horizontally.
- [ ] Dark mode = same layout/tokens, only surface + text swap (charcoal backgrounds) — accents keep hexes.

---

#### Phase 0 — Baseline & Scoping (tomorrow, do FIRST, do NOT touch paint)
- [x] Lock design direction (DONE — Makeover_Spec.md v1, Naukri-insp. + custom palette)
- [x] Clear the quick functional bugs (all 24 BUGs ✅ Fixed)
- [ ] Baseline snapshot: `npm run build` green, screenshot ALL 18 routes in dark AND light, log console errors
- [ ] Create `ui-makeover` git branch off main (main stays deployable)
- [ ] Pain-inventory: grep counts for legacy colors/classes to delete (baseline numbers for the kill-list)
- [ ] Install `lucide-react` + `next/font` @inter (dependency commit, no visual change)

#### Phase 1 — Design Tokens (anti-vibecode foundation; visual change begins here)
- [ ] Create `src/app/tokens.css`: full variable set for BOTH themes — six-color system + semantic
      `--surface-*` / `--text-*` / `--border-*` + radius / shadow / spacing / type scales; import from globals.css
- [ ] Trim `tailwind.config.ts`: DELETE `brand.*`, `cyber.*`, `fit.*` groups; map the six colors +
      strong-text shades into `colors` (see CONTRACT below); keep slate only if remapped to charcoal/platinum
- [ ] Delete the light-mode Tailwind-remap block + all `always-dark` rules in globals.css → both themes
      flow through tokens (dark re-assertions obsolete)
- [ ] Replace legacy tokens: `--chart-grid/--chart-supply/--chart-supply-soft`, `--accent-*`, `--fit-gradient`,
      `--navbar`, `--panel*`, autofill vars → new palette values (per CONTRACT)
- [ ] Kill-list sweep on shared components (Navbar, Footer, AreaChart first): no `bg-*-950`, `text-*-(300|400|500)`,
      `blue-*`, `emerald-*`, `teal-*`, `lime-*`, `indigo-*`, `purple-*`, `rose-*`, old `cyan-*` remains only as new-cyan
- [ ] **GATE: build green; both themes load with ZERO legacy paint left (spot-check dashboard + courses + login)**

#### CONTRACT — palette, shades, and the "proof" table (only source of truth)
| Token           | Base hex   | Use on light (text/icon)            | Use on dark               | Verified contrast vs white |
|-----------------|-----------|-------------------------------------|---------------------------|---------------------------|
| sun-yellow      | `#FFC400` | accents, selected, warn-chip; **text → `#B45309`** | accents, warn-chips, focus | text-shade `#B45309` ≈ 4.6:1 |
| neon-orange     | `#FF6D00` | **primary CTA bg `#C2410C`** w/ white text (AA); neon reserved for highlights | CTAs `#D85400` (white text) | CTA `#C2410C` ≈ 4.6:1; `#D85400` ≈ 4.0:1 (large/UI ok) |
| platinum        | `#E5E4E2` | hairlines, ghost fills, avatar bg    | hairlines `rgba(229,228,226,0.14)` | borders only (not text) |
| deep-red        | `#B71C1C` | critical text/badges/errors (AA)     | `#DC2626` for dark contrast | `#B71C1C` ≈ 7.3:1 |
| charcoal        | `#242424` | body text, icons                     | page bg `#141414`, surface `#1F1F1F`, raised `#2A2A2A` | `#242424` ≈ 13.4:1 |
| cyan            | `#00E5FF` | links/info/data-series; **text → `#0E7490`** | links, info, series-A pops | text-shade `#0E7490` ≈ 4.6:1 |
| (derived) light |           | canvas `#F6F6F4`, surface `#FFF`, hairlines `#E5E4E2` | — | slate text on `#F6F6F4` ≥ 4.5 |
| (derived) dark  |           | —                                  | html bg `#141414`, surface `#1F1F1F` | light-text on `#141414` ≥ 8:1 |

Rule: base hexes are for dark surfaces, charts, and UI accents; the **-text/-bg "strong" shades above are
the only ones allowed for text/buttons on light** — this is what keeps the palette usable, not decorative.

#### Phase 2 — Component Library (kill the repetition; pages become thin shells)
- [ ] Inventory repeated atoms across the 18 routes + 7 modals (cards, metric tiles, badges, buttons, inputs,
      modals, tabs, section headers, tables) with usage counts → drive build order
- [ ] Extract `src/components/ui/`: `Button` (primary=neon-orange, ghost, danger=deep-red), `Card`,
      `MetricTile`, `StatusBadge`, `Tag` (tinted chips), `Modal`, `Field` (input/select), `TabBar`,
      `SectionHeader`, `TableRow`, `EmptyState`, `StatDelta`
- [ ] Migrate shared components (Navbar, Footer, modals) to ui-primitives FIRST — they touch every page
- [ ] Migrate pages progressively (one commit per page or page-cluster; build green after each)
- [ ] Preserve ALL behavior/IDs/ARIA — visual-only migration; charts keep bespoke rendering but use palette tokens

#### Phase 3 — Icons, Type & Brand (the "creative, not vibecoded" pass)
- [ ] **GATE: sweep ALL emojis to lucide-react** (📊→BarChart3/LineChart, 🚀→Rocket/Sparkles, 🏛️→Landmark,
      🎯→Target, ⚡→Zap, 📍→MapPin, 👥→Users, 🎓→GraduationCap, ⚠️→AlertTriangle, 📈→TrendingUp, 🏢→Building2,
      ✅→CheckCircle2, ⛔→Ban, 🔒→Lock) — no emoji left in rendered UI
- [ ] Load Inter via `next/font`; apply type scale (display/heading/body/caption/mono); sweep `text-xl/2xl/3xl` mishmash
- [ ] Brand mark: SkillBridge bolt in a sun-yellow→neon-orange rounded square (only allowed gradient); wordmark charcoal
- [ ] Focus-visible rings = cyan; selection color = sun-yellow/25; reduce motion respected (no autoplay animations)

#### Phase 4 — One-Pass Page Apply (Naukri-ization)
- [ ] Apply per page in build order: navbar → landing → dashboard (cockpit) → my-dashboard → skill-matrix →
      skill-gaps → career-pathways → career-readiness → courses → curriculum-advisor → district-plans →
      employers → capacity-planner → placement-analytics → policy-decisions → wishlist → auth (login/register/forgot)
- [ ] Each page ticks the FULL "Naukri-alignment checkpoints" list (see Compass section) in its commit
- [ ] Auth pages: white card on platinum canvas, calm 2-col form, neon-orange CTA — drop the dark-glass login look
- [ ] QA sweep: dark + light, all 18 routes, mobile (≤390px), keyboard nav, contrast spot-check, no console errors

#### Phase 3bis — Style Guide & Handoff (research-proof artifact)
- [ ] Build `/style-guide` route (or markdown): tokens table, component showcase, usage do/don'ts
- [ ] Pair Before/After screenshots (Phase-0 baseline vs final) per page into Taskflow as the acceptance record
- [ ] Update `Makeover_Spec.md` with any palette/token deltas found during build (spec is living contract)

#### Final gate — Acceptance (definition of "done")
- [ ] `npm run build` green, `npm run dev` smoke on key flows (login→dashboard, course inspect, simulator, copy-report)
- [ ] Zero legacy palette classes remain (grep-proof: `blue-`, `emerald-`, `teal-`, `lime-`, `indigo-`,
      `purple-`, `rose-`, `fit-`, `text-*-300/400`, `bg-*-950`, `#0b1120`, `#3b82f6`)
- [ ] No emojis in rendered UI; all icons lucide
- [ ] Both themes readable on all routes; screenshots attached to Taskflow
- [ ] Merge `ui-makeover` → main → auto-deploy to Vercel; verify live vs production

**Execution rhythm (git):** one commit per unit (token file / config / component / page / icon sweep);
every commit must keep `npm run build` green; teammates + agents work on the same branch and we always
`git pull` before starting; no commits to `main` while `ui-makeover` is active.

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
