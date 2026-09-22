import React from "react";

type TagTone = "neutral" | "cyan" | "amber" | "rose";

interface TagProps {
  children: React.ReactNode;
  tone?: TagTone;
  className?: string;
}

const tones: Record<TagTone, string> = {
  neutral: "badge-oversupplied",
  cyan: "badge-aligned",
  amber: "badge-update",
  rose: "badge-critical",
};

export default function Tag({
  children,
  tone = "neutral",
  className,
}: TagProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium ${tones[tone]} ${className ?? ""}`}
    >
      {children}
    </span>
  );
}