/**
 * Build a single package for npm using dnt.
 *
 * This script is invoked by build-npm.ts as a subprocess from each package's
 * directory. Using --no-config avoids workspace deno.json interference with
 * dnt's module graph resolution.
 *
 * Expects a JSON config string as the first argument.
 */

// deno-lint-ignore no-import-prefix -- must use inline specifier; runs with --no-config
import { build, type EntryPoint } from "jsr:@deno/dnt@^0.42.3";

interface BuildConfig {
  entryPoints: EntryPoint[];
  mappings: Record<
    string,
    { name: string; version: string; subPath?: string }
  >;
  /** Map of workspace dep names to local npm output dirs (absolute paths). */
  localDeps: Record<string, string>;
  /** Map of workspace dep names to their versions. */
  depVersions: Record<string, string>;
  packageJson: {
    name: string;
    version: string;
    description: string;
    license: string;
    repository: { type: string; url: string };
  };
  licensePath: string;
}

if (!Deno.args[0]) {
  console.error("Usage: _build-npm-package.ts <json-config>");
  Deno.exit(1);
}

let config: BuildConfig;
try {
  config = JSON.parse(Deno.args[0]);
} catch (e) {
  console.error("Failed to parse build config:", e);
  Deno.exit(1);
}

// During build, point workspace deps at local npm output dirs so npm install
// resolves them without hitting the registry. In postBuild, restore real
// versions for publishing.
const localDepOverrides: Record<string, string> = {};
for (const [name, dir] of Object.entries(config.localDeps)) {
  localDepOverrides[name] = `file:${dir}`;
}

await build({
  entryPoints: config.entryPoints,
  outDir: "./npm",
  shims: { deno: "dev" },
  scriptModule: false,
  esModule: true,
  typeCheck: "single",
  declaration: "inline",
  test: true,
  rootTestDir: ".",
  testPattern: "test.ts",
  package: {
    ...config.packageJson,
    // Override workspace deps with local file: references for npm install
    dependencies: Object.keys(localDepOverrides).length > 0
      ? localDepOverrides
      : undefined,
  },
  mappings: config.mappings,
  compilerOptions: {
    lib: ["ES2022"],
  },
  // @std/assert uses ES2025 Set methods (symmetricDifference, union,
  // intersection). These are dev-only deps used in tests, so filtering
  // their diagnostics is safe.
  filterDiagnostic(diagnostic) {
    const fileName = diagnostic.file?.fileName ?? "";
    return !fileName.includes("@std/assert");
  },
  postBuild() {
    Deno.copyFileSync(config.licensePath, "./npm/LICENSE");

    // Restore real version ranges for workspace deps in the published
    // package.json (replace file: references with actual versions)
    if (Object.keys(config.depVersions).length > 0) {
      const pkgJsonPath = "./npm/package.json";
      const pkgJson = JSON.parse(Deno.readTextFileSync(pkgJsonPath));
      if (pkgJson.dependencies) {
        for (const [name, version] of Object.entries(config.depVersions)) {
          if (pkgJson.dependencies[name]) {
            pkgJson.dependencies[name] = `^${version}`;
          }
        }
      }
      Deno.writeTextFileSync(
        pkgJsonPath,
        JSON.stringify(pkgJson, null, 2) + "\n",
      );
    }
  },
});
