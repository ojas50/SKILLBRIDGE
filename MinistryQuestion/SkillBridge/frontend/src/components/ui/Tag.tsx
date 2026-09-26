import React from "react";
import Badge from "./Badge";
import type { StatusRole } from "@/lib/status-label-registry";

type TagTone = "neutral" | "cyan" | "amber" | "rose";

interface TagProps {
  label: string;
  tone?: TagTone;
  className?: string;
  children?: React.ReactNode;
}

const toneMap: Record<TagTone, "positive" | "warning" | "critical" | "info" | "neutral"> = {
  neutral: "neutral",
  cyan: "positive",
  amber: "warning",
  rose: "critical",
};

export default function Tag({
  label,
  tone = "neutral",
  className,
  children,
}: TagProps) {
  return (
    <Badge tone={toneMap[tone]} label={label} className={className}>
      {children}
    </Badge>
  );
}