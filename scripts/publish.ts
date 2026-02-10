/**
 * Publish all packages to JSR in dependency order.
 * Skips packages that are already published at the current version.
 * Used by the release workflow.
 *
 * Usage: deno run --allow-read --allow-run scripts/publish.ts
 */

import { PACKAGES } from "./packages.ts";

for (const dir of Object.keys(PACKAGES)) {
  const name = PACKAGES[dir];
  console.log(`Publishing ${name}...`);
  const proc = new Deno.Command("deno", {
    args: ["publish"],
    cwd: dir,
    stdout: "piped",
    stderr: "piped",
  }).spawn();
  const { code, stdout, stderr } = await proc.output();
  const out = new TextDecoder().decode(stdout);
  const err = new TextDecoder().decode(stderr);

  if (code === 0) {
    console.log(`  ✓ Published ${name}`);
    continue;
  }

  // Treat "already published" as success
  if (
    err.includes("already been published") ||
    out.includes("already been published")
  ) {
    console.log(`  ✓ ${name} already published, skipping`);
    continue;
  }

  console.error(out);
  console.error(err);
  console.error(`Failed to publish ${name}`);
  Deno.exit(1);
}
