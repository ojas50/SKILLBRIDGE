import React from "react";
import { LucideIcon } from "lucide-react";
import { STATUS_LABEL_REGISTRY, DEFICIT_SEVERITY_REGISTRY } from "@/lib/status-label-registry";
import type { StatusRole } from "@/lib/status-label-registry";

interface StatusBadgeProps {
  /** Raw source string, exact — e.g. "ALIGNED". Used for registry lookup if role is omitted. */
  label: string;
  /** Optional explicit override. If provided, skips registry lookup entirely. */
  role?: StatusRole;
  /** Optional icon (e.g. TrendingUp/Flame for EMERGING/HIGH PRIORITY). */
  icon?: LucideIcon;
  className?: string;
  children?: React.ReactNode;
}

const roleClass: Record<StatusRole, string> = {
  healthy: "status-healthy",
  warning: "status-warning",
  critical: "status-critical",
  neutral: "status-neutral",
};

function resolveDeficitSeverity(label: string): StatusRole | undefined {
  return DEFICIT_SEVERITY_REGISTRY[label.trim().toUpperCase()];
}

export default function StatusBadge({
  label,
  role,
  icon: Icon,
  className,
  children,
}: StatusBadgeProps) {
  const resolvedRole = role ?? STATUS_LABEL_REGISTRY[label.trim().toUpperCase()]
    ?? resolveDeficitSeverity(label)
    ?? "neutral";
  const cls = roleClass[resolvedRole];

  return (
    <span
      className={`status-badge ${cls} inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium${className ? ` ${className}` : ""}`}
    >
      {Icon && <Icon className="w-3 h-3 text-[var(--sb-cta)] shrink-0" />}
      <span>{label}</span>
      {children && <span className="ml-0.5">{children}</span>}
    </span>
  );
}