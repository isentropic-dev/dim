# ADR 007: Layered Package Architecture

## Status

Accepted

## Context

A dimensional analysis library needs to provide several capabilities: dimension
tracking, unit conversion, a standard quantity system (ISQ), and standard units
(SI). The question is how to organize these into packages.

Approaches considered:

1. **Single package**: Everything in one module. Simplest to publish and
   consume, but couples dimension tracking to SI conventions. Users who want
   custom quantity systems or non-SI unit systems must depend on (and tree-shake
   away) everything else.

2. **Two packages (core + SI)**: Separate the engine from the pre-built system.
   Cleaner, but "core" conflates two distinct concerns — the dimensionless
   quantity algebra and the unit-conversion mechanics (scale factors, offsets,
   affine types).

3. **Four packages in a strict dependency chain**: Each layer addresses exactly
   one concern and depends only on the layer below it.

The library's design philosophy — quantities and units are separate concepts —
maps naturally to a layered architecture where each layer adds one capability.

## Decision

Organize the library into four packages with a strict dependency hierarchy:

```
dim-quantity  ←  dim-unit  ←  dim-isq  ←  dim-si
```

Each package has a single responsibility:

- **dim-quantity**: Compile-time dimension tracking. Defines quantity systems,
  phantom-typed quantities, dimension arithmetic (`MulDim`, `DivDim`), and
  exponent types. No concept of units, scale factors, or offsets.

- **dim-unit**: Unit systems with scale factors and affine offsets. Introduces
  `Linear`/`Affine` types, `BaseUnit`/`ScaledUnit`/`AffineUnit`, `valueIn`, and
  the chain API. Depends on dim-quantity for the underlying quantity algebra.

- **dim-isq**: The ISQ quantity system — 7 base dimensions and standard derived
  quantities. Generated from a spec file. Depends on dim-quantity only; has no
  knowledge of units.

- **dim-si**: SI units layered on ISQ. Defines a unit system branded `"si"`,
  with base units, prefixed units, and affine temperature units. Depends on both
  dim-unit (for unit mechanics) and dim-isq (for quantity factories).

Each package can be used independently at its level:

- dim-quantity alone for pure dimensional analysis without units
- dim-unit + dim-quantity for custom unit systems on custom dimensions
- dim-isq + dim-unit for custom unit systems on standard ISQ dimensions
- dim-si for the full ready-to-use SI experience

## Consequences

### Positive

- Each package has a focused API surface with clear boundaries
- Custom quantity systems (non-ISQ) don't depend on ISQ or SI
- Custom unit systems (non-SI) on ISQ dimensions don't depend on SI
- The separation enforces the "quantities and units are separate concepts"
  design principle at the dependency level

### Negative

- Cross-package coordination for releases (mitigated by lockstep versioning)
- Users who just want SI must depend on four transitive packages
- Re-export boilerplate in higher-level packages (e.g., dim-si re-exports
  dim-unit's ops for ergonomic imports)
- Changes to foundational types in dim-quantity ripple through all packages

### Neutral

- The dependency chain is strictly linear (no diamonds), simplifying reasoning
  about version compatibility
