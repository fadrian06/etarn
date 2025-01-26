import sqlite3 from "sqlite3";

const dbPath = `${import.meta.url
	.replace("file:///", "")
	.replace("db.ts", "")}etarn.db`;

const db = new sqlite3.Database(dbPath);

export default db;
