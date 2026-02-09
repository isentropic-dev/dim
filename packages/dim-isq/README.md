# @isentropic/dim-isq

Type-safe ISQ (International System of Quantities).

The [ISQ](https://en.wikipedia.org/wiki/International_System_of_Quantities)
defines the base dimensions and derived quantities used in physics and engineering.
This package provides type-safe factories for ISQ quantities
with compile-time dimension checking.

Base dimensions:

- **L** — Length
- **M** — Mass
- **T** — Time
- **I** — Electric current
- **Θ** — Thermodynamic temperature
- **N** — Amount of substance
- **J** — Luminous intensity

## Quick Start

```typescript
import { force, length, mass, time, velocity } from "@isentropic/dim-isq";
import { divide, multiply } from "@isentropic/dim-isq/ops";

const distance = length(100);
const duration = time(10);
const v = divide(distance, duration); // → Velocity

const m = mass(5);
const a = divide(v, duration); // → Acceleration
const f = multiply(m, a); // → Force

// Type errors at compile time:
// add(length(1), time(1))     // ❌ Can't add length + time
// add(force(1), energy(1))    // ❌ Can't add force + energy
```

## Available Quantities

Each quantity has a type and factory function with the same name:

```typescript
import { Force, force, Velocity, velocity } from "@isentropic/dim-isq";

const f: Force = force(10);
const v: Velocity = velocity(25);
```

### Base

| Quantity      | Dimension |
| ------------- | --------- |
| `length`      | L         |
| `mass`        | M         |
| `time`        | T         |
| `current`     | I         |
| `temperature` | Θ         |
| `amount`      | N         |
| `luminosity`  | J         |

### Derived

| Quantity              | Dimension     |
| --------------------- | ------------- |
| `area`                | L²            |
| `volume`              | L³            |
| `velocity`            | L·T⁻¹         |
| `acceleration`        | L·T⁻²         |
| `force`               | M·L·T⁻²       |
| `energy`              | M·L²·T⁻²      |
| `power`               | M·L²·T⁻³      |
| `pressure`            | M·L⁻¹·T⁻²     |
| `frequency`           | T⁻¹           |
| `charge`              | I·T           |
| `voltage`             | M·L²·T⁻³·I⁻¹  |
| `resistance`          | M·L²·T⁻³·I⁻²  |
| `capacitance`         | M⁻¹·L⁻²·T⁴·I² |
| `inductance`          | M·L²·T⁻²·I⁻²  |
| `conductance`         | M⁻¹·L⁻²·T³·I² |
| `magneticFlux`        | M·L²·T⁻²·I⁻¹  |
| `magneticFluxDensity` | M·T⁻²·I⁻¹     |
| `luminousFlux`        | J             |
| `illuminance`         | J·L⁻²         |
| `absorbedDose`        | L²·T⁻²        |
| `catalyticActivity`   | N·T⁻¹         |

## Limitations

- **Angle is dimensionless** —
  radians and steradians are indistinct from scalars at the type level
- **Torque and energy share the same dimension** —
  both are M·L²·T⁻², so the type system can't distinguish them
