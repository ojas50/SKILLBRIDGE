import React from "react";

interface FitonistKpiCardProps {
  label: string;
  value: string | number;
  change: string;
  positive?: boolean;
  subtitle: string;
  marker: string;
}

const accentAvatars: Record<string, string> = {
  cyan: "bg-fit-cyan/15 text-fit-cyan border-fit-cyan/30",
  emerald: "bg-fit-emerald/15 text-fit-emerald border-fit-emerald/30",
  lime: "bg-fit-lime/15 text-fit-lime border-fit-lime/30",
  rose: "bg-rose-500/15 text-rose-400 border-rose-500/30",
  indigo: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
};

export default function FitonistKpiCard({
  label,
  value,
  change,
  positive = true,
  subtitle,
  marker,
}: FitonistKpiCardProps) {
  const markerTone =
    accentAvatars.rose.includes(label.toLowerCase()) || marker === "⚡"
      ? accentAvatars.rose
      : marker === "🏢"
      ? accentAvatars.indigo
      : accentAvatars[["📚", "🎯"].includes(marker) ? "cyan" : "emerald"];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-fit-surface/80 border border-slate-800/80 p-5 ring-fit group hover:border-slate-700/80 transition-all">
      <div
        className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-fit-cyan/10 blur-2xl pointer-events-none group-hover:bg-fit-emerald/15 transition-colors"
      />
      <div className="flex items-start justify-between">
        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
          {label}
        </span>
        <span
          className={`text-sm w-9 h-9 grid place-items-center rounded-xl border ${markerTone}`}
        >
          {marker}
        </span>
      </div>

      <div className="mt-3 flex items-end justify-between gap-2">
        <span className="text-[32px] leading-none font-extrabold text-white tabular-nums tracking-tight">
          {value}
        </span>
        <span
          className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
            positive
              ? "bg-fit-emerald/10 text-fit-emerald border-fit-emerald/30"
              : "bg-rose-500/10 text-rose-400 border-rose-500/30"
          }`}
        >
          {positive ? "▲" : "▼"} {change}
        </span>
      </div>

      <p className="mt-2 text-[11px] text-slate-500">{subtitle}</p>

      <div className="mt-4 h-1 w-full rounded-full bg-slate-800 overflow-hidden">
        <div className="bar-fit h-full w-[78%] rounded-full" />
      </div>
    </div>
  );
}