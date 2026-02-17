# @isentropic/dim-isq

Ready-to-use
[ISQ](https://en.wikipedia.org/wiki/International_System_of_Quantities) quantity
system with compile-time dimensional analysis.

## Usage

Each quantity has a type and factory function with the same name:

```typescript
import {
  Acceleration,
  Force,
  Length,
  length,
  mass,
  time,
  Velocity,
} from "@isentropic/dim-isq";
import { add, divide, multiply } from "@isentropic/dim-isq/ops";

const distance = length(100);
const duration = time(10);
const v: Velocity = divide(distance, duration);

const m = mass(5);
const a: Acceleration = divide(v, duration);
const f: Force = multiply(m, a);

const total: Length = add(length(5), length(3));

// Type errors at compile time:
// add(length(1), time(1))     // Can't add length + time
// add(force(1), energy(1))    // Can't add force + energy
```

## Installation

```bash
# Deno
deno add jsr:@isentropic/dim-isq
# npm
npx jsr add @isentropic/dim-isq
# Bun
bunx jsr add @isentropic/dim-isq
```

## Quantities

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
| `thermalConductance`  | M·L²·T⁻³·Θ⁻¹  |

## Contributing

Not seeing a quantity you need? We welcome contributions. See
[CONTRIBUTING.md](../../CONTRIBUTING.md#adding-a-new-isq-quantity) for how to
add one.

## Limitations

- **Angle is dimensionless** — radians and steradians are indistinct from
  scalars at the type level
- **Torque and energy share the same dimension** — both are M·L²·T⁻², so the
  type system can't distinguish them

## License

MIT
