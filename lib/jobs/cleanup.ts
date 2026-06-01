import { getDb } from "@/lib/db";

export function cleanupExpiredData() {
  const db = getDb();

  const trackingResult = db
    .prepare(`
      DELETE FROM tracked_players
      WHERE tracking_expires_at < CURRENT_TIMESTAMP
    `)
    .run();

  const verificationResult = db
    .prepare(`
      DELETE FROM verification_codes
      WHERE expires_at < CURRENT_TIMESTAMP
    `)
    .run();

  console.log(
    `[Cleanup] Removed ${trackingResult.changes} tracking records and ${verificationResult.changes} verification records`
  );
}