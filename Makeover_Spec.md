# Makeover_Spec — SkillBridge UI Rebuild (v1)

> Status: direction LOCKED 2026-09-10. Source of truth for the pending UI makeover.
> Default theme: **light-first** (Naukri-inspired whitespace), with the existing dark toggle kept as an option.

## 1. Direction

Simple, professional, slightly creative — inspired by job-portal clarity (Naukri.com): clean white
surfaces, strong type hierarchy, calm cards, restrained hover states — but with a **vibrant custom
palette** that breaks entirely from the old teal/emerald/blue/indigo "gradient glass" look.

Hard rule: **zero legacy colors.** The previous accent families (tailwind `blue-*`, `emerald-*`,
`teal-*`, `lime-*`, `indigo-*`, `purple-*`, `rose-*`, `cyan-*` old, `fit-*` palette, `#0b1120`
navy, `sb` gradients) are deleted or remapped. Only the six colors below may carry meaning.

## 2. Palette (exact hexes, only source of truth)

| Name        | Hex       | Light theme role                       | Dark theme role                    |
|-------------|-----------|----------------------------------------|------------------------------------|
| sun-yellow  | `#FFC400` | highlights, selected states, warnings  | same (pops on charcoal)            |
| neon-orange | `#FF6D00` | primary CTAs & main brand action       | primary CTAs                       |
| platinum    | `#E5E4E2` | borders, hairlines, muted fills        | data-grid lines / muted text in modals |
| deep-red    | `#B71C1C` | critical alerts, errors, danger        | red-600 `#DC2626` for dark contrast (same semantic) |
| charcoal    | `#242424` | body text, icons; dark-mode background | backgrounds + white text           |
| cyan        | `#00E5FF` | links, info, data-series A, healthy    | links, info, pops on charcoal      |

Supporting neutrals derived at build time (no extra "brand" colors):
- Light canvas: platinum-tinted `#F6F6F4`; Light surfaces: white `#FFFFFF`.
- Dark canvas: charcoal `#141414`; Dark surface: `#1F1F1F`; Dark raised: `#2A2A2A`.
- Text: light → charcoal `#242424`, muted `#5C5B58`; dark → `#F2F0ED`, muted `#9A9895`.

## 3. Semantic mapping

- **Primary / button / main CTA** → neon-orange (+ darker hover `#E85F00`, +10% tint bg)
- **Link / info / positive / healthy / data-series "supply"** → cyan
- **Highlight / selected / warning / data-series "demand offset"** → sun-yellow
- **Critical / error / deficits / danger** → deep-red
- **Neutral / hairline / ghost** → platinum (light) / `rgba(229,228,226,0.14)` (dark)
- Status chips: tinted text `X-700` on `X-700/12` bg, colored border `X-600/30` (per family above).
- Charts (AreaChart, bars, heatmaps): series A cyan, series B sun-yellow, series C neon-orange,
  grid = platinum `rgba(36,36,36,0.14)` in light / `rgba(229,228,226,0.14)` in dark.

## 4. Typography

- Family: **Inter** (via `next/font`), fallback `-apple-system…`.
- Scale: display `text-3xl font-black`, page-title `text-2xl font-bold`, section `text-lg font-semibold`,
  body `text-sm`, caption/label `text-xs font-semibold uppercase tracking-wide`, data `font-mono text-sm`.
- Mono reserved for KPI numbers + hex-class labels only.

## 5. Surfaces & shape

- Cards: white (light) / `#1F1F1F` (dark), `border-radius: 16px`, `border 1px` platinum,
  shadow `0 1px 2px rgba(36,36,36,0.06), 0 8px 24px -12px rgba(36,36,36,0.12)`.
- Hover: lift 1px + border tint → sun-yellow/40.
- Buttons: full `rounded-10px`, `font-semibold text-sm`; gradients are NOT allowed for buttons —
  flat neon-orange primary, ghost/secondary = platinum surface + charcoal text.
- Modals: centered, radius 16px, `backdrop-blur-sm` scrim `rgba(20,20,20,0.5)`.

## 6. Components to build (Phase 2 library)

`ui/Button`, `ui/Card`, `ui/MetricTile`, `ui/StatusBadge`, `ui/Tag` (tinted chips),
`ui/Modal`, `ui/Field` (input/select), `ui/TabBar`, `ui/SectionHeader`, `ui/TableRow`,
`ui/EmptyState`, `ui/StatDelta`. Charts stay bespoke but consume the palette tokens.

## 7. Icons

- Adopt **lucide-react** (no lib installed today). Map the emoji inventory (📊🚀🏛️🎯⚡…) to:
  BarChart3/LineChart, Rocket/Sparkles, Landmark, Target, Zap, Map/Location, Users, GraduationCap, AlertTriangle, TrendingUp, Building2.
- Brand mark: SkillBridge bolt in a compressed sun-yellow→neon-orange square (rounded 10px), no full gradient wash.

## 8. Theme architecture (Phase 1)

- Single `src/app/tokens.css` defining the full variable set (colors, semantic roles, radius, shadow,
  spacing, type) for BOTH themes; `globals.css` imports it.
- Delete the light-theme Tailwind-remap block + `always-dark` hack in globals.css → both themes flow
  through variables; dark re-assertions no longer needed.
- Delete/retire from `tailwind.config.ts`: `brand.*`, `cyber.*`, `fit.*` color groups; keep only slate
  overrides then remap to the six-color system.
- Replace `--accent-*`, `--fit-gradient`, chart vars in globals.css with new palette tokens.

## 9. Migration order & gates

1. Phase 0: baseline — build green, screenshot 18 routes dark+light, branch `ui-makeover`.
2. Phase 1: tokens.css + tailwind/config + globals (kill legacy kits), build green. **Visual change begins here.**
3. Phase 2: extract ui primitives, migrate shared components + pages progressively.
4. Phase 3: emoji→lucide sweep, Inter font, brand mark.
5. Phase 4: page-by-page Naukri-ization pass; QA (dark+light, all routes, mobile, build); merge → deploy.

Gate at every phase: `npm run build` green, no console errors, both themes checked on all routes.

## 10. Pages (18 routes, same set)

login, register, forgot-password, dashboard (cockpit), my-dashboard, skill-matrix, skill-gaps,
career-pathways, career-readiness, courses, curriculum-advisor, district-plans, employers,
capacity-planner, placement-analytics, policy-decisions, wishlist, home(lp) + shared components
(Navbar, Footer, Modals: Course/Employer/SihDemo/DataSources/ScoreExplainer/EvidenceReasoning, IntelligenceLoop).