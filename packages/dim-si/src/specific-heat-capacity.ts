/**
 * Specific heat capacity units (L²·T⁻²·Θ⁻¹).
 *
 * SI unit: joule per kilogram kelvin (J/(kg·K)).
 *
 * @example Creating a specific heat capacity
 * ```ts
 * import { joulePerKilogramKelvin } from "@isentropic/dim-si/specific-heat-capacity";
 *
 * const water = joulePerKilogramKelvin(4186);
 * ```
 *
 * @module
 */

import type { SpecificHeatCapacity as SpecificHeatCapacityDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { specificHeatCapacity } from "@isentropic/dim-isq";
import type { BaseUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";

/** An SI specific heat capacity quantity. */
export type SpecificHeatCapacity = Linear<SpecificHeatCapacityDim, Si>;

/** Joule per kilogram kelvin (J/(kg·K)) — SI unit of specific heat capacity. */
export const joulePerKilogramKelvin: BaseUnit<SpecificHeatCapacityDim> = si
  .unit(specificHeatCapacity);
