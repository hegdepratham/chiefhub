import { getDb } from "@/lib/db";

export interface ChatMessage {
  id: number;
  player_tag: string;
  player_name: string;
  channel: string;
  message: string;
  created_at: string;
}

export function getRecentMessages(channel: string): ChatMessage[] {
  const db = getDb();

  return db
    .prepare(
      `
      SELECT *
      FROM chat_messages
      WHERE channel = ?
      ORDER BY created_at ASC
      LIMIT 50
      `
    )
    .all(channel) as ChatMessage[];
}

export function insertMessage(
  playerTag: string,
  playerName: string,
  channel: string,
  message: string
) {
  const db = getDb();

  const result = db
    .prepare(
      `
      INSERT INTO chat_messages (
        player_tag,
        player_name,
        channel,
        message
      )
      VALUES (?, ?, ?, ?)
      `
    )
    .run(
      playerTag,
      playerName,
      channel,
      message
    );

  enforceMessageCap(channel);

  return result;
}

export function enforceMessageCap(channel: string) {
  const db = getDb();

  db.prepare(
    `
    DELETE FROM chat_messages
    WHERE id NOT IN (
      SELECT id
      FROM chat_messages
      WHERE channel = ?
      ORDER BY created_at DESC
      LIMIT 50
    )
    AND channel = ?
    `
  ).run(channel, channel);
}