// app/api/verification/check/route.ts

import { NextResponse } from "next/server";
import { getVerificationCode } from "@/lib/db/queries/verification";

export async function POST(request: Request) {
  const { playerTag } = await request.json();

  const verification = getVerificationCode(playerTag);

  if (!verification) {
    return NextResponse.json(
      { verified: false, reason: "No verification code found" },
      { status: 404 }
    );
  }

  const response = await fetch(
    `https://api.clashofclans.com/v1/players/${encodeURIComponent(playerTag)}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.COC_API_TOKEN}`,
      },
    }
  );

  const player = await response.json();

  return NextResponse.json({
    storedCode: verification.code,
    playerToken: player.apiToken,
    verified: verification.code === player.apiToken,
  });
}