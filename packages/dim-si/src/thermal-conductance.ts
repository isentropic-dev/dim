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

import type { ThermalConductance as ThermalConductanceDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { thermalConductance } from "@isentropic/dim-isq";
import type { BaseUnit, ScaledUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";
import { KILO, MILLI } from "./prefixes.ts";

/** An SI thermal conductance quantity. */
export type ThermalConductance = Linear<ThermalConductanceDim, Si>;

/** Watt per kelvin (W/K) — SI unit of thermal conductance. */
export const wattPerKelvin: BaseUnit<ThermalConductanceDim> = si.unit(
  thermalConductance,
);

/** Milliwatt per kelvin (mW/K) — 10⁻³ watts per kelvin. */
export const milliwattPerKelvin: ScaledUnit<ThermalConductanceDim> =
  wattPerKelvin
    .scaled(MILLI);

/** Kilowatt per kelvin (kW/K) — 1000 watts per kelvin. */
export const kilowattPerKelvin: ScaledUnit<ThermalConductanceDim> =
  wattPerKelvin
    .scaled(KILO);
