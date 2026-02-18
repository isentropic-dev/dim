# Development Rules

## First Message

If the user did not give a concrete task, read README.md, then ask which
package(s) to work on. Based on the answer, read the relevant package README.md
files.

## Critical Rules

### Tool Usage

- NEVER use sed/cat to read a file or a range of a file. Always use the read
  tool (use offset + limit for ranged reads).
- You MUST read every file you modify in full before editing.

### Git

#### Committing

- NEVER commit unless user asks
- ONLY commit files YOU changed in THIS session
- ALWAYS use `git add <specific-file-paths>` — list only files you modified
- Before committing, run `git status` and verify you are only staging YOUR files
- Include `fixes #<number>` or `closes #<number>` in the commit message when
  closing issues

#### Forbidden Operations

These commands can destroy other agents' work:

- `git reset --hard`
- `git checkout .`
- `git clean -fd`
- `git stash`
- `git add -A` / `git add .`
- `git commit --no-verify`

#### Rebase Conflicts

- Resolve conflicts in YOUR files only
- If conflict is in a file you didn't modify, abort and ask the user
- NEVER force push

## Code Quality

- No `any` types unless absolutely necessary
- Always ask before removing functionality or code that appears intentional
- Check import maps and dependency type definitions instead of guessing
- Review `adr/` for architectural decisions and invariants before proposing
  changes to foundational design (type-level mechanics, package structure, API
  patterns). Create new ADRs for significant design choices with trade-offs
  worth capturing.
- Read existing scripts, workflows, and config before proposing new ones
- Type-check README code examples with `deno check` before presenting them
- When removing or changing public exports, grep all packages for downstream
  usage before proposing the change. Run `deno test` after export changes to
  catch cross-package breakage.
- Compound scaled units should use named scaled units when available (e.g.,
  `kilowatt.scale * hour.scale` not `watt.scaled(KILO).scale * hour.scale`)
- No emojis in commits, issues, PR comments, or code
- Technical prose only — concise, direct, no filler
- Package READMEs must not use relative links — use absolute GitHub URLs so
  links work on both GitHub and JSR. Cross-package references should link to the
  other package's GitHub README.

### JSDoc

- All public exports should have comprehensive JSDoc: description, `@typeParam`,
  `@param`, `@returns`, and `@example` blocks where applicable. Module
  entrypoints (`mod.ts`) should have `@module` docs. See `dim-quantity` for
  reference.
- Each package should have a `.` export in `deno.json` pointing to `src/mod.ts`.
  This serves as the JSR documentation landing page — write the `@module` doc to
  introduce the package to new users.
- Files can export types/values for internal use without being listed in
  `deno.json` exports (e.g., `types.ts` in dim-si). Keep these out of the public
  API surface.
- Read source files and function signatures before proposing JSDoc — never guess
  at API shape.
- When writing `@module` or `@example` docs, identify the real consumer use
  cases for the package before drafting examples. If consumers always use the
  package alongside others, show that — don't demonstrate APIs in isolation.
- Match JSDoc language to the package's abstraction level — don't reference
  concepts from higher-level packages
- Plain backticks for cross-entrypoint/cross-package refs — never `{@linkcode}`
  or registry URLs
- All `@example` tags must have a descriptive name

## Test Patterns

- `// === Setup ===` section only when there's actual setup code beyond imports
- `// === Topic ===` sections to group related tests (e.g.,
  `// === Base Unit Tests ===`)
- Test names: `"category: description"`
- Compile-time type checks in `_compileTimeChecks()` function (not executed)

## Workflow

- After code changes: run `deno fmt && deno lint && deno test`. After
  documentation-only changes: run `deno fmt`. Get full output. Fix all errors
  before committing.
- When changing `dim-quantity` generator code, run
  `deno task --cwd packages/dim-quantity generate:exponents` (spec imports are
  dynamically loaded and not caught by type-checking).
- When changing `dim-isq` spec or generator code, run
  `deno task --cwd packages/dim-isq generate:quantities`.
- When writing tests, run them, identify issues in either the test or
  implementation, and iterate until fixed.
- Cover critical business logic with tests when adding new functionality.
- When changes touch `adr/`, verify `adr/README.md` index matches actual files
  (entries present, statuses current).
- When adding test files, add them to `publish.exclude` in the package's
  `deno.json`.
- When adding quantities or units, follow the checklists in CONTRIBUTING.md.

## Releasing

All packages use lockstep versioning. Release flow:

1. Prep changelogs — add entries under `## Unreleased` in each package's
   `CHANGELOG.md` (at least one package must have content). If changelogs are
   empty, check commits since the last tag and draft entries.
2. Run `deno fmt` to fix changelog formatting (the release script runs
   `deno fmt --check` and will reject unformatted files)
3. Run `deno task release <version>` (e.g. `deno task release 0.1.0`)
   - Validates: on `main`, up to date with origin, tag doesn't exist
   - Allows uncommitted `CHANGELOG.md` changes (staged into release commit);
     rejects all other uncommitted changes
   - Runs fmt/lint/test
   - Stamps changelogs, sets version in each `deno.json`, commits, tags, pushes
4. Tag push triggers `.github/workflows/release.yml`:
   - Runs fmt/lint/test again
   - Creates (or updates) a GitHub Release with combined changelog
   - Publishes each package to JSR in dependency order

Before releasing, run `deno publish --dry-run` to catch export/exclude conflicts
and other publish errors.

Key files: `scripts/release.ts`, `scripts/publish-jsr.ts`,
`scripts/publish-npm.ts`, `scripts/extract-changelog.ts`, `scripts/packages.ts`
(single source of truth for package list and publish order).

## Changelog

Each package has its own `CHANGELOG.md`. Use these sections under
`## Unreleased`:

- `### Breaking Changes` — API changes requiring migration
- `### Added` — New features
- `### Changed` — Changes to existing functionality
- `### Fixed` — Bug fixes
- `### Removed` — Removed features

Attribution:

- **Internal changes (from issues)**:
  `Fixed foo bar ([#123](https://github.com/isentropic-dev/dim/issues/123))`
- **External contributions**:
  `Added feature X ([#456](https://github.com/isentropic-dev/dim/pull/456) by [@username](https://github.com/username))`

## GitHub

When reading issues:

- Always read all comments on the issue

When creating issues:

- Add `pkg:*` labels to indicate which package(s) the issue affects
  - Available labels: `pkg:dim-isq`, `pkg:dim-quantity`, `pkg:dim-si`,
    `pkg:dim-unit`
- If an issue spans multiple packages, add all relevant labels

When working on issues:

- Use `gh issue develop <number>` to create a linked feature branch
- After completing a work item tied to an issue checklist, update the issue
  immediately (check the box, update descriptions if needed)

PRs:

- Review PR diffs on GitHub before pulling locally
- If the user approves: create a feature branch, pull PR, rebase on main, apply
  adjustments, commit, merge into main, push, close PR
- Never open PRs yourself — work in feature branches until everything meets
  requirements, then merge into main and push
