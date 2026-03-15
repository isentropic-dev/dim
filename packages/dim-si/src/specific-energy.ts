/**
 * Specific energy units (L²·T⁻²).
 *
 * SI unit: joule per kilogram (J/kg).
 *
 * Note: specific energy shares this dimension with absorbed dose
 * (gray/sievert). This is intentional per SI — the type system
 * cannot distinguish them.
 *
 * @example Creating a specific energy
 * ```ts
 * import { joulePerKilogram } from "@isentropic/dim-si/specific-energy";
 *
 * const lhv = joulePerKilogram(43e6);
 * ```
 *
 * @module
 */

import type { SpecificEnergy as SpecificEnergyDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { specificEnergy } from "@isentropic/dim-isq";
import type { BaseUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";

/** An SI specific energy quantity. */
export type SpecificEnergy = Linear<SpecificEnergyDim, Si>;

/** Joule per kilogram (J/kg) — SI unit of specific energy. */
export const joulePerKilogram: BaseUnit<SpecificEnergyDim> = si.unit(
  specificEnergy,
);
