import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "database.sqlite");

let db: Database.Database;

export function getDb() {
  if (!db) {
    db = new Database(dbPath);

    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");

    console.log("Connected to SQLite database");
  }

  return db;
}