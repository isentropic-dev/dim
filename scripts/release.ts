/**
 * Release script for the dim monorepo.
 *
 * Stamps changelogs, bumps versions, commits, tags, and pushes.
 *
 * Usage: deno task release <version>
 */

import { PACKAGES } from "./packages.ts";

const PACKAGE_DIRS = Object.keys(PACKAGES);

function die(msg: string): never {
  console.error(`Error: ${msg}`);
  Deno.exit(1);
}

async function run(cmd: string[], opts?: { quiet?: boolean }): Promise<string> {
  if (opts?.quiet) {
    const { code, stdout, stderr } = await new Deno.Command(cmd[0], {
      args: cmd.slice(1),
      stdout: "piped",
      stderr: "piped",
    }).output();
    if (code !== 0) {
      die(
        `Command failed: ${cmd.join(" ")}\n${new TextDecoder().decode(stderr)}`,
      );
    }
    return new TextDecoder().decode(stdout);
  }

  const { code } = await new Deno.Command(cmd[0], {
    args: cmd.slice(1),
    stdout: "inherit",
    stderr: "inherit",
  }).output();
  if (code !== 0) {
    die(`Command failed: ${cmd.join(" ")}`);
  }
  return "";
}

function today(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

/** Check if any package has content under ## Unreleased. */
async function hasUnreleasedContent(): Promise<boolean> {
  for (const pkg of PACKAGE_DIRS) {
    const content = await Deno.readTextFile(`${pkg}/CHANGELOG.md`);
    const marker = "## Unreleased";
    const start = content.indexOf(marker);
    if (start === -1) continue;
    const afterMarker = start + marker.length;
    const nextSection = content.indexOf("\n## ", afterMarker);
    const section = nextSection === -1
      ? content.slice(afterMarker)
      : content.slice(afterMarker, nextSection);
    if (section.trim().length > 0) return true;
  }
  return false;
}

// --- Main ---

const version = Deno.args[0];
if (!version || !/^\d+\.\d+\.\d+$/.test(version)) {
  die("Usage: deno task release <version>  (e.g. 0.1.0)");
}

const tag = `v${version}`;
console.log(`\nPreparing release ${tag}\n`);

// Pre-flight checks
const branch =
  (await run(["git", "rev-parse", "--abbrev-ref", "HEAD"], { quiet: true }))
    .trim();
if (branch !== "main") die(`Must be on 'main', got '${branch}'`);

const status = (await run(["git", "status", "--porcelain"], { quiet: true }))
  .trim();
if (status) die(`Working tree not clean:\n${status}`);

const tags = (await run(["git", "tag", "-l", tag], { quiet: true })).trim();
if (tags === tag) die(`Tag ${tag} already exists`);

// Verify local main is up to date with remote
await run(["git", "fetch", "origin"], { quiet: true });
const local = (await run(["git", "rev-parse", "HEAD"], { quiet: true })).trim();
const remote = (await run(["git", "rev-parse", "origin/main"], { quiet: true }))
  .trim();
if (local !== remote) {
  die("Local main is not up to date with origin/main. Pull or push first.");
}

// Verify at least one package has unreleased changelog content
if (!await hasUnreleasedContent()) {
  die("No unreleased changelog content in any package. Nothing to release.");
}

// Run checks
console.log("Running fmt check...");
await run(["deno", "fmt", "--check"]);
console.log("Running lint...");
await run(["deno", "lint"]);
console.log("Running tests...");
await run(["deno", "test"]);

// Stamp changelogs and set versions
const filesToStage: string[] = [];
console.log("\nUpdating packages...");
for (const pkg of PACKAGE_DIRS) {
  // Stamp changelog
  const changelogPath = `${pkg}/CHANGELOG.md`;
  const changelog = await Deno.readTextFile(changelogPath);
  if (!changelog.includes("## Unreleased")) {
    die(`${changelogPath}: missing "## Unreleased" section`);
  }
  await Deno.writeTextFile(
    changelogPath,
    changelog.replace(
      "## Unreleased",
      `## Unreleased\n\n## ${version} (${today()})`,
    ),
  );
  filesToStage.push(changelogPath);

  // Set version
  const denoJsonPath = `${pkg}/deno.json`;
  const json = JSON.parse(await Deno.readTextFile(denoJsonPath));
  json.version = version;
  await Deno.writeTextFile(denoJsonPath, JSON.stringify(json, null, 2) + "\n");
  filesToStage.push(denoJsonPath);

  console.log(`  ${pkg}`);
}

// Commit, tag, push
console.log("\nCommitting and pushing...");
await run(["git", "add", ...filesToStage]);
await run(["git", "commit", "-m", `release: ${tag}`], { quiet: true });
await run(["git", "tag", "-a", tag, "-m", tag], { quiet: true });
await run(["git", "push", "--follow-tags"]);

console.log(`\n✓ Released ${tag}`);
