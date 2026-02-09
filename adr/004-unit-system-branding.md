# ADR 004: Unit System Branding for Cross-System Safety

## Status

Accepted

## Context

Quantities from different unit systems should not be combinable.
If one system uses meters as the base length unit and another uses feet,
adding `meter(1)` to `foot(1)` produces meaningless results (value of 2 in
neither meters nor feet).

The question was where to enforce this:

1. **Quantity layer** (`dim-quantity`): Brand the dimension type with a system
   identity
2. **Unit layer** (`dim-unit`): Brand `Linear`/`Affine` types with the unit
   system identity

We chose the unit layer because:

- The quantity layer is purely dimensional—it doesn't know about units
- The unit system is where "1 base unit = 1 meter" vs "1 base unit = 1 foot"
  gets defined
- Keeping quantity types simple aids reuse across unit systems that share the
  same underlying quantity system

## Decision

Brand unit-layer types (`Linear<D, S>`, `Affine<D, S>`) with the unit system
name.
Use TypeScript's `NoInfer<S>` on operation parameters to prevent type widening.

```ts
// Unit system takes a name that becomes the type brand
const si = defineUnitSystem("si", isq);
const imperial = defineUnitSystem("imperial", isq);

// Operations use NoInfer to force exact brand matching
function add<D, S extends string>(
  a: Linear<D, S>,
  b: Linear<D, NoInfer<S>>,  // S inferred from first arg only
): Linear<D, S>;
```

Without `NoInfer`, TypeScript would unify `"si"` and `"imperial"` to their
common supertype `string`, allowing cross-system operations.

## Consequences

### Positive

- Cross-system operations are compile-time errors
- Unit systems are self-documenting (name visible in type)
- Quantity layer remains simple and reusable

### Negative

- Users must provide a name when defining unit systems
- Reusing names across unit systems defeats the protection (user error, not
  system flaw)

### Neutral

- Requires TypeScript 5.4+ for `NoInfer` (ships with Deno 1.41+)
