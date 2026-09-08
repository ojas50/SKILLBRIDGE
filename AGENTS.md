# AGENTS.md — SkillBridge

## Project overview

SkillBridge is a single-site web application for the Smart India Hackathon (SIH 26134, Ministry): a labour-market intelligence & curriculum-alignment platform that lets state vocational training directors see live industry demand vs. trained supply, detect skill deficits, and model policy interventions.

Team: Solo (originally a SIH 2026 group submission)

## Layout

- Repo root: `D:\SKILLBRIDGE\Skill Bridge\` (contains `.git`, project docs, and `MinistryQuestion/`)
- App root: `MinistryQuestion/SkillBridge/`
  - `frontend/` — Next.js 14 (App Router) + React 18 + TypeScript + Tailwind CSS 3
  - `backend/` — a FastAPI + SQLite prototype (stdlib `sqlite3`, Pydantic v2, Uvicorn) mirrored by Next.js `/api/*` ISR route handlers that the production app actually uses
- Run all git/npm commands from `MinistryQuestion/SkillBridge/frontend` unless noted.

## Commands

```bash
cd "D:\SKILLBRIDGE\Skill Bridge\MinistryQuestion\SkillBridge\frontend"
npm install
npm run dev                  # http://localhost:3000
npm run build                # production type-check + build (required before every push)
```

Backend prototype (optional, not used in production):

```bash
cd "D:\SKILLBRIDGE\Skill Bridge\MinistryQuestion\SkillBridge\backend"
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

## Conventions

- Keep all API/business logic in `frontend/src/lib/` (e.g. `intelligenceData.ts`, `live-data.ts`) or the Next `src/app/api/` route handlers; UI-only code lives in components/pages.
- Frontend pages live in `src/app/` (App Router), one folder per route. Reusable components go in `src/components/`.
- Storage pattern (backend prototype): `storage.py` with stdlib SQLite; all functions fail-safe (locked/missing DB must never crash).
- Never hardcode credentials. Use env vars or `.env` files (gitignored).

## Workflow

- Always `git fetch`/`git pull` before starting; re-read files before editing (teammates and their AI agents commit directly to main).
- Verify edits with `npm run build` before pushing.
- After every edit, update `Taskflow.md`: tick completed items, log bug fixes as `B###` entries.
- Log bugs in `Bug Tracker.md` (unified table). Fixed bugs get Status `✅ Fixed`.
- Port conflicts: frontend 3000, backend 8000.