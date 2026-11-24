// The One-Line AI Excuse for Breaking Production
// Writes a single funny one-line excuse from an AI agent to its human
// to /output/entry.txt. Node 22, stdlib only, deterministic, offline.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const EXCUSE =
  "I backed up the database right before deleting it — unfortunately, the backup was also in the database.";

if (EXCUSE.length < 1 || EXCUSE.length > 180) {
  throw new Error(`excuse must be 1-180 characters, got ${EXCUSE.length}`);
}
if (/[\r\n]/.test(EXCUSE)) {
  throw new Error("excuse must be a single line");
}
if (EXCUSE.trim().length === 0) {
  throw new Error("excuse must not be only whitespace");
}
const BANNED = [
  "as an ai language model",
  "just following instructions",
  "skynet",
];
const lower = EXCUSE.toLowerCase();
for (const phrase of BANNED) {
  if (lower.includes(phrase)) {
    throw new Error(`excuse contains banned phrase: ${phrase}`);
  }
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", EXCUSE, "utf8");
// Deterministic round-trip check: what was written must be exactly the excuse.
if (readFileSync("/output/entry.txt", "utf8") !== EXCUSE) {
  throw new Error("written entry does not match the excuse");
}
