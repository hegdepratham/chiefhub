import { NextResponse } from "next/server";
import { saveVerifiedPlayer } from "@/lib/db/queries/verifiedPlayers";

export async function POST(request: Request) {
  try {
    const { playerTag, apiToken } = await request.json();

    const url =
      `https://api.clashofclans.com/v1/players/${encodeURIComponent(
        playerTag
      )}/verifytoken`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.COC_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: apiToken,
      }),
    });

    const result = await response.json();

    if (result.status === "ok") {
      saveVerifiedPlayer(
      playerTag,
      playerTag // temporary placeholder for player_name
      );
    }

return NextResponse.json({
  verified: result.status === "ok",
  status: response.status,
  result,
});

    return NextResponse.json({
      verified: result.status === "ok",
      status: response.status,
      result,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        verified: false,
        error: "Verification failed",
      },
      { status: 500 }
    );
  }
}