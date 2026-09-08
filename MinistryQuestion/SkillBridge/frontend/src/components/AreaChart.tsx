import React from "react";

interface AreaChartProps {
  labels: string[];
  demand: number[];
  supply: number[];
}

export default function AreaChart({ labels, demand, supply }: AreaChartProps) {
  const W = 720;
  const H = 260;
  const padL = 8;
  const padR = 8;
  const padT = 20;
  const padB = 28;

  const max =
    Math.max(
      100,
      ...demand.map((d, i) => Math.max(d, supply[i] ?? 0))
    ) * 1.15;
  const x = (i: number) =>
    padL + (i / Math.max(demand.length - 1, 1)) * (W - padL - padR);
  const y = (v: number) => H - padB - (v / max) * (H - padT - padB);
  const pts = (arr: number[]) => arr.map((v, i) => `${x(i)},${y(v)}`).join(" ");

  const defs = (
    <>
      <defs>
        <linearGradient id="fitArea" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35" />
          <stop offset="55%" stopColor="#34d399" stopOpacity="0.30" />
          <stop offset="100%" stopColor="#a3e635" stopOpacity="0.30" />
        </linearGradient>
        <linearGradient id="fitLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="55%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#a3e635" />
        </linearGradient>
        <linearGradient id="supplyLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--chart-supply)" stopOpacity="0.7" />
          <stop offset="100%" stopColor="var(--chart-supply-soft)" stopOpacity="0.7" />
        </linearGradient>
      </defs>
    </>
  );

  const gridLines = [0, 0.25, 0.5, 0.75, 1].map((f) => {
    const gy = padT + f * (H - padT - padB);
    return (
      <line
        key={f}
        x1={padL}
        x2={W - padR}
        y1={gy}
        y2={gy}
        stroke="var(--chart-grid)"
        strokeDasharray="4 6"
      />
    );
  });

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        preserveAspectRatio="none"
        role="img"
        aria-label="Demand vs supply trend area chart"
      >
        {defs}
        {gridLines}
        {/* supply area (subtle, behind) */}
        <polygon
          points={`${padL},${H - padB} ${pts(supply)} ${x(supply.length - 1)},${H - padB}`}
          fill="url(#supplyLine)"
          opacity="0.10"
        />
        <polyline
          points={pts(supply)}
          fill="none"
          stroke="url(#supplyLine)"
          strokeWidth="2"
          strokeDasharray="5 5"
        />
        {/* demand area (signature gradient) */}
        <polygon
          points={`${padL},${H - padB} ${pts(demand)} ${x(demand.length - 1)},${H - padB}`}
          fill="url(#fitArea)"
        />
        <polyline
          points={pts(demand)}
          fill="none"
          stroke="url(#fitLine)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* endpoint dots */}
        {demand.map((d, i) => (
          <circle
            key={i}
            cx={x(i)}
            cy={y(d)}
            r={i === demand.length - 1 ? 4.5 : 2.5}
            fill="#a3e635"
            opacity={i === demand.length - 1 ? 1 : 0.7}
          />
        ))}
        {/* x labels (drawn in normal flow, not affected by preserveAspectRatio stretch) */}
      </svg>
      <div className="mt-2 grid gap-2 px-1" style={{ gridTemplateColumns: `repeat(${labels.length}, 1fr)` }}>
        {labels.map((l) => (
          <span key={l} className="text-center text-[10px] font-mono text-slate-500">
            {l}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-5 text-[11px] text-slate-400">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1 w-5 rounded-full bar-fit" /> Demand Score
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1 w-5 rounded-full bg-slate-500/80" /> Trained Supply
        </span>
      </div>
    </div>
  );
}