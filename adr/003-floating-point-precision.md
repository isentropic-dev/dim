# ADR 003: Floating Point Precision and Base Unit Storage

## Status

Accepted

## Context

Quantities in this system store values in base SI units (meters, kilograms,
seconds, etc.). This normalization simplifies arithmetic—all operations work on
a common representation without unit conversion during computation.

However, IEEE 754 double-precision floats provide only ~15-17 significant
decimal digits. When working at extreme scales, storing in base units can reduce
available precision:

| Value        | Stored as | Precision impact      |
| ------------ | --------- | --------------------- |
| 1 nanometer  | 1e-9 m    | 6-8 digits remaining  |
| 1 femtometer | 1e-15 m   | 0-2 digits remaining  |
| 1 light-year | 9.46e15 m | precision to ~1 meter |

Users working with subatomic physics or cosmological scales may encounter
precision limits sooner than expected.

Alternative approaches considered:

1. **Optional unit tracking**: Store values in their "natural" unit and
   normalize only when needed. This significantly complicates arithmetic (what
   unit does `add(nanometer(1), picometer(500))` produce?) and breaks the
   uniform quantity representation.

2. **Domain-specific base units**: Use millimeters instead of meters, etc. This
   breaks SI conventions and creates confusion about what the "base" actually
   is.

3. **Arbitrary precision numerics**: Support pluggable numeric types (e.g.,
   `Decimal`). Adds significant complexity and dependencies.

## Decision

We will store all quantities in base SI units using JavaScript's native `number`
type (IEEE 754 double).

Precision limitations will be documented. Users with extreme precision
requirements should:

1. Work in natural units (e.g., keep values as nanometers) and convert only at
   display time using `valueIn()`
2. Use dedicated arbitrary-precision libraries outside this system for
   computations requiring more than ~15 significant digits

This aligns with the project's core philosophy: **keep it simple**.

## Consequences

### Positive

- Uniform quantity representation—all quantities are just
  `{ value: number, dims: {...} }`
- Arithmetic is straightforward—no unit normalization logic
- Predictable behavior—same rules apply to all quantities
- Minimal runtime overhead—native JS numbers, no wrapper objects

### Negative

- Users at extreme scales (femtometers, light-years) must be aware of precision
  limits
- No built-in path to arbitrary precision for users who need it
- Subtracting very close large values suffers from cancellation error

### Neutral

- This is a fundamental limitation of floating-point arithmetic, not unique to
  this library
- Scientific computing libraries face the same trade-off and most choose the
  same approach
