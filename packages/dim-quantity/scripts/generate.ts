#!/usr/bin/env -S deno run --allow-read --allow-write

/**
 * Generate a quantity system file from a spec.
 *
 * CLI usage:
 *   deno run --allow-read --allow-write jsr:@isentropic/dim-quantity/generate \
 *     --spec ./quantities.spec.ts \
 *     --out ./src/quantities.generated.ts
 *
 * Programmatic usage:
 *   import { generateQuantitySystem, type QuantitySpec } from "@isentropic/dim-quantity/generate";
 *
 * @module
 */

export {
  defineQuantitySpec,
  generateQuantitySystem,
  type QuantitySpec,
} from "../src/generator.ts";

import { generateQuantitySystem } from "../src/generator.ts";
import { resolve, toFileUrl } from "@std/path";

function printUsage(): void {
  console.log(`Usage: generate --spec <file> --out <file>

Options:
  --spec <file>  Path to the quantity spec file (must export default)
  --out <file>   Path to write the generated file
  --help         Show this help message`);
}

/** Simple arg parser for --key value pairs and --flags. */
function parseArgs(
  argv: string[],
): { spec?: string; out?: string; help: boolean } {
  const result: { spec?: string; out?: string; help: boolean } = {
    help: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      result.help = true;
    } else if (arg === "--spec" && argv[i + 1]) {
      result.spec = argv[++i];
    } else if (arg === "--out" && argv[i + 1]) {
      result.out = argv[++i];
    }
  }
  return result;
}

async function main(): Promise<void> {
  const args = parseArgs(Deno.args);

  if (args.help) {
    printUsage();
    Deno.exit(0);
  }

  if (!args.spec || !args.out) {
    console.error("Error: --spec and --out are required\n");
    printUsage();
    Deno.exit(1);
  }

  const specPath = resolve(Deno.cwd(), args.spec);
  const outPath = resolve(Deno.cwd(), args.out);

  const specUrl = toFileUrl(specPath).href;
  const specModule = await import(specUrl);
  const spec = specModule.default;

  if (!spec) {
    console.error(`Error: ${args.spec} must have a default export`);
    Deno.exit(1);
  }

  const content = generateQuantitySystem(spec);
  await Deno.writeTextFile(outPath, content);

  console.log(`Generated ${args.out}`);
}

main();
