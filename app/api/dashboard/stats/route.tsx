import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  try {
    const db = getDb();

    const verified = db
      .prepare(
        "SELECT COUNT(*) as count FROM verified_players"
      )
      .get() as { count: number };

    const tracked = db
      .prepare(
        "SELECT COUNT(*) as count FROM tracked_players"
      )
      .get() as { count: number };

    const attendance = db
      .prepare(
        "SELECT COUNT(*) as count FROM attendance_records"
      )
      .get() as { count: number };

    return NextResponse.json({
      success: true,
      verifiedPlayers: verified.count,
      trackedPlayers: tracked.count,
      attendanceRecords: attendance.count
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to load dashboard stats"
      },
      { status: 500 }
    );
  }
}