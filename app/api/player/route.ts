import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(
    "https://api.clashofclans.com/v1/players/%232PP",
    {
      headers: {
        Authorization: `Bearer ${process.env.COC_API_TOKEN}`,
      },
    }
  );

  const data = await response.json();

  return NextResponse.json(data);
}