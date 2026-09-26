import React from "react";

type BadgeTone = "positive" | "warning" | "critical" | "info" | "neutral";

interface BadgeProps {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}

const toneClass: Record<NonNullable<BadgeProps["tone"]>, string> = {
  positive: "badge-aligned",
  info: "badge-aligned",
  warning: "badge-update",
  critical: "badge-critical",
  neutral: "badge-oversupplied",
};

export default function Badge({
  children,
  tone = "neutral",
  className,
}: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium ${toneClass[tone]} ${className ?? ""}`}>
      {children}
    </span>
  );
}