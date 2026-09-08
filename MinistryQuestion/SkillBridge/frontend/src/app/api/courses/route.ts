import { NextResponse } from "next/server";
import { getLiveDataset } from "@/lib/live-data";

export const revalidate = 604800;

export async function GET() {
  const live = await getLiveDataset();
  return NextResponse.json({
    source: live.source,
    generated_at: live.generated_at,
    courses: live.courses,
    total: live.courses.length
  });
}