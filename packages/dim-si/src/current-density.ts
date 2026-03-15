/**
 * Current density units (I·L⁻²).
 *
 * SI unit: ampere per square meter (A/m²).
 *
 * @example Creating a current density
 * ```ts
 * import { amperePerSquareMeter } from "@isentropic/dim-si/current-density";
 *
 * const j = amperePerSquareMeter(1e6);
 * ```
 *
 * @module
 */

import type { CurrentDensity as CurrentDensityDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { currentDensity } from "@isentropic/dim-isq";
import type { BaseUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";

/** An SI current density quantity. */
export type CurrentDensity = Linear<CurrentDensityDim, Si>;

/** Ampere per square meter (A/m²) — SI unit of current density. */
export const amperePerSquareMeter: BaseUnit<CurrentDensityDim> = si.unit(
  currentDensity,
);
