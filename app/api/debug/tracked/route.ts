import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  const db = getDb();

  const trackedPlayers = db
    .prepare("SELECT * FROM tracked_players")
    .all();

  return NextResponse.json(trackedPlayers);
}