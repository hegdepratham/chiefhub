import { getDb } from "@/lib/db";
const db = getDb();

export interface VerificationCode {
  id: number;
  player_tag: string;
  code: string;
  expires_at: string;
}

export function createVerificationCode(
  playerTag: string,
  code: string,
  expiresAt: string
) {
  const stmt = db.prepare(`
    INSERT INTO verification_codes (
      player_tag,
      code,
      expires_at
    )
    VALUES (?, ?, ?)
  `);

  return stmt.run(
    playerTag,
    code,
    expiresAt
  );
}

export function getVerificationCode(
  playerTag: string
) {
  const stmt = db.prepare(`
    SELECT *
    FROM verification_codes
    WHERE player_tag = ?
    ORDER BY id DESC
    LIMIT 1
  `);

  return stmt.get(playerTag) as
    | VerificationCode
    | undefined;
}

export function deleteVerificationCode(
  playerTag: string
) {
  const stmt = db.prepare(`
    DELETE FROM verification_codes
    WHERE player_tag = ?
  `);

  return stmt.run(playerTag);
}