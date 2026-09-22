"use client";

import React from "react";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "default" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
}

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-[var(--sb-cta-bg)] text-[var(--sb-cta-text)] hover:bg-[var(--sb-cta-bg-hover)]",
  default: "border border-line text-ink bg-raised hover:bg-line",
  ghost: "text-ink-muted hover:text-ink",
  danger: "text-crimson hover:bg-line",
};

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "text-xs px-3 py-2",
  md: "text-sm px-4 py-2.5",
  lg: "text-base px-5 py-3",
};

export default function Button({
  children,
  variant = "default",
  size = "md",
  href,
  className,
  type,
  onClick,
  disabled,
}: ButtonProps) {
  const cls = `inline-flex items-center justify-center gap-1.5 rounded-xl font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sb-cta-bg)] disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className ?? ""}`;

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type ?? "button"} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}