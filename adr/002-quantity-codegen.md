# ADR 002: Code Generation for Quantity Systems

## Status

Accepted (supersedes ADR 001)

## Context

ADR 001 established explicit dimension type definitions for JSR compatibility.
However, this led to duplication:

```ts
// Old approach - dimension spelled out twice
export type Velocity = { L: 1; M: 0; T: -1; I: 0; Θ: 0; N: 0; J: 0 };
export const velocity: QuantityFactory<Velocity> = isq.factory({ L: 1, T: -1 });
```

The type required all 7 exponents, while the factory only needed non-zero ones.
Manual synchronization was error-prone.

## Decision

Generate quantity system files from a declarative spec:

**Spec file** (`quantities.spec.ts`):

```ts
export default {
  name: "isq",
  dims: ["L", "M", "T", "I", "Θ", "N", "J"],
  quantities: {
    base: { length: "L", mass: "M" /* ... */ },
    derived: { velocity: { L: 1, T: -1 }, force: { M: 1, L: 1, T: -2 } },
  },
} satisfies QuantitySpec;
```

**Generated output** (`quantities.generated.ts`):

```ts
type D<T extends Partial<Record<..., Exp>>> = WithDefaults<typeof isq.dims, T>;

/** Velocity (L·T⁻¹) */
export type Velocity = D<{ L: 1, T: -1 }>;
export const velocity: QuantityFactory<Velocity> = isq.factory({ L: 1, T: -1 });
```

The generator:

- Lives in `@isentropic/dim-quantity` for reuse
- Produces a single file with system + all quantities
- Auto-generates doc comments with dimension formulas (e.g., `L·T⁻¹`)
- Uses `WithDefaults` to fill zero exponents at the type level

## Consequences

### Positive

- Single source of truth (spec file)
- No manual synchronization between types and factories
- Compact spec format—only non-zero exponents
- Works for any quantity system, not just ISQ
- JSR-compatible output

### Negative

- Build step required (`deno task generate:quantities`)
- Generated file must be committed (or regenerated in CI)

### Neutral

- Duplication still exists in generated output, but it's automated
- `D<>` helper type keeps generated types readable
