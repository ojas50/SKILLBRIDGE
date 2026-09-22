import React from "react";

interface SectionHeaderProps {
  title: string;
  icon?: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeader({
  title,
  icon,
  subtitle,
  className,
}: SectionHeaderProps) {
  return (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      {icon && <span className="text-lg">{icon}</span>}
      <div>
        <h2 className="text-base font-bold text-ink">{title}</h2>
        {subtitle && <p className="text-xs text-ink-muted">{subtitle}</p>}
      </div>
    </div>
  );
}