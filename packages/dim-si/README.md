# @isentropic/dim-si

Type-safe SI units with compile-time dimensional analysis.

The [SI](https://en.wikipedia.org/wiki/International_System_of_Units)
(International System of Units) is the modern metric system. This package
provides SI units built on `dim-isq` quantities, with full support for unit
conversions, prefixes, and affine units like temperature scales.

## Quick Start

```typescript
import { kilometer, meter } from "@isentropic/dim-si/length";
import { hour } from "@isentropic/dim-si/time";
import { meterPerSecond } from "@isentropic/dim-si/velocity";
import { celsius, kelvin } from "@isentropic/dim-si/temperature";
import { q, valueIn } from "@isentropic/dim-si/ops";

// Fluent chaining with q()
const speed = q(kilometer(100)).div(hour(2));
valueIn(speed, meterPerSecond); // 13.89

// Mix units freely—dimensions are tracked at compile time
const total = q(kilometer(5)).plus(meter(500)); // 5500 m

// Dimension mismatches are compile errors
q(kilometer(5)).plus(hour(1)); // Error: can't add length and time

// Temperature with affine units
q(celsius(100)).in(kelvin); // 373.15

// Subtracting temperatures yields a linear delta, enabling further ops
const rate = q(celsius(100)).minus(celsius(20)).div(hour(1));

// Temperature differences use .delta
const warmer = q(celsius(20)).plus(celsius.delta(5)); // 25°C
```

Free functions (`add`, `subtract`, `multiply`, `divide`, `scale`) are also
available for one-off operations:

```typescript
import { add, divide, valueIn } from "@isentropic/dim-si/ops";

const total = add(kilometer(5), meter(500));
const speed = divide(kilometer(100), hour(2));
```

## Core Concepts

### Quantities

A **quantity** is a value with dimensions—like length, time, or velocity. In
dim, quantities are numbers tagged with their dimensional signature at compile
time. The type system tracks dimensions through arithmetic, catching errors like
adding meters to seconds before your code runs.

```typescript
import { kilometer } from "@isentropic/dim-si/length";
import { hour } from "@isentropic/dim-si/time";
import { q } from "@isentropic/dim-si/ops";

const distance = kilometer(100); // Quantity with dimension Length
const time = hour(2); // Quantity with dimension Time
const speed = q(distance).div(time); // → dimension Length/Time (velocity)

// Dimension mismatch is a compile error
q(distance).plus(time); // Error: can't add length and time
```

### Units

**Units** give meaning to quantity values. A quantity value of `1000` means
nothing until you know whether it's 1000 meters or 1000 kilometers.

Units have a **scale factor** relating them to a base unit. Creating a quantity
with a unit stores the value in base units internally:

```typescript
import { kilometer, meter } from "@isentropic/dim-si/length";
import { valueIn } from "@isentropic/dim-si/ops";

const d = kilometer(5); // Internally: 5000 (meters)
valueIn(d, meter); // 5000
valueIn(d, kilometer); // 5
```

This internal normalization is what makes mixing units seamless:

```typescript
const total = q(kilometer(1)).plus(meter(500)); // 1500 m
```

### Linear vs Affine Units

Most units are **linear**—they measure from a true zero. Zero meters is no
distance. Zero seconds is no time. Linear quantities behave like vectors: you
can add, subtract, multiply, divide, and scale them freely.

Some units are **affine**—they measure from an arbitrary zero. Zero degrees
Celsius isn't "no temperature"; it's the freezing point of water. Fahrenheit
uses a different arbitrary zero. These are points on a scale, not amounts.

This distinction matters because arithmetic that makes sense for linear
quantities is meaningless for affine ones:

```typescript
import { celsius } from "@isentropic/dim-si/temperature";
import { meter } from "@isentropic/dim-si/length";
import { q } from "@isentropic/dim-si/ops";

// Linear: these make sense
const d = q(meter(5)).plus(meter(3)); // 8 m ✓
const doubled = q(meter(5)).scale(2); // 10 m ✓

// Affine: these don't — the type system prevents it
q(celsius(20)).plus(celsius(25)); // Error: can't add affine to affine
q(celsius(20)).scale(2); // Error: QAffine has no .scale()
```

What _does_ make sense is the **difference** between two affine points—that's a
linear quantity:

```typescript
import { celsius, kelvin } from "@isentropic/dim-si/temperature";
import { q } from "@isentropic/dim-si/ops";

const boiling = celsius(100);
const freezing = celsius(0);

// Subtracting two points gives a linear delta
q(boiling).minus(freezing).in(kelvin); // 100

// Adding a delta to a point gives a point
q(freezing).plus(celsius.delta(10)).in(celsius); // 10
```

The `.delta` property on affine units creates linear quantities for temperature
differences, rate of change, and similar use cases.

| Operation       | Chain type       | Example                                         |
| --------------- | ---------------- | ----------------------------------------------- |
| Linear + Linear | `QLinear`        | `q(meter(5)).plus(meter(3))` → 8 m              |
| Affine − Affine | `QLinear`        | `q(celsius(100)).minus(celsius(0))` → 100 K     |
| Affine + Linear | `QAffine`        | `q(celsius(20)).plus(celsius.delta(5))` → 25°C  |
| Affine − Linear | `QAffine`        | `q(celsius(20)).minus(celsius.delta(5))` → 15°C |
| Affine + Affine | ❌ Compile error | —                                               |
| scale(Affine)   | ❌ Compile error | —                                               |

## Units

Units are organized by dimension via subpath exports:

```typescript
import { kilometer, meter } from "@isentropic/dim-si/length";
import { hour, second } from "@isentropic/dim-si/time";
import { joule, kilowattHour } from "@isentropic/dim-si/energy";
```

### Base Dimensions

**[Length](./src/length.ts)** — `meter`, `kilometer`, `centimeter`,
`millimeter`, `micrometer`, `nanometer`, `picometer`

**[Mass](./src/mass.ts)** — `kilogram`, `gram`, `milligram`, `microgram`,
`nanogram`, `tonne`

**[Time](./src/time.ts)** — `second`, `millisecond`, `microsecond`,
`nanosecond`, `picosecond`, `minute`, `hour`, `day`

**[Temperature](./src/temperature.ts)** — `kelvin`, `celsius`, `fahrenheit`

**[Electric Current](./src/current.ts)** — `ampere`, `milliampere`,
`microampere`

**[Amount of Substance](./src/amount.ts)** — `mole`, `millimole`, `micromole`

**[Luminous Intensity](./src/luminosity.ts)** — `candela`

### Derived Dimensions

**[Area](./src/area.ts)** — `squareMeter`, `hectare`

**[Volume](./src/volume.ts)** — `cubicMeter`, `liter`, `milliliter`,
`microliter`

**[Velocity](./src/velocity.ts)** — `meterPerSecond`

**[Acceleration](./src/acceleration.ts)** — `meterPerSecondSquared`

**[Force](./src/force.ts)** — `newton`

**[Pressure](./src/pressure.ts)** — `pascal`, `bar`, `millibar`

**[Energy](./src/energy.ts)** — `joule`, `kilojoule`, `megajoule`,
`kilowattHour`

**[Power](./src/power.ts)** — `watt`, `milliwatt`, `kilowatt`, `megawatt`,
`gigawatt`, `terawatt`

**[Frequency](./src/frequency.ts)** — `hertz`, `kilohertz`, `megahertz`,
`gigahertz`, `becquerel`

**[Voltage](./src/voltage.ts)** — `volt`, `millivolt`, `kilovolt`

**[Resistance](./src/resistance.ts)** — `ohm`, `milliohm`, `kilohm`, `megohm`

**[Capacitance](./src/capacitance.ts)** — `farad`, `microfarad`, `nanofarad`,
`picofarad`

**[Inductance](./src/inductance.ts)** — `henry`, `millihenry`, `microhenry`

**[Charge](./src/charge.ts)** — `coulomb`

**[Magnetic Flux](./src/magnetic-flux.ts)** — `weber`

**[Magnetic Flux Density](./src/magnetic-flux-density.ts)** — `tesla`

**[Conductance](./src/conductance.ts)** — `siemens`

**[Illuminance](./src/illuminance.ts)** — `lux`

**[Luminous Flux](./src/luminous-flux.ts)** — `lumen`

**[Catalytic Activity](./src/catalytic-activity.ts)** — `katal`

**[Absorbed Dose](./src/absorbed-dose.ts)** — `gray`, `sievert`

### Custom Scaled Units

Use SI prefixes to create units not provided out of the box:

```typescript
import { meter } from "@isentropic/dim-si/length";
import { gram } from "@isentropic/dim-si/mass";
import { MEGA, PICO } from "@isentropic/dim-si/prefixes";

const megameter = meter.scaled(MEGA);
const picogram = gram.scaled(PICO);
```

See [prefixes.ts](./src/prefixes.ts) for all available SI prefixes.

## Adding a New Unit

Units are organized one file per dimension. To add a new unit to an existing
dimension, edit its module (e.g., `src/length.ts`). To add units for a new
dimension:

1. **Create the unit module** at `src/<dimension>.ts`:

   ```typescript
   /**
    * Jerk units (L·T⁻³).
    *
    * SI unit: meter per second cubed (m/s³).
    *
    * @module
    */

   import type { Jerk } from "@isentropic/dim-isq";
   import { jerk } from "@isentropic/dim-isq";
   import type { BaseUnit } from "./system.ts";
   import { si } from "./system.ts";

   export type { Jerk } from "@isentropic/dim-isq";

   /** Meter per second cubed (m/s³) — SI unit of jerk. */
   export const meterPerSecondCubed: BaseUnit<Jerk> = si.unit(jerk);
   ```

   > **Note:** The quantity (`jerk`) must exist in `dim-isq` first. See the
   > [dim-isq README](../dim-isq/README.md#adding-a-new-quantity) for how to add
   > one.

   For scaled units, use prefixes or compose from other unit scales:

   ```typescript
   import { KILO } from "./prefixes.ts";

   export const kilometerPerSecondCubed = meterPerSecondCubed.scaled(KILO);
   ```

2. **Add a subpath export** in `deno.json`:

   ```jsonc
   "./jerk": "./src/jerk.ts"
   ```

3. **Update the unit listing** in this README under [Units](#units).

4. **Run checks**:

   ```bash
   deno fmt && deno lint && deno test
   ```

## License

MIT
