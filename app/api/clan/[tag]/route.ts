import { NextResponse } from "next/server";

import { getClan } from "@/lib/coc-api/clans";

type RouteContext = {
  params: Promise<{
    tag: string;
  }>;
};

export async function GET(
  request: Request,
  context: RouteContext
) {
  try {
    const { tag } = await context.params;

    const clanTag = decodeURIComponent(tag);

    const clan = await getClan(clanTag);

    return NextResponse.json(clan);
  } catch (error) {
    console.error("Clan API Route Error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch clan",
      },
      {
        status: 500,
      }
    );
  }
}