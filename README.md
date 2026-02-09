# dim

Type-safe dimensional analysis and units for TypeScript.

> **Just want SI?**
> [@isentropic/dim-si](packages/dim-si) provides ready-to-use SI units with compile-time dimension checking.

## How It Works

dim treats quantities and units as separate concepts with different responsibilities.
Units are layered on top of quantities to give them meaning.

A **quantity** encodes dimensionality.
Dimensions are tracked at compile time,
so the type checker catches errors like adding a length to a time
before your code runs.

A **unit** gives meaning to a quantity.
Units are views over quantities:
different lenses for reading and writing the same underlying value.

dim accomplishes this by providing tools for defining quantity and unit systems,
and uses those same tools to provide ready-made ISQ quantities and SI units.

## End-to-End Example

Here's what that looks like in practice: a small physics system with length, time, and temperature.

### 1. Define a quantity system

Choose base dimensions and derive compound quantities from them:

```typescript
import { defineQuantitySystem } from "@isentropic/dim-quantity";

const qs = defineQuantitySystem(["L", "T", "Θ"]);

const length = qs.base("L");
const time = qs.base("T");
const temperature = qs.base("Θ");
const velocity = qs.factory({ L: 1, T: -1, Θ: 0 });
```

At this point, `length(100)` produces a value tagged with dimension `L`.
No units, no scale factors, just dimensionality.

### 2. Layer a unit system on top

Units attach physical meaning to those raw quantities:

```typescript
import { defineUnitSystem, valueIn } from "@isentropic/dim-unit";

const us = defineUnitSystem("tutorial", qs);

// Base units
const meter = us.unit(length);
const second = us.unit(time);
const kelvin = us.unit(temperature);

// Scaled units
const kilometer = meter.scaled(1000);
const hour = second.scaled(3600);

// Affine units (arbitrary zero point)
const celsius = kelvin.offset(273.15);
```

### 3. Use the units to solve problems

Now you have type-safe arithmetic with automatic dimension tracking:

```typescript
import { add, divide, subtract } from "@isentropic/dim-unit/ops";

const distance = kilometer(5);
const duration = hour(2);
const speed = divide(distance, duration);

valueIn(distance, meter);      // 5000
valueIn(distance, kilometer);  // 5

// Same-dimension arithmetic works
add(kilometer(1), meter(500));  // 1500 m

// Dimension mismatches are compile errors
add(distance, duration);
//  ~~~~~~~~  ~~~~~~~~
//  Error: length and time dimensions don't match

// Affine units enforce correct semantics
const boiling = celsius(100);
const freezing = celsius(0);
subtract(boiling, freezing);       // 100 K (linear delta)
add(freezing, celsius.delta(10));  // 10°C (affine point)
add(boiling, freezing);            // Error: can't add two affine quantities
```

## Pre-Built Systems

Defining quantity and unit systems from scratch is useful for custom domains,
but most scientific and engineering work uses the same foundational systems:
the [ISQ](https://en.wikipedia.org/wiki/International_System_of_Quantities) (International System of Quantities)
for dimensions and derived quantities,
and the [SI](https://en.wikipedia.org/wiki/International_System_of_Units) (International System of Units)
for units.

Rather than make everyone define these themselves,
dim uses its own tooling to provide them as ready-to-use packages.

## Packages

| Package | Description |
|---------|-------------|
| **[dim-si](packages/dim-si)** | [SI](https://en.wikipedia.org/wiki/International_System_of_Units) unit system built on dim-isq |
| **[dim-isq](packages/dim-isq)** | [ISQ](https://en.wikipedia.org/wiki/International_System_of_Quantities) quantity system |
| **[dim-unit](packages/dim-unit)** | Define unit systems with scale factors and affine offsets for any quantity system |
| **[dim-quantity](packages/dim-quantity)** | Define quantity systems with compile-time dimension tracking |

## Development

```bash
deno test    # Run all tests
deno lint    # Lint all files
deno fmt     # Format all files
```

## License

MIT
