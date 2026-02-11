# JSDoc Audit

Add comprehensive JSDoc (`@module`, `@param`, `@typeParam`, `@returns`,
`@example`) to all public-facing types and functions, following the same
approach used for `dim-quantity`.

## Packages

- [x] `dim-unit` — `defineUnitSystem`, `Linear`, `Affine`, `valueIn`, ops, chain
      API (`q()`), etc.
- [ ] `dim-isq` — generated quantities file, ISQ system exports
- [ ] `dim-si` — SI units, prefixes, accepted units, affine temperature units

## Process

For each package:

1. Read `deno.json` exports to identify public entrypoints
2. Read each source file and catalog public types/functions
3. Note current JSDoc state (missing, one-liner, complete)
4. Go through each item with user, propose docs, apply after approval
5. Run `deno fmt && deno lint && deno test` after changes
6. For generated files, update the generator not the output
