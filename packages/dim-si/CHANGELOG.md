# Changelog

## Unreleased

## 0.4.2 (2026-02-18)

### Changed

- Added npm and bun install instructions to README

## 0.4.1 (2026-02-17)

### Changed

- Rewrote README with structured Usage section, fluent `q()` API examples, and
  improved onboarding flow

## 0.4.0 (2026-02-13)

### Added

- Exported concrete quantity type aliases (e.g., `Length`, `Mass`, `Power`) for
  annotating function signatures without reaching into lower-level packages
  ([#7](https://github.com/isentropic-dev/dim/issues/7))

## 0.3.0 (2026-02-12)

### Added

- Added thermal conductance units: watt per kelvin and kilowatt per kelvin
  ([#3](https://github.com/isentropic-dev/dim/pull/3))

## 0.2.0 (2026-02-11)

### Breaking Changes

- Removed `./system` export from `deno.json`. Use the root `.` export instead.

### Added

- Added root `.` export (`mod.ts`) as the package entry point and JSR landing
  page.

### Changed

- Added comprehensive JSDoc with `@example` blocks for all public exports.
- Moved internal type aliases to `types.ts` (not part of public API).

## 0.1.1 (2026-02-09)

## 0.1.0 (2026-02-09)

Initial release. Ready-to-use SI units with compile-time dimensional analysis.
