import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}

export default function Card({
  children,
  className,
  interactive = false,
}: CardProps) {
  return (
    <div
      className={`glass-card ${interactive ? "glass-card-interactive" : ""} ${className ?? ""}`}
    >
      {children}
    </div>
  );
}