# Changelog

## Unreleased

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
