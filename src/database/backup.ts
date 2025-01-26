import { copyFile } from "node:fs/promises";

const dbPath = `${import.meta.url
	.replace("file:///", "")
	.replace("backup.ts", "")}etarn.db`;

export default async function backup() {
	await copyFile(dbPath, `${dbPath}.backup`);
}
