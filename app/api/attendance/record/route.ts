import { NextResponse } from "next/server";
import { saveAttendanceRecord } from "@/lib/db/queries/attendance";

export async function POST(request: Request) {
  try {
    const {
      playerTag,
      warId,
      attacksUsed,
      attacksAvailable,
      isCwl
    } = await request.json();

    saveAttendanceRecord(
      playerTag,
      warId,
      attacksUsed,
      attacksAvailable,
      isCwl
    );

    return NextResponse.json({
      success: true
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to save attendance"
      },
      { status: 500 }
    );
  }
}