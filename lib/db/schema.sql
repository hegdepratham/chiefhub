PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS players (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  player_tag TEXT UNIQUE NOT NULL,
  player_name TEXT NOT NULL,
  townhall_level INTEGER,
  role TEXT,
  is_verified INTEGER DEFAULT 0,
  tracking_expires_at TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS chat_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  channel TEXT NOT NULL,
  player_tag TEXT NOT NULL,
  player_name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS attendance_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  war_id TEXT NOT NULL,
  player_tag TEXT NOT NULL,
  attacks_used INTEGER DEFAULT 0,
  attacks_available INTEGER DEFAULT 2,
  stars_earned INTEGER DEFAULT 0,
  destruction_percent REAL DEFAULT 0,
  is_cwl INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS verified_players (
  id INTEGER PRIMARY KEY AUTOINCREMENT,

  player_tag TEXT NOT NULL UNIQUE,
  player_name TEXT NOT NULL,

  verified_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_players_tag
ON players(player_tag);

CREATE INDEX IF NOT EXISTS idx_chat_channel
ON chat_messages(channel);

CREATE INDEX IF NOT EXISTS idx_attendance_player
ON attendance_records(player_tag);

CREATE INDEX IF NOT EXISTS idx_verified_players_tag
ON verified_players(player_tag);