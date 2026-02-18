# @isentropic/dim-si

Ready-to-use SI units with compile-time dimensional analysis.

Provides the [SI](https://en.wikipedia.org/wiki/International_System_of_Units)
unit system — unit conversions, SI prefixes, and affine units like temperature
scales, all with dimensions tracked at the type level. Wrap raw numbers in typed
quantities and let the compiler catch dimension mismatches before your code
runs.

## Usage

### Create and compute

Unit functions wrap raw numbers into typed quantities. The fluent `q()` API
chains arithmetic while tracking dimensions at compile time:

```typescript
import { kilometer, meter } from "@isentropic/dim-si/length";
import { hour } from "@isentropic/dim-si/time";
import { q } from "@isentropic/dim-si/ops";

const distance = kilometer(100);
const duration = hour(2);

const speed = q(distance).div(duration);
const total = q(kilometer(5)).plus(meter(500));
```

Temperature conversions handle offsets correctly. Absolute temperatures use
affine conversion (applying the zero-point offset), while deltas stay linear:

```typescript
import { celsius, kelvin } from "@isentropic/dim-si/temperature";

q(celsius(100)).in(kelvin); // 373.15
q(celsius(100)).minus(celsius(0)).in(kelvin); // 100 (linear delta)
q(celsius(20)).plus(celsius.delta(5)).in(celsius); // 25
```

### Extract values

Use `.in(unit)` to get a plain number back — for example, to serialize or
display:

```typescript
import { meterPerSecond } from "@isentropic/dim-si/velocity";

speed.in(meterPerSecond); // ~13.89
total.in(meter); // 5500
total.in(kilometer); // 5.5
```

The free function `valueIn(quantity, unit)` does the same thing outside a chain.
Free functions `add`, `subtract`, `multiply`, `divide`, and `scale` are also
available from `@isentropic/dim-si/ops`.

### Type safety

Dimension mismatches are caught at compile time:

```typescript
q(kilometer(5)).plus(hour(1)); // Error: can't add length and time
```

Use the exported quantity types for function signatures:

```typescript
import type { Length } from "@isentropic/dim-si/length";
import type { Time } from "@isentropic/dim-si/time";
import type { Velocity } from "@isentropic/dim-si/velocity";

function speed(d: Length, t: Time): Velocity {
  return q(d).div(t);
}
```

### Custom units

Use SI prefixes to create units not provided out of the box:

```typescript
import { meter } from "@isentropic/dim-si/length";
import { gram } from "@isentropic/dim-si/mass";
import { MEGA, PICO } from "@isentropic/dim-si/prefixes";

const megameter = meter.scaled(MEGA);
const picogram = gram.scaled(PICO);
```

See
[prefixes.ts](https://github.com/isentropic-dev/dim/blob/main/packages/dim-si/src/prefixes.ts)
for all available SI prefixes.

You can also compose units from other unit scales:

```typescript
import { joule } from "@isentropic/dim-si/energy";
import { kilowatt } from "@isentropic/dim-si/power";
import { hour } from "@isentropic/dim-si/time";

const kilowattHour = joule.scaled(kilowatt.scale * hour.scale);
```

If you find yourself using a custom unit frequently, consider
[contributing it](https://github.com/isentropic-dev/dim/blob/main/CONTRIBUTING.md#adding-a-new-si-unit)
to the package.

## Installation

```bash
# Deno
deno add jsr:@isentropic/dim-si
# npm
npm install @isentropic/dim-si
# Bun
bun add @isentropic/dim-si
```

## Units

### Base

| Quantity                 | Units                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------- |
| Length                   | `meter`, `kilometer`, `centimeter`, `millimeter`, `micrometer`, `nanometer`, `picometer`    |
| Mass                     | `kilogram`, `gram`, `milligram`, `microgram`, `nanogram`, `tonne`                           |
| Time                     | `second`, `millisecond`, `microsecond`, `nanosecond`, `picosecond`, `minute`, `hour`, `day` |
| Temperature [*](#affine) | `kelvin`, `celsius`, `fahrenheit`                                                           |
| Electric Current         | `ampere`, `milliampere`, `microampere`                                                      |
| Amount of Substance      | `mole`, `millimole`, `micromole`                                                            |
| Luminous Intensity       | `candela`                                                                                   |

### Derived

| Quantity              | Units                                                               |
| --------------------- | ------------------------------------------------------------------- |
| Area                  | `squareMeter`, `hectare`                                            |
| Volume                | `cubicMeter`, `liter`, `milliliter`, `microliter`                   |
| Velocity              | `meterPerSecond`                                                    |
| Acceleration          | `meterPerSecondSquared`                                             |
| Force                 | `newton`                                                            |
| Pressure              | `pascal`, `bar`, `millibar`                                         |
| Energy                | `joule`, `kilojoule`, `megajoule`, `kilowattHour`                   |
| Power                 | `watt`, `milliwatt`, `kilowatt`, `megawatt`, `gigawatt`, `terawatt` |
| Frequency             | `hertz`, `kilohertz`, `megahertz`, `gigahertz`, `becquerel`         |
| Voltage               | `volt`, `millivolt`, `kilovolt`                                     |
| Resistance            | `ohm`, `milliohm`, `kilohm`, `megohm`                               |
| Capacitance           | `farad`, `microfarad`, `nanofarad`, `picofarad`                     |
| Inductance            | `henry`, `millihenry`, `microhenry`                                 |
| Charge                | `coulomb`                                                           |
| Magnetic Flux         | `weber`                                                             |
| Magnetic Flux Density | `tesla`                                                             |
| Conductance           | `siemens`                                                           |
| Illuminance           | `lux`                                                               |
| Luminous Flux         | `lumen`                                                             |
| Catalytic Activity    | `katal`                                                             |
| Thermal Conductance   | `wattPerKelvin`, `milliwattPerKelvin`, `kilowattPerKelvin`          |
| Absorbed Dose         | `gray`, `sievert`                                                   |

_<a id="affine">\*</a>
[Affine quantity](https://github.com/isentropic-dev/dim/blob/main/packages/dim-unit/README.md#affine-units)
— zero point is arbitrary, which restricts valid operations._

## License

MIT
