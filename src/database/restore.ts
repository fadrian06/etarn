import { copyFile, unlink } from "node:fs/promises";

const dbPath = `${import.meta.url
	.replace("file:///", "")
	.replace("restore.ts", "")}etarn.db`;

export default async function restore() {
	await unlink(dbPath);
	await copyFile(`${dbPath}.backup`, dbPath);
}
