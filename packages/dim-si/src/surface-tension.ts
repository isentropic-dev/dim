/**
 * Surface tension units (M·T⁻²).
 *
 * SI unit: newton per meter (N/m).
 *
 * @example Creating a surface tension
 * ```ts
 * import { newtonPerMeter } from "@isentropic/dim-si/surface-tension";
 *
 * const water = newtonPerMeter(0.0728);
 * ```
 *
 * @module
 */

import type { SurfaceTension as SurfaceTensionDim } from "@isentropic/dim-isq";
import type { Linear } from "@isentropic/dim-unit";
import { surfaceTension } from "@isentropic/dim-isq";
import type { BaseUnit } from "./types.ts";
import type { Si } from "./system.ts";
import { si } from "./system.ts";

/** An SI surface tension quantity. */
export type SurfaceTension = Linear<SurfaceTensionDim, Si>;

/** Newton per meter (N/m) — SI unit of surface tension. */
export const newtonPerMeter: BaseUnit<SurfaceTensionDim> = si.unit(
  surfaceTension,
);
