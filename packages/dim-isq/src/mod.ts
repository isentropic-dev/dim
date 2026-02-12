/**
 * ISQ (International System of Quantities) dimension types and factories.
 *
 * Provides the {@linkcode isq} quantity system with typed factories for the
 * seven ISQ base dimensions (length, mass, time, electric current,
 * thermodynamic temperature, amount of substance, luminous intensity) and
 * common derived quantities (force, energy, power, pressure, etc.).
 *
 * This package defines dimensions and quantity factories only — no units or
 * scale factors. Use it directly when building custom unit systems (imperial,
 * CGS, domain-specific) with `@isentropic/dim-unit`, or use
 * `@isentropic/dim-si` for ready-made SI units.
 *
 * Arithmetic operations for ISQ quantities are in `@isentropic/dim-isq/ops`.
 *
 * @module
 */

export {
  // Dimension types
  type AbsorbedDose,
  // Derived quantities
  absorbedDose,
  type Acceleration,
  acceleration,
  type Amount,
  // Base quantities
  amount,
  type Area,
  area,
  type Capacitance,
  capacitance,
  type CatalyticActivity,
  catalyticActivity,
  type Charge,
  charge,
  type Conductance,
  conductance,
  type Current,
  current,
  type Energy,
  energy,
  type Force,
  force,
  type Frequency,
  frequency,
  type Illuminance,
  illuminance,
  type Inductance,
  inductance,
  // System
  isq,
  type IsqDims,
  isqDims,
  type Length,
  length,
  type Luminosity,
  luminosity,
  type LuminousFlux,
  luminousFlux,
  type MagneticFlux,
  magneticFlux,
  type MagneticFluxDensity,
  magneticFluxDensity,
  type Mass,
  mass,
  type Power,
  power,
  type Pressure,
  pressure,
  type Resistance,
  resistance,
  type Scalar,
  type Temperature,
  temperature,
  type ThermalConductance,
  thermalConductance,
  type Time,
  time,
  type Velocity,
  velocity,
  type Voltage,
  voltage,
  type Volume,
  volume,
} from "./quantities.generated.ts";
