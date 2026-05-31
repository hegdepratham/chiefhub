import { getDb } from "@/lib/db";

export function saveVerifiedPlayer(
  playerTag: string,
  playerName: string
) {
  const db = getDb();

  const stmt = db.prepare(`
    INSERT OR REPLACE INTO verified_players
    (player_tag, player_name, verified_at)
    VALUES (?, ?, CURRENT_TIMESTAMP)
  `);

  return stmt.run(playerTag, playerName);
}

export function getVerifiedPlayer(playerTag: string) {
  const db = getDb();

  const stmt = db.prepare(`
    SELECT *
    FROM verified_players
    WHERE player_tag = ?
  `);

  return stmt.get(playerTag);
}

export function isPlayerVerified(playerTag: string) {
  const db = getDb();

  const stmt = db.prepare(`
    SELECT 1
    FROM verified_players
    WHERE player_tag = ?
  `);

  return stmt.get(playerTag);
}