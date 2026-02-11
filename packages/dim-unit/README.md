# @isentropic/dim-unit

Build type-safe unit systems with scale factors and affine offsets, layered on
`dim-quantity`.

## Installation

```bash
# Deno
deno add jsr:@isentropic/dim-unit
# npm
npx jsr add @isentropic/dim-unit
# Bun
bunx jsr add @isentropic/dim-unit
```

## Quick Start

```ts
import { isq, length, temperature, time, velocity } from "@isentropic/dim-isq";
import { defineUnitSystem, valueIn } from "@isentropic/dim-unit";
import { divide, subtract } from "@isentropic/dim-unit/ops";

// isq is a pre-defined quantity system from dim-isq
const us = defineUnitSystem("myUnits", isq);

// Define units
const meter = us.unit(length);
const second = us.unit(time);
const kelvin = us.unit(temperature);
const meterPerSecond = us.unit(velocity);

const kilometer = meter.scaled(1000);
const hour = second.scaled(3600);
const celsius = kelvin.offset(273.15);

// Use them
const speed = divide(kilometer(100), hour(2));
const tempDiff = subtract(celsius(100), celsius(0));

valueIn(speed, meterPerSecond); // ~13.89
valueIn(tempDiff, kelvin); // 100
```

## Units

### Linear Units

Linear units have a scale factor relative to a base. All arithmetic operations
work on linear quantities: addition, subtraction, multiplication, division, and
scaling.

**Base units** are created from quantity factories with a scale of 1:

```ts
const meter = us.unit(length);
const second = us.unit(time);
const kelvin = us.unit(temperature);
```

**Scaled units** are derived from base or other scaled units:

```ts
const kilometer = meter.scaled(1000);
const centimeter = meter.scaled(0.01);
const millimeter = centimeter.scaled(0.1); // chained scaling
const hour = second.scaled(3600);
```

Linear quantities support all arithmetic and unit conversion:

```ts
const d1 = kilometer(5);
const d2 = kilometer(3);
const t = hour(2);

add(d1, d2); // 8 km
subtract(d1, d2); // 2 km
multiply(d1, d2); // 15 km²
scale(d1, 2); // 10 km
divide(d1, t); // 2.5 km/h

valueIn(d1, meter); // 5000
valueIn(d1, kilometer); // 5
```

### Affine Units

Affine units add an offset to a linear unit, representing scales where zero is
arbitrary (like temperature). This restricts which operations are valid.

Create affine units with `.offset()`:

```ts
const celsius = kelvin.offset(273.15);
const fahrenheit = kelvin.scaled(5 / 9).offset(459.67 * 5 / 9);
```

Affine quantities support conversion and subtraction:

```ts
const boiling = celsius(100);
const freezing = celsius(0);

valueIn(boiling, kelvin); // 373.15
valueIn(boiling, celsius); // 100

subtract(boiling, freezing); // 100 K (linear)
```

Operations that don't make physical sense are compile-time errors:

```ts
add(boiling, freezing); // Error: can't add two affine quantities
scale(boiling, 2); // Error: can't scale an affine quantity
```

Use `.delta` to create linear differences in an affine unit's scale. Deltas
restore full arithmetic with affine quantities:

```ts
const tempRise = celsius.delta(10); // 10 K delta
valueIn(tempRise, celsius.delta); // 10
valueIn(tempRise, kelvin); // 10

add(boiling, celsius.delta(10)); // 110°C (affine)
subtract(boiling, celsius.delta(10)); // 90°C (affine)
```

The full set of linear/affine interactions:

| Operation                     | Result   | Example                                          |
| ----------------------------- | -------- | ------------------------------------------------ |
| Linear + Linear               | Linear   | `add(meter(5), meter(3))` → 8 m                  |
| Linear − Linear               | Linear   | `subtract(meter(5), meter(3))` → 2 m             |
| Affine − Affine               | Linear   | `subtract(celsius(100), celsius(0))` → 100 K     |
| Affine + Linear               | Affine   | `add(celsius(20), celsius.delta(5))` → 25°C      |
| Affine − Linear               | Affine   | `subtract(celsius(20), celsius.delta(5))` → 15°C |
| Affine + Affine               | ❌ Error | —                                                |
| scale/multiply/divide(Affine) | ❌ Error | —                                                |

## Chainable Operations

Wrap any quantity with `q()` for a fluent API:

```ts
import { q } from "@isentropic/dim-unit/chain";

// .in() terminal extracts a number in the given unit
q(kilometer(5)).plus(meter(500)).in(meter); // 5500
q(kilometer(5)).plus(meter(500)).in(kilometer); // 5.5
```

The chain tracks linear/affine state at the type level. `QLinear` supports all
operations (`plus`, `minus`, `times`, `div`, `scale`, `in`). `QAffine` supports
only `plus`/`minus` with appropriate types, and `in`. Subtracting two affine
values transitions back to `QLinear`, enabling further arithmetic:

```ts
// QAffine → QLinear → QLinear (dimension changes via div)
const rate = q(celsius(100)).minus(celsius(0)).div(second(10));
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
