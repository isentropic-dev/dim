# ADR 006: Linear/Affine Type-State Distinction

## Status

Accepted

## Context

Physical quantities fall into two categories:

- **Linear (vector-like)**: Differences, rates, and extensible measures. Support
  all arithmetic: add, subtract, multiply, divide, scale. Examples: 5 meters, 10
  kelvin difference, 3 m/s.

- **Affine (point-like)**: Absolute positions on a scale with an arbitrary zero.
  Only meaningful operations are subtracting two points (yielding a linear
  delta) and shifting a point by a linear amount. Examples: 20°C, 0°F.

Without this distinction, the type system permits physically meaningless
operations like adding two absolute temperatures (`celsius(20) + celsius(30)` =
323.15 K + 303.15 K = 626.3 K, which is not 50°C). It also can't express that
subtracting two absolute temperatures produces a fundamentally different kind of
result (a temperature difference, not an absolute temperature).

Alternatives considered:

1. **Everything is linear, temperature is special-cased**: Simpler API, but
   pushes correctness responsibility to the user. Doesn't generalize to other
   affine quantities (gauge pressure, altitude above sea level, etc.).

2. **Separate types with no interop**: Affine and linear as completely disjoint
   hierarchies. Type-safe but forces explicit conversions for operations that
   should compose naturally (e.g., `celsius(20) + kelvin.delta(5)`).

3. **Type-state encoding**: Linear and affine are distinct types, but operations
   return the correct type based on operand combinations. The type system
   encodes the transition rules, and runtime checks enforce them.

## Decision

Introduce `Linear<D, S>` and `Affine<D, S>` as distinct branded types in the
unit layer (`dim-unit`). Both extend `Quantity<D>` from the quantity layer,
which remains unaware of the distinction.

Type-state transitions are enforced at compile time via overloads:

| Operation         | Result      |
| ----------------- | ----------- |
| linear + linear   | linear      |
| linear + affine   | affine      |
| affine + linear   | affine      |
| affine + affine   | **error**   |
| affine - affine   | linear      |
| affine - linear   | affine      |
| linear - linear   | linear      |
| linear - affine   | **error**   |
| multiply / divide | linear only |
| scale             | linear only |

Affine quantities are created by units with a non-zero offset
(`kelvin.offset(273.15)` → celsius). The `_affine` runtime flag distinguishes
them for operations that need dynamic dispatch (the chain API's `q()` wrapper).

The fluent chain API mirrors these transitions with `QLinear` and `QAffine`
wrapper classes — `QAffine` exposes only `plus(linear)`, `minus(linear|affine)`,
and `.in()`, while `QLinear` exposes the full operation set.

```ts
// Affine creation
const celsius = kelvin.offset(273.15);
const temp = celsius(100); // Affine<Temperature, "si">

// Type-state transitions
subtract(celsius(100), celsius(0)); // Linear (delta)
add(celsius(20), celsius.delta(10)); // Affine (shifted point)
add(celsius(20), celsius(30)); // compile error
```

## Consequences

### Positive

- Physically meaningless operations (adding two absolute temperatures) are
  compile-time errors
- Type-state transitions are self-documenting — the return type tells you what
  kind of quantity you have
- Generalizes beyond temperature to any affine quantity
- The `.delta` property on affine units provides a natural way to create linear
  differences in the same scale

### Negative

- Doubles the type surface in the unit layer (Linear/Affine × every operation)
- Chain API requires two wrapper classes with carefully mirrored interfaces
- Runtime `_affine` flag is needed because TypeScript erases type information —
  operations like `subtract` must check at runtime whether the result should be
  affine or linear
- Users must understand the linear/affine distinction to use temperature
  correctly

### Neutral

- The quantity layer (`dim-quantity`) is unaffected — it remains purely
  dimensional with no linear/affine concept
- Affine units cannot derive further scaled or affine units — this prevents
  confusing chains like `celsius.scaled(2)`
