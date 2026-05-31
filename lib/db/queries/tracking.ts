import { getDb } from "@/lib/db";

export function startTracking(
  playerTag: string,
  expiresAt: string
) {
  const db = getDb();

  const stmt = db.prepare(`
    INSERT OR REPLACE INTO tracked_players
    (
      player_tag,
      tracking_started_at,
      tracking_expires_at,
      last_updated_at
    )
    VALUES
    (
      ?,
      CURRENT_TIMESTAMP,
      ?,
      CURRENT_TIMESTAMP
    )
  `);

  return stmt.run(playerTag, expiresAt);
}

export function getTrackedPlayer(
  playerTag: string
) {
  const db = getDb();

  const stmt = db.prepare(`
    SELECT *
    FROM tracked_players
    WHERE player_tag = ?
  `);

  return stmt.get(playerTag);
}

export function stopTracking(
  playerTag: string
) {
  const db = getDb();

  const stmt = db.prepare(`
    DELETE FROM tracked_players
    WHERE player_tag = ?
  `);

  return stmt.run(playerTag);
}