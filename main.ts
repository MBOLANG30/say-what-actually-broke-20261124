import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One line of software error copy for make.fun's "Say What Actually Broke".
// It names the real failure in plain words, tells the user what to do next,
// and lands the joke in a single read.
const ENTRY =
  "The database crashed while saving, so your changes went nowhere. Try again in a minute \u2014 the server is already apologising to itself.";

// Validate: exactly one line, 1-200 characters (counted in code points),
// and not only whitespace.
const codePoints = [...ENTRY];
if (codePoints.length < 1 || codePoints.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${codePoints.length}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
