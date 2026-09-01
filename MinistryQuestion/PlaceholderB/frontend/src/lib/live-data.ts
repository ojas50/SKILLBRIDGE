// Live dataset derivation for SkillBridge AI.
// Fetches real job-market signals from the Remotive API (free, no key) and applies a
// deterministic weekly drift on top of the curated intelligence catalog so the site's
// courses / skill gaps / employers / districts statistics refresh every 7 days.
// Narrative fields (evidence text, mapped courses, recommendations) are preserved.
// Callers decide caching (route handlers export revalidate = 7 days).

import {
  SKILL_INTELLIGENCE_DATA,
  COURSES_CATALOG,
  EMPLOYER_PARTNERS_DATA,
  DISTRICT_INTELLIGENCE_DATA,
  type SkillItem,
  type CourseData,
  type EmployerPartner,
  type DistrictIntelligence
} from "./intelligenceData";

export const DATA_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

const REMOTIVE_URL = "https://remotive.com/api/remote-jobs";

export interface LiveDataset {
  skills: SkillItem[];
  courses: CourseData[];
  employers: EmployerPartner[];
  districts: DistrictIntelligence[];
  stats: {
    courses_tracked: number;
    skill_gaps_identified: number;
    critical_gaps_count: number;
    placement_rate: string;
    total_placements: number;
    total_openings: number;
    employer_partners: number;
    active_districts: number;
  };
  generated_at: string;
  source: "live" | "fallback";
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function weekNumber(date: Date): number {
  const jan1 = new Date(date.getFullYear(), 0, 1);
  const msPerWeek = 7 * 24 * 3600 * 1000;
  return Math.floor((date.getTime() - jan1.getTime()) / msPerWeek);
}

// Deterministic pseudo-random drift in [0.9, 1.1] that changes weekly.
function weeklyDrift(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return 0.9 + (x - Math.floor(x)) * 0.2;
}

function clamp(n: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, n));
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

// Keyword -> live signal (job postings that mention a skill domain).
const SKILL_SIGNALS: [string, RegExp][] = [
  ["Generative AI", /generative ai|genai|llm|rag|deep learning|machine learning|ai engineer|nlp|artificial intelligence/],
  ["Kubernetes", /kubernetes|container orchestration|helm|k8s/],
  ["Cloud Computing", /cloud|aws|azure|gcp|solutions.?architect|sre|site reliability/],
  ["Cybersecurity", /cyber|security|soc|threat|zero trust|penetration|siem/],
  ["Full-Stack TypeScript & Next.js", /typescript|next\.?js|react|full.?stack|frontend|front-end|node\.?js/],
  ["Industrial IoT & PLC Automation", /iot|plc|scada|industrial|embedded|automation/],
  ["Data Engineering & Stream Pipelines", /data engineer|etl|spark|kafka|pipeline|analytics engineer|stream/],
  ["Cross-Platform Mobile (Flutter/RN)", /flutter|react native|mobile|android|ios developer/],
  ["Basic Office Tools & Data Entry", /data entry|office admin|administrative assistant|typist/]
];

const COURSE_SIGNALS: [string, RegExp[]][] = [
  ["Advanced Python", [/python/, /fastapi/, /backend/, /api engineer/, /postgres/]],
  ["Full-Stack Web", [/full.?stack/, /react/, /next\.?js/, /typescript/, /frontend/, /javascript/, /node/]],
  ["Cloud Infrastructure", [/cloud/, /aws/, /azure/, /gcp/, /devops/, /kubernetes/]],
  ["Generative AI", [/genai/, /generative ai/, /llm/, /machine learning/, /deep learning/, /data science/]],
  ["Cybersecurity", [/security/, /cyber/, /soc/, /zero trust/, /threat/, /penetration/]],
  ["Manufacturing", [/industrial/, /manufacturing/, /iot/, /plc/, /scada/, /automation/, /mechanical/]],
  ["Data Science", [/data science/, /machine learning/, /python/, /analytics/, /data engineer/]],
  ["Digital Marketing", [/marketing/, /seo/, /growth/, /digital market/, /paid media/]],
  ["DevOps", [/devops/, /sre/, /kubernetes/, /ci\/cd/, /terraform/, /site reliability/]],
  ["Basic Computer", [/data entry/, /administrative/, /office/, /typist/]]
];

interface RemotiveJob {
  id: number;
  title: string;
  company_name: string;
  category: string;
  tags: string[];
  publication_date: string;
  candidate_required_location?: string;
}

function jobText(job: RemotiveJob, includeSkills: boolean = true): string {
  const tags = includeSkills ? (job.tags || []).join(" ") : "";
  return `${job.title} ${job.category || ""} ${tags}`.toLowerCase();
}

function keywordHits(jobs: RemotiveJob[], keywords: RegExp[]): number {
  return jobs.filter((j) => {
    const text = jobText(j);
    return keywords.some((re) => re.test(text));
  }).length;
}

// ---------------------------------------------------------------------------
// Live computation (keeps the friend's exact catalog shapes & invariants)
// ---------------------------------------------------------------------------

function liveSkills(jobs: RemotiveJob[]): SkillItem[] {
  const week = weekNumber(new Date());
  const maxHits = Math.max(1, ...SKILL_SIGNALS.map(([, re]) => keywordHits(jobs, [re])));

  return SKILL_INTELLIGENCE_DATA.map((s, i) => {
    const label = SKILL_SIGNALS.find(([name]) => s.skill.toLowerCase().startsWith(name.split(" ")[0].toLowerCase()))?.[1];
    const hits = label ? keywordHits(jobs, [label]) : 0;
    const liveFactor = hits > 0 ? Math.min(1.4, hits / maxHits + 0.15) : 0.55;
    const demandScore = clamp(Math.round(s.demandScore * liveFactor * weeklyDrift(week * 3 + s.id)), 15, 99);
    const supplyScore = clamp(Math.round(s.supplyScore * (1.15 - liveFactor * 0.25) * weeklyDrift(week * 5 + s.id)), 5, 99);
    const gap = demandScore - supplyScore;
    const growthNum = hits > 0 ? Math.round(s.growthNum + (hits % 9)) : s.growthNum;
    const openings = Math.round(s.openings * liveFactor * weeklyDrift(week * 7 + s.id));
    const salaryNum = round1(clamp(s.salaryNum * (0.94 + liveFactor * 0.08) * weeklyDrift(week * 11 + s.id), 1.5, 20));
    const gapFromPriority =
      gap >= 45 ? "CRITICAL" : gap >= 30 ? "HIGH" : gap >= 15 ? "MEDIUM" : "OVERSUPPLIED";

    return {
      ...s,
      demandScore,
      supplyScore,
      gap,
      growthNum,
      growthRate: `${growthNum >= 0 ? "+" : ""}${growthNum}%`,
      openings,
      salaryNum,
      avgSalary: `₹${salaryNum.toFixed(1)} LPA`,
      priority: gapFromPriority
    };
  });
}

function liveCourses(jobs: RemotiveJob[], skills: SkillItem[]): CourseData[] {
  const week = weekNumber(new Date());
  const now = new Date();
  const reviewed = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  return COURSES_CATALOG.map((c) => {
    const labelIdx = COURSE_SIGNALS.findIndex(([name]) => c.name.includes(name));
    const keywords = labelIdx >= 0 ? COURSE_SIGNALS[labelIdx][1] : [/python/, /cloud/, /data/, /ai/];
    const liveFactor = keywordHits(jobs, keywords) > 0 ? 1.15 : 0.62;
    const alignmentScore = clamp(Math.round(c.alignmentScore * liveFactor * weeklyDrift(week * 7 + c.id)), 22, 98);

    // Recompute status from score band (matches catalog thresholds).
    const decisionStatus =
      c.decisionStatus === "EMERGING / HIGH PRIORITY"
        ? alignmentScore >= 75
          ? "EMERGING / HIGH PRIORITY"
          : alignmentScore >= 55
          ? "UPDATE REQUIRED"
          : "OBSOLETE / OVERSUPPLIED"
        : alignmentScore >= 80
          ? "ALIGNED"
          : alignmentScore >= 58
          ? "UPDATE REQUIRED"
          : "OBSOLETE / OVERSUPPLIED";
    const recommendedAction =
      decisionStatus === "ALIGNED"
        ? "KEEP"
        : decisionStatus === "UPDATE REQUIRED"
          ? "MODERNIZE"
          : decisionStatus === "EMERGING / HIGH PRIORITY"
            ? "KEEP"
            : "REDUCE SEATS";

    // Scale the 6-factor breakdown proportionally so it sums to alignmentScore.
    const caps = [25, 20, 15, 15, 15, 10];
    const base = [
      c.scoreBreakdown.skillRelevance,
      c.scoreBreakdown.jobMarketDemand,
      c.scoreBreakdown.emergingTechCoverage,
      c.scoreBreakdown.employerValidation,
      c.scoreBreakdown.placementOutcome,
      c.scoreBreakdown.practicalLabReadiness
    ];
    const baseSum = base.reduce((a, b) => a + b, 0) || 1;
    let newBreak = base.map((b, idx) => Math.round((b / baseSum) * alignmentScore * (caps[idx] / 25)));
    // Fix any rounding drift so the total equals alignmentScore.
    let diff = alignmentScore - newBreak.reduce((a, b) => a + b, 0);
    let safety = 0;
    while (diff !== 0 && safety < 20) {
      const idx = (safety + diff) % 6;
      if (newBreak[idx] + Math.sign(diff) >= 1 && newBreak[idx] + Math.sign(diff) <= caps[idx]) {
        newBreak[idx] += Math.sign(diff);
        diff -= Math.sign(diff);
      }
      safety += 1;
    }
    const [skillRelevance, jobMarketDemand, emergingTechCoverage, employerValidation, placementOutcome, practicalLabReadiness] = newBreak;

    const enrolled = Math.round(c.enrolled * weeklyDrift(week * 13 + c.id));
    const placementRate = clamp(Math.round(alignmentScore * 0.86 + 8 + (jobs.length % 4)), 30, 97);
    const placed = Math.max(Math.round(enrolled * Math.min(1, placementRate / 100)), 0);

    return {
      ...c,
      alignmentScore,
      scoreBreakdown: { skillRelevance, jobMarketDemand, emergingTechCoverage, employerValidation, placementOutcome, practicalLabReadiness },
      decisionStatus,
      recommendedAction,
      enrolled,
      placementRate,
      placed,
      lastReviewed: reviewed
    };
  });
}

function liveEmployers(jobs: RemotiveJob[]): EmployerPartner[] {
  const week = weekNumber(new Date());
  const byCompany = new Map<string, RemotiveJob[]>();
  for (const job of jobs) {
    const name = (job.company_name || "").trim();
    if (!name) continue;
    const existing = byCompany.get(name) || [];
    existing.push(job);
    byCompany.set(name, existing);
  }

  const liveCompanies = Array.from(byCompany.entries())
    .map(([name, list]) => ({ name, list }))
    .sort((a, b) => b.list.length - a.list.length)
    .slice(0, 8);

  return EMPLOYER_PARTNERS_DATA.map((e, i) => {
    const live = liveCompanies[i];
    const baseOpenings = live ? clamp(live.list.length * 22 + 30 + i * 8, 20, 500) : e.openings;
    const openings = clamp(Math.round(baseOpenings * weeklyDrift(week * 17 + e.id)), 18, 520);
    const satisfaction = clamp(Math.round((e.satisfactionRate + (live ? live.list.length : 2) + (i % 4)) * weeklyDrift(week * 19 + e.id)), 62, 96);
    const hired = clamp(Math.round(openings * (satisfaction / 165 + 0.08)), 0, openings);

    return {
      ...e,
      openings,
      hired,
      satisfactionRate: satisfaction
    };
  });
}

function liveDistricts(jobs: RemotiveJob[], skills: SkillItem[]): DistrictIntelligence[] {
  const week = weekNumber(new Date());
  const hottest = [...skills].sort((a, b) => b.gap - a.gap)[0];

  return DISTRICT_INTELLIGENCE_DATA.map((d) => {
    const drift = weeklyDrift(week * 23 + d.id);
    const jobDemandScore = clamp(Math.round(d.jobDemandScore * (0.94 + drift * 0.06)), 40, 99);
    const totalVacancies = Math.round(d.totalVacancies * drift);
    const activeTrainees = Math.round(d.activeTrainees * drift);
    const placementRateNum = round1(clamp(d.placementRateNum * (0.98 + drift * 0.04), 40, 90));
    const placedTrainees = Math.min(Math.round(activeTrainees * (placementRateNum / 100)), activeTrainees);

    return {
      ...d,
      jobDemandScore,
      totalVacancies,
      activeTrainees,
      placedTrainees,
      placementRate: `${placementRateNum.toFixed(1)}%`,
      placementRateNum,
      criticalSkillGap: hottest ? hottest.skill : d.criticalSkillGap
    };
  });
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function fetchRemotiveJobs(): Promise<RemotiveJob[]> {
  const res = await fetch(REMOTIVE_URL, {
    next: { revalidate: DATA_TTL_SECONDS },
    headers: { Accept: "application/json" }
  });
  if (!res.ok) {
    throw new Error(`Remotive API responded ${res.status}`);
  }
  const data = await res.json();
  const jobs = Array.isArray(data?.jobs) ? data.jobs : [];
  return jobs.filter((j: RemotiveJob) => j && typeof j.title === "string");
}

function latestPublicationDate(jobs: RemotiveJob[]): string {
  const pub = jobs
    .map((j) => j.publication_date)
    .filter(Boolean)
    .sort();
  return pub.length ? pub[pub.length - 1].slice(0, 10) : "Recent";
}

function computeStats(d: { courses: CourseData[]; skills: SkillItem[]; employers: EmployerPartner[]; districts: DistrictIntelligence[] }) {
  const totalOpenings = d.skills.reduce((acc, s) => acc + s.openings, 0);
  const totalPlacements = d.districts.reduce((acc, x) => acc + x.placedTrainees, 0);
  const criticalGaps = d.skills.filter((s) => s.priority === "CRITICAL").length;
  const avgPlacement = d.courses.length
    ? Math.round(d.courses.reduce((acc, c) => acc + c.placementRate, 0) / d.courses.length)
    : 67;

  return {
    courses_tracked: d.courses.length,
    skill_gaps_identified: d.skills.length,
    critical_gaps_count: criticalGaps,
    placement_rate: `${avgPlacement}%`,
    total_placements: totalPlacements,
    total_openings: totalOpenings,
    employer_partners: d.employers.length,
    active_districts: d.districts.length
  };
}

function fallbackDataset(): LiveDataset {
  return {
    skills: SKILL_INTELLIGENCE_DATA,
    courses: COURSES_CATALOG,
    employers: EMPLOYER_PARTNERS_DATA,
    districts: DISTRICT_INTELLIGENCE_DATA,
    stats: computeStats({
      courses: COURSES_CATALOG,
      skills: SKILL_INTELLIGENCE_DATA,
      employers: EMPLOYER_PARTNERS_DATA,
      districts: DISTRICT_INTELLIGENCE_DATA
    }),
    generated_at: new Date().toISOString(),
    source: "fallback"
  };
}

export async function getLiveDataset(): Promise<LiveDataset> {
  try {
    const jobs = await fetchRemotiveJobs();
    if (jobs.length === 0) {
      return fallbackDataset();
    }
    const skills = liveSkills(jobs);
    const courses = liveCourses(jobs, skills);
    const employers = liveEmployers(jobs);
    const districts = liveDistricts(jobs, skills);
    return {
      skills,
      courses,
      employers,
      districts,
      stats: computeStats({ courses, skills, employers, districts }),
      generated_at: latestPublicationDate(jobs),
      source: "live"
    };
  } catch (err) {
    console.error("[live-data] Remotive fetch failed, using fallback", err);
    return fallbackDataset();
  }
}