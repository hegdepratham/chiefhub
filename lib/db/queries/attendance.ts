import { getDb } from "@/lib/db";

export function saveAttendanceRecord(
  playerTag: string,
  warId: string,
  attacksUsed: number,
  attacksAvailable: number,
  isCwl: boolean
) {
  const db = getDb();

  const stmt = db.prepare(`
    INSERT OR REPLACE INTO attendance_records (
      player_tag,
      war_id,
      attacks_used,
      attacks_available,
      is_cwl
    )
    VALUES (?, ?, ?, ?, ?)
  `);

  return stmt.run(
    playerTag,
    warId,
    attacksUsed,
    attacksAvailable,
    isCwl ? 1 : 0
  );
}

export function getAttendanceRecords(
  playerTag: string
) {
  const db = getDb();

  const stmt = db.prepare(`
    SELECT *
    FROM attendance_records
    WHERE player_tag = ?
    ORDER BY recorded_at DESC
  `);

  return stmt.all(playerTag);
}

export function getAttendanceSummary(
  playerTag: string
) {
  const db = getDb();

  const stmt = db.prepare(`
    SELECT
      SUM(attacks_used) as total_used,
      SUM(attacks_available) as total_available,
      COUNT(*) as wars_participated
    FROM attendance_records
    WHERE player_tag = ?
  `);

  return stmt.get(playerTag);
}