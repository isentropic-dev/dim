# @isentropic/dim-unit

Build type-safe unit systems with scale factors and affine offsets.

> Looking for ready-made SI units? See
> [`@isentropic/dim-si`](https://github.com/isentropic-dev/dim/blob/main/packages/dim-si/README.md).

## Usage

### Define a unit system

Create units by layering a unit system onto a quantity system:

```ts
import { isq, length, temperature, time, velocity } from "@isentropic/dim-isq";
import { defineUnitSystem } from "@isentropic/dim-unit";

const us = defineUnitSystem("myUnits", isq);

// Base units
const meter = us.unit(length);
const second = us.unit(time);
const kelvin = us.unit(temperature);
const meterPerSecond = us.unit(velocity);

// Scaled units
const kilometer = meter.scaled(1000);
const hour = second.scaled(3600);

// Affine units (arbitrary zero point)
const celsius = kelvin.offset(273.15);
```

Use `Linear` and `Affine` from `@isentropic/dim-unit` to define quantity types
for your system. `Linear` is for quantities where zero is absolute (length,
mass, velocity). `Affine` is for quantities where zero is arbitrary (temperature
scales like Celsius and Fahrenheit). This distinction determines which
operations the type system allows — see
[Linear and Affine Units](#linear-and-affine-units) for details.

```ts
import type {
  Length as LengthDim,
  Temperature as TempDim,
} from "@isentropic/dim-isq";
import type { Affine, Linear } from "@isentropic/dim-unit";

type System = typeof us.name;
type Length = Linear<LengthDim, System>;
type Temperature = Affine<TempDim, System>;
```

### Compute with units

Wrap any quantity with `q()` for fluent arithmetic and `.in()` to extract
values:

```ts
import { q } from "@isentropic/dim-unit/chain";

const speed = q(kilometer(100)).div(hour(2)).in(meterPerSecond); // ~13.89
const total = q(kilometer(5)).plus(meter(500)).in(meter); // 5500

// Affine units enforce correct semantics
const tempDiff = q(celsius(100)).minus(celsius(0)).in(kelvin); // 100

// Dimension mismatches are compile errors
q(kilometer(5)).plus(hour(1)); // Error: can't add length and time
```

The free function `valueIn(quantity, unit)` does the same thing outside a chain.
Free functions `add`, `subtract`, `multiply`, `divide`, and `scale` are also
available from `@isentropic/dim-unit/ops`.

## Installation

```bash
# Deno
deno add jsr:@isentropic/dim-unit
# npm
npm install @isentropic/dim-unit
# Bun
bun add @isentropic/dim-unit
```

## Linear and Affine Units

### Linear Units

Linear units have a scale factor relative to a base.

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

| Operation                     | Result | Example                                          |
| ----------------------------- | ------ | ------------------------------------------------ |
| Linear + Linear               | Linear | `add(meter(5), meter(3))` → 8 m                  |
| Linear − Linear               | Linear | `subtract(meter(5), meter(3))` → 2 m             |
| Affine − Affine               | Linear | `subtract(celsius(100), celsius(0))` → 100 K     |
| Affine + Linear               | Affine | `add(celsius(20), celsius.delta(5))` → 25°C      |
| Affine − Linear               | Affine | `subtract(celsius(20), celsius.delta(5))` → 15°C |
| Affine + Affine               | Error  | —                                                |
| scale/multiply/divide(Affine) | Error  | —                                                |

## Fluent API

The `q()` chain tracks linear/affine state at the type level. `QLinear` supports
all operations (`plus`, `minus`, `times`, `div`, `scale`, `in`). `QAffine`
supports only `plus`/`minus` with appropriate types, and `in`. Subtracting two
affine values transitions back to `QLinear`, enabling further arithmetic:

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
