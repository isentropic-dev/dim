# dim

Deno monorepo for type-safe dimensional analysis.

See [README.md](README.md) for project overview, packages, core concepts, and
philosophy. See package READMEs for API details.

## Commands

```bash
deno test       # Run all tests
deno lint       # Lint all files
deno fmt        # Format all files
deno task --cwd packages/quantity generate:exponents  # Generate exponent types
```

Before committing, run `deno fmt && deno lint && deno test`.

When changing generator code, also run generation tasks to verify end-to-end
(spec imports are dynamically loaded and not caught by type-checking):

```bash
deno task --cwd packages/dim-quantity generate:exponents
deno task --cwd packages/dim-isq generate:quantities
```

## Releasing

All packages use lockstep versioning. Release flow:

1. Prep changelogs — add entries under `## Unreleased` in each package's
   `CHANGELOG.md` (at least one package must have content)
2. Run `deno task release <version>` (e.g. `deno task release 0.1.0`)
   - Validates: on `main`, clean worktree, up to date with origin, tag doesn't
     exist
   - Runs fmt/lint/test
   - Stamps changelogs, sets version in each `deno.json`, commits, tags, pushes
3. Tag push triggers `.github/workflows/release.yml`:
   - Runs fmt/lint/test again
   - Creates (or updates) a GitHub Release with combined changelog
   - Publishes each package to JSR in dependency order

Key files: `scripts/release.ts`, `scripts/publish.ts`,
`scripts/extract-changelog.ts`, `scripts/packages.ts` (single source of truth
for package list and publish order).

## Pre-commit Checks

- When changes touch `adr/`, verify `adr/README.md` index matches actual files
  (entries present, statuses current)
- When adding/renaming/splitting test files, verify `publish.exclude` in the
  package's `deno.json` still covers them

## Project Facts

- Copyright holder: "Isentropic Development"
- Root `deno.json` is workspace-only — publish metadata (license, version, etc.)
  belongs in individual package `deno.json` files

## Conventions

- Cover critical business logic with tests when adding new functionality
- Compound scaled units should use named scaled units when available (e.g.,
  `kilowatt.scale * hour.scale` not `watt.scaled(KILO).scale * hour.scale`)
- Review `adr/` for architectural decisions and invariants

## Test Patterns

- `// === Setup ===` section only when there's actual setup code beyond imports
- `// === Topic ===` sections to group related tests (e.g.,
  `// === Base Unit Tests ===`)
- Test names: `"category: description"`
- Compile-time type checks in `_compileTimeChecks()` function (not executed)

## README Conventions

- When reviewing README sections iteratively, output markdown directly in the
  response so it renders in chat — don't quote-block or use plain text
- Type-check code examples with `deno check` before presenting them

- Skip Installation section until packages are published to JSR
- No "See Also" sections—monorepo root README handles cross-linking

## Architecture Decision Records

See `adr/` for documented architectural decisions. Create new ADRs for
significant design choices that have trade-offs worth capturing.
