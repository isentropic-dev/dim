# Development Rules

## First Message

If the user did not give a concrete task, read README.md, then ask which
package(s) to work on. Based on the answer, read the relevant package README.md
files.

## Code Quality

- No `any` types unless absolutely necessary
- Always ask before removing functionality or code that appears intentional
- Check import maps and dependency type definitions instead of guessing
- Review `adr/` for architectural decisions and invariants. Create new ADRs for
  significant design choices with trade-offs worth capturing.
- Read existing scripts, workflows, and config before proposing processes or
  workflows — don't assume, verify
- Type-check README code examples with `deno check` before presenting them
- No "See Also" sections in package READMEs — monorepo root README handles
  cross-linking

## Conventions

- Compound scaled units should use named scaled units when available (e.g.,
  `kilowatt.scale * hour.scale` not `watt.scaled(KILO).scale * hour.scale`)

## Test Patterns

- `// === Setup ===` section only when there's actual setup code beyond imports
- `// === Topic ===` sections to group related tests (e.g.,
  `// === Base Unit Tests ===`)
- Test names: `"category: description"`
- Compile-time type checks in `_compileTimeChecks()` function (not executed)

## Workflow

```bash
deno test       # Run all tests
deno lint       # Lint all files
deno fmt        # Format all files
```

- After code changes (not documentation): run
  `deno fmt && deno lint && deno test`. Get full output — no tail. Fix all
  errors before committing.
- When changing generator code, also run generation tasks to verify end-to-end
  (spec imports are dynamically loaded and not caught by type-checking):
  ```bash
  deno task --cwd packages/dim-quantity generate:exponents
  deno task --cwd packages/dim-isq generate:quantities
  ```
- When writing tests, run them, identify issues in either the test or
  implementation, and iterate until fixed.
- Cover critical business logic with tests when adding new functionality.
- When changes touch `adr/`, verify `adr/README.md` index matches actual files
  (entries present, statuses current).
- When adding/renaming/splitting test files, verify `publish.exclude` in the
  package's `deno.json` still covers them.

## Releasing

All packages use lockstep versioning. Release flow:

1. Prep changelogs — add entries under `## Unreleased` in each package's
   `CHANGELOG.md` (at least one package must have content)
2. Run `deno task release <version>` (e.g. `deno task release 0.1.0`)
   - Validates: on `main`, up to date with origin, tag doesn't exist
   - Allows uncommitted `CHANGELOG.md` changes (staged into release commit);
     rejects all other uncommitted changes
   - Runs fmt/lint/test
   - Stamps changelogs, sets version in each `deno.json`, commits, tags, pushes
3. Tag push triggers `.github/workflows/release.yml`:
   - Runs fmt/lint/test again
   - Creates (or updates) a GitHub Release with combined changelog
   - Publishes each package to JSR in dependency order

Before releasing, run `deno publish --dry-run` to catch export/exclude conflicts
and other publish errors.

For JSR landing pages, use README-first: avoid module docs on a package's
default entrypoint (`exports["."]`) unless intentionally overriding Overview
with module-doc content.

Key files: `scripts/release.ts`, `scripts/publish.ts`,
`scripts/extract-changelog.ts`, `scripts/packages.ts` (single source of truth
for package list and publish order).

### Changelog

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

PRs:

- Analyze PRs without pulling locally first
- If the user approves: create a feature branch, pull PR, rebase on main, apply
  adjustments, commit, merge into main, push, close PR
- Never open PRs yourself — work in feature branches until everything meets
  requirements, then merge into main and push

## Style

- No emojis in commits, issues, PR comments, or code
- Technical prose only — concise, direct, no filler

## **CRITICAL** Tool Usage Rules **CRITICAL**

- NEVER use sed/cat to read a file or a range of a file. Always use the read
  tool (use offset + limit for ranged reads).
- You MUST read every file you modify in full before editing.

## **CRITICAL** Git Rules **CRITICAL**

### Committing

- NEVER commit unless user asks
- ONLY commit files YOU changed in THIS session
- ALWAYS use `git add <specific-file-paths>` — list only files you modified
- Before committing, run `git status` and verify you are only staging YOUR files
- Include `fixes #<number>` or `closes #<number>` in the commit message when
  closing issues

### Forbidden Git Operations

These commands can destroy other agents' work:

- `git reset --hard`
- `git checkout .`
- `git clean -fd`
- `git stash`
- `git add -A` / `git add .`
- `git commit --no-verify`

### If Rebase Conflicts Occur

- Resolve conflicts in YOUR files only
- If conflict is in a file you didn't modify, abort and ask the user
- NEVER force push
