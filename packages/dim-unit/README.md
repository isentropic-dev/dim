# @isentropic/dim-unit

Build type-safe unit systems with scale factors and affine offsets, layered on
`dim-quantity`.

## Installation

```bash
deno add jsr:@isentropic/dim-unit
```

```bash
npx jsr add @isentropic/dim-unit
```

```bash
bunx jsr add @isentropic/dim-unit
```

## Quick Start

```ts
import { defineQuantitySystem } from "@isentropic/dim-quantity";
import { defineUnitSystem, valueIn } from "@isentropic/dim-unit";
import { add, divide, scale, subtract } from "@isentropic/dim-unit/ops";

// Start with a quantity system
const qs = defineQuantitySystem(["L", "T", "Θ"]);
const length = qs.factory({ L: 1, T: 0, Θ: 0 });
const time = qs.factory({ L: 0, T: 1, Θ: 0 });
const temperature = qs.factory({ L: 0, T: 0, Θ: 1 });

// Create a unit system (name is used as type brand)
const us = defineUnitSystem("myUnits", qs);

// Define units
const meter = us.unit(length);
const kilometer = meter.scaled(1000);
const second = us.unit(time);
const hour = second.scaled(3600);
const kelvin = us.unit(temperature);
const celsius = kelvin.offset(273.15);
```

## Units

### Linear Units

Units with only a scale factor produce **Linear** quantities. These support all
arithmetic:

```ts
const d1 = kilometer(5);
const d2 = kilometer(3);
const t = hour(2);

add(d1, d2); // 8 km
subtract(d1, d2); // 2 km
scale(d1, 2); // 10 km
divide(d1, t); // 2.5 km/h

valueIn(d1, meter); // 5000
valueIn(d1, kilometer); // 5
```

### Affine Units

Units with an offset produce **Affine** quantities—points on a scale where zero
is arbitrary:

```ts
const boiling = celsius(100);
const freezing = celsius(0);

valueIn(boiling, kelvin); // 373.15
valueIn(boiling, celsius); // 100

// Subtracting two affine quantities gives a Linear delta
const diff = subtract(boiling, freezing); // 100 K

// Adding a delta to an affine gives Affine
const warmer = add(boiling, celsius.delta(10)); // 110°C

// Invalid operations are compile-time errors
add(boiling, freezing); // Error: can't add two affine quantities
scale(boiling, 2); // Error: can't scale an affine quantity
```

## Chainable Operations

Wrap any quantity with `q()` for a fluent API:

```ts
import { q } from "@isentropic/dim-unit/chain";
import { valueIn } from "@isentropic/dim-unit";

const speed = q(kilometer(5)).div(hour(2));
valueIn(speed, meterPerSecond); // works — chain results are valid quantities

// .in() terminal extracts a number in the given unit
q(kilometer(5)).plus(meter(500)).in(meter); // 5500
```

The chain tracks linear/affine state at the type level. `QLinear` supports all
operations (`plus`, `minus`, `times`, `div`, `scale`, `in`). `QAffine` supports
only `plus`/`minus` with appropriate types, and `in`. Subtracting two affine
values transitions back to `QLinear`, enabling further arithmetic:

```ts
// QAffine → QLinear → QLinear (dimension changes via div)
const rate = q(celsius(100)).minus(celsius(0)).div(second(10));
```

## Defining Units

### Base Units

Create base units from quantity factories:

```ts
const meter = us.unit(length);
const second = us.unit(time);
```

### Scaled Units

Derive scaled units from base or other scaled units:

```ts
const kilometer = meter.scaled(1000);
const centimeter = meter.scaled(0.01);
const hour = second.scaled(3600);

// Chained scaling
const millimeter = centimeter.scaled(0.1);
```

### Affine Units

Add an offset for affine units (like temperature scales):

```ts
const celsius = kelvin.offset(273.15);
const fahrenheit = kelvin.scaled(5 / 9).offset(459.67 * 5 / 9);
```

### Delta Units

Affine units have a `.delta` property for creating temperature differences and
similar:

```ts
const tempRise = celsius.delta(10); // 10 K delta
valueIn(tempRise, celsius.delta); // 10
valueIn(tempRise, kelvin); // 10
```

## Cross-System Safety

Each unit system is branded with its name at the type level. Quantities from
different unit systems cannot be combined:

```ts
const si = defineUnitSystem("si", qs);
const imperial = defineUnitSystem("imperial", qs);

const meter = si.unit(length);
const foot = imperial.unit(length);

add(meter(1), foot(1)); // Compile error: cannot mix "si" and "imperial"
```

This prevents accidental mixing of incompatible unit systems (e.g., one where
the base length is meters vs feet).

## License

MIT
