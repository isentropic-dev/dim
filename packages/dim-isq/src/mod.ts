/**
 * ISQ (International System of Quantities) dimension types and factories.
 *
 * Provides typed quantity factories for the seven ISQ base dimensions
 * (length, mass, time, electric current, thermodynamic temperature,
 * amount of substance, luminous intensity) and common derived quantities.
 *
 * {@link https://jsr.io/@isentropic/dim-si | @isentropic/dim-si} is built
 * on top of this package and provides SI units ready to use. If you need a
 * custom unit system — imperial, CGS, or domain-specific — you can define
 * one directly on these ISQ dimensions with
 * {@link https://jsr.io/@isentropic/dim-unit | @isentropic/dim-unit}:
 *
 * ```ts
 * import { isq } from "@isentropic/dim-isq";
 * import { defineUnitSystem, valueIn } from "@isentropic/dim-unit";
 *
 * const us = defineUnitSystem("imperial", isq);
 *
 * const yard = us.unit(isq.base("L"));
 * const foot = yard.scaled(1 / 3);
 * const mile = yard.scaled(1760);
 * const inch = yard.scaled(1 / 36);
 *
 * const rankine = us.unit(isq.base("Θ"));
 * const fahrenheit = rankine.offset(459.67);
 *
 * valueIn(mile(1), yard);           // 1760
 * valueIn(yard(1), foot);           // 3
 * valueIn(foot(1), inch);           // 12
 * valueIn(fahrenheit(212), rankine); // 671.67
 * ```
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
