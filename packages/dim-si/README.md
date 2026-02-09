# @isentropic/dim-si

Type-safe SI units with compile-time dimensional analysis.

The [SI](https://en.wikipedia.org/wiki/International_System_of_Units)
(International System of Units) is the modern metric system.
This package provides SI units built on `dim-isq` quantities,
with full support for unit conversions, prefixes, and affine units like temperature scales.

## Quick Start

```typescript
import { kilometer, meter } from "@isentropic/dim-si/length";
import { hour } from "@isentropic/dim-si/time";
import { meterPerSecond } from "@isentropic/dim-si/velocity";
import { celsius, kelvin } from "@isentropic/dim-si/temperature";
import { add, divide, subtract, valueIn } from "@isentropic/dim-si/ops";

// Create quantities with units
const distance = kilometer(100);
const time = hour(2);
const speed = divide(distance, time);
valueIn(speed, meterPerSecond); // 13.89

// Mix units freely—dimensions are tracked at compile time
const total = add(kilometer(5), meter(500)); // 5500 m

// Dimension mismatches are compile errors
add(distance, time); // Error: can't add length and time

// Temperature with affine units
const hot = celsius(100);
valueIn(hot, kelvin); // 373.15

// Temperature differences use .delta
const warm = celsius(20);
const warmer = add(warm, celsius.delta(5)); // 25°C

// Subtracting temperatures yields a linear delta
const diff = subtract(celsius(25), celsius(20));
valueIn(diff, kelvin); // 5
```

## Core Concepts

### Quantities

A **quantity** is a value with dimensions—like length, time, or velocity.
In dim, quantities are numbers tagged with their dimensional signature at compile time.
The type system tracks dimensions through arithmetic,
catching errors like adding meters to seconds before your code runs.

```typescript
import { meter, kilometer } from "@isentropic/dim-si/length";
import { second, hour } from "@isentropic/dim-si/time";
import { add, divide } from "@isentropic/dim-si/ops";

const distance = kilometer(100); // Quantity with dimension Length
const time = hour(2); // Quantity with dimension Time
const speed = divide(distance, time); // → dimension Length/Time (velocity)

// Dimension mismatch is a compile error
add(distance, time); // Error: can't add length and time
```

### Units

**Units** give meaning to quantity values.
A quantity value of `1000` means nothing until you know whether it's 1000 meters or 1000 kilometers.

Units have a **scale factor** relating them to a base unit.
Creating a quantity with a unit stores the value in base units internally:

```typescript
import { meter, kilometer } from "@isentropic/dim-si/length";
import { valueIn } from "@isentropic/dim-si/ops";

const d = kilometer(5); // Internally: 5000 (meters)
valueIn(d, meter); // 5000
valueIn(d, kilometer); // 5
```

This internal normalization is what makes mixing units seamless:

```typescript
const total = add(kilometer(1), meter(500)); // 1500 m
```

### Linear vs Affine Units

Most units are **linear**—they measure from a true zero.
Zero meters is no distance.
Zero seconds is no time.
Linear quantities behave like vectors:
you can add, subtract, multiply, divide, and scale them freely.

Some units are **affine**—they measure from an arbitrary zero.
Zero degrees Celsius isn't "no temperature"; it's the freezing point of water.
Fahrenheit uses a different arbitrary zero.
These are points on a scale, not amounts.

This distinction matters because arithmetic that makes sense for linear quantities is meaningless for affine ones:

```typescript
import { celsius, kelvin } from "@isentropic/dim-si/temperature";
import { meter } from "@isentropic/dim-si/length";
import { add, scale } from "@isentropic/dim-si/ops";

// Linear: these make sense
const d = add(meter(5), meter(3)); // 8 m ✓
const doubled = scale(meter(5), 2); // 10 m ✓

// Affine: these don't
add(celsius(20), celsius(25)); // Error: 20°C + 25°C = 45°C? No.
scale(celsius(20), 2); // Error: 2 × 20°C = 40°C? No.
```

What _does_ make sense is the **difference** between two affine points—that's a linear quantity:

```typescript
import { subtract, add, valueIn } from "@isentropic/dim-si/ops";

const boiling = celsius(100);
const freezing = celsius(0);

// Subtracting two points gives a linear delta
const diff = subtract(boiling, freezing); // 100 K (linear)
valueIn(diff, kelvin); // 100

// Adding a delta to a point gives a point
const warmer = add(freezing, celsius.delta(10)); // 10°C (affine)
```

The `.delta` property on affine units creates linear quantities
for temperature differences, rate of change, and similar use cases.

| Operation         | Result   | Example                                  |
| ----------------- | -------- | ---------------------------------------- |
| Linear + Linear   | Linear   | `meter(5) + meter(3)` → 8 m              |
| Affine − Affine   | Linear   | `celsius(100) − celsius(0)` → 100 K      |
| Affine + Linear   | Affine   | `celsius(20) + celsius.delta(5)` → 25°C  |
| Affine − Linear   | Affine   | `celsius(20) − celsius.delta(5)` → 15°C  |
| Affine + Affine   | ❌ Error | —                                        |
| scale(Affine)     | ❌ Error | —                                        |

## Units

Units are organized by dimension via subpath exports:

```typescript
import { meter, kilometer } from "@isentropic/dim-si/length";
import { second, hour } from "@isentropic/dim-si/time";
import { joule, kilowattHour } from "@isentropic/dim-si/energy";
```

### Base Dimensions

**[Length](./src/length.ts)** —
`meter`, `kilometer`, `centimeter`, `millimeter`, `micrometer`, `nanometer`, `picometer`

**[Mass](./src/mass.ts)** —
`kilogram`, `gram`, `milligram`, `microgram`, `nanogram`, `tonne`

**[Time](./src/time.ts)** —
`second`, `millisecond`, `microsecond`, `nanosecond`, `picosecond`, `minute`, `hour`, `day`

**[Temperature](./src/temperature.ts)** —
`kelvin`, `celsius`, `fahrenheit`

**[Electric Current](./src/current.ts)** —
`ampere`, `milliampere`, `microampere`

**[Amount of Substance](./src/amount.ts)** —
`mole`, `millimole`, `micromole`

**[Luminous Intensity](./src/luminosity.ts)** —
`candela`

### Derived Dimensions

**[Area](./src/area.ts)** —
`squareMeter`, `hectare`

**[Volume](./src/volume.ts)** —
`cubicMeter`, `liter`, `milliliter`, `microliter`

**[Velocity](./src/velocity.ts)** —
`meterPerSecond`

**[Acceleration](./src/acceleration.ts)** —
`meterPerSecondSquared`

**[Force](./src/force.ts)** —
`newton`

**[Pressure](./src/pressure.ts)** —
`pascal`, `bar`, `millibar`

**[Energy](./src/energy.ts)** —
`joule`, `kilojoule`, `megajoule`, `kilowattHour`

**[Power](./src/power.ts)** —
`watt`, `milliwatt`, `kilowatt`, `megawatt`, `gigawatt`, `terawatt`

**[Frequency](./src/frequency.ts)** —
`hertz`, `kilohertz`, `megahertz`, `gigahertz`, `becquerel`

**[Voltage](./src/voltage.ts)** —
`volt`, `millivolt`, `kilovolt`

**[Resistance](./src/resistance.ts)** —
`ohm`, `milliohm`, `kilohm`, `megohm`

**[Capacitance](./src/capacitance.ts)** —
`farad`, `microfarad`, `nanofarad`, `picofarad`

**[Inductance](./src/inductance.ts)** —
`henry`, `millihenry`, `microhenry`

**[Charge](./src/charge.ts)** —
`coulomb`

**[Magnetic Flux](./src/magnetic-flux.ts)** —
`weber`

**[Magnetic Flux Density](./src/magnetic-flux-density.ts)** —
`tesla`

**[Conductance](./src/conductance.ts)** —
`siemens`

**[Illuminance](./src/illuminance.ts)** —
`lux`

**[Luminous Flux](./src/luminous-flux.ts)** —
`lumen`

**[Catalytic Activity](./src/catalytic-activity.ts)** —
`katal`

**[Absorbed Dose](./src/absorbed-dose.ts)** —
`gray`, `sievert`

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
