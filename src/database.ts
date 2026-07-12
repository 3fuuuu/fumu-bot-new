import Database from "better-sqlite3";

const db = new Database("data/bot.db");

db.exec(`
CREATE TABLE IF NOT EXISTS counter(

userId TEXT NOT NULL,

guildId TEXT NOT NULL,

fumu INTEGER DEFAULT 0,

hoon INTEGER DEFAULT 0,

PRIMARY KEY(userId,guildId)

);
`);

export default db;
