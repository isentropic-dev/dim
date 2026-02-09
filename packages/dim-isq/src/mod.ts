/**
 * International System of Quantities (ISQ) — type-safe quantity system.
 *
 * Provides the 7 ISQ base dimensions and factories for common quantities.
 *
 * @example
 * ```ts
 * import { force, length, mass, time } from "@isentropic/dim-isq";
 * import { divide, multiply } from "@isentropic/dim-isq/ops";
 *
 * const distance = length(100);  // 100 m (base units)
 * const duration = time(10);     // 10 s
 * const v = divide(distance, duration);  // velocity: 10 m/s
 *
 * const m = mass(5);
 * const a = divide(v, duration);         // acceleration: 1 m/s²
 * const f = multiply(m, a);              // force: 5 N
 * ```
 *
 * **Limitations:**
 * - Angle is dimensionless (indistinct from scalar at type level)
 * - Torque and energy share the same dimension signature
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
  type Time,
  time,
  type Velocity,
  velocity,
  type Voltage,
  voltage,
  type Volume,
  volume,
} from "./quantities.generated.ts";

/** @deprecated Use `IsqDims` instead. */
export type { IsqDims as ISQDims } from "./quantities.generated.ts";
