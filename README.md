# dim

Type-safe dimensional analysis for TypeScript.

**Most users should start with [@isentropic/dim-si](packages/dim-si)**,
which provides ready-to-use SI units with compile-time dimension checking.

## Philosophy

- **Compile-time safety**:
  Dimension errors are caught by the type checker, not at runtime.
- **Layered design**:
  Quantities (dimensions) and units (scale factors) are separate concerns.
- **Minimal runtime**:
  Values are just numbers; dimensions are phantom types.
  Full type safety with zero runtime overhead.
- **Functional style**:
  Pure functions, no mutation, explicit operations like `add` and `divide`.
  Code is predictable and easy to test.

## Core Concepts

A **quantity** is a value with dimensions, like length, time, or velocity.
Dimensions are tracked at compile time;
the type system catches errors like adding meters to seconds before your code runs.

A **unit** gives meaning to a quantity value through a scale factor.
A unit system defines base units for each dimension
(SI uses meter for length, kilogram for mass, etc).
Quantities are stored in base units internally, so `kilometer(5)` stores `5000` (meters).
Units are essentially different views of the same underlying quantity.

**Linear** units measure from true zero.
Zero meters is no distance.
**Affine** units measure from an arbitrary zero.
Zero Celsius is not "no temperature."
This distinction determines which operations are valid;
you can't add two temperatures, but you can subtract them to get a temperature difference.

See the [dim-si README](packages/dim-si) for detailed examples.

## Packages

| Package | Description |
|---------|-------------|
| **[dim-si](packages/dim-si)** | SI units with compile-time dimension checking (built with dim-unit on dim-isq) |
| **[dim-isq](packages/dim-isq)** | ISQ dimension system (built with dim-quantity) |
| **[dim-unit](packages/dim-unit)** | Define unit systems with scale factors and affine offsets for a quantity system |
| **[dim-quantity](packages/dim-quantity)** | Define quantity systems with compile-time dimension tracking |

## Development

```bash
deno test    # Run all tests
deno lint    # Lint all files
```

## License

MIT
