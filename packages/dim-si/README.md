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

Temperature has two types — `Temperature` for absolute values (affine) and
`TemperatureDifference` for deltas (linear):

```typescript
import { celsius, kelvin } from "@isentropic/dim-si/temperature";

q(celsius(100)).in(kelvin); // 373.15
q(celsius(100)).minus(celsius(0)).in(kelvin); // 100 (linear delta)
q(celsius(20)).plus(celsius.delta(5)).in(celsius); // 25
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

See [prefixes.ts](./src/prefixes.ts) for all available SI prefixes.

You can also compose units from other unit scales:

```typescript
import { joule } from "@isentropic/dim-si/energy";
import { kilowatt } from "@isentropic/dim-si/power";
import { hour } from "@isentropic/dim-si/time";

const kilowattHour = joule.scaled(kilowatt.scale * hour.scale);
```

If you find yourself using a custom unit frequently, consider
[contributing it](../../CONTRIBUTING.md#adding-a-new-si-unit) to the package.

## Installation

```bash
# Deno
deno add jsr:@isentropic/dim-si
# npm
npx jsr add @isentropic/dim-si
# Bun
bunx jsr add @isentropic/dim-si
```

## Units

### Base

| Quantity                                         | Units                                                                                       |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| [Length](./src/length.ts)                        | `meter`, `kilometer`, `centimeter`, `millimeter`, `micrometer`, `nanometer`, `picometer`    |
| [Mass](./src/mass.ts)                            | `kilogram`, `gram`, `milligram`, `microgram`, `nanogram`, `tonne`                           |
| [Time](./src/time.ts)                            | `second`, `millisecond`, `microsecond`, `nanosecond`, `picosecond`, `minute`, `hour`, `day` |
| [Temperature](./src/temperature.ts) [*](#affine) | `kelvin`, `celsius`, `fahrenheit`                                                           |
| [Electric Current](./src/current.ts)             | `ampere`, `milliampere`, `microampere`                                                      |
| [Amount of Substance](./src/amount.ts)           | `mole`, `millimole`, `micromole`                                                            |
| [Luminous Intensity](./src/luminosity.ts)        | `candela`                                                                                   |

### Derived

| Quantity                                                | Units                                                               |
| ------------------------------------------------------- | ------------------------------------------------------------------- |
| [Area](./src/area.ts)                                   | `squareMeter`, `hectare`                                            |
| [Volume](./src/volume.ts)                               | `cubicMeter`, `liter`, `milliliter`, `microliter`                   |
| [Velocity](./src/velocity.ts)                           | `meterPerSecond`                                                    |
| [Acceleration](./src/acceleration.ts)                   | `meterPerSecondSquared`                                             |
| [Force](./src/force.ts)                                 | `newton`                                                            |
| [Pressure](./src/pressure.ts)                           | `pascal`, `bar`, `millibar`                                         |
| [Energy](./src/energy.ts)                               | `joule`, `kilojoule`, `megajoule`, `kilowattHour`                   |
| [Power](./src/power.ts)                                 | `watt`, `milliwatt`, `kilowatt`, `megawatt`, `gigawatt`, `terawatt` |
| [Frequency](./src/frequency.ts)                         | `hertz`, `kilohertz`, `megahertz`, `gigahertz`, `becquerel`         |
| [Voltage](./src/voltage.ts)                             | `volt`, `millivolt`, `kilovolt`                                     |
| [Resistance](./src/resistance.ts)                       | `ohm`, `milliohm`, `kilohm`, `megohm`                               |
| [Capacitance](./src/capacitance.ts)                     | `farad`, `microfarad`, `nanofarad`, `picofarad`                     |
| [Inductance](./src/inductance.ts)                       | `henry`, `millihenry`, `microhenry`                                 |
| [Charge](./src/charge.ts)                               | `coulomb`                                                           |
| [Magnetic Flux](./src/magnetic-flux.ts)                 | `weber`                                                             |
| [Magnetic Flux Density](./src/magnetic-flux-density.ts) | `tesla`                                                             |
| [Conductance](./src/conductance.ts)                     | `siemens`                                                           |
| [Illuminance](./src/illuminance.ts)                     | `lux`                                                               |
| [Luminous Flux](./src/luminous-flux.ts)                 | `lumen`                                                             |
| [Catalytic Activity](./src/catalytic-activity.ts)       | `katal`                                                             |
| [Thermal Conductance](./src/thermal-conductance.ts)     | `wattPerKelvin`, `milliwattPerKelvin`, `kilowattPerKelvin`          |
| [Absorbed Dose](./src/absorbed-dose.ts)                 | `gray`, `sievert`                                                   |

_<a id="affine">\*</a> [Affine quantity](../dim-unit/README.md#affine-units) —
zero point is arbitrary, which restricts valid operations._

## License

MIT
