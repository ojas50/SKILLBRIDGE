import { NextResponse } from "next/server";
import { getLiveDataset } from "@/lib/live-data";
import {
  EARLY_WARNING_ALERTS,
  POLICY_DECISIONS_DATA,
  CAREER_PATHWAYS_DATA
} from "@/lib/intelligenceData";

export const revalidate = 604800;

export async function GET() {
  const live = await getLiveDataset();
  return NextResponse.json({
    status: "online",
    source: live.source,
    generated_at: live.generated_at,
    courses_tracked: live.stats.courses_tracked,
    skill_gaps_identified: live.stats.skill_gaps_identified,
    critical_deficits_count: live.stats.critical_gaps_count,
    placement_rate: live.stats.placement_rate,
    projected_modernized_placement_rate: "79.0%",
    total_openings: live.stats.total_openings,
    employer_partners: live.stats.employer_partners,
    skills: live.skills,
    courses: live.courses,
    districts: live.districts,
    alerts: EARLY_WARNING_ALERTS,
    policy_actions: POLICY_DECISIONS_DATA,
    pathways: CAREER_PATHWAYS_DATA
  });
}