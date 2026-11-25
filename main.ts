// The Absurd Clause Contest
//
// The joke: a clause buried in a terms-of-service agreement, written
// in perfect deadpan legal boilerplate — "By continuing to use this
// service, you consent to..." — that quietly turns absurd at the end.
// The company borrows your dreams on weeknights and returns them
// slightly used, like a library book or a rental car. The register
// stays legal throughout; the absurdity is the image, not the wording.
// "Slightly used" is the deadpan kicker: dreams treated as borrowed
// goods, returned with wear and tear like a rental.

import { writeFileSync, readFileSync, mkdirSync } from "node:fs";

const LINE: string =
  "By continuing to use this service, you consent to the company borrowing your dreams on weeknights and returning them slightly used.";

function main(): void {
  // Length gate: the entry line must be 1-200 characters, per the gate.
  if (LINE.length < 1 || LINE.length > 200) {
    throw new Error(`Line length ${LINE.length} is outside the 1-200 gate`);
  }

  mkdirSync("/output", { recursive: true });

  // Write the line with no trailing newline.
  writeFileSync("/output/entry.txt", LINE, "utf8");

  // Read it back and verify it matches exactly.
  const readBack: string = readFileSync("/output/entry.txt", "utf8");
  if (readBack !== LINE) {
    throw new Error("Verification failed: file content does not match the line");
  }
  if (readBack.endsWith("\n")) {
    throw new Error("Verification failed: file must not end with a newline");
  }

  console.log(`Verified: ${readBack.length} characters`);
  console.log(readBack);
}

main();
