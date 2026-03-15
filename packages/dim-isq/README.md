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
npm install @isentropic/dim-isq
# Bun
bun add @isentropic/dim-isq
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

| Quantity                | Dimension     |
| ----------------------- | ------------- |
| `area`                  | L²            |
| `volume`                | L³            |
| `velocity`              | L·T⁻¹         |
| `acceleration`          | L·T⁻²         |
| `force`                 | M·L·T⁻²       |
| `energy`                | M·L²·T⁻²      |
| `power`                 | M·L²·T⁻³      |
| `pressure`              | M·L⁻¹·T⁻²     |
| `frequency`             | T⁻¹           |
| `density`               | M·L⁻³         |
| `specificVolume`        | M⁻¹·L³        |
| `momentum`              | M·L·T⁻¹       |
| `angularVelocity`       | T⁻¹           |
| `angularAcceleration`   | T⁻²           |
| `torque`                | M·L²·T⁻²      |
| `dynamicViscosity`      | M·L⁻¹·T⁻¹     |
| `kinematicViscosity`    | L²·T⁻¹        |
| `surfaceTension`        | M·T⁻²         |
| `wavenumber`            | L⁻¹           |
| `charge`                | I·T           |
| `voltage`               | M·L²·T⁻³·I⁻¹  |
| `resistance`            | M·L²·T⁻³·I⁻²  |
| `capacitance`           | M⁻¹·L⁻²·T⁴·I² |
| `inductance`            | M·L²·T⁻²·I⁻²  |
| `conductance`           | M⁻¹·L⁻²·T³·I² |
| `magneticFlux`          | M·L²·T⁻²·I⁻¹  |
| `magneticFluxDensity`   | M·T⁻²·I⁻¹     |
| `electricFieldStrength` | M·L·T⁻³·I⁻¹   |
| `permittivity`          | M⁻¹·L⁻³·T⁴·I² |
| `permeability`          | M·L·T⁻²·I⁻²   |
| `currentDensity`        | I·L⁻²         |
| `luminousFlux`          | J             |
| `illuminance`           | J·L⁻²         |
| `absorbedDose`          | L²·T⁻²        |
| `catalyticActivity`     | N·T⁻¹         |
| `thermalConductance`    | M·L²·T⁻³·Θ⁻¹  |
| `heatCapacity`          | M·L²·T⁻²·Θ⁻¹  |
| `specificHeatCapacity`  | L²·T⁻²·Θ⁻¹    |
| `specificEnergy`        | L²·T⁻²        |
| `thermalConductivity`   | M·L·T⁻³·Θ⁻¹   |
| `volumetricFlowRate`    | L³·T⁻¹        |
| `massFlowRate`          | M·T⁻¹         |
| `concentration`         | N·L⁻³         |
| `molarMass`             | M·N⁻¹         |

## Contributing

Not seeing a quantity you need? We welcome contributions. See
[CONTRIBUTING.md](https://github.com/isentropic-dev/dim/blob/main/CONTRIBUTING.md#adding-a-new-isq-quantity)
for how to add one.

## Limitations

- **Angle is dimensionless** — radians and steradians are indistinct from
  scalars at the type level
- **Several quantities share dimensions** — the type system can't distinguish
  quantities that have identical dimension exponents:
  - `torque` and `energy` share M·L²·T⁻²
  - `angularVelocity` and `frequency` share T⁻¹
  - `specificEnergy` and `absorbedDose` share L²·T⁻²

## License

MIT
