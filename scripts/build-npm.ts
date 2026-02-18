/**
 * Build all packages for npm using dnt.
 *
 * Orchestrates per-package builds in dependency order by spawning a subprocess
 * for each package. This avoids workspace deno.json interfering with dnt's
 * module graph resolution.
 *
 * Must be run from the repository root.
 *
 * Usage: deno task build:npm
 */

// deno-lint-ignore no-import-prefix -- must use inline specifier; runs with --no-config
import { join, resolve, toFileUrl } from "jsr:@std/path@^1.0.8";
import { PACKAGES } from "./packages.ts";

/** Exports to exclude from the npm build. */
const EXCLUDED_EXPORTS = new Set(["./generate"]);

const ROOT = Deno.cwd();

interface DenoJson {
  name: string;
  description: string;
  version: string;
  exports: Record<string, string>;
}

function getOrThrow<K, V>(map: Map<K, V>, key: K, label: string): V {
  const value = map.get(key);
  if (value === undefined) {
    throw new Error(`${label}: key "${String(key)}" not found`);
  }
  return value;
}

async function readDenoJson(dir: string): Promise<DenoJson> {
  return JSON.parse(await Deno.readTextFile(join(dir, "deno.json")));
}

/** Recursively collect all .ts files under a directory. */
async function collectTsFiles(dir: string): Promise<string[]> {
  const files: string[] = [];
  for await (const entry of Deno.readDir(dir)) {
    const path = join(dir, entry.name);
    if (entry.isDirectory) {
      files.push(...await collectTsFiles(path));
    } else if (entry.isFile && entry.name.endsWith(".ts")) {
      files.push(path);
    }
  }
  return files;
}

/**
 * Match `from "@isentropic/..."` specifiers in import/export declarations.
 * Uses `from` keyword with both quote styles. Filters out matches inside
 * line comments (// ...) and JSDoc lines (* ...) by checking the line prefix.
 */
const FROM_PATTERN = /from\s+["'](@isentropic\/[^"']+)["']/g;
const COMMENT_LINE = /^\s*(?:\/\/|\*)/;

/**
 * Scan .ts files in a package dir (src/ + test.ts) for workspace dep imports.
 * Returns a map of dep name -> set of import specifiers used (e.g.,
 * "@isentropic/dim-isq", "@isentropic/dim-isq/ops").
 */
async function findWorkspaceDeps(
  pkgDir: string,
  allPackageNames: Set<string>,
): Promise<Map<string, Set<string>>> {
  const deps = new Map<string, Set<string>>();

  const files = await collectTsFiles(join(pkgDir, "src"));
  try {
    await Deno.stat(join(pkgDir, "test.ts"));
    files.push(join(pkgDir, "test.ts"));
  } catch {
    // No test file
  }

  for (const file of files) {
    const content = await Deno.readTextFile(file);
    const lines = content.split("\n");
    for (const line of lines) {
      if (COMMENT_LINE.test(line)) continue;
      for (const match of line.matchAll(FROM_PATTERN)) {
        const specifier = match[1];
        // Extract package name (first two segments: @scope/name)
        const parts = specifier.split("/");
        const pkgName = `${parts[0]}/${parts[1]}`;
        if (!allPackageNames.has(pkgName)) continue;

        if (!deps.has(pkgName)) {
          deps.set(pkgName, new Set());
        }
        deps.get(pkgName)!.add(specifier);
      }
    }
  }

  return deps;
}

/**
 * Build mappings for workspace dependencies. Maps resolved file URLs to npm
 * package references so dnt emits imports instead of inlining.
 *
 * Only maps exports that are actually imported to avoid dnt's "specifiers
 * were indicated to be mapped but were not found" error.
 */
function buildMappings(
  deps: Map<string, Set<string>>,
  nameToDir: Map<string, string>,
  allPackages: Map<string, DenoJson>,
): Record<string, { name: string; version: string; subPath?: string }> {
  const mappings: Record<
    string,
    { name: string; version: string; subPath?: string }
  > = {};

  for (const [depName, specifiers] of deps) {
    const depDir = getOrThrow(nameToDir, depName, "nameToDir");
    const depJson = getOrThrow(allPackages, depDir, "allPackages");
    const exportsMap = depJson.exports;

    for (const specifier of specifiers) {
      // Determine the export path: "@scope/pkg" -> ".", "@scope/pkg/sub" -> "./sub"
      const subPath = specifier.slice(depName.length); // "" or "/sub"
      const exportPath = subPath === "" ? "." : `.${subPath}`;

      const filePath = exportsMap[exportPath];
      if (!filePath) {
        throw new Error(
          `No export "${exportPath}" found in ${depName}'s deno.json ` +
            `(imported as "${specifier}")`,
        );
      }

      const resolvedUrl = toFileUrl(resolve(depDir, filePath)).href;
      const mapping: { name: string; version: string; subPath?: string } = {
        name: depJson.name,
        version: depJson.version,
      };

      if (exportPath !== ".") {
        mapping.subPath = exportPath.slice(2); // "./ops" -> "ops"
      }

      mappings[resolvedUrl] = mapping;
    }
  }

  return mappings;
}

/**
 * Build maps for workspace dep local paths and versions. Local paths point at
 * previously built npm output dirs for npm install resolution. Versions are
 * passed to the subprocess so postBuild can stamp them directly without reading
 * back from built artifacts.
 */
function buildLocalDepInfo(
  deps: Map<string, Set<string>>,
  nameToDir: Map<string, string>,
  allPackages: Map<string, DenoJson>,
): { localDeps: Record<string, string>; depVersions: Record<string, string> } {
  const localDeps: Record<string, string> = {};
  const depVersions: Record<string, string> = {};
  for (const depName of deps.keys()) {
    const depDir = getOrThrow(nameToDir, depName, "nameToDir");
    const depJson = getOrThrow(allPackages, depDir, "allPackages");
    localDeps[depName] = resolve(depDir, "npm");
    depVersions[depName] = depJson.version;
  }
  return { localDeps, depVersions };
}

// Load all package configs
const allPackages = new Map<string, DenoJson>();
const nameToDir = new Map<string, string>();
for (const dir of Object.keys(PACKAGES)) {
  const json = await readDenoJson(dir);
  allPackages.set(dir, json);
  nameToDir.set(json.name, dir);
}
const allPackageNames = new Set(nameToDir.keys());

// Build each package in dependency order
for (const [dir, name] of Object.entries(PACKAGES)) {
  const json = getOrThrow(allPackages, dir, "allPackages");
  console.log(`\nBuilding ${name}...`);

  // Derive entry points from deno.json exports (relative to package dir)
  const entryPoints: { name: string; path: string }[] = [];
  for (const [exportPath, filePath] of Object.entries(json.exports)) {
    if (EXCLUDED_EXPORTS.has(exportPath)) continue;
    entryPoints.push({ name: exportPath, path: filePath });
  }

  // Only map workspace packages that this package actually imports (not itself)
  const deps = await findWorkspaceDeps(dir, allPackageNames);
  deps.delete(name); // Don't map self-references
  const mappings = buildMappings(deps, nameToDir, allPackages);
  const { localDeps, depVersions } = buildLocalDepInfo(
    deps,
    nameToDir,
    allPackages,
  );

  // Build config to pass to the subprocess
  const config = {
    entryPoints,
    mappings,
    localDeps,
    depVersions,
    packageJson: {
      name: json.name,
      version: json.version,
      description: json.description,
      license: "MIT",
      repository: {
        type: "git",
        url: "git+https://github.com/isentropic-dev/dim.git",
      },
    },
    licensePath: join(ROOT, "LICENSE"),
  };

  // Spawn dnt in the package directory to avoid workspace deno.json interference.
  const pkgAbsDir = join(ROOT, dir);
  const depth = dir.split("/").length;
  const segments = Array.from({ length: depth }, () => "..");
  const helperRelative = join(
    segments.join("/"),
    "scripts",
    "_build-npm-package.ts",
  );
  const proc = new Deno.Command("deno", {
    args: [
      "run",
      "-A",
      "--no-config",
      helperRelative,
      JSON.stringify(config),
    ],
    cwd: pkgAbsDir,
    stdout: "inherit",
    stderr: "inherit",
  }).spawn();

  const { code } = await proc.output();
  if (code !== 0) {
    console.error(`Failed to build ${name}`);
    Deno.exit(1);
  }

  console.log(`Done: ${name}`);
}
