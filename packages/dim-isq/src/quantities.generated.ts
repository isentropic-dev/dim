/**
 * Isq quantity system.
 *
 * THIS FILE IS GENERATED. DO NOT EDIT DIRECTLY.
 * Regenerate with: deno task generate:quantities
 *
 * @module
 */

import {
  defineQuantitySystem,
  type Exp,
  type QuantityFactory,
  type QuantitySystem,
  type WithDefaults,
} from "@isentropic/dim-quantity";

/** The 7 base dimension symbols for the ISQ system: L, M, T, I, Θ, N, J. */
export const isqDims = ["L", "M", "T", "I", "Θ", "N", "J"] as const;

/** Tuple type of the ISQ base dimension symbols. */
export type IsqDims = typeof isqDims;

/** The ISQ quantity system. Use to create custom quantity factories beyond the pre-defined exports. */
export const isq: QuantitySystem<IsqDims> = defineQuantitySystem(isqDims);

/** Shorthand for defining dimension types in this system. */
type D<
  T extends Partial<Record<"L" | "M" | "T" | "I" | "Θ" | "N" | "J", Exp>>,
> = WithDefaults<typeof isq.dims, T>;

// === Scalar ===

/** Dimensionless quantity. */
export type Scalar = D<Record<never, never>>;

// === Base Quantities ===

/** Length (L) */
export type Length = D<{ L: 1 }>;
export const length: QuantityFactory<Length> = isq.base("L");

/** Mass (M) */
export type Mass = D<{ M: 1 }>;
export const mass: QuantityFactory<Mass> = isq.base("M");

/** Time (T) */
export type Time = D<{ T: 1 }>;
export const time: QuantityFactory<Time> = isq.base("T");

/** Current (I) */
export type Current = D<{ I: 1 }>;
export const current: QuantityFactory<Current> = isq.base("I");

/** Temperature (Θ) */
export type Temperature = D<{ Θ: 1 }>;
export const temperature: QuantityFactory<Temperature> = isq.base("Θ");

/** Amount (N) */
export type Amount = D<{ N: 1 }>;
export const amount: QuantityFactory<Amount> = isq.base("N");

/** Luminosity (J) */
export type Luminosity = D<{ J: 1 }>;
export const luminosity: QuantityFactory<Luminosity> = isq.base("J");

// === Derived Quantities ===

/** Area (L²) */
export type Area = D<{ L: 2 }>;
export const area: QuantityFactory<Area> = isq.factory({ L: 2 });

/** Volume (L³) */
export type Volume = D<{ L: 3 }>;
export const volume: QuantityFactory<Volume> = isq.factory({ L: 3 });

/** Velocity (L·T⁻¹) */
export type Velocity = D<{ L: 1; T: -1 }>;
export const velocity: QuantityFactory<Velocity> = isq.factory({ L: 1, T: -1 });

/** Acceleration (L·T⁻²) */
export type Acceleration = D<{ L: 1; T: -2 }>;
export const acceleration: QuantityFactory<Acceleration> = isq.factory({
  L: 1,
  T: -2,
});

/** Force (L·M·T⁻²) */
export type Force = D<{ L: 1; M: 1; T: -2 }>;
export const force: QuantityFactory<Force> = isq.factory({ L: 1, M: 1, T: -2 });

/** Energy (L²·M·T⁻²) */
export type Energy = D<{ L: 2; M: 1; T: -2 }>;
export const energy: QuantityFactory<Energy> = isq.factory({
  L: 2,
  M: 1,
  T: -2,
});

/** Power (L²·M·T⁻³) */
export type Power = D<{ L: 2; M: 1; T: -3 }>;
export const power: QuantityFactory<Power> = isq.factory({ L: 2, M: 1, T: -3 });

/** Pressure (L⁻¹·M·T⁻²) */
export type Pressure = D<{ L: -1; M: 1; T: -2 }>;
export const pressure: QuantityFactory<Pressure> = isq.factory({
  L: -1,
  M: 1,
  T: -2,
});

/** Frequency (T⁻¹) */
export type Frequency = D<{ T: -1 }>;
export const frequency: QuantityFactory<Frequency> = isq.factory({ T: -1 });

/** Charge (T·I) */
export type Charge = D<{ T: 1; I: 1 }>;
export const charge: QuantityFactory<Charge> = isq.factory({ T: 1, I: 1 });

/** Voltage (L²·M·T⁻³·I⁻¹) */
export type Voltage = D<{ L: 2; M: 1; T: -3; I: -1 }>;
export const voltage: QuantityFactory<Voltage> = isq.factory({
  L: 2,
  M: 1,
  T: -3,
  I: -1,
});

/** Resistance (L²·M·T⁻³·I⁻²) */
export type Resistance = D<{ L: 2; M: 1; T: -3; I: -2 }>;
export const resistance: QuantityFactory<Resistance> = isq.factory({
  L: 2,
  M: 1,
  T: -3,
  I: -2,
});

/** Capacitance (L⁻²·M⁻¹·T⁴·I²) */
export type Capacitance = D<{ L: -2; M: -1; T: 4; I: 2 }>;
export const capacitance: QuantityFactory<Capacitance> = isq.factory({
  L: -2,
  M: -1,
  T: 4,
  I: 2,
});

/** Inductance (L²·M·T⁻²·I⁻²) */
export type Inductance = D<{ L: 2; M: 1; T: -2; I: -2 }>;
export const inductance: QuantityFactory<Inductance> = isq.factory({
  L: 2,
  M: 1,
  T: -2,
  I: -2,
});

/** Conductance (L⁻²·M⁻¹·T³·I²) */
export type Conductance = D<{ L: -2; M: -1; T: 3; I: 2 }>;
export const conductance: QuantityFactory<Conductance> = isq.factory({
  L: -2,
  M: -1,
  T: 3,
  I: 2,
});

/** MagneticFlux (L²·M·T⁻²·I⁻¹) */
export type MagneticFlux = D<{ L: 2; M: 1; T: -2; I: -1 }>;
export const magneticFlux: QuantityFactory<MagneticFlux> = isq.factory({
  L: 2,
  M: 1,
  T: -2,
  I: -1,
});

/** MagneticFluxDensity (M·T⁻²·I⁻¹) */
export type MagneticFluxDensity = D<{ M: 1; T: -2; I: -1 }>;
export const magneticFluxDensity: QuantityFactory<MagneticFluxDensity> = isq
  .factory({ M: 1, T: -2, I: -1 });

/** LuminousFlux (J) */
export type LuminousFlux = D<{ J: 1 }>;
export const luminousFlux: QuantityFactory<LuminousFlux> = isq.factory({
  J: 1,
});

/** Illuminance (L⁻²·J) */
export type Illuminance = D<{ L: -2; J: 1 }>;
export const illuminance: QuantityFactory<Illuminance> = isq.factory({
  L: -2,
  J: 1,
});

/** AbsorbedDose (L²·T⁻²) */
export type AbsorbedDose = D<{ L: 2; T: -2 }>;
export const absorbedDose: QuantityFactory<AbsorbedDose> = isq.factory({
  L: 2,
  T: -2,
});

/** CatalyticActivity (T⁻¹·N) */
export type CatalyticActivity = D<{ T: -1; N: 1 }>;
export const catalyticActivity: QuantityFactory<CatalyticActivity> = isq
  .factory({ T: -1, N: 1 });
