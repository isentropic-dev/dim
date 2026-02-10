/**
 * Release script for the dim monorepo.
 *
 * Stamps changelogs, bumps versions, commits, tags, and pushes.
 *
 * Usage: deno task release <version>
 */

import { PACKAGES } from "./packages.ts";

const PACKAGE_DIRS = Object.keys(PACKAGES);

async function main() {
  const version = parseVersion(Deno.args[0]);
  const tag = `v${version}`;
  console.log(`\nPreparing release ${tag}\n`);

  await assertOnMain();
  await assertCleanExceptChangelogs();
  await assertTagAvailable(tag);
  await assertUpToDateWithRemote();
  await assertHasUnreleasedContent();
  await runChecks();
  const filesToStage = await stampAndVersion(version);
  await commitTagPush(tag, filesToStage);

  console.log(`\n✓ Released ${tag}`);
}

// --- Helpers ---

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

function parseVersion(arg: string | undefined): string {
  if (!arg || !/^\d+\.\d+\.\d+$/.test(arg)) {
    die("Usage: deno task release <version>  (e.g. 0.1.0)");
  }
  return arg;
}

// --- Pre-flight checks ---

async function assertOnMain(): Promise<void> {
  const branch = (
    await run(["git", "rev-parse", "--abbrev-ref", "HEAD"], { quiet: true })
  ).trim();
  if (branch !== "main") die(`Must be on 'main', got '${branch}'`);
}

/**
 * Verify the worktree has no uncommitted changes except modified changelogs.
 * Uses NUL-delimited output for robust filename handling.
 */
async function assertCleanExceptChangelogs(): Promise<void> {
  const allowedPaths = new Set(
    PACKAGE_DIRS.map((pkg) => `${pkg}/CHANGELOG.md`),
  );

  const raw = await run(
    [
      "git",
      "status",
      "--porcelain=v1",
      "-z",
      "--no-renames",
      "--untracked-files=all",
    ],
    { quiet: true },
  );
  if (!raw) return;

  // NUL-delimited entries: "XY path\0" (no renames, so always single path)
  const entries = raw.split("\0").filter((e) => e.length > 0);
  const disallowed: string[] = [];

  for (const entry of entries) {
    const xy = entry.slice(0, 2);
    const path = entry.slice(3);
    const isModification = /^[M ][M ]$/.test(xy) && xy !== "  ";
    if (!(isModification && allowedPaths.has(path))) {
      disallowed.push(entry);
    }
  }

  if (disallowed.length > 0) {
    die(
      `Working tree has non-changelog changes:\n${disallowed.join("\n")}\n` +
        "Only packages/*/CHANGELOG.md may be modified before release.",
    );
  }
}

async function assertTagAvailable(tag: string): Promise<void> {
  const tags = (await run(["git", "tag", "-l", tag], { quiet: true })).trim();
  if (tags === tag) die(`Tag ${tag} already exists`);
}

async function assertUpToDateWithRemote(): Promise<void> {
  await run(["git", "fetch", "origin"], { quiet: true });
  const local = (await run(["git", "rev-parse", "HEAD"], { quiet: true }))
    .trim();
  const remote = (
    await run(["git", "rev-parse", "origin/main"], { quiet: true })
  ).trim();
  if (local !== remote) {
    die("Local main is not up to date with origin/main. Pull or push first.");
  }
}

async function assertHasUnreleasedContent(): Promise<void> {
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
    if (section.trim().length > 0) return;
  }
  die("No unreleased changelog content in any package. Nothing to release.");
}

// --- Release steps ---

async function runChecks(): Promise<void> {
  console.log("Running fmt check...");
  await run(["deno", "fmt", "--check"]);
  console.log("Running lint...");
  await run(["deno", "lint"]);
  console.log("Running tests...");
  await run(["deno", "test"]);
}

async function stampAndVersion(version: string): Promise<string[]> {
  const filesToStage: string[] = [];
  console.log("\nUpdating packages...");

  for (const pkg of PACKAGE_DIRS) {
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

    const denoJsonPath = `${pkg}/deno.json`;
    const json = JSON.parse(await Deno.readTextFile(denoJsonPath));
    json.version = version;
    await Deno.writeTextFile(
      denoJsonPath,
      JSON.stringify(json, null, 2) + "\n",
    );
    filesToStage.push(denoJsonPath);

    console.log(`  ${pkg}`);
  }

  return filesToStage;
}

async function commitTagPush(
  tag: string,
  filesToStage: string[],
): Promise<void> {
  console.log("\nCommitting and pushing...");
  await run(["git", "add", ...filesToStage]);
  await run(["git", "commit", "-m", `release: ${tag}`], { quiet: true });
  await run(["git", "tag", "-a", tag, "-m", tag], { quiet: true });
  await run(["git", "push", "--follow-tags"]);
}

// --- Entry point ---

main();
