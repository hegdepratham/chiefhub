import { NextResponse } from "next/server";

import { getVerifiedPlayer } from "@/lib/db/queries/verifiedPlayers";
import { startTracking } from "@/lib/db/queries/tracking";

export async function POST(request: Request) {
  try {
    const { playerTag } = await request.json();

    const verifiedPlayer = getVerifiedPlayer(playerTag);

    if (!verifiedPlayer) {
      return NextResponse.json(
        {
          success: false,
          error: "Player is not verified",
        },
        { status: 400 }
      );
    }

    const expiresAt = new Date(
      Date.now() + 14 * 24 * 60 * 60 * 1000
    ).toISOString();

    startTracking(playerTag, expiresAt);

    return NextResponse.json({
      success: true,
      playerTag,
      trackingExpiresAt: expiresAt,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to start tracking",
      },
      { status: 500 }
    );
  }
}