import { NextResponse } from "next/server";
import { getAttendanceSummary } from "@/lib/db/queries/attendance";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const playerTag = searchParams.get("playerTag");

    if (!playerTag) {
      return NextResponse.json(
        {
          success: false,
          error: "playerTag is required",
        },
        { status: 400 }
      );
    }

    const summary = getAttendanceSummary(playerTag) as {
        total_used: number;
        total_available: number;
        wars_participated: number;
    } | undefined;

    const totalUsed = summary?.total_used ?? 0;
    const totalAvailable = summary?.total_available ?? 0;

    const attendancePercentage =
      totalAvailable > 0
        ? (totalUsed / totalAvailable) * 100
        : 0;

    return NextResponse.json({
      success: true,
      playerTag,
      warsParticipated:
        summary?.wars_participated ?? 0,
      totalUsed,
      totalAvailable,
      attendancePercentage,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to load attendance summary",
      },
      { status: 500 }
    );
  }
}