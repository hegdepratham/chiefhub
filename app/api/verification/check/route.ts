import { NextResponse } from "next/server";

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