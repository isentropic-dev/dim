/**
 * Thermal conductivity units (M·L·T⁻³·Θ⁻¹).
 *
 * SI unit: watt per meter kelvin (W/(m·K)).
 *
 * @example Creating a thermal conductivity
 * ```ts
 * import { wattPerMeterKelvin } from "@isentropic/dim-si/thermal-conductivity";
 *
 * const copper = wattPerMeterKelvin(385);
 * ```
 *
 * @module
 */

import type { ThermalConductivity as ThermalConductivityDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { thermalConductivity } from "@isentropic/dim-isq";
import type { BaseUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";

/** An SI thermal conductivity quantity. */
export type ThermalConductivity = Linear<ThermalConductivityDim, Si>;

/** Watt per meter kelvin (W/(m·K)) — SI unit of thermal conductivity. */
export const wattPerMeterKelvin: BaseUnit<ThermalConductivityDim> = si.unit(
  thermalConductivity,
);
