export type StatusRole = "healthy" | "warning" | "critical" | "neutral";

// 3a.3.3 — machine-readable mapping. On conflict, this object governs.
// Matching rule: exact, case-normalized (.trim().toUpperCase()), full-string.
export const STATUS_LABEL_REGISTRY: Record<string, StatusRole> = {
  "ALIGNED": "healthy",
  "APPROVED (DIRECT JOB READINESS)": "healthy",
  "EMERGING / HIGH PRIORITY": "healthy",
  "UPDATE REQUIRED": "warning",
  "NEEDS MODULE MODERNIZATION": "warning",
  "WARNING": "warning",
  "OBSOLETE / OVERSUPPLIED": "critical",
  "NOT INDUSTRIALLY RELEVANT": "critical",
  "CRITICAL": "critical",
  "CURRICULUM ALERT": "neutral",
  "EMERGING TECHNOLOGY": "neutral",
};

// 3a.3.3 — SEPARATE two-value registry for deficit/priority severity fields.
export const DEFICIT_SEVERITY_REGISTRY: Record<string, StatusRole> = {
  "CRITICAL": "critical",
  "HIGH": "warning",
};

// 3a.4 — employer tier enum, fully isolated from both status registries.
export type EmployerTier = "tier-1-platinum" | "tier-2-gold";

export const EMPLOYER_TIER_STYLE: Record<
  EmployerTier,
  { color: string; label: string }
> = {
  "tier-1-platinum": { color: "var(--color-neon-orange)", label: "Tier 1 · Platinum" },
  "tier-2-gold":      { color: "var(--color-sun-yellow)",  label: "Tier 2 · Gold" },
};