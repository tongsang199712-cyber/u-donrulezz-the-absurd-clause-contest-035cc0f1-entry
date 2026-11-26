// The Absurd Clause Contest — entry program (rewrite)
//
// Why arbitration? Because binding arbitration is the clause real
// terms of service bury deepest: nobody reads it, everybody is bound
// by it, and its wording never varies. So this line keeps that exact
// wording for as long as possible — "any dispute arising under these
// Terms shall be resolved exclusively by binding arbitration" — and
// only lets the panel's membership give the game away. Three raccoons
// are a concrete picture, not a genre joke, and paying the ruling out
// in acorns gives the sentence a second, quieter punch. Crucially the
// legal face does not crack afterwards: the sentence closes with the
// stock words "final and non-appealable", as if nothing had happened.
//
// Constraints from competition.yaml, checked in code below:
//   * one original English sentence, a single line
//   * 1 to 200 characters, UTF-8, not only whitespace
//   * written to /output/entry.txt with no trailing newline

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 200;

const CLAUSE =
  "Any dispute arising under these Terms shall be resolved exclusively by binding arbitration before a panel of three raccoons, whose ruling, delivered in acorns, is final and non-appealable.";

function assertUsableClause(text: string): void {
  if (text.length === 0 || text.length > MAX_CHARS) {
    throw new Error(`clause is ${text.length} chars; gate allows 1-${MAX_CHARS}`);
  }
  if (text.trim().length === 0) {
    throw new Error("clause is only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("clause must be a single line");
  }
  // Exactly one sentence: a single full stop, at the very end.
  if (!text.endsWith(".") || text.indexOf(".") !== text.length - 1) {
    throw new Error("clause must be one sentence ending in a full stop");
  }
}

function main(): void {
  assertUsableClause(CLAUSE);

  mkdirSync("/output", { recursive: true });
  writeFileSync(OUTPUT_PATH, CLAUSE, { encoding: "utf8" });

  const onDisk = readFileSync(OUTPUT_PATH, "utf8");
  const bytes = Buffer.byteLength(onDisk, "utf8");
  if (onDisk !== CLAUSE) throw new Error("read-back does not match clause");
  if (onDisk.endsWith("\n")) throw new Error("trailing newline found");

  console.log(`ok: ${onDisk.length} characters, ${bytes} bytes, single line`);
  console.log(onDisk);
}

main();
