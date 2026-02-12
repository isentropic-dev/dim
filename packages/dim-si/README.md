# @isentropic/dim-si

Ready-to-use SI units with compile-time dimensional analysis.

Provides the [SI](https://en.wikipedia.org/wiki/International_System_of_Units)
unit system built on [`dim-isq`](../dim-isq) quantities — unit conversions, SI
prefixes, and affine units like temperature scales, all with dimensions tracked
at the type level.

## Installation

```bash
# Deno
deno add jsr:@isentropic/dim-si
# npm
npx jsr add @isentropic/dim-si
# Bun
bunx jsr add @isentropic/dim-si
```

## Quick Start

```typescript
import { kilometer, meter } from "@isentropic/dim-si/length";
import { hour } from "@isentropic/dim-si/time";
import { celsius, kelvin } from "@isentropic/dim-si/temperature";
import { q, valueIn } from "@isentropic/dim-si/ops";

const speed = q(kilometer(100)).div(hour(2));
const total = q(kilometer(5)).plus(meter(500));

valueIn(total, meter); // 5500
valueIn(total, kilometer); // 5.5

// Dimension mismatches are compile errors
q(kilometer(5)).plus(hour(1)); // Error: can't add length and time

// Affine units enforce correct semantics
q(celsius(100)).in(kelvin); // 373.15
q(celsius(100)).minus(celsius(0)).in(kelvin); // 100 (linear delta)
q(celsius(20)).plus(celsius.delta(5)).in(celsius); // 25
```

Free functions (`add`, `subtract`, `multiply`, `divide`, `scale`) are also
available:

```typescript
import { add, divide } from "@isentropic/dim-si/ops";

const total = add(kilometer(5), meter(500));
const speed = divide(kilometer(100), hour(2));
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

## Custom Scaled Units

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
