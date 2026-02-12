/**
 * Thermal conductance units (M·L²·T⁻³·Θ⁻¹).
 *
 * SI unit: watt per kelvin (W/K).
 *
 * @example Creating a thermal conductance
 * ```ts
 * import { wattPerKelvin } from "@isentropic/dim-si/thermal-conductance";
 *
 * const conductance = wattPerKelvin(0.5);
 * ```
 *
 * @module
 */

import type { ThermalConductance } from "@isentropic/dim-isq";
import { thermalConductance } from "@isentropic/dim-isq";
import type { BaseUnit, ScaledUnit } from "./types.ts";
import { si } from "./system.ts";
import { KILO, MILLI } from "./prefixes.ts";

export type { ThermalConductance } from "@isentropic/dim-isq";

/** Watt per kelvin (W/K) — SI unit of thermal conductance. */
export const wattPerKelvin: BaseUnit<ThermalConductance> = si.unit(
  thermalConductance,
);

/** Milliwatt per kelvin (mW/K) — 10⁻³ watts per kelvin. */
export const milliwattPerKelvin: ScaledUnit<ThermalConductance> = wattPerKelvin
  .scaled(MILLI);

/** Kilowatt per kelvin (kW/K) — 1000 watts per kelvin. */
export const kilowattPerKelvin: ScaledUnit<ThermalConductance> = wattPerKelvin
  .scaled(KILO);
