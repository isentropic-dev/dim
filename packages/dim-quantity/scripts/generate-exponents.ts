#!/usr/bin/env -S deno run --allow-write

import { fromFileUrl, resolve } from "@std/path";

/**
 * Generates exponents.generated.ts with type-level integer arithmetic.
 *
 * Usage: deno run --allow-write scripts/generate-exponents.ts [maxExp]
 *
 * @param maxExp - Maximum exponent value (range will be [-maxExp, maxExp]).
 *                 Defaults to 6. Capped at 12 to avoid TS LSP performance issues.
 */

const MAX_ALLOWED = 12;
const DEFAULT_MAX = 6;

function parseArgs(): number {
  const arg = Deno.args[0];
  if (!arg) return DEFAULT_MAX;

  const n = parseInt(arg, 10);
  if (isNaN(n) || n < 1) {
    console.error(`Invalid argument: ${arg}. Must be a positive integer.`);
    Deno.exit(1);
  }
  if (n > MAX_ALLOWED) {
    console.error(
      `Max exponent ${n} exceeds cap of ${MAX_ALLOWED}. ` +
        `Higher values may cause TS LSP performance issues.`,
    );
    Deno.exit(1);
  }
  return n;
}

function range(max: number): number[] {
  const result: number[] = [];
  for (let i = -max; i <= max; i++) {
    result.push(i);
  }
  return result;
}

function generateExpType(max: number): string {
  const values = range(max).join(" | ");
  return `export type Exp = ${values};`;
}

function generateNegateType(max: number): string {
  const entries = range(max)
    .map((n) => `  [${n}]: ${-n};`)
    .join("\n");
  return `type NegateExp = {\n${entries}\n};`;
}

function generateAddTable(max: number): string {
  const exps = range(max);
  const rows = exps.map((a) => {
    const entries = exps
      .map((b) => {
        const sum = a + b;
        const value = sum < -max || sum > max ? "never" : sum;
        return `    [${b}]: ${value};`;
      })
      .join("\n");
    return `  [${a}]: {\n${entries}\n  };`;
  });
  return `type AddTable = {\n${rows.join("\n")}\n};`;
}

function generate(max: number): string {
  return `/**
 * Type-level integer arithmetic for dimension exponents.
 * Supports the range [${-max}, ${max}]. Operations outside this range resolve to \`never\`.
 *
 * THIS FILE IS GENERATED. DO NOT EDIT DIRECTLY.
 * Run \`deno task generate:exponents\` to regenerate.
 */

/** Valid exponent values. */
${generateExpType(max)}

/** Negate an exponent. */
export type Negate<A extends Exp> = NegateExp[A];

/** Add two exponents. */
export type AddExp<A extends Exp, B extends Exp> = AddTable[A][B];

/** Subtract two exponents. */
export type SubExp<A extends Exp, B extends Exp> = AddExp<A, Negate<B>>;

// Lookup tables for type-level arithmetic

${generateNegateType(max)}

${generateAddTable(max)}
`;
}

async function main() {
  const max = parseArgs();
  const content = generate(max);

  const scriptDir = fromFileUrl(new URL(".", import.meta.url));
  const outPath = resolve(scriptDir, "..", "src", "exponents.generated.ts");

  await Deno.writeTextFile(outPath, content);
  console.log(`Generated exponents.generated.ts with range [${-max}, ${max}]`);
}

main();
