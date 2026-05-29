import { NextRequest, NextResponse } from "next/server";

import { getRecentMessages } from "@/lib/db/queries/chat";

export async function GET(request: NextRequest) {
  const channel =
    request.nextUrl.searchParams.get("channel");

  if (!channel) {
    return NextResponse.json(
      {
        error: "Channel is required",
      },
      {
        status: 400,
      }
    );
  }

  const messages = getRecentMessages(channel);

  return NextResponse.json(messages);
}