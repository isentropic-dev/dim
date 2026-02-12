# ADR 008: Dual API — Free Functions and Fluent Chain

## Status

Accepted

## Context

The unit layer needs an API for quantity arithmetic (add, subtract, multiply,
divide, scale) and unit conversion. Two common API styles exist:

1. **Free functions**: Stateless, composable, easy to tree-shake. Natural for
   one-off operations. Can become deeply nested for multi-step expressions:
   `valueIn(divide(add(kilometer(5), meter(500)), hour(2)), meterPerSecond)`.

2. **Fluent chain**: Method chaining on a wrapper object. Reads left-to-right,
   mirrors how people think about sequential operations:
   `q(kilometer(5)).plus(meter(500)).div(hour(2)).in(meterPerSecond)`. Requires
   wrapper types and is harder to tree-shake.

Neither style is strictly better — free functions suit simple expressions and
functional composition, while chains suit multi-step pipelines. Libraries that
commit to one style frustrate users who prefer the other.

A key constraint is interoperability: if the chain API produces wrapper objects
that can't be passed to free functions (or vice versa), users are locked into
one style per expression. This forces awkward unwrapping or re-wrapping at API
boundaries.

## Decision

Provide both APIs. Free functions (`add`, `subtract`, `multiply`, `divide`,
`scale`, `valueIn`) are the primary API in `dim-unit/ops`. The fluent chain
(`q()`, `QLinear`, `QAffine`) is an alternative in `dim-unit/chain`.

The chain wrappers achieve interoperability through structural subtyping — they
declare the same fields as `Linear`/`Affine` (`value`, `_dim?`, `_affine?`,
`_system?`), so TypeScript considers them assignable. No unwrapping needed:

```ts
const wrapped = q(kilometer(5)); // QLinear
const total = add(wrapped, meter(3)); // works — QLinear satisfies Linear
valueIn(wrapped, meter); // works — same reason
```

The chain tracks linear/affine type-state via two classes:

- `QLinear`: exposes `plus`, `minus`, `times`, `div`, `scale`, `in`
- `QAffine`: exposes only `plus(linear)`, `minus(linear|affine)`, `in`

This mirrors the type-state transitions from ADR 006, enforced by which methods
each class exposes rather than by overloads.

## Consequences

### Positive

- Users choose the style that fits their expression without committing globally
- Free functions and chain wrappers interoperate seamlessly via structural
  subtyping — no unwrapping or conversion
- Chain API reads naturally for multi-step computations
- Free functions remain simple and tree-shakeable for one-off operations
- `.in()` terminal on the chain provides a concise alternative to `valueIn`

### Negative

- Two parallel APIs to maintain — every new operation needs both a free function
  and chain method
- Chain wrappers must carefully mirror the field layout of `Linear`/`Affine` to
  maintain structural compatibility
- Two classes (`QLinear`, `QAffine`) duplicate the type-state rules already
  expressed in the free function overloads, though only at the type-declaration
  level — chain methods delegate to free functions for implementation

### Neutral

- Higher-level packages (dim-si) re-export both APIs from a single `/ops` path,
  so users don't need to know which sub-package provides which style
