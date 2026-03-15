/**
 * Heat capacity units (M·L²·T⁻²·Θ⁻¹).
 *
 * SI unit: joule per kelvin (J/K).
 *
 * @example Creating a heat capacity
 * ```ts
 * import { joulePerKelvin } from "@isentropic/dim-si/heat-capacity";
 *
 * const capacity = joulePerKelvin(4186);
 * ```
 *
 * @module
 */

import type { HeatCapacity as HeatCapacityDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { heatCapacity } from "@isentropic/dim-isq";
import type { BaseUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";

/** An SI heat capacity quantity. */
export type HeatCapacity = Linear<HeatCapacityDim, Si>;

/** Joule per kelvin (J/K) — SI unit of heat capacity. */
export const joulePerKelvin: BaseUnit<HeatCapacityDim> = si.unit(heatCapacity);
