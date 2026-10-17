import Database from "better-sqlite3";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "../data/fumu.db");

const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS fumu_counts (
    user_id TEXT PRIMARY KEY,
    count INTEGER NOT NULL DEFAULT 0
  )
`);

export function addFumuCount(userId: string, count: number): void {
  db.prepare(
    `
    INSERT INTO fumu_counts (user_id, count)
    VALUES (?, ?)
    ON CONFLICT(user_id)
    DO UPDATE SET count = count + excluded.count
  `,
  ).run(userId, count);
}

export function getFumuCount(userId: string): number {
  const row = db
    .prepare(
      `
      SELECT count
      FROM fumu_counts
      WHERE user_id = ?
    `,
    )
    .get(userId) as { count: number } | undefined;

  return row?.count ?? 0;
}
