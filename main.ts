import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// Alien Field Notes: one alien tourist review of Earth, at most 200 characters.
const LINE =
  "★★★☆☆ Lovely gravity, excellent rain, but the locals queue politely for everything and then apologise to the queue. Would orbit again, mainly for the snacks.";
const MAX_CHARS = 200;

function main(): void {
  // Revision: also reject line breaks and blank text, matching the sealed gate exactly.
  if (LINE.includes("\n") || LINE.trim().length === 0) {
    throw new Error("entry must be a single non-empty line");
  }
  if (LINE.length < 1 || LINE.length > MAX_CHARS) {
    throw new Error(`entry is ${LINE.length} characters, outside 1-${MAX_CHARS}`);
  }
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  const outPath = join(outDir, "entry.txt");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, LINE, "utf8");
}

main();
