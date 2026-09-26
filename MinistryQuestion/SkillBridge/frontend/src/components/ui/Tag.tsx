import React from "react";
import Badge from "./Badge";

type TagTone = "neutral" | "cyan" | "amber" | "rose";

interface TagProps {
  children: React.ReactNode;
  tone?: TagTone;
  className?: string;
}

const toneMap: Record<TagTone, "positive" | "warning" | "critical" | "info" | "neutral"> = {
  neutral: "neutral",
  cyan: "positive",
  amber: "warning",
  rose: "critical",
};

export default function Tag({
  children,
  tone = "neutral",
  className,
}: TagProps) {
  return (
    <Badge tone={toneMap[tone]} className={className}>
      {children}
    </Badge>
  );
}