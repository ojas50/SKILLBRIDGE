import React from "react";
import StatusBadge from "./StatusBadge";
import type { StatusRole } from "@/lib/status-label-registry";

type BadgeTone = "positive" | "warning" | "critical" | "info" | "neutral";

interface BadgeProps {
  label: string;
  tone?: BadgeTone;
  className?: string;
  children?: React.ReactNode;
}

const toneToRole: Record<NonNullable<BadgeProps["tone"]>, StatusRole> = {
  positive: "healthy",
  info: "healthy",
  warning: "warning",
  critical: "critical",
  neutral: "neutral",
};

export default function Badge({
  label,
  tone = "neutral",
  className,
  children,
}: BadgeProps) {
  return (
    <StatusBadge role={toneToRole[tone]} label={label} className={className}>
      {children}
    </StatusBadge>
  );
}