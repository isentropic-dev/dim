# ADR 009: Per-Quantity Module Exports

## Status

Accepted

## Context

dim-si provides units for 20+ physical quantities (length, mass, time,
temperature, etc.). Each quantity has a base unit and several derived/prefixed
units. The question is how to expose these to consumers.

Approaches considered:

1. **Barrel export**: A single entrypoint re-exports everything. Simple to
   import from (`import { meter, kilogram, second } from "@isentropic/dim-si"`),
   but pulls in every unit definition regardless of what's used. Name collisions
   between quantities are resolved implicitly by export order. As the package
   grows, the barrel becomes a long list of symbols with no grouping.

2. **Per-quantity subpath exports**: Each quantity gets its own module
   (`@isentropic/dim-si/length`, `@isentropic/dim-si/temperature`). Imports are
   explicit about which quantities are in play. Each module is small and
   self-contained.

3. **Hybrid (barrel + subpaths)**: Provide both. Maximizes flexibility but
   creates two ways to import the same symbol, which can cause confusion and
   duplicate-module issues in some bundlers.

## Decision

Use per-quantity subpath exports as the sole import mechanism for units. Each
physical quantity maps to one module in the package's export map:

```ts
import { kilometer, meter } from "@isentropic/dim-si/length";
import { hour, second } from "@isentropic/dim-si/time";
import { celsius, kelvin } from "@isentropic/dim-si/temperature";
```

The package root (`@isentropic/dim-si`) exports only the `si` unit system
instance — not individual units. Operations and the chain API are at
`@isentropic/dim-si/ops`. SI prefix constants are at
`@isentropic/dim-si/prefixes`.

Each per-quantity module follows a consistent structure:

- Module-level JSDoc with a usage example
- Re-exports the dimension type from dim-isq
- Defines the base unit via `si.unit(quantityFactory)`
- Defines scaled/prefixed/affine variants

## Consequences

### Positive

- Imports are self-documenting — the subpath tells you the physical domain
- Each module is small and independently loadable
- No name collision risk — units live in separate namespaces
- Adding a new quantity is additive (new file + new export map entry) with no
  impact on existing imports

### Negative

- Many entries in the `deno.json` export map (30+ and growing)
- Users must know which subpath contains a given unit (though this maps
  naturally to the physical quantity)
- Importing units from several quantities requires multiple import lines

### Neutral

- Bundlers and Deno both resolve subpath exports efficiently
