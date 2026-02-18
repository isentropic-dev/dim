/**
 * Publish all packages to npm in dependency order.
 * Skips packages that are already published at the current version.
 * Used by the release workflow after `deno task build:npm`.
 *
 * Relies on trusted publishing (OIDC) for authentication — no npm token
 * needed. Provenance attestations are generated automatically.
 *
 * Usage: deno run --allow-read --allow-run scripts/publish-npm.ts
 */

import { join } from "@std/path";
import { PACKAGES } from "./packages.ts";

interface NpmPackageJson {
  version: string;
}

for (const [dir, name] of Object.entries(PACKAGES)) {
  const npmDir = join(dir, "npm");

  const pkgJson: NpmPackageJson = JSON.parse(
    await Deno.readTextFile(join(npmDir, "package.json")),
  );
  const { version } = pkgJson;

  // Check if already published. npm view exits 0 if found, 1 if not found
  // (with E404 in stderr). Any other failure is unexpected — fail fast.
  const view = new Deno.Command("npm", {
    args: ["view", `${name}@${version}`, "version"],
    stdout: "piped",
    stderr: "piped",
  }).spawn();
  const viewResult = await view.output();
  const viewOut = new TextDecoder().decode(viewResult.stdout).trim();
  const viewErr = new TextDecoder().decode(viewResult.stderr);

  if (viewResult.code === 0 && viewOut === version) {
    console.log(`✓ ${name}@${version} already published, skipping`);
    continue;
  }

  if (viewResult.code !== 0 && !/\bE404\b/.test(viewErr)) {
    console.error(
      `npm view ${name}@${version} failed (exit ${viewResult.code}):\n${viewErr}`,
    );
    Deno.exit(1);
  }

  console.log(`Publishing ${name}@${version}...`);
  const proc = new Deno.Command("npm", {
    args: ["publish", "--access", "public", "--provenance"],
    cwd: npmDir,
    stdout: "inherit",
    stderr: "inherit",
  }).spawn();

  const { code } = await proc.output();
  if (code !== 0) {
    console.error(`Failed to publish ${name}`);
    Deno.exit(1);
  }

  console.log(`✓ Published ${name}@${version}`);
}
