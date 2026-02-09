# ADR 001: Explicit Dimension Types for JSR Compatibility

## Status

Superseded by [ADR 002](./002-quantity-codegen.md)

## Context

When defining quantity factories in `packages/isq`, we need to export both:

1. The factory function (e.g., `velocity`)
2. The dimension type (e.g., `Velocity`)

The `@isentropic/dim-quantity` package provides `DimOf<T>` to extract dimension
types from factories, which would allow a DRY pattern:

```ts
const velocity = isq.factory({ L: 1, T: -1 });
export type Velocity = DimOf<typeof velocity>;
export { velocity };
```

However, JSR's `no-slow-types` rule requires explicit type annotations on all
public API symbols. When a type references `typeof someValue`, JSR traces
through to that value and requires it to have an explicit type annotation—even
if the value itself isn't directly exported.

We explored several workarounds:

- **Separate internal file**: JSR still traces through `typeof` references
- **Underscore-prefixed private variables**: Same issue
- **`BaseDim`/`WithDefaults` type helpers**: Works but adds complexity without
  eliminating duplication

## Decision

Use explicit dimension type definitions alongside factory declarations:

```ts
export type Velocity = { L: 1; M: 0; T: -1; I: 0; Θ: 0; N: 0; J: 0 };
export const velocity: QuantityFactory<Velocity> = isq.factory({ L: 1, T: -1 });
```

For base dimensions, use `isq.base()` for cleaner factory calls:

```ts
export type Length = { L: 1; M: 0; T: 0; I: 0; Θ: 0; N: 0; J: 0 };
export const length: QuantityFactory<Length> = isq.base("L");
```

## Consequences

### Positive

- Full JSR compatibility with fast type generation
- Types are explicit and self-documenting
- No runtime overhead
- Users can still use `DimOf` in their own (non-JSR-published) code

### Negative

- Dimension signatures are duplicated (type definition + factory call)
- Manual synchronization required when adding/modifying quantities

### Neutral

- `DimOf` remains useful for end-users defining custom quantities
- The `base()` helper still reduces boilerplate for base dimension factories
